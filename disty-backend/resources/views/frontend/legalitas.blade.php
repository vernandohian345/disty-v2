@extends('frontend.app')

@push('styles')
    <style>
        .legalitas-img {
        max-width: 40%;
        height: auto;
        }

        @media (max-width: 768px) {
        .legalitas-img {
            max-width: 100%;
            margin-bottom: 1rem;
        }
        }

        /* section title */
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
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background: var(--primary-orange);
        border-radius: 2px;
        }

    </style>
@endpush
@section('title', 'Disty Akademi - Legalitas')

@section('content')
<section class="legalitas-section py-5">
  <div class="container">
    <h2 class="section-title text-center mb-5">Legalitas Perusahaan</h2>
    <div class="row align-items-center">

      <!-- Gambar Sertifikat -->
      <div class="col-md-6 text-center mb-4 mb-md-0">
        <img src="asset/sertifikat-tuk.jpg"
             alt="Sertifikat Lisensi Tempat Uji Kompetensi"
             class="img-fluid rounded shadow-sm legalitas-img">
      </div>

      <!-- Teks -->
      <div class="col-md-6">
        <h5 class="text-orange fw-bold mb-3">
          Sertifikat Lisensi Tempat Uji Kompetensi (TUK)
        </h5>
        <p>
          PT Disty Akademi telah mendapatkan lisensi resmi sebagai
          <strong>Tempat Uji Kompetensi (TUK)</strong> yang ditetapkan
          oleh <strong>Badan Nasional Sertifikasi Profesi (BNSP)</strong>.
          Dengan legalitas ini, perusahaan kami berhak menyelenggarakan
          uji kompetensi yang diakui secara nasional.
        </p>
      </div>

    </div>
  </div>
</section>


@endsection
