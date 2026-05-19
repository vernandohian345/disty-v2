<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiPelatihan extends Model
{
    use HasFactory;

    protected $table = 'transaksi_pelatihan';

    protected $fillable = [
        'user_id',
        'pelatihan_id',
        'nama',
        'email',
        'nomor_hp',
        'metode_pembayaran',
        'sertifikat_pelatihan',
        'bukti',
        'status',
        'is_completed',
        'completed_at',
    ];

    public function pelatihan()
    {
        return $this->belongsTo(Pelatihan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
