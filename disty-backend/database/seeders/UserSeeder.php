<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::create([
            'username' => 'SuperAdmin',
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('min@5202'),
            'avatar_color' => '#946B3A',
            'role' => 'admin',
            'phone' => '08123456789',
        ]);

        User::create([
            'username' => 'JohnDoe',
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'password' => Hash::make('john@2025'),
            'avatar_color' => '#3A6B94',
            'role' => 'user',
            'phone' => '08987654321',
        ]);
    }
}