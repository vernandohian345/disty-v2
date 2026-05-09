<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TransaksiSertifikasi;
use App\Models\Sertifikasi;
use App\Models\Notification;

class TransaksiSertifikasiController extends Controller
{
    public function store(Request $r)
    {
        $r->validate([
            'sertifikasi_id' => 'required',
            'nama' => 'required',
            'email' => 'required|email',
            'nomor_hp' => 'required',
            'paymentMethod' => 'nullable'
        ]);

        $sertifikasi = Sertifikasi::findOrFail($r->sertifikasi_id);

        $metode = $sertifikasi->kategori === 'gratis'
            ? 'gratis'
            : $r->paymentMethod;

        $transaksi = TransaksiSertifikasi::create([
            'user_id' => Auth::id(),
            'sertifikasi_id' => $r->sertifikasi_id,
            'nama' => $r->nama,
            'email' => $r->email,
            'nomor_hp' => $r->nomor_hp,
            'metode_pembayaran' => $metode,
            'status' => 'pending',
        ]);

        // ===== BUAT NOTIFIKASI PENDAFTARAN =====
        if ($sertifikasi->kategori === 'gratis') {
            Notification::create([
                'user_id' => Auth::id(),
                'type' => 'daftar_gratis',
                'title' => 'Pendaftaran Sertifikasi Berhasil! 🎉',
                'message' => "Anda berhasil mendaftar sertifikasi \"{$sertifikasi->nama_sertifikasi}\". Silakan gabung ke grup WhatsApp.",
                'icon' => 'fas fa-check-circle',
                'color' => 'success',
                'url' => route('profil'),
                'is_read' => false
            ]);
        } else {
            Notification::create([
                'user_id' => Auth::id(),
                'type' => 'daftar_berbayar',
                'title' => 'Pendaftaran Sertifikasi Berhasil! ✅',
                'message' => "Anda berhasil mendaftar sertifikasi \"{$sertifikasi->nama_sertifikasi}\". Silakan selesaikan pembayaran.",
                'icon' => 'fas fa-info-circle',
                'color' => 'warning',
                'url' => route('profil'),
                'is_read' => false
            ]);
        }

        if ($sertifikasi->kategori === 'gratis') {
            return back()->with('success', 'gratis|' . $sertifikasi->link_grup);
        } else {
            return back()->with('success', 'berbayar');
        }
    }
}
