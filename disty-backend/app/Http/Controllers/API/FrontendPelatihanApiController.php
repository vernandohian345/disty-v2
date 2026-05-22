<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pelatihan;
use App\Http\Resources\PelatihanResource;
use Illuminate\Http\Request;

class FrontendPelatihanApiController extends Controller
{
    // ✅ LIST PELATIHAN
    public function index(Request $request)
    {
        $query = Pelatihan::select([
            'id',
            'title',
            'slug',
            'short_description',
            'thumbnail',
            'harga',
            'durasi',
            'bahasa',
            'level',
            'kategori',
            'status',
            'created_at',
        ]);

        $query->where('status', 'published');

        // search
        if ($request->filled('q')) {

            $keywords = explode(
                ' ',
                $request->q
            );

            $query->where(function ($q) use ($keywords) {

                foreach ($keywords as $word) {

                    $q->orWhere(
                        'title',
                        'like',
                        '%' . $word . '%'
                    )

                        ->orWhere(
                            'deskripsi',
                            'like',
                            '%' . $word . '%'
                        )

                        ->orWhereJsonContains(
                            'materi',
                            $word
                        )

                        ->orWhereJsonContains(
                            'benefits',
                            $word
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
            'data' => PelatihanResource::collection($pelatihans)
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

            ->where('status', 'published')

            ->inRandomOrder()
            ->take(4)
            ->get();

        return response()->json([
            'status' => 'success',

            'pelatihan' => new PelatihanResource($pelatihan),

            'rekomendasi' => PelatihanResource::collection($rekomendasi)
        ]);
    }
}