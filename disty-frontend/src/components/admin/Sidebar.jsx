// src/components/admin/Sidebar.jsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import logoPutih from "../../assets/images/logo-putih.png";

export default function Sidebar({ closeSidebar }) {
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      // hapus local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect login
      navigate("/");
    } catch (error) {
      console.log(error);

      // paksa logout walau API gagal
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
    }
  };

  const isActive = (path) => {
    return location.pathname.includes(path)
      ? `
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            text-white
            shadow-lg
            shadow-orange-500/20
        `
      : `
            text-slate-400
            hover:text-white
            hover:bg-slate-800
        `;
  };

  return (
    <aside
      className="
        w-72
        h-screen
        bg-gradient-to-b
        from-slate-950
        via-slate-900
        to-slate-950
        text-white
        flex
        flex-col
        border-r
        border-slate-800
        overflow-y-auto
    "
    >
      <div
        className="
        px-6
        py-6
        border-b
        border-slate-800
    "
      >
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <img
              src={logoPutih}
              alt="Disty"
              className="
                    h-14
                    w-auto
                    object-contain
                    
                "
            />
          </Link>

          <button
            onClick={closeSidebar}
            className="
                lg:hidden

                w-10
                h-10

                rounded-xl

                bg-slate-800
                hover:bg-slate-700

                transition
            "
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-2">
        <div
          className="
        px-4
        mb-3
        text-xs
        font-bold
        tracking-widest
        text-slate-500
    "
        >
          MAIN MENU
        </div>
        {/* DASHBOARD */}
        <Link
          to="/dashboard"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive("/dashboard")}`}
        >
          <i className="fas fa-home"></i>

          <span>Dashboard</span>
        </Link>

        {/* PELATIHAN */}
        <Link
          to="/admin/pelatihan"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive("/pelatihan")}`}
        >
          <i className="fas fa-briefcase"></i>

          <span>Kelola Pelatihan</span>
        </Link>

        {/* SERTIFIKASI */}
        <Link
          to="/admin/sertifikasi"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive("/sertifikasi")}`}
        >
          <i className="fas fa-certificate"></i>

          <span>Kelola Sertifikasi</span>
        </Link>

        {/* BLOG */}
        <Link
          to="/admin/blog"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive("/blog")}`}
        >
          <i className="fas fa-blog"></i>

          <span>Kelola Blog</span>
        </Link>

        <div
          className="
        px-4
        mt-6
        mb-3
        text-xs
        font-bold
        tracking-widest
        text-slate-500
    "
        >
          TRANSAKSI
        </div>

        {/* PEMBAYARAN */}
        <Link
          to="/admin/pembayaran"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive("/pembayaran")}`}
        >
          <i className="fas fa-credit-card"></i>

          <span>Pembayaran Peserta</span>
        </Link>

        {/* SERTIFIKAT */}
        <Link
          to="/admin/sertifikat-pelatihan"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive("/sertifikat-pelatihan")}`}
        >
          <i className="fas fa-file-alt"></i>

          <span>Sertifikat Pelatihan</span>
        </Link>

        {/* BNSP */}
        <Link
          to="/admin/sertifikat-bnsp"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive("/sertifikat-bnsp")}`}
        >
          <i className="fas fa-award"></i>

          <span>Sertifikat BNSP</span>
        </Link>

        <div
          className="
        px-4
        mt-6
        mb-3
        text-xs
        font-bold
        tracking-widest
        text-slate-500
    "
        >
          SISTEM
        </div>

        <Link
          to="/admin/users"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${isActive("/admin/users")}`}
        >
          <i className="fas fa-users"></i>

          <span>Manajemen User</span>
        </Link>
      </nav>

      {/* KEMBALI KE BERANDA */}
      <div className="px-4 pb-2">
        <Link
          to="/"
          onClick={closeSidebar}
          className="
        flex
        items-center
        justify-center
        gap-3

        rounded-2xl

        py-3.5

        bg-green-500
        hover:bg-green-600

        font-semibold

        transition-all
        duration-300
    "
        >
          <i className="fas fa-arrow-left"></i>

          <span className="whitespace-nowrap">Kembali ke Beranda</span>
        </Link>
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition"
        >
          <i className="fas fa-right-from-bracket"></i>

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
