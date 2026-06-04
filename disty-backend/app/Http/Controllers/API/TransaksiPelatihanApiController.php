<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\PaymentSetting;
use App\Models\Pelatihan;
use App\Models\TransaksiPelatihan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Notification as MidtransNotification;
use Midtrans\Snap;
use App\Models\TransaksiSertifikasi;

class TransaksiPelatihanApiController extends Controller
{
    public function index()
    {
        $transaksi = TransaksiPelatihan::with([
            'user',
            'pelatihan'
        ])
            ->latest()
            ->get();

        return response()->json($transaksi);
    }

    public function store(Request $request)
    {
        // cek login
        if (!Auth::check()) {

            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([

            'pelatihan_id' =>
                'required',

            'nama' =>
                'required',

            'email' =>
                'required|email',

            'nomor_hp' =>
                'required',

            'paymentMethod' =>
                'nullable|in:transfer,ewallet',
        ]);

        $pelatihan =
            Pelatihan::findOrFail(
                $request->pelatihan_id
            );

        // metode pembayaran
        $metode =
            $pelatihan->kategori === 'gratis'
            ? 'gratis'
            : $request->paymentMethod;

        $kode =
            'DSTY-' .
            now()->format('Ymd') .
            '-' .
            rand(100, 999);

        $existing =
            TransaksiPelatihan::where(
                'user_id',
                Auth::id()
            )
                ->where(
                    'pelatihan_id',
                    $pelatihan->id
                )
                ->whereIn('status', [
                    'pending',
                    'paid',
                    'completed'
                ])
                ->first();

        if ($existing) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Anda sudah terdaftar pada pelatihan ini'
            ], 400);
        }

        // create transaksi
        $transaksi =
            TransaksiPelatihan::create([

                'user_id' =>
                    Auth::id(),

                'pelatihan_id' =>
                    $request->pelatihan_id,

                'nama' =>
                    $request->nama,

                'email' =>
                    $request->email,

                'nomor_hp' =>
                    $request->nomor_hp,

                'metode_pembayaran' =>
                    $metode,

                'kode_transaksi' =>
                    $kode,

                'total_harga' =>
                    $pelatihan->harga,

                'status' =>
                    $pelatihan->kategori === 'gratis'
                    ? 'completed'
                    : 'pending',
            ]);

        /*
        |--------------------------------------------------------------------------
        | PELATIHAN GRATIS
        |--------------------------------------------------------------------------
        */

        if ($pelatihan->kategori === 'gratis') {

            Notification::create([

                'user_id' =>
                    Auth::id(),

                'type' =>
                    'daftar_gratis',

                'title' =>
                    'Pendaftaran Berhasil! 🎉',

                'message' =>
                    "Anda berhasil mendaftar pelatihan \"{$pelatihan->title}\".",

                'icon' =>
                    'fas fa-check-circle',

                'color' =>
                    'success',

                'url' =>
                    '/profil',

                'is_read' =>
                    false
            ]);

            return response()->json([

                'status' =>
                    'success',

                'kategori' =>
                    'gratis',

                'message' =>
                    'Pendaftaran berhasil',

                'link_grup' =>
                    $pelatihan->link_grup,

                'transaksi' =>
                    $transaksi
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | MIDTRANS CONFIG
        |--------------------------------------------------------------------------
        */

        $setting =
            PaymentSetting::where(
                'provider',
                'midtrans'
            )
                ->where(
                    'is_active',
                    true
                )
                ->first();

        $serverKey =
            decrypt(
                $setting->server_key
            );

        Config::$serverKey =
            $serverKey;

        Config::$isProduction =
            $setting->is_production;

        Config::$isSanitized = true;

        Config::$is3ds = true;

        /*
        |--------------------------------------------------------------------------
        | GENERATE ORDER ID
        |--------------------------------------------------------------------------
        */

        $orderId =
            'DISTY-' .
            strtoupper(
                Str::random(10)
            );

        /*
        |--------------------------------------------------------------------------
        | MIDTRANS PARAMS
        |--------------------------------------------------------------------------
        */

        $params = [

            'transaction_details' => [

                'order_id' =>
                    $orderId,

                'gross_amount' =>
                    (int) 
                    $pelatihan->harga,
            ],

            'customer_details' => [

                'first_name' =>
                    $request->nama,

                'email' =>
                    $request->email,

                'phone' =>
                    $request->nomor_hp,
            ],
        ];

        /*
        |--------------------------------------------------------------------------
        | GENERATE SNAP TOKEN
        |--------------------------------------------------------------------------
        */

        $snapToken =
            Snap::getSnapToken(
                $params
            );

        /*
        |--------------------------------------------------------------------------
        | UPDATE TRANSAKSI
        |--------------------------------------------------------------------------
        */

        $transaksi->update([

            'snap_token' =>
                $snapToken,

            'midtrans_order_id' =>
                $orderId,

            'transaction_status' =>
                'pending',
        ]);

        /*
        |--------------------------------------------------------------------------
        | NOTIFIKASI
        |--------------------------------------------------------------------------
        */

        Notification::create([

            'user_id' =>
                Auth::id(),

            'type' =>
                'daftar_berbayar',

            'title' =>
                'Menunggu Pembayaran 💳',

            'message' =>
                "Silakan selesaikan pembayaran pelatihan \"{$pelatihan->title}\".",

            'icon' =>
                'fas fa-credit-card',

            'color' =>
                'warning',

            'url' =>
                '/profil',

            'is_read' =>
                false
        ]);

        return response()->json([

            'status' =>
                'success',

            'kategori' =>
                'berbayar',

            'snap_token' =>
                $snapToken,

            'transaksi' =>
                $transaksi
        ]);
    }

    public function repay(int $id)
    {
        $transaksi =
            TransaksiPelatihan::with(
                'pelatihan'
            )
                ->findOrFail($id);

        // midtrans config
        $setting =
            PaymentSetting::where(
                'provider',
                'midtrans'
            )
                ->where(
                    'is_active',
                    true
                )
                ->first();

        $serverKey =
            decrypt(
                $setting->server_key
            );

        Config::$serverKey =
            $serverKey;

        Config::$isProduction =
            $setting->is_production;

        Config::$isSanitized = true;

        Config::$is3ds = true;

        // generate order baru
        $orderId =
            'DISTY-REPAY-' .
            strtoupper(
                Str::random(10)
            );

        $params = [

            'transaction_details' => [

                'order_id' =>
                    $orderId,

                'gross_amount' =>
                    (int) 
                    $transaksi->total_harga,
            ],

            'customer_details' => [

                'first_name' =>
                    $transaksi->nama,

                'email' =>
                    $transaksi->email,

                'phone' =>
                    $transaksi->nomor_hp,
            ],
        ];

        $snapToken =
            Snap::getSnapToken(
                $params
            );

        // update transaksi
        $transaksi->update([

            'snap_token' =>
                $snapToken,

            'midtrans_order_id' =>
                $orderId,
        ]);

        return response()->json([

            'status' =>
                'success',

            'snap_token' =>
                $snapToken,
        ]);
    }

    public function webhook(Request $request)
{
    Log::info('MIDTRANS WEBHOOK', $request->all());

    $payload = $request->all();

    $orderId = $payload['order_id'] ?? null;
    $transactionStatus = $payload['transaction_status'] ?? null;
    $paymentType = $payload['payment_type'] ?? null;

    Log::info('ORDER ID', [
        'order_id' => $orderId
    ]);

    Log::info('TRANSACTION STATUS', [
        'status' => $transactionStatus
    ]);

    if (!$orderId) {
        return response()->json([
            'message' => 'Order ID kosong'
        ], 400);
    }

    $transaksi = TransaksiPelatihan::where(
        'midtrans_order_id',
        $orderId
    )->first();

    if (!$transaksi) {

        Log::error('TRANSAKSI TIDAK DITEMUKAN', [
            'order_id' => $orderId
        ]);

        return response()->json([
            'message' => 'Transaksi tidak ditemukan'
        ], 404);
    }

    if (
        $transactionStatus === 'settlement' ||
        $transactionStatus === 'capture'
    ) {

        $transaksi->update([
            'status' => 'completed',
            'transaction_status' => 'paid',
            'payment_type' => $paymentType,
            'paid_at' => now(),
        ]);

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'payment_success',
            'title' => 'Pembayaran Berhasil 🎉',
            'message' => 'Pembayaran berhasil diverifikasi otomatis.',
            'icon' => 'fas fa-check-circle',
            'color' => 'success',
            'url' => '/my-transactions',
            'is_read' => false,
        ]);
    }

    if ($transactionStatus === 'pending') {

        $transaksi->update([
            'status' => 'pending',
            'transaction_status' => 'pending',
        ]);
    }

    if (
        $transactionStatus === 'expire' ||
        $transactionStatus === 'cancel' ||
        $transactionStatus === 'deny'
    ) {

        $transaksi->update([
            'status' => 'rejected',
            'transaction_status' => 'failed',
        ]);
    }

    return response()->json([
        'success' => true
    ], 200);
}

