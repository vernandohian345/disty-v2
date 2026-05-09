@extends('frontend.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
@endpush

@section('title', 'Disty Akademi - Profil')

<style>
    .profile-header {
        background: linear-gradient(135deg, #5239f1 0%, #ff8400 100%);
        color: white;
        padding: 3rem 1rem;
        border-radius: 0 0 20px 20px;
        position: relative;
        overflow: hidden;
    }

    .profile-header::after {
        content: "";
        position: absolute;
        top: -50px;
        right: -50px;
        width: 200px;
        height: 200px;
        background: rgba(255,255,255,0.15);
        border-radius: 50%;
    }

    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff8800, #ffb84d);
        border: 4px solid rgba(255,255,255,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-weight: bold;
        color: white;
        margin: auto;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    }

    .nav-pills .nav-link {
        border-radius: 50px;
        font-weight: 600;
        padding: .5rem 1.5rem;
        transition: all .3s;
    }

    .nav-pills .nav-link.active {
        background: linear-gradient(135deg, #ff8400, #ffb84d);
        color: #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .card-training {
        border-radius: 15px;
        transition: all .3s ease;
        overflow: hidden;
    }

    .card-training:hover {
        transform: translateY(-6px) scale(1.01);
        box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }

    .status-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        border-radius: 50px;
        padding: .4rem .8rem;
        font-size: .75rem;
        font-weight: 600;
        z-index: 5;
    }

    .btn-orange {
        background-color: #ff8400;
        border-color: #ff8400;
        color: white;
    }

    .btn-orange:hover {
        background-color: #e07600;
        border-color: #e07600;
        color: white;
    }

    /* Preview Container - PERBAIKAN */
    #previewContainerPelatihan,
    #previewContainerSertifikasi {
        margin-top: 15px;
        border: 2px dashed #ddd;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        max-height: 400px;
        overflow: hidden;
        background: #f8f9fa;
    }

    /* Preview Image - PERBAIKAN */
    #previewImagePelatihan,
    #previewImageSertifikasi {
        max-width: 100%;
        max-height: 300px;
        width: auto;
        height: auto;
        border-radius: 8px;
        object-fit: contain;
        display: block;
        margin: 0 auto;
    }

    /* Preview PDF - PERBAIKAN */
    #previewPdfPelatihan,
    #previewPdfSertifikasi {
        width: 100%;
        height: 350px;
        max-height: 350px;
        border: none;
        border-radius: 8px;
    }
</style>

@section('content')

<!-- Profil Header -->
<section class="profile-section">
    <div class="profile-header">
        <div class="container text-center text-white">
            <div class="avatar" style="background: {{ $user->avatar_color ?? '#ff8800' }};">
                {{ strtoupper(substr($user->name, 0, 2)) }}
            </div>
            <h2>{{ $user->name }}</h2>
            <p><i class="fas fa-envelope me-2"></i>{{ $user->email }}</p>
            <p><i class="fas fa-calendar-alt me-2"></i>Bergabung: {{ $user->created_at->format('d M Y') }}</p>
        </div>
    </div>
</section>

