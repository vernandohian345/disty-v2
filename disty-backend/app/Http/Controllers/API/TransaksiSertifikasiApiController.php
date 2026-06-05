<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use App\Models\Notification;
use App\Models\PaymentSetting;
use App\Models\Sertifikasi;
use App\Models\TransaksiSertifikasi;
use App\Models\SertifikasiUser;

use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;

class TransaksiSertifikasiApiController extends Controller
{
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'sertifikasi_id' => 'required',
            'nama' => 'required',
            'email' => 'required|email',
            'nomor_hp' => 'required',
            'paymentMethod' => 'nullable|in:transfer,ewallet',
        ]);

        $sertifikasi = Sertifikasi::findOrFail(
            $request->sertifikasi_id
        );

        $existing = TransaksiSertifikasi::where(
            'user_id',
            Auth::id()
        )
            ->where(
                'sertifikasi_id',
                $sertifikasi->id
            )
            ->whereIn('status', [
                'pending',
                'paid',
                'approved'
            ])
            ->first();

        if ($existing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda sudah terdaftar pada sertifikasi ini'
            ], 400);
        }

        $kode =
            'DSTY-SRT-' .
            now()->format('Ymd') .
            '-' .
            rand(100, 999);

        $transaksi = TransaksiSertifikasi::create([
            'user_id' => Auth::id(),
            'sertifikasi_id' => $sertifikasi->id,
            'kode_transaksi' => $kode,
            'nama' => $request->nama,
            'email' => $request->email,
            'nomor_hp' => $request->nomor_hp,
            'total_harga' => $sertifikasi->harga,
            'metode_pembayaran' =>
                $sertifikasi->kategori === 'gratis'
                    ? 'gratis'
                    : $request->paymentMethod,
            'status' =>
                $sertifikasi->kategori === 'gratis'
                    ? 'approved'
                    : 'pending',
            'transaction_status' => 'pending',
        ]);

        if ($sertifikasi->kategori === 'gratis') {

            Notification::create([
                'user_id' => Auth::id(),
                'type' => 'daftar_gratis',
                'title' => 'Pendaftaran Sertifikasi Berhasil 🎉',
                'message' => "Anda berhasil mendaftar sertifikasi \"{$sertifikasi->nama_sertifikasi}\".",
                'icon' => 'fas fa-check-circle',
                'color' => 'success',
                'url' => '/my-transactions',
                'is_read' => false,
            ]);

            return response()->json([
                'status' => 'success',
                'kategori' => 'gratis',
                'link_grup' => $sertifikasi->link_grup,
                'transaksi' => $transaksi
            ]);
        }

        $setting = PaymentSetting::where(
            'provider',
            'midtrans'
        )
            ->where(
                'is_active',
                true
            )
            ->first();

        Config::$serverKey =
            decrypt(
                $setting->server_key
            );

        Config::$isProduction =
            $setting->is_production;

        Config::$isSanitized = true;
        Config::$is3ds = true;

        $orderId =
            'DISTY-SERT-' .
            strtoupper(
                Str::random(10)
            );

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) $sertifikasi->harga,
            ],

            'customer_details' => [
                'first_name' => $request->nama,
                'email' => $request->email,
                'phone' => $request->nomor_hp,
            ],
        ];

        $snapToken =
            Snap::getSnapToken(
                $params
            );

        $transaksi->update([
            'snap_token' => $snapToken,
            'midtrans_order_id' => $orderId,
        ]);

        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'daftar_berbayar',
            'title' => 'Menunggu Pembayaran 💳',
            'message' => "Silakan selesaikan pembayaran sertifikasi \"{$sertifikasi->nama_sertifikasi}\".",
            'icon' => 'fas fa-credit-card',
            'color' => 'warning',
            'url' => '/my-transactions',
            'is_read' => false,
        ]);

        return response()->json([
            'status' => 'success',
            'kategori' => 'berbayar',
            'snap_token' => $snapToken,
            'transaksi' => $transaksi
        ]);
    }

    public function repay(int $id)
    {
        $transaksi = TransaksiSertifikasi::with('sertifikasi')
            ->findOrFail($id);

        $setting = PaymentSetting::where(
            'provider',
            'midtrans'
        )
            ->where(
                'is_active',
                true
            )
            ->first();

        Config::$serverKey =
            decrypt(
                $setting->server_key
            );

        Config::$isProduction =
            $setting->is_production;

        Config::$isSanitized = true;
        Config::$is3ds = true;

        $orderId =
            'DISTY-SERT-REPAY-' .
            strtoupper(
                Str::random(10)
            );

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) $transaksi->total_harga,
            ],
            'customer_details' => [
                'first_name' => $transaksi->nama,
                'email' => $transaksi->email,
                'phone' => $transaksi->nomor_hp,
            ],
        ];

        $snapToken =
            Snap::getSnapToken(
                $params
            );

        $transaksi->update([
            'snap_token' => $snapToken,
            'midtrans_order_id' => $orderId,
            'transaction_status' => 'pending',
        ]);

        return response()->json([
            'status' => 'success',
            'snap_token' => $snapToken,
        ]);
    }

    public function checkStatus($id)
    {
        $transaksi =
            TransaksiSertifikasi::findOrFail($id);

        $setting =
            PaymentSetting::first();

        Config::$serverKey =
            decrypt(
                $setting->server_key
            );

        Config::$isProduction =
            $setting->is_production;

        $status =
            Transaction::status(
                $transaksi->midtrans_order_id
            );

        if (
            $status->transaction_status === 'settlement' ||
            $status->transaction_status === 'capture'
        ) {

            $transaksi->update([
                'status' => 'approved',
                'transaction_status' => 'paid',
                'payment_type' =>
                    $status->payment_type ?? null,
                'paid_at' => now(),
            ]);

            // AUTO MASUK PESERTA
            SertifikasiUser::firstOrCreate([
                'user_id' => $transaksi->user_id,
                'sertifikasi_id' => $transaksi->sertifikasi_id,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $transaksi->fresh(),
        ]);
    }

    public function webhook(Request $request)
    {
        Log::info(
            'MIDTRANS SERTIFIKASI WEBHOOK',
            $request->all()
        );

        $payload =
            $request->all();

        $orderId =
            $payload['order_id'] ?? null;

        $transactionStatus =
            $payload['transaction_status'] ?? null;

        $paymentType =
            $payload['payment_type'] ?? null;

        if (!$orderId) {

            return response()->json([
                'message' => 'Order ID kosong'
            ], 400);
        }

        $transaksi =
            TransaksiSertifikasi::where(
                'midtrans_order_id',
                $orderId
            )->first();

        if (!$transaksi) {

            Log::error(
                'TRANSAKSI SERTIFIKASI TIDAK DITEMUKAN',
                [
                    'order_id' => $orderId
                ]
            );

            return response()->json([
                'message' =>
                    'Transaksi tidak ditemukan'
            ], 404);
        }


        if (
            $transactionStatus === 'settlement' ||
            $transactionStatus === 'capture'
        ) {

            $transaksi->update([
                'status' => 'approved',
                'transaction_status' => 'paid',
                'payment_type' => $paymentType,
                'paid_at' => now(),
            ]);

            // AUTO MASUK PESERTA
            SertifikasiUser::firstOrCreate([
                'user_id' => $transaksi->user_id,
                'sertifikasi_id' => $transaksi->sertifikasi_id,
            ]);

            Notification::create([
                'user_id' => $transaksi->user_id,
                'type' => 'payment_success',
                'title' => 'Pembayaran Sertifikasi Berhasil 🎉',
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
                'status' => 'pending',
                'transaction_status' => 'failed',
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
