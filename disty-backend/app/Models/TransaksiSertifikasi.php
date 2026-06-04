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
        'kode_transaksi',
        'nomor_hp',
        'total_harga',
        'metode_pembayaran',
        'sertifikat_internal',
        'sertifikat_bnsp',
        'bukti',
        'status',
        'snap_token',
        'transaction_status',
        'payment_type',
        'midtrans_order_id',
        'paid_at',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
    ];

    public function sertifikasi()
    {
        return $this->belongsTo(Sertifikasi::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}