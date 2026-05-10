import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout({
    children
}) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-layout">

            <div className={`sidebar-wrapper ${sidebarOpen ? "show" : ""}`}>
                <Sidebar />
            </div>

            {sidebarOpen && (
                <div
                    className="overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <div className="main-content">

                <Topbar
                    toggleSidebar={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />

                <div className="page-content">
                    {children}
                </div>

            </div>
        </div>
    );
}