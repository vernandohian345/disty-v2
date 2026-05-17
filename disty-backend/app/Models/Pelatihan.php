<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelatihan extends Model
{
    use HasFactory;

    protected $table = 'pelatihans';
    protected $fillable = [
        'nama_pelatihan',
        'slug',
        'tanggal_pelatihan',
        'harga',
        'durasi',
        'bahasa',
        'deskripsi',
        'materi',
        'kategori',
        'link_grup',
        'tanggal_pelatihan',
        'sampul',
    ];

    public function transaksi()
    {
        return $this->hasMany(TransaksiPelatihan::class, 'pelatihan_id');
    }

    public function transaksiPelatihan()
    {
        return $this->hasMany(TransaksiPelatihan::class);
    }
}
