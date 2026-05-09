@extends('admin.layout')

@section('title', 'Pembayaran Peserta')

@section('content')
<div class="container-fluid p-4">

    <!-- Header -->
    <div class="mb-4">
        <h4 class="mb-1 fw-bold">Pembayaran Peserta</h4>
        <p class="text-muted mb-0">Verifikasi pembayaran peserta berbayar</p>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-3 mb-4">
        <div class="col-md-3">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-primary bg-opacity-10 text-primary rounded p-3">
                                <i class="fas fa-receipt fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Total Transaksi</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['total'] }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-danger bg-opacity-10 text-danger rounded p-3">
                                <i class="fas fa-clock fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Belum Bayar</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['pending'] }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-warning bg-opacity-10 text-warning rounded p-3">
                                <i class="fas fa-hourglass-half fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Menunggu Verifikasi</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['paid'] }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-success bg-opacity-10 text-success rounded p-3">
                                <i class="fas fa-check-circle fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Disetujui</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['approved'] }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Alert Success -->
    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    <!-- Filter Tabs -->
    <div class="card border-0 shadow-sm mb-3">
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <ul class="nav nav-pills mb-0">
                        <li class="nav-item">
                            <a class="nav-link {{ $type == 'pelatihan' ? 'active' : '' }}"
                               href="{{ route('admin.pembayaran.index', ['type' => 'pelatihan', 'status' => $status]) }}">
                                <i class="fas fa-chalkboard-teacher me-1"></i>Pelatihan
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ $type == 'sertifikasi' ? 'active' : '' }}"
                               href="{{ route('admin.pembayaran.index', ['type' => 'sertifikasi', 'status' => $status]) }}">
                                <i class="fas fa-certificate me-1"></i>Sertifikasi
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <div class="d-flex justify-content-end gap-2">
                        <a href="{{ route('admin.pembayaran.index', ['type' => $type, 'status' => 'all']) }}"
                           class="btn btn-sm {{ $status == 'all' ? 'btn-primary' : 'btn-outline-secondary' }}">
                            Semua
                        </a>
                        <a href="{{ route('admin.pembayaran.index', ['type' => $type, 'status' => 'pending']) }}"
                           class="btn btn-sm {{ $status == 'pending' ? 'btn-danger' : 'btn-outline-secondary' }}">
                            Belum Bayar
                        </a>
                        <a href="{{ route('admin.pembayaran.index', ['type' => $type, 'status' => 'paid']) }}"
                           class="btn btn-sm {{ $status == 'paid' ? 'btn-warning' : 'btn-outline-secondary' }}">
                            Perlu Verifikasi
                        </a>
                        <a href="{{ route('admin.pembayaran.index', ['type' => $type, 'status' => 'approved']) }}"
                           class="btn btn-sm {{ $status == 'approved' ? 'btn-success' : 'btn-outline-secondary' }}">
                            Disetujui
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Table Card -->
    <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="px-4">No</th>
                            <th>Peserta</th>
                            <th>{{ $type == 'pelatihan' ? 'Pelatihan' : 'Sertifikasi' }}</th>
                            <th>Harga</th>
                            <th>Metode</th>
                            <th>Tanggal Daftar</th>
                            <th>Status</th>
                            <th>Bukti</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($transaksi as $index => $item)
                        <tr>
                            <td class="px-4 fw-semibold">{{ $transaksi->firstItem() + $index }}</td>

                            <td>
                                <div class="fw-semibold">{{ $item->nama }}</div>
                                <small class="text-muted">
                                    <i class="fas fa-envelope me-1"></i>{{ $item->email }}
                                </small>
                                <br>
                                <small class="text-muted">
                                    <i class="fas fa-phone me-1"></i>{{ $item->nomor_hp }}
                                </small>
                            </td>

                            <td>
                                @if($type == 'pelatihan')
                                    <div class="fw-semibold">{{ Str::limit($item->pelatihan->nama_pelatihan, 30) }}</div>
                                    <small class="text-muted">
                                        {{ \Carbon\Carbon::parse($item->pelatihan->tanggal_pelatihan)->format('d M Y') }}
                                    </small>
                                @else
                                    <div class="fw-semibold">{{ Str::limit($item->sertifikasi->nama_sertifikasi, 30) }}</div>
                                    <small class="text-muted">
                                        {{ \Carbon\Carbon::parse($item->sertifikasi->tanggal_sertifikasi)->format('d M Y') }}
                                    </small>
                                @endif
                            </td>

                            <td>
                                @php
                                    $harga = $type == 'pelatihan' ? $item->pelatihan->harga : $item->sertifikasi->harga;
                                @endphp
                                <span class="fw-semibold">Rp {{ number_format($harga, 0, ',', '.') }}</span>
                            </td>

                            <td>
                                <span class="badge bg-info-subtle text-info">
                                    {{ ucfirst($item->metode_pembayaran) }}
                                </span>
                            </td>

                            <td>
                                <small>
                                    <i class="far fa-calendar text-muted me-1"></i>
                                    {{ $item->created_at->format('d M Y') }}
                                </small>
                            </td>

                            <td>
                                @if($item->status == 'pending')
                                    <span class="badge bg-danger">Belum Bayar</span>
                                @elseif($item->status == 'paid')
                                    <span class="badge bg-warning">Perlu Verifikasi</span>
                                @else
                                    <span class="badge bg-success">Disetujui</span>
                                @endif
                            </td>

                            <td>
                                @if($item->bukti)
                                    @php
                                        $buktiPath = $type == 'pelatihan'
                                            ? 'uploads/bukti_pelatihan/' . $item->bukti
                                            : 'uploads/bukti_sertifikasi/' . $item->bukti;
                                        $isPDF = Str::endsWith($item->bukti, '.pdf');
                                    @endphp

                                    <div class="btn-group btn-group-sm">
                                        <!-- Button Preview -->
                                        <button type="button"
                                                class="btn btn-info btn-sm"
                                                onclick="showBukti('{{ asset($buktiPath) }}', {{ $isPDF ? 'true' : 'false' }}, '{{ $item->nama }}')">
                                            <i class="fas fa-eye"></i>
                                        </button>

                                        <!-- Button Download -->
                                        <a href="{{ asset($buktiPath) }}"
                                           download
                                           class="btn btn-success btn-sm"
                                           title="Download">
                                            <i class="fas fa-download"></i>
                                        </a>
                                    </div>
                                @else
                                    <span class="text-muted">-</span>
                                @endif
                            </td>

                            <td class="text-center">
                                @if($item->status == 'paid')
                                    <div class="btn-group btn-group-sm" role="group">
                                        <form action="{{ route('admin.pembayaran.' . $type . '.approve', $item->id) }}"
                                              method="POST"
                                              class="d-inline">
                                            @csrf
                                            <button type="submit"
                                                    class="btn btn-success"
                                                    onclick="return confirm('Setujui pembayaran ini?')"
                                                    title="Setujui">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        </form>

                                        <form action="{{ route('admin.pembayaran.' . $type . '.reject', $item->id) }}"
                                              method="POST"
                                              class="d-inline">
                                            @csrf
                                            <button type="submit"
                                                    class="btn btn-danger"
                                                    onclick="return confirm('Tolak pembayaran ini? Bukti akan dihapus.')"
                                                    title="Tolak">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </form>
                                    </div>
                                @elseif($item->status == 'approved')
                                    <span class="badge bg-success">
                                        <i class="fas fa-check-circle"></i> Disetujui
                                    </span>
                                @else
                                    <span class="text-muted small">Menunggu Upload</span>
                                @endif
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="9" class="text-center py-5">
                                <div class="text-muted">
                                    <i class="fas fa-inbox fs-1 mb-3 d-block"></i>
                                    <h5>Belum Ada Data Transaksi Berbayar</h5>
                                    <p class="mb-0">Transaksi {{ $type }} berbayar akan muncul di sini</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        @if($transaksi->hasPages())
        <div class="card-footer bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div class="text-muted small">
                    Menampilkan {{ $transaksi->firstItem() }} - {{ $transaksi->lastItem() }}
                    dari {{ $transaksi->total() }} data
                </div>
                <div>
                    {{ $transaksi->appends(['type' => $type, 'status' => $status])->links() }}
                </div>
            </div>
        </div>
        @endif
    </div>

