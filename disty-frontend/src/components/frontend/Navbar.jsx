// src/components/frontend/Navbar.jsx

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../../styles/app.css";
import "../../styles/home.css";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="Disty Akademi"
                        style={{ height: "45px" }}
                    />
                </Link>

                {/* Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/pelatihan"
                            >
                                Bootcamp
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/sertifikasi"
                            >
                                Sertifikasi
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/blog"
                            >
                                Blog
                            </Link>
                        </li>

                        {/* Dropdown */}
                        <li className="nav-item dropdown">

                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Tentang Kami
                            </a>

                            <ul className="dropdown-menu">

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/profilPerusahaan"
                                    >
                                        Profil Perusahaan
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/legalitas"
                                    >
                                        Legalitas
                                    </Link>
                                </li>

                            </ul>
                        </li>

                    </ul>

                    {/* Auth Button */}
                    <div className="d-flex align-items-center ms-3">

                        <Link
                            to="/login"
                            className="btn btn-outline-brand"
                        >
                            Masuk
                        </Link>

                        <Link
                            to="/daftar"
                            className="btn btn-oranye btn-nav ms-2"
                        >
                            Daftar
                        </Link>

                    </div>

                </div>
            </div>
        </nav>
    );
}