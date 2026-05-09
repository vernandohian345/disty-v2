<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title')</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('css/layout.css') }}">
</head>
<body>
<!-- Sidebar -->
<div class="sidebar" id="sidebar">
  <div class="brand">
    <img src="{{ asset('asset/logo-putih.png') }}" alt="Logo">
    <i class="fas fa-times close-btn" id="close-btn"></i>
  </div>
  <ul class="nav flex-column">
        <li><a href="/dashboard" class="nav-link {{ request()->is('dashboard') ? 'active' : '' }}"><i class="fas fa-home"></i> <span>Dashboard</span></a></li>
        <li><a href="/admin/pelatihan" class="nav-link {{ request()->is('admin/pelatihan*') ? 'active' : '' }}"><i class="fas fa-briefcase"></i> <span>Kelola Pelatihan</span></a></li>
        <li><a href="/admin/sertifikasi" class="nav-link {{ request()->is('admin/sertifikasi*') ? 'active' : '' }}"><i class="fas fa-certificate"></i> <span>Kelola Sertifikasi</span></a></li>
        <li><a href="/admin/blog" class="nav-link {{ request()->is('admin/blog*') ? 'active' : '' }}"><i class="fas fa-blog"></i> <span>Kelola Blog</span></a></li>
        <li><a href="/admin/pembayaran" class="nav-link {{ request()->is('admin/pembayaran*') ? 'active' : '' }}"><i class="fas fa-credit-card"></i> <span>Pembayaran Peserta</span></a></li>
        <li><a href="/admin/sertifikat-pelatihan" class="nav-link {{ request()->is('admin/sertifikat-pelatihan*') ? 'active' : '' }}"><i class="fas fa-file-alt"></i> <span>Sertifikat Pelatihan</span></a></li>
        <li><a href="/admin/sertifikat-bnsp" class="nav-link {{ request()->is('admin/sertifikat-bnsp*') ? 'active' : '' }}"><i class="fas fa-award"></i> <span>Sertifikat Sertifikasi BNSP</span></a></li>
        <li>
            <a href="#" class="nav-link logout-link"
                onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                <i class="fa-solid fa-right-from-bracket"></i> <span>Keluar</span>
            </a>
        </li>
  </ul>
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
</div>

<!-- Overlay -->
<div class="overlay" id="overlay"></div>

<!-- Topbar -->
<div class="topbar">
  <button class="toggle-btn" id="toggle-btn"><i class="fas fa-bars"></i></button>
  <span class="topbar-title">@yield('title', 'Dashboard')</span>
</div>

<!-- Main Content -->
<div class="content" id="content">
  @yield('content')
</div>

<script>
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-btn');
  const closeBtn = document.getElementById('close-btn');
  const overlay = document.getElementById('overlay');

  toggleBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.add('active');
      overlay.classList.add('active');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
</script>


</body>
</html>
