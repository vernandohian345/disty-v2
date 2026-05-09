<?php

namespace App\Http\Controllers;

use App\Models\Sertifikasi;
use Illuminate\Http\Request;

class SertifikasiController extends Controller
{
    // List sertifikasi
    public function index(Request $request)
    {
        $query = Sertifikasi::query();

        // filter search
        if ($request->filled('q')) {
            $keywords = explode(' ', $request->q);

            $query->where(function($q) use ($keywords) {
                foreach ($keywords as $word) {
                    $q->orWhere('nama_sertifikasi', 'like', '%' . $word . '%')
                    ->orWhere('deskripsi', 'like', '%' . $word . '%')
                    ->orWhere('materi', 'like', '%' . $word . '%');
                }
            });
        }


        // filter kategori
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        $sertifikasis = $query->latest()->paginate(6)->withQueryString();

        return view('frontend.sertifikasi', compact('sertifikasis'));
    }


    // Detail sertifikasi
    public function show(string $slug)
    {
        $sertifikasi = Sertifikasi::where('slug', $slug)->firstOrFail();

        // Ambil rekomendasi (4 item, exclude current )
        $rekomendasi = Sertifikasi::where('id', '!=', $sertifikasi->id)
            ->where('kategori', $sertifikasi->kategori) // filter sesuai kategori
            ->inRandomOrder()
            ->take(4)
            ->get();

        return view('frontend.detail-sertifikasi', compact('sertifikasi', 'rekomendasi'));
    }


}
