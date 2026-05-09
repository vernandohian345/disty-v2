<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Masuk - Disty Akademi</title>
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body {
      background: #f9fafc;
    }
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-card {
      background: #fff;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      max-width: 800px;
      width: 100%;
    }
    .login-left {
    background: #fff5ef;
    position: relative;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    }

    .logo-header {
    position: absolute;
    top: 20px;
    left: 20px;
    }

    .logo-header img {
    width: 100px;
    }

    .login-left-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    text-align: center;
    }

    .login-left .illustration {
    max-width: 260px;
    margin-top: 1rem;
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
    /* Mobile: hide ilustrasi */
    @media (max-width: 768px) {
      .login-left {
        display: none;
      }
    }
  </style>
</head>
<body>

<div class="container login-container">
  <div class="login-card row g-0">

    <!-- Kiri -->
    <div class="col-md-6 login-left">
        <div class="logo-header">
            <img src="asset/logo.png" alt="Logo Disty Akademi">
        </div>
        <div class="login-left-content text-center">
            <h3 class="fw-bold mb-3 mt-5">Selamat Datang Kembali!</h3>
            <p class="mb-4">Login untuk melanjutkan belajar bersama Disty Akademi</p>
            <img src="asset/ilustrasi-login.png" alt="Ilustrasi Login by Flaticon" class="illustration">
        </div>
    </div>


    <!-- Kanan (form login) -->
    <div class="col-md-6 p-5 position-relative">
        <button type="button" class="btn position-absolute top-0 end-0 mt-2 me-2"
          aria-label="Close" onclick="window.location.href='/'"
          style="background: none; border: none; font-size: 1.2rem; color: #6c757d;">
          <i class="fas fa-xmark"></i>
        </button>
        <h4 class="mb-3 fw-bold">Masuk</h4>
        <form method="POST" action="/login">
            @csrf
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
            <div class="form-check mb-3">
            <input type="checkbox" class="form-check-input" id="rememberCheck">
            <label class="form-check-label" for="rememberCheck">
                Ingat saya
            </label>
            </div>
            <button type="submit" class="btn btn-custom w-100">Masuk</button>
            <p class="mt-3 text-center">Belum punya akun? <a href="daftar">Daftar</a></p>
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
