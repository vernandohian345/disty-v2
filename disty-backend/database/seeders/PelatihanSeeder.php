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
        DB::table('pelatihans')->insert([
            [
                'nama_pelatihan'   => 'UI/UX Research and Design',
                'slug'=>'ui-ux-research-and-design',
                'tanggal_pelatihan'=> '2025-08-24',
                'harga'            => 0,
                'durasi'           => '2 Jam',
                'bahasa'           => 'Bahasa Indonesia',
                'deskripsi'        => 'Bootcamp UI/UX Research and Design ini membantu kamu memahami proses
                                        lengkap dalam menciptakan produk digital yang tidak hanya menarik secara visual,
                                        tetapi juga mudah digunakan dan berbasis kebutuhan nyata pengguna. Kamu akan mempelajari
                                        dasar-dasar desain pengalaman pengguna (UX), melakukan riset pengguna secara mendalam,
                                        membuat persona, hingga menyusun wireframe dan prototipe interaktif menggunakan tools
                                        populer seperti Figma. Di akhir pelatihan, kamu akan mengerjakan proyek akhir berbasis
                                        studi kasus nyata, yang bisa kamu gunakan sebagai portfolio untuk melamar pekerjaan sebagai
                                        UI/UX Designer profesional.',
                'materi'           => 'Dasar UX & perannya dalam produk digital
                                        Riset pengguna: wawancara, survei, dan user journey
                                        Menyusun persona & problem statement
                                        Wireframe & prototyping dengan tools populer
                                        Prinsip UI visual (layout, tipografi, warna, komponen)
                                        Usability testing & iterasi desain
                                        Menyusun portfolio project yang kredibel',
                'kategori'             => 'gratis',
                'link_grup'        => 'https://web.whatsapp.com/',
                'sampul'           => 'gratis.png',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ],
            [
                'nama_pelatihan'   => 'Fullstack Web Development',
                'slug'=>'fullstack-web-development',
                'tanggal_pelatihan'=> '2025-09-10',
                'harga'            => 1500000,
                'durasi'           => '1 Bulan',
                'bahasa'           => 'Bahasa Indonesia',
                'deskripsi'        => 'React adalah library JavaScript paling populer saat ini untuk membangun antarmuka web
                                        yang interaktif dan modern. Dalam pelatihan ini, kamu akan belajar bagaimana membangun
                                        aplikasi web dari awal menggunakan React, mengatur alur data menggunakan state dan props,
                                        serta mengatur navigasi dengan React Router. Kamu juga akan mempelajari cara berkomunikasi
                                        dengan backend melalui API, serta menerapkan teknik testing dan debugging yang digunakan
                                        di industri. Pelatihan ini cocok untuk kamu yang ingin menjadi Frontend Developer dan membangun
                                        portfolio aplikasi web profesional.',
                'materi'           => 'HTML, CSS, & JavaScript modern (ES6+)
                                        Pengenalan React dan komponen
                                        State & props, event handling
                                        React Router & navigasi halaman
                                        State management: Context API, Redux
                                        Konsumsi API dan handling async data
                                        Testing UI dengan Jest & React Testing Library
                                        Final project: Aplikasi web siap production',
                'kategori'             => 'berbayar',
                'link_grup'        => 'https://web.whatsapp.com/',
                'sampul'           => 'berbayar.png',
                'created_at'       => Carbon::now(),
                'updated_at'       => Carbon::now(),
            ]
        ]);
    }
}
