<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;

class PelatihanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pelatihans')->insert(
            [
                [

                    'title' => 'UI/UX Research and Design',

                    'slug' => 'ui-ux-research-and-design',

                    'short_description' =>
                        'Pelajari proses UI/UX modern dari riset hingga prototyping.',

                    'tanggal_pelatihan' => '2025-08-24',

                    'harga' => 0,

                    'durasi' => '2 Jam',

                    'bahasa' => 'Bahasa Indonesia',

                    'level' => 'Beginner',

                    'deskripsi' => '...',

                    'materi' => json_encode([
                        'Dasar UX & perannya dalam produk digital',
                        'Riset pengguna dan user journey',
                        'Persona & problem statement',
                        'Wireframe & prototyping',
                        'Usability testing',
                    ]),

                    'benefits' => json_encode([
                        'Video pembelajaran',
                        'PDF materi lengkap',
                        'Latihan praktik',
                        'Sertifikat penyelesaian',
                    ]),

                    'kategori' => 'gratis',

                    'status' => 'published',

                    'link_grup' => 'https://web.whatsapp.com/',

                    'thumbnail' => 'gratis.png',

                    'created_at' => Carbon::now(),

                    'updated_at' => Carbon::now(),
                ]

            ]
        );
    }
}
