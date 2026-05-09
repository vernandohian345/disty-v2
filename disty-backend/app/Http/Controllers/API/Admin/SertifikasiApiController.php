<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sertifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SertifikasiApiController extends Controller
{
    // ✅ GET semua sertifikasi
    public function index()
    {
        $sertifikasis = Sertifikasi::latest()->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $sertifikasis
        ]);
    }

    // ✅ GET detail sertifikasi
    public function show(int $id)
    {
        $sertifikasi = Sertifikasi::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $sertifikasi
        ]);
    }

    // ✅ POST tambah sertifikasi
    public function store(Request $request)
    {
        $request->validate([
            'nama_sertifikasi'   => 'required|string|max:255',
            'deskripsi'          => 'required|string',
            'bahasa'             => 'required|string',
            'materi'             => 'required|string',
            'kategori'           => 'required|string',
            'link_grup'          => 'required|string',
            'tanggal_sertifikasi'=> 'required|date',
            'harga'              => $request->kategori === 'berbayar'
                                        ? 'required|numeric|min:1'
                                        : 'nullable',
            'sampul'             => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'durasi'             => 'required|string|max:100',
        ]);

        $data = $request->all();

        $data['slug'] = Str::slug($request->nama_sertifikasi);

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
                public_path('uploads/sertifikasi'),
                $filename
            );

            $data['sampul'] = $filename;
        }

        $sertifikasi = Sertifikasi::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Sertifikasi berhasil ditambahkan',
            'data' => $sertifikasi
        ]);
    }

    // ✅ UPDATE
    public function update(Request $request, int $id)
    {
        $sertifikasi = Sertifikasi::findOrFail($id);

        $request->validate([
            'nama_sertifikasi' => 'required|string|max:255',
            'deskripsi'        => 'required',
            'materi'           => 'nullable|string',
            'kategori'         => 'required|string',
            'link_grup'        => 'required|string',
            'durasi'           => 'required|string|max:100',
            'harga'            => $request->kategori === 'berbayar'
                                        ? 'required|numeric|min:1'
                                        : 'nullable',
            'bahasa'           => 'required|string',
            'sampul'           => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->all();

        $slug = Str::slug($request->nama_sertifikasi);

        $count = Sertifikasi::where('slug', 'LIKE', "{$slug}%")
            ->where('id', '!=', $id)
            ->count();

        $data['slug'] = $count
            ? "{$slug}-" . ($count + 1)
            : $slug;

        $data['harga'] =
            $request->kategori === 'gratis'
            ? 0
            : $request->harga;

        // upload gambar baru
        if ($request->hasFile('sampul')) {

            // hapus lama
            if (
                $sertifikasi->sampul &&
                file_exists(
                    public_path(
                        'uploads/sertifikasi/' . $sertifikasi->sampul
                    )
                )
            ) {
                unlink(
                    public_path(
                        'uploads/sertifikasi/' . $sertifikasi->sampul
                    )
                );
            }

            $file = $request->file('sampul');

            $filename =
                time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/sertifikasi'),
                $filename
            );

            $data['sampul'] = $filename;

        } else {

            unset($data['sampul']);
        }

        $sertifikasi->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Sertifikasi berhasil diupdate',
            'data' => $sertifikasi
        ]);
    }

    // ✅ DELETE
    public function destroy(int $id)
    {
        $sertifikasi = Sertifikasi::findOrFail($id);

        // hapus gambar
        if (
            $sertifikasi->sampul &&
            file_exists(
                public_path(
                    'uploads/sertifikasi/' . $sertifikasi->sampul
                )
            )
        ) {
            unlink(
                public_path(
                    'uploads/sertifikasi/' . $sertifikasi->sampul
                )
            );
        }

        $sertifikasi->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Sertifikasi berhasil dihapus'
        ]);
    }
}