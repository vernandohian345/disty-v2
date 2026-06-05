<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SertifikasiUser extends Model
{
    protected $table = 'sertifikasi_user';

    protected $fillable = [
        'user_id',
        'sertifikasi_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sertifikasi()
    {
        return $this->belongsTo(Sertifikasi::class);
    }
}

