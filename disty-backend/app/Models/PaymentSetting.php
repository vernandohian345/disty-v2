<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentSetting extends Model
{
    protected $fillable = [

        'provider',

        'server_key',

        'client_key',

        'is_production',

        'is_active'
    ];
}
