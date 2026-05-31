import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { login } from "../../services/authService";

import logo from "../../assets/images/logo.png";

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });

    const handleInputChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });

    };

    const togglePasswordVisibility = () => {

        setShowPassword(
            !showPassword
        );

    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await login({
                        email:
                            formData.email,
                        password:
                            formData.password,
                    });

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.user
                    )
                );

                // SUCCESS ALERT
                await Swal.fire({
                    icon: "success",
                    title: "Login Berhasil 🎉",
                    text:
                        "Selamat datang kembali di Disty Akademi",
                    showConfirmButton: false,
                    timer: 1800,
                    background:
                        "#ffffff",
                    color:
                        "#0f172a",
                    customClass: {
                        popup:
                            "modern-swal",
                    },
                });

                if (
                    response.data.user.role ===
                    "admin"
                ) {

                    navigate(
                        "/dashboard"
                    );

                } else {

                    navigate("/");

                }

            } catch (error) {

                console.log(error);

                // ERROR ALERT
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:
                        error.response?.data
                            ?.message ||
                        "Email atau password salah",
                    confirmButtonColor:
                        "#ef4444",
                    background:
                        "#ffffff",
                    color:
                        "#0f172a",
                    customClass: {
                        popup:
                            "modern-swal",
                        confirmButton:
                            "modern-confirm-btn",
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

                        {/* CIRCLE */}
                        <div
                            style={{
                                position:
                                    "absolute",
                                width:
                                    "400px",
                                height:
                                    "400px",
                                borderRadius:
                                    "50%",
                                background:
                                    "rgba(255,255,255,0.08)",
                                top:
                                    "-100px",
                                right:
                                    "-100px",
                            }}
                        />

                        <div
                            style={{
                                position:
                                    "absolute",
                                width:
                                    "300px",
                                height:
                                    "300px",
                                borderRadius:
                                    "50%",
                                background:
                                    "rgba(255,255,255,0.05)",
                                bottom:
                                    "-80px",
                                left:
                                    "-80px",
                            }}
                        />

                        {/* CONTENT */}
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
                                className="
                                fw-bold
                                "
                                style={{
                                    fontSize:
                                        "60px",
                                    lineHeight:
                                        "1.2",
                                    maxWidth:
                                        "550px",
                                }}
                            >

                                AYO
                                BERGABUNG
                                DENGAN
                                DISTY
                                AKADEMI

                            </h1>

                            <p
                                className="
                                mt-4
                                opacity-75
                                "
                                style={{
                                    fontSize:
                                        "18px",
                                    lineHeight:
                                        "1.8",
                                    maxWidth:
                                        "500px",
                                }}
                            >

                                Tingkatkan
                                skillmu dan
                                dapatkan
                                sertifikat
                                resmi bersama
                                Disty
                                Akademi.

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

                        {/* CARD */}
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
                                maxWidth:
                                    "560px",
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
                                    className="
                                    img-fluid
                                    mb-3
                                    "
                                    style={{
                                        width:
                                            "82px",
                                    }}
                                />

                                <h2
                                    className="
                                    fw-bold
                                    mb-2
                                    "
                                    style={{
                                        fontSize:
                                            "32px",
                                    }}
                                >

                                    Welcome Back

                                </h2>

                                <p
                                    className="
                                    text-muted
                                    mb-0
                                    "
                                    style={{
                                        fontSize:
                                            "14px",
                                    }}
                                >

                                    Login untuk
                                    melanjutkan
                                    ke Disty
                                    Akademi

                                </p>

                            </div>

                            {/* FORM */}
                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >

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
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleInputChange
                                        }
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
                                            value={
                                                formData.password
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={
                                                togglePasswordVisibility
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

                                {/* REMEMBER */}
                                <div
                                    className="
                                    d-flex
                                    justify-content-between
                                    align-items-center
                                    mb-4
                                    flex-wrap
                                    gap-2
                                    "
                                >

                                    <div className="form-check">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                        />

                                        <label className="form-check-label text-muted">

                                            Remember me

                                        </label>

                                    </div>

                                    <Link
                                        to="#"
                                        className="
                                        text-decoration-none
                                        small
                                        fw-semibold
                                        "
                                    >

                                        Forgot password?

                                    </Link>

                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
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
                                        fontSize:
                                            "16px",
                                        background:
                                            "linear-gradient(135deg,#f59e0b,#ea580c)",
                                        color:
                                            "white",
                                    }}
                                >

                                    Sign In

                                </button>

                            </form>

                            {/* SWITCH */}
                            <div
                                className="
                                text-center
                                mt-4
                                "
                            >

                                <span className="text-muted">

                                    Don't have an account?

                                </span>

                                <Link
                                    to="/register"
                                    className="
                                    text-decoration-none
                                    fw-semibold
                                    ms-1
                                    "
                                >

                                    Sign Up

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* STYLE */}
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

                .modern-swal{
                    border-radius:
                        28px !important;

                    padding:
                        24px !important;
                }

                .modern-confirm-btn{
                    border-radius:
                        14px !important;

                    padding:
                        10px 24px !important;

                    font-weight:
                        600 !important;
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

                    h2{
                        font-size:
                            28px !important;
                    }

                }

            `}
            </style>

        </>

    );
}