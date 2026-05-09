<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiPelatihan;
use App\Models\TransaksiSertifikasi;
use App\Models\Notification;

class PembayaranController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->get('type', 'pelatihan');
        $status = $request->get('status', 'all');

        if ($type == 'pelatihan') {
            // Query hanya yang berbayar
            $query = TransaksiPelatihan::with(['user', 'pelatihan'])
                ->whereHas('pelatihan', function($q) {
                    $q->where('kategori', 'berbayar');
                });

            if ($status != 'all') {
                $query->where('status', $status);
            }

            $transaksi = $query->orderBy('created_at', 'desc')->paginate(20);

            // Stats hanya untuk berbayar
            $stats = [
                'total' => TransaksiPelatihan::whereHas('pelatihan', function($q) {
                    $q->where('kategori', 'berbayar');
                })->count(),
                'pending' => TransaksiPelatihan::where('status', 'pending')
                    ->whereHas('pelatihan', function($q) {
                        $q->where('kategori', 'berbayar');
                    })->count(),
                'paid' => TransaksiPelatihan::where('status', 'paid')
                    ->whereHas('pelatihan', function($q) {
                        $q->where('kategori', 'berbayar');
                    })->count(),
                'approved' => TransaksiPelatihan::where('status', 'approved')
                    ->whereHas('pelatihan', function($q) {
                        $q->where('kategori', 'berbayar');
                    })->count(),
            ];
        } else {
            // Query hanya yang berbayar
            $query = TransaksiSertifikasi::with(['user', 'sertifikasi'])
                ->whereHas('sertifikasi', function($q) {
                    $q->where('kategori', 'berbayar');
                });

            if ($status != 'all') {
                $query->where('status', $status);
            }

            $transaksi = $query->orderBy('created_at', 'desc')->paginate(20);

            // Stats hanya untuk berbayar
            $stats = [
                'total' => TransaksiSertifikasi::whereHas('sertifikasi', function($q) {
                    $q->where('kategori', 'berbayar');
                })->count(),
                'pending' => TransaksiSertifikasi::where('status', 'pending')
                    ->whereHas('sertifikasi', function($q) {
                        $q->where('kategori', 'berbayar');
                    })->count(),
                'paid' => TransaksiSertifikasi::where('status', 'paid')
                    ->whereHas('sertifikasi', function($q) {
                        $q->where('kategori', 'berbayar');
                    })->count(),
                'approved' => TransaksiSertifikasi::where('status', 'approved')
                    ->whereHas('sertifikasi', function($q) {
                        $q->where('kategori', 'berbayar');
                    })->count(),
            ];
        }

        return view('admin.pembayaran.index', compact('transaksi', 'stats', 'type', 'status'));
    }

    public function approvePelatihan($id)
    {
        $transaksi = TransaksiPelatihan::with('pelatihan')->findOrFail($id);

        $transaksi->status = 'approved';
        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'pembayaran_approved',
            'title' => 'Pembayaran Disetujui! 🎉',
            'message' => "Pembayaran untuk pelatihan \"{$transaksi->pelatihan->nama_pelatihan}\" telah disetujui. Anda sekarang dapat mengakses materi dan bergabung ke grup.",
            'icon' => 'fas fa-check-circle',
            'color' => 'success',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Pembayaran berhasil disetujui dan notifikasi telah dikirim ke user.');
    }

    public function approveSertifikasi($id)
    {
        $transaksi = TransaksiSertifikasi::with('sertifikasi')->findOrFail($id);

        $transaksi->status = 'approved';
        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'pembayaran_approved',
            'title' => 'Pembayaran Disetujui! 🎉',
            'message' => "Pembayaran untuk sertifikasi \"{$transaksi->sertifikasi->nama_sertifikasi}\" telah disetujui. Anda sekarang dapat mengakses materi dan bergabung ke grup.",
            'icon' => 'fas fa-check-circle',
            'color' => 'success',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Pembayaran berhasil disetujui dan notifikasi telah dikirim ke user.');
    }

    public function rejectPelatihan($id)
    {
        $transaksi = TransaksiPelatihan::with('pelatihan')->findOrFail($id);

        // Hapus file bukti
        if ($transaksi->bukti) {
            $buktiPath = public_path('uploads/bukti_pelatihan/' . $transaksi->bukti);
            if (file_exists($buktiPath)) {
                unlink($buktiPath);
            }
        }

        $transaksi->status = 'pending';
        $transaksi->bukti = null;
        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'pembayaran_rejected',
            'title' => 'Pembayaran Ditolak ❌',
            'message' => "Bukti pembayaran untuk pelatihan \"{$transaksi->pelatihan->nama_pelatihan}\" ditolak. Silakan upload bukti pembayaran yang benar.",
            'icon' => 'fas fa-times-circle',
            'color' => 'danger',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Pembayaran ditolak dan notifikasi telah dikirim ke user.');
    }

    public function rejectSertifikasi($id)
    {
        $transaksi = TransaksiSertifikasi::with('sertifikasi')->findOrFail($id);

        // Hapus file bukti
        if ($transaksi->bukti) {
            $buktiPath = public_path('uploads/bukti_sertifikasi/' . $transaksi->bukti);
            if (file_exists($buktiPath)) {
                unlink($buktiPath);
            }
        }

        $transaksi->status = 'pending';
        $transaksi->bukti = null;
        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'pembayaran_rejected',
            'title' => 'Pembayaran Ditolak ❌',
            'message' => "Bukti pembayaran untuk sertifikasi \"{$transaksi->sertifikasi->nama_sertifikasi}\" ditolak. Silakan upload bukti pembayaran yang benar.",
            'icon' => 'fas fa-times-circle',
            'color' => 'danger',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Pembayaran ditolak dan notifikasi telah dikirim ke user.');
    }
}
