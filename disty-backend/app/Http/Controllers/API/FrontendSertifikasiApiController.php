<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Sertifikasi;
use Illuminate\Http\Request;

class FrontendSertifikasiApiController extends Controller
{
    // ✅ LIST SERTIFIKASI
    public function index(Request $request)
    {
        $query = Sertifikasi::query();

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
                        'nama_sertifikasi',
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

        $sertifikasis = $query
            ->latest()
            ->paginate(6);

        return response()->json([
            'status' => 'success',
            'data' => $sertifikasis
        ]);
    }

    // ✅ DETAIL SERTIFIKASI
    public function show(string $slug)
    {
        $sertifikasi = Sertifikasi::where(
            'slug',
            $slug
        )->firstOrFail();

        // rekomendasi
        $rekomendasi = Sertifikasi::where(
                'id',
                '!=',
                $sertifikasi->id
            )
            ->where(
                'kategori',
                $sertifikasi->kategori
            )
            ->inRandomOrder()
            ->take(4)
            ->get();

        return response()->json([
            'status' => 'success',

            'sertifikasi' => $sertifikasi,

            'rekomendasi' => $rekomendasi
        ]);
    }
}