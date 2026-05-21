<h1 style="background:red;color:white">
    TEST VITE
</h1>
<!DOCTYPE html>
<html lang="id">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Disty Akademi - Tingkatkan Skill, Raih Sertifikat Resmi</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">



    <style>
        :root {
            --primary-orange: #ff6b35;
            --secondary-orange: #ff8c42;
            --dark-blue: #1a365d;
            --light-bg: #f8f9fa;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }

        .navbar-brand img {
            height: 40px;
        }

        .navbar {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .navbar-scrolled {
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
        }

        .hero-section {
            background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
            color: white;
            padding: 100px 0 80px;
            position: relative;
            overflow: hidden;
        }

        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="70" cy="30" r="20" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="70" r="15" fill="rgba(255,255,255,0.05)"/></svg>');
            background-size: cover;
        }

        .hero-content {
            position: relative;
            z-index: 2;
        }

        .hero-image {
            position: relative;
            z-index: 1;
        }

        .btn-orange {
            background: var(--primary-orange);
            border: none;
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-orange:hover {
            background: #e55a2b;
            transform: translateY(-2px);
            color: white;
        }

        .btn-outline-orange {
            border: 2px solid var(--primary-orange);
            color: var(--primary-orange);
            background: transparent;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-outline-orange:hover {
            background: var(--primary-orange);
            color: white;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--dark-blue);
            margin-bottom: 3rem;
            position: relative;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--primary-orange);
            border-radius: 2px;
        }

        .text-center .section-title::after {
            left: 50%;
            transform: translateX(-50%);
        }

        .program-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            height: 100%;
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .program-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .program-card h3 {
            color: var(--dark-blue);
            margin-bottom: 20px;
            font-size: 1.5rem;
        }

        .feature-list {
            list-style: none;
            padding: 0;
            margin-bottom: 1.5rem;
        }

        .feature-list li {
            padding: 8px 0;
            display: flex;
            align-items: center;
        }

        .feature-list li::before {
            content: '✓';
            color: #28a745;
            font-weight: bold;
            margin-right: 10px;
            background: #d4edda;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            flex-shrink: 0;
        }

        .partner-logo {
            height: 60px;
            opacity: 0.7;
            transition: all 0.3s ease;
            filter: grayscale(100%);
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 8px;
            padding: 10px;
        }

        .partner-logo:hover {
            opacity: 1;
            filter: grayscale(0%);
            transform: scale(1.05);
        }

        .blog-card {
            border: none;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            height: 100%;
        }

        .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .blog-card .card-img-top {
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--light-bg);
        }

        .faq-section {
            background: var(--light-bg);
            padding: 80px 0;
        }

        .accordion-button {
            background: white;
            border: none;
            border-radius: 10px !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 15px;
            font-weight: 600;
            padding: 1rem 1.25rem;
        }

        .accordion-button:not(.collapsed) {
            background: var(--primary-orange);
            color: white;
        }

        .accordion-button:focus {
            box-shadow: 0 0 0 0.25rem rgba(255, 107, 53, 0.25);
            border-color: var(--primary-orange);
        }

        .footer {
            background: var(--dark-blue);
            color: white;
            padding: 60px 0 30px;
        }

        .footer h5 {
            color: var(--primary-orange);
            margin-bottom: 20px;
            font-weight: 600;
        }

        .footer a {
            color: #adb5bd;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer a:hover {
            color: var(--primary-orange);
        }

        .social-icons a {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: var(--primary-orange);
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            margin-right: 10px;
            transition: all 0.3s ease;
        }

        .social-icons a:hover {
            transform: scale(1.1);
            background: #e55a2b;
        }

        .hero-stats {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            margin-top: 40px;
            backdrop-filter: blur(10px);
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            display: block;
        }

        .animate-float {
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {

            0%,
            100% {
                transform: translateY(0px);
            }

            50% {
                transform: translateY(-10px);
            }
        }

        .about-section {
            padding: 80px 0;
            background: var(--light-bg);
        }

        .about-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* Responsive adjustments */
        @media (max-width: 992px) {
            .hero-section {
                padding: 80px 0 60px;
                text-align: center;
            }

            .hero-section::before {
                width: 100%;
                opacity: 0.2;
            }

            .section-title {
                font-size: 2rem;
            }

            .program-card {
                margin-bottom: 30px;
            }

            .hero-stats .stat-number {
                font-size: 2rem;
            }
        }

        @media (max-width: 768px) {
            .hero-section h1 {
                font-size: 2.5rem;
            }

            .section-title {
                font-size: 1.8rem;
            }

            .program-card,
            .about-card {
                padding: 25px;
            }

            .footer .col-lg-4 {
                margin-bottom: 30px;
            }
        }

        @media (max-width: 576px) {
            .hero-section {
                padding: 60px 0 40px;
            }

            .hero-section h1 {
                font-size: 2rem;
            }

            .btn-orange,
            .btn-outline-orange {
                padding: 10px 20px;
                font-size: 0.9rem;
            }

            .stat-number {
                font-size: 1.8rem;
            }
        }
    </style>
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 40'><text x='10' y='25' font-family='Arial, sans-serif' font-size='20' font-weight='bold' fill='%23ff6b35'>Disty</text><text x='70' y='25' font-family='Arial, sans-serif' font-size='14' fill='%231a365d'>Akademi</text></svg>"
                    alt="Disty Akademi">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <a class="nav-link fw-semibold" href="#programs">Bootcamp</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-semibold" href="#programs">Sertifikasi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-semibold" href="#blog">Blog</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle fw-semibold" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Tentang Kami
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#about">Tentang Kami</a></li>
                            <li><a class="dropdown-item" href="#team">Tim Kami</a></li>
                            <li><a class="dropdown-item" href="#contact">Kontak</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-semibold" href="#login">Masuk</a>
                    </li>
                </ul>
                <a href="#register" class="btn btn-orange">Daftar</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section" id="home">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 hero-content">
                    <div class="mb-3">
                        <span class="badge bg-light text-dark px-3 py-2 rounded-pill">
                            Pelatihan & Sertifikasi Online Terpercaya
                        </span>
                    </div>
                    <h1 class="display-4 fw-bold mb-4">
                        TINGKATKAN SKILL,<br>
                        RAIH SERTIFIKAT<br>
                        RESMI
                    </h1>
                    <p class="lead mb-4">
                        Bergabunglah bersama mentor berpengalaman, fleksibel, dan bersertifikat resmi.
                    </p>
                    <div class="d-flex gap-3 flex-wrap">
                        <a href="#about" class="btn btn-light btn-lg px-4">Pelajari Lebih Lanjut</a>
                        <a href="#programs" class="btn btn-outline-light btn-lg px-4">Lihat Program</a>
                    </div>

                    <!-- Hero Stats -->
                    <div class="hero-stats mt-5">
                        <div class="row text-center">
                            <div class="col-4">
                                <div class="stat-item">
                                    <span class="stat-number">1000+</span>
                                    <small>Alumni</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="stat-item">
                                    <span class="stat-number">50+</span>
                                    <small>Program</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="stat-item">
                                    <span class="stat-number">95%</span>
                                    <small>Success Rate</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 hero-image text-center">
                    <div class="animate-float">
                        <div class="bg-white rounded-circle d-inline-flex align-items-center justify-content-center"
                            style="width: 300px; height: 300px;">
                            <i class="fas fa-user-graduate"
                                style="font-size: 120px; color: var(--primary-orange) !important;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="about">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h2 class="section-title">Mengenal Kami</h2>
                    <div class="about-card">
                        <h3 class="h4 fw-bold mb-3">Satu Platform, Semua Skill dan Sertifikasi Resmi</h3>
                        <p class="mb-4">
                            Disty Akademi adalah platform pelatihan dan sertifikasi online terpercaya. Kami menyediakan
                            program belajar yang fleksibel, praktis, dan terintegrasi dengan industri. Dengan bimbingan
                            mentor berpengalaman, kami bisa mengasah skill baru sekaligus mendapatkan sertifikat resmi
                            untuk meningkatkan peluang karir.
                        </p>
                        <a href="#programs" class="btn btn-orange">Pelajari Lebih Lanjut</a>
                    </div>
                </div>
                <div class="col-lg-6 text-center">
                    <div class="bg-light rounded-3 p-5">
                        <i class="fas fa-graduation-cap" style="font-size: 120px; color: var(--primary-orange);"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Programs Section -->
    <section class="py-5" id="programs">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title">Program Kami</h2>
                <p class="h4 fw-bold text-primary mb-5">Program Unggulan Disty Akademi</p>
            </div>

            <div class="row g-4">
                <!-- Bootcamp Program -->
                <div class="col-lg-6">
                    <div class="program-card">
                        <div class="row">
                            <div class="col-md-8">
                                <h3 class="h4 fw-bold">Pelatihan / Bootcamp</h3>
                                <p class="text-muted mb-3">Intensive Live Class bersama Experts. Praktikal & Mendalam
                                </p>

                                <ul class="feature-list">
                                    <li>Kelas interaktif belajar lewat diskusi & praktik, bukan cuma teori saja</li>
                                    <li>Kurikulum terstruktur: mulai dari dasar hingga advanced</li>
                                    <li>Studi kasus nyata untuk latihan problem solving</li>
                                    <li>Portfolio sebagai bukti kemampuan yang bisa dipamerkan</li>
                                    <li>Grup mentoring semi-privat agar lebih fokus & intens!</li>
                                    <li>Materi bisa diakses ulang (rekaman live notes)</li>
                                    <li>Sertifikat penyelesaian program</li>
                                </ul>

                                <div class="mt-4">
                                    <a href="#" class="btn btn-outline-orange me-2">Mulai Bootcamp</a>
                                    <a href="#" class="btn btn-orange">Daftar Sekarang</a>
                                </div>
                            </div>
                            <div class="col-md-4 text-center">
                                <div
                                    class="bg-light rounded-3 p-4 h-100 d-flex align-items-center justify-content-center">
                                    <i class="fas fa-laptop-code"
                                        style="font-size: 80px; color: var(--primary-orange);"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BNSP Certification -->
                <div class="col-lg-6">
                    <div class="program-card">
                        <div class="row">
                            <div class="col-md-8">
                                <h3 class="h4 fw-bold">Sertifikasi BNSP</h3>
                                <p class="text-muted mb-3">Intensive Live Class bersama Experts. Praktikal & Mendalam
                                </p>

                                <ul class="feature-list">
                                    <li>Materi intensif dengan studi kasus sesuai bidang</li>
                                    <li>Simulasi & persiapan uji kompetensi</li>
                                    <li>Pendampingan selama proses sertifikasi</li>
                                    <li>Feedback personal untuk memperkuat skill</li>
                                    <li>Sertifikat resmi BNSP yang diakui nasional</li>
                                    <li>Peluang karir yang lebih luas dan profesional</li>
                                    <li>Akses materi tambahan & panduan ujian</li>
                                </ul>

                                <div class="mt-4">
                                    <a href="#" class="btn btn-outline-orange me-2">Ambil Sertifikasi</a>
                                    <a href="#" class="btn btn-orange">Daftar Sekarang</a>
                                </div>
                            </div>
                            <div class="col-md-4 text-center">
                                <div
                                    class="bg-light rounded-3 p-4 h-100 d-flex align-items-center justify-content-center">
                                    <i class="fas fa-certificate"
                                        style="font-size: 80px; color: var(--primary-orange);"></i>
                                </div>
                            </div>
                        </div>
                    </div>
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
            <div class="row align-items-center justify-content-center g-4">
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-primary">BNSP</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-danger">LSP</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-success">KEMENDIKBUD</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-warning">VLSP</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-info">MICROSOFT</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-primary">BI</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-success">PLN</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-warning">TELKOM</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-danger">BNI</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-primary">PERTAMINA</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-info">GARUDA</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-4 text-center">
                    <div class="partner-logo">
                        <span class="fw-bold text-success">GOJEK</span>
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
                        <div class="card-img-top">
                            <i class="fas fa-users" style="font-size: 60px; color: var(--primary-orange);"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Pengumuman Seleksi Magang Mandiri Debugging 2</h5>
                            <p class="card-text text-muted small">Admin Disty Akademi</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="card blog-card h-100">
                        <div class="card-img-top">
                            <i class="fas fa-code" style="font-size: 60px; color: var(--primary-orange);"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Tips Sukses Menjadi Full-Stack Developer</h5>
                            <p class="card-text text-muted small">Admin Disty Akademi</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="card blog-card h-100">
                        <div class="card-img-top">
                            <i class="fas fa-trophy" style="font-size: 60px; color: var(--primary-orange);"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Kisah Sukses Alumni Bootcamp UI/UX Design</h5>
                            <p class="card-text text-muted small">Admin Disty Akademi</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="card blog-card h-100">
                        <div class="card-img-top">
                            <i class="fas fa-rocket" style="font-size: 60px; color: var(--primary-orange);"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Peluncuran Program Baru Data Science</h5>
                            <p class="card-text text-muted small">Admin Disty Akademi</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-5">
                <a href="#" class="btn btn-outline-orange">Lihat Semua Artikel</a>
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
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#faq1">
                                    Apa itu Disty Akademi?
                                </button>
                            </h2>
                            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Disty Akademi adalah platform pelatihan dan sertifikasi online yang menyediakan
                                    program pembelajaran fleksibel dengan mentor berpengalaman dan sertifikat resmi.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item border-0 mb-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#faq2">
                                    Apa saja fitur Disty Akademi?
                                </button>
                            </h2>
                            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Kami menyediakan kelas interaktif, kurikulum terstruktur, studi kasus nyata, grup
                                    mentoring, materi yang bisa diakses ulang, dan sertifikat resmi.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item border-0 mb-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#faq3">
                                    Bagaimana cara mendaftar program?
                                </button>
                            </h2>
                            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Anda dapat mendaftar melalui website kami dengan memilih program yang diinginkan,
                                    mengisi formulir pendaftaran, dan melakukan pembayaran sesuai instruksi.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item border-0 mb-3">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#faq4">
                                    Apakah sertifikat yang diberikan diakui?
                                </button>
                            </h2>
                            <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Ya, sertifikat yang kami berikan diakui secara nasional oleh BNSP (Badan Nasional
                                    Sertifikasi Profesi) dan dihargai oleh industri.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5"
        style="background: linear-gradient(135deg, var(--primary-orange) 0%, var(--secondary-orange) 100%);">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8 text-white">
                    <h2 class="h3 fw-bold mb-3">Siap Mulai Perjalanan Belajar Anda?</h2>
                    <p class="mb-0">Bergabunglah dengan ribuan profesional yang telah meningkatkan karir mereka bersama
                        Disty Akademi.</p>
                </div>
                <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
                    <a href="#register" class="btn btn-light btn-lg px-4">
                        <i class="fas fa-rocket me-2"></i>Mulai Sekarang
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <div class="mb-3">
                        <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 40'><text x='10' y='25' font-family='Arial, sans-serif' font-size='20' font-weight='bold' fill='%23ff6b35'>Disty</text><text x='70' y='25' font-family='Arial, sans-serif' font-size='14' fill='white'>Akademi</text></svg>"
                            alt="Disty Akademi" style="height: 40px;">
                    </div>
                    <p class="mb-4">Platform pelatihan dan sertifikasi online terpercaya untuk meningkatkan skill dan
                        karir Anda.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>

                <div class="col-lg-2 col-md-6 mb-4">
                    <h5>Tentang Kami</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="#about">Tentang Disty</a></li>
                        <li class="mb-2"><a href="#team">Tim Kami</a></li>
                        <li class="mb-2"><a href="#">Karir</a></li>
                        <li class="mb-2"><a href="#blog">Blog</a></li>
                    </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4">
                    <h5>Produk</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="#programs">Bootcamp</a></li>
                        <li class="mb-2"><a href="#programs">Sertifikasi BNSP</a></li>
                        <li class="mb-2"><a href="#programs">Kursus Online</a></li>
                        <li class="mb-2"><a href="#programs">Mentoring</a></li>
                    </ul>
                </div>

                <div class="col-lg-4 mb-4">
                    <h5>Butuh Info Lebih Lanjut?</h5>
                    <p class="mb-3">Dapatkan info terbaru tentang program dan penawaran khusus dari Disty Akademi!</p>
                    <form id="newsletter-form">
                        <div class="row g-2">
                            <div class="col-8">
                                <input type="email" class="form-control" placeholder="Email Anda" required>
                            </div>
                            <div class="col-4">
                                <button type="submit" class="btn btn-orange w-100">Subscribe</button>
                            </div>
                        </div>
                    </form>

                    <div class="mt-4">
                        <h6>Kontak Kami:</h6>
                        <p class="mb-1"><i class="fas fa-envelope me-2"></i> info@distyakademi.com</p>
                        <p class="mb-1"><i class="fas fa-phone me-2"></i> +62 21 1234-5678</p>
                        <p class="mb-0"><i class="fas fa-map-marker-alt me-2"></i> Jakarta, Indonesia</p>
                    </div>
                </div>
            </div>

            <hr class="my-4">

            <div class="row align-items-center">
                <div class="col-md-6 text-center text-md-start">
                    <p class="mb-0">&copy; 2023 Disty Akademi. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <a href="#" class="text-decoration-none me-3">Privacy Policy</a>
                    <a href="#" class="text-decoration-none">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', function () {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // Animate stats counter
        function animateCounter(el, target, duration) {
            let startTime = null;
            const startValue = 0;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const value = Math.floor(progress * (target - startValue) + startValue);
                el.textContent = value.toLocaleString();

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = target.toLocaleString();
                }
            }

            window.requestAnimationFrame(step);
        }

        // Initialize counters when in viewport
        function initCounters() {
            const statsSection = document.querySelector('.hero-stats');
            const statNumbers = document.querySelectorAll('.stat-number');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(stat => {
                            const target = parseInt(stat.textContent.replace('+', ''));
                            animateCounter(stat, target, 2000);
                        });
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsSection);
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function () {
            initCounters();

            // Newsletter form submission
            const newsletterForm = document.getElementById('newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;
                    alert(`Terima kasih! Email ${email} telah berlangganan newsletter kami.`);
                    this.reset();
                });
            }
        });
    </script>
</body>

</html>