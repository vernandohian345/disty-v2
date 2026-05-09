@extends('frontend.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/blog.css') }}">
@endpush

@section('title', 'Disty Akademi - Blog')

@section('content')

<!-- === Carousel === -->
<section class="news-hero mb-5">
  <div id="newsCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">

      <!-- Slide 1 -->
      <div class="carousel-item active" style="background-image: url('asset/magangdisty.png');">
        <a href="detail-blog" class="carousel-link">
          <div class="carousel-overlay">
            <span class="badge bg-danger mb-2">Berita</span>
            <h2 class="carousel-title">Revolusi Teknologi Indonesia 2025: Dari Fintech AI Hingga Startup Unicorn Baru</h2>
            <p class="carousel-date">September 6, 2025</p>
          </div>
        </a>
      </div>

      <!-- Slide 2 -->
      <div class="carousel-item" style="background-image: url('asset/training.jpg');">
        <a href="detail-blog" class="carousel-link">
          <div class="carousel-overlay">
            <span class="badge bg-danger mb-2">Berita</span>
            <h2 class="carousel-title">Pemerintah Resmikan Ekosistem Smart City di Ibu Kota Baru</h2>
            <p class="carousel-date">September 5, 2025</p>
          </div>
        </a>
      </div>

      <!-- Slide 3 -->
      <div class="carousel-item" style="background-image: url('asset/laravel.jpeg');">
        <a href="detail-blog" class="carousel-link">
          <div class="carousel-overlay">
            <span class="badge bg-danger mb-2">Berita</span>
            <h2 class="carousel-title">Pelatihan Gratis UI/UX untuk Mahasiswa: Daftar Sekarang</h2>
            <p class="carousel-date">September 1, 2025</p>
          </div>
        </a>
      </div>

    </div>

    <!-- Controls -->
    <button class="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</section>

<!-- === Section Berita === -->
<section class="news-section my-5">
  <div class="container">

    <!-- Search Bar di Atas -->
    <section class="search-section mt-5 mb-5">
        <div class="container">
            <div class="search-box">
                <input type="text" class="search-input" placeholder="Cari berita terbaru?">
                <button class="search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    </section>

    <div class="row g-4">

      <!-- Kolom Kiri: Card Berita -->
      <div class="col-lg-8">

        <!-- Card Berita Utama -->
        <a href="detail-blog" class="text-decoration-none text-dark">
  <div class="card news-card border-0 border-bottom mb-3 pb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="asset/training.jpg" class="img-fluid rounded-start news-thumb" alt="Berita 1">
      </div>
      <div class="col-md-8">
        <div class="card-body p-2">
          <span class="badge bg-danger mb-2">Berita</span>
          <h5 class="card-title mb-1">Pelatihan Digital Marketing untuk UMKM</h5>
          <p class="card-text text-muted small mb-1">September 3, 2025</p>
          <p class="card-text small">Program pelatihan ini bertujuan membantu UMKM mengembangkan strategi pemasaran digital agar bisa bersaing di era modern.</p>
        </div>
      </div>
    </div>
  </div>
</a>

<a href="detail-blog" class="text-decoration-none text-dark">
  <div class="card news-card border-0 border-bottom mb-3 pb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="asset/magangdisty.png" class="img-fluid rounded-start news-thumb" alt="Berita 2">
      </div>
      <div class="col-md-8">
        <div class="card-body p-2">
          <span class="badge bg-danger mb-2">Berita</span>
          <h5 class="card-title mb-1">Workshop UI/UX Design untuk Mahasiswa</h5>
          <p class="card-text text-muted small mb-1">September 2, 2025</p>
          <p class="card-text small">Acara ini mengajarkan dasar-dasar desain antarmuka yang menarik sekaligus pengalaman pengguna yang optimal.</p>
        </div>
      </div>
    </div>
  </div>
</a>

      </div>

      <!-- Kolom Kanan: Sidebar -->
      <div class="col-lg-4">


       <!-- Sidebar: Berita Populer -->
        <div class="card mb-4 shadow-sm border-0">
        <div class="card-body">
            <h5 class="mb-3">Berita Populer</h5>

            <!-- Mini Card -->
            <a href="#" class="d-flex mb-3 text-decoration-none text-dark align-items-center">
            <img src="asset/magangdisty.png" class="populer-thumb me-3" alt="populer1">
            <div>
                <h6 class="mb-1">🚀 Startup Lokal Dapat Pendanaan Seri A</h6>
                <small class="text-muted">Sep 1, 2025</small>
            </div>
            </a>

            <a href="#" class="d-flex mb-3 text-decoration-none text-dark align-items-center">
            <img src="asset/laravel.jpeg" class="populer-thumb me-3" alt="populer2">
            <div>
                <h6 class="mb-1">📱 Tren Teknologi Mobile 2025</h6>
                <small class="text-muted">Aug 30, 2025</small>
            </div>
            </a>

            <a href="#" class="d-flex text-decoration-none text-dark align-items-center">
            <img src="asset/training.jpg" class="populer-thumb me-3" alt="populer3">
            <div>
                <h6 class="mb-1">🌱 Green Tech Mulai Dilirik Investor</h6>
                <small class="text-muted">Aug 28, 2025</small>
            </div>
            </a>

        </div>
        </div>


        <!-- Kategori -->
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="mb-3">Kategori</h5>
            <div class="d-flex flex-wrap gap-2">
              <a href="#" class="badge bg-primary text-decoration-none">Pengumuman</a>
              <a href="#" class="badge bg-success text-decoration-none">Pengetahuan</a>
              <a href="#" class="badge bg-warning text-decoration-none">Pendidikan</a>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</section>


@endsection
