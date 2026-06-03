<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("
            ALTER TABLE transaksi_sertifikasi
            MODIFY status ENUM(
                'pending',
                'approved',
                'completed',
                'rejected'
            ) DEFAULT 'pending'
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE transaksi_sertifikasi
            MODIFY status ENUM(
                'pending',
                'paid',
                'approved'
            ) DEFAULT 'pending'
        ");
    }
};