@extends('frontend.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
@endpush

@section('title', 'Disty Akademi - Tingkatkan Skill, Raih Sertifikat Resmi')

@section('content')

    <!-- Hero Section -->
    <section class="hero position-relative d-flex align-items-center">
        <img src="{{ asset('asset/beranda-hero.png') }}"
            alt="Hero Background"
            class="hero-bg position-absolute w-100 h-100 top-0 start-0 object-fit-cover">
        <!-- Overlay (muncul hanya di mobile) -->
        <div class="overlay position-absolute top-0 start-0 w-100 h-100 d-md-none"></div>

        <div class="container position-relative z-2">
            <div class="row align-items-center">
                <div class="col-lg-6 offset-lg-6 text-center text-lg-start">
                    <p class="hero-eyebrow">Pelatihan &amp; Sertifikasi Online Terpercaya</p>
                    <h1 class="hero-title mb-3">TINGKATKAN SKILL,<br>RAIH SERTIFIKAT RESMI</h1>
                    <p class="hero-desc">
                    Belajar online bersama mentor berpengalaman, fleksibel, dan bersertifikat resmi.
                    </p>
                    <div class="mt-4">
                        <a href="profilPerusahaan" class="btn btn-custom-primary me-2">Pelajari Lebih Lanjut</a>
                        <a href="pelatihan" class="btn btn-custom-secondary">Lihat Program</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section mt-5" id="about">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h2 class="section-title">Mengenal Kami</h2>
                    <div class="about-card">
                        <h3 class="h4 fw-bold mb-3">Satu Platform, Semua Skill dan Sertifikasi Resmi</h3>
                        <p class="mb-4">
                            Disty Akademi adalah platform pelatihan dan sertifikasi online terpercaya. Kami menyediakan program belajar yang fleksibel, praktis, dan terintegrasi dengan industri. Dengan bimbingan mentor berpengalaman, kami bisa mengasah skill baru sekaligus mendapatkan sertifikat resmi untuk meningkatkan peluang karir.
                        </p>
                        <a href="#programs" class="btn btn-orange">Pelajari Lebih Lanjut</a>
                    </div>
                </div>
                <div class="col-lg-6 d-flex justify-content-center align-items-center">
                    <img src="asset/distydevo.jpg"
                        alt="Ilustrasi Mengenal Kami"
                        class="img-fluid rounded-3 shadow-sm">
                </div>
            </div>
        </div>
    </section>

    <!-- Programs Section -->
    <section class="py-5" id="programs">
        <div class="container">
            <!-- Judul -->
            <div class="text-center mb-5">
            <h2 class="section-title">Program Unggulan Disty Akademi</h2>
            </div>

            <!-- Bootcamp -->
            <div class="row align-items-center mb-5">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <h3 class="h4 fw-bold mb-3">Pelatihan / Bootcamp</h3>
                    <p class="text-muted mb-4">
                    Intensive Live Class bersama Experts. Praktikal & Mendalam.
                    </p>
                    <ul class="feature-list mb-4">
                    <li>Kelas interaktif belajar lewat diskusi & praktik, bukan cuma teori saja</li>
                    <li>Kurikulum terstruktur: mulai dari dasar hingga advanced</li>
                    <li>Studi kasus nyata untuk latihan problem solving</li>
                    <li>Portfolio sebagai bukti kemampuan</li>
                    <li>Grup mentoring semi-privat</li>
                    <li>Sertifikat penyelesaian program</li>
                    </ul>
                    <a href="pelatihan" class="btn btn-orange">Daftar Sekarang</a>
                </div>
                <div class="col-lg-6 text-center">
                    <img src="asset/pelatihan.png" alt="Ilustrasi Bootcamp" class="img-fluid rounded-3 shadow-sm">
                </div>
            </div>

            <!-- Sertifikasi BNSP -->
            <div class="row align-items-center flex-lg-row-reverse">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <h3 class="h4 fw-bold mb-3">Sertifikasi BNSP</h3>
                    <p class="text-muted mb-4">
                    Program resmi uji kompetensi sesuai standar nasional.
                    </p>
                    <ul class="feature-list mb-4">
                    <li>Materi intensif dengan studi kasus</li>
                    <li>Simulasi & persiapan uji kompetensi</li>
                    <li>Pendampingan selama proses sertifikasi</li>
                    <li>Feedback personal dari asesor</li>
                    <li>Sertifikat resmi BNSP yang diakui nasional</li>
                    <li>Peluang karir lebih luas</li>
                    </ul>
                    <a href="sertifikasi" class="btn btn-orange">Daftar Sekarang</a>
                </div>
                <div class="col-lg-6 text-center">
                    <img src="asset/bnsp.jpg" alt="Ilustrasi Sertifikasi BNSP" class="img-fluid rounded-3 shadow-sm">
                </div>
            </div>
        </div>
    </section>

    <!-- Partners Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title">Mitra & Klien</h2>
            </div>

            <!-- Partner Logos -->
            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 justify-content-center">
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/kemnamker.png" alt="Kemnakker">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/bnsp.png" alt="BNSP">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/lspmod.png" alt="LSP ABP Modern">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/lspikn.png" alt="LSP IKN">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/blkjbg.png" alt="LSP BLK Jombang">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/ui.png" alt="Universitas Indonesia">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/bi.png" alt="Bank Indonesia">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/pln.png" alt="PLN">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/winpo.png" alt="Winpro">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/patri.png" alt="Patrarijaya">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/uptblk.png" alt="UPTBLK Jombang">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/birawidha.png" alt="Birawidha">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/dinasjbg.png" alt="Dinas Kabupaten Jombang">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/iain.png" alt="IAIN Kudus">
                    </div>
                </div>
                <div class="col text-center">
                    <div class="partner-logo">
                        <img src="asset/mitra/unwaha.png" alt="Kampus Unwaha">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-5" id="blog">
    <div class="container">
        <div class="text-center mb-5">
        <h2 class="section-title">Berita & Blog Terakhir Kami</h2>
        </div>

        <div class="row g-4">
        <div class="col-lg-3 col-md-6">
            <div class="card blog-card h-100">
            <img src="asset/magangdisty.png" class="card-img-top" alt="Pengumuman Seleksi Magang">
            <div class="card-body">
                <p class="text-muted small mb-1">
                <i class="far fa-calendar-alt"></i> 2 Sept 2025
                </p>
                <h5 class="card-title">
                <a href="detail-blog" class="stretched-link text-dark text-decoration-none">
                    Pengumuman Seleksi Magang Mandiri Debugging 2
                </a>
                </h5>
                <p class="card-text text-muted small">
                Admin Disty Akademi
                </p>
            </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card blog-card h-100">
            <img src="asset/magangdisty.png" class="card-img-top" alt="Tips Full-Stack Developer">
            <div class="card-body">
                <p class="text-muted small mb-1">
                <i class="far fa-calendar-alt"></i> 28 Ags 2025
                </p>
                <h5 class="card-title">
                <a href="detail-blog" class="stretched-link text-dark text-decoration-none">
                    Tips Sukses Menjadi Full-Stack Developer
                </a>
                </h5>
                <p class="card-text text-muted small">Admin Disty Akademi</p>
            </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card blog-card h-100">
            <img src="asset/magangdisty.png" class="card-img-top" alt="Kisah Alumni Bootcamp UI/UX">
            <div class="card-body">
                <p class="text-muted small mb-1">
                <i class="far fa-calendar-alt"></i> 15 Ags 2025
                </p>
                <h5 class="card-title">
                <a href="detail-blog" class="stretched-link text-dark text-decoration-none">
                    Kisah Sukses Alumni Bootcamp UI/UX Design
                </a>
                </h5>
                <p class="card-text text-muted small">Admin Disty Akademi</p>
            </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card blog-card h-100">
            <img src="asset/magangdisty.png" class="card-img-top" alt="Peluncuran Program Data Science">
            <div class="card-body">
                <p class="text-muted small mb-1">
                <i class="far fa-calendar-alt"></i> 1 Ags 2025
                </p>
                <h5 class="card-title">
                <a href="detail-blog" class="stretched-link text-dark text-decoration-none">
                    Peluncuran Program Baru Data Science
                </a>
                </h5>
                <p class="card-text text-muted small">Admin Disty Akademi</p>
            </div>
            </div>
        </div>
        </div>

        <div class="text-center mt-5">
        <a href="blog" class="btn btn-orange">Lihat Berita Lainnya</a>
        </div>
    </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section" id="faq">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title">Pertanyaan yang Sering Diajukan</h2>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="accordion" id="faqAccordion">
                        <div class="accordion-item border-0 mb-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    Apa itu Disty Akademi?
                                </button>
                            </h2>
                            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Disty Akademi adalah platform pelatihan dan sertifikasi online yang menyediakan program pembelajaran fleksibel dengan mentor berpengalaman dan sertifikat resmi.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item border-0 mb-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    Apa saja fitur Disty Akademi?
                                </button>
                            </h2>
                            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Kami menyediakan kelas interaktif, kurikulum terstruktur, studi kasus nyata, grup mentoring, materi yang bisa diakses ulang, dan sertifikat resmi.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item border-0 mb-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    Bagaimana cara mendaftar program?
                                </button>
                            </h2>
                            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Anda dapat mendaftar melalui website kami dengan memilih program yang diinginkan, mengisi formulir pendaftaran, dan melakukan pembayaran sesuai instruksi.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item border-0 mb-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                    Apakah sertifikat yang diberikan diakui?
                                </button>
                            </h2>
                            <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Ya, sertifikat yang kami berikan diakui secara nasional oleh BNSP (Badan Nasional Sertifikasi Profesi) dan dihargai oleh industri.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5" style="background: linear-gradient(135deg, var(--primary-orange) 0%, var(--secondary-orange) 100%);">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8 text-white">
                    <h2 class="h3 fw-bold mb-3">Siap Mulai Perjalanan Belajar Anda?</h2>
                    <p class="mb-0">Bergabunglah dengan ribuan profesional yang telah meningkatkan karir mereka bersama Disty Akademi.</p>
                </div>
                <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
                    <a href="#register" class="btn btn-light btn-lg px-4">
                        <i class="fas fa-rocket me-2"></i>Mulai Sekarang
                    </a>
                </div>
            </div>
        </div>
    </section>

@endsection
