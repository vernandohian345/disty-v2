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
        'tanggal_sertifikasi',
        'harga',
        'deskripsi',
        'kategori',
        'link_grup',
        'sampul',
        'syarat',
        'deadline_pendaftaran',
        'metode',
        'penyelenggara',
        'lokasi',
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
        return asset('storage/sertifikasi/' . $this->sampul);
    }

    public function peserta()
    {
        return $this->hasMany(PendaftaranSertifikasi::class);
    }
}
