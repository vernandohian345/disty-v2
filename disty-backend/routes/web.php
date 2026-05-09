<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PelatihanController;
use App\Http\Controllers\SertifikasiController;
use App\Http\Controllers\TransaksiPelatihanController;
use App\Http\Controllers\TransaksiSertifikasiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\PembayaranController;
use App\Http\Controllers\Admin\SertifikatPelatihanController;
use App\Http\Controllers\Admin\SertifikatSertifikasiController;
use App\Http\Controllers\Admin\PelatihanController as AdminPelatihanController;
use App\Http\Controllers\Admin\SertifikasiController as AdminSertifikasiController;
use Illuminate\View\View;

// ==================== PUBLIC ROUTES ====================
Route::get('/', function () {
    return view('frontend.home');
})->name('home');

// Pelatihan
// Route::get('/pelatihan', [PelatihanController::class, 'index'])->name('pelatihan.index');
// Route::get('/pelatihan/{slug}', [PelatihanController::class, 'show'])->name('pelatihan.show');

// // Sertifikasi
Route::get('/sertifikasi', [SertifikasiController::class, 'index'])->name('sertifikasi.index');
Route::get('/sertifikasi/{slug}', [SertifikasiController::class, 'show'])->name('sertifikasi.show');

// Blog
Route::get('/blog', function () {
    return view('frontend.blog');
})->name('blog');

Route::get('/detail-blog', function () {
    return view('frontend.detail-blog');
})->name('blog.detail');

// Profil Perusahaan
Route::get('/profilPerusahaan', function () {
    return view('frontend.profilPerusahaan');
})->name('profil.perusahaan');

Route::get('/legalitas', function () {
    return view('frontend.legalitas');
})->name('legalitas');

// ==================== AUTH ROUTES ====================
Route::middleware('guest')->group(function () {
    // Login
    Route::get('/login', function (): View {
        return view('frontend.login');
    })->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    // Register
    Route::get('/daftar', function (): View {
        return view('frontend.daftar');
    })->name('register');
    Route::post('/daftar', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// ==================== USER ROUTES (AUTHENTICATED) ====================
Route::middleware('auth')->group(function () {
    // Profil
    Route::get('/profil', [ProfileController::class, 'index'])->name('profil');
    Route::post('/profil/upload-bukti-pelatihan', [ProfileController::class, 'uploadBuktiPelatihan'])->name('profil.uploadBuktiPelatihan');
    Route::post('/profil/upload-bukti-sertifikasi', [ProfileController::class, 'uploadBuktiSertifikasi'])->name('profil.uploadBuktiSertifikasi');

    // Notifikasi
    Route::get('/notifikasi', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifikasi/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifikasi/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.readAll');
    Route::delete('/notifikasi/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
    Route::get('/notifikasi/unread-count', [NotificationController::class, 'getUnreadCount'])->name('notifications.unreadCount');

    // Transaksi
    Route::post('/transaksi/pelatihan/store', [TransaksiPelatihanController::class, 'store'])->name('transaksi.pelatihan.store');
    Route::post('/transaksi/sertifikasi/store', [TransaksiSertifikasiController::class, 'store'])->name('transaksi.sertifikasi.store');
});

// ==================== ADMIN ROUTES ====================
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->name('dashboard');

    // CRUD Pelatihan
    Route::resource('pelatihan', AdminPelatihanController::class);

    // CRUD Sertifikasi
    Route::resource('sertifikasi', AdminSertifikasiController::class);

    // Pembayaran
    Route::get('/pembayaran', [PembayaranController::class, 'index'])->name('pembayaran.index');
    Route::post('/pembayaran/pelatihan/{id}/approve', [PembayaranController::class, 'approvePelatihan'])->name('pembayaran.pelatihan.approve');
    Route::post('/pembayaran/pelatihan/{id}/reject', [PembayaranController::class, 'rejectPelatihan'])->name('pembayaran.pelatihan.reject');
    Route::post('/pembayaran/sertifikasi/{id}/approve', [PembayaranController::class, 'approveSertifikasi'])->name('pembayaran.sertifikasi.approve');
    Route::post('/pembayaran/sertifikasi/{id}/reject', [PembayaranController::class, 'rejectSertifikasi'])->name('pembayaran.sertifikasi.reject');

    // Sertifikat Pelatihan
    Route::get('/sertifikat-pelatihan', [SertifikatPelatihanController::class, 'index'])->name('sertifikat-pelatihan.index');
    Route::post('/sertifikat-pelatihan/generate/{id}', [SertifikatPelatihanController::class, 'generate'])->name('sertifikat-pelatihan.generate');
    Route::post('/sertifikat-pelatihan/generate-batch/{pelatihan_id}', [SertifikatPelatihanController::class, 'generateBatch'])->name('sertifikat-pelatihan.generate-batch');
    Route::post('/sertifikat-pelatihan/regenerate/{id}', [SertifikatPelatihanController::class, 'regenerate'])->name('sertifikat-pelatihan.regenerate');
    Route::get('/sertifikat-pelatihan/download/{id}', [SertifikatPelatihanController::class, 'download'])->name('sertifikat-pelatihan.download');

    // Sertifikat Sertifikasi (Internal)
    Route::get('/sertifikat-sertifikasi', [SertifikatSertifikasiController::class, 'index'])->name('sertifikat-sertifikasi.index');
    Route::post('/sertifikat-sertifikasi/generate/{id}', [SertifikatSertifikasiController::class, 'generate'])->name('sertifikat-sertifikasi.generate');
    Route::post('/sertifikat-sertifikasi/generate-batch/{sertifikasi_id}', [SertifikatSertifikasiController::class, 'generateBatch'])->name('sertifikat-sertifikasi.generate-batch');
    Route::post('/sertifikat-sertifikasi/regenerate/{id}', [SertifikatSertifikasiController::class, 'regenerate'])->name('sertifikat-sertifikasi.regenerate');
    Route::get('/sertifikat-sertifikasi/download/{id}', [SertifikatSertifikasiController::class, 'download'])->name('sertifikat-sertifikasi.download');

    // Sertifikat BNSP
    Route::post('/sertifikat-sertifikasi/upload-bnsp/{id}', [SertifikatSertifikasiController::class, 'uploadBnsp'])->name('sertifikat-sertifikasi.upload-bnsp');
    Route::post('/sertifikat-sertifikasi/update-bnsp/{id}', [SertifikatSertifikasiController::class, 'updateBnsp'])->name('sertifikat-sertifikasi.update-bnsp');
    Route::get('/sertifikat-sertifikasi/download-bnsp/{id}', [SertifikatSertifikasiController::class, 'downloadBnsp'])->name('sertifikat-sertifikasi.download-bnsp');
    Route::delete('/sertifikat-sertifikasi/delete-bnsp/{id}', [SertifikatSertifikasiController::class, 'deleteBnsp'])->name('sertifikat-sertifikasi.delete-bnsp');

    // User Management
    Route::get('/user', function () {
        return view('admin.user');
    })->name('user.index');
});
