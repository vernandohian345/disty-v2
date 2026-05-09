@extends('frontend.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/sertifikasi.css') }}">
@endpush
@section('title', 'Disty Akademi - Sertifikasi')

@section('content')

    <!-- Hero Section -->
    <section class="hero position-relative d-flex align-items-center">
        <img src="{{ asset('asset/sertifikasi-hero.png') }}"
            alt="Hero Sertifikasi"
            class="hero-bg position-absolute w-100 h-100 top-0 start-0 object-fit-cover">

        <div class="overlay position-absolute top-0 start-0 w-100 h-100 d-md-none"></div>

        <div class="container position-relative z-2">
            <div class="row align-items-center">
                <!-- Konten kiri -->
                <div class="col-lg-6 text-center text-lg-start">
                    <p class="hero-eyebrow">Uji Kompetensi &amp; Dapatkan Sertifikat Resmi</p>
                    <h1 class="hero-title mb-3">Buktikan Keahlianmu dengan Sertifikasi BNSP</h1>
                    <p class="hero-desc">
                        Tingkatkan kredibilitasmu di dunia kerja dengan sertifikat kompetensi nasional yang diakui industri.
                    </p>
                    <div class="mt-4">
                        <a href="#card" class="btn btn-custom-secondary">Lihat Program</a>
                    </div>
                </div>
                <div class="col-lg-6 d-none d-lg-block"></div>
            </div>
        </div>
    </section>

    <!-- Search Section -->
    <section class="search-section mt-5" id="search">
        <div class="container">
            <form action="{{ route('sertifikasi.index') }}#search" method="GET" class="search-box d-flex">
                <input type="text"
                       name="q"
                       value="{{ request('q') }}"
                       class="search-input"
                       placeholder="Apa yang ingin kamu pelajari hari ini?">
                <button type="submit" class="search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section py-4" id="kategori">
        <div class="container">
            <div class="d-flex flex-wrap justify-content-center mb-3">
                <a href="{{ route('sertifikasi.index') }}#kategori"
                   class="btn filter-btn {{ request('kategori') == null ? 'active' : '' }}">
                   Semua Tipe
                </a>
                <a href="{{ route('sertifikasi.index', ['kategori' => 'gratis']) }}#kategori"
                   class="btn filter-btn {{ request('kategori') == 'gratis' ? 'active' : '' }}">
                   Gratis
                </a>
                <a href="{{ route('sertifikasi.index', ['kategori' => 'berbayar']) }}#kategori"
                   class="btn filter-btn {{ request('kategori') == 'berbayar' ? 'active' : '' }}">
                   Berbayar
                </a>
            </div>
        </div>
    </section>

    <!-- Course Grid -->
    <section class="course-grid" id="card">
        <div class="container mb-5">
            <hr class="mb-4">

            <div class="results-info">
                <p>Menampilkan {{ $sertifikasis->count() }} dari {{ $sertifikasis->total() }} program sertifikasi tersedia</p>
            </div>

            <div class="row g-4">
                @forelse($sertifikasis as $item)
                    <div class="col-lg-3 col-md-6">
                        <a href="{{ route('sertifikasi.show', $item->slug) }}" class="course-link">
                            <div class="course-card">
                                <div class="course-image">
                                    <span class="badge-level">{{ ucfirst($item->kategori) }}</span>
                                    <img src="{{ asset('uploads/sertifikasi/' . $item->sampul) }}"
                                        alt="{{ $item->nama_sertifikasi }}"
                                        class="course-thumbnail">
                                </div>
                                <div class="course-title">
                                    <h5>{{ $item->nama_sertifikasi }}</h5>
                                    <div class="course-meta">
                                        <div class="course-date">
                                            <i class="far fa-calendar"></i>
                                            <span>{{ \Carbon\Carbon::parse($item->tanggal_sertifikasi)->translatedFormat('d F Y') }}</span>
                                        </div>
                                        <div class="course-price">
                                            <i class="fa-solid fa-tag"></i>
                                            @if($item->kategori == 'gratis')
                                                <span>Gratis</span>
                                            @else
                                                <span>Rp {{ number_format($item->harga, 0, ',', '.') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                @empty
                    <p class="text-center">Tidak ada sertifikasi ditemukan.</p>
                @endforelse
            </div>

            <!-- Pagination -->
            @if ($sertifikasis->total() > 16)
                <div class="mt-4">
                    {{ $sertifikasis->links('vendor.pagination.bootstrap-5') }}
                </div>
            @endif

        </div>
    </section>

@endsection
