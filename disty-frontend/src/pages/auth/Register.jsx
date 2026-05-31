import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { register } from "../../services/authService";

import logo from "../../assets/images/logo.png";
import Swal from "sweetalert2";

export default function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
            agree_terms: false,
        });

    const handleInputChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });

    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        // VALIDASI EMAIL
        if (
            !formData.email.endsWith("@gmail.com")
        ) {

            Swal.fire({
                icon: "warning",
                title: "Email Tidak Valid",
                text: "Email harus menggunakan @gmail.com",
                confirmButtonColor: "#f59e0b",
                background: "#ffffff",
                color: "#0f172a",
                customClass: {
                    popup: "rounded-4 shadow",
                    confirmButton:
                        "rounded-3 px-4",
                },
            });

            return;
        }

        try {

            await register(
                formData
            );

            // SUCCESS
            await Swal.fire({
                icon: "success",
                title: "Berhasil 🎉",
                text: "Akun berhasil dibuat",
                confirmButtonColor: "#2563eb",
                background: "#ffffff",
                color: "#0f172a",
                timer: 1800,
                showConfirmButton: false,
                customClass: {
                    popup:
                        "rounded-4 shadow-lg",
                },
            });

            navigate("/login");

        } catch (error) {

            console.log(error);

            // ERROR
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    error.response?.data?.message ||
                    "Terjadi kesalahan",
                confirmButtonColor: "#ef4444",
                background: "#ffffff",
                color: "#0f172a",
                customClass: {
                    popup:
                        "rounded-4 shadow-lg",
                    confirmButton:
                        "rounded-3 px-4",
                },
            });

        }

    };

    return (

        <>

            <div
                className="
                container-fluid
                min-vh-100
                px-0
                "
                style={{
                    background:
                        "linear-gradient(180deg,#f8fafc,#eff6ff)",
                }}
            >

                <div className="row g-0 min-vh-100">

                    {/* LEFT DESKTOP */}
                    <div
                        className="
                        col-lg-6
                        d-none
                        d-lg-flex
                        align-items-center
                        justify-content-center
                        text-white
                        position-relative
                        overflow-hidden
                        "
                        style={{
                            background:
                                "linear-gradient(135deg,#0f172a,#1d4ed8,#ea580c)",
                        }}
                    >

                        <div
                            style={{
                                position: "absolute",
                                width: "400px",
                                height: "400px",
                                borderRadius: "50%",
                                background:
                                    "rgba(255,255,255,0.08)",
                                top: "-100px",
                                right: "-100px",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                width: "300px",
                                height: "300px",
                                borderRadius: "50%",
                                background:
                                    "rgba(255,255,255,0.05)",
                                bottom: "-80px",
                                left: "-80px",
                            }}
                        />

                        <div
                            className="
                            px-5
                            position-relative
                            animate-fade
                            "
                            style={{
                                zIndex: 2,
                            }}
                        >

                            <h1
                                className="fw-bold"
                                style={{
                                    fontSize: "60px",
                                    lineHeight: "1.2",
                                    maxWidth: "550px",
                                }}
                            >

                                BERGABUNG
                                DENGAN
                                DISTY AKADEMI

                            </h1>

                            <p
                                className="mt-4 opacity-75"
                                style={{
                                    fontSize: "18px",
                                    maxWidth: "500px",
                                    lineHeight: "1.8",
                                }}
                            >

                                Tingkatkan skillmu,
                                ikuti pelatihan terbaik,
                                dan raih sertifikasi resmi
                                bersama Disty Akademi.

                            </p>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div
                        className="
                        col-12
                        col-lg-6
                        d-flex
                        align-items-center
                        justify-content-center
                        py-4
                        px-3
                        "
                    >

                        <div
                            className="
                            w-100
                            bg-white
                            rounded-5
                            p-4
                            p-md-5
                            animate-card
                            "
                            style={{
                                maxWidth: "560px",
                                border:
                                    "1px solid rgba(255,255,255,0.3)",
                                boxShadow:
                                    "0 10px 40px rgba(15,23,42,0.08)",
                                backdropFilter:
                                    "blur(10px)",
                            }}
                        >

                            {/* HEADER */}
                            <div
                                className="
                                text-center
                                mb-4
                                animate-fade
                                "
                            >

                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="img-fluid mb-3"
                                    style={{
                                        width: "82px",
                                    }}
                                />

                                <h2
                                    className="
                                    fw-bold
                                    mb-2
                                    "
                                    style={{
                                        fontSize: "32px",
                                    }}
                                >

                                    Create Account

                                </h2>

                                <p
                                    className="
                                    text-center
                                    text-muted
                                    mb-0
                                    "
                                    style={{
                                        fontSize: "14px",
                                    }}
                                >

                                    Join Disty Akademi today

                                </p>

                            </div>

                            {/* FORM */}
                            <form
                                onSubmit={handleSubmit}
                            >

                                {/* NAME */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">

                                        Nama

                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="
                                        form-control
                                        py-3
                                        px-3
                                        rounded-4
                                        border-0
                                        modern-input
                                        "
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />

                                </div>

                                {/* USERNAME */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">

                                        Username

                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        className="
                                        form-control
                                        py-3
                                        px-3
                                        rounded-4
                                        border-0
                                        modern-input
                                        "
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />

                                </div>

                                {/* EMAIL */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">

                                        Email

                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="
                                        form-control
                                        py-3
                                        px-3
                                        rounded-4
                                        border-0
                                        modern-input
                                        "
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />

                                </div>

                                {/* PHONE */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">

                                        Nomor Telepon

                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        className="
                                        form-control
                                        py-3
                                        px-3
                                        rounded-4
                                        border-0
                                        modern-input
                                        "
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="08xxxxxxxxxx"
                                        required
                                    />

                                </div>

                                {/* PASSWORD */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">

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
                                            className="
                                            form-control
                                            py-3
                                            px-3
                                            rounded-4
                                            border-0
                                            pe-5
                                            modern-input
                                            "
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
                                            className="
                                            btn
                                            position-absolute
                                            top-50
                                            end-0
                                            translate-middle-y
                                            border-0
                                            "
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

                                {/* CONFIRM PASSWORD */}
                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        Konfirmasi Password

                                    </label>

                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        className="
                                        form-control
                                        py-3
                                        px-3
                                        rounded-4
                                        border-0
                                        modern-input
                                        "
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                        required
                                    />

                                </div>

                                {/* TERMS */}
                                <div className="mb-4">

                                    <div className="form-check">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="agree_terms"
                                            id="agree_terms"
                                            checked={formData.agree_terms}
                                            onChange={handleInputChange}
                                            required
                                        />

                                        <label
                                            className="
                                            form-check-label
                                            text-muted
                                            "
                                            htmlFor="agree_terms"
                                            style={{
                                                fontSize: "14px",
                                                lineHeight: "1.7",
                                            }}
                                        >

                                            Saya setuju dengan
                                            syarat &
                                            ketentuan serta
                                            kebijakan privasi
                                            Disty Akademi.

                                        </label>

                                    </div>

                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    disabled={
                                        !formData.agree_terms
                                    }
                                    className="
                                    btn
                                    w-100
                                    py-3
                                    fw-semibold
                                    rounded-4
                                    border-0
                                    modern-btn
                                    "
                                    style={{
                                        fontSize: "16px",
                                        background:
                                            "linear-gradient(135deg,#f59e0b,#ea580c)",
                                        color: "white",
                                    }}
                                >

                                    Create Account

                                </button>

                                {/* DISCLAIMER */}
                                <p
                                    className="
                                    text-muted
                                    text-center
                                    mt-3
                                    mb-0
                                    "
                                    style={{
                                        fontSize: "12px",
                                        lineHeight: "1.8",
                                    }}
                                >

                                    Disty Akademi berkomitmen
                                    menjaga kerahasiaan dan
                                    keamanan data pribadi
                                    pengguna. Data yang
                                    diberikan akan disimpan
                                    dengan aman dan tidak akan
                                    disebarluaskan kepada pihak
                                    lain tanpa izin pengguna.

                                </p>

                            </form>

                            {/* LOGIN */}
                            <div
                                className="
                                text-center
                                mt-4
                                "
                            >

                                <span className="text-muted">

                                    Already have account?

                                </span>

                                <Link
                                    to="/login"
                                    className="
                                    text-decoration-none
                                    fw-semibold
                                    ms-1
                                    "
                                >

                                    Login

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <style>
            {`
                .animate-card{
                    animation:
                        fadeUp 0.7s ease;
                    transition:
                        all 0.3s ease;
                }

                .animate-card:hover{
                    transform:
                        translateY(-4px);

                    box-shadow:
                        0 20px 50px rgba(15,23,42,0.12);
                }

                .animate-fade{
                    animation:
                        fadeIn 1s ease;
                }

                .modern-input{
                    background:
                        #f8fafc !important;

                    transition:
                        all 0.25s ease;

                    font-size:
                        15px;
                }

                .modern-input:focus{
                    background:
                        white !important;

                    box-shadow:
                        0 0 0 4px rgba(59,130,246,0.10) !important;

                    transform:
                        translateY(-1px);
                }

                .modern-btn{
                    transition:
                        all 0.3s ease;
                }

                .modern-btn:hover{
                    transform:
                        translateY(-2px);

                    opacity:
                        0.96;

                    box-shadow:
                        0 12px 25px rgba(234,88,12,0.25);
                }

                @keyframes fadeUp{

                    from{
                        opacity:0;
                        transform:
                            translateY(30px);
                    }

                    to{
                        opacity:1;
                        transform:
                            translateY(0);
                    }

                }

                @keyframes fadeIn{

                    from{
                        opacity:0;
                    }

                    to{
                        opacity:1;
                    }

                }

                @media (max-width: 576px){

                    .animate-card{

                        padding:
                            28px 22px !important;

                        border-radius:
                            30px !important;

                    }

                }
            `}
            </style>

        </>

    );
}