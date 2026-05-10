import pelatihanImg from "../../../assets/images/pelatihan.png";
import bnspImg from "../../../assets/images/bnsp.jpg";
import "../../../styles/home.css";

export default function ProgramSection() {
    return (
        <section className="py-5" id="programs">

            <div className="container">

                {/* Judul */}
                <div className="text-center mb-5">
                    <h2 className="section-title">
                        Program Unggulan Disty Akademi
                    </h2>
                </div>

                {/* Bootcamp */}
                <div className="row align-items-center mb-5">

                    <div className="col-lg-6 mb-4 mb-lg-0">

                        <h3 className="h4 fw-bold mb-3">
                            Pelatihan / Bootcamp
                        </h3>

                        <p className="text-muted mb-4">
                            Intensive Live Class bersama Experts.
                            Praktikal & Mendalam.
                        </p>

                        <ul className="feature-list mb-4">
                            <li>
                                Kelas interaktif belajar lewat diskusi & praktik,
                                bukan cuma teori saja
                            </li>

                            <li>
                                Kurikulum terstruktur: mulai dari dasar hingga advanced
                            </li>

                            <li>
                                Studi kasus nyata untuk latihan problem solving
                            </li>

                            <li>
                                Portfolio sebagai bukti kemampuan
                            </li>

                            <li>
                                Grup mentoring semi-privat
                            </li>

                            <li>
                                Sertifikat penyelesaian program
                            </li>
                        </ul>

                        <a
                            href="/pelatihan"
                            className="btn btn-custom-primary"
                        >
                            Daftar Sekarang
                        </a>

                    </div>

                    <div className="col-lg-6 text-center">

                        <img
                            src={pelatihanImg}
                            alt="Ilustrasi Bootcamp"
                            className="img-fluid rounded-3 shadow-sm"
                        />

                    </div>

                </div>

                {/* Sertifikasi */}
                <div className="row align-items-center flex-lg-row-reverse">

                    <div className="col-lg-6 mb-4 mb-lg-0">

                        <h3 className="h4 fw-bold mb-3">
                            Sertifikasi BNSP
                        </h3>

                        <p className="text-muted mb-4">
                            Program resmi uji kompetensi sesuai standar nasional.
                        </p>

                        <ul className="feature-list mb-4">

                            <li>
                                Materi intensif dengan studi kasus
                            </li>

                            <li>
                                Simulasi & persiapan uji kompetensi
                            </li>

                            <li>
                                Pendampingan selama proses sertifikasi
                            </li>

                            <li>
                                Feedback personal dari asesor
                            </li>

                            <li>
                                Sertifikat resmi BNSP yang diakui nasional
                            </li>

                            <li>
                                Peluang karir lebih luas
                            </li>

                        </ul>

                        <a
                            href="/sertifikasi"
                            className="btn btn-custom-primary"
                        >
                            Daftar Sekarang
                        </a>

                    </div>

                    <div className="col-lg-6 text-center">

                        <img
                            src={bnspImg}
                            alt="Ilustrasi Sertifikasi BNSP"
                            className="img-fluid rounded-3 shadow-sm"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}