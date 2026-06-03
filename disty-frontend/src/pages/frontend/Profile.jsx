import { useEffect, useState } from "react";
// import {
//   FaUserCircle,
//   FaCamera,
//   FaBookOpen,
//   FaCertificate,
//   FaCheckCircle,
//   FaArrowLeft,
//   FaDownload,
// } from "react-icons/fa";
import { getProfileStats } from "../../services/profileService";
import { getMyCertificates } from "../../services/SertifikatPelatihanService";
import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// ── SMALL ICONS (SVG inline agar tidak perlu install extra) ──────────────────
const BookIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);
const BadgeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);
const CheckBigIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const DownloadIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

// ── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="w-4 h-px bg-orange-400 shrink-0" />
      <p className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.18em]">
        {children}
      </p>
    </div>
  );
}

// ── INFO FIELD ───────────────────────────────────────────────────────────────
function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-[#b07040] uppercase tracking-[0.1em] mb-1.5">
        {label}
      </p>
      <div
        className="
        h-12 rounded-[14px] px-4
        bg-[#fafafa] border border-orange-100/80
        flex items-center
        text-[13px] font-semibold text-[#1e130e]
        hover:border-orange-200 transition-colors duration-200
      "
      >
        {value || "—"}
      </div>
    </div>
  );
}

// ── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon, iconColor, value, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-[20px] p-5
        border border-orange-100/80
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(249,115,22,0.1)] hover:border-orange-200
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      <div
        className={`w-11 h-11 rounded-[13px] flex items-center justify-center mb-4 border ${iconColor}`}
      >
        {icon}
      </div>
      <p className="text-[28px] font-black text-[#1e130e] leading-none mb-1.5 tracking-tight">
        {value}
      </p>
      <p className="text-xs text-[#8a7870] font-medium">{label}</p>
    </div>
  );
}

