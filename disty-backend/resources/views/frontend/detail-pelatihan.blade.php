@extends('frontend.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/detail.css') }}">
@endpush

@section('title', 'Disty Akademi - ' . $pelatihan->nama_pelatihan)

@section('content')
    <!-- Hero -->
    <section class="course-detail-hero py-5 border-bottom">
        <div class="container">
            <div class="row align-items-center">

                <!-- Sampul -->
                <div class="col-lg-5 mb-4 mb-lg-0">
                    <img src="{{ asset('uploads/pelatihan/' . $pelatihan->sampul) }}"
                         alt="{{ $pelatihan->nama_pelatihan }}"
                         class="img-fluid rounded shadow">
                </div>

                <!-- Konten -->
                <div class="col-lg-7">
                    <!-- Badge kategori -->
                    <span class="badge {{ $pelatihan->kategori == 'gratis' ? 'bg-success' : 'bg-warning text-dark' }} mb-2 px-3 py-2">
                        <i class="fas fa-{{ $pelatihan->kategori == 'gratis' ? 'check-circle' : 'tag' }} me-1"></i>
                        {{ ucfirst($pelatihan->kategori) }}
                    </span>

                    <h2 class="fw-bold mb-3">{{ $pelatihan->nama_pelatihan }}</h2>

                    <ul class="list-unstyled mb-4">
                        <li class="mb-2">
                            <i class="far fa-calendar me-2 text-primary"></i>
                            <strong>Tanggal:</strong>
                            {{ \Carbon\Carbon::parse($pelatihan->tanggal_pelatihan)->translatedFormat('d F Y') }}
                        </li>
                        <li class="mb-2">
                            <i class="fa-solid fa-tag me-2 text-primary"></i>
                            <strong>Harga:</strong>
                            <span class="text-{{ $pelatihan->kategori == 'gratis' ? 'success' : 'warning' }} fw-bold">
                                {{ $pelatihan->kategori == 'gratis'
                                    ? 'GRATIS'
                                    : 'Rp ' . number_format($pelatihan->harga, 0, ',', '.') }}
                            </span>
                        </li>
                        <li class="mb-2">
                            <i class="fa-regular fa-clock me-2 text-primary"></i>
                            <strong>Durasi:</strong> {{ $pelatihan->durasi }}
                        </li>
                        <li class="mb-2">
                            <i class="fa-solid fa-language me-2 text-primary"></i>
                            <strong>Bahasa:</strong> {{ $pelatihan->bahasa }}
                        </li>
                    </ul>

                    <!-- CTA -->
                    <button type="button" class="btn btn-orange btn-lg px-4" data-bs-toggle="modal" data-bs-target="#registerModal">
                        <i class="fas fa-user-plus me-2"></i>
                        Daftar Sekarang
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Deskripsi & Materi -->
    <section class="course-desc-section py-5">
        <div class="container">
            <div class="row g-4">
                <!-- KIRI -->
                <div class="col-lg-8">
                    <!-- Deskripsi -->
                    <div class="desc-block mb-4">
                        <h3 class="desc-title">
                            <i class="fas fa-info-circle text-primary me-2"></i>
                            Deskripsi Pelatihan
                        </h3>
                        <p class="text-muted">{{ $pelatihan->deskripsi }}</p>
                    </div>

                    <!-- Materi -->
                    <div class="desc-block">
                        <h3 class="desc-title">
                            <i class="fas fa-book-open text-primary me-2"></i>
                            Materi yang Dipelajari
                        </h3>
                        <ul class="benefit-list">
                            @foreach(explode("\n", $pelatihan->materi) as $materi)
                                @if(trim($materi) != '')
                                    <li>
                                        <i class="fa-solid fa-circle-check me-2 text-success"></i>
                                        {{ trim($materi) }}
                                    </li>
                                @endif
                            @endforeach
                        </ul>
                    </div>
                </div>

                <!-- KANAN -->
                <div class="col-lg-4">
                    <div class="benefit-card shadow-sm">
                        <h4 class="mb-3 text-primary">
                            <i class="fa-solid fa-gift me-2"></i>
                            Benefit yang Kamu Dapat
                        </h4>

                        <ul class="benefit-list">
                            <li><i class="fa-solid fa-certificate text-warning"></i> E-Certificate resmi</li>
                            <li><i class="fa-solid fa-video text-danger"></i> Live class + Q&A bareng mentor</li>
                            <li><i class="fa-solid fa-book text-primary"></i> Studi kasus & tugas praktis</li>
                            <li><i class="fa-solid fa-diagram-project text-success"></i> Project portfolio nyata</li>
                            <li><i class="fa-solid fa-people-group text-info"></i> Komunitas & networking</li>
                            <li><i class="fa-solid fa-infinity text-secondary"></i> Akses materi rekaman</li>
                        </ul>

                        <button type="button" class="btn btn-orange w-100 btn-lg" data-bs-toggle="modal" data-bs-target="#registerModal">
                            <i class="fas fa-user-plus me-2"></i>
                            Daftar Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal Form -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title">
                        <i class="fas fa-user-edit me-2 text-primary"></i>
                        Form Pendaftaran
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form action="{{ route('transaksi.pelatihan.store') }}" method="POST" id="formDaftar">
                        @csrf
                        <input type="hidden" name="pelatihan_id" value="{{ $pelatihan->id }}">

                        <div class="mb-3">
                            <label class="form-label">
                                <i class="fas fa-user me-1"></i>
                                Nama Lengkap
                            </label>
                            <input type="text"
                                   name="nama"
                                   class="form-control"
                                   placeholder="Masukkan nama lengkap"
                                   value="{{ auth()->check() ? auth()->user()->name : '' }}"
                                   required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">
                                <i class="fas fa-envelope me-1"></i>
                                Email
                            </label>
                            <input type="email"
                                   name="email"
                                   class="form-control"
                                   placeholder="Masukkan email"
                                   value="{{ auth()->check() ? auth()->user()->email : '' }}"
                                   required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">
                                <i class="fas fa-phone me-1"></i>
                                Nomor HP
                            </label>
                            <input type="text"
                                   name="nomor_hp"
                                   class="form-control"
                                   placeholder="Contoh: 081234567890"
                                   required>
                        </div>

                        @if($pelatihan->kategori == 'berbayar')
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fas fa-credit-card me-1"></i>
                                    Metode Pembayaran
                                </label>

                                {{-- Transfer --}}
                                <div class="form-check mb-2">
                                    <input class="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="transfer"
                                        value="transfer"
                                        required>
                                    <label class="form-check-label" for="transfer">
                                        <i class="fas fa-university text-primary"></i>
                                        Transfer Bank
                                    </label>
                                </div>

                                {{-- COD --}}
                                <div class="form-check">
                                    <input class="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="cod"
                                        value="cod">
                                    <label class="form-check-label" for="cod">
                                        <i class="fas fa-money-bill-wave text-success"></i>
                                        Bayar di Tempat (COD)
                                    </label>
                                </div>
                            </div>

                            <!-- Nomor Rekening (muncul kalau pilih Transfer) -->
                            <div class="collapse" id="rekeningCollapse">
                                <div class="card card-body bg-light border-0 shadow-sm">
                                    <p class="fw-bold mb-2">
                                        <i class="fas fa-university text-primary me-1"></i>
                                        Nomor Rekening Tujuan:
                                    </p>
                                    <div class="d-flex align-items-center mb-2">
                                        <input type="text"
                                               id="rekeningNumber"
                                               class="form-control me-2"
                                               value="1234567890"
                                               readonly>
                                        <button type="button"
                                                class="btn btn-orange btn-sm"
                                                onclick="copyRekening()">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                    <p class="mb-1 small text-muted">
                                        <i class="fas fa-building me-1"></i>
                                        <strong>Bank:</strong> BCA
                                    </p>
                                    <p class="mb-2 small text-muted">
                                        <i class="fas fa-user me-1"></i>
                                        <strong>Atas Nama:</strong> PT Disty Akademi
                                    </p>
                                    <div class="alert alert-info mb-0 py-2">
                                        <i class="fas fa-info-circle me-1"></i>
                                        <small>Setelah transfer, bukti bisa diunggah di menu <strong>Profil</strong>.</small>
                                    </div>
                                </div>
                            </div>
                        @endif

                        <button class="btn btn-orange w-100 mt-3 btn-lg" type="submit">
                            <i class="fas fa-paper-plane me-2"></i>
                            Kirim Pendaftaran
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Rekomendasi -->
    <section class="course-grid bg-light py-5">
        <div class="container">
            <h3 class="desc-title mb-4">
                <i class="fas fa-star text-warning me-2"></i>
                Rekomendasi Pelatihan Lainnya
            </h3>
            <div class="row g-4">
                @forelse($rekomendasi as $item)
                    <div class="col-lg-3 col-md-6">
                        <a href="{{ route('pelatihan.show', $item->slug) }}" class="course-link text-decoration-none">
                            <div class="course-card shadow-sm h-100">
                                <div class="course-image position-relative">
                                    <span class="badge-level">{{ ucfirst($item->kategori) }}</span>
                                    <img src="{{ asset('uploads/pelatihan/' . $item->sampul) }}"
                                        alt="{{ $item->nama_pelatihan }}"
                                        class="course-thumbnail">
                                </div>
                                <div class="course-title p-3">
                                    <h5 class="mb-3">{{ $item->nama_pelatihan }}</h5>
                                    <div class="course-meta">
                                        <div class="course-date mb-2">
                                            <i class="far fa-calendar text-primary"></i>
                                            <span>{{ \Carbon\Carbon::parse($item->tanggal_pelatihan)->translatedFormat('d F Y') }}</span>
                                        </div>
                                        <div class="course-price">
                                            <i class="fa-solid fa-tag text-warning"></i>
                                            <span class="fw-bold">
                                                {{ $item->kategori === 'gratis'
                                                    ? 'Gratis'
                                                    : 'Rp ' . number_format($item->harga, 0, ',', '.') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="alert alert-info text-center">
                            <i class="fas fa-info-circle me-2"></i>
                            Belum ada rekomendasi untuk kategori ini.
                        </div>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    <!-- Toast Copy -->
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 1100;">
        <div id="copyToast" class="toast align-items-center text-bg-success border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-check-circle me-2"></i>
                    Nomor rekening berhasil dicopy!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    </div>

    <!-- SweetAlert2 & Custom Styles -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    {{-- Notifikasi Success --}}
    @if(session('success'))
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let res = "{{ session('success') }}";

            const swalConfig = {
                customClass: {
                    popup: 'rounded-4 shadow-lg border-0',
                    confirmButton: 'btn btn-orange px-4',
                    cancelButton: 'btn btn-outline-secondary px-4'
                },
                buttonsStyling: false,
                background: '#fff',
                width: '450px',
                padding: '2rem'
            };

            /* GRATIS */
            if (res.startsWith("gratis|")) {
                let link = res.split("|")[1];

                Swal.fire({
                    ...swalConfig,
                    icon: "success",
                    title: "🎉 Pendaftaran Berhasil!",
                    html: `
                        <div class="text-center py-2">
                            <p class="fw-semibold text-dark mb-2 fs-6">
                                Selamat Bergabung di DISTY AKADEMI!
                            </p>
                            <p class="text-muted small mb-3">
                                Terima kasih telah mendaftar. Silakan gabung ke grup WhatsApp
                                untuk memulai perjalanan belajar Anda.
                            </p>
                            <hr>
                            <a href="${link}" target="_blank"
                               class="btn btn-orange w-100 fw-semibold py-2 mt-2">
                                <i class="fab fa-whatsapp me-2"></i>
                                Gabung Grup WhatsApp
                            </a>
                            <button onclick="Swal.close()"
                                    class="btn btn-outline-secondary w-100 py-2 mt-2">
                                Tutup
                            </button>
                        </div>
                    `
                });
            }

            /* BERBAYAR */
            else if (res === "berbayar") {
                Swal.fire({
                    ...swalConfig,
                    icon: "success",
                    title: "✅ Pendaftaran Berhasil!",
                    html: `
                        <div class="text-center py-2">
                            <p class="fw-semibold text-dark mb-2 fs-6">
                                Langkah Selanjutnya
                            </p>
                            <p class="text-muted small mb-3">
                                Silakan selesaikan pembayaran di menu <strong>Profil</strong>
                                untuk mengakses materi pelatihan.
                            </p>
                            <hr>
                            <button onclick="redirectToProfile()"
                                    class="btn btn-orange w-100 fw-semibold py-2 mt-2">
                                <i class="fas fa-credit-card me-2"></i>
                                Lanjutkan Pembayaran
                            </button>
                            <button onclick="Swal.close()"
                                    class="btn btn-outline-secondary w-100 py-2 mt-2">
                                Nanti Saja
                            </button>
                        </div>
                    `
                });
            }
        });

        function redirectToProfile() {
            window.location.href = "/profil";
        }
    </script>
    @endif

    {{-- Notifikasi Error --}}
    @if(session('error'))
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                icon: 'error',
                title: '❌ Oops... Ada Kesalahan!',
                text: "{{ session('error') }}",
                confirmButtonText: 'Tutup',
                customClass: {
                    popup: 'rounded-4 shadow-lg border-0',
                    confirmButton: 'btn btn-orange px-4'
                },
                buttonsStyling: false,
                width: '450px'
            });
        });
    </script>
    @endif

    {{-- Validation Errors --}}
    @if($errors->any())
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let errorList = '';
            @foreach($errors->all() as $error)
                errorList += '<li class="text-start">{{ $error }}</li>';
            @endforeach

            Swal.fire({
                icon: 'error',
                title: '❌ Terjadi Kesalahan',
                html: `
                    <div class="text-start">
                        <p class="mb-2">Mohon periksa kembali:</p>
                        <ul class="text-danger">${errorList}</ul>
                    </div>
                `,
                confirmButtonText: 'Tutup',
                customClass: {
                    popup: 'rounded-4 shadow-lg border-0',
                    confirmButton: 'btn btn-orange px-4'
                },
                buttonsStyling: false,
                width: '450px'
            });
        });
    </script>
    @endif

    <script>
        // Copy rekening
        function copyRekening() {
            const rekening = document.getElementById("rekeningNumber");
            rekening.select();
            rekening.setSelectionRange(0, 99999);
            document.execCommand("copy");

            const toast = new bootstrap.Toast(document.getElementById('copyToast'));
            toast.show();
        }

        // Toggle rekening collapse
        document.addEventListener("DOMContentLoaded", function () {
            const transfer = document.getElementById("transfer");
            const cod = document.getElementById("cod");
            const rekening = document.getElementById("rekeningCollapse");

            transfer?.addEventListener("change", () => {
                rekening.classList.add("show");
            });

            cod?.addEventListener("change", () => {
                rekening.classList.remove("show");
            });
        });
    </script>

@endsection