<!-- Tabs Section -->
<section class="tabs-section py-4">
    <div class="container">
        <h2 class="mb-4">Riwayat Pembelian</h2>

        <ul class="nav nav-pills justify-content-center mb-4" id="profileTabs" role="tablist">
            <li class="nav-item">
                <button class="nav-link active" data-bs-toggle="pill" data-bs-target="#pelatihan">
                    <i class="fas fa-chalkboard-teacher me-2"></i>Pelatihan
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link" data-bs-toggle="pill" data-bs-target="#sertifikasi">
                    <i class="fas fa-certificate me-2"></i>Sertifikasi
                </button>
            </li>
        </ul>

        <div class="tab-content">

            <!-- TAB PELATIHAN -->
            <div class="tab-pane fade show active" id="pelatihan">
                <div class="row g-3">
                    @forelse($transaksiPelatihan as $t)
                        @php
                            $statusBadge = [
                                'approved' => 'bg-success',
                                'pending' => 'bg-danger',
                                'paid' => 'bg-warning text-dark'
                            ];

                            $progress = 0;
                            if($t->status == 'paid') $progress = 50;
                            if($t->status == 'approved') $progress = 100;

                            $statusLabel = [
                                'pending' => 'Belum Bayar',
                                'paid' => 'Menunggu Verifikasi',
                                'approved' => 'Disetujui'
                            ];

                            $isGratis = $t->pelatihan->kategori == 'gratis';
                        @endphp

                        <div class="col-md-6 col-lg-4">
                            <div class="card card-training position-relative shadow-sm h-100">

                                {{-- Badge Kategori --}}
                                <span class="badge {{ $isGratis ? 'bg-success' : 'bg-info' }} position-absolute"
                                      style="top: 10px; right: 10px; z-index: 10;">
                                    {{ $isGratis ? 'Gratis' : 'Berbayar' }}
                                </span>

                                {{-- Badge Status --}}
                                @if(!$isGratis)
                                    <span class="badge {{ $statusBadge[$t->status] ?? 'bg-secondary' }} status-badge">
                                        {{ $statusLabel[$t->status] ?? ucfirst($t->status) }}
                                    </span>
                                @else
                                    <span class="badge bg-success status-badge">Aktif</span>
                                @endif

                                <img src="{{ asset('uploads/pelatihan/' . ($t->pelatihan->sampul ?? 'default.png')) }}"
                                     class="card-img-top"
                                     alt="{{ $t->pelatihan->nama_pelatihan }}">

                                <div class="card-body p-3">
                                    <h6>{{ $t->pelatihan->nama_pelatihan }}</h6>
                                    <small class="text-muted">
                                        <i class="far fa-calendar me-1"></i>
                                        {{ $t->created_at->format('d M Y') }}
                                    </small>

                                    {{-- PELATIHAN GRATIS --}}
                                    @if($isGratis)
                                        <hr class="my-2">

                                        <div class="mb-2">
                                            <small class="text-muted d-block">
                                                <i class="fas fa-clock me-1"></i>
                                                <strong>Durasi:</strong> {{ $t->pelatihan->durasi ?? '-' }}
                                            </small>
                                            <small class="text-muted d-block">
                                                <i class="fas fa-language me-1"></i>
                                                <strong>Bahasa:</strong> {{ $t->pelatihan->bahasa ?? 'Indonesia' }}
                                            </small>
                                        </div>

                                        <div class="d-flex flex-column gap-2 mt-3">
                                            @if($t->pelatihan->link_grup)
                                                <a href="{{ $t->pelatihan->link_grup }}"
                                                   class="btn btn-success btn-sm"
                                                   target="_blank">
                                                    <i class="fab fa-whatsapp me-1"></i> Gabung Grup WhatsApp
                                                </a>
                                            @else
                                                <button class="btn btn-secondary btn-sm" disabled>
                                                    <i class="fab fa-whatsapp me-1"></i> Link Grup Belum Tersedia
                                                </button>
                                            @endif

                                            @if($t->sertifikat_pelatihan)
                                                <a href="{{ asset('uploads/sertifikat_pelatihan/' . $t->sertifikat_pelatihan) }}"
                                                   class="btn btn-primary btn-sm"
                                                   target="_blank"
                                                   download>
                                                    <i class="fas fa-certificate me-1"></i> Unduh Sertifikat
                                                </a>
                                            @else
                                                <button class="btn btn-outline-secondary btn-sm" disabled>
                                                    <i class="fas fa-certificate me-1"></i> Sertifikat Belum Tersedia
                                                </button>
                                            @endif
                                        </div>

                                    {{-- PELATIHAN BERBAYAR --}}
                                    @else

                                        @if($t->status != 'pending')
                                            <div class="progress my-2" style="height:6px;">
                                                <div class="progress-bar {{ $t->status == 'approved' ? 'bg-success' : 'bg-warning' }}"
                                                     role="progressbar"
                                                     style="width: {{ $progress }}%;"></div>
                                            </div>
                                            <small class="text-muted">Progress: {{ $progress }}%</small>
                                        @endif

                                        @if($t->bukti)
                                            <div class="mt-2 p-2 bg-light rounded">
                                                <small class="text-success d-block mb-1">
                                                    <i class="fas fa-check-circle"></i> Bukti Pembayaran
                                                </small>
                                                @if(Str::endsWith($t->bukti, '.pdf'))
                                                    <a href="{{ asset('uploads/bukti_pelatihan/' . $t->bukti) }}"
                                                       target="_blank"
                                                       class="btn btn-info btn-sm w-100">
                                                        <i class="fas fa-file-pdf"></i> Lihat Bukti PDF
                                                    </a>
                                                @else
                                                    <a href="{{ asset('uploads/bukti_pelatihan/' . $t->bukti) }}"
                                                       target="_blank">
                                                        <img src="{{ asset('uploads/bukti_pelatihan/' . $t->bukti) }}"
                                                             alt="Bukti Pembayaran"
                                                             class="img-fluid rounded"
                                                             style="max-width: 100%; cursor: pointer;">
                                                    </a>
                                                @endif
                                            </div>
                                        @endif

                                        <div class="d-flex flex-wrap gap-2 mt-3">
                                            @if($t->status == 'approved')
                                                <button class="btn btn-success btn-sm flex-grow-1" disabled>
                                                    <i class="fas fa-check-circle"></i> Disetujui
                                                </button>

                                                @if($t->pelatihan->link_grup)
                                                    <a href="{{ $t->pelatihan->link_grup }}"
                                                       class="btn btn-primary btn-sm flex-grow-1"
                                                       target="_blank">
                                                        <i class="fab fa-whatsapp"></i> Gabung Grup
                                                    </a>
                                                @endif

                                                @if($t->sertifikat_pelatihan)
                                                    <a href="{{ asset('uploads/sertifikat_pelatihan/' . $t->sertifikat_pelatihan) }}"
                                                       class="btn btn-warning btn-sm w-100 mt-1"
                                                       target="_blank"
                                                       download>
                                                        <i class="fas fa-certificate"></i> Unduh Sertifikat
                                                    </a>
                                                @else
                                                    <button class="btn btn-outline-secondary btn-sm w-100 mt-1" disabled>
                                                        <i class="fas fa-certificate"></i> Sertifikat Belum Tersedia
                                                    </button>
                                                @endif

                                            @elseif($t->status == 'paid')
                                                <button class="btn btn-warning btn-sm flex-grow-1" disabled>
                                                    <i class="fas fa-clock"></i> Menunggu Verifikasi
                                                </button>
                                                <button class="btn btn-info btn-sm flex-grow-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#uploadPelatihanModal"
                                                        data-course="{{ $t->pelatihan->nama_pelatihan }}"
                                                        data-id="{{ $t->id }}">
                                                    <i class="fas fa-redo"></i> Upload Ulang
                                                </button>

                                            @else
                                                <button class="btn btn-danger btn-sm flex-grow-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#uploadPelatihanModal"
                                                        data-course="{{ $t->pelatihan->nama_pelatihan }}"
                                                        data-id="{{ $t->id }}">
                                                    <i class="fas fa-upload"></i> Upload Bukti Bayar
                                                </button>
                                                <button class="btn btn-secondary btn-sm flex-grow-1" disabled>
                                                    Belum Tersedia
                                                </button>
                                            @endif
                                        </div>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="col-12">
                            <div class="alert alert-info text-center">
                                <i class="fas fa-info-circle"></i> Belum ada transaksi pelatihan
                            </div>
                        </div>
                    @endforelse
                </div>
            </div>

            <!-- TAB SERTIFIKASI -->
            <div class="tab-pane fade" id="sertifikasi">
                <div class="row g-3">
                    @forelse($transaksiSertifikasi as $t)
                        @php
                            $statusBadge = [
                                'approved' => 'bg-success',
                                'pending' => 'bg-danger',
                                'paid' => 'bg-warning text-dark'
                            ];

                            $progress = 0;
                            if($t->status == 'paid') $progress = 50;
                            if($t->status == 'approved') $progress = 100;

                            $statusLabel = [
                                'pending' => 'Belum Bayar',
                                'paid' => 'Menunggu Verifikasi',
                                'approved' => 'Disetujui'
                            ];

                            $isGratis = $t->sertifikasi->kategori == 'gratis';
                        @endphp

                        <div class="col-md-6 col-lg-4">
                            <div class="card card-training position-relative shadow-sm h-100">

                                {{-- Badge Kategori --}}
                                <span class="badge {{ $isGratis ? 'bg-success' : 'bg-info' }} position-absolute"
                                      style="top: 10px; right: 10px; z-index: 10;">
                                    {{ $isGratis ? 'Gratis' : 'Berbayar' }}
                                </span>

                                {{-- Badge Status --}}
                                @if(!$isGratis)
                                    <span class="badge {{ $statusBadge[$t->status] ?? 'bg-secondary' }} status-badge">
                                        {{ $statusLabel[$t->status] ?? ucfirst($t->status) }}
                                    </span>
                                @else
                                    <span class="badge bg-success status-badge">Aktif</span>
                                @endif

                                <img src="{{ asset('uploads/sertifikasi/' . ($t->sertifikasi->sampul ?? 'default.png')) }}"
                                     class="card-img-top"
                                     alt="{{ $t->sertifikasi->nama_sertifikasi }}">

                                <div class="card-body p-3">
                                    <h6>{{ $t->sertifikasi->nama_sertifikasi }}</h6>
                                    <small class="text-muted">
                                        <i class="far fa-calendar me-1"></i>
                                        {{ $t->created_at->format('d M Y') }}
                                    </small>

                                    {{-- SERTIFIKASI GRATIS --}}
                                    @if($isGratis)
                                        <hr class="my-2">

                                        <div class="mb-2">
                                            <small class="text-muted d-block">
                                                <i class="fas fa-clock me-1"></i>
                                                <strong>Durasi:</strong> {{ $t->sertifikasi->durasi ?? '-' }}
                                            </small>
                                            <small class="text-muted d-block">
                                                <i class="fas fa-language me-1"></i>
                                                <strong>Bahasa:</strong> {{ $t->sertifikasi->bahasa ?? 'Indonesia' }}
                                            </small>
                                        </div>

                                        <div class="d-flex flex-column gap-2 mt-3">
                                            @if($t->sertifikasi->link_grup)
                                                <a href="{{ $t->sertifikasi->link_grup }}"
                                                   class="btn btn-success btn-sm"
                                                   target="_blank">
                                                    <i class="fab fa-whatsapp me-1"></i> Gabung Grup WhatsApp
                                                </a>
                                            @else
                                                <button class="btn btn-secondary btn-sm" disabled>
                                                    <i class="fab fa-whatsapp me-1"></i> Link Grup Belum Tersedia
                                                </button>
                                            @endif

                                            @if($t->sertifikat_sertifikasi)
                                                <a href="{{ asset('uploads/sertifikat_sertifikasi/' . $t->sertifikat_sertifikasi) }}"
                                                   class="btn btn-primary btn-sm"
                                                   target="_blank"
                                                   download>
                                                    <i class="fas fa-certificate me-1"></i> Unduh Sertifikat
                                                </a>
                                            @else
                                                <button class="btn btn-outline-secondary btn-sm" disabled>
                                                    <i class="fas fa-certificate me-1"></i> Sertifikat Belum Tersedia
                                                </button>
                                            @endif
                                        </div>

                                    {{-- SERTIFIKASI BERBAYAR --}}
                                    @else

                                        @if($t->status != 'pending')
                                            <div class="progress my-2" style="height:6px;">
                                                <div class="progress-bar {{ $t->status == 'approved' ? 'bg-success' : 'bg-warning' }}"
                                                     role="progressbar"
                                                     style="width: {{ $progress }}%;"></div>
                                            </div>
                                            <small class="text-muted">Progress: {{ $progress }}%</small>
                                        @endif

                                        @if($t->bukti)
                                            <div class="mt-2 p-2 bg-light rounded">
                                                <small class="text-success d-block mb-1">
                                                    <i class="fas fa-check-circle"></i> Bukti Pembayaran
                                                </small>
                                                @if(Str::endsWith($t->bukti, '.pdf'))
                                                    <a href="{{ asset('uploads/bukti_sertifikasi/' . $t->bukti) }}"
                                                       target="_blank"
                                                       class="btn btn-info btn-sm w-100">
                                                        <i class="fas fa-file-pdf"></i> Lihat Bukti PDF
                                                    </a>
                                                @else
                                                    <a href="{{ asset('uploads/bukti_sertifikasi/' . $t->bukti) }}"
                                                       target="_blank">
                                                        <img src="{{ asset('uploads/bukti_sertifikasi/' . $t->bukti) }}"
                                                             alt="Bukti Pembayaran"
                                                             class="img-fluid rounded"
                                                             style="max-width: 100%; cursor: pointer;">
                                                    </a>
                                                @endif
                                            </div>
                                        @endif

                                        <div class="d-flex flex-wrap gap-2 mt-3">
                                            @if($t->status == 'approved')
                                                <button class="btn btn-success btn-sm flex-grow-1" disabled>
                                                    <i class="fas fa-check-circle"></i> Disetujui
                                                </button>

                                                @if($t->sertifikasi->link_grup)
                                                    <a href="{{ $t->sertifikasi->link_grup }}"
                                                       class="btn btn-primary btn-sm flex-grow-1"
                                                       target="_blank">
                                                        <i class="fab fa-whatsapp"></i> Gabung Grup
                                                    </a>
                                                @endif

                                                @if($t->sertifikat_sertifikasi)
                                                    <a href="{{ asset('uploads/sertifikat_sertifikasi/' . $t->sertifikat_sertifikasi) }}"
                                                       class="btn btn-warning btn-sm w-100 mt-1"
                                                       target="_blank"
                                                       download>
                                                        <i class="fas fa-certificate"></i> Unduh Sertifikat
                                                    </a>
                                                @else
                                                    <button class="btn btn-outline-secondary btn-sm w-100 mt-1" disabled>
                                                        <i class="fas fa-certificate"></i> Sertifikat Belum Tersedia
                                                    </button>
                                                @endif

                                            @elseif($t->status == 'paid')
                                                <button class="btn btn-warning btn-sm flex-grow-1" disabled>
                                                    <i class="fas fa-clock"></i> Menunggu Verifikasi
                                                </button>
                                                <button class="btn btn-info btn-sm flex-grow-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#uploadSertifikasiModal"
                                                        data-course="{{ $t->sertifikasi->nama_sertifikasi }}"
                                                        data-id="{{ $t->id }}">
                                                    <i class="fas fa-redo"></i> Upload Ulang
                                                </button>

                                            @else
                                                <button class="btn btn-danger btn-sm flex-grow-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#uploadSertifikasiModal"
                                                        data-course="{{ $t->sertifikasi->nama_sertifikasi }}"
                                                        data-id="{{ $t->id }}">
                                                    <i class="fas fa-upload"></i> Upload Bukti Bayar
                                                </button>
                                                <button class="btn btn-secondary btn-sm flex-grow-1" disabled>
                                                    Belum Tersedia
                                                </button>
                                            @endif
                                        </div>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="col-12">
                            <div class="alert alert-info text-center">
                                <i class="fas fa-info-circle"></i> Belum ada transaksi sertifikasi
                            </div>
                        </div>
                    @endforelse
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Modal Upload Bukti PELATIHAN -->
<div class="modal fade" id="uploadPelatihanModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Upload Bukti Pembayaran Pelatihan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-3">
                    <strong>Pelatihan:</strong>
                    <span id="modalPelatihanName" class="text-primary"></span>
                </p>

                <form action="{{ route('profil.uploadBuktiPelatihan') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <input type="hidden" name="transaksi_id" id="modalPelatihanId">

                    <div class="mb-3">
                        <label class="form-label">Pilih File Bukti Pembayaran</label>
                        <input type="file"
                               name="bukti"
                               id="buktiPelatihan"
                               class="form-control"
                               accept="image/*,.pdf"
                               required>
                        <small class="text-muted">Format: JPG, PNG, PDF (Max 2MB)</small>
                    </div>

                    <!-- Preview Container -->
                    <div id="previewContainerPelatihan" style="display: none;">
                        <p class="text-muted mb-2"><strong>Preview:</strong></p>
                        <img id="previewImagePelatihan" class="d-none" alt="Preview">
                        <iframe id="previewPdfPelatihan" class="d-none"></iframe>
                    </div>

                    <button type="submit" class="btn btn-orange w-100 mt-3">
                        <i class="fas fa-upload"></i> Upload Bukti
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal Upload Bukti SERTIFIKASI -->
<div class="modal fade" id="uploadSertifikasiModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Upload Bukti Pembayaran Sertifikasi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-3">
                    <strong>Sertifikasi:</strong>
                    <span id="modalSertifikasiName" class="text-primary"></span>
                </p>

                <form action="{{ route('profil.uploadBuktiSertifikasi') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <input type="hidden" name="transaksi_id" id="modalSertifikasiId">

                    <div class="mb-3">
                        <label class="form-label">Pilih File Bukti Pembayaran</label>
                        <input type="file"
                               name="bukti"
                               id="buktiSertifikasi"
                               class="form-control"
                               accept="image/*,.pdf"
                               required>
                        <small class="text-muted">Format: JPG, PNG, PDF (Max 2MB)</small>
                    </div>

                    <!-- Preview Container -->
                    <div id="previewContainerSertifikasi" style="display: none;">
                        <p class="text-muted mb-2"><strong>Preview:</strong></p>
                        <img id="previewImageSertifikasi" class="d-none" alt="Preview">
                        <iframe id="previewPdfSertifikasi" class="d-none"></iframe>
                    </div>

                    <button type="submit" class="btn btn-orange w-100 mt-3">
                        <i class="fas fa-upload"></i> Upload Bukti
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Alert Notifikasi -->
@if(session('success'))
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: '{{ session("success") }}',
                confirmButtonColor: '#ff8400'
            });
        });
    </script>
