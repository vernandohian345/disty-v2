<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sertifikasis', function (Blueprint $table) {

            // hapus field lama
            $table->dropColumn([
                'durasi',
                'bahasa',
                'materi',
                'syarat',
            ]);

            // tambah field baru
            $table->date('registration_deadline')->nullable();

            $table->enum('metode', [
                'online',
                'offline',
                'hybrid'
            ])->default('offline');

            $table->string('lokasi')->nullable();

            $table->string('penyelenggara')->nullable();

            $table->integer('kuota')->default(0);

            $table->enum('status', [
                'draft',
                'open',
                'full',
                'ongoing',
                'finished'
            ])->default('draft');

        });
    }

    public function down(): void
    {
        Schema::table('sertifikasis', function (Blueprint $table) {

            // restore field lama
            $table->text('materi')->nullable();

            $table->string('bahasa',100)->nullable();

            $table->string('durasi',50)->nullable();

            $table->text('syarat')->nullable();

            // hapus field baru
            $table->dropColumn([
                'registration_deadline',
                'kuota',
                'lokasi',
                'metode',
                'penyelenggara',
                'status',
            ]);
        });
    }
};
