<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::table(
            'transaksi_pelatihan',
            function (Blueprint $table) {

                $table->string('snap_token')
                    ->nullable();

                $table->string('transaction_status')
                    ->default('pending');

                $table->string('payment_type')
                    ->nullable();

                $table->string('midtrans_order_id')
                    ->nullable();
            }
        );
    }

    public function down(): void
    {
        Schema::table(
            'transaksi_pelatihan',
            function (Blueprint $table) {

                $table->dropColumn([
                    'snap_token',
                    'transaction_status',
                    'payment_type',
                    'midtrans_order_id'
                ]);
            }
        );
    }
};
