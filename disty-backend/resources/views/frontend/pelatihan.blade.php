@extends('frontend.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/pelatihan.css') }}">
@endpush
@section('title', 'Disty Akademi - Pelatihan')

@section('content')

    <!-- Hero Section -->
    <section class="hero position-relative d-flex align-items-center">
        <img src="{{ asset('asset/pelatihan-hero.png') }}"
            alt="Hero Pelatihan"
            class="hero-bg position-absolute w-100 h-100 top-0 start-0 object-fit-cover">

        <div class="overlay position-absolute top-0 start-0 w-100 h-100 d-md-none"></div>

        <div class="container position-relative z-2">
            <div class="row align-items-center">
                <div class="col-lg-6 text-center text-lg-start">
                    <p class="hero-eyebrow">Pilih Pelatihan Sesuai Minatmu</p>
                    <h1 class="hero-title mb-3">Belajar Skill Baru, Dari Dasar Hingga Mahir</h1>
                    <p class="hero-desc">
                        Tersedia kelas IT, desain, hingga bisnis — fleksibel, interaktif, dan dipandu mentor berpengalaman.
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
            <form action="{{ route('pelatihan.index') }}#search" method="GET" class="search-box d-flex">
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
                <a href="{{ route('pelatihan.index') }}#kategori"
                   class="btn filter-btn {{ request('kategori') == null ? 'active' : '' }}">
                   Semua Tipe
                </a>
                <a href="{{ route('pelatihan.index', ['kategori' => 'gratis']) }}#kategori"
                   class="btn filter-btn {{ request('kategori') == 'gratis' ? 'active' : '' }}">
                   Gratis
                </a>
                <a href="{{ route('pelatihan.index', ['kategori' => 'berbayar']) }}#kategori"
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
                <p>Menampilkan {{ $pelatihans->count() }} dari {{ $pelatihans->total() }} program pelatihan tersedia</p>
            </div>

            <div class="row g-4">
                @forelse($pelatihans as $item)
                    <div class="col-lg-3 col-md-6">
                        <a href="{{ route('pelatihan.show', $item->slug) }}" class="course-link">
                            <div class="course-card">
                                <div class="course-image">
                                    <span class="badge-level">{{ ucfirst($item->kategori) }}</span>
                                    <img src="{{ asset('uploads/pelatihan/' . $item->sampul) }}"
                                        alt="{{ $item->nama_pelatihan }}"
                                        class="course-thumbnail">
                                </div>
                                <div class="course-title">
                                    <h5>{{ $item->nama_pelatihan }}</h5>
                                    <div class="course-meta">
                                        <div class="course-date">
                                            <i class="far fa-calendar"></i>
                                            <span>{{ \Carbon\Carbon::parse($item->tanggal_pelatihan)->translatedFormat('d F Y') }}</span>
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
                    <p class="text-center">Tidak ada pelatihan ditemukan.</p>
                @endforelse
            </div>

            <!-- Pagination -->
            @if ($pelatihans->total() > 16)
                <div class="mt-4">
                    {{ $pelatihans->links('vendor.pagination.bootstrap-5') }}
                </div>
            @endif

        </div>
    </section>

@endsection
