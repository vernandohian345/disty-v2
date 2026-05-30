<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Sertifikasi;
use App\Models\TransaksiSertifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransaksiSertifikasiApiController extends Controller
{
    // ✅ DAFTAR / TRANSAKSI SERTIFIKASI
    public function store(Request $request)
    {
        if (!Auth::check()) {

            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'sertifikasi_id' =>
                'required',

            'nama' =>
                'required',

            'email' =>
                'required|email',

            'nomor_hp' =>
                'required',

            'paymentMethod' =>
                'nullable'
        ]);

        $sertifikasi =
            Sertifikasi::findOrFail(
                $request->sertifikasi_id
            );

        // =========================
// CEK SUDAH TERDAFTAR
// =========================

        $existing =
            TransaksiSertifikasi::where(
                'user_id',
                Auth::id()
            )
                ->where(
                    'sertifikasi_id',
                    $request->sertifikasi_id
                )
                ->whereIn(
                    'status',
                    [
                        'pending',
                        'paid',
                        'approved'
                    ]
                )
                ->first();

        if ($existing) {

            return response()->json([
                'status' => 'error',

                'message' =>
                    'Anda sudah terdaftar pada sertifikasi ini'
            ], 422);
        }

        // metode pembayaran
        $metode =
            $sertifikasi->kategori === 'gratis'
            ? 'gratis'
            : $request->paymentMethod;

        // create transaksi
        $transaksi =
            TransaksiSertifikasi::create([

                // sementara hardcode
                'user_id' => Auth::id(),

                'sertifikasi_id' =>
                    $request->sertifikasi_id,

                'nama' =>
                    $request->nama,

                'email' =>
                    $request->email,

                'nomor_hp' =>
                    $request->nomor_hp,

                'metode_pembayaran' =>
                    $metode,

                'status' => 'pending',
            ]);

        // notif gratis
        if ($sertifikasi->kategori === 'gratis') {

            Notification::create([
                'user_id' => Auth::id(),

                'type' =>
                    'daftar_gratis',

                'title' =>
                    'Pendaftaran Sertifikasi Berhasil! 🎉',

                'message' =>
                    "Anda berhasil mendaftar sertifikasi \"{$sertifikasi->nama_sertifikasi}\".",

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
                'status' => 'success',

                'kategori' => 'gratis',

                'message' =>
                    'Pendaftaran sertifikasi berhasil',

                'link_grup' =>
                    $sertifikasi->link_grup,

                'transaksi' =>
                    $transaksi
            ]);
        }

        // notif berbayar
        Notification::create([
            'user_id' => Auth::id(),

            'type' =>
                'daftar_berbayar',

            'title' =>
                'Pendaftaran Sertifikasi Berhasil! ✅',

            'message' =>
                "Anda berhasil mendaftar sertifikasi \"{$sertifikasi->nama_sertifikasi}\".",

            'icon' =>
                'fas fa-info-circle',

            'color' =>
                'warning',

            'url' =>
                '/profil',

            'is_read' =>
                false
        ]);

        return response()->json([
            'status' => 'success',

            'kategori' => 'berbayar',

            'message' =>
                'Pendaftaran sertifikasi berhasil',

            'transaksi' =>
                $transaksi
        ]);
    }
}