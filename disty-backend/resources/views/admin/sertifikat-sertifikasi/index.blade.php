@extends('admin.layout')

@section('title', 'Sertifikat Sertifikasi')

@section('content')
<div class="container-fluid p-4">

    <!-- Header -->
    <div class="mb-4">
        <h4 class="mb-1 fw-bold">Sertifikat Sertifikasi</h4>
        <p class="text-muted mb-0">Generate sertifikat internal dan kelola sertifikat BNSP peserta</p>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-3 mb-4">
        <div class="col-md-3">
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
        <div class="col-md-3">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-warning bg-opacity-10 text-warning rounded p-3">
                                <i class="fas fa-certificate fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Belum Sertifikat Internal</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['belum_sertifikat_internal'] }}</h3>
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
                            <h6 class="text-muted mb-1">Sudah Sertifikat Internal</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['sudah_sertifikat_internal'] }}</h3>
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
                            <div class="bg-info bg-opacity-10 text-info rounded p-3">
                                <i class="fas fa-award fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Sudah Sertifikat BNSP</h6>
                            <h3 class="mb-0 fw-bold">{{ $stats['sudah_sertifikat_bnsp'] }}</h3>
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
                <input type="hidden" name="tab" value="{{ $tab }}">
                <div class="col-md-8">
                    <label class="form-label fw-semibold">Filter Sertifikasi</label>
                    <select name="sertifikasi_id" class="form-select">
                        <option value="">-- Semua Sertifikasi --</option>
                        @foreach($sertifikasiList as $srt)
                            <option value="{{ $srt->id }}" {{ $sertifikasi_id == $srt->id ? 'selected' : '' }}>
                                {{ $srt->nama_sertifikasi }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="col-md-4">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-filter me-2"></i>Filter
                    </button>
                    <a href="{{ route('admin.sertifikat-sertifikasi.index') }}?tab={{ $tab }}" class="btn btn-secondary">
                        <i class="fas fa-redo me-2"></i>Reset
                    </a>
                </div>
            </form>

            @if($sertifikasi_id && $tab == 'internal')
                <div class="mt-3">
                    <form action="{{ route('admin.sertifikat-sertifikasi.generate-batch', $sertifikasi_id) }}"
                          method="POST"
                          onsubmit="return confirm('Generate sertifikat internal untuk semua peserta yang belum punya sertifikat?')">
                        @csrf
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-magic me-2"></i>Generate Semua Sertifikat Internal
                        </button>
                    </form>
                </div>
            @endif
        </div>
    </div>

    <!-- Tabs Navigation -->
    <ul class="nav nav-tabs mb-3" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link {{ $tab == 'internal' ? 'active' : '' }}"
               href="{{ route('admin.sertifikat-sertifikasi.index') }}?tab=internal&sertifikasi_id={{ $sertifikasi_id }}">
                <i class="fas fa-certificate me-2"></i>Sertifikat Internal
            </a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link {{ $tab == 'bnsp' ? 'active' : '' }}"
               href="{{ route('admin.sertifikat-sertifikasi.index') }}?tab=bnsp&sertifikasi_id={{ $sertifikasi_id }}">
                <i class="fas fa-award me-2"></i>Sertifikat BNSP
            </a>
        </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content">

        <!-- TAB SERTIFIKAT INTERNAL -->
        <div class="tab-pane fade {{ $tab == 'internal' ? 'show active' : '' }}">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="px-4">No</th>
                                    <th>Nama Peserta</th>
                                    <th>Sertifikasi</th>
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
                                        <div class="fw-semibold">{{ Str::limit($item->sertifikasi->nama_sertifikasi, 40) }}</div>
                                        <small class="text-muted">{{ $item->sertifikasi->durasi ?? '-' }}</small>
                                    </td>

                                    <td>
                                        <small>
                                            <i class="far fa-calendar text-muted me-1"></i>
                                            {{ \Carbon\Carbon::parse($item->sertifikasi->tanggal_sertifikasi)->format('d M Y') }}
                                        </small>
                                    </td>

                                    <td>
                                        @if($item->sertifikat_internal)
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
                                        @if($item->sertifikat_internal)
                                            <div class="btn-group btn-group-sm">
                                                <!-- Preview -->
                                                <a href="{{ asset('uploads/sertifikat_internal/' . $item->sertifikat_internal) }}"
                                                   target="_blank"
                                                   class="btn btn-info"
                                                   title="Preview">
                                                    <i class="fas fa-eye"></i>
                                                </a>

                                                <!-- Download -->
                                                <a href="{{ route('admin.sertifikat-sertifikasi.download', $item->id) }}"
                                                   class="btn btn-success"
                                                   title="Download">
                                                    <i class="fas fa-download"></i>
                                                </a>

                                                <!-- Regenerate -->
                                                <form action="{{ route('admin.sertifikat-sertifikasi.regenerate', $item->id) }}"
                                                      method="POST"
                                                      class="d-inline">
                                                    @csrf
                                                    <button type="submit"
                                                            class="btn btn-warning"
                                                            onclick="return confirm('Regenerate sertifikat internal untuk {{ $item->nama }}?')"
                                                            title="Regenerate">
                                                        <i class="fas fa-redo"></i>
                                                    </button>
                                                </form>
                                            </div>
                                        @else
                                            <!-- Generate -->
                                            <form action="{{ route('admin.sertifikat-sertifikasi.generate', $item->id) }}"
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
                            {{ $peserta->appends(['sertifikasi_id' => $sertifikasi_id, 'tab' => 'internal'])->links() }}
                        </div>
                    </div>
                </div>
                @endif
            </div>
        </div>

        <!-- TAB SERTIFIKAT BNSP -->
        <div class="tab-pane fade {{ $tab == 'bnsp' ? 'show active' : '' }}">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="px-4">No</th>
                                    <th>Nama Peserta</th>
                                    <th>Sertifikasi</th>
                                    <th>Tanggal Selesai</th>
                                    <th>Status Sertifikat BNSP</th>
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
                                        <div class="fw-semibold">{{ Str::limit($item->sertifikasi->nama_sertifikasi, 40) }}</div>
                                        <small class="text-muted">{{ $item->sertifikasi->durasi ?? '-' }}</small>
                                    </td>

                                    <td>
                                        <small>
                                            <i class="far fa-calendar text-muted me-1"></i>
                                            {{ \Carbon\Carbon::parse($item->sertifikasi->tanggal_sertifikasi)->format('d M Y') }}
                                        </small>
                                    </td>

                                    <td>
                                        @if($item->sertifikat_bnsp)
                                            <span class="badge bg-success">
                                                <i class="fas fa-check-circle"></i> Sudah Upload
                                            </span>
                                        @else
                                            <span class="badge bg-secondary">
                                                <i class="fas fa-times-circle"></i> Belum Upload
                                            </span>
                                        @endif
                                    </td>

                                    <td class="text-center">
                                        @if($item->sertifikat_bnsp)
                                            <div class="btn-group btn-group-sm">
                                                <!-- Preview -->
                                                <a href="{{ asset('uploads/sertifikat_bnsp/' . $item->sertifikat_bnsp) }}"
                                                   target="_blank"
                                                   class="btn btn-info"
                                                   title="Preview">
                                                    <i class="fas fa-eye"></i>
                                                </a>

                                                <!-- Download -->
                                                <a href="{{ route('admin.sertifikat-sertifikasi.download-bnsp', $item->id) }}"
                                                   class="btn btn-success"
                                                   title="Download">
                                                    <i class="fas fa-download"></i>
                                                </a>

                                                <!-- Update -->
                                                <button type="button"
                                                        class="btn btn-warning"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#updateBnspModal{{ $item->id }}"
                                                        title="Update">
                                                    <i class="fas fa-edit"></i>
                                                </button>

                                                <!-- Delete -->
                                                <form action="{{ route('admin.sertifikat-sertifikasi.delete-bnsp', $item->id) }}"
                                                      method="POST"
                                                      class="d-inline">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit"
                                                            class="btn btn-danger"
                                                            onclick="return confirm('Hapus sertifikat BNSP untuk {{ $item->nama }}?')"
                                                            title="Delete">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </form>
                                            </div>

                                            <!-- Modal Update BNSP -->
                                            <div class="modal fade" id="updateBnspModal{{ $item->id }}" tabindex="-1">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <form action="{{ route('admin.sertifikat-sertifikasi.update-bnsp', $item->id) }}"
                                                              method="POST"
                                                              enctype="multipart/form-data">
                                                            @csrf
                                                            @method('POST')
                                                            <div class="modal-header">
                                                                <h5 class="modal-title">Update Sertifikat BNSP</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="mb-3">
                                                                    <label class="form-label fw-semibold">Nama Peserta</label>
                                                                    <input type="text" class="form-control" value="{{ $item->nama }}" readonly>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label class="form-label fw-semibold">File Sertifikat BNSP (PDF)</label>
                                                                    <input type="file" name="file_bnsp" class="form-control" accept=".pdf" required>
                                                                    <small class="text-muted">Max 5MB. Kosongkan jika tidak ingin mengubah file</small>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                                                                <button type="submit" class="btn btn-primary">
                                                                    <i class="fas fa-save me-2"></i>Update
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        @else
                                            <!-- Upload Button -->
                                            <button type="button"
                                                    class="btn btn-primary btn-sm"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#uploadBnspModal{{ $item->id }}">
                                                <i class="fas fa-upload me-1"></i>Upload BNSP
                                            </button>

                                            <!-- Modal Upload BNSP -->
                                            <div class="modal fade" id="uploadBnspModal{{ $item->id }}" tabindex="-1">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <form action="{{ route('admin.sertifikat-sertifikasi.upload-bnsp', $item->id) }}"
                                                              method="POST"
                                                              enctype="multipart/form-data">
                                                            @csrf
                                                            <div class="modal-header">
                                                                <h5 class="modal-title">Upload Sertifikat BNSP</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="mb-3">
                                                                    <label class="form-label fw-semibold">Nama Peserta</label>
                                                                    <input type="text" class="form-control" value="{{ $item->nama }}" readonly>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label class="form-label fw-semibold">File Sertifikat BNSP (PDF) <span class="text-danger">*</span></label>
                                                                    <input type="file" name="file_bnsp" class="form-control" accept=".pdf" required>
                                                                    <small class="text-muted">Max 5MB, format PDF</small>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                                                                <button type="submit" class="btn btn-primary">
                                                                    <i class="fas fa-upload me-2"></i>Upload
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
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
                            {{ $peserta->appends(['sertifikasi_id' => $sertifikasi_id, 'tab' => 'bnsp'])->links() }}
                        </div>
                    </div>
                </div>
                @endif
            </div>
        </div>

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
