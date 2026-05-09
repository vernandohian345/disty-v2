<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TransaksiPelatihan;
use App\Models\TransaksiSertifikasi;
use App\Models\Notification;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $transaksiPelatihan = TransaksiPelatihan::with('pelatihan')
                                ->where('user_id', $user->id)
                                ->orderBy('created_at', 'desc')
                                ->get();

        $transaksiSertifikasi = TransaksiSertifikasi::with('sertifikasi')
                                ->where('user_id', $user->id)
                                ->orderBy('created_at', 'desc')
                                ->get();

        return view('frontend.profil', compact('user', 'transaksiPelatihan', 'transaksiSertifikasi'));
    }

    // Upload bukti PELATIHAN
    public function uploadBuktiPelatihan(Request $request)
    {
        $request->validate([
            'transaksi_id' => 'required|exists:transaksi_pelatihan,id',
            'bukti' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $transaksi = TransaksiPelatihan::with('pelatihan')->findOrFail($request->transaksi_id);

        if ($transaksi->user_id !== Auth::id()) {
            return back()->with('error', 'Transaksi tidak ditemukan');
        }

        if (!$request->hasFile('bukti')) {
            return back()->with('error', 'File tidak ditemukan');
        }

        // Hapus file lama
        if ($transaksi->bukti) {
            $oldPath = public_path('uploads/bukti_pelatihan/' . $transaksi->bukti);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        // Upload file baru
        $file = $request->file('bukti');
        $filename = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads/bukti_pelatihan'), $filename);

        // Update database
        $transaksi->bukti = $filename;
        $transaksi->status = 'paid';
        $transaksi->save();

        // ===== BUAT NOTIFIKASI UPLOAD BUKTI =====
        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'upload_bukti',
            'title' => 'Bukti Pembayaran Berhasil Diupload! 📤',
            'message' => "Bukti pembayaran untuk pelatihan \"{$transaksi->pelatihan->nama_pelatihan}\" telah diterima. Menunggu verifikasi admin.",
            'icon' => 'fas fa-upload',
            'color' => 'info',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Bukti pembayaran pelatihan berhasil diupload! Menunggu verifikasi admin.');
    }

    // Upload bukti SERTIFIKASI
    public function uploadBuktiSertifikasi(Request $request)
    {
        $request->validate([
            'transaksi_id' => 'required|exists:transaksi_sertifikasi,id',
            'bukti' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $transaksi = TransaksiSertifikasi::with('sertifikasi')->findOrFail($request->transaksi_id);

        if ($transaksi->user_id !== Auth::id()) {
            return back()->with('error', 'Transaksi tidak ditemukan');
        }

        if (!$request->hasFile('bukti')) {
            return back()->with('error', 'File tidak ditemukan');
        }

        // Hapus file lama
        if ($transaksi->bukti) {
            $oldPath = public_path('uploads/bukti_sertifikasi/' . $transaksi->bukti);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        // Upload file baru
        $file = $request->file('bukti');
        $filename = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads/bukti_sertifikasi'), $filename);

        // Update database
        $transaksi->bukti = $filename;
        $transaksi->status = 'paid';
        $transaksi->save();

        // ===== BUAT NOTIFIKASI UPLOAD BUKTI =====
        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'upload_bukti',
            'title' => 'Bukti Pembayaran Berhasil Diupload! 📤',
            'message' => "Bukti pembayaran untuk sertifikasi \"{$transaksi->sertifikasi->nama_sertifikasi}\" telah diterima. Menunggu verifikasi admin.",
            'icon' => 'fas fa-upload',
            'color' => 'info',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Bukti pembayaran sertifikasi berhasil diupload! Menunggu verifikasi admin.');
    }
}
