<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SertifikasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            DB::table('sertifikasis')->insert([
                [
                    'nama_sertifikasi' => 'ToT KKNI Level 4',
                    'slug' => 'ToT KKNI Level 4',
                    'tanggal_sertifikasi' => '2025-09-10',
                    'sampul' => 'sertifikasi.png',
                    'harga' => 0,
                    'durasi' => '40 Jam',
                    'bahasa' => 'Indonesia',
                    'kategori' => 'gratis',
                    'link_grup' => 'https://web.whatsapp.com/',
                    'deskripsi' => "Training of Trainer (ToT) KKNI Level 4 adalah program pelatihan yang ditujukan untuk membekali para instruktur atau trainer dengan keterampilan
                                    dan pengetahuan yang diperlukan untuk memberikan pelatihan yang berkualitas. Dalam pelatihan ini, peserta akan memperdalam pemahaman mereka
                                    tentang konsep-konsep dasar dan metode-metode pelatihan berbasis kompetensi yang efektif, serta diberikan keterampilan untuk merancang,
                                    mengimplementasikan, dan mengevaluasi program pelatihan yang SKKNI.",
                    'materi' => "Desain kurikulum pelatihan yang inovatif
                                Manajemen kelas
                                Pengelolaan waktu
                                Komunikasi efektif untuk menciptakan lingkungan pembelajaran yang kondusif",
                    'syarat' => "Peserta merupakan instruktur/trainer
                                Memiliki pemahaman dasar terkait SKKNI
                                Bersedia mengikuti seluruh rangkaian program pelatihan",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'nama_sertifikasi' => 'ToT KKNI Level 3',
                    'slug' => 'ToT KKNI Level 3',
                    'tanggal_sertifikasi' => '2025-09-10',
                    'sampul' => 'sertifikasi.png',
                    'harga' => 500000,
                    'durasi' => '8 Jam',
                    'bahasa' => 'Indonesia',
                    'kategori' => 'berbayar',
                    'link_grup' => 'https://web.whatsapp.com/',
                    'deskripsi' => "Training of Trainer (ToT) KKNI Level 3 adalah program
                                    pelatihan yang dirancang khusus untuk mempersiapkan
                                    para instruktur atau pelatih dengan keterampilan yang
                                    diperlukan untuk memberikan pelatihan yang berkualitas
                                    sesuai Standar Kompetensi Kerja Nasional Indonesia
                                    (SKKNI). Peserta akan diberikan pemahaman yang
                                    mendalam tentang konsep-konsep dasar dalam pelatihan
                                    dan pengajaran, serta keterampilan praktis dalam
                                    merancang, mengelola, dan mengevaluasi program
                                    pelatihan.

                                    Pelatihan ToT KKNI Level 3 juga akan memberikan peserta
                                    pengetahuan tentang pedagogi modern dan teknik-teknik
                                    pengajaran yang inovatif untuk meningkatkan efektivitas
                                    pembelajaran.",
                    'materi' => "Desain kurikulum pelatihan yang inovatif
                                Manajemen kelas
                                Pengelolaan waktu
                                Komunikasi efektif untuk menciptakan lingkungan pembelajaran yang kondusif",
                    'syarat' => "Peserta merupakan instruktur/trainer
                                Memiliki pemahaman dasar terkait SKKNI
                                Bersedia mengikuti seluruh rangkaian program pelatihan",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'nama_sertifikasi' => 'Digital Marketing ',
                    'slug' => 'Digital Marketing ',
                    'tanggal_sertifikasi' => '2025-09-10',
                    'sampul' => 'sertifikasi.png',
                    'harga' => 0,
                    'durasi' => '40 Jam',
                    'bahasa' => 'Indonesia',
                    'kategori' => 'gratis',
                    'link_grup' => 'https://web.whatsapp.com/',
                    'deskripsi' => "Pelatihan digital marketing yang up to date adalah program
                                    yang dirancang untuk membekali peserta dengan
                                    pengetahuan terbaru dan keterampilan praktis yang
                                    diperlukan dalam ranah pemasaran digital yang terus
                                    berkembang.

                                    Pelatihan ini tidak hanya fokus pada teori, tetapi juga memberikan
                                    pengalaman praktis melalui studi kasus, proyek-proyek simulasi, dan
                                    interaksi langsung dengan praktisi pemasaran digital yang
                                    berpengalaman.",
                    'materi' => "Desain kurikulum pelatihan yang inovatif
                                Manajemen kelas
                                Pengelolaan waktu
                                Komunikasi efektif untuk menciptakan lingkungan pembelajaran yang kondusif",
                    'syarat' => "Peserta merupakan instruktur/trainer
                                Memiliki pemahaman dasar terkait SKKNI
                                Bersedia mengikuti seluruh rangkaian program pelatihan",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'nama_sertifikasi' => 'Operator Komputer ',
                    'slug' => 'Operator Komputer ',
                    'tanggal_sertifikasi' => '2025-09-10',
                    'sampul' => 'sertifikasi.png',
                    'harga' => 1200000,
                    'durasi' => '2 Hari',
                    'bahasa' => 'Indonesia',
                    'kategori' => 'berbayar',
                    'link_grup' => 'https://web.whatsapp.com/',
                    'deskripsi' => "Pelatihan operator komputer adalah program yang dirancang
                                    untuk membekali peserta dengan keterampilan dasar dalam
                                    menggunakan komputer dan aplikasi produktivitas seperti
                                    pengolah kata, spreadsheet, dan presentasi. Peserta akan
                                    mempelajari konsep-konsep dasar tentang pengoperasian
                                    komputer, termasuk penggunaan keyboard, mouse, dan
                                    perangkat input lainnya. Mereka juga akan diajarkan cara
                                    menggunakan sistem operasi seperti Windows atau MacOS
                                    serta memahami konsep dasar jaringan dan internet.

                                    Selama pelatihan, peserta akan terampil dalam mengoperasikan program-
                                    program kantor seperti Microsoft Office (Word, Excel, PowerPoint) atau
                                    aplikasi serupa. Mereka juga akan memperoleh pemahaman tentang
                                    keamanan digital dan etika dalam penggunaan teknologi informasi.
                                    Pelatihan operator komputer bertujuan untuk meningkatkan efisiensi dan
                                    produktivitas kerja peserta di berbagai bidang, mulai dari administrasi
                                    kantor hingga sektor industri yang lebih teknis.",
                    'materi' => "Desain kurikulum pelatihan yang inovatif
                                Manajemen kelas
                                Pengelolaan waktu
                                Komunikasi efektif untuk menciptakan lingkungan pembelajaran yang kondusif",
                    'syarat' => "Peserta merupakan instruktur/trainer
                                Memiliki pemahaman dasar terkait SKKNI
                                Bersedia mengikuti seluruh rangkaian program pelatihan",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'nama_sertifikasi' => 'Soft Skills',
                    'slug' => 'Soft Skills',
                    'tanggal_sertifikasi' => '2025-09-10',
                    'sampul' => 'sertifikasi.png',
                    'harga' => 0,
                    'durasi' => '40 Jam',
                    'bahasa' => 'Indonesia',
                    'kategori' => 'gratis',
                    'link_grup' => 'https://web.whatsapp.com/',
                    'deskripsi' => "Pelatihan soft skill adalah program yang difokuskan pada
                                    pengembangan kemampuan interpersonal dan
                                    kelembagaan yang tidak terkait dengan keterampilan teknis
                                    tertentu. Peserta pelatihan akan dilatih dalam berbagai
                                    aspek seperti komunikasi efektif, kepemimpinan, kerja tim,
                                    manajemen waktu, dan penyelesaian masalah. Mereka juga
                                    akan memperoleh pemahaman yang lebih baik tentang
                                    empati, toleransi, serta kemampuan untuk beradaptasi
                                    dengan perubahan lingkungan kerja.

                                    Selain itu, pelatihan soft skill juga bertujuan untuk meningkatkan
                                    kepercayaan diri, motivasi, dan kemampuan berpikir kritis peserta.
                                    Dengan mengasah soft skill ini, peserta akan dapat mengoptimalkan
                                    kinerja mereka di tempat kerja, membangun hubungan yang baik dengan
                                    rekan kerja dan klien, serta menghadapi tantangan-tantangan dengan
                                    lebih percaya diri dan efektif. Pelatihan soft skill sangat berharga dalam
                                    mengembangkan individu menjadi profesional yang tangguh dan adaptif
                                    di era kerja yang terus berubah.",
                    'materi' => "Desain kurikulum pelatihan yang inovatif
                                Manajemen kelas
                                Pengelolaan waktu
                                Komunikasi efektif untuk menciptakan lingkungan pembelajaran yang kondusif",
                    'syarat' => "Peserta merupakan instruktur/trainer
                                Memiliki pemahaman dasar terkait SKKNI
                                Bersedia mengikuti seluruh rangkaian program pelatihan",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'nama_sertifikasi' => 'Service Excellent',
                    'slug' => 'Service Excellent',
                    'tanggal_sertifikasi' => '2025-09-10',
                    'sampul' => 'sertifikasi.png',
                    'harga' => 0,
                    'durasi' => '40 Jam',
                    'bahasa' => 'Indonesia',
                    'kategori' => 'gratis',
                    'link_grup' => 'https://web.whatsapp.com/',
                    'deskripsi' => "Pelatihan service excellent adalah program yang bertujuan
                                    untuk meningkatkan standar pelayanan pelanggan dengan
                                    fokus pada keunggulan layanan. Dalam pelatihan ini,
                                    peserta akan dipersiapkan untuk memberikan pengalaman
                                    pelanggan yang luar biasa melalui pemahaman mendalam
                                    tentang kebutuhan dan harapan pelanggan serta teknik
                                    komunikasi yang efektif.

                                    Peserta akan diajarkan keterampilan dalam berinteraksi dengan
                                    pelanggan secara profesional, memecahkan masalah dengan cepat
                                    dan efisien, serta membangun hubungan yang positif dengan
                                    pelanggan untuk memastikan kepuasan dan retensi pelanggan yang
                                    tinggi.",
                    'materi' => "Desain kurikulum pelatihan yang inovatif
                                Manajemen kelas
                                Pengelolaan waktu
                                Komunikasi efektif untuk menciptakan lingkungan pembelajaran yang kondusif",
                    'syarat' => "Peserta merupakan instruktur/trainer
                                Memiliki pemahaman dasar terkait SKKNI
                                Bersedia mengikuti seluruh rangkaian program pelatihan",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'nama_sertifikasi' => 'Public Speaking ',
                    'slug' => 'Public Speaking ',
                    'tanggal_sertifikasi' => '2025-09-25',
                    'sampul' => 'sertifikasi.png',
                    'harga' => 700000,
                    'durasi' => '1 Hari',
                    'bahasa' => 'Indonesia',
                    'kategori' => 'berbayar',
                    'link_grup' => 'https://web.whatsapp.com/',
                    'deskripsi' => "Pelatihan public speaking adalah program yang dirancang
                                    khusus untuk membantu individu mengembangkan
                                    kemampuan berbicara di depan umum dengan percaya diri dan
                                    efektif. Peserta pelatihan akan diajarkan teknik-teknik untuk
                                    mengatur presentasi, mengelola ketegangan panggung,
                                    menggunakan bahasa tubuh yang mendukung, serta
                                    menyampaikan pesan secara jelas dan persuasif. Mereka juga
                                    akan belajar tentang struktur presentasi yang baik,
                                    penggunaan alat bantu visual, dan cara menangani pertanyaan
                                    atau tanggapan dari audiens.

                                    Selama pelatihan, peserta akan terlibat dalam berbagai latihan praktis
                                    seperti berbicara di depan kelompok kecil, simulasi presentasi, dan
                                    mendapatkan umpan balik konstruktif untuk terus meningkatkan
                                    keterampilan public speaking mereka. Pelatihan ini juga dapat membantu
                                    peserta mengatasi ketakutan dan kecemasan yang sering terkait dengan
                                    berbicara di depan umum, sehingga mereka dapat tampil dengan percaya
                                    diri dan memukau saat menghadapi berbagai situasi publik.",
                    'materi' => "Desain kurikulum pelatihan yang inovatif
                                Manajemen kelas
                                Pengelolaan waktu
                                Komunikasi efektif untuk menciptakan lingkungan pembelajaran yang kondusif",
                    'syarat' => "Peserta merupakan instruktur/trainer
                                Memiliki pemahaman dasar terkait SKKNI
                                Bersedia mengikuti seluruh rangkaian program pelatihan",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
        ]);
    }
}
