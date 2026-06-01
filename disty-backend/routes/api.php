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
use App\Http\Controllers\API\Admin\BlogController;
use App\Http\Controllers\API\Admin\SertifikatPelatihanApiController;
use App\Http\Controllers\API\Admin\SertifikatSertifikasiApiController;
use App\Http\Controllers\API\Admin\UserApiController;

// =====================================================
// PUBLIC ROUTES
// =====================================================

// AUTH
Route::post('/login', [AuthApiController::class, 'login']);
Route::post('/register', [AuthApiController::class, 'register']);

// FRONTEND PELATIHAN

Route::get('/frontend/pelatihan', [FrontendPelatihanApiController::class, 'index']);
Route::get('/frontend/pelatihan/{slug}', [FrontendPelatihanApiController::class, 'show']);

Route::post(
    '/midtrans/webhook',
    [TransaksiPelatihanApiController::class, 'webhook']
);

// FRONTEND SERTIFIKASI
Route::get('/frontend/sertifikasi', [FrontendSertifikasiApiController::class, 'index']);
Route::get('/frontend/sertifikasi/{slug}', [FrontendSertifikasiApiController::class, 'show']);

// BLOG
Route::get('/blogs', [BlogController::class, 'publicBlogs']);
Route::get('/blogs/{slug}', [BlogController::class, 'publicShow']);


// =====================================================
// PROTECTED ROUTES
// =====================================================

