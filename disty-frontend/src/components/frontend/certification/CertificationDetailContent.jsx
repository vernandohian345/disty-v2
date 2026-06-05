import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ── ICONS (sama persis dengan BootcampDetailContent) ─────────────────────────
const ClockIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6l4 2M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
    />
  </svg>
);
const GlobeIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const CalendarIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const CheckIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const ArrowIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 8l4 4-4 4M3 12h18"
    />
  </svg>
);
const ChevronIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const XIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// ── REUSABLE: SECTION HEADING (identik dengan BootcampDetailContent) ──────────
function SectionHeading({
  eyebrow,
  line1,
  line2Stroke,
  line2Grad,
  size = "text-[clamp(1.5rem,3vw,2.2rem)]",
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-6 bg-orange-400 shrink-0" />
        <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          {eyebrow}
        </span>
      </div>
      <h2 className={`${size} font-black leading-[1.04] tracking-tight`}>
        {line1 && <span className="block text-[#1e130e]">{line1}</span>}
        {line2Stroke && (
          <span
            className="block text-transparent"
            style={{ WebkitTextStroke: "1.5px #f97316" }}
          >
            {line2Stroke}
          </span>
        )}
        {line2Grad && (
          <span className="block bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
            {line2Grad}
          </span>
        )}
      </h2>
    </div>
  );
}

// ── REUSABLE: DIVIDER (identik dengan BootcampDetailContent) ─────────────────
const Divider = () => (
  <div className="h-px bg-gradient-to-r from-orange-100 to-transparent my-14" />
);

