<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiSertifikasi;
use App\Models\Sertifikasi;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class SertifikatSertifikasiController extends Controller
{
    // Halaman list peserta sertifikasi
    public function index(Request $request)
    {
        $sertifikasi_id = $request->get('sertifikasi_id');
        $tab = $request->get('tab', 'internal'); // internal atau bnsp

        // Get all sertifikasi for filter
        $sertifikasiList = Sertifikasi::orderBy('nama_sertifikasi')->get();

        // Query peserta
        $query = TransaksiSertifikasi::with(['user', 'sertifikasi'])
            ->where('status', 'approved'); // Hanya yang sudah approved

        if ($sertifikasi_id) {
            $query->where('sertifikasi_id', $sertifikasi_id);
        }

        $peserta = $query->orderBy('created_at', 'desc')->paginate(20);

        // Stats
        $stats = [
            'total_peserta' => TransaksiSertifikasi::where('status', 'approved')->count(),
            'belum_sertifikat_internal' => TransaksiSertifikasi::where('status', 'approved')
                ->whereNull('sertifikat_internal')->count(),
            'sudah_sertifikat_internal' => TransaksiSertifikasi::where('status', 'approved')
                ->whereNotNull('sertifikat_internal')->count(),
            'belum_sertifikat_bnsp' => TransaksiSertifikasi::where('status', 'approved')
                ->whereNull('sertifikat_bnsp')->count(),
            'sudah_sertifikat_bnsp' => TransaksiSertifikasi::where('status', 'approved')
                ->whereNotNull('sertifikat_bnsp')->count(),
        ];

        return view('admin.sertifikat-sertifikasi.index', compact('peserta', 'sertifikasiList', 'stats', 'sertifikasi_id', 'tab'));
    }

    // Generate sertifikat internal untuk 1 peserta
    public function generate(int $id)
    {
        $transaksi = TransaksiSertifikasi::with('sertifikasi')->findOrFail($id);

        // Cek apakah sudah approved
        if ($transaksi->status !== 'approved') {
            return back()->with('error', 'Peserta belum disetujui. Setujui pembayaran terlebih dahulu.');
        }

        // Cek apakah sudah ada sertifikat internal
        if ($transaksi->sertifikat_internal) {
            return back()->with('error', 'Sertifikat internal sudah di-generate sebelumnya.');
        }

        // Generate nomor sertifikat
        $nomorSertifikat = 'CERT-SRT-' . date('Y') . '-' . str_pad($transaksi->id, 5, '0', STR_PAD_LEFT);

        // Generate PDF
        $pdf = Pdf::loadView('admin.sertifikat-sertifikasi.template-internal', [
            'nama' => $transaksi->nama,
            'sertifikasi' => $transaksi->sertifikasi->nama_sertifikasi,
            'tanggal' => $transaksi->sertifikasi->tanggal_sertifikasi,
            'nomor' => $nomorSertifikat,
            'durasi' => $transaksi->sertifikasi->durasi ?? null,
            'bidang' => $transaksi->sertifikasi->bidang ?? null,
        ]);

        $pdf->setPaper('a4', 'landscape');

        // Simpan ke folder
        $filename = 'sertifikat_internal_' . $transaksi->id . '_' . time() . '.pdf';
        $path = public_path('uploads/sertifikat_internal/' . $filename);

        // Pastikan folder exists
        if (!file_exists(public_path('uploads/sertifikat_internal'))) {
            mkdir(public_path('uploads/sertifikat_internal'), 0755, true);
        }

        $pdf->save($path);

        // Update kolom sertifikat_internal
        $transaksi->sertifikat_internal = $filename;
        $transaksi->save();

        // Kirim notifikasi ke user
        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'sertifikat_ready',
            'title' => 'Sertifikat Internal Sudah Tersedia! 🎉',
            'message' => "Selamat! Sertifikat internal untuk sertifikasi \"{$transaksi->sertifikasi->nama_sertifikasi}\" sudah tersedia. Anda dapat mengunduhnya sekarang.",
            'icon' => 'fas fa-certificate',
            'color' => 'success',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Sertifikat internal berhasil di-generate untuk ' . $transaksi->nama);
    }

    // Generate sertifikat internal untuk semua peserta 1 sertifikasi
    public function generateBatch(int $sertifikasi_id)
    {
        $sertifikasi = Sertifikasi::findOrFail($sertifikasi_id);

        $peserta = TransaksiSertifikasi::where('sertifikasi_id', $sertifikasi_id)
            ->where('status', 'approved')
            ->whereNull('sertifikat_internal') // Hanya yang belum punya sertifikat internal
            ->get();

        if ($peserta->isEmpty()) {
            return back()->with('error', 'Tidak ada peserta yang perlu di-generate sertifikat.');
        }

        $generated = 0;

        foreach ($peserta as $transaksi) {
            try {
                // Generate nomor sertifikat
                $nomorSertifikat = 'CERT-SRT-' . date('Y') . '-' . str_pad($transaksi->id, 5, '0', STR_PAD_LEFT);

                // Generate PDF
                $pdf = Pdf::loadView('admin.sertifikat-sertifikasi.template-internal', [
                    'nama' => $transaksi->nama,
                    'sertifikasi' => $sertifikasi->nama_sertifikasi,
                    'tanggal' => $sertifikasi->tanggal_sertifikasi,
                    'nomor' => $nomorSertifikat,
                    'durasi' => $sertifikasi->durasi ?? null,
                    'bidang' => $sertifikasi->bidang ?? null,
                ]);

                $pdf->setPaper('a4', 'landscape');

                // Simpan ke folder
                $filename = 'sertifikat_internal_' . $transaksi->id . '_' . time() . '.pdf';
                $path = public_path('uploads/sertifikat_internal/' . $filename);

                // Pastikan folder exists
                if (!file_exists(public_path('uploads/sertifikat_internal'))) {
                    mkdir(public_path('uploads/sertifikat_internal'), 0755, true);
                }

                $pdf->save($path);

                // Update kolom sertifikat_internal
                $transaksi->sertifikat_internal = $filename;
                $transaksi->save();

                // Kirim notifikasi
                Notification::create([
                    'user_id' => $transaksi->user_id,
                    'type' => 'sertifikat_ready',
                    'title' => 'Sertifikat Internal Sudah Tersedia! 🎉',
                    'message' => "Selamat! Sertifikat internal untuk sertifikasi \"{$sertifikasi->nama_sertifikasi}\" sudah tersedia. Anda dapat mengunduhnya sekarang.",
                    'icon' => 'fas fa-certificate',
                    'color' => 'success',
                    'url' => route('profil'),
                    'is_read' => false
                ]);

                $generated++;

            } catch (\Exception $e) {
                Log::error('Error generate sertifikat internal: ' . $e->getMessage());
            }
        }

        return back()->with('success', "Berhasil generate {$generated} sertifikat internal untuk sertifikasi {$sertifikasi->nama_sertifikasi}");
    }

    // Regenerate sertifikat internal (jika ada perubahan)
    public function regenerate(int $id)
    {
        $transaksi = TransaksiSertifikasi::with('sertifikasi')->findOrFail($id);

        if (!$transaksi->sertifikat_internal) {
            return back()->with('error', 'Sertifikat internal belum pernah di-generate.');
        }

        // Hapus file lama
        $oldPath = public_path('uploads/sertifikat_internal/' . $transaksi->sertifikat_internal);
        if (file_exists($oldPath)) {
            unlink($oldPath);
        }

        // Reset kolom
        $transaksi->sertifikat_internal = null;
        $transaksi->save();

        // Generate ulang
        return $this->generate($id);
    }

    // Download sertifikat internal
    public function download(int $id)
    {
        $transaksi = TransaksiSertifikasi::findOrFail($id);

        if (!$transaksi->sertifikat_internal) {
            return back()->with('error', 'Sertifikat internal belum tersedia.');
        }

        $path = public_path('uploads/sertifikat_internal/' . $transaksi->sertifikat_internal);

        if (!file_exists($path)) {
            return back()->with('error', 'File sertifikat tidak ditemukan.');
        }

        return response()->download($path);
    }

    // ==================== SERTIFIKAT BNSP ====================

    // Upload sertifikat BNSP untuk 1 peserta
    public function uploadBnsp(Request $request, int $id)
    {
        $request->validate([
            'file_bnsp' => 'required|file|mimes:pdf|max:5120', // max 5MB
        ], [
            'file_bnsp.required' => 'File sertifikat BNSP wajib diupload',
            'file_bnsp.mimes' => 'File harus berformat PDF',
            'file_bnsp.max' => 'Ukuran file maksimal 5MB',
        ]);

        $transaksi = TransaksiSertifikasi::with('sertifikasi')->findOrFail($id);

        // Cek apakah sudah approved
        if ($transaksi->status !== 'approved') {
            return back()->with('error', 'Peserta belum disetujui.');
        }

        // Cek apakah sudah ada sertifikat BNSP
        if ($transaksi->sertifikat_bnsp) {
            return back()->with('error', 'Sertifikat BNSP sudah diupload sebelumnya. Gunakan fitur update jika ingin mengubah.');
        }

        // Upload file
        $file = $request->file('file_bnsp');
        $filename = 'bnsp_' . $transaksi->id . '_' . time() . '.pdf';

        // Pastikan folder exists
        if (!file_exists(public_path('uploads/sertifikat_bnsp'))) {
            mkdir(public_path('uploads/sertifikat_bnsp'), 0755, true);
        }

        $file->move(public_path('uploads/sertifikat_bnsp'), $filename);

        // Update kolom sertifikat_bnsp
        $transaksi->sertifikat_bnsp = $filename;
        $transaksi->save();

        // Kirim notifikasi ke user
        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'sertifikat_bnsp_ready',
            'title' => 'Sertifikat BNSP Sudah Tersedia! 🏆',
            'message' => "Selamat! Sertifikat BNSP untuk sertifikasi \"{$transaksi->sertifikasi->nama_sertifikasi}\" sudah diupload. Anda dapat mengunduhnya sekarang.",
            'icon' => 'fas fa-award',
            'color' => 'warning',
            'url' => route('profil'),
            'is_read' => false
        ]);

        return back()->with('success', 'Sertifikat BNSP berhasil diupload untuk ' . $transaksi->nama);
    }

    // Update sertifikat BNSP
    public function updateBnsp(Request $request, int $id)
    {
        $request->validate([
            'file_bnsp' => 'required|file|mimes:pdf|max:5120',
        ]);

        $transaksi = TransaksiSertifikasi::findOrFail($id);

        if (!$transaksi->sertifikat_bnsp) {
            return back()->with('error', 'Sertifikat BNSP belum pernah diupload.');
        }

        // Hapus file lama
        $oldPath = public_path('uploads/sertifikat_bnsp/' . $transaksi->sertifikat_bnsp);
        if (file_exists($oldPath)) {
            unlink($oldPath);
        }

        // Upload file baru
        $file = $request->file('file_bnsp');
        $filename = 'bnsp_' . $transaksi->id . '_' . time() . '.pdf';
        $file->move(public_path('uploads/sertifikat_bnsp'), $filename);

        // Update database
        $transaksi->sertifikat_bnsp = $filename;
        $transaksi->save();

        return back()->with('success', 'Sertifikat BNSP berhasil diupdate');
    }

    // Download sertifikat BNSP
    public function downloadBnsp(int $id)
    {
        $transaksi = TransaksiSertifikasi::findOrFail($id);

        if (!$transaksi->sertifikat_bnsp) {
            return back()->with('error', 'Sertifikat BNSP belum tersedia.');
        }

        $path = public_path('uploads/sertifikat_bnsp/' . $transaksi->sertifikat_bnsp);

        if (!file_exists($path)) {
            return back()->with('error', 'File sertifikat BNSP tidak ditemukan.');
        }

        return response()->download($path);
    }

    // Delete sertifikat BNSP
    public function deleteBnsp(int $id)
    {
        $transaksi = TransaksiSertifikasi::findOrFail($id);

        if (!$transaksi->sertifikat_bnsp) {
            return back()->with('error', 'Tidak ada sertifikat BNSP yang bisa dihapus.');
        }

        // Hapus file
        $path = public_path('uploads/sertifikat_bnsp/' . $transaksi->sertifikat_bnsp);
        if (file_exists($path)) {
            unlink($path);
        }

        // Reset kolom
        $transaksi->sertifikat_bnsp = null;
        $transaksi->save();

        return back()->with('success', 'Sertifikat BNSP berhasil dihapus');
    }
}
