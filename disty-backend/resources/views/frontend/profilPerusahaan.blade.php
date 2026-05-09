@extends('frontend.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/profilPerusahaan.css') }}">
@endpush
@section('title', 'Disty Akademi - Profil')

@section('content')

    <!-- Tentang Perusahaan -->
    <section class="py-5">
    <div class="container">
        <h2 class="section-title text-center">Tentang Perusahaan</h2>
        <div class="row align-items-center">
            <div class="col-lg-6 d-flex align-items-center mb-4 mb-md-0">
                <img src="asset/company.jpg" class="img-fluid h-100 rounded-3 shadow-sm" alt="Gedung">
            </div>

        <div class="col-lg-6 mt-1">
            <p>
                Disty Academy adalah lembaga pelatihan kerja yang
                didedikasikan untuk memberikan pembekalan
                keterampilan, pengetahuan dan sikap kerja yang
                diperlukan untuk berhasil di dunia kerja sesuai dengan
                Standar Kompetensi Kerja Nasional Indonesia (SKKNI).
                Dengan berbagai program pelatihan yang disesuaikan
                dengan kebutuhan industri dan dunia kerja, kami
                bertujuan untuk membantu individu mewujudkan potensi
                terbaik mereka.
            </p>
        </div>
        </div>
    </div>
    </section>

    <!-- Visi & Misi -->
    <section class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title text-center">Visi & Misi</h2>
        <div class="row">
        <div class="col-md-6">
            <h4>Visi</h4>
            <p>
                Menjadi Lembaga pelatihan nasional yang terbaik, terkemuka dan
                terpercaya dalam memberikan menyelenggarakan pendidikan dan
                pelatihan berbasis kompetensi sesuai dengan Standar Kompetensi Kerja
                Nasional Indonesia (SKKNI)..
            </p>
        </div>
        <div class="col-md-6">
            <h4>Misi</h4>
            <ul>
            <li>Mendukung pengembangan sumberdaya manusia yang unggul dan berdaya saing.</li>
            <li>Melaksanakan pendiikan dan pelatihan berbasis kompetensi sesuai dengan SKKNI</li>
            <li>
                Menyelenggarakan pelatihan sesuai dengan kebutuhan pelanggan serta mengikuti perkembangan
                zaman, agar dapat mendukung pertumbuhan dan pengembangan bisnis perusahaan klien.
            </li>
            <li>Menyediakan fasilitas dan lingkungan belajar yang kondusif untuk pertumbuhan dan perkembangan individu</li>
            <li>Memberikan pelayanan terbaik yang mengutamakan kepuasan pelanggan.</li>
            </ul>
        </div>
        </div>
    </div>
    </section>

    <!-- Logo & Makna -->
    <section class="py-5">
    <div class="container text-center">
        <h2 class="section-title">Logo & Makna</h2>
        <img src="asset/logo.png" alt="Logo Perusahaan" class="img-fluid mb-3" style="max-width: 200px;">
        <p>
        Logo Disty Akademi melambangkan inovasi, kreativitas, dan semangat kolaborasi.
        Warna biru melambangkan profesionalitas, sedangkan oranye mencerminkan energi dan optimisme.
        </p>
    </div>
    </section>

@endsection
