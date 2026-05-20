// src/components/admin/Sidebar.jsx

import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ closeSidebar }) {

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.includes(path)
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-slate-800";
    };

    return (
        <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col overflow-y-auto">

            {/* LOGO */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">

                <h2 className="text-2xl font-black">
                    Disty Admin
                </h2>

                {/* CLOSE MOBILE */}
                <button
                    onClick={closeSidebar}
                    className="lg:hidden w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center"
                >

                    <i className="fas fa-times"></i>

                </button>

            </div>

            {/* MENU */}
            <nav className="flex-1 p-4 space-y-2">

                {/* DASHBOARD */}
                <Link
                    to="/dashboard"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("/dashboard")}`}
                >

                    <i className="fas fa-home"></i>

                    <span>Dashboard</span>

                </Link>

                {/* PELATIHAN */}
                <Link
                    to="/admin/pelatihan"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("/pelatihan")}`}
                >

                    <i className="fas fa-briefcase"></i>

                    <span>Kelola Pelatihan</span>

                </Link>

                {/* SERTIFIKASI */}
                <Link
                    to="/admin/sertifikasi"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("/sertifikasi")}`}
                >

                    <i className="fas fa-certificate"></i>

                    <span>Kelola Sertifikasi</span>

                </Link>

                {/* BLOG */}
                <Link
                    to="/admin/blog"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("/blog")}`}
                >

                    <i className="fas fa-blog"></i>

                    <span>Kelola Blog</span>

                </Link>

                {/* PEMBAYARAN */}
                <Link
                    to="/admin/pembayaran"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("/pembayaran")}`}
                >

                    <i className="fas fa-credit-card"></i>

                    <span>Pembayaran Peserta</span>

                </Link>

                {/* SERTIFIKAT */}
                <Link
                    to="/admin/sertifikat-pelatihan"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("/sertifikat-pelatihan")}`}
                >

                    <i className="fas fa-file-alt"></i>

                    <span>Sertifikat Pelatihan</span>

                </Link>

                {/* BNSP */}
                <Link
                    to="/admin/sertifikat-bnsp"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("/sertifikat-bnsp")}`}
                >

                    <i className="fas fa-award"></i>

                    <span>Sertifikat BNSP</span>

                </Link>

                <Link
                    to="/admin/users"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("/admin/users")}`}
                >

                    <i className="fas fa-users"></i>

                    <span>Manajemen User</span>

                </Link>

            </nav>

            {/* LOGOUT */}
            <div className="p-4 border-t border-slate-800">

                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
                >

                    <i className="fas fa-right-from-bracket"></i>

                    <span>Logout</span>

                </button>

            </div>

        </aside>
    );
}