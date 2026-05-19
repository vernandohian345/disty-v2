<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    // ✅ GET semua blog (admin - semua status)
    public function index()
    {
        $blogs = Blog::latest()->paginate(10);

        return response()->json([
            'status' => 'success',
            'data'   => $blogs
        ]);
    }

    // ✅ GET detail blog by ID
    public function show(int $id)
    {
        $blog = Blog::findOrFail($id);

        // Increment views setiap kali dibuka
    $blog->increment('views');

        return response()->json([
            'status' => 'success',
            'data'   => $blog
        ]);
    }

    


    // ✅ POST tambah blog baru
    public function store(Request $request)
    {
        $request->validate([
            'judul'     => 'required|string|max:255',
            'konten'    => 'required|string',
            'kategori'  => 'nullable|string|max:100',
            'penulis'   => 'nullable|string|max:100',
            'status'    => 'required|in:draft,published',
            'sampul'    => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ]);

        $data = $request->all();

        // Auto generate slug dari judul
        $data['slug'] = Str::slug($request->judul);

        // Upload sampul jika ada
        if ($request->hasFile('sampul')) {

            $file     = $request->file('sampul');
            $filename = time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/blog'),
                $filename
            );

            $data['sampul'] = $filename;
        }

        $blog = Blog::create($data);

        return response()->json([
            'status'  => 'success',
            'message' => 'Blog berhasil ditambahkan',
            'data'    => $blog
        ], 201);
    }

    // ✅ POST update blog (pakai POST bukan PUT, sesuai pola project)
    public function update(Request $request, int $id)
    {
        $blog = Blog::findOrFail($id);

        $request->validate([
            'judul'     => 'required|string|max:255',
            'konten'    => 'required|string',
            'kategori'  => 'nullable|string|max:100',
            'penulis'   => 'nullable|string|max:100',
            'status'    => 'required|in:draft,published',
            'sampul'    => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ]);

        $data = $request->all();

        // Update slug dari judul baru
        $data['slug'] = Str::slug($request->judul);

        // Upload sampul baru jika ada
        if ($request->hasFile('sampul')) {

            // Hapus sampul lama
            if (
                $blog->sampul &&
                file_exists(public_path('uploads/blog/' . $blog->sampul))
            ) {
                unlink(public_path('uploads/blog/' . $blog->sampul));
            }

            $file     = $request->file('sampul');
            $filename = time() . '_' . $file->getClientOriginalName();

            $file->move(
                public_path('uploads/blog'),
                $filename
            );

            $data['sampul'] = $filename;

        } else {
            // Jangan overwrite sampul lama kalau tidak upload baru
            unset($data['sampul']);
        }

        $blog->update($data);

        return response()->json([
            'status'  => 'success',
            'message' => 'Blog berhasil diupdate',
            'data'    => $blog
        ]);
    }

    // ✅ DELETE hapus blog
    public function destroy(int $id)
    {
        $blog = Blog::findOrFail($id);

        // Hapus sampul jika ada
        if (
            $blog->sampul &&
            file_exists(public_path('uploads/blog/' . $blog->sampul))
        ) {
            unlink(public_path('uploads/blog/' . $blog->sampul));
        }

        $blog->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Blog berhasil dihapus'
        ]);
    }
}