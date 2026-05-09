<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Preview Sertifikat</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }

        .preview-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
        }

        .certificate-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 297 / 210; /* A4 Landscape ratio */
            border: 2px solid #ddd;
            background-image: url('{{ asset('assets/sertifikat/background-pelatihan.png') }}');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }

        .text-element {
            position: absolute;
            border: 2px dashed red;
            background: rgba(255, 0, 0, 0.1);
            cursor: move;
            padding: 5px;
        }

        .nama-peserta {
            top: 45%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2vw;
            font-weight: bold;
            text-align: center;
            width: 80%;
        }

        .nama-pelatihan {
            top: 60%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.2vw;
            font-weight: bold;
            color: #667eea;
            text-align: center;
            width: 70%;
        }

        .info {
            background: #fff3cd;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #ffc107;
        }

        .controls {
            margin-top: 20px;
            padding: 15px;
            background: #e9ecef;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="info">
            <h5>📌 Preview Tool - Sesuaikan Posisi Text</h5>
            <p class="mb-0">
                Drag kotak merah untuk menyesuaikan posisi text.
                Setelah posisi pas, copy nilai CSS-nya ke template blade.
            </p>
        </div>

        <div class="certificate-wrapper" id="certificate">
            <div class="text-element nama-peserta" draggable="true">
                <strong>Benyamin Jodi</strong>
                <small style="display:block; font-size:10px;">top: 45%, left: 50%</small>
            </div>

            <div class="text-element nama-pelatihan" draggable="true">
                Bootcamp Web Development
                <small style="display:block; font-size:10px;">top: 60%, left: 50%</small>
            </div>
        </div>

        <div class="controls">
            <h6>📋 Copy CSS ini ke template:</h6>
            <pre id="cssOutput" style="background: white; padding: 10px; border-radius: 4px;">
.nama-peserta { top: 45%; left: 50%; }
.nama-pelatihan { top: 60%; left: 50%; }
            </pre>
        </div>
    </div>

    <script>
        // Simple drag functionality
        const elements = document.querySelectorAll('.text-element');

        elements.forEach(el => {
            let isDragging = false;
            let startX, startY;

            el.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX - el.offsetLeft;
                startY = e.clientY - el.offsetTop;
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                const container = document.getElementById('certificate');
                const rect = container.getBoundingClientRect();

                let x = e.clientX - rect.left - startX;
                let y = e.clientY - rect.top - startY;

                // Convert to percentage
                const xPercent = (x / rect.width * 100).toFixed(1);
                const yPercent = (y / rect.height * 100).toFixed(1);

                el.style.left = xPercent + '%';
                el.style.top = yPercent + '%';

                // Update display
                const small = el.querySelector('small');
                small.textContent = `top: ${yPercent}%, left: ${xPercent}%`;

                updateCSS();
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });

        function updateCSS() {
            let css = '';
            elements.forEach(el => {
                const className = el.className.replace('text-element ', '');
                css += `.${className} { top: ${el.style.top}; left: ${el.style.left}; }\n`;
            });
            document.getElementById('cssOutput').textContent = css;
        }
    </script>
</body>
</html>
