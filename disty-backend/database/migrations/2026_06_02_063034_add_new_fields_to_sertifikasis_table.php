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
        Schema::table('sertifikasis', function (Blueprint $table) {

            $table->string('lokasi')->nullable();

            $table->integer('kuota')->default(0);

            $table->date('registration_deadline')->nullable();

            $table->string('mode')->nullable();

            $table->string('penyelenggara')->nullable();

            $table->string('status')->default('open');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sertifikasis', function (Blueprint $table) {

            $table->dropColumn([
                'lokasi',
                'kuota',
                'registration_deadline',
                'mode',
                'penyelenggara',
                'status'
            ]);

        });
    }
};