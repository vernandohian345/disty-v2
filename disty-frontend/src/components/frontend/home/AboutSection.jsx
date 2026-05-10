import distyImage from "../../../assets/images/distydevo.jpg";
import "../../../styles/home.css";

export default function AboutSection() {
    return (
        <section className="about-section mt-5" id="about">

            <div className="container">

                <div className="row align-items-center">

                    {/* Kiri */}
                    <div className="col-lg-6">

                        <h2 className="section-title">
                            Mengenal Kami
                        </h2>

                        <div className="about-card">

                            <h3 className="h4 fw-bold mb-3">
                                Satu Platform, Semua Skill dan Sertifikasi Resmi
                            </h3>

                            <p className="mb-4">
                                Disty Akademi adalah platform pelatihan dan
                                sertifikasi online terpercaya. Kami menyediakan
                                program belajar yang fleksibel, praktis,
                                dan terintegrasi dengan industri.

                                Dengan bimbingan mentor berpengalaman,
                                kami bisa mengasah skill baru sekaligus
                                mendapatkan sertifikat resmi untuk
                                meningkatkan peluang karir.
                            </p>

                            <a
                                href="#programs"
                                className="btn btn-custom-primary"
                            >
                                Pelajari Lebih Lanjut
                            </a>

                        </div>

                    </div>

                    {/* Kanan */}
                    <div className="col-lg-6 d-flex justify-content-center align-items-center">

                        <img
                            src={distyImage}
                            alt="Disty Akademi"
                            className="img-fluid rounded-3 shadow-sm"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}