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
            'tipe_harga' => 'required|in:gratis,berbayar',
            'link_grup' => 'nullable|string',
            'tanggal_sertifikasi'=> 'required|date',
            'harga'              => $request->tipe_harga === 'berbayar'
                                        ? 'required|numeric|min:1'
                                        : 'nullable',
            'sampul'             => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'kuota' => 'required|integer|min:0',

            'lokasi' => 'required|string|max:255',

            'metode' => 'required|in:online,offline,hybrid',

            'penyelenggara' => 'required|string|max:255',

            'registration_deadline' => 'nullable|date|before_or_equal:tanggal_sertifikasi',

            'status' => 'required|in:draft,open,closed,finished',
        ]);

        $data = $request->all();

        $slug = Str::slug($request->nama_sertifikasi);

        $count = Sertifikasi::where('slug', 'LIKE', "{$slug}%")->count();

        $data['slug'] = $count
            ? "{$slug}-" . ($count + 1)
            : $slug;

        $data['harga'] =
            $request->tipe_harga === 'gratis'
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
            'tipe_harga' => 'required|in:gratis,berbayar',
            'link_grup' => 'nullable|string',
            'tanggal_sertifikasi' => 'required|date',
            'harga'            => $request->tipe_harga === 'berbayar'
                                        ? 'required|numeric|min:1'
                                        : 'nullable',
            'sampul'           => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'kuota' => 'required|integer|min:0',

            'lokasi' => 'required|string|max:255',

            'metode' => 'required|in:online,offline,hybrid',

            'penyelenggara' => 'required|string|max:255',

            'registration_deadline' => 'nullable|date|before_or_equal:tanggal_sertifikasi',

            'status' => 'required|in:draft,open,closed,finished',
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
            $request->tipe_harga === 'gratis'
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