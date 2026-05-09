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
        Schema::create('sertifikasis', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sertifikasi');
            $table->string('slug')->unique();
            $table->date('tanggal_sertifikasi');
            $table->string('sampul')->nullable();
            $table->decimal('harga', 12, 2)->default(0);
            $table->string('durasi', 50);
            $table->string('bahasa', 100);
            $table->enum('kategori', ['gratis', 'berbayar'])->default('gratis');
            $table->text('deskripsi')->nullable();
            $table->text('materi')->nullable();
            $table->text('syarat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sertifikasis');
    }
};
