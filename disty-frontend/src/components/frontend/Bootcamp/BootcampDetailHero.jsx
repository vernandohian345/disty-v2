import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// ── ICONS ──────────────────────────────────────────────────
const ClockIcon = () => (
  <svg
    className="w-4 h-4"
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
const BarIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2z"
    />
  </svg>
);
const UsersIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a4 4 0 0 0-5-3.87M9 20H4v-2a4 4 0 0 1 5-3.87m6-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
    />
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
    className="w-3 h-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const CheckIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── SKELETON ───────────────────────────────────────────────
function SkeletonHero() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa]">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
        <div className="relative overflow-hidden rounded-[36px] min-h-[680px] bg-[#1a0f0a] border border-white/[0.07] animate-pulse">
          {/* Fake thumbnail gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a1508]/80 via-[#1a0d06]/60 to-[#0f0704]/40" />
          <div className="relative z-10 flex items-center min-h-[680px] px-6 py-20 sm:px-10 lg:px-14">
            <div className="max-w-xl space-y-5 w-full">
              <div className="h-3 w-28 bg-white/10 rounded-full" />
              <div className="space-y-3">
                <div className="h-10 w-3/4 bg-white rounded-xl" />
                <div className="h-10 w-2/3 bg-white/[0.07] rounded-xl" />
              </div>
              <div className="h-4 w-full bg-white/[0.07] rounded-lg" />
              <div className="h-4 w-5/6 bg-white/[0.07] rounded-lg" />
              <div className="flex gap-2 pt-2">
                {[80, 72, 90, 68].map((w, i) => (
                  <div
                    key={i}
                    className="h-7 bg-white/[0.07] rounded-full"
                    style={{ width: `${w}px` }}
                  />
                ))}
              </div>
              <div className="flex gap-6 pt-4">
                <div className="h-12 w-32 bg-white/[0.07] rounded-xl" />
                <div className="h-12 w-32 bg-white/[0.07] rounded-xl" />
                <div className="h-12 w-32 bg-white/[0.07] rounded-xl" />
              </div>
              <div className="flex gap-3 pt-2">
                <div className="h-12 flex-1 bg-orange-500/20 rounded-2xl" />
                <div className="h-12 flex-1 bg-white/[0.07] rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NOT FOUND ──────────────────────────────────────────────
function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[#0f0a07]">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
        <div className="relative overflow-hidden rounded-[36px] min-h-[480px] bg-[#1a0f0a] border border-white/[0.07] flex items-center justify-center">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full" />
          <div className="relative z-10 text-center px-6">
            <div className="w-16 h-16 rounded-3xl bg-white/[0.07] border border-white/[0.09] flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-7 h-7 text-orange-400/60"
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
            <h1 className="text-2xl font-black text-white mb-3">
              Pelatihan Tidak Ditemukan
            </h1>
            <p className="text-white/45 text-sm mb-8">
              Program yang kamu cari tidak tersedia atau telah dihapus.
            </p>
            <Link
              to="/program"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold transition-all duration-300"
            >
              Lihat Semua Program
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────
export default function BootcampDetailHero() {
  const { slug } = useParams();
  const [bootcamp, setBootcamp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBootcamp();
  }, [slug]);

  const fetchBootcamp = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/frontend/pelatihan/${slug}`,
      );
      setBootcamp(response.data.pelatihan);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SkeletonHero />;
  if (!bootcamp) return <NotFound />;

  const isFree = Number(bootcamp.harga) === 0 || bootcamp.kategori === "gratis";
  const price = isFree
    ? "Gratis"
    : `Rp ${Number(bootcamp.harga).toLocaleString("id-ID")}`;

  // Feature tags — use bootcamp.tools if API returns it, else show from kategori
  const featureTags =
    Array.isArray(bootcamp.tools) && bootcamp.tools.length
      ? bootcamp.tools
      : null;

  const metaItems = [
    {
      icon: <ClockIcon />,
      color: "bg-orange-500/20 border-orange-500/30 text-orange-300",
      label: "Durasi",
      value: bootcamp.durasi,
    },
    {
      icon: <BarIcon />,
      color: "bg-sky-400/15    border-sky-400/25    text-sky-300",
      label: "Level",
      value: bootcamp.level,
    },
    ...(bootcamp.jumlah_peserta
      ? [
          {
            icon: <UsersIcon />,
            color: "bg-emerald-400/15 border-emerald-400/25 text-emerald-300",
            label: "Peserta",
            value: `${bootcamp.jumlah_peserta} Aktif`,
          },
        ]
      : []),
  ];

  const enrollRows = [
    { label: "Durasi", value: bootcamp.durasi },
    { label: "Level", value: bootcamp.level },
    ...(bootcamp.jumlah_peserta
      ? [{ label: "Peserta Aktif", value: `${bootcamp.jumlah_peserta} Orang` }]
      : []),
    { label: "Sertifikat", value: "✓ Tersedia" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0f0a07]">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
        {/* ── SHELL ──────────────────────────────────────── */}
        <div
          className="
          relative overflow-hidden rounded-[36px]
          min-h-[580px] lg:min-h-[640px]
          bg-[#1a0f0a]
          border border-white/[0.07]
          shadow-[0_32px_100px_rgba(0,0,0,0.55)]
        "
        >
          {/* ── BACKGROUND ───────────────────────────────── */}
          <div className="absolute inset-0">
            <img
              src={bootcamp.thumbnail_url}
              alt={bootcamp.title}
              className="w-full h-full object-cover object-center scale-105 opacity-40"
            />
            {/* Directional overlay — dense left, fade right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0503]/97 via-[#0d0503]/82 to-[#0d0503]/20" />
            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0503]/60 via-transparent to-transparent" />
          </div>

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-screen pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
          />

          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-[560px] h-[560px] bg-orange-600/18 blur-[110px] rounded-full pointer-events-none animate-[pulse_7s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 right-48 w-[300px] h-[300px] bg-amber-400/8 blur-[80px] rounded-full pointer-events-none" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none">
            <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          {/* Diagonal accent */}
          <div className="absolute top-0 right-[36%] w-px h-full bg-gradient-to-b from-transparent via-orange-500/12 to-transparent -rotate-[8deg] origin-top pointer-events-none" />

          {/* ── MAIN LAYOUT ──────────────────────────────── */}
          <div
            className="
            relative z-10
            flex flex-col lg:flex-row
            items-start lg:items-center
            justify-between
            gap-8
            min-h-[580px] lg:min-h-[640px]
            px-6 pt-24 pb-14
            sm:px-10
            lg:px-14 lg:pt-0
          "
          >
            {/* ── CONTENT LEFT ─────────────────────────── */}
            <div className="flex-1 max-w-[580px] pt-8">
              {/* Category pill */}
              <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] rounded-full px-4 py-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.1em] ">
                  {bootcamp.kategori}
                </span>
              </div>

              {/* Title — 3-line mixed treatment */}
              <h1
                className="font-white leading-[1.01] tracking-tight mb-5"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
              >
                {/* Attempt to split title for visual interest */}
                {(() => {
                  const words = bootcamp.title.split(" ");
                  const mid = Math.ceil(words.length / 2);
                  const line1 = words.slice(0, mid).join(" ");
                  const line2 = words.slice(mid).join(" ");
                  return line2 ? (
                    <>
                      <span className="block text-white">{line1}</span>
                      <span
                        className="block text-transparent"
                        style={{
                          WebkitTextStroke: "1.5px rgba(251,146,60,0.8)",
                        }}
                      >
                        {line2}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block text-white">{line1}</span>
                    </>
                  );
                })()}
              </h1>

              <div className="flex flex-col justify-between flex-1 max-w-[580px] self-stretch"></div>

              {/* Feature tags (optional — only if API returns them) */}
              {featureTags && (
                <div className="flex flex-wrap gap-2 mb-7">
                  {featureTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.05] text-white/55 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta items */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                {metaItems.map(({ icon, color, label, value }, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-[10px] flex items-center justify-center border ${color}`}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="text-[9px] text-white/35 uppercase tracking-[0.1em] font-semibold">
                        {label}
                      </p>
                      <p className="text-[13px] text-white font-black leading-none mt-0.5">
                        {value}
                      </p>
                    </div>
                    {i < metaItems.length - 1 && (
                      <div className="w-px h-7 bg-white/10 ml-2" />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/checkout/${bootcamp.slug}`}
                  className="
                    group flex items-center justify-between
                    h-13 px-12 rounded-2xl flex-1
                    bg-gradient-to-r from-orange-500 to-orange-400
                    hover:from-orange-400 hover:to-amber-400
                    text-white text-sm font-bold
                    shadow-[0_12px_36px_rgba(249,115,22,0.38)]
                    hover:shadow-[0_16px_40px_rgba(249,115,22,0.55)]
                    hover:-translate-y-0.5
                    transition-all duration-300
                  "
                >
                  <span>Daftar Sekarang</span>
                  <div className="w-5 h-10 rounded-xl bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowIcon />
                  </div>
                </Link>

                <a
                  href={`https://wa.me/6281234567890?text=Halo Disty Academy, saya ingin bertanya tentang pelatihan ${encodeURIComponent(bootcamp.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center justify-center gap-2.5
                    h-13 px-6 rounded-2xl
                    border border-white/[0.15] bg-white/[0.07]
                    hover:bg-white/[0.12] hover:border-white/[0.25]
                    text-white hover:text-white
                    text-sm font-bold
                    backdrop-blur-sm
                    transition-all duration-300
                  "
                >
                  <WhatsAppIcon />
                  <span>Tanya via WhatsApp</span>
                </a>
              </div>

              {/* What you'll get mini card */}
              <div
                className=" mt-4
                bg-white/[0.05] backdrop-blur-xl
                border border-white/[0.08] rounded-2xl px-5 py-4
              "
              >
                <p className="text-[9px] text-white/30 uppercase tracking-[0.12em] font-bold mb-3">
                  Yang Kamu Dapatkan
                </p>
                {[
                  "Akses materi seumur hidup",
                  "Sertifikat kelulusan",
                  "Mentoring dengan instruktur",
                  "Project portofolio nyata",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 mb-2.5 last:mb-0"
                  >
                    <div className="w-5 h-5 rounded-md bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0 text-orange-400">
                      <CheckIcon />
                    </div>
                    <span className="text-[11px] text-white/55 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── ENROLLMENT CARD RIGHT (desktop only) ─── */}
            <div className="hidden lg:flex flex-col gap-3 w-64 shrink-0">
              {/* Price card */}
              <div
                className="
                bg-white/[0.07] backdrop-blur-2xl
                border border-white/[0.1] rounded-3xl p-6
              "
              >
                <p className="text-[9px] text-white/35 uppercase tracking-[0.14em] font-bold mb-2">
                  Harga Program
                </p>
                <p
                  className={`text-[28px] font-black leading-none mb-4 ${isFree ? "text-emerald-400" : "text-orange-400"}`}
                >
                  {price}
                </p>

                {/* Open badge */}
                <div className="flex items-center gap-2 bg-emerald-500/[0.12] border border-emerald-500/25 rounded-full px-3 py-2 mb-5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-emerald-400 text-[10px] font-bold">
                    Pendaftaran Dibuka
                  </span>
                </div>

                {/* Detail rows */}
                <div className="space-y-3">
                  {enrollRows.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[11px] text-orange-500   font-medium">
                        {label}
                      </span>
                      <span className="text-[11px] text-white/80 font-bold">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-white/[0.07]" />

                <p className="text-[10px] text-white/25 text-center leading-relaxed">
                  Harga dapat berubah sewaktu-waktu.
                  <br />
                  Segera daftarkan dirimu!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
