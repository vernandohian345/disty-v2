@extends('admin.layout')

@section('title', 'Kelola Pelatihan')

@section('content')
<div class="container-fluid p-4">

    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h4 class="mb-1 fw-bold">Daftar Pelatihan</h4>
            <p class="text-muted mb-0">Kelola semua data pelatihan dan bootcamp</p>
        </div>
        <a href="{{ route('admin.pelatihan.create') }}" class="btn btn-primary">
            <i class="fas fa-plus-circle me-2"></i>Tambah Pelatihan
        </a>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <div class="bg-primary bg-opacity-10 text-primary rounded p-3">
                                <i class="fas fa-graduation-cap fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Total Pelatihan</h6>
                            <h3 class="mb-0 fw-bold">{{ $pelatihans->total() }}</h3>
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
                                <i class="fas fa-gift fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Gratis</h6>
                            <h3 class="mb-0 fw-bold">{{ $pelatihans->where('kategori', 'gratis')->count() }}</h3>
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
                                <i class="fas fa-tag fs-4"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="text-muted mb-1">Berbayar</h6>
                            <h3 class="mb-0 fw-bold">{{ $pelatihans->where('kategori', 'berbayar')->count() }}</h3>
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

    <!-- Main Table Card -->
    <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3">
            <div class="row align-items-center">
                <div class="col">
                    <h5 class="mb-0 fw-semibold">Data Pelatihan</h5>
                </div>
                <div class="col-auto">
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0">
                            <i class="fas fa-search"></i>
                        </span>
                        <input type="text"
                               class="form-control border-start-0"
                               id="searchInput"
                               placeholder="Cari pelatihan...">
                    </div>
                </div>
            </div>
        </div>

        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0" id="pelatihanTable">
                    <thead class="table-light">
                        <tr>
                            <th class="px-4">No</th>
                            <th>Sampul</th>
                            <th>Nama Pelatihan</th>
                            <th>Kategori</th>
                            <th>Harga</th>
                            <th>Tanggal</th>
                            <th>Durasi</th>
                            <th>Link Grup</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($pelatihans as $index => $item)
                        <tr>
                            <td class="px-4 fw-semibold">{{ $pelatihans->firstItem() + $index }}</td>

                            <td>
                                <img src="{{ asset('uploads/pelatihan/' . $item->sampul) }}"
                                     alt="{{ $item->nama_pelatihan }}"
                                     class="rounded"
                                     style="width: 50px; height: 50px; object-fit: cover;">
                            </td>

                            <td>
                                <div class="fw-semibold">{{ Str::limit($item->nama_pelatihan, 40) }}</div>
                                <small class="text-muted">{{ $item->bahasa }}</small>
                            </td>

                            <td>
                                @if($item->kategori === 'gratis')
                                    <span class="badge bg-success-subtle text-success">
                                        <i class="fas fa-gift me-1"></i>Gratis
                                    </span>
                                @else
                                    <span class="badge bg-warning-subtle text-warning">
                                        <i class="fas fa-tag me-1"></i>Berbayar
                                    </span>
                                @endif
                            </td>

                            <td>
                                @if($item->kategori === 'gratis')
                                    <span class="text-success fw-semibold">GRATIS</span>
                                @else
                                    <span class="fw-semibold">Rp {{ number_format($item->harga, 0, ',', '.') }}</span>
                                @endif
                            </td>

                            <td>
                                <small>
                                    <i class="far fa-calendar text-muted me-1"></i>
                                    {{ \Carbon\Carbon::parse($item->tanggal_pelatihan)->format('d M Y') }}
                                </small>
                            </td>

                            <td>
                                <small>
                                    <i class="far fa-clock text-muted me-1"></i>
                                    {{ $item->durasi }}
                                </small>
                            </td>

                            <td>
                                @if($item->link_grup)
                                    <a href="{{ $item->link_grup }}"
                                       target="_blank"
                                       class="btn btn-sm btn-success">
                                        <i class="fab fa-whatsapp"></i>
                                    </a>
                                @else
                                    <span class="text-muted">-</span>
                                @endif
                            </td>

                            <td class="text-center">
                                <div class="btn-group btn-group-sm" role="group">
                                    <a href="{{ route('pelatihan.show', $item->slug) }}"
                                       class="btn btn-info"
                                       target="_blank"
                                       title="Lihat">
                                        <i class="fas fa-eye"></i>
                                    </a>

                                    <a href="{{ route('admin.pelatihan.edit', $item->id) }}"
                                       class="btn btn-warning"
                                       title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </a>

                                    <form action="{{ route('admin.pelatihan.destroy', $item->id) }}"
                                          method="POST"
                                          class="d-inline"
                                          onsubmit="return confirm('Yakin ingin menghapus pelatihan ini?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit"
                                                class="btn btn-danger"
                                                title="Hapus">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="9" class="text-center py-5">
                                <div class="text-muted">
                                    <i class="fas fa-inbox fs-1 mb-3 d-block"></i>
                                    <h5>Belum Ada Data Pelatihan</h5>
                                    <p class="mb-3">Mulai tambahkan pelatihan baru</p>
                                    <a href="{{ route('admin.pelatihan.create') }}" class="btn btn-primary">
                                        <i class="fas fa-plus-circle me-2"></i>Tambah Pelatihan
                                    </a>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        @if($pelatihans->hasPages())
        <div class="card-footer bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div class="text-muted small">
                    Menampilkan {{ $pelatihans->firstItem() }} - {{ $pelatihans->lastItem() }}
                    dari {{ $pelatihans->total() }} data
                </div>
                <div>
                    {{ $pelatihans->links() }}
                </div>
            </div>
        </div>
        @endif
    </div>

</div>

<script>
    // Live Search
    document.getElementById('searchInput')?.addEventListener('keyup', function() {
        const searchValue = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('#pelatihanTable tbody tr');

        tableRows.forEach(row => {
            const pelatihanName = row.querySelector('td:nth-child(3)')?.textContent.toLowerCase();

            if (pelatihanName && pelatihanName.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Auto hide alert
    setTimeout(function() {
        const alert = document.querySelector('.alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
</script>
@endsection
