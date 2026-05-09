@extends('admin.layout')

@section('title', 'Tambah Pelatihan')

@section('content')
<div class="container-fluid p-4">

    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
            <li class="breadcrumb-item"><a href="{{ route('admin.pelatihan.index') }}">Kelola Pelatihan</a></li>
            <li class="breadcrumb-item active">Tambah Pelatihan</li>
        </ol>
    </nav>

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h4 class="mb-1 fw-bold">Tambah Pelatihan Baru</h4>
            <p class="text-muted mb-0">Lengkapi form di bawah untuk menambah pelatihan</p>
        </div>
        <a href="{{ route('admin.pelatihan.index') }}" class="btn btn-secondary">
            <i class="fas fa-arrow-left me-2"></i>Kembali
        </a>
    </div>

    <!-- Form Card -->
    <div class="row">
        <div class="col-lg-10 mx-auto">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <form action="{{ route('admin.pelatihan.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <!-- Informasi Dasar -->
                        <div class="mb-4">
                            <h5 class="fw-semibold mb-3 pb-2 border-bottom">
                                <i class="fas fa-info-circle text-primary me-2"></i>Informasi Dasar
                            </h5>

                            <div class="row g-3">
                                <!-- Nama Pelatihan -->
                                <div class="col-md-12">
                                    <label class="form-label fw-semibold">
                                        Nama Pelatihan <span class="text-danger">*</span>
                                    </label>
                                    <input type="text"
                                           name="nama_pelatihan"
                                           class="form-control @error('nama_pelatihan') is-invalid @enderror"
                                           value="{{ old('nama_pelatihan') }}"
                                           placeholder="Contoh: Bootcamp Web Development"
                                           required>
                                    @error('nama_pelatihan')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Kategori -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        Kategori <span class="text-danger">*</span>
                                    </label>
                                    <select name="kategori"
                                            class="form-select @error('kategori') is-invalid @enderror"
                                            id="kategoriSelect"
                                            required>
                                        <option value="">-- Pilih Kategori --</option>
                                        <option value="gratis" {{ old('kategori') == 'gratis' ? 'selected' : '' }}>Gratis</option>
                                        <option value="berbayar" {{ old('kategori') == 'berbayar' ? 'selected' : '' }}>Berbayar</option>
                                    </select>
                                    @error('kategori')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Harga -->
                                <div class="col-md-6" id="hargaWrapper">
                                    <label class="form-label fw-semibold">
                                        Harga <span class="text-danger">*</span>
                                    </label>
                                    <div class="input-group">
                                        <span class="input-group-text">Rp</span>
                                        <input type="number"
                                               name="harga"
                                               class="form-control @error('harga') is-invalid @enderror"
                                               value="{{ old('harga', 0) }}"
                                               placeholder="0"
                                               id="hargaInput">
                                        @error('harga')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <!-- Tanggal Pelatihan -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        Tanggal Pelatihan <span class="text-danger">*</span>
                                    </label>
                                    <input type="date"
                                           name="tanggal_pelatihan"
                                           class="form-control @error('tanggal_pelatihan') is-invalid @enderror"
                                           value="{{ old('tanggal_pelatihan') }}"
                                           required>
                                    @error('tanggal_pelatihan')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Durasi -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        Durasi <span class="text-danger">*</span>
                                    </label>
                                    <input type="text"
                                           name="durasi"
                                           class="form-control @error('durasi') is-invalid @enderror"
                                           value="{{ old('durasi') }}"
                                           placeholder="Contoh: 8 Jam, 3 Hari"
                                           required>
                                    @error('durasi')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Bahasa -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        Bahasa <span class="text-danger">*</span>
                                    </label>
                                    <select name="bahasa"
                                            class="form-select @error('bahasa') is-invalid @enderror"
                                            required>
                                        <option value="">-- Pilih Bahasa --</option>
                                        <option value="Indonesia" {{ old('bahasa') == 'Indonesia' ? 'selected' : '' }}>Indonesia</option>
                                        <option value="English" {{ old('bahasa') == 'English' ? 'selected' : '' }}>English</option>
                                    </select>
                                    @error('bahasa')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Link Grup WhatsApp -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        Link Grup WhatsApp
                                    </label>
                                    <input type="url"
                                           name="link_grup"
                                           class="form-control @error('link_grup') is-invalid @enderror"
                                           value="{{ old('link_grup') }}"
                                           placeholder="https://chat.whatsapp.com/...">
                                    <small class="text-muted">Opsional - untuk akses grup peserta</small>
                                    @error('link_grup')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <!-- Deskripsi & Materi -->
                        <div class="mb-4">
                            <h5 class="fw-semibold mb-3 pb-2 border-bottom">
                                <i class="fas fa-align-left text-primary me-2"></i>Deskripsi & Materi
                            </h5>

                            <!-- Deskripsi -->
                            <div class="mb-3">
                                <label class="form-label fw-semibold">
                                    Deskripsi Pelatihan <span class="text-danger">*</span>
                                </label>
                                <textarea name="deskripsi"
                                          class="form-control @error('deskripsi') is-invalid @enderror"
                                          rows="4"
                                          placeholder="Jelaskan tentang pelatihan ini..."
                                          required>{{ old('deskripsi') }}</textarea>
                                @error('deskripsi')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Materi -->
                            <div class="mb-3">
                                <label class="form-label fw-semibold">
                                    Materi yang Dipelajari <span class="text-danger">*</span>
                                </label>
                                <textarea name="materi"
                                          class="form-control @error('materi') is-invalid @enderror"
                                          rows="6"
                                          placeholder="Tulis setiap materi di baris baru&#10;Contoh:&#10;HTML & CSS Dasar&#10;JavaScript Fundamental&#10;React JS"
                                          required>{{ old('materi') }}</textarea>
                                <small class="text-muted">Tulis setiap materi di baris baru</small>
                                @error('materi')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <!-- Sampul -->
                        <div class="mb-4">
                            <h5 class="fw-semibold mb-3 pb-2 border-bottom">
                                <i class="fas fa-image text-primary me-2"></i>Sampul Pelatihan
                            </h5>

                            <div class="mb-3">
                                <label class="form-label fw-semibold">
                                    Upload Sampul <span class="text-danger">*</span>
                                </label>
                                <input type="file"
                                       name="sampul"
                                       class="form-control @error('sampul') is-invalid @enderror"
                                       accept="image/*"
                                       id="sampulInput"
                                       required>
                                <small class="text-muted">Format: JPG, PNG. Max 2MB</small>
                                @error('sampul')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Preview -->
                            <div id="previewWrapper" class="d-none">
                                <label class="form-label fw-semibold">Preview:</label>
                                <div>
                                    <img id="previewImage"
                                         class="img-thumbnail"
                                         style="max-width: 300px; max-height: 300px;">
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="d-flex gap-2 justify-content-end pt-3 border-top">
                            <a href="{{ route('admin.pelatihan.index') }}" class="btn btn-secondary px-4">
                                <i class="fas fa-times me-2"></i>Batal
                            </a>
                            <button type="submit" class="btn btn-primary px-4">
                                <i class="fas fa-save me-2"></i>Simpan Pelatihan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>

<script>
    // Toggle harga field berdasarkan kategori
    document.getElementById('kategoriSelect').addEventListener('change', function() {
        const hargaWrapper = document.getElementById('hargaWrapper');
        const hargaInput = document.getElementById('hargaInput');

        if (this.value === 'gratis') {
            hargaInput.value = 0;
            hargaInput.setAttribute('readonly', true);
            hargaWrapper.classList.add('d-none');
        } else {
            hargaInput.removeAttribute('readonly');
            hargaWrapper.classList.remove('d-none');
        }
    });

    // Preview image
    document.getElementById('sampulInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('previewImage').src = e.target.result;
                document.getElementById('previewWrapper').classList.remove('d-none');
            }
            reader.readAsDataURL(file);
        }
    });

    // Trigger kategori change on load (untuk old value)
    window.addEventListener('DOMContentLoaded', function() {
        const kategoriSelect = document.getElementById('kategoriSelect');
        if (kategoriSelect.value) {
            kategoriSelect.dispatchEvent(new Event('change'));
        }
    });
</script>
@endsection
