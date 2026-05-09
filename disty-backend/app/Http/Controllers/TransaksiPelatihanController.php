<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TransaksiPelatihan;
use App\Models\Pelatihan;
use App\Models\Notification;

class TransaksiPelatihanController extends Controller
{
    public function store(Request $r)
    {
        $r->validate([
            'pelatihan_id' => 'required',
            'nama' => 'required',
            'email' => 'required|email',
            'nomor_hp' => 'required',
            'paymentMethod' => 'nullable'
        ]);

        $pelatihan = Pelatihan::findOrFail($r->pelatihan_id);

        // Tentukan metode pembayaran otomatis
        $metode = $pelatihan->kategori === 'gratis'
            ? 'gratis'
            : $r->paymentMethod;

        // Create transaksi
        $transaksi = TransaksiPelatihan::create([
            'user_id' => Auth::id(),
            'pelatihan_id' => $r->pelatihan_id,
            'nama' => $r->nama,
            'email' => $r->email,
            'nomor_hp' => $r->nomor_hp,
            'metode_pembayaran' => $metode,
            'status' => 'pending',
        ]);

        // ===== BUAT NOTIFIKASI PENDAFTARAN =====
        if ($pelatihan->kategori === 'gratis') {
            // Notifikasi untuk pelatihan gratis
            Notification::create([
                'user_id' => Auth::id(),
                'type' => 'daftar_gratis',
                'title' => 'Pendaftaran Berhasil! 🎉',
                'message' => "Anda berhasil mendaftar pelatihan \"{$pelatihan->nama_pelatihan}\". Silakan gabung ke grup WhatsApp untuk memulai belajar.",
                'icon' => 'fas fa-check-circle',
                'color' => 'success',
                'url' => route('profil'),
                'is_read' => false
            ]);
        } else {
            // Notifikasi untuk pelatihan berbayar
            Notification::create([
                'user_id' => Auth::id(),
                'type' => 'daftar_berbayar',
                'title' => 'Pendaftaran Berhasil! ✅',
                'message' => "Anda berhasil mendaftar pelatihan \"{$pelatihan->nama_pelatihan}\". Silakan selesaikan pembayaran untuk mengakses materi.",
                'icon' => 'fas fa-info-circle',
                'color' => 'warning',
                'url' => route('profil'),
                'is_read' => false
            ]);
        }

        // Return sesi sesuai kategori
        if ($pelatihan->kategori === 'gratis') {
            return back()->with('success', 'gratis|' . $pelatihan->link_grup);
        } else {
            return back()->with('success', 'berbayar');
        }
    }
}
