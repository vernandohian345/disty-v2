<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pelatihan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PelatihanController extends Controller
{
    // List semua pelatihan (admin)
    public function index()
    {
        $pelatihans = Pelatihan::latest()->paginate(10);
        return view('admin.pelatihan.index', compact('pelatihans'));
    }

    // Form tambah
    public function create()
    {
        return view('admin.pelatihan.create');
    }

    // Simpan data baru
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
            'harga'            => $request->kategori === 'berbayar' ? 'required|numeric|min:1' : 'nullable',
            'sampul'           => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'durasi'           => 'required|string|max:100',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->nama_pelatihan);
        $data['harga'] = $request->kategori === 'gratis' ? 0 : $request->harga;


        if ($request->hasFile('sampul')) {
            $file = $request->file('sampul');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/pelatihan'), $filename);
            $data['sampul'] = $filename;
        }

        Pelatihan::create($data);


        return redirect()->route('admin.pelatihan.index')->with('success', 'Pelatihan berhasil ditambahkan!');
    }

    // Form edit
    public function edit(Pelatihan $pelatihan)
    {
        return view('admin.pelatihan.edit', compact('pelatihan'));
    }

    // Update data
    public function update(Request $request, Pelatihan $pelatihan)
    {
        $request->validate([
            'nama_pelatihan' => 'required|string|max:255',
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
        $data['slug'] = Str::slug($request->nama_pelatihan);
        $data['harga'] = $request->kategori === 'gratis' ? 0 : $request->harga;

        if ($request->hasFile('sampul')) {
            // hapus file lama
            if ($pelatihan->sampul && file_exists(public_path('uploads/pelatihan/' . $pelatihan->sampul))) {
                unlink(public_path('uploads/pelatihan/' . $pelatihan->sampul));
            }

            // simpan file baru
            $file = $request->file('sampul');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/pelatihan'), $filename);
            $data['sampul'] = $filename;
        } else {
            // kalau gak upload → jangan overwrite kolom sampul
            unset($data['sampul']);
        }


        $pelatihan->update($data);

        return redirect()->route('admin.pelatihan.index')->with('success', 'Pelatihan berhasil diupdate');
    }

    // Hapus data
    public function destroy(Pelatihan $pelatihan)
    {
        $pelatihan->delete();
        return redirect()->route('admin.pelatihan.index')->with('success', 'Pelatihan berhasil dihapus');
    }
}
