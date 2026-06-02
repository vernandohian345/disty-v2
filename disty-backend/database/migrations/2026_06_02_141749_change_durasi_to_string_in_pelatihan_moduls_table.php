<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pelatihan_moduls', function (Blueprint $table) {
            $table->string('durasi')->change();
        });
    }

    public function down(): void
    {
        Schema::table('pelatihan_moduls', function (Blueprint $table) {
            $table->integer('durasi')->default(15)->change();
        });
    }
};