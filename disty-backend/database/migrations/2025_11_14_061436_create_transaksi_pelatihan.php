<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaksi_pelatihan', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('pelatihan_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('kode_transaksi')->unique();

            $table->string('nama');

            $table->string('email');

            $table->string('nomor_hp');

            $table->decimal('total_harga', 12, 2)->default(0);

            $table->enum('metode_pembayaran', [
                'transfer',
                'ewallet',
                'gratis'
            ])->nullable();

            $table->string('bukti')->nullable();

            $table->enum('status', [
                'pending',
                'paid',
                'rejected',
                'completed'
            ])->default('pending');

            $table->timestamp('paid_at')->nullable();

            $table->text('catatan_admin')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_pelatihan');
    }
};
