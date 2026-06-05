<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sertifikasis', function (Blueprint $table) {

            // HAPUS
            $table->dropColumn([
                'bahasa',
                'durasi',
                'materi'
            ]);

            // TAMBAH
            $table->date('deadline_pendaftaran')->nullable();

            $table->enum('metode', [
                'online',
                'offline',
                'hybrid'
            ])->nullable();

            $table->string('penyelenggara')->nullable();

            $table->string('lokasi')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('sertifikasis', function (Blueprint $table) {

            $table->string('bahasa')->nullable();
            $table->string('durasi')->nullable();
            $table->longText('materi')->nullable();

            $table->dropColumn([
                'deadline_pendaftaran',
                'metode',
                'penyelenggara',
                'lokasi'
            ]);
        });
    }
};
