import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import logo from "../../assets/images/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login berhasil");

      if (response.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan"
      );
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">

        {/* LEFT */}
        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center text-white"
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#1d4ed8,#ea580c)",
          }}
        >
          <div className="px-5">

            <h1
              className="fw-bold"
              style={{
                fontSize: "60px",
                lineHeight: "1.2",
              }}
            >
              AYO BERGABUNG DENGAN DISTY AKADEMI
            </h1>

            <h6
              className="fw-medium mt-3"
              style={{
                fontSize: "20px",
                lineHeight: "1.2",
              }}
            >
              Tingkatkan skillmu dan dapatkan sertifikat resmi
            </h6>

          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light mt-2">

          <div
            className="w-100"
            style={{ maxWidth: "450px" }}
          >

            {/* HEADER */}
            <div
              className="
                text-center
                d-flex
                flex-column
                align-items-center
                justify-content-center
                mx-auto
              "
            >

              <div
                style={{
                  width: "200px",
                  height: "150px",
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="img-fluid mb-4"
                />
              </div>

              <p className="text-muted mb-4 text-center">
                Selamat datang di Disty Akademi,
                silakan login untuk melanjutkan
              </p>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <div className="position-relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    className="form-control pe-5"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                  >
                    <i
                      className={`fa-solid ${
                        showPassword
                          ? "fa-eye-slash"
                          : "fa-eye"
                      }`}
                    ></i>
                  </button>

                </div>

              </div>

              {/* REMEMBER */}
              <div className="d-flex justify-content-between mb-4">

                <div className="form-check">

                  <input
                    className="form-check-input"
                    type="checkbox"
                  />

                  <label className="form-check-label">
                    Remember me
                  </label>

                </div>

                <Link
                  to="#"
                  className="text-decoration-none"
                >
                  Forgot password?
                </Link>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn btn-warning w-100 py-3 fw-semibold"
              >
                Sign In
              </button>

            </form>

            {/* SWITCH */}
            <div className="text-center mt-4">

              <span className="text-muted">
                Don't have an account?
              </span>

              <Link
                to="/register"
                className="btn btn-link text-decoration-none fw-semibold"
              >
                Sign Up
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}