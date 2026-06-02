<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pelatihan_moduls', function (Blueprint $table) {

            $table->id();

            $table->foreignId('pelatihan_id')
                ->constrained('pelatihans')
                ->cascadeOnDelete();

            $table->string('judul');

            $table->longText('deskripsi')->nullable();

            $table->string('video_url')->nullable();

            $table->integer('durasi')->default(15);

            $table->integer('urutan')->default(1);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pelatihan_moduls');
    }
};