public function checkStatus($id)
{
    $transaksi = TransaksiPelatihan::findOrFail($id);

    $setting = PaymentSetting::first();

    \Midtrans\Config::$serverKey = decrypt($setting->server_key);
    \Midtrans\Config::$isProduction = $setting->is_production;

    $status = \Midtrans\Transaction::status(
        $transaksi->midtrans_order_id
    );

    if (
        $status->transaction_status === 'settlement' ||
        $status->transaction_status === 'capture'
    ) {

        $transaksi->update([
            'status' => 'completed',
            'transaction_status' => 'paid',
            'payment_type' => $status->payment_type ?? null,
            'paid_at' => now()
        ]);
    }

    return response()->json([
        'success' => true,
        'data' => $transaksi->fresh()
    ]);
}

    public function myPelatihan()
    {
        $data = TransaksiPelatihan::with([
            'pelatihan.moduls'
        ])
            ->where('user_id', Auth::id())
            ->whereIn('status', [
                'paid',
                'completed'
            ])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function myTransactions()
    {
        $userId = Auth::id();

        $pelatihan = TransaksiPelatihan::with('pelatihan')
            ->where('user_id', $userId)
            ->get()
            ->map(function ($item) {

                $item->jenis = 'pelatihan';

                $item->nama_program =
                    $item->pelatihan?->title;

                return $item;
            });

        $sertifikasi = TransaksiSertifikasi::with('sertifikasi')
            ->where('user_id', $userId)
            ->get()
            ->map(function ($item) {

                $item->jenis = 'sertifikasi';

                $item->nama_program =
                    $item->sertifikasi?->nama_sertifikasi;

                return $item;
            });

        $data = $pelatihan
            ->concat($sertifikasi)
            ->sortByDesc('created_at')
            ->values();

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}