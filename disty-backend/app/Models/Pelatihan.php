<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PelatihanModul;

class Pelatihan extends Model
{
    use HasFactory;

    protected $table = 'pelatihans';
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'deskripsi',
        'thumbnail',
        'harga',
        'durasi',
        'bahasa',
        'level',
        'kategori',
        'status',
        'materi',
        'benefits',
        'tanggal_pelatihan',
        'link_grup',
    ];

    protected $appends = [
        'thumbnail_url',
    ];

    protected $casts = [
        'materi' => 'array',
        'benefits' => 'array',
    ];

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail
            ? asset('uploads/pelatihan/' . $this->thumbnail)
            : null;
    }

    public function transaksi()
    {
        return $this->hasMany(TransaksiPelatihan::class, 'pelatihan_id');
    }

     public function moduls()
    {
        return $this->hasMany(
            PelatihanModul::class,
            'pelatihan_id'
        )->orderBy('urutan');
    }


}
