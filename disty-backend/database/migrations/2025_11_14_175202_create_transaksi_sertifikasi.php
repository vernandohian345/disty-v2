<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaksi_sertifikasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('sertifikasi_id')->constrained()->onDelete('cascade');
            $table->string('nama');
            $table->string('email');
            $table->string('nomor_hp');
            $table->enum('metode_pembayaran', ['transfer', 'cod', 'gratis'])->nullable();
            $table->string('bukti')->nullable();
            $table->enum('status', ['pending', 'paid', 'approved'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_sertifikasi');
    }
};
