<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pelatihan;
use App\Models\User;

class TransaksiPelatihan extends Model
{
    use HasFactory;

    protected $table = 'transaksi_pelatihan';

    protected $fillable = [
        'user_id',
        'pelatihan_id',
        'kode_transaksi',
        'nama',
        'email',
        'nomor_hp',
        'total_harga',
        'metode_pembayaran',
        'sertifikat_pelatihan',
        'bukti',
        'status',
        'is_completed',
        'completed_at',
        'snap_token',
        'transaction_status',
        'payment_type',
        'midtrans_order_id',
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
