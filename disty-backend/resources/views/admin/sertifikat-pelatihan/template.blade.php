<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sertifikat</title>
    <style>
        @page {
            margin: 0;
        }

        body {
            margin: 0;
            padding: 0;
        }

        .certificate-container {
            width: 297mm; /* A4 Landscape */
            height: 210mm;
            position: relative;
            background-image: url('{{ public_path('assets/sertifikat/background-pelatihan.png') }}');
            background-size: cover;
            background-position: center;
        }

        .nama-peserta {
            position: absolute;
            top: 95mm; /* Sesuaikan posisi */
            left: 50%;
            transform: translateX(-50%);
            font-size: 48px;
            font-weight: bold;
            color: #2d3748;
            text-align: center;
            width: 100%;
        }

        .nama-pelatihan {
            position: absolute;
            top: 125mm; /* Sesuaikan posisi */
            left: 50%;
            transform: translateX(-50%);
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
            text-align: center;
            width: 100%;
        }

        .tanggal {
            position: absolute;
            top: 150mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 14px;
            color: #666;
        }

        .nomor-sertifikat {
            position: absolute;
            bottom: 20mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="nama-peserta">{{ $nama }}</div>
        <div class="nama-pelatihan">{{ $pelatihan }}</div>
        <div class="tanggal">{{ \Carbon\Carbon::parse($tanggal)->translatedFormat('d F Y') }}</div>
        <div class="nomor-sertifikat">{{ $nomor }}</div>
    </div>
</body>
</html>
