import heroBg from "../../../assets/images/beranda-hero.png";
import "../../../styles/home.css";

export default function HeroSection() {
    return (
        <section className="hero-section d-flex align-items-center">

            <img
                src={heroBg}
                alt="Hero"
                className="hero-bg position-absolute w-100 h-100 top-0 start-0 object-fit-cover"
            />

            <div className="container-fluid position-relative z-2">
                <div className="row align-items-center">

                    <div className="col-lg-6 offset-lg-6 text-center text-lg-start">

                        <p className="hero-eyebrow">
                            Pelatihan & Sertifikasi Online Terpercaya
                        </p>

                        <h1 className="hero-title mb-3">
                            TINGKATKAN SKILL,
                            <br />
                            RAIH SERTIFIKAT RESMI
                        </h1>

                        <p className="hero-desc">
                            Belajar online bersama mentor berpengalaman,
                            fleksibel, dan bersertifikat resmi.
                        </p>

                        <div className="mt-4">

                            <a
                                href="/profilPerusahaan"
                                className="btn btn-orange me-2"
                            >
                                Pelajari Lebih Lanjut
                            </a>

                            <a
                                href="/pelatihan"
                                className="btn btn-custom-secondary"
                            >
                                Lihat Program
                            </a>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}