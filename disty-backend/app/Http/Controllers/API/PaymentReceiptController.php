<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TransaksiPelatihan;
use Barryvdh\DomPDF\Facade\Pdf;

class PaymentReceiptController extends Controller
{
    public function show($kode_transaksi)
    {
        $transaksi =
            TransaksiPelatihan::with([
                'pelatihan'
            ])
            ->where(
                'kode_transaksi',
                $kode_transaksi
            )
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $transaksi,
            'pdf_url' =>
                url(
                    "/api/payment-receipt/{$kode_transaksi}/download"
                )
        ]);
    }

    public function downloadPdf($kode_transaksi)
    {
        $transaksi =
            TransaksiPelatihan::with([
                'pelatihan'
            ])
            ->where(
                'kode_transaksi',
                $kode_transaksi
            )
            ->firstOrFail();

        $pdf = Pdf::loadView(
            'pdf.receipt',
            compact('transaksi')
        );

        return $pdf->stream(
            "resi-{$transaksi->kode_transaksi}.pdf"
        );
    }
}