Route::middleware('auth:sanctum')->group(function () {

    // ================= AUTH =================
    Route::post('/logout', [AuthApiController::class, 'logout']);
    Route::get('/me', [AuthApiController::class, 'me']);

    // ================= PROFILE =================
    Route::get('/profile', [ProfileApiController::class, 'index']);

    Route::post(
        '/profile/upload-bukti-pelatihan',
        [ProfileApiController::class, 'uploadBuktiPelatihan']
    );

    Route::post(
        '/profile/upload-bukti-sertifikasi',
        [ProfileApiController::class, 'uploadBuktiSertifikasi']
    );

    Route::middleware('auth:sanctum')->get(
        '/profile/stats',
        [ProfileApiController::class, 'stats']
    );

    // ================= NOTIFICATIONS =================
    Route::get('/notifications', [NotificationApiController::class, 'index']);

    Route::post(
        '/notifications/read/{id}',
        [NotificationApiController::class, 'markAsRead']
    );

    Route::post(
        '/notifications/read-all',
        [NotificationApiController::class, 'markAllAsRead']
    );

    Route::delete(
        '/notifications/{id}',
        [NotificationApiController::class, 'destroy']
    );

    Route::get(
        '/notifications/unread-count',
        [NotificationApiController::class, 'getUnreadCount']
    );
    Route::middleware('auth:sanctum')->group(function () {
        // ================= TRANSAKSI PELATIHAN =================
        Route::post('/transaksi/pelatihan', [TransaksiPelatihanApiController::class, 'store']);
        Route::post('/transaksi/pelatihan/upload-bukti/{id}', [TransaksiPelatihanApiController::class, 'uploadBukti']);
        Route::get('/admin/transaksi/pelatihan', [TransaksiPelatihanApiController::class, 'index']);
        Route::get('/my-transactions', [TransaksiPelatihanApiController::class, 'myTransactions']);
        Route::post('/transaksi/repay/{id}', [TransaksiPelatihanApiController::class, 'repay']);
        Route::get('/transaksi/check-status/{id}', [TransaksiPelatihanApiController::class, 'checkStatus']);



        // ================= MY PELATIHAN =================

        Route::get(
            '/my-pelatihan',
            [TransaksiPelatihanApiController::class, 'myPelatihan']
        );

        // ================= MY SERTIFIKASI =================

        Route::get(
            '/my-sertifikasi',
            [ProfileApiController::class, 'mySertifikasi']
        );



        // ================= TRANSAKSI SERTIFIKASI =================
        Route::post(
            '/transaksi/sertifikasi',
            [TransaksiSertifikasiApiController::class, 'store']
        );
    });

    // =====================================================
    // ADMIN
    // =====================================================

    // DASHBOARD
    Route::get('/dashboard', [DashboardApiController::class, 'index']);

    // ================= PELATIHAN =================
    Route::get('/pelatihan', [PelatihanApiController::class, 'index']);
    Route::get('/pelatihan/{id}', [PelatihanApiController::class, 'show']);

    Route::post('/pelatihan', [PelatihanApiController::class, 'store']);

    Route::post('/pelatihan/update/{id}', [PelatihanApiController::class, 'update']);

    Route::get('/my-pelatihan', [TransaksiPelatihanApiController::class, 'myPelatihan']);

    Route::delete(
        '/pelatihan/{id}',
        [PelatihanApiController::class, 'destroy']
    );

    // ================= PEMBAYARAN =================
    Route::get('/pembayaran', [PembayaranApiController::class, 'index']);

    Route::post(
        '/pembayaran/pelatihan/{id}/approve',
        [PembayaranApiController::class, 'approvePelatihan']
    );

    Route::post(
        '/pembayaran/pelatihan/{id}/reject',
        [PembayaranApiController::class, 'rejectPelatihan']
    );

    Route::post(
        '/pembayaran/sertifikasi/{id}/approve',
        [PembayaranApiController::class, 'approveSertifikasi']
    );

    Route::post(
        '/pembayaran/sertifikasi/{id}/reject',
        [PembayaranApiController::class, 'rejectSertifikasi']
    );

    // ================= SERTIFIKASI =================
    Route::get('/sertifikasi', [SertifikasiApiController::class, 'index']);
    Route::get('/sertifikasi/{id}', [SertifikasiApiController::class, 'show']);
    Route::post('/sertifikasi', [SertifikasiApiController::class, 'store']);
    Route::post('/sertifikasi/update/{id}', [SertifikasiApiController::class, 'update']);
    Route::delete('/sertifikasi/{id}', [SertifikasiApiController::class, 'destroy']);

    // ================= BLOG =================
    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog/{id}', [BlogController::class, 'show']);
    Route::post('/blog', [BlogController::class, 'store']);
    Route::post('/blog/update/{id}', [BlogController::class, 'update']);

    Route::delete('/blog/{id}', [BlogController::class, 'destroy']);

    // ================= SERTIFIKAT PELATIHAN =================
    Route::get('/sertifikat-pelatihan', [SertifikatPelatihanApiController::class, 'index']);
    Route::post('/sertifikat-pelatihan/complete/{id}', [SertifikatPelatihanApiController::class, 'markCompleted']);
    Route::post('/sertifikat-pelatihan/generate/{id}', [SertifikatPelatihanApiController::class, 'generate']);
    Route::post('/sertifikat-pelatihan/generate-batch/{pelatihan_id}', [SertifikatPelatihanApiController::class, 'generateBatch']);
    Route::post('/sertifikat-pelatihan/regenerate/{id}', [SertifikatPelatihanApiController::class, 'regenerate']);
    Route::get('/sertifikat-pelatihan/download/{id}', [SertifikatPelatihanApiController::class, 'download']);
    Route::get('/sertifikat-pelatihan/preview/{id}', [SertifikatPelatihanApiController::class, 'preview']);

    // ================= SERTIFIKAT SERTIFIKASI =================
    Route::get('/sertifikat-sertifikasi',[SertifikatSertifikasiApiController::class, 'index']);
    Route::post('/sertifikat-sertifikasi/generate/{id}',[SertifikatSertifikasiApiController::class, 'generate']);
    Route::get('/sertifikat-sertifikasi/download/{id}',[SertifikatSertifikasiApiController::class, 'download']);
    Route::post('/sertifikat-sertifikasi/upload-bnsp/{id}',[SertifikatSertifikasiApiController::class, 'uploadBnsp']);

    Route::get(
        '/sertifikat-sertifikasi/download-bnsp/{id}',
        [SertifikatSertifikasiApiController::class, 'downloadBnsp']
    );

    Route::delete(
        '/sertifikat-sertifikasi/delete-bnsp/{id}',
        [SertifikatSertifikasiApiController::class, 'deleteBnsp']
    );

    // ================= USER MANAGEMENT =================
    Route::get('/users', [UserApiController::class, 'index']);
    Route::post('/users', [UserApiController::class, 'store']);
    Route::put('/users/{id}', [UserApiController::class, 'update']);
    Route::delete('/users/{id}', [UserApiController::class, 'destroy']);
});
