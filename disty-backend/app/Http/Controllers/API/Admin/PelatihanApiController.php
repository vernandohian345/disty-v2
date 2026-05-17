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
        $pelatihan = Pelatihan::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $pelatihan
        ]);
    }

    // ✅ POST tambah pelatihan
    public function store(Request $request)
    {
        $request->validate([
            'nama_pelatihan'   => 'required|string|max:255',
            'deskripsi'        => 'required|string',
            'bahasa'           => 'required|string',
            'materi'           => 'required|string',
            'kategori'         => 'required|string',
            'link_grup'        => 'required|string',
            'tanggal_pelatihan'=> 'required|date',
            'harga'            => $request->kategori === 'berbayar'
                                    ? 'required|numeric|min:1'
                                    : 'nullable',
            'sampul'           => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'durasi'           => 'required|string|max:100',
        ]);

        $data = $request->all();

        $slug = Str::slug(
            $request->nama_pelatihan
            );

        $count = 
            Pelatihan::where(
                'slug',
                'like',
                '{$slug}%' // Cek slug yang mirip
            )->count();

        $data['slug'] =
            $count
            ? "{$slug}-" . ($count + 1)// Tambahkan angka jika slug sudah ada
            : $slug;


        $data['harga'] =
            $request->kategori === 'gratis'
            ? 0
            : $request->harga;

        // upload gambar
        if ($request->hasFile('sampul')) {

            $file = $request->file('sampul');

            $filename =
                time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/pelatihan'),
                $filename
            );

            $data['sampul'] = $filename;
        }

        $pelatihan = \App\Models\Pelatihan::create($data);


        return response()->json([
            'status' => 'success',
            'message' => 'Pelatihan berhasil ditambahkan',
            'data' => $pelatihan
        ], 201);
    }

    // ✅ UPDATE
    public function update(Request $request, int $id)
    {
        $pelatihan = \App\Models\Pelatihan::findOrFail($id);

        $request->validate([
            'nama_pelatihan' => 'required|string|max:255',
            'deskripsi'      => 'required',
            'materi'         => 'nullable|string',
            'kategori'       => 'required|string',
            'link_grup'      => 'required|string',
            'durasi'         => 'required|string|max:100',
            'tanggal_pelatihan' => 'required|date',
            'harga'          => $request->kategori === 'berbayar'
                                    ? 'required|numeric|min:1'
                                    : 'nullable',
            'bahasa'         => 'required|string',
            'sampul'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->all();

        $slug = Str::slug(
            $request->nama_pelatihan
            );

        $count = 
            Pelatihan::where(
                'slug',
                'like',
                '{$slug}%' // Cek slug yang mirip
            )->count();

        $count = 
            Pelatihan::where(
                'slug',
                'like',
                '{$slug}%' // Cek slug yang mirip
            )
            ->where(
                'id',
                '!=', 
                $pelatihan->id) // Kecualikan pelatihan yang sedang diupdate
            ->count();

        $data['slug'] =
            $count
            ? "{$slug}-" . ($count + 1)// Tambahkan angka jika slug sudah ada
            : $slug;

        $data['harga'] =
            $request->kategori === 'gratis'
            ? 0
            : $request->harga;

        // upload gambar baru
        if ($request->hasFile('sampul')) {

            // hapus lama
            if (
                $pelatihan->sampul &&
                file_exists(
                    public_path(
                        'uploads/pelatihan/' . $pelatihan->sampul
                    )
                )
            ) {
                unlink(
                    public_path(
                        'uploads/pelatihan/' . $pelatihan->sampul
                    )
                );
            }

            $file = $request->file('sampul');

            $filename =
                time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/pelatihan'),
                $filename
            );

            $data['sampul'] = $filename;

        } else {

            unset($data['sampul']);
        }

        $pelatihan->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Pelatihan berhasil diupdate',
            'data' => $pelatihan
        ]);
    }

    // ✅ DELETE
    public function destroy(int $id)
    {
        $pelatihan = Pelatihan::findOrFail($id);

        // hapus gambar
        if (
            $pelatihan->sampul &&
            file_exists(
                public_path(
                    'uploads/pelatihan/' . $pelatihan->sampul
                )
            )
        ) {
            unlink(
                public_path(
                    'uploads/pelatihan/' . $pelatihan->sampul
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