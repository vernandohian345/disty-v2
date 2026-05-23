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

    public function index()
    {
        $transaksi =
            TransaksiPelatihan::with([
                'user',
                'pelatihan'
            ])
                ->latest()
                ->get();

        return response()->json([
            'status' => 'success',
            'transaksi' => $transaksi
        ]);
    }


    public function uploadBukti(
        Request $request,
        $id
    ) {

        $request->validate([
            'bukti' => 'required|image'
        ]);

        $transaksi =
            TransaksiPelatihan::findOrFail($id);

        if ($request->hasFile('bukti')) {

            $file =
                $request->file('bukti');

            $filename =
                time() . '_' .
                $file->getClientOriginalName();

            $file->move(
                public_path('uploads/bukti'),
                $filename
            );

            $transaksi->bukti =
                'uploads/bukti/' . $filename;
        }

        $transaksi->status =
            'paid';

        $transaksi->paid_at =
            now();

        $transaksi->save();

        return response()->json([
            'status' => 'success',
            'message' =>
                'Bukti pembayaran berhasil upload'
        ]);

    }



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

        $kode = 'DSTY-' . now()->format('Ymd') . '-' . rand(100, 999);

        $existing = TransaksiPelatihan::where(
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
                'message' => 'Anda sudah terdaftar pada pelatihan ini'
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
                "Anda berhasil mendaftar pelatihan \"{$pelatihan->title}\".",

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