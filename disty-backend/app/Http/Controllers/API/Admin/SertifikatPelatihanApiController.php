<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiPelatihan;
use App\Models\Pelatihan;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class SertifikatPelatihanApiController extends Controller
{
    // ✅ LIST PESERTA
    public function index(Request $request)
    {
        $pelatihan_id = $request->get('pelatihan_id');

        $query = TransaksiPelatihan::with([
            'user',
            'pelatihan'
        ])
        ->where('status', 'approved');

        if ($pelatihan_id) {
            $query->where('pelatihan_id', $pelatihan_id);
        }

        $peserta = $query
            ->latest()
            ->paginate(20);

        $stats = [
            'total_peserta' =>
                TransaksiPelatihan::where('status', 'approved')->count(),

            'belum_sertifikat' =>
                TransaksiPelatihan::where('status', 'approved')
                    ->whereNull('sertifikat_pelatihan')
                    ->count(),

            'sudah_sertifikat' =>
                TransaksiPelatihan::where('status', 'approved')
                    ->whereNotNull('sertifikat_pelatihan')
                    ->count(),
        ];

        return response()->json([
            'status' => 'success',
            'stats' => $stats,
            'data' => $peserta
        ]);
    }

    // ✅ GENERATE 1 SERTIFIKAT
    public function generate(int $id)
    {
        $transaksi = TransaksiPelatihan::with('pelatihan')
            ->findOrFail($id);

        if ($transaksi->status !== 'approved') {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Peserta belum approved'
            ], 400);
        }

        // nomor sertifikat
        $nomorSertifikat =
            'CERT-PLT-' .
            date('Y') .
            '-' .
            str_pad($transaksi->id, 5, '0', STR_PAD_LEFT);

        // generate pdf
        $pdf = Pdf::loadView(
            'admin.sertifikat-pelatihan.template',
            [
                'nama' =>
                    $transaksi->nama,

                'pelatihan' =>
                    $transaksi->pelatihan->nama_pelatihan,

                'tanggal' =>
                    $transaksi->pelatihan->tanggal_pelatihan,

                'nomor' =>
                    $nomorSertifikat,

                'durasi' =>
                    $transaksi->pelatihan->durasi,
            ]
        );

        $pdf->setPaper('a4', 'landscape');

        // simpan file
        $filename =
            'sertifikat_' .
            $transaksi->id .
            '_' .
            time() .
            '.pdf';

        $path =
            public_path(
                'uploads/sertifikat_pelatihan/' . $filename
            );

        $pdf->save($path);

        // update db
        $transaksi->sertifikat_pelatihan = $filename;
        $transaksi->save();

        // notification
        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'sertifikat_ready',
            'title' => 'Sertifikat tersedia',
            'message' =>
                'Sertifikat pelatihan sudah tersedia',
            'icon' => 'certificate',
            'color' => 'success',
            'url' => '/profil',
            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',
            'message' =>
                'Sertifikat berhasil di-generate',
            'file' => $filename
        ]);
    }

    // ✅ GENERATE BATCH
    public function generateBatch(int $pelatihan_id)
    {
        $pelatihan =
            Pelatihan::findOrFail($pelatihan_id);

        $peserta = TransaksiPelatihan::where(
            'pelatihan_id',
            $pelatihan_id
        )
        ->where('status', 'approved')
        ->whereNull('sertifikat_pelatihan')
        ->get();

        if ($peserta->isEmpty()) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Tidak ada peserta'
            ], 400);
        }

        $generated = 0;

        foreach ($peserta as $transaksi) {

            try {

                $nomorSertifikat =
                    'CERT-PLT-' .
                    date('Y') .
                    '-' .
                    str_pad(
                        $transaksi->id,
                        5,
                        '0',
                        STR_PAD_LEFT
                    );

                $pdf = Pdf::loadView(
                    'admin.sertifikat-pelatihan.template',
                    [
                        'nama' =>
                            $transaksi->nama,

                        'pelatihan' =>
                            $pelatihan->nama_pelatihan,

                        'tanggal' =>
                            $pelatihan->tanggal_pelatihan,

                        'nomor' =>
                            $nomorSertifikat,

                        'durasi' =>
                            $pelatihan->durasi,
                    ]
                );

                $pdf->setPaper('a4', 'landscape');

                $filename =
                    'sertifikat_' .
                    $transaksi->id .
                    '_' .
                    time() .
                    '.pdf';

                $path =
                    public_path(
                        'uploads/sertifikat_pelatihan/' .
                        $filename
                    );

                $pdf->save($path);

                $transaksi->sertifikat_pelatihan =
                    $filename;

                $transaksi->save();

                $generated++;

            } catch (\Exception $e) {

                Log::error($e->getMessage());
            }
        }

        return response()->json([
            'status' => 'success',
            'generated' => $generated,
            'message' =>
                'Batch generate berhasil'
        ]);
    }

    // ✅ REGENERATE
    public function regenerate(int$id)
    {
        $transaksi = TransaksiPelatihan::findOrFail($id);

        if ($transaksi->sertifikat_pelatihan) {

            $oldPath =
                public_path(
                    'uploads/sertifikat_pelatihan/' .
                    $transaksi->sertifikat_pelatihan
                );

            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        return $this->generate($id);
    }

    // ✅ DOWNLOAD
    public function download(int $id)
    {
        $transaksi =
            TransaksiPelatihan::findOrFail($id);

        if (!$transaksi->sertifikat_pelatihan) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Sertifikat belum tersedia'
            ], 404);
        }

        $path =
            public_path(
                'uploads/sertifikat_pelatihan/' .
                $transaksi->sertifikat_pelatihan
            );

        if (!file_exists($path)) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'File tidak ditemukan'
            ], 404);
        }

        return response()->download($path);
    }
}