// ── REUSABLE: FAQ ITEM (identik dengan BootcampDetailContent) ────────────────
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`
        rounded-[20px] border overflow-hidden bg-white
        transition-all duration-300 cursor-pointer
        ${
          open
            ? "border-orange-200 shadow-[0_8px_28px_rgba(249,115,22,0.09)]"
            : "border-orange-100/80 hover:border-orange-200"
        }
      `}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <h3 className="text-sm font-black text-[#1e130e] leading-snug select-none">
          {question}
        </h3>
        <div
          className={`
          w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 border
          transition-all duration-300
          ${open ? "bg-orange-500 border-orange-500 text-white rotate-180" : "bg-orange-50 border-orange-100 text-orange-400"}
        `}
        >
          <ChevronIcon />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 text-sm text-[#6b5a53] leading-relaxed border-t border-orange-50 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ── REUSABLE: CONTENT BLOCK (untuk deskripsi, materi, syarat plain text) ─────
function ContentBlock({ text }) {
  return (
    <div
      className="
      mt-7 p-6 rounded-[20px]
      bg-white border border-orange-100/80
      text-sm text-[#6b5a53] leading-[1.85]
      whitespace-pre-line
    "
    >
      {text}
    </div>
  );
}

// ── SIDEBAR CARD (diadaptasi untuk data sertifikasi) ─────────────────────────
function SidebarCard({ sertifikasi, onDaftar }) {
  const isFree = Number(sertifikasi.harga) === 0;
  const price = isFree
    ? "Gratis"
    : `Rp ${Number(sertifikasi.harga).toLocaleString("id-ID")}`;

  const infoRows = [
    {
      icon: <CalendarIcon />,
      label: "Tanggal Pelaksanaan",
      value: new Date(
        sertifikasi.tanggal_sertifikasi
      ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },

    {
      icon: <CheckIcon />,
      label: "Deadline Pendaftaran",
      value: new Date(
        sertifikasi.deadline_pendaftaran
      ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },

    {
      icon: <GlobeIcon />,
      label: "Penyelenggara",
      value: sertifikasi.penyelenggara,
    },
  ];

  const checks = [
    "Sertifikat digital resmi",
    "Mendapatkan skill industri",
    "Bimbingan instruktur bersertifikat",
    "Berlaku internasional",
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* ── PRICE & INFO CARD ─────────────────────────────── */}
      <div className="bg-white border border-orange-100 rounded-[28px] p-7 shadow-sm">
        <p className="text-[9px] text-[#b07040] font-bold uppercase tracking-[0.16em] mb-2">
          Harga Sertifikasi
        </p>

        <p
          className={`text-[30px] font-black leading-none mb-4 ${isFree ? "text-emerald-600" : "text-orange-500"}`}
        >
          {price}
        </p>

        {/* Open badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3.5 py-2 mb-6">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-emerald-600 text-[10px] font-bold">
            Pendaftaran Dibuka
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-orange-100 to-transparent mb-6" />

        {/* Info rows */}
        <div className="space-y-4">
          {infoRows.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 text-[#8a7870] text-sm">
                <div className="w-7 h-7 rounded-[9px] bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-orange-300">
                  {icon}
                </div>
                {label}
              </div>
              <span className="text-sm font-black text-[#1e130e] text-right">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-orange-100 to-transparent my-6" />

        {/* CTA Primary */}
        <Link
          to={`/checkout/sertifikasi/${sertifikasi.slug}`}
          className="
            w-full flex items-center justify-between
            h-12 px-5 rounded-2xl mb-3
            bg-gradient-to-r from-orange-500 to-orange-400
            hover:from-orange-400 hover:to-amber-400
            text-white text-sm font-bold
            shadow-[0_10px_28px_rgba(249,115,22,0.35)]
            hover:shadow-[0_14px_36px_rgba(249,115,22,0.5)]
            hover:-translate-y-0.5
            transition-all duration-300 group
          "
        >
          <span>Daftar Sertifikasi</span>
          <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowIcon />
          </div>
        </Link>

        {/* CTA WhatsApp */}
        <a
          href={`https://wa.me/6281234567890?text=Halo Disty Academy, saya ingin bertanya tentang sertifikasi ${encodeURIComponent(sertifikasi.nama_sertifikasi)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full flex items-center justify-center gap-2.5
            h-12 px-5 rounded-2xl
            bg-white border border-[#e8d5ca]
            hover:bg-orange-50 hover:border-orange-200
            text-[#3d2418] text-sm font-bold
            transition-all duration-300
          "
        >
          <WhatsAppIcon />
          Hubungi via WhatsApp
        </a>
      </div>

      {/* ── CHECKLIST CARD ────────────────────────────────── */}
      <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-[24px] p-6">
        <p className="text-[9px] text-[#b07040] font-bold uppercase tracking-[0.14em] mb-4">
          Yang Kamu Dapatkan
        </p>
        <div className="space-y-3">
          {checks.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-orange-500/10 border border-orange-500/25 flex items-center justify-center shrink-0 text-orange-500">
                <CheckIcon />
              </div>
              <span className="text-xs text-[#4a3830] font-semibold">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ CARD ──────────────────────────────────────── */}
      <div className="bg-white border border-orange-100 rounded-[24px] p-6">
        <p className="text-[9px] text-[#b07040] font-bold uppercase tracking-[0.14em] mb-4">
          FAQ
        </p>
        <div className="space-y-2">
          {FAQ_ITEMS.map((faq, i) => (
            <FaqItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SKELETON (identik strukturnya dengan BootcampDetailContent) ───────────────
function SkeletonContent() {
  return (
    <section className="relative bg-[#fffaf5] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 animate-pulse">
          <div className="lg:col-span-2 space-y-5">
            <div className="h-[300px] bg-orange-50 rounded-[28px]" />
            <div className="h-3 w-32 bg-orange-100 rounded-full mt-8" />
            <div className="h-9 w-3/5 bg-orange-50 rounded-xl" />
            <div className="h-9 w-2/5 bg-orange-50 rounded-xl" />
            <div className="h-4 w-full bg-gray-100 rounded-lg" />
            <div className="h-4 w-5/6 bg-gray-100 rounded-lg" />
            <div className="h-4 w-4/5 bg-gray-100 rounded-lg" />
          </div>
          <div className="bg-white rounded-[28px] border border-orange-100 h-96" />
        </div>
      </div>
    </section>
  );
}

// ── NOT FOUND ────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <section className="relative bg-[#fffaf5] py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-7 h-7 text-orange-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 9.172a4 4 0 015.656 5.656M15 15l6 6"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-[#1e130e] mb-3">
          Sertifikasi Tidak Ditemukan
        </h2>
        <p className="text-sm text-[#8a7870] mb-8">
          Program yang kamu cari tidak tersedia.
        </p>
        <Link
          to="/sertifikasi"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold transition-all duration-300"
        >
          Lihat Semua Sertifikasi
        </Link>
      </div>
    </section>
  );
}

// ── REGISTRATION MODAL (backend logic dipertahankan, UI ditingkatkan) ─────────
function RegisterModal({
  sertifikasi,
  formData,
  onChange,
  onSubmit,
  onClose,
  submitting,
}) {
  const isFree = Number(sertifikasi.harga) === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="
        bg-white rounded-[28px] w-full max-w-lg
        shadow-[0_32px_80px_rgba(0,0,0,0.25)]
        border border-orange-100
        overflow-hidden
      "
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-orange-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-5 bg-orange-400" />
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.16em]">
                Formulir Pendaftaran
              </span>
            </div>
            <h2 className="text-lg font-black text-[#1e130e] leading-tight">
              {sertifikasi.nama_sertifikasi}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400 hover:bg-orange-100 transition-colors shrink-0"
          >
            <XIcon />
          </button>
        </div>

        {/* Form fields */}
        <div className="px-7 py-6 space-y-4">
          {[
            {
              name: "nama",
              type: "text",
              placeholder: "Nama Lengkap",
              label: "Nama Lengkap",
            },
            {
              name: "email",
              type: "email",
              placeholder: "Email aktif",
              label: "Email",
            },
            {
              name: "nomor_hp",
              type: "text",
              placeholder: "08xxxxxxxxxx",
              label: "Nomor HP",
            },
          ].map(({ name, type, placeholder, label }) => (
            <div key={name}>
              <p className="text-[10px] font-bold text-[#b07040] uppercase tracking-[0.1em] mb-1.5">
                {label}
              </p>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={onChange}
                placeholder={placeholder}
                className="
                  w-full h-12 rounded-2xl
                  border border-orange-100 bg-[#fafafa]
                  px-4 text-sm font-medium text-[#1e130e]
                  placeholder:text-[#c4b0a6]
                  outline-none
                  focus:border-orange-300 focus:ring-4 focus:ring-orange-100/80
                  transition-all duration-300
                "
              />
            </div>
          ))}

          {/* Payment method — hanya tampil jika berbayar (logika asli dipertahankan) */}
          {!isFree && (
            <div>
              <p className="text-[10px] font-bold text-[#b07040] uppercase tracking-[0.1em] mb-1.5">
                Metode Pembayaran
              </p>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={onChange}
                className="
                  w-full h-12 rounded-2xl
                  border border-orange-100 bg-[#fafafa]
                  px-4 text-sm font-medium text-[#1e130e]
                  outline-none
                  focus:border-orange-300 focus:ring-4 focus:ring-orange-100/80
                  transition-all duration-300 appearance-none cursor-pointer
                "
              >
                <option value="transfer">Transfer Bank</option>
                <option value="ewallet">E-Wallet</option>
              </select>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-7 pb-7 flex gap-3">
          <button
            onClick={onClose}
            className="
              flex-1 h-12 rounded-2xl
              bg-white border border-[#e8d5ca]
              hover:bg-orange-50 hover:border-orange-200
              text-[#3d2418] text-sm font-bold
              transition-all duration-300
            "
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="
              flex-1 h-12 rounded-2xl
              bg-gradient-to-r from-orange-500 to-orange-400
              hover:from-orange-400 hover:to-amber-400
              disabled:opacity-60 disabled:cursor-not-allowed
              text-white text-sm font-bold
              shadow-[0_8px_24px_rgba(249,115,22,0.35)]
              hover:shadow-[0_12px_32px_rgba(249,115,22,0.5)]
              hover:-translate-y-0.5
              transition-all duration-300
            "
          >
            {submitting ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── FAQ DATA (khusus sertifikasi) ─────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "Apakah sertifikat ini diakui secara resmi?",
    answer:
      "Ya, sertifikat yang diterbitkan oleh Disty Academy diakui oleh berbagai perusahaan dan institusi yang bermitra dengan kami.",
  },
  {
    question: "Berapa lama masa berlaku sertifikat?",
    answer:
      "Sertifikat berlaku seumur hidup dan dapat diverifikasi secara online melalui portal resmi Disty Academy.",
  },
  {
    question: "Apakah ada ujian ulang jika tidak lulus?",
    answer:
      "Peserta mendapatkan satu kesempatan ujian ulang secara gratis. Kesempatan tambahan dapat dibeli dengan harga yang lebih terjangkau.",
  },
  {
    question: "Bagaimana cara mendaftar sertifikasi?",
    answer:
      "Klik tombol 'Daftar Sertifikasi', lengkapi formulir pendaftaran, dan lakukan pembayaran. Tim kami akan menghubungi kamu dalam 1x24 jam.",
  },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function CertificationDetailContent() {
  const { slug } = useParams();

  // ── STATE (identik dengan aslinya, tidak diubah) ───────────────────────────
  const [sertifikasi, setSertifikasi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomor_hp: "",
    paymentMethod: "transfer",
  });

  // ── HANDLERS (identik dengan aslinya, tidak diubah) ────────────────────────
  useEffect(() => {
    fetchDetail();
  }, [slug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Silakan login terlebih dahulu");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/transaksi/sertifikasi",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sertifikasi_id: sertifikasi.id,
            nama: formData.nama,
            email: formData.email,
            nomor_hp: formData.nomor_hp,
            paymentMethod: formData.paymentMethod,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Terjadi kesalahan");
        return;
      }

      if (result.status === "success") {
        setShowModal(false);

        if (result.kategori === "gratis" && result.link_grup) {
          alert("Pendaftaran berhasil");
          window.open(result.link_grup, "_blank");
        } else {
          alert("Pendaftaran berhasil, silakan tunggu proses verifikasi.");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchDetail = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/frontend/sertifikasi/${slug}`,
      );
      const result = await response.json();
      setSertifikasi(result.sertifikasi);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ── GUARDS ─────────────────────────────────────────────────────────────────
  if (loading) return <SkeletonContent />;
  if (!sertifikasi) return <NotFound />;

  return (
    <>
      <section className="relative overflow-hidden bg-[#fffaf5]">
        {/* Ambient glows — sama dengan BootcampDetailContent */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-orange-200/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-80 left-0 w-[360px] h-[360px] bg-amber-200/15 blur-[100px] rounded-full pointer-events-none" />

        {/* Top rule */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-start">
            {/* ── LEFT CONTENT (lg:col-span-2) ──────────────── */}
            <div className="lg:col-span-2">
              {/* Cover image */}
              <div className="relative rounded-[28px] overflow-hidden h-[320px] lg:h-[380px] mb-12 shadow-[0_16px_48px_rgba(249,115,22,0.1)]">
                <img
                  src={`http://127.0.0.1:8000/uploads/sertifikasi/${sertifikasi.sampul}`}
                  alt={sertifikasi.nama_sertifikasi}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Category pill on image */}
                <div className="absolute bottom-5 left-5">
                  <span
                    className="
                    inline-flex items-center gap-2
                    bg-white/15 backdrop-blur-sm border border-white/20
                    text-white text-[10px] font-bold uppercase tracking-[0.12em]
                    px-4 py-2 rounded-full
                  "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    {sertifikasi.kategori}
                  </span>
                </div>
              </div>

              {/* ── DESKRIPSI ──────────────────────────────── */}
              <div>
                <SectionHeading
                  eyebrow="Tentang Sertifikasi"
                  line1="Raih Kompetensi,"
                  line2Stroke="Buktikan Keahlian"
                  line2Grad="Secara Profesional"
                />
                <ContentBlock text={sertifikasi.deskripsi} />
              </div>

              <Divider />

            </div>

            {/* ── RIGHT SIDEBAR ─────────────────────────────── */}
            <div className="sticky top-28">
              <SidebarCard
                sertifikasi={sertifikasi}
                onDaftar={() => setShowModal(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MODAL (backend logic tidak diubah, UI ditingkatkan) ── */}
      {showModal && (
        <RegisterModal
          sertifikasi={sertifikasi}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleRegister}
          onClose={() => setShowModal(false)}
          submitting={submitting}
        />
      )}
    </>
  );
}
