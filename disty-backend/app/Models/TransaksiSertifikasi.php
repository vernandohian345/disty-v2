<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiSertifikasi extends Model
{
    use HasFactory;

    protected $table = 'transaksi_sertifikasi';

    protected $fillable = [
        'user_id',
        'sertifikasi_id',
        'nama',
        'email',
        'nomor_hp',
        'metode_pembayaran',
        'sertifikat_internal',
        'sertifikat_bnsp',
        'bukti',
        'status',
    ];

    public function sertifikasi()
    {
        return $this->belongsTo(Sertifikasi::class); // ✅ Perbaiki ini
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
