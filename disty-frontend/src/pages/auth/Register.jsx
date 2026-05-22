import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { register } from "../../services/authService";

import logo from "../../assets/images/logo.png";

export default function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
        });

    const handleInputChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();
            // validasi Email
            if (
                !formData.email.endsWith("@gmail.com")
            ){
                alert(
                    "Email harus menggunakan @gmail.com"
                );
                return;
            }
            try {

                await register(
                    formData
                );

                alert(
                    "Register berhasil"
                );

                navigate(
                    "/login"
                );

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

                            BERGABUNG DENGAN DISTY AKADEMI

                        </h1>

                        <h6
                            className="fw-medium mt-3"
                            style={{
                                fontSize: "20px",
                            }}
                        >

                            Tingkatkan skillmu dan raih sertifikasi resmi

                        </h6>

                    </div>

                </div>

                {/* RIGHT */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light mt-2">

                    <div
                        className="w-100"
                        style={{
                            maxWidth: "450px",
                        }}
                    >

                        {/* HEADER */}
                        <div className="
                        text-center 
                        mb-5
                        d-flex
                        flex-column
                        align-items-center
                        justify-content-center
                        mx-auto"
                        
                        style={{ 
                            width: "200px",
                            height : "150px"
                         }}
                        >

                            <img
                                src={logo}
                                alt="Logo"
                                className="mb-4"
                            />

                            <h2 className="fw-bold">
                                Create Account
                            </h2>

                            <p className="text-center text-nowrap">

                                Join Disty Akademi today

                            </p>

                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit}>

                            {/* NAME */}
                            <div className="mb-3">

                                <label className="form-label">

                                    Nama

                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>

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
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
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

                            {/* CONFIRM */}
                            <div className="mb-4">

                                <label className="form-label">

                                    Konfirmasi Password

                                </label>

                                <input
                                    type="password"
                                    name="password_confirmation"
                                    className="form-control"
                                    value={formData.password_confirmation}
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="btn btn-warning w-100 py-3 fw-semibold"
                            >

                                Create Account

                            </button>

                        </form>

                        {/* SWITCH */}
                        <div className="text-center mt-4">

                            <span className="text-muted">

                                Already have account?

                            </span>

                            <Link
                                to="/login"
                                className="btn btn-link text-decoration-none fw-semibold"
                            >

                                Login

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}