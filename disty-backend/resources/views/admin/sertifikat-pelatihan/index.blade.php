@extends('admin.layout')

@section('title', 'Sertifikat Pelatihan')

@section('content')
<div class="container-fluid p-4">

    <!-- Header -->
    <div class="mb-4">
        <h4 class="mb-1 fw-bold">Sertifikat Pelatihan</h4>
        <p class="text-muted mb-0">Generate dan kelola sertifikat peserta pelatihan</p>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-primary bg-opacity-10 text-primary rounded p-3">
                                <i class="fas fa-users fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Total Peserta</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['total_peserta'] }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-warning bg-opacity-10 text-warning rounded p-3">
                                <i class="fas fa-hourglass-half fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Belum Generate</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['belum_sertifikat'] }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-success bg-opacity-10 text-success rounded p-3">
                                <i class="fas fa-certificate fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Sudah Generate</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['sudah_sertifikat'] }}</h3>
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

    @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            {{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    <!-- Filter -->
    <div class="card border-0 shadow-sm mb-3">
        <div class="card-body">
            <form method="GET" class="row align-items-end g-3">
                <div class="col-md-8">
                    <label class="form-label fw-semibold">Filter Pelatihan</label>
                    <select name="pelatihan_id" class="form-select">
                        <option value="">-- Semua Pelatihan --</option>
                        @foreach($pelatihanList as $plt)
                            <option value="{{ $plt->id }}" {{ $pelatihan_id == $plt->id ? 'selected' : '' }}>
                                {{ $plt->nama_pelatihan }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="col-md-4">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-filter me-2"></i>Filter
                    </button>
                    <a href="{{ route('admin.sertifikat-pelatihan.index') }}" class="btn btn-secondary">
                        <i class="fas fa-redo me-2"></i>Reset
                    </a>
                </div>
            </form>

            @if($pelatihan_id)
                <div class="mt-3">
                    <form action="{{ route('admin.sertifikat-pelatihan.generate-batch', $pelatihan_id) }}"
                          method="POST"
                          onsubmit="return confirm('Generate sertifikat untuk semua peserta yang belum punya sertifikat?')">
                        @csrf
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-magic me-2"></i>Generate Semua Sertifikat Pelatihan Ini
                        </button>
                    </form>
                </div>
            @endif
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
                            <th>Nama Peserta</th>
                            <th>Pelatihan</th>
                            <th>Tanggal Selesai</th>
                            <th>Status Sertifikat</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($peserta as $index => $item)
                        <tr>
                            <td class="px-4 fw-semibold">{{ $peserta->firstItem() + $index }}</td>

                            <td>
                                <div class="fw-semibold">{{ $item->nama }}</div>
                                <small class="text-muted">{{ $item->email }}</small>
                            </td>

                            <td>
                                <div class="fw-semibold">{{ Str::limit($item->pelatihan->nama_pelatihan, 40) }}</div>
                                <small class="text-muted">{{ $item->pelatihan->durasi }}</small>
                            </td>

                            <td>
                                <small>
                                    <i class="far fa-calendar text-muted me-1"></i>
                                    {{ \Carbon\Carbon::parse($item->pelatihan->tanggal_pelatihan)->format('d M Y') }}
                                </small>
                            </td>

                            <td>
                                @if($item->sertifikat_pelatihan)
                                    <span class="badge bg-success">
                                        <i class="fas fa-check-circle"></i> Sudah Generate
                                    </span>
                                @else
                                    <span class="badge bg-warning">
                                        <i class="fas fa-clock"></i> Belum Generate
                                    </span>
                                @endif
                            </td>

                            <td class="text-center">
                                @if($item->sertifikat_pelatihan)
                                    <div class="btn-group btn-group-sm">
                                        <!-- Preview -->
                                        <a href="{{ asset('uploads/sertifikat_pelatihan/' . $item->sertifikat_pelatihan) }}"
                                           target="_blank"
                                           class="btn btn-info"
                                           title="Preview">
                                            <i class="fas fa-eye"></i>
                                        </a>

                                        <!-- Download -->
                                        <a href="{{ route('admin.sertifikat-pelatihan.download', $item->id) }}"
                                           class="btn btn-success"
                                           title="Download">
                                            <i class="fas fa-download"></i>
                                        </a>

                                        <!-- Regenerate -->
                                        <form action="{{ route('admin.sertifikat-pelatihan.regenerate', $item->id) }}"
                                              method="POST"
                                              class="d-inline">
                                            @csrf
                                            <button type="submit"
                                                    class="btn btn-warning"
                                                    onclick="return confirm('Regenerate sertifikat untuk {{ $item->nama }}?')"
                                                    title="Regenerate">
                                                <i class="fas fa-redo"></i>
                                            </button>
                                        </form>
                                    </div>
                                @else
                                    <!-- Generate -->
                                    <form action="{{ route('admin.sertifikat-pelatihan.generate', $item->id) }}"
                                          method="POST"
                                          class="d-inline">
                                        @csrf
                                        <button type="submit"
                                                class="btn btn-primary btn-sm">
                                            <i class="fas fa-certificate me-1"></i>Generate
                                        </button>
                                    </form>
                                @endif
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="6" class="text-center py-5">
                                <div class="text-muted">
                                    <i class="fas fa-inbox fs-1 mb-3 d-block"></i>
                                    <h5>Belum Ada Peserta yang Approved</h5>
                                    <p class="mb-0">Peserta yang sudah approved akan muncul di sini</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        @if($peserta->hasPages())
        <div class="card-footer bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div class="text-muted small">
                    Menampilkan {{ $peserta->firstItem() }} - {{ $peserta->lastItem() }}
                    dari {{ $peserta->total() }} data
                </div>
                <div>
                    {{ $peserta->appends(['pelatihan_id' => $pelatihan_id])->links() }}
                </div>
            </div>
        </div>
        @endif
    </div>

</div>

<script>
    setTimeout(function() {
        const alert = document.querySelector('.alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
</script>
@endsection
