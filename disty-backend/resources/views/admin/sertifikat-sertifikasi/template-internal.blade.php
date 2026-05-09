<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sertifikat Internal</title>
    <style>
        @page {
            margin: 0;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', serif;
        }

        .certificate-container {
            width: 297mm; /* A4 Landscape */
            height: 210mm;
            position: relative;
            background-image: url('{{ public_path('assets/sertifikat/background-sertifikasi.png') }}');
            background-size: cover;
            background-position: center;
        }

        .nama-peserta {
            position: absolute;
            top: 92mm; /* Sesuaikan posisi */
            left: 50%;
            transform: translateX(-50%);
            font-size: 52px;
            font-weight: bold;
            color: #1a202c;
            text-align: center;
            width: 100%;
            letter-spacing: 2px;
        }

        .nama-sertifikasi {
            position: absolute;
            top: 122mm; /* Sesuaikan posisi */
            left: 50%;
            transform: translateX(-50%);
            font-size: 26px;
            font-weight: bold;
            color: #d69e2e;
            text-align: center;
            width: 80%;
        }

        .bidang-info {
            position: absolute;
            top: 145mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 16px;
            color: #4a5568;
            text-align: center;
        }

        .tanggal {
            position: absolute;
            top: 160mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 14px;
            color: #666;
            font-style: italic;
        }

        .durasi {
            position: absolute;
            top: 172mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 13px;
            color: #718096;
        }

        .nomor-sertifikat {
            position: absolute;
            bottom: 18mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 11px;
            color: #a0aec0;
            letter-spacing: 1px;
        }

        /* Optional: Logo atau watermark */
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.05;
            font-size: 120px;
            color: #000;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <!-- Watermark (optional) -->
        <div class="watermark">CERTIFIED</div>

        <!-- Nama Peserta -->
        <div class="nama-peserta">{{ strtoupper($nama) }}</div>

        <!-- Nama Sertifikasi -->
        <div class="nama-sertifikasi">{{ $sertifikasi }}</div>

        <!-- Bidang (jika ada) -->
        @if($bidang)
        <div class="bidang-info">
            Bidang: {{ $bidang }}
        </div>
        @endif

        <!-- Tanggal -->
        <div class="tanggal">
            {{ \Carbon\Carbon::parse($tanggal)->translatedFormat('d F Y') }}
        </div>

        <!-- Durasi (jika ada) -->
        @if($durasi)
        <div class="durasi">
            Durasi: {{ $durasi }}
        </div>
        @endif

        <!-- Nomor Sertifikat -->
        <div class="nomor-sertifikat">{{ $nomor }}</div>
    </div>
</body>
</html>
