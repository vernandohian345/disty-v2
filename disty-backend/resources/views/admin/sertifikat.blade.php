@extends('layouts.admin')

@section('content')
<div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Manajemen Sertifikat Pelatihan</h2>
    </div>

    @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    @endif

    @if(session('error'))
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ session('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    @endif

    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Peserta</th>
                            <th>Pelatihan</th>
                            <th>Metode Pembayaran</th>
                            <th>Status</th>
                            <th>Sertifikat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($transaksi as $index => $item)
                        <tr>
                            <td>{{ $transaksi->firstItem() + $index }}</td>
                            <td>{{ $item->user_name }}</td>
                            <td>{{ $item->nama_pelatihan }}</td>
                            <td>
                                <span class="badge bg-info">{{ ucfirst($item->metode_pembayaran) }}</span>
                            </td>
                            <td>
                                <span class="badge bg-success">{{ ucfirst($item->status) }}</span>
                            </td>
                            <td>
                                @if($item->sertifikat)
                                    <span class="badge bg-success">
                                        <i class="bi bi-check-circle"></i> Sudah Generate
                                    </span>
                                @else
                                    <span class="badge bg-warning text-dark">
                                        <i class="bi bi-clock"></i> Belum Generate
                                    </span>
                                @endif
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    @if($item->sertifikat)
                                        <!-- Download -->
                                        <a href="{{ route('admin.certificates.pelatihan.download', $item->id) }}"
                                           class="btn btn-sm btn-primary"
                                           title="Download Sertifikat">
                                            <i class="bi bi-download"></i>
                                        </a>

                                        <!-- Preview -->
                                        <a href="{{ asset($item->sertifikat) }}"
                                           target="_blank"
                                           class="btn btn-sm btn-info"
                                           title="Preview Sertifikat">
                                            <i class="bi bi-eye"></i>
                                        </a>

                                        <!-- Re-generate -->
                                        <form action="{{ route('admin.certificates.pelatihan.generate', $item->id) }}"
                                              method="POST"
                                              class="d-inline"
                                              onsubmit="return confirm('Sertifikat akan di-generate ulang. Lanjutkan?')">
                                            @csrf
                                            <button type="submit" class="btn btn-sm btn-warning" title="Generate Ulang">
                                                <i class="bi bi-arrow-repeat"></i>
                                            </button>
                                        </form>

                                        <!-- Delete -->
                                        <form action="{{ route('admin.certificates.delete', $item->id) }}"
                                              method="POST"
                                              class="d-inline"
                                              onsubmit="return confirm('Yakin ingin menghapus sertifikat?')">
                                            @csrf
                                            @method('DELETE')
                                            <input type="hidden" name="type" value="pelatihan">
                                            <button type="submit" class="btn btn-sm btn-danger" title="Hapus Sertifikat">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </form>
                                    @else
                                        <!-- Generate -->
                                        <form action="{{ route('admin.certificates.pelatihan.generate', $item->id) }}"
                                              method="POST"
                                              class="d-inline">
                                            @csrf
                                            <button type="submit" class="btn btn-sm btn-success" title="Generate Sertifikat">
                                                <i class="bi bi-file-earmark-pdf"></i> Generate
                                            </button>
                                        </form>
                                    @endif
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="7" class="text-center py-4">
                                <i class="bi bi-inbox" style="font-size: 3rem; color: #ccc;"></i>
                                <p class="text-muted mt-2">Belum ada transaksi pelatihan</p>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="mt-3">
                {{ $transaksi->links() }}
            </div>
        </div>
    </div>
</div>
@endsection
