<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiSertifikasi;
use App\Models\Sertifikasi;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class SertifikatSertifikasiApiController extends Controller
{
    // ✅ LIST PESERTA

    public function show(int $id)
    {
        $sertifikasi = Sertifikasi::findOrFail($id);

        return response()->json($sertifikasi);
    }

    public function index(Request $request)
    {
        $sertifikasi_id = $request->get('sertifikasi_id');

        $query = TransaksiSertifikasi::with([
            'user',
            'sertifikasi'
        ])->where('status', 'approved');

        if ($sertifikasi_id) {
            $query->where('sertifikasi_id', $sertifikasi_id);
        }

        $peserta = $query
            ->latest()
            ->paginate(20);

        $stats = [
            'total_peserta' =>
                TransaksiSertifikasi::where(
                    'status',
                    'approved'
                )->count(),

            'belum_sertifikat_internal' =>
                TransaksiSertifikasi::where(
                    'status',
                    'approved'
                )
                ->whereNull('sertifikat_internal')
                ->count(),

            'sudah_sertifikat_internal' =>
                TransaksiSertifikasi::where(
                    'status',
                    'approved'
                )
                ->whereNotNull('sertifikat_internal')
                ->count(),

            'belum_sertifikat_bnsp' =>
                TransaksiSertifikasi::where(
                    'status',
                    'approved'
                )
                ->whereNull('sertifikat_bnsp')
                ->count(),

            'sudah_sertifikat_bnsp' =>
                TransaksiSertifikasi::where(
                    'status',
                    'approved'
                )
                ->whereNotNull('sertifikat_bnsp')
                ->count(),
        ];

        return response()->json([
            'status' => 'success',
            'stats' => $stats,
            'data' => $peserta
        ]);
    }

    // ✅ GENERATE INTERNAL
    public function generate(int $id)
    {
        $transaksi = TransaksiSertifikasi::with(
            'sertifikasi'
        )->findOrFail($id);

        if ($transaksi->status !== 'approved') {

            return response()->json([
                'status' => 'error',
                'message' => 'Peserta belum approved'
            ], 400);
        }

        if ($transaksi->sertifikat_internal) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Sertifikat internal sudah ada'
            ], 400);
        }

        $nomorSertifikat =
            'CERT-SRT-' .
            date('Y') .
            '-' .
            str_pad(
                $transaksi->id,
                5,
                '0',
                STR_PAD_LEFT
            );

        $pdf = Pdf::loadView(
            'admin.sertifikat-sertifikasi.template-internal',
            [
                'nama' =>
                    $transaksi->nama,

                'sertifikasi' =>
                    $transaksi
                        ->sertifikasi
                        ->nama_sertifikasi,

                'tanggal' =>
                    $transaksi
                        ->sertifikasi
                        ->tanggal_sertifikasi,

                'nomor' =>
                    $nomorSertifikat,

                'durasi' =>
                    $transaksi
                        ->sertifikasi
                        ->durasi,

                'bidang' =>
                    $transaksi
                        ->sertifikasi
                        ->bidang,
            ]
        );

        $pdf->setPaper('a4', 'landscape');

        // buat folder jika belum ada
        if (
            !file_exists(
                public_path(
                    'uploads/sertifikat_internal'
                )
            )
        ) {
            mkdir(
                public_path(
                    'uploads/sertifikat_internal'
                ),
                0755,
                true
            );
        }

        $filename =
            'sertifikat_internal_' .
            $transaksi->id .
            '_' .
            time() .
            '.pdf';

        $path =
            public_path(
                'uploads/sertifikat_internal/' .
                $filename
            );

        $pdf->save($path);

        // simpan database
        $transaksi->sertifikat_internal =
            $filename;

        $transaksi->save();

        // notification
        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'sertifikat_ready',
            'title' => 'Sertifikat tersedia',
            'message' =>
                'Sertifikat internal tersedia',
            'icon' => 'certificate',
            'color' => 'success',
            'url' => '/profil',
            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',
            'message' =>
                'Sertifikat internal berhasil dibuat',
            'file' => $filename
        ]);
    }

    // ✅ DOWNLOAD INTERNAL
    public function download(int $id)
    {
        $transaksi =
            TransaksiSertifikasi::findOrFail($id);

        if (!$transaksi->sertifikat_internal) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Sertifikat internal belum ada'
            ], 404);
        }

        $path =
            public_path(
                'uploads/sertifikat_internal/' .
                $transaksi->sertifikat_internal
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

    // ✅ UPLOAD BNSP
    public function uploadBnsp(
        Request $request,
        int $id
    ) {

        $request->validate([
            'file_bnsp' =>
                'required|file|mimes:pdf|max:5120'
        ]);

        $transaksi =
            TransaksiSertifikasi::with(
                'sertifikasi'
            )->findOrFail($id);

        if (
            $transaksi->status !== 'approved'
        ) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Peserta belum approved'
            ], 400);
        }

        // buat folder jika belum ada
        if (
            !file_exists(
                public_path(
                    'uploads/sertifikat_bnsp'
                )
            )
        ) {
            mkdir(
                public_path(
                    'uploads/sertifikat_bnsp'
                ),
                0755,
                true
            );
        }

        $file = $request->file('file_bnsp');

        $filename =
            'bnsp_' .
            $transaksi->id .
            '_' .
            time() .
            '.pdf';

        $file->move(
            public_path(
                'uploads/sertifikat_bnsp'
            ),
            $filename
        );

        $transaksi->sertifikat_bnsp =
            $filename;

        $transaksi->save();

        Notification::create([
            'user_id' => $transaksi->user_id,
            'type' => 'sertifikat_bnsp_ready',
            'title' => 'Sertifikat BNSP tersedia',
            'message' =>
                'Sertifikat BNSP tersedia',
            'icon' => 'award',
            'color' => 'warning',
            'url' => '/profil',
            'is_read' => false
        ]);

        return response()->json([
            'status' => 'success',
            'message' =>
                'Sertifikat BNSP berhasil upload',
            'file' => $filename
        ]);
    }

    // ✅ DOWNLOAD BNSP
    public function downloadBnsp(int $id)
    {
        $transaksi =
            TransaksiSertifikasi::findOrFail($id);

        if (!$transaksi->sertifikat_bnsp) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'Sertifikat BNSP belum ada'
            ], 404);
        }

        $path =
            public_path(
                'uploads/sertifikat_bnsp/' .
                $transaksi->sertifikat_bnsp
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

    // ✅ DELETE BNSP
    public function deleteBnsp(int $id)
    {
        $transaksi =
            TransaksiSertifikasi::findOrFail($id);

        if (!$transaksi->sertifikat_bnsp) {

            return response()->json([
                'status' => 'error',
                'message' =>
                    'File tidak ada'
            ], 404);
        }

        $path =
            public_path(
                'uploads/sertifikat_bnsp/' .
                $transaksi->sertifikat_bnsp
            );

        if (file_exists($path)) {
            unlink($path);
        }

        $transaksi->sertifikat_bnsp = null;

        $transaksi->save();

        return response()->json([
            'status' => 'success',
            'message' =>
                'Sertifikat BNSP berhasil dihapus'
        ]);
    }
}