</div>

<!-- Universal Modal for Bukti -->
<div class="modal fade" id="buktiModal" tabindex="-1" aria-labelledby="buktiModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="buktiModalLabel">
                    <i class="fas fa-receipt me-2"></i>
                    Bukti Pembayaran - <span id="modalPesertaName"></span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0" style="min-height: 400px;">
                <!-- Loading -->
                <div id="buktiLoading" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3 text-muted">Memuat bukti pembayaran...</p>
                </div>

                <!-- Content -->
                <div id="buktiContent" class="text-center" style="display: none;">
                    <!-- Image Preview -->
                    <img id="buktiImage"
                         src=""
                         alt="Bukti Pembayaran"
                         class="img-fluid"
                         style="max-height: 80vh; display: none;">

                    <!-- PDF Preview -->
                    <iframe id="buktiPDF"
                            src=""
                            style="width: 100%; height: 80vh; border: none; display: none;"></iframe>
                </div>
            </div>
            <div class="modal-footer">
                <a id="buktiDownloadBtn"
                   href=""
                   download
                   class="btn btn-success">
                    <i class="fas fa-download me-2"></i>Download Bukti
                </a>
                <a id="buktiOpenBtn"
                   href=""
                   target="_blank"
                   class="btn btn-primary">
                    <i class="fas fa-external-link-alt me-2"></i>Buka di Tab Baru
                </a>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>

