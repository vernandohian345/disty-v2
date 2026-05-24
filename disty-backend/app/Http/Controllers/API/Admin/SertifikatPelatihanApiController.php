<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiPelatihan;
use App\Models\Pelatihan;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

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
            ->where('status', 'completed');

        // filter pelatihan
        if ($pelatihan_id) {

            $query->where(
                'pelatihan_id',
                $pelatihan_id
            );
        }

        if ($pelatihan_id) {
            $query->where('pelatihan_id', $pelatihan_id);
        }

        $peserta = $query
            ->latest()
            ->paginate(20);

        $stats = [
            'total_peserta' =>
            TransaksiPelatihan::where('status', 'completed')->count(),

            'belum_sertifikat' =>
            TransaksiPelatihan::where('status', 'completed')
                ->whereNull('sertifikat_pelatihan')
                ->count(),

            'sudah_sertifikat' =>
            TransaksiPelatihan::where('status', 'completed')
                ->whereNotNull('sertifikat_pelatihan')
                ->count(),
        ];

        return response()->json([
            'status' => 'success',
            'stats' => $stats,
            'data' => $peserta
        ]);
    }

    // ✅ MARK COMPLETED
    public function markCompleted(int $id)
    {
        $transaksi = TransaksiPelatihan::findOrFail($id);

        // hanya peserta paid yang boleh selesai
        if ($transaksi->status !== 'paid') {

            return response()->json([
                'message' => 'Peserta belum di-approve'
            ], 400);
        }

        $transaksi->status = 'completed';

        $transaksi->save();

        return response()->json([
            'message' => 'Peserta berhasil diselesaikan'
        ]);
    }

    // ✅ GENERATE 1 SERTIFIKAT
    public function generate(int $id)
    {
        try {

            $transaksi =
                TransaksiPelatihan::with(
                    'pelatihan',
                    'user'
                )->findOrFail($id);

            $pdf = Pdf::loadView(
                'sertifikat.pelatihan',
                [
                    'transaksi' => $transaksi
                ]
            );

            $filename =
                'sertifikat-' .
                time() .
                '.pdf';

            Storage::put(
                'public/sertifikat/' . $filename,
                $pdf->output()
            );

            $transaksi->update([
                'sertifikat_pelatihan' =>
                'sertifikat/' . $filename
            ]);

            return response()->json([
                'message' =>
                'Sertifikat berhasil dibuat'
            ]);
        } catch (\Exception $e) {

            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ], 500);
        }
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
            ->where('status', 'completed')
            ->where('is_completed', true)
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

                $html = $this->generateCertificateHtml(
                    $transaksi->nama,
                    $pelatihan->nama_pelatihan,
                    $pelatihan->tanggal_pelatihan,
                    $nomorSertifikat,
                    $pelatihan->durasi
                );

                $pdf = Pdf::loadHTML($html);

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

                Notification::create([
                    'user_id' => $transaksi->user_id,
                    'type' => 'sertifikat_ready',
                    'title' => 'Sertifikat tersedia',
                    'message' => 'Sertifikat pelatihan sudah tersedia',
                    'icon' => 'certificate',
                    'color' => 'success',
                    'url' => '/profil',
                    'is_read' => false
                ]);

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
    public function regenerate(int $id)
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

    public function preview(int $id)
    {
        $peserta =
            TransaksiPelatihan::find($id);

        if (!$peserta) {

            return response()->json([
                'status' => 'error',
                'message' => 'Peserta tidak ditemukan'
            ], 404);
        }

        if (!$peserta->sertifikat_pelatihan) {

            return response()->json([
                'status' => 'error',
                'message' =>
                'Sertifikat belum tersedia'
            ], 404);
        }

        $path = public_path(
            'uploads/sertifikat_pelatihan/' .
                $peserta->sertifikat_pelatihan
        );

        if (!file_exists($path)) {

            return response()->json([
                'status' => 'error',
                'message' =>
                'File sertifikat tidak ditemukan'
            ], 404);
        }

        return response()->file($path);
    }

    // ✅ DOWNLOAD
    public function download(int $id)
    {
        $transaksi = TransaksiPelatihan::with([
            'user',
            'pelatihan'
        ])->findOrFail($id);

        if (!$transaksi->sertifikat_pelatihan) {

            return response()->json([
                'status' => 'error',
                'message' => 'Sertifikat belum tersedia'
            ], 400);
        }

        $pdf = Pdf::loadView(
            'sertifikat.pelatihan',
            [
                'transaksi' => $transaksi
            ]
        )->setPaper('a4', 'landscape');

        return $pdf->download(
            'sertifikat-pelatihan.pdf'
        );
    }



    private function generateCertificateHtml(
        string $nama,
        string $pelatihan,
        int $tanggal,
        int $nomor,
        string $durasi
    ) {

        return "
    <html>
    <head>
        <style>

            body{
                font-family: sans-serif;
                text-align:center;
                padding:40px;
                border:10px solid #f97316;
            }

            .title{
                font-size:40px;
                font-weight:bold;
                color:#f97316;
                margin-top:40px;
            }

            .subtitle{
                font-size:20px;
                margin-top:20px;
            }

            .name{
                font-size:36px;
                font-weight:bold;
                margin:30px 0;
            }

            .program{
                font-size:24px;
                color:#ea580c;
                margin-top:20px;
            }

            .footer{
                margin-top:60px;
                font-size:16px;
            }

            .nomor{
                margin-top:30px;
                font-size:14px;
                color:#666;
            }

        </style>
    </head>

    <body>

        <div class='title'>
            SERTIFIKAT PELATIHAN
        </div>

        <div class='subtitle'>
            Diberikan kepada:
        </div>

        <div class='name'>
            {$nama}
        </div>

        <div>
            Telah menyelesaikan pelatihan
        </div>

        <div class='program'>
            {$pelatihan}
        </div>

        <div class='footer'>
            Tanggal Pelatihan: {$tanggal}<br>
            Durasi: {$durasi}
        </div>

        <div class='nomor'>
            Nomor Sertifikat: {$nomor}
        </div>

    </body>
    </html>
    ";
    }
}
