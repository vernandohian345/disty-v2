<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PelatihanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'title' => $this->title,

            'slug' => $this->slug,

            'short_description' => $this->short_description,

            'deskripsi' => $this->deskripsi,

            'thumbnail' => $this->thumbnail,

            'thumbnail_url' => $this->thumbnail_url,

            'harga' => $this->harga,

            'durasi' => $this->durasi,

            'bahasa' => $this->bahasa,

            'level' => $this->level,

            'kategori' => $this->kategori,

            'status' => $this->status,

            'materi' => $this->materi,

            'benefits' => $this->benefits,

            'tanggal_pelatihan' => $this->tanggal_pelatihan,

            'link_grup' => $this->link_grup,

            'created_at' => $this->created_at,
        ];
    }
}