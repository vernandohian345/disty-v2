<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->integer('views')->default(0)->after('status');
            $table->timestamp('published_at')->nullable()->after('views');
            $table->integer('read_time')->default(0)->after('published_at'); // dalam menit
        });
    }

    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn(['views', 'published_at', 'read_time']);
        });
    }
};