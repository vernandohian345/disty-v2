<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pelatihan;
use Illuminate\Http\Request;

class FrontendPelatihanApiController extends Controller
{
    // ✅ LIST PELATIHAN
    public function index(Request $request)
    {
        $query = Pelatihan::query();

        // search
        if ($request->filled('q')) {

            $keywords = explode(
                ' ',
                $request->q
            );

            $query->where(function ($q)
            use ($keywords) {

                foreach ($keywords as $word) {

                    $q->orWhere(
                        'nama_pelatihan',
                        'like',
                        '%' . $word . '%'
                    )

                    ->orWhere(
                        'deskripsi',
                        'like',
                        '%' . $word . '%'
                    )

                    ->orWhere(
                        'materi',
                        'like',
                        '%' . $word . '%'
                    );
                }
            });
        }

        // filter kategori
        if ($request->filled('kategori')) {

            $query->where(
                'kategori',
                $request->kategori
            );
        }

        $pelatihans = $query
            ->latest()
            ->paginate(6);

        return response()->json([
            'status' => 'success',
            'data' => $pelatihans
        ]);
    }

    // ✅ DETAIL PELATIHAN
    public function show(string $slug)
    {
        $pelatihan = Pelatihan::where(
            'slug',
            $slug
        )->firstOrFail();

        // rekomendasi
        $rekomendasi = Pelatihan::where(
                'id',
                '!=',
                $pelatihan->id
            )
            ->where(
                'kategori',
                $pelatihan->kategori
            )
            ->inRandomOrder()
            ->take(4)
            ->get();

        return response()->json([
            'status' => 'success',

            'pelatihan' => $pelatihan,

            'rekomendasi' => $rekomendasi
        ]);
    }
}