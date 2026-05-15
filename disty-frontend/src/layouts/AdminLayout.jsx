// src/layouts/AdminLayout.jsx

import { useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* OVERLAY MOBILE */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`
                    fixed inset-0 bg-black/40 z-40 lg:hidden
                    transition-all duration-300
                    ${
                        sidebarOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible pointer-events-none"
                    }
                `}
            ></div>

            {/* SIDEBAR */}
            <div
                className={`
                    fixed lg:static top-0 left-0 z-50
                    h-screen transition-all duration-300
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >

                <Sidebar
                    closeSidebar={() =>
                        setSidebarOpen(false)
                    }
                />

            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">

                <Topbar
                    toggleSidebar={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />

                <main className="p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}