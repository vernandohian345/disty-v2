<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\PelatihanModul;
use Illuminate\Http\Request;

class PelatihanModulApiController extends Controller
{
    public function index($pelatihanId)
    {
        $data = PelatihanModul::where(
            'pelatihan_id',
            $pelatihanId
        )
        ->orderBy('urutan')
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pelatihan_id' => 'required',
            'judul' => 'required',
            'video_url' => 'required',
            'durasi' => 'required',
        ]);

        $modul = PelatihanModul::create([
            'pelatihan_id' => $request->pelatihan_id,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'video_url' => $request->video_url,
            'durasi' => $request->durasi,
            'urutan' => $request->urutan ?? 1,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $modul
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'status' => 'success',
            'data' => PelatihanModul::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $modul = PelatihanModul::findOrFail($id);

        $modul->update([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'video_url' => $request->video_url,
            'durasi' => $request->durasi,
            'urutan' => $request->urutan,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $modul
        ]);
    }

    public function destroy($id)
    {
        PelatihanModul::findOrFail($id)->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}