<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sertifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SertifikasiController extends Controller
{
    // List semua sertifikasi (admin)
    public function index()
    {
        $sertifikasis = sertifikasi::latest()->paginate(10);
        return view('admin.sertifikasi.index', compact('sertifikasis'));
    }

    // Form tambah
    public function create()
    {
        return view('admin.sertifikasi.create');
    }

    // Simpan data baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_sertifikasi'   => 'required|string|max:255',
            'deskripsi'        => 'required|string',
            'bahasa'           => 'required|string',
            'materi'           => 'required|string',
            'kategori'         => 'required|string',
            'link_grup'        => 'required|string',
            'tanggal_sertifikasi'=> 'required|date',
            'harga'            => $request->kategori === 'berbayar' ? 'required|numeric|min:1' : 'nullable',
            'sampul'           => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'durasi'           => 'required|string|max:100',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->nama_sertifikasi);
        $data['harga'] = $request->kategori === 'gratis' ? 0 : $request->harga;


        if ($request->hasFile('sampul')) {
            $file = $request->file('sampul');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/sertifikasi'), $filename);
            $data['sampul'] = $filename;
        }

        sertifikasi::create($data);


        return redirect()->route('admin.sertifikasi.index')->with('success', 'sertifikasi berhasil ditambahkan!');
    }

    // Form edit
    public function edit(sertifikasi $sertifikasi)
    {
        return view('admin.sertifikasi.edit', compact('sertifikasi'));
    }

    // Update data
    public function update(Request $request, sertifikasi $sertifikasi)
    {
        $request->validate([
            'nama_sertifikasi' => 'required|string|max:255',
            'deskripsi'      => 'required',
            'materi'         => 'nullable|string',
            'kategori'       => 'required|string',
            'link_grup'      => 'required|string',
            'durasi'         => 'required|string|max:100',
            'harga'          => $request->kategori === 'berbayar' ? 'required|numeric|min:1' : 'nullable',
            'bahasa'         => 'required|string',
            'sampul'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->nama_sertifikasi);
        $data['harga'] = $request->kategori === 'gratis' ? 0 : $request->harga;

        if ($request->hasFile('sampul')) {
            // hapus file lama
            if ($sertifikasi->sampul && file_exists(public_path('uploads/sertifikasi/' . $sertifikasi->sampul))) {
                unlink(public_path('uploads/sertifikasi/' . $sertifikasi->sampul));
            }

            // simpan file baru
            $file = $request->file('sampul');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/sertifikasi'), $filename);
            $data['sampul'] = $filename;
        } else {
            // kalau gak upload → jangan overwrite kolom sampul
            unset($data['sampul']);
        }


        $sertifikasi->update($data);

        return redirect()->route('admin.sertifikasi.index')->with('success', 'sertifikasi berhasil diupdate');
    }

    // Hapus data
    public function destroy(sertifikasi $sertifikasi)
    {
        $sertifikasi->delete();
        return redirect()->route('admin.sertifikasi.index')->with('success', 'sertifikasi berhasil dihapus');
    }
}
