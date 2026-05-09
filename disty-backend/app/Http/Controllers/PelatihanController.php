<?php

namespace App\Http\Controllers;

use App\Models\Pelatihan;
use Illuminate\Http\Request;

class PelatihanController extends Controller
{
    // List semua pelatihan
    public function index(Request $request)
    {
        $query = Pelatihan::query();

        // filter search
        if ($request->filled('q')) {
            $keywords = explode(' ', $request->q);

            $query->where(function($q) use ($keywords) {
                foreach ($keywords as $word) {
                    $q->orWhere('nama_pelatihan', 'like', '%' . $word . '%')
                    ->orWhere('deskripsi', 'like', '%' . $word . '%')
                    ->orWhere('materi', 'like', '%' . $word . '%');
                }
            });
        }


        // filter kategori
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        $pelatihans = $query->latest()->paginate(6)->withQueryString();

        return view('frontend.pelatihan', compact('pelatihans'));
    }


    // Detail pelatihan
    public function show($slug)
    {
        $pelatihan = Pelatihan::where('slug', $slug)->firstOrFail();

        // Ambil rekomendasi (4 item, exclude current pelatihan)
        $rekomendasi = Pelatihan::where('id', '!=', $pelatihan->id)
            ->where('kategori', $pelatihan->kategori) // filter sesuai kategori
            ->inRandomOrder()
            ->take(4)
            ->get();

        return view('frontend.detail-pelatihan', compact('pelatihan', 'rekomendasi'));
    }


}
