import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ── ICONS ─────────────────────────────────────────────────────────────────────
const ChevronIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const XIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ── FAQ ITEM ──────────────────────────────────────────────────────────────────
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`
        rounded-[20px] border overflow-hidden bg-white
        transition-all duration-300 cursor-pointer
        ${open
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
            ${open
              ? "bg-orange-500 border-orange-500 text-white rotate-180"
              : "bg-orange-50 border-orange-100 text-orange-400"
            }
          `}
        >
          <ChevronIcon />
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48" : "max-h-0"}`}>
        <p className="px-6 pb-5 text-sm text-[#6b5a53] leading-relaxed border-t border-orange-50 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ── SKELETON ──────────────────────────────────────────────────────────────────
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

// ── NOT FOUND ─────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <section className="relative bg-[#fffaf5] py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 9.172a4 4 0 015.656 5.656M15 15l6 6" />
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

// ── REGISTRATION MODAL ────────────────────────────────────────────────────────
function RegisterModal({ sertifikasi, formData, onChange, onSubmit, onClose, submitting }) {
  const isFree = Number(sertifikasi.harga) === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-[28px] w-full max-w-lg shadow-[0_32px_80px_rgba(0,0,0,0.25)] border border-orange-100 overflow-hidden">

        {/* Header */}
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

        {/* Fields */}
        <div className="px-7 py-6 space-y-4">
          {[
            { name: "nama",     type: "text",  placeholder: "Nama Lengkap",   label: "Nama Lengkap" },
            { name: "email",    type: "email", placeholder: "Email aktif",    label: "Email" },
            { name: "nomor_hp", type: "text",  placeholder: "08xxxxxxxxxx",   label: "Nomor HP" },
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
                  placeholder:text-[#c4b0a6] outline-none
                  focus:border-orange-300 focus:ring-4 focus:ring-orange-100/80
                  transition-all duration-300
                "
              />
            </div>
          ))}

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
                  outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100/80
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
            className="flex-1 h-12 rounded-2xl bg-white border border-[#e8d5ca] hover:bg-orange-50 hover:border-orange-200 text-[#3d2418] text-sm font-bold transition-all duration-300"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold shadow-[0_8px_24px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_32px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {submitting ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </div>

      </div>
    </div>
  );
}

// ── FAQ DATA ──────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "Apakah sertifikat ini diakui secara resmi?",
    answer: "Ya, sertifikat yang diterbitkan oleh Disty Academy diakui oleh berbagai perusahaan dan institusi yang bermitra dengan kami.",
  },
  {
    question: "Berapa lama masa berlaku sertifikat?",
    answer: "Sertifikat berlaku seumur hidup dan dapat diverifikasi secara online melalui portal resmi Disty Academy.",
  },
  {
    question: "Apakah ada ujian ulang jika tidak lulus?",
    answer: "Peserta mendapatkan satu kesempatan ujian ulang secara gratis. Kesempatan tambahan dapat dibeli dengan harga yang lebih terjangkau.",
  },
  {
    question: "Bagaimana cara mendaftar sertifikasi?",
    answer: "Klik tombol 'Daftar Sertifikasi', lengkapi formulir pendaftaran, dan lakukan pembayaran. Tim kami akan menghubungi kamu dalam 1x24 jam.",
  },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function CertificationDetailContent() {
  const { slug } = useParams();

  const [sertifikasi, setSertifikasi]   = useState(null);
  const [loading, setLoading]           = useState(true);
  const [showModal, setShowModal]       = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [formData, setFormData]         = useState({
    nama: "",
    email: "",
    nomor_hp: "",
    paymentMethod: "transfer",
  });

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

      const response = await fetch("http://127.0.0.1:8000/api/transaksi/sertifikasi", {
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
      });

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/frontend/sertifikasi/${slug}`
        );
        const result = await response.json();
        setSertifikasi(result.sertifikasi);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  if (loading)     return <SkeletonContent />;
  if (!sertifikasi) return <NotFound />;

  const formatTanggal = (tanggal) =>
    new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="bg-[#fffaf5] pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── LEFT ─────────────────────────────────────── */}
          <div className="lg:col-span-2">

            {/* Title */}
            <div className="mb-8">
              <h1 className="text-5xl font-black text-[#2B1D16] leading-tight">
                {sertifikasi.nama_sertifikasi}
              </h1>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src={sertifikasi.sampul_url || "https://placehold.co/1200x700?text=Sertifikasi"}
                alt={sertifikasi.nama_sertifikasi}
                className="w-full h-[420px] object-cover rounded-[32px]"
              />
            </div>

            {/* Description */}
            <div className="mt-14">
              <h3 className="text-3xl font-black text-[#2B1D16] mb-5">
                Deskripsi Sertifikasi
              </h3>
              <p className="text-lg leading-relaxed text-[#6b625d] whitespace-pre-line">
                {sertifikasi.deskripsi}
              </p>
            </div>

          </div>
          {/* ── end LEFT ──────────────────────────────────── */}

          {/* ── RIGHT ────────────────────────────────────── */}
          <div>
            <div className="sticky top-28 bg-white rounded-[32px] p-8 border border-orange-100 shadow-xl">

              {/* Price */}
              <h3 className="text-3xl font-black text-orange-500">
                {Number(sertifikasi.harga) === 0
                  ? "Gratis"
                  : `Rp${Number(sertifikasi.harga).toLocaleString("id-ID")}`}
              </h3>

              {/* Info rows */}
              <div className="mt-8 space-y-4">

                <div>
                  <p className="text-sm text-gray-500">Tanggal Sertifikasi</p>
                  <h4 className="font-bold">{formatTanggal(sertifikasi.tanggal_sertifikasi)}</h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Deadline Pendaftaran</p>
                  <h4 className="font-bold">
                    {sertifikasi.registration_deadline
                      ? formatTanggal(sertifikasi.registration_deadline)
                      : "-"}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Mode</p>
                  <h4 className="font-bold capitalize">{sertifikasi.mode}</h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <h4 className="font-bold">{sertifikasi.lokasi}</h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Penyelenggara</p>
                  <h4 className="font-bold">{sertifikasi.penyelenggara}</h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Kuota</p>
                  <h4 className="font-bold">
                    {sertifikasi.peserta_terdaftar || 0} / {sertifikasi.kuota} Peserta
                  </h4>
                </div>

              </div>
              {/* end space-y-4 */}

              {/* FAQ */}
              <div className="mt-8">
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
            {/* end sticky card */}
          </div>
          {/* ── end RIGHT ─────────────────────────────────── */}

        </div>
        {/* end grid */}
      </div>
      {/* end container */}

      {/* Modal */}
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

    </section>
  );
}