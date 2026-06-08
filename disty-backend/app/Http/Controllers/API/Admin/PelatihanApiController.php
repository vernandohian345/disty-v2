<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pelatihan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PelatihanApiController extends Controller
{
    // ✅ GET semua pelatihans
    public function index()
    {
        $pelatihans = Pelatihan::latest()->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $pelatihans
        ]);
    }

    // ✅ GET detail pelatihan
    public function show(int $id)
{
    try {

        $pelatihan = Pelatihan::with([
            'moduls',
            'transaksi.user'
        ])
        ->withCount('transaksi')
        ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $pelatihan
        ]);

    } catch (\Throwable $e) {

        return response()->json([
            'message' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
        ], 500);
    }
}

    // ✅ POST tambah pelatihan
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'bahasa' => 'required|string',
            'short_description' => 'nullable|string',
            'level' => 'required|string',
            'status' => 'required|string',
            'benefits' => 'nullable|array',
            'materi' => 'required|string',
            'kategori' => 'required|string',
            'link_grup' => 'required|string',
            'tanggal_pelatihan' => 'required|date',
            'harga' => $request->kategori === 'berbayar'
                ? 'required|numeric|min:1'
                : 'nullable',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'durasi' => 'required|string|max:100',
        ]);

        $data = $request->all();

        $slug = Str::slug(
            $request->title
        );

        $count =
            Pelatihan::where(
                'slug',
                'like',
                "{$slug}%" // Cek slug yang mirip
            )->count();

        $data['slug'] =
            $count
            ? "{$slug}-" . ($count + 1) // Tambahkan angka jika slug sudah ada
            : $slug;


        $data['harga'] =
            $request->kategori === 'gratis'
            ? 0
            : $request->harga;

        // upload gambar
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');

            $filename =
                time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/pelatihan'),
                $filename
            );

            $data['thumbnail'] = $filename;
        }

        $pelatihan = \App\Models\Pelatihan::create($data);

        $moduls = json_decode(
            $request->moduls,
            true
        );

        if ($moduls) {

            foreach ($moduls as $modul) {

                $pelatihan->moduls()->create([

                    'judul' =>
                        $modul['judul'],

                    'deskripsi' =>
                        $modul['deskripsi'] ?? null,

                    'video_url' =>
                        $modul['video_url'],

                    'durasi' =>
                        $modul['durasi'],

                    'urutan' =>
                        $modul['urutan'],
                ]);
            }
        }


        return response()->json([
            'status' => 'success',
            'message' => 'Pelatihan berhasil ditambahkan',
            'data' => $pelatihan
        ], 201);
    }

    // UPDATE
    public function update(Request $request, int $id)
    {
        $pelatihan = \App\Models\Pelatihan::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'deskripsi' => 'required',
            'short_description' => 'nullable|string',
            'level' => 'required|string',
            'status' => 'required|string',
            'benefits' => 'nullable|string',
            'materi' => 'nullable|string',
            'kategori' => 'required|string',
            'link_grup' => 'required|string',
            'durasi' => 'required|string|max:100',
            'tanggal_pelatihan' => 'required|date',
            'harga' => $request->kategori === 'berbayar'
                ? 'required|numeric|min:1'
                : 'nullable',
            'bahasa' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->all();

        $slug = Str::slug(
            $request->title
        );

        $count =
            Pelatihan::where(
                'slug',
                'like',
                "{$slug}%" // Cek slug yang mirip
            )->count();

        $count =
            Pelatihan::where(
                'slug',
                'like',
                "{$slug}%" // Cek slug yang mirip
            )
            ->where(
                'id',
                '!=',
                $pelatihan->id
            ) // Kecualikan pelatihan yang sedang diupdate
            ->count();

        $data['slug'] =
            $count
            ? "{$slug}-" . ($count + 1) // Tambahkan angka jika slug sudah ada
            : $slug;

        $data['harga'] =
            $request->kategori === 'gratis'
            ? 0
            : $request->harga;

        // upload gambar baru
        if ($request->hasFile('thumbnail')) {

            // hapus lama
            if (
                $pelatihan->thumbnail &&
                file_exists(
                    public_path(
                        'uploads/pelatihan/' . $pelatihan->thumbnail
                    )
                )
            ) {
                unlink(
                    public_path(
                        'uploads/pelatihan/' . $pelatihan->thumbnail
                    )
                );
            }

            $file = $request->file('thumbnail');

            $filename =
                time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/pelatihan'),
                $filename
            );

            $data['thumbnail'] = $filename;
        } else {

            unset($data['thumbnail']);
        }

        $pelatihan->update($data);

        $moduls = json_decode(
            $request->moduls,
            true
        );

        if ($moduls) {

            // hapus modul lama
            $pelatihan->moduls()->delete();

            foreach ($moduls as $index => $modul) {

                $pelatihan->moduls()->create([

                    'judul' =>
                        $modul['judul'],

                    'deskripsi' =>
                        $modul['deskripsi'] ?? null,

                    'video_url' =>
                        $modul['video_url'] ?? null,

                    'durasi' =>
                        $modul['durasi'],

                    'urutan' =>
                        $modul['urutan'] ?? ($index + 1),
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Pelatihan berhasil diupdate',
            'data' => $pelatihan->load('moduls')
        ]);
    }

    // ✅ DELETE
    public function destroy(int $id)
    {
        $pelatihan = Pelatihan::findOrFail($id);

        // hapus gambar
        if (
            $pelatihan->thumbnail &&
            file_exists(
                public_path(
                    'uploads/pelatihan/' . $pelatihan->thumbnail
                )
            )
        ) {
            unlink(
                public_path(
                    'uploads/pelatihan/' . $pelatihan->thumbnail
                )
            );
        }

        $pelatihan->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Pelatihan berhasil dihapus'
        ]);
    }
}
