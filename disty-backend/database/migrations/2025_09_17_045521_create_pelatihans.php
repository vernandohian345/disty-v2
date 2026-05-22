<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrAations.
     */
    public function up(): void
    {
        Schema::create('pelatihans', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();

            $table->text('short_description')->nullable();
            $table->longText('deskripsi')->nullable();

            $table->string('thumbnail')->nullable();

            $table->decimal('harga', 12, 2)->default(0);

            $table->string('durasi', 50);
            $table->string('bahasa', 100);

            $table->string('level')->default('Beginner');

            $table->enum('kategori', ['gratis', 'berbayar'])
                ->default('gratis');

            $table->enum('status', ['draft', 'published'])
                ->default('published');

            $table->json('materi')->nullable();
            $table->json('benefits')->nullable();

            $table->date('tanggal_pelatihan')->nullable();

            $table->string('link_grup')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelatihans');
    }
};