@endif

@if(session('error'))
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '{{ session("error") }}',
                confirmButtonColor: '#ff8400'
            });
        });
    </script>
@endif

<script>
    // ===== MODAL PELATIHAN =====
    const uploadPelatihanModal = document.getElementById('uploadPelatihanModal');

    uploadPelatihanModal.addEventListener('show.bs.modal', function (event) {
        let button = event.relatedTarget;
        let transaksiId = button.getAttribute('data-id');
        let courseName = button.getAttribute('data-course');

        document.getElementById('modalPelatihanId').value = transaksiId;
        document.getElementById('modalPelatihanName').textContent = courseName;
    });

    // Preview file pelatihan
    uploadPelatihanModal.addEventListener('shown.bs.modal', function () {
        const buktiInput = document.getElementById('buktiPelatihan');
        const previewContainer = document.getElementById('previewContainerPelatihan');
        const previewImage = document.getElementById('previewImagePelatihan');
        const previewPdf = document.getElementById('previewPdfPelatihan');

        // Reset listener
        const newBuktiInput = buktiInput.cloneNode(true);
        buktiInput.parentNode.replaceChild(newBuktiInput, buktiInput);

        document.getElementById('buktiPelatihan').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) {
                previewContainer.style.display = 'none';
                return;
            }

            const fileURL = URL.createObjectURL(file);
            previewContainer.style.display = 'block';

            previewImage.classList.add('d-none');
            previewPdf.classList.add('d-none');

            if (file.type.startsWith('image/')) {
                previewImage.src = fileURL;
                previewImage.classList.remove('d-none');
            }

            if (file.type === 'application/pdf') {
                previewPdf.src = fileURL;
                previewPdf.classList.remove('d-none');
            }
        });
    });

    // ===== MODAL SERTIFIKASI =====
    const uploadSertifikasiModal = document.getElementById('uploadSertifikasiModal');

    uploadSertifikasiModal.addEventListener('show.bs.modal', function (event) {
        let button = event.relatedTarget;
        let transaksiId = button.getAttribute('data-id');
        let courseName = button.getAttribute('data-course');

        document.getElementById('modalSertifikasiId').value = transaksiId;
        document.getElementById('modalSertifikasiName').textContent = courseName;
    });

    // Preview file sertifikasi
    uploadSertifikasiModal.addEventListener('shown.bs.modal', function () {
        const buktiInput = document.getElementById('buktiSertifikasi');
        const previewContainer = document.getElementById('previewContainerSertifikasi');
        const previewImage = document.getElementById('previewImageSertifikasi');
        const previewPdf = document.getElementById('previewPdfSertifikasi');

        // Reset listener
        const newBuktiInput = buktiInput.cloneNode(true);
        buktiInput.parentNode.replaceChild(newBuktiInput, buktiInput);

        document.getElementById('buktiSertifikasi').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) {
                previewContainer.style.display = 'none';
                return;
            }

            const fileURL = URL.createObjectURL(file);
            previewContainer.style.display = 'block';

            previewImage.classList.add('d-none');
            previewPdf.classList.add('d-none');

            if (file.type.startsWith('image/')) {
                previewImage.src = fileURL;
                previewImage.classList.remove('d-none');
            }

            if (file.type === 'application/pdf') {
                previewPdf.src = fileURL;
                previewPdf.classList.remove('d-none');
            }
        });
    });
</script>

@endsection
