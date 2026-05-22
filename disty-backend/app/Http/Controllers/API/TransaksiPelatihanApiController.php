<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TransaksiPelatihan;
use App\Models\Pelatihan;
use App\Models\Notification;

class TransaksiPelatihanApiController extends Controller
{
    // ✅ DAFTAR / TRANSAKSI PELATIHAN
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
                'nullable'
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

                'status' =>
                $pelatihan->kategori === 'gratis'
                ? 'approved'
                : 'pending',
            ]);

        // notif
        if ($pelatihan->kategori === 'gratis') {

            Notification::create([
                'user_id' =>
                    Auth::id(),

                'type' =>
                    'daftar_gratis',

                'title' =>
                    'Pendaftaran Berhasil! 🎉',

                'message' =>
                    "Anda berhasil mendaftar pelatihan \"{$pelatihan->nama_pelatihan}\".",

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
                    'Pendaftaran berhasil',

                'link_grup' =>
                    $pelatihan->link_grup,

                'transaksi' =>
                    $transaksi
            ]);
        }

        // notif berbayar
        Notification::create([
            'user_id' =>
                Auth::id(),

            'type' =>
                'daftar_berbayar',

            'title' =>
                'Pendaftaran Berhasil! ✅',

            'message' =>
                "Anda berhasil mendaftar pelatihan \"{$pelatihan->nama_pelatihan}\".",

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
                'Pendaftaran berhasil',

            'transaksi' =>
                $transaksi
        ]);
    }
}