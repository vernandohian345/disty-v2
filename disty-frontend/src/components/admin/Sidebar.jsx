import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.includes(path)
            ? "active"
            : "";
    };

    return (
        <div className="sidebar">
            <div className="brand">
                <h3>Disty</h3>
            </div>

            <ul className="nav flex-column">

                <li>
                    <Link
                        to="/dashboard"
                        className={`nav-link ${isActive("/dashboard")}`}
                    >
                        <i className="fas fa-home"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/admin/pelatihan"
                        className={`nav-link ${isActive("/pelatihan")}`}
                    >
                        <i className="fas fa-briefcase"></i>
                        <span>Kelola Pelatihan</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/admin/sertifikasi"
                        className={`nav-link ${isActive("/sertifikasi")}`}
                    >
                        <i className="fas fa-certificate"></i>
                        <span>Kelola Sertifikasi</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/admin/blog"
                        className={`nav-link ${isActive("/blog")}`}
                    >
                        <i className="fas fa-blog"></i>
                        <span>Kelola Blog</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/admin/pembayaran"
                        className={`nav-link ${isActive("/pembayaran")}`}
                    >
                        <i className="fas fa-credit-card"></i>
                        <span>Pembayaran Peserta</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/admin/sertifikat-pelatihan"
                        className={`nav-link ${isActive("/sertifikat-pelatihan")}`}
                    >
                        <i className="fas fa-file-alt"></i>
                        <span>Sertifikat Pelatihan</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/admin/sertifikat-bnsp"
                        className={`nav-link ${isActive("/sertifikat-bnsp")}`}
                    >
                        <i className="fas fa-award"></i>
                        <span>Sertifikat Sertifikasi BNSP</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/logout"
                        className="nav-link logout-link"
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    </Link>
                </li>

            </ul>
        </div>
    );
}