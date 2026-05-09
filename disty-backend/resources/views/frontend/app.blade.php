<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    @stack('styles')

    <style>
        /* Badge Notifikasi */
        .notification-badge {
            position: absolute;
            top: -5px;
            right: -8px;
            background: #dc3545;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: 600;
            border: 2px solid white;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }

        .notification-btn {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            border: none;
        }

        .notification-btn:hover {
            background: #ffb703;
            color: white;
            transform: scale(1.1);
        }

        .notification-btn i {
            font-size: 1.2rem;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div class="container">
            <a class="navbar-brand" href="/">
                <img src="{{ asset('asset/logo.png') }}" alt="Logo Disty Akademi">
            </a>
            <button class="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <!-- Navlink -->
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link" href="/pelatihan">Bootcamp</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/sertifikasi">Sertifikasi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/blog">Blog</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tentang Kami
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/profilPerusahaan">Profil Perusahaan</a></li>
                            <li><a class="dropdown-item" href="/legalitas">Legalitas</a></li>
                        </ul>
                    </li>
                </ul>

                <!-- Bagian Kanan -->
                <div class="d-flex align-items-center ms-3">
                    @auth
                        <!-- Notifikasi Button -->
                        @php
                            $unreadCount = App\Models\Notification::where('user_id', Auth::id())
                                ->where('is_read', false)
                                ->count();
                        @endphp

                        <a href="{{ route('notifications.index') }}"
                           class="notification-btn me-3"
                           title="Notifikasi">
                            <i class="fas fa-bell"></i>
                            @if($unreadCount > 0)
                                <span class="notification-badge" id="notificationBadge">
                                    {{ $unreadCount > 99 ? '99+' : $unreadCount }}
                                </span>
                            @endif
                        </a>

                        <!-- Dropdown User -->
                        @php
                            $initial = strtoupper(substr(Auth::user()->name, 0, 1));
                            $color = Auth::user()->avatar_color ?? '#ffb703';
                        @endphp
                        <div class="dropdown">
                            <a class="d-flex align-items-center text-decoration-none dropdown-toggle"
                               href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="avatar-circle me-2" style="background: {{ $color }}">
                                    {{ $initial }}
                                </div>
                                <span>{{ Auth::user()->name }}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a class="dropdown-item" href="{{ route('profil') }}">
                                        <i class="fas fa-user me-2"></i> Profil Saya
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="{{ route('notifications.index') }}">
                                        <i class="fas fa-bell me-2"></i> Notifikasi
                                        @if($unreadCount > 0)
                                            <span class="badge bg-danger ms-1">{{ $unreadCount }}</span>
                                        @endif
                                    </a>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <form action="{{ route('logout') }}" method="POST">
                                        @csrf
                                        <button type="submit" class="dropdown-item text-danger">
                                            <i class="fas fa-sign-out-alt me-2"></i> Keluar
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    @else
                        <a href="/login" class="btn btn-outline-oranye btn-nav">Masuk</a>
                        <a href="/daftar" class="btn btn-oranye btn-nav ms-2">Daftar</a>
                    @endauth
                </div>
            </div>
        </div>
    </nav>

    @yield('content')

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <div class="mb-3">
                        <img src="{{ asset('asset/logo-putih.png') }}" alt="Disty Akademi" style="height: 40px;">
                    </div>
                    <p class="mb-4">Platform pelatihan dan sertifikasi online terpercaya untuk meningkatkan skill dan karir Anda.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>

                <div class="col-lg-2 col-md-6 mb-4">
                    <h5>Tentang Kami</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="/profilPerusahaan">Profil perusahaan</a></li>
                        <li class="mb-2"><a href="/legalitas">Legalitas</a></li>
                        <li class="mb-2"><a href="/blog">Blog</a></li>
                    </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4">
                    <h5>Produk</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="/pelatihan">Bootcamp</a></li>
                        <li class="mb-2"><a href="/sertifikasi">Sertifikasi BNSP</a></li>
                    </ul>
                </div>

                <div class="col-lg-4 mb-4">
                    <h5>Butuh Info Lebih Lanjut?</h5>
                    <p class="mb-3">Dapatkan info terbaru tentang program dan penawaran khusus dari Disty Akademi!</p>
                    <form id="newsletter-form">
                        <div class="row g-2">
                            <div class="col-8">
                                <input type="email" class="form-control" placeholder="Email Anda" required>
                            </div>
                            <div class="col-4">
                                <button type="submit" class="btn btn-orange w-100">Subscribe</button>
                            </div>
                        </div>
                    </form>

                    <div class="mt-4">
                        <h6>Kontak Kami:</h6>
                        <p class="mb-1"><i class="fas fa-envelope me-2"></i> info@distyakademi.com</p>
                        <p class="mb-1"><i class="fas fa-phone me-2"></i> +62 21 1234-5678</p>
                        <p class="mb-0"><i class="fas fa-map-marker-alt me-2"></i> Jakarta, Indonesia</p>
                    </div>
                </div>
            </div>

            <hr class="my-4">

            <div class="row align-items-center">
                <div class="col-md-6 text-center text-md-start">
                    <p class="mb-0">&copy; 2025 Disty Akademi. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <a href="#" class="text-decoration-none me-3">Privacy Policy</a>
                    <a href="#" class="text-decoration-none">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // Auto-update notification badge setiap 30 detik (opsional)
        @auth
        setInterval(function() {
            fetch('{{ route("notifications.unreadCount") }}')
                .then(response => response.json())
                .then(data => {
                    const badge = document.getElementById('notificationBadge');
                    if (data.count > 0) {
                        if (!badge) {
                            // Create badge if not exists
                            const notifBtn = document.querySelector('.notification-btn');
                            const newBadge = document.createElement('span');
                            newBadge.id = 'notificationBadge';
                            newBadge.className = 'notification-badge';
                            newBadge.textContent = data.count > 99 ? '99+' : data.count;
                            notifBtn.appendChild(newBadge);
                        } else {
                            // Update badge
                            badge.textContent = data.count > 99 ? '99+' : data.count;
                        }
                    } else {
                        // Remove badge if count is 0
                        if (badge) {
                            badge.remove();
                        }
                    }
                })
                .catch(error => console.error('Error fetching notification count:', error));
        }, 30000); // Update setiap 30 detik
        @endauth

        // Animate stats counter
        function animateCounter(el, target, duration) {
            let startTime = null;
            const startValue = 0;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const value = Math.floor(progress * (target - startValue) + startValue);
                el.textContent = value.toLocaleString();

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = target.toLocaleString();
                }
            }

            window.requestAnimationFrame(step);
        }

        // Initialize counters when in viewport
        function initCounters() {
            const statsSection = document.querySelector('.hero-stats');
            if (!statsSection) return;

            const statNumbers = document.querySelectorAll('.stat-number');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(stat => {
                            const target = parseInt(stat.textContent.replace('+', ''));
                            animateCounter(stat, target, 2000);
                        });
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsSection);
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initCounters();

            // Newsletter form submission
            const newsletterForm = document.getElementById('newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;
                    alert(`Terima kasih! Email ${email} telah berlangganan newsletter kami.`);
                    this.reset();
                });
            }
        });
    </script>

    @stack('scripts')
</body>
</html>
