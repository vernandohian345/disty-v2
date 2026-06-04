<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transaksi_sertifikasi', function (Blueprint $table) {

            $table->decimal('total_harga',15,2)
                ->nullable()
                ->after('nomor_hp');

            $table->string('snap_token')
                ->nullable()
                ->after('status');

            $table->string('transaction_status')
                ->default('pending')
                ->after('snap_token');

            $table->string('payment_type')
                ->nullable()
                ->after('transaction_status');

            $table->string('midtrans_order_id')
                ->nullable()
                ->after('payment_type');

            $table->timestamp('paid_at')
                ->nullable()
                ->after('midtrans_order_id');
        });
    }

    public function down(): void
    {
        Schema::table('transaksi_sertifikasi', function (Blueprint $table) {

            $table->dropColumn([
                'total_harga',
                'snap_token',
                'transaction_status',
                'payment_type',
                'midtrans_order_id',
                'paid_at'
            ]);
        });
    }
};