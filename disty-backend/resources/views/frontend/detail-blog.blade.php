@extends('frontend.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/detail-blog.css') }}">
@endpush

@section('title', 'Disty Akademi - Detail Berita')

@section('content')

    <!-- Konten Utama -->
    <section class="container my-5" style="padding-top: 8px;">
        <div class="row">
            <!-- Konten Berita Utama -->
            <div class="col-lg-8 main-content">
                <article class="card border-0 mb-4">
                    <div class="card-body">
                        <!-- Judul & Meta -->
                        <div class="mb-3">
                            <span class="badge bg-primary me-2">Pengumuman</span>
                            <span class="badge bg-success">Magang</span>
                        </div>
                        <h2 class="fw-bold mb-3">Pengumuman Program Magang Disty Akademi 2025</h2>
                        <div class="d-flex align-items-center mb-4">
                            <img src="asset/logo.png" alt="logo" class="rounded-circle me-2" width="40">
                            <div>
                                <strong>Admin Disty</strong> · <small class="text-muted">3 Min Baca</small><br>
                                <small class="text-muted">September 9, 2025</small>
                            </div>
                        </div>
                        <!-- Gambar -->
                        <img src="asset/magangdisty.png" alt="Magang Disty" class="img-fluid rounded mb-4">

                        <!-- Isi Berita -->
                        <p>Disty Akademi dengan bangga mengumumkan pembukaan Program Magang 2025.
                        Program ini ditujukan bagi mahasiswa dan fresh graduate yang ingin
                        memperdalam pengalaman kerja nyata di bidang teknologi informasi.</p>

                        <p>Peserta akan mendapatkan pembimbingan langsung dari para profesional,
                        kesempatan mengerjakan proyek nyata, serta akses ke berbagai pelatihan
                        eksklusif dari Disty Akademi.</p>

                        <p><strong>Benefit Program:</strong></p>
                        <ul>
                            <li>Pendampingan oleh mentor berpengalaman</li>
                            <li>Sertifikat resmi setelah program berakhir</li>
                            <li>Kesempatan direkrut menjadi bagian dari Disty Teknologi</li>
                        </ul>

                        <p><strong>Periode Pendaftaran:</strong> 10 September – 30 September 2025</p>
                        <p><strong>Link Pendaftaran:</strong> <a href="#">bit.ly/daftar-magang-disty</a></p>
                    </div>
                </article>

                <!-- Kolom Komentar -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="mb-3">Kolom Komentar</h5>
                        <form>
                            <div class="mb-3">
                                <label for="nama" class="form-label">Nama</label>
                                <input type="text" id="nama" class="form-control" placeholder="Masukkan nama Anda">
                            </div>
                            <div class="mb-3">
                                <label for="komentar" class="form-label">Komentar</label>
                                <textarea id="komentar" rows="3" class="form-control" placeholder="Tulis komentar Anda..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Kirim</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Sidebar Berita Populer -->
            <div class="col-lg-4">
                <div class="sticky-sidebar-container">
                    <div class="sticky-sidebar">
                        <div class="card mb-4 shadow-sm border-0">
                            <div class="card-body">
                                <h5 class="mb-3">🔥 Berita Populer</h5>

                                <a href="#" class="d-flex mb-3 text-decoration-none text-dark align-items-center">
                                    <img src="asset/magangdisty.png" class="populer-thumb me-3 rounded" width="70" alt="populer1">
                                    <div>
                                        <h6 class="mb-1">📢 Pengumuman Program Magang 2025</h6>
                                        <small class="text-muted">Sep 9, 2025</small>
                                    </div>
                                </a>

                                <a href="#" class="d-flex mb-3 text-decoration-none text-dark align-items-center">
                                    <img src="asset/laravel.jpeg" class="populer-thumb me-3 rounded" width="70" alt="populer2">
                                    <div>
                                        <h6 class="mb-1">📱 Tren Teknologi Mobile 2025</h6>
                                        <small class="text-muted">Aug 30, 2025</small>
                                    </div>
                                </a>

                                <a href="#" class="d-flex text-decoration-none text-dark align-items-center">
                                    <img src="asset/training.jpg" class="populer-thumb me-3 rounded" width="70" alt="populer3">
                                    <div>
                                        <h6 class="mb-1">🌱 Green Tech Mulai Dilirik Investor</h6>
                                        <small class="text-muted">Aug 28, 2025</small>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

@endsection