// ── CERTIFICATE ITEM ─────────────────────────────────────────────────────────
function CertItem({ title }) {
  return (
    <div
      className="
      flex items-center gap-4
      p-4 rounded-[18px]
      bg-[#fafafa] border border-orange-100/80
      hover:bg-orange-50 hover:border-orange-200
      transition-all duration-300
    "
    >
      {/* Icon */}
      <div
        className="
        w-10 h-10 rounded-[12px] shrink-0
        bg-gradient-to-br from-orange-500 to-orange-400
        shadow-[0_4px_12px_rgba(249,115,22,0.3)]
        flex items-center justify-center text-white
      "
      >
        <BadgeIcon />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-[#1e130e] truncate">{title}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[11px] text-[#8a7870] font-medium">
            Sertifikat tersedia
          </span>
        </div>
      </div>

      {/* Download */}
      <button
        className="
        inline-flex items-center gap-2 shrink-0
        h-9 px-4 rounded-xl
        bg-gradient-to-r from-orange-500 to-orange-400
        hover:from-orange-400 hover:to-amber-400
        text-white text-[11px] font-bold
        shadow-[0_4px_12px_rgba(249,115,22,0.3)]
        hover:shadow-[0_6px_18px_rgba(249,115,22,0.45)]
        hover:-translate-y-0.5
        transition-all duration-300
      "
      >
        <DownloadIcon />
        Download
      </button>
    </div>
  );
}

// ── EMPTY CERTIFICATES ───────────────────────────────────────────────────────
function EmptyCert() {
  return (
    <div className="py-10 flex flex-col items-center text-center">
      <div
        className="
        w-14 h-14 rounded-[18px] mb-4
        bg-orange-50 border border-orange-100
        flex items-center justify-center text-orange-300
      "
      >
        <FaCertificate size={22} />
      </div>
      <p className="text-sm font-bold text-[#1e130e] mb-1">
        Belum Ada Sertifikat
      </p>
      <p className="text-xs text-[#8a7870]">
        Selesaikan pelatihan untuk mendapatkan sertifikat.
      </p>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Profile() {
  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_pelatihan: 0,
    pelatihan_selesai: 0,
    total_sertifikat: 0,
  });

  // ── DATA FETCHING (struktur tidak diubah) ──────────────────────────────────
  useEffect(() => {
    const userData = localStorage.getItem("user");

    const fetchStats = async () => {
      try {
        const data = await getProfileStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCertificates = async () => {
      try {
        const response = await getMyCertificates();
        setCertificates(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);

    fetchStats();
    fetchCertificates();

    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  // ── LOADING ────────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-[#fffaf5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 animate-pulse" />
          <div className="h-3 w-32 bg-orange-100 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  const statItems = [
    {
      icon: <BookIcon />,
      iconColor: "bg-orange-500/10 border-orange-500/20 text-orange-500",
      value: stats.total_pelatihan,
      label: "Pelatihan Diikuti",
      onClick: () => navigate("/my-pelatihan"),
    },
    {
      icon: <BadgeIcon />,
      iconColor: "bg-amber-400/10 border-amber-400/20 text-amber-500",
      value: stats.total_sertifikat,
      label: "Sertifikat",
      onClick: null,
    },
    {
      icon: <CheckBigIcon />,
      iconColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
      value: stats.pelatihan_selesai,
      label: "Selesai",
      onClick: null,
    },
  ];

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-[#fffaf5] overflow-hidden pb-12">
        {/* ── HERO SECTION (Membungkus Back Button & Page Header) ── */}
        <div
          className="
    relative w-full
    bg-gradient-to-br
    pt-12 pb-10 px-4 lg:px-6
    border-b border-orange-100/60
    overflow-hidden

    mb-6
    flex
    items-center
    gap-3
    rounded-2xl
    bg-orange-300
    hover:bg-orange-50
    border
    border-slate-200
    shadow-sm
    transition-all
    text-slate-700
    hover:text-orange-500
    font-semibold
  "
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#f97316 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-[120px]" />

            <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-amber-300/20 rounded-full blur-[120px]" />

            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)",
                  backgroundSize: "30px 30px",
                }}
              />
            </div>
          </div>
          {/* Efek Cahaya Dekoratif di dalam Hero */}
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-orange-300/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-[200px] h-[200px] bg-amber-300/10 blur-[60px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* BARIS UTAMA: TOMBOL KEMBALI & BREADCRUMB */}
            <div className="flex items-center justify-between gap-4 mb-10">
              <Link
                to="/pelatihan"
                className="
    inline-flex items-center gap-2.5
    h-10 px-5 rounded-2xl
    bg-white border border-orange-100/80
  "
              >
                <FaArrowLeft className="text-[10px]" />
                Kembali
              </Link>
            </div>

            {/* PAGE HEADER TITLE */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-orange-400 rounded-full" />

                <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-[0.25em]">
                  Dashboard Pengguna
                </span>

                <div className="w-8 h-[2px] bg-orange-400 rounded-full" />
              </div>
              <h1
                className="font-black tracking-tight leading-none mb-3"
                style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)" }}
              >
                <span className="text-[#1e130e]">Profil </span>
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Saya
                </span>
              </h1>
              <p className="text-sm md:text-base text-[#8a7870] font-medium leading-relaxed">
                Kelola informasi akun Anda, perbarui detail data diri, serta
                pantau seluruh progress capaian pelatihan yang sedang Anda
                ikuti.
              </p>
            </div>
          </div>
        </div>

        {/* Ambient Glows untuk Area Content Bawah */}
        <div className="fixed bottom-20 left-0 w-[320px] h-[320px] bg-amber-200/12 blur-[90px] rounded-full pointer-events-none z-0" />

        {/* ── MAIN CONTENT CONTAINER ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 -mt-2">
          {/* ── MAIN GRID ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
            {/* ── LEFT — PROFILE CARD ─────────────────────────── */}
            <div className="bg-white rounded-[28px] p-7 border border-orange-100/80 shadow-[0_4px_24px_rgba(249,115,22,0.04)] lg:sticky lg:top-24">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-[3px] border-orange-200"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 border-[3px] border-orange-200 flex items-center justify-center">
                      <FaUserCircle className="text-orange-400" size={72} />
                    </div>
                  )}

                  <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full cursor-pointer bg-gradient-to-br from-orange-500 to-orange-400 border-2 border-white shadow-[0_3px_10px_rgba(249,115,22,0.4)] flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                    <FaCamera size={12} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <h2 className="text-lg font-black text-[#1e130e] mb-1">
                  {user.name}
                </h2>
                <p className="text-xs text-[#8a7870] mb-3">{user.email}</p>

                {/* Role badge */}
                <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wide">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-orange-100 to-transparent my-6" />

              {/* Mini stats summary */}
              <SectionLabel>Ringkasan Aktivitas</SectionLabel>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: stats.total_pelatihan, lbl: "Pelatihan" },
                  { val: stats.total_sertifikat, lbl: "Sertifikat" },
                  { val: stats.pelatihan_selesai, lbl: "Selesai" },
                ].map(({ val, lbl }) => (
                  <div
                    key={lbl}
                    className="text-center py-3 px-2 rounded-[14px] bg-[#fffaf5] border border-orange-100/60"
                  >
                    <p className="text-xl font-black text-orange-500 leading-none">
                      {val}
                    </p>
                    <p className="text-[9px] text-[#8a7870] font-semibold mt-1">
                      {lbl}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN ────────────────────────────────── */}
            <div className="flex flex-col gap-6">
              {/* INFO CARD */}
              <div className="bg-white rounded-[24px] p-7 border border-orange-100/80 shadow-[0_4px_24px_rgba(249,115,22,0.04)]">
                <SectionLabel>Informasi Akun</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoField label="Nama Lengkap" value={user.name} />
                  <InfoField label="Username" value={user.username} />
                  <InfoField label="Email" value={user.email} />
                  <InfoField label="Nomor HP" value="08123456789" />
                </div>
              </div>

              {/* STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statItems.map(({ icon, iconColor, value, label, onClick }) => (
                  <StatCard
                    key={label}
                    icon={icon}
                    iconColor={iconColor}
                    value={value}
                    label={label}
                    onClick={onClick}
                  />
                ))}
              </div>

              {/* CERTIFICATE CARD */}
              <div className="bg-white rounded-[24px] p-7 border border-orange-100/80 shadow-[0_4px_24px_rgba(249,115,22,0.04)]">
                <SectionLabel>Sertifikat Saya</SectionLabel>
                {certificates.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {certificates.map((item) => (
                      <CertItem key={item.id} title={item.title} />
                    ))}
                  </div>
                ) : (
                  <EmptyCert />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
