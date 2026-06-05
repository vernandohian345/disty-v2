// src/layouts/AdminLayout.jsx

import { useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* OVERLAY MOBILE */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
                    fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 lg:hidden
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
                    fixed top-0 left-0 z-50
                    h-screen
                    transition-all
                    duration-500
                    ease-out
                    ${
                      sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
                `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* CONTENT */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* TOPBAR */}
        <div className=" sticky top-0 z-30 backdrop-blur-xl ">
          <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        {/* MAIN */}
        <main
          className="
                flex-1
                p-4
                md:p-6
                xl:p-8
                overflow-x-hidden
            "
        >
          <div
            className="
                max-w-[1800px]
                mx-auto
                "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
