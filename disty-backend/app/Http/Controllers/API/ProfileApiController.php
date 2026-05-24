<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TransaksiPelatihan;
use App\Models\TransaksiSertifikasi;
use App\Models\Notification;


class ProfileApiController extends Controller
{

    public function stats(Request $request)
    {
        $user = $request->user();

        $totalPelatihan = \App\Models\TransaksiPelatihan::where(
            'user_id',
            $user->id
        )->count();

        $pelatihanSelesai = \App\Models\TransaksiPelatihan::where(
            'user_id',
            $user->id
        )
            ->where('status', 'completed')
            ->count();

        $totalSertifikat = \App\Models\TransaksiSertifikasi::where(
            'user_id',
            $user->id
        )->count();

        return response()->json([
            'total_pelatihan' => $totalPelatihan,
            'pelatihan_selesai' => $pelatihanSelesai,
            'total_sertifikat' => $totalSertifikat,
        ]);
    }

    // ✅ PROFILE USER
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' =>
                    'User tidak ditemukan'
            ], 404);
        }

        $transaksiPelatihan =
            TransaksiPelatihan::with(
                'pelatihan'
            )
                ->where(
                    'user_id',
                    $user->id
                )
                ->orderBy(
                    'created_at',
                    'desc'
                )
                ->get();

        $transaksiSertifikasi =
            TransaksiSertifikasi::with(
                'sertifikasi'
            )
                ->where(
                    'user_id',
                    $user->id
                )
                ->orderBy(
                    'created_at',
                    'desc'
                )
                ->get();

        return response()->json([
            'status' => 'success',

            'user' => $user,

            'transaksi_pelatihan' =>
                $transaksiPelatihan,

            'transaksi_sertifikasi' =>
                $transaksiSertifikasi
        ]);
    }

    // ✅ UPLOAD BUKTI PELATIHAN
    public function uploadBuktiPelatihan(
        Request $request
    ) {

        $request->validate([
            'transaksi_id' =>
                'required|exists:transaksi_pelatihan,id',

            'bukti' =>
                'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $transaksi =
            TransaksiPelatihan::with(
                'pelatihan'
            )->findOrFail(
                    $request->transaksi_id
                );

        if (
            $transaksi->user_id !== Auth::id()
        ) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Transaksi tidak ditemukan'
            ], 403);
        }

        // hapus file lama
        if ($transaksi->bukti) {

            $oldPath = public_path(
                'uploads/bukti_pelatihan/' .
                $transaksi->bukti
            );

            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        // upload file
        $file = $request->file('bukti');

        $filename =
            time() .
            '_' .
            str_replace(
                ' ',
                '_',
                $file->getClientOriginalName()
            );

        $file->move(
            public_path(
                'uploads/bukti_pelatihan'
            ),
            $filename
        );

        // update database
        $transaksi->bukti = $filename;
        $transaksi->status = 'paid';

        $transaksi->save();

        // notification
        Notification::create([
            'user_id' => Auth::id(),

            'type' => 'upload_bukti',

            'title' =>
                'Bukti Pembayaran Berhasil Diupload! 📤',

            'message' =>
                "Bukti pembayaran untuk pelatihan \"{$transaksi->pelatihan->nama_pelatihan}\" telah diterima.",

            'icon' => 'fas fa-upload',

            'color' => 'info',

            'url' => '/profil',

            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',

            'message' =>
                'Bukti pembayaran pelatihan berhasil diupload',

            'file' => $filename
        ]);
    }

    // ✅ UPLOAD BUKTI SERTIFIKASI
    public function uploadBuktiSertifikasi(
        Request $request
    ) {

        $request->validate([
            'transaksi_id' =>
                'required|exists:transaksi_sertifikasi,id',

            'bukti' =>
                'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $transaksi =
            TransaksiSertifikasi::with(
                'sertifikasi'
            )->findOrFail(
                    $request->transaksi_id
                );

        if (
            $transaksi->user_id !== Auth::id()
        ) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Transaksi tidak ditemukan'
            ], 403);
        }

        // hapus file lama
        if ($transaksi->bukti) {

            $oldPath = public_path(
                'uploads/bukti_sertifikasi/' .
                $transaksi->bukti
            );

            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        // upload file
        $file = $request->file('bukti');

        $filename =
            time() .
            '_' .
            str_replace(
                ' ',
                '_',
                $file->getClientOriginalName()
            );

        $file->move(
            public_path(
                'uploads/bukti_sertifikasi'
            ),
            $filename
        );

        // update database
        $transaksi->bukti = $filename;
        $transaksi->status = 'paid';

        $transaksi->save();

        // notification
        Notification::create([
            'user_id' => Auth::id(),

            'type' => 'upload_bukti',

            'title' =>
                'Bukti Pembayaran Berhasil Diupload! 📤',

            'message' =>
                "Bukti pembayaran untuk sertifikasi \"{$transaksi->sertifikasi->nama_sertifikasi}\" telah diterima.",

            'icon' => 'fas fa-upload',

            'color' => 'info',

            'url' => '/profil',

            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',

            'message' =>
                'Bukti pembayaran sertifikasi berhasil diupload',

            'file' => $filename
        ]);
    }
}