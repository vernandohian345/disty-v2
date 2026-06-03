<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sertifikasi extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_sertifikasi',
        'slug',
        'deskripsi',
        'kategori',
        'harga',
        'tanggal_sertifikasi',
        'sampul',
        'link_grup',
        'lokasi',
        'kuota',
        'registration_deadline',
        'mode',
        'penyelenggara',
        'status',
    ];

    public function transaksi()
    {
        return $this->hasMany(TransaksiSertifikasi::class, 'sertifikasi_id');
    }
    public function transaksiSertifikasi()
    {
        return $this->hasMany(TransaksiSertifikasi::class);
    }
    protected $appends = [
        'sampul_url'
    ];

   public function getSampulUrlAttribute()
    {
        return asset('storage/sertifikasi/' . rawurlencode($this->sampul));
    }
}
