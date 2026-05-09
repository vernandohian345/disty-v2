<?php

use Illuminate\Support\Facades\Route;

// AUTH
use App\Http\Controllers\API\AuthApiController;

// FRONTEND
use App\Http\Controllers\API\NotificationApiController;
use App\Http\Controllers\API\FrontendPelatihanApiController;
use App\Http\Controllers\API\FrontendSertifikasiApiController;
use App\Http\Controllers\API\ProfileApiController;
use App\Http\Controllers\API\TransaksiPelatihanApiController;
use App\Http\Controllers\API\TransaksiSertifikasiApiController;

// ADMIN
use App\Http\Controllers\API\Admin\DashboardApiController;
use App\Http\Controllers\API\Admin\PelatihanApiController;
use App\Http\Controllers\API\Admin\PembayaranApiController;
use App\Http\Controllers\API\Admin\SertifikasiApiController;
use App\Http\Controllers\API\Admin\SertifikatPelatihanApiController;
use App\Http\Controllers\API\Admin\SertifikatSertifikasiApiController;



// =====================================================
// PUBLIC ROUTES
// =====================================================

// AUTH
Route::post('/login',
    [AuthApiController::class, 'login']);

Route::post('/register',
    [AuthApiController::class, 'register']);


// FRONTEND PELATIHAN
Route::get('/frontend/pelatihan',
    [FrontendPelatihanApiController::class, 'index']);

Route::get('/frontend/pelatihan/{slug}',
    [FrontendPelatihanApiController::class, 'show']);


// FRONTEND SERTIFIKASI
Route::get('/frontend/sertifikasi',
    [FrontendSertifikasiApiController::class, 'index']);

Route::get('/frontend/sertifikasi/{slug}',
    [FrontendSertifikasiApiController::class, 'show']);



// =====================================================
// PROTECTED ROUTES (SANCTUM)
// =====================================================

Route::middleware('auth:sanctum')
    ->group(function () {

    // ================= AUTH =================

    Route::post('/logout',
        [AuthApiController::class, 'logout']);

    Route::get('/me',
        [AuthApiController::class, 'me']);


    // ================= PROFILE =================

    Route::get('/profile',
        [ProfileApiController::class, 'index']);

    Route::post(
        '/profile/upload-bukti-pelatihan',
        [ProfileApiController::class,
        'uploadBuktiPelatihan']
    );

    Route::post(
        '/profile/upload-bukti-sertifikasi',
        [ProfileApiController::class,
        'uploadBuktiSertifikasi']
    );


    // ================= NOTIFICATIONS =================

    Route::get('/notifications',
        [NotificationApiController::class, 'index']);

    Route::post(
        '/notifications/read/{id}',
        [NotificationApiController::class,
        'markAsRead']
    );

    Route::post(
        '/notifications/read-all',
        [NotificationApiController::class,
        'markAllAsRead']
    );

    Route::delete(
        '/notifications/{id}',
        [NotificationApiController::class,
        'destroy']
    );

    Route::get(
        '/notifications/unread-count',
        [NotificationApiController::class,
        'getUnreadCount']
    );


    // ================= TRANSAKSI PELATIHAN =================

    Route::post(
        '/transaksi/pelatihan',
        [TransaksiPelatihanApiController::class,
        'store']
    );


    // ================= TRANSAKSI SERTIFIKASI =================

    Route::post(
        '/transaksi/sertifikasi',
        [TransaksiSertifikasiApiController::class,
        'store']
    );


    // =====================================================
    // ADMIN
    // =====================================================

    // DASHBOARD
    Route::get('/dashboard',
        [DashboardApiController::class, 'index']);


    // ================= PELATIHAN =================

    Route::get('/pelatihan',
        [PelatihanApiController::class, 'index']);

    Route::get('/pelatihan/{id}',
        [PelatihanApiController::class, 'show']);

    Route::post('/pelatihan',
        [PelatihanApiController::class, 'store']);

    Route::post('/pelatihan/update/{id}',
        [PelatihanApiController::class, 'update']);

    Route::delete('/pelatihan/{id}',
        [PelatihanApiController::class, 'destroy']);


    // ================= PEMBAYARAN =================

    Route::get('/pembayaran',
        [PembayaranApiController::class, 'index']);

    Route::post(
        '/pembayaran/pelatihan/{id}/approve',
        [PembayaranApiController::class,
        'approvePelatihan']
    );

    Route::post(
        '/pembayaran/pelatihan/{id}/reject',
        [PembayaranApiController::class,
        'rejectPelatihan']
    );

    Route::post(
        '/pembayaran/sertifikasi/{id}/approve',
        [PembayaranApiController::class,
        'approveSertifikasi']
    );

    Route::post(
        '/pembayaran/sertifikasi/{id}/reject',
        [PembayaranApiController::class,
        'rejectSertifikasi']
    );


    // ================= SERTIFIKASI =================

    Route::get('/sertifikasi',
        [SertifikasiApiController::class, 'index']);

    Route::get('/sertifikasi/{id}',
        [SertifikasiApiController::class, 'show']);

    Route::post('/sertifikasi',
        [SertifikasiApiController::class, 'store']);

    Route::post('/sertifikasi/update/{id}',
        [SertifikasiApiController::class, 'update']);

    Route::delete('/sertifikasi/{id}',
        [SertifikasiApiController::class, 'destroy']);


    // ================= SERTIFIKAT PELATIHAN =================

    Route::get('/sertifikat-pelatihan',
        [SertifikatPelatihanApiController::class, 'index']);

    Route::post(
        '/sertifikat-pelatihan/generate/{id}',
        [SertifikatPelatihanApiController::class,
        'generate']
    );

    Route::post(
        '/sertifikat-pelatihan/generate-batch/{pelatihan_id}',
        [SertifikatPelatihanApiController::class,
        'generateBatch']
    );

    Route::post(
        '/sertifikat-pelatihan/regenerate/{id}',
        [SertifikatPelatihanApiController::class,
        'regenerate']
    );

    Route::get(
        '/sertifikat-pelatihan/download/{id}',
        [SertifikatPelatihanApiController::class,
        'download']
    );


    // ================= SERTIFIKAT SERTIFIKASI =================

    Route::get('/sertifikat-sertifikasi',
        [SertifikatSertifikasiApiController::class, 'index']);

    Route::post(
        '/sertifikat-sertifikasi/generate/{id}',
        [SertifikatSertifikasiApiController::class,
        'generate']
    );

    Route::get(
        '/sertifikat-sertifikasi/download/{id}',
        [SertifikatSertifikasiApiController::class,
        'download']
    );

    Route::post(
        '/sertifikat-sertifikasi/upload-bnsp/{id}',
        [SertifikatSertifikasiApiController::class,
        'uploadBnsp']
    );

    Route::get(
        '/sertifikat-sertifikasi/download-bnsp/{id}',
        [SertifikatSertifikasiApiController::class,
        'downloadBnsp']
    );

    Route::delete(
        '/sertifikat-sertifikasi/delete-bnsp/{id}',
        [SertifikatSertifikasiApiController::class,
        'deleteBnsp']
    );
});