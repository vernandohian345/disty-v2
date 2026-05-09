<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiPelatihan;
use App\Models\Pelatihan;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class SertifikatPelatihanController extends Controller
{
    // Halaman list peserta pelatihan
    public function index(Request $request)
    {
        $pelatihan_id = $request->get('pelatihan_id');

        // Get all pelatihan for filter
        $pelatihanList = Pelatihan::orderBy('nama_pelatihan')->get();

        // Query peserta
        $query = TransaksiPelatihan::with(['user', 'pelatihan'])
            ->where('status', 'approved'); // Hanya yang sudah approved

        if ($pelatihan_id) {
            $query->where('pelatihan_id', $pelatihan_id);
        }

        $peserta = $query->orderBy('created_at', 'desc')->paginate(20);

        // Stats
        $stats = [
            'total_peserta' => TransaksiPelatihan::where('status', 'approved')->count(),
            'belum_sertifikat' => TransaksiPelatihan::where('status', 'approved')
                ->whereNull('sertifikat_pelatihan')->count(),
            'sudah_sertifikat' => TransaksiPelatihan::where('status', 'approved')
                ->whereNotNull('sertifikat_pelatihan')->count(),
        ];

        return view('admin.sertifikat-pelatihan.index', compact('peserta', 'pelatihanList', 'stats', 'pelatihan_id'));
    }

    // Generate sertifikat untuk 1 peserta
    public function generate($id)
    {
        $transaksi = TransaksiPelatihan::with('pelatihan')->findOrFail($id);

        // Cek apakah sudah approved
        if ($transaksi->status !== 'approved') {
            return back()->with('error', 'Peserta belum disetujui. Setujui pembayaran terlebih dahulu.');
        }

        // Generate nomor sertifikat
        $nomorSertifikat = 'CERT-PLT-' . date('Y') . '-' . str_pad($transaksi->id, 5, '0', STR_PAD_LEFT);

        // Generate PDF
        $pdf = Pdf::loadView('admin.sertifikat-pelatihan.template', [
            'nama' => $transaksi->nama,
            'pelatihan' => $transaksi->pelatihan->nama_pelatihan,
            'tanggal' => $transaksi->pelatihan->tanggal_pelatihan,
            'nomor' => $nomorSertifikat,
            'durasi' => $transaksi->pelatihan->durasi,
        ]);

        $pdf->setPaper('a4', 'landscape');

        // Simpan ke folder
        $filename = 'sertifikat_' . $transaksi->id . '_' . time() . '.pdf';
        $path = public_path('uploads/sertifikat_pelatihan/' . $filename);
        $pdf->save($path);

        // Update database
        $transaksi->sertifikat_pelatihan = $filename;
        $transaksi->save();

        // Kirim notifikasi ke user
        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'sertifikat_ready',
            'title' => 'Sertifikat Sudah Tersedia! 🎉',
            'message' => "Selamat! Sertifikat untuk pelatihan \"{$transaksi->pelatihan->nama_pelatihan}\" sudah tersedia. Anda dapat mengunduhnya sekarang.",
            'icon' => 'fas fa-certificate',
            'color' => 'success',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Sertifikat berhasil di-generate untuk ' . $transaksi->nama);
    }

    // Generate sertifikat untuk semua peserta 1 pelatihan
    public function generateBatch($pelatihan_id)
    {
        $pelatihan = Pelatihan::findOrFail($pelatihan_id);

        $peserta = TransaksiPelatihan::where('pelatihan_id', $pelatihan_id)
            ->where('status', 'approved')
            ->whereNull('sertifikat_pelatihan') // Hanya yang belum punya sertifikat
            ->get();

        if ($peserta->isEmpty()) {
            return back()->with('error', 'Tidak ada peserta yang perlu di-generate sertifikat.');
        }

        $generated = 0;

        foreach ($peserta as $transaksi) {
            try {
                // Generate nomor sertifikat
                $nomorSertifikat = 'CERT-PLT-' . date('Y') . '-' . str_pad($transaksi->id, 5, '0', STR_PAD_LEFT);

                // Generate PDF
                $pdf = Pdf::loadView('admin.sertifikat-pelatihan.template', [
                    'nama' => $transaksi->nama,
                    'pelatihan' => $pelatihan->nama_pelatihan,
                    'tanggal' => $pelatihan->tanggal_pelatihan,
                    'nomor' => $nomorSertifikat,
                    'durasi' => $pelatihan->durasi,
                ]);

                $pdf->setPaper('a4', 'landscape');

                // Simpan ke folder
                $filename = 'sertifikat_' . $transaksi->id . '_' . time() . '.pdf';
                $path = public_path('uploads/sertifikat_pelatihan/' . $filename);
                $pdf->save($path);

                // Update database
                $transaksi->sertifikat_pelatihan = $filename;
                $transaksi->save();

                // Kirim notifikasi
                Notification::create([
                    'user_id' => $transaksi->user_id,
                    'type' => 'sertifikat_ready',
                    'title' => 'Sertifikat Sudah Tersedia! 🎉',
                    'message' => "Selamat! Sertifikat untuk pelatihan \"{$pelatihan->nama_pelatihan}\" sudah tersedia. Anda dapat mengunduhnya sekarang.",
                    'icon' => 'fas fa-certificate',
                    'color' => 'success',
                    'url' => route('profil'),
                    'is_read' => false
                ]);

                $generated++;

            } catch (\Exception $e) {
                Log::error('Error generate sertifikat: ' . $e->getMessage());
            }
        }

        return back()->with('success', "Berhasil generate {$generated} sertifikat untuk pelatihan {$pelatihan->nama_pelatihan}");
    }

    // Regenerate sertifikat (jika ada perubahan)
    public function regenerate($id)
    {
        $transaksi = TransaksiPelatihan::with('pelatihan')->findOrFail($id);

        // Hapus file lama
        if ($transaksi->sertifikat_pelatihan) {
            $oldPath = public_path('uploads/sertifikat_pelatihan/' . $transaksi->sertifikat_pelatihan);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        // Generate ulang
        return $this->generate($id);
    }

    // Download sertifikat
    public function download($id)
    {
        $transaksi = TransaksiPelatihan::findOrFail($id);

        if (!$transaksi->sertifikat_pelatihan) {
            return back()->with('error', 'Sertifikat belum tersedia.');
        }

        $path = public_path('uploads/sertifikat_pelatihan/' . $transaksi->sertifikat_pelatihan);

        if (!file_exists($path)) {
            return back()->with('error', 'File sertifikat tidak ditemukan.');
        }

        return response()->download($path);
    }
}
