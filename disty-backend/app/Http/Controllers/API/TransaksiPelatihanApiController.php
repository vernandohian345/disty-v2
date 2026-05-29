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

    public function myTransactions()
    {
        $transaksi =
            TransaksiPelatihan::with(
                'pelatihan'
            )
                ->where(
                    'user_id',
                    Auth::id()
                )
                ->latest()
                ->get();

        return response()->json([

            'status' => 'success',

            'data' => $transaksi
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
        try {

            Log::info('MIDTRANS WEBHOOK', $request->all());

            // CONFIG MIDTRANS
            $payment = PaymentSetting::where(
                'provider',
                'midtrans'
            )
                ->where(
                    'is_active',
                    true
                )
                ->first();

            if (!$payment) {

                return response()->json([
                    'message' => 'Payment setting not found'
                ], 404);
            }

            Config::$serverKey =
                decrypt($payment->server_key);

            Config::$isProduction =
                $payment->is_production;

            Config::$isSanitized = true;
            Config::$is3ds = true;

            // MIDTRANS
            $notification =
                new MidtransNotification();

            $transactionStatus =
                $notification->transaction_status;

            $paymentType =
                $notification->payment_type;

            $orderId =
                $notification->order_id;

            Log::info('ORDER ID : ' . $orderId);

            // TRANSAKSI
            $transaksi =
                TransaksiPelatihan::where(
                    'midtrans_order_id',
                    $orderId
                )->first();

            if (!$transaksi) {

                return response()->json([
                    'message' =>
                        'Transaksi tidak ditemukan'
                ], 404);
            }

            // SUCCESS
            if (
                $transactionStatus == 'settlement'
                ||
                $transactionStatus == 'capture'
            ) {

                $transaksi->update([

                    'status' =>
                        'completed',

                    'transaction_status' =>
                        'paid',

                    'payment_type' =>
                        $paymentType,

                    'paid_at' =>
                        now(),
                ]);
            }

            // PENDING
            else if (
                $transactionStatus == 'pending'
            ) {

                $transaksi->update([

                    'status' =>
                        'pending',

                    'transaction_status' =>
                        'pending',
                ]);
            }

            // FAILED
            else if (

                $transactionStatus == 'expire'
                ||
                $transactionStatus == 'cancel'
                ||
                $transactionStatus == 'deny'
            ) {

                $transaksi->update([

                    'status' =>
                        'rejected',

                    'transaction_status' =>
                        'failed',
                ]);
            }

            return response()->json([
                'success' => true
            ]);
        } catch (\Exception $e) {

            Log::error($e->getMessage());

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ==============================
// MY PELATIHAN USER
// ==============================

    public function myPelatihan()
    {
        $data = TransaksiPelatihan::with('pelatihan')
            ->where('user_id', Auth::id())
            ->whereIn('status', [
                'paid',
                'completed'
            ])
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }
}