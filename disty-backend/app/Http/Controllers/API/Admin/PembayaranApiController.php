<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiPelatihan;
use App\Models\TransaksiSertifikasi;
use App\Models\Notification;

class PembayaranApiController extends Controller
{
    // ✅ LIST PEMBAYARAN
    public function index(Request $request)
    {
        $type = $request->get('type', 'pelatihan');
        $status = $request->get('status', 'all');

        if ($type == 'pelatihan') {

            $query = TransaksiPelatihan::with(['user', 'pelatihan'])
                ->whereHas('pelatihan', function ($q) {
                    $q->where('kategori', 'berbayar');
                });

            if ($status != 'all') {
                $query->where('status', $status);
            }

            $transaksi = $query
                ->latest()
                ->paginate(20);

            $stats = [
                'total' => TransaksiPelatihan::count(),

                'pending' =>
                    TransaksiPelatihan::where('status', 'pending')->count(),

                'paid' =>
                    TransaksiPelatihan::where('status', 'paid')->count(),

                'completed' =>
                    TransaksiPelatihan::where('status', 'completed')->count(),
            ];

        } else {

            $query = TransaksiSertifikasi::with(['user', 'sertifikasi'])
                ->whereHas('sertifikasi', function ($q) {
                    $q->where('kategori', 'berbayar');
                });

            if ($status != 'all') {
                $query->where('status', $status);
            }

            $transaksi = $query
                ->latest()
                ->paginate(20);

            $stats = [
                'total' => TransaksiSertifikasi::count(),

                'pending' =>
                    TransaksiSertifikasi::where('status', 'pending')->count(),

                'paid' =>
                    TransaksiSertifikasi::where('status', 'paid')->count(),

                'completed' =>
                    TransaksiSertifikasi::where('status', 'completed')->count(),
            ];
        }

        return response()->json([
            'status' => 'success',
            'type' => $type,
            'stats' => $stats,
            'data' => $transaksi
        ]);
    }

    // ✅ APPROVE PELATIHAN
    public function approvePelatihan(int $id)
    {
        $transaksi = TransaksiPelatihan::with('pelatihan')
            ->findOrFail($id);

        $transaksi->status = 'completed';
        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'pembayaran_completed',
            'title' => 'Pembayaran Disetujui',
            'message' =>
                "Pembayaran pelatihan {$transaksi->pelatihan->nama_pelatihan} disetujui",
            'icon' => 'success',
            'color' => 'success',
            'url' => '/profil',
            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pembayaran pelatihan berhasil disetujui'
        ]);
    }

    // ✅ APPROVE SERTIFIKASI
    public function approveSertifikasi(int $id)
    {
        $transaksi = TransaksiSertifikasi::with('sertifikasi')
            ->findOrFail($id);

        $transaksi->status = 'completed';
        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'pembayaran_completed',
            'title' => 'Pembayaran Disetujui',
            'message' =>
                "Pembayaran sertifikasi {$transaksi->sertifikasi->nama_sertifikasi} disetujui",
            'icon' => 'success',
            'color' => 'success',
            'url' => '/profil',
            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pembayaran sertifikasi berhasil disetujui'
        ]);
    }

    // ✅ REJECT PELATIHAN
    public function rejectPelatihan(int $id)
    {
        $transaksi = TransaksiPelatihan::with('pelatihan')
            ->findOrFail($id);

        // hapus bukti
        if ($transaksi->bukti) {

            $path = public_path(
                'uploads/bukti_pelatihan/' . $transaksi->bukti
            );

            if (file_exists($path)) {
                unlink($path);
            }
        }

        $transaksi->status = 'pending';
        $transaksi->bukti = null;
        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'pembayaran_rejected',
            'title' => 'Pembayaran Ditolak',
            'message' =>
                "Pembayaran pelatihan {$transaksi->pelatihan->nama_pelatihan} ditolak",
            'icon' => 'danger',
            'color' => 'danger',
            'url' => '/profil',
            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pembayaran pelatihan ditolak'
        ]);
    }

    // ✅ REJECT SERTIFIKASI
    public function rejectSertifikasi(int $id)
    {
        $transaksi = TransaksiSertifikasi::with('sertifikasi')
            ->findOrFail($id);

        // hapus bukti
        if ($transaksi->bukti) {

            $path = public_path(
                'uploads/bukti_sertifikasi/' . $transaksi->bukti
            );

            if (file_exists($path)) {
                unlink($path);
            }
        }

        $transaksi->status = 'pending';
        $transaksi->bukti = null;
        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'pembayaran_rejected',
            'title' => 'Pembayaran Ditolak',
            'message' =>
                "Pembayaran sertifikasi {$transaksi->sertifikasi->nama_sertifikasi} ditolak",
            'icon' => 'danger',
            'color' => 'danger',
            'url' => '/profil',
            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pembayaran sertifikasi ditolak'
        ]);
    }
}