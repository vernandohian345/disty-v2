<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PelatihanModul extends Model
{
    protected $fillable = [
        'pelatihan_id',
        'judul',
        'deskripsi',
        'video_url',
        'durasi',
        'urutan'
    ];

    public function pelatihan()
    {
        return $this->belongsTo(Pelatihan::class);
    }

}