<script>
    // Function to show bukti in modal
    function showBukti(url, isPDF, pesertaName) {
        console.log('Opening bukti:', url, 'isPDF:', isPDF); // Debug

        const modal = new bootstrap.Modal(document.getElementById('buktiModal'));
        const loading = document.getElementById('buktiLoading');
        const content = document.getElementById('buktiContent');
        const image = document.getElementById('buktiImage');
        const pdf = document.getElementById('buktiPDF');
        const downloadBtn = document.getElementById('buktiDownloadBtn');
        const openBtn = document.getElementById('buktiOpenBtn');
        const nameSpan = document.getElementById('modalPesertaName');

        // Set nama peserta
        nameSpan.textContent = pesertaName;

        // Set download & open links
        downloadBtn.href = url;
        openBtn.href = url;

        // Reset display
        image.style.display = 'none';
        pdf.style.display = 'none';
        loading.style.display = 'block';
        content.style.display = 'none';

        // Show modal first
        modal.show();

        // Load content after modal shown
        setTimeout(() => {
            if (isPDF) {
                console.log('Loading PDF...');
                pdf.src = url;
                pdf.style.display = 'block';
                loading.style.display = 'none';
                content.style.display = 'block';
            } else {
                console.log('Loading Image...');
                image.onload = function() {
                    console.log('Image loaded successfully');
                    loading.style.display = 'none';
                    content.style.display = 'block';
                    image.style.display = 'block';
                };

                image.onerror = function() {
                    console.error('Failed to load image:', url);
                    loading.innerHTML = `
                        <i class="fas fa-exclamation-triangle text-danger fs-1"></i>
                        <p class="mt-3 text-danger">Gagal memuat gambar</p>
                        <small class="text-muted">Path: ${url}</small>
                    `;
                };

                // Set src after setting handlers
                image.src = url;
            }
        }, 100);
    }

    // Auto hide alert
    setTimeout(function() {
        const alert = document.querySelector('.alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);

    // Reset modal when closed
    document.getElementById('buktiModal')?.addEventListener('hidden.bs.modal', function () {
        const image = document.getElementById('buktiImage');
        const pdf = document.getElementById('buktiPDF');
        if (image) image.src = '';
        if (pdf) pdf.src = '';
    });
</script>
@endsection
