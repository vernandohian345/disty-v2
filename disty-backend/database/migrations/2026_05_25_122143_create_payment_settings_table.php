<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('payment_settings', function (Blueprint $table) {

            $table->id();

            $table->string('provider');

            $table->text('server_key');

            $table->text('client_key');

            $table->boolean('is_production')
                ->default(false);

            $table->boolean('is_active')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'payment_settings'
        );
    }
};
