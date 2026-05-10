// src/components/frontend/Footer.jsx

import logoPutih from "../../assets/images/logo-putih.png";

export default function Footer() {
    return (
        <footer
            className="text-white mt-5"
            style={{
                background: "#0b1f56",
                padding: "60px 0 20px",
            }}
        >
            <div className="container">

                <div className="row">

                    {/* Logo */}
                    <div className="col-lg-4 mb-4">

                        <img
                            src={logoPutih}
                            alt="Disty Akademi"
                            style={{ height: "45px" }}
                        />

                        <p className="mt-3">
                            Platform pelatihan dan sertifikasi online terpercaya.
                        </p>

                    </div>

                    {/* Tentang */}
                    <div className="col-lg-2 col-md-6 mb-4">

                        <h5>Tentang Kami</h5>

                        <ul className="list-unstyled">

                            <li>
                                <a
                                    href="/profilPerusahaan"
                                    className="text-white text-decoration-none"
                                >
                                    Profil Perusahaan
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/legalitas"
                                    className="text-white text-decoration-none"
                                >
                                    Legalitas
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/blog"
                                    className="text-white text-decoration-none"
                                >
                                    Blog
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* Produk */}
                    <div className="col-lg-2 col-md-6 mb-4">

                        <h5>Produk</h5>

                        <ul className="list-unstyled">

                            <li>
                                <a
                                    href="/pelatihan"
                                    className="text-white text-decoration-none"
                                >
                                    Bootcamp
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/sertifikasi"
                                    className="text-white text-decoration-none"
                                >
                                    Sertifikasi
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* Kontak */}
                    <div className="col-lg-4 mb-4">

                        <h5>Kontak Kami</h5>

                        <p>
                            <i className="fas fa-envelope me-2"></i>
                            info@distyakademi.com
                        </p>

                        <p>
                            <i className="fas fa-phone me-2"></i>
                            +62 21 1234 5678
                        </p>

                        <p>
                            <i className="fas fa-map-marker-alt me-2"></i>
                            Jakarta, Indonesia
                        </p>

                    </div>

                </div>

                <hr />

                <div className="text-center">
                    © 2025 Disty Akademi. All rights reserved.
                </div>

            </div>
        </footer>
    );
}