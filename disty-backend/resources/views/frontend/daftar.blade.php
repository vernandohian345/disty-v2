<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daftar - Disty Akademi</title>
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body {
      background: #f9fafc;
    }
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .register-card {
      background: #fff;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      max-width: 900px;
      width: 100%;
    }
    .register-left {
      background: #fff5ef;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      position: relative;
    }
    /* Logo di pojok kiri */
    .register-left .logo {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 100px;
    }
    .register-left img.illustration {
      max-width: 280px;
      margin-top: 2rem;
    }
    /* Input + hover */
    .form-control {
      border-radius: 10px;
      transition: all .3s ease;
    }
    .form-control:focus,
    .form-control:hover {
      border-color: #ff8800;
      box-shadow: 0 0 0 0.25rem rgba(255, 136, 0, 0.25);
    }
    .btn-custom {
      background: #ff8800;
      border: none;
      border-radius: 10px;
      padding: .75rem;
      color: white;
      font-weight: 600;
      transition: .3s;
    }
    .btn-custom:hover {
      background: #e67600;
    }
    .input-group-text {
      background: transparent;
      border-left: none;
      cursor: pointer;
    }
    .input-group .form-control {
      border-right: none;
    }
    /* Mobile: sembunyiin ilustrasi */
    @media (max-width: 768px) {
      .register-left {
        display: none;
      }
    }
  </style>
</head>
<body>

<div class="container register-container">
  <div class="register-card row g-0">

    <!-- Kiri (gambar/ilustrasi) -->
    <div class="col-md-6 register-left">
      <img src="asset/logo.png" alt="Logo Disty Akademi" class="logo">
      <h3 class="mb-3 mt-5">Ayo Bergabung dengan Disty Akademi!</h3>
      <p class="mb-3">Tingkatkan skillmu dan dapatkan sertifikat resmi</p>
      <img src="asset/ilustrasi-daftar.png" alt="ILustrasi belajar by Flaticon" class="illustration">
    </div>

    <!-- Kanan (form daftar) -->
    <div class="col-md-6 p-5 position-relative">
        <button type="button" class="btn position-absolute top-0 end-0 mt-2 me-2"
                aria-label="Close" onclick="window.location.href='/'"
                style="background: none; border: none; font-size: 1.2rem; color: #6c757d;">
            <i class="fas fa-xmark"></i>
        </button>

        <h4 class="mb-3 fw-bold">Buat Akun Baru</h4>
        <form method="POST" action="/daftar">
            @csrf
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="name" name="name" class="form-control" placeholder="Masukkan username">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="Masukkan email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                <input type="password" id="password" name="password" class="form-control" placeholder="Masukkan password">
                <span class="input-group-text" onclick="togglePassword('password', this)">
                    <i class="fas fa-eye-slash"></i>
                </span>
                </div>
            </div>
            <button type="submit" class="btn btn-custom w-100">Daftar</button>
            <p class="mt-3 text-center">Sudah punya akun? <a href="/login">Masuk</a></p>
        </form>
    </div>
  </div>
</div>

<script>
  function togglePassword(id, el) {
    const input = document.getElementById(id);
    const icon = el.querySelector("i");
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  }
</script>

</body>
</html>
