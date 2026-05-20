<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            if (!Schema::hasColumn('users', 'username')) {
                $table->string('username')
                    ->unique()
                    ->after('id');
            }

            if (!Schema::hasColumn('users', 'role')) {
                $table->enum('role', [
                    'admin',
                    'user'
                ])->default('user')
                  ->after('password');
            }

            if (!Schema::hasColumn('users', 'avatar_color')) {
                $table->string('avatar_color')
                    ->nullable()
                    ->after('role');
            }

        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            if (Schema::hasColumn('users', 'username')) {
                $table->dropColumn('username');
            }

            if (Schema::hasColumn('users', 'role')) {
                $table->dropColumn('role');
            }

            if (Schema::hasColumn('users', 'avatar_color')) {
                $table->dropColumn('avatar_color');
            }

        });
    }
};