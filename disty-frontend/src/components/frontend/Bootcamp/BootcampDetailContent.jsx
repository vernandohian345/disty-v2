import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ── ICONS ───────────────────────────────────────────────────────────────────
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
const BarIcon = () => (
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
      d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2z"
    />
  </svg>
);
const UsersIcon = () => (
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
      d="M17 20h5v-2a4 4 0 0 0-5-3.87M9 20H4v-2a4 4 0 0 1 5-3.87m6-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
    />
  </svg>
);
const CertIcon = () => (
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
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z"
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

// ── HELPERS ─────────────────────────────────────────────────────────────────
const LEVEL_DOTS = {
  pemula: 1,
  menengah: 2,
  lanjutan: 3,
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

function getLevelDots(level = "") {
  return LEVEL_DOTS[level.toLowerCase()] ?? 1;
}

// ── SUB-COMPONENTS ──────────────────────────────────────────────────────────

/** Section eyebrow + heading block */
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

/** Horizontal divider */
const Divider = () => (
  <div className="h-px bg-gradient-to-r from-orange-100 to-transparent my-14" />
);

/** Benefit card */
function BenefitCard({ text }) {
  return (
    <div
      className="
      flex items-start gap-3.5 p-5 rounded-[20px]
      border border-orange-100/80
      bg-gradient-to-br from-white to-[#fffbf6]
      hover:border-orange-200 hover:shadow-[0_8px_24px_rgba(249,115,22,0.07)]
      hover:-translate-y-0.5
      transition-all duration-300
    "
    >
      <div
        className="
        w-9 h-9 rounded-[11px] shrink-0
        bg-gradient-to-br from-orange-500 to-orange-400
        shadow-[0_4px_12px_rgba(249,115,22,0.3)]
        flex items-center justify-center
      "
      >
        <CheckIcon />
      </div>
      <p className="text-sm text-[#2d1a10] font-semibold leading-relaxed mt-1">
        {text}
      </p>
    </div>
  );
}

/** FAQ accordion item */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`
        rounded-[20px] border overflow-hidden
        transition-all duration-300 cursor-pointer
        ${
          open
            ? "border-orange-200 shadow-[0_8px_28px_rgba(249,115,22,0.09)]"
            : "border-orange-100/80 hover:border-orange-200"
        }
        bg-white
      `}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <h3 className="text-sm font-black text-[#1e130e] leading-snug select-none">
          {question}
        </h3>
        <div
          className={`
          w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0
          border transition-all duration-300
          ${
            open
              ? "bg-orange-500 border-orange-500 text-white rotate-180"
              : "bg-orange-50 border-orange-100 text-orange-400"
          }
        `}
        >
          <ChevronIcon />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-350 ease-in-out ${open ? "max-h-48" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 text-sm text-[#6b5a53] leading-relaxed border-t border-orange-50 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

/** Related bootcamp card */
function RelatedCard({ item }) {
  return (
    <div
      className="
      group bg-white rounded-[24px] overflow-hidden
      border border-orange-100/80
      hover:border-orange-200
      hover:-translate-y-2
      hover:shadow-[0_20px_50px_rgba(249,115,22,0.11)]
      transition-all duration-500
    "
    >
      <div className="relative h-[164px] overflow-hidden">
        <img
          src={item.thumbnail_url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <span className="absolute bottom-3.5 left-3.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/90 bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
          {item.kategori}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-[15px] font-black text-[#1e130e] leading-snug mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-xs text-[#8a7870] leading-relaxed line-clamp-2 mb-4">
          {item.short_description}
        </p>
        <Link
          to={`/pelatihan/${item.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 group-hover:gap-3 transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          Lihat Detail <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

/** Sidebar sticky info + CTA card */
function SidebarCard({ bootcamp }) {
  const isFree = Number(bootcamp.harga) === 0 || bootcamp.kategori === "gratis";
  const price = isFree
    ? "Gratis"
    : `Rp ${Number(bootcamp.harga).toLocaleString("id-ID")}`;
  const dots = getLevelDots(bootcamp.level);

  const infoRows = [
    {
      icon: <ClockIcon />,
      label: "Durasi",
      value: bootcamp.durasi,
      extra: null,
    },
    { icon: <BarIcon />, label: "Level", value: bootcamp.level, extra: dots },
    ...(bootcamp.jumlah_peserta
      ? [
          {
            icon: <UsersIcon />,
            label: "Peserta",
            value: `${bootcamp.jumlah_peserta} Aktif`,
            extra: null,
          },
        ]
      : []),
    {
      icon: <CertIcon />,
      label: "Sertifikat",
      value: "Tersedia",
      valueClass: "text-emerald-600",
    },
  ];

  const checks = [
    "Akses materi seumur hidup",
    "Sertifikat kelulusan",
    "Mentoring instruktur",
    "Project portofolio nyata",
    "Update materi gratis",
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* PRICE & INFO CARD */}
      <div className="bg-white border border-orange-100 rounded-[28px] p-7 shadow-sm">
        <p className="text-[9px] text-[#b07040] font-bold uppercase tracking-[0.16em] mb-2">
          Harga Program
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
          {infoRows.map(({ icon, label, value, extra, valueClass }) => (
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
              <div className="text-right">
                <span
                  className={`text-sm font-black ${valueClass ?? "text-[#1e130e]"}`}
                >
                  {value}
                </span>
                {/* Level progress dots */}
                {label === "Level" && extra && (
                  <div className="flex gap-1 mt-1 justify-end">
                    {[1, 2, 3].map((d) => (
                      <div
                        key={d}
                        className={`w-4 h-1 rounded-full ${d <= extra ? "bg-orange-400" : "bg-orange-100"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-orange-100 to-transparent my-6" />

        {/* CTAs */}
        <Link
          to={`/checkout/${bootcamp.slug}`}
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
          <span>Daftar Sekarang</span>
          <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowIcon />
          </div>
        </Link>

        <a
          href={`https://wa.me/6281234567890?text=Halo Disty Academy, saya ingin bertanya tentang pelatihan ${encodeURIComponent(bootcamp.title)}`}
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

      {/* CHECKLIST CARD */}
      <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-[24px] p-6">
        <p className="text-[9px] text-[#b07040] font-bold uppercase tracking-[0.14em] mb-4">
          Yang Kamu Dapatkan
        </p>
        <div className="space-y-3">
          {checks.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-orange-500/12 border border-orange-500/25 flex items-center justify-center shrink-0 text-orange-500">
                <CheckIcon />
              </div>
              <span className="text-xs text-[#4a3830] font-semibold">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ CARD */}
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

/** Loading skeleton */
function SkeletonContent() {
  return (
    <section className="relative bg-[#fffaf5] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 animate-pulse">
          <div className="lg:col-span-2 space-y-5">
            <div className="h-3 w-32 bg-orange-100 rounded-full" />
            <div className="h-10 w-3/5 bg-orange-50 rounded-xl" />
            <div className="h-10 w-2/5 bg-orange-50 rounded-xl" />
            <div className="h-4 w-full bg-gray-100 rounded-lg" />
            <div className="h-4 w-5/6 bg-gray-100 rounded-lg" />
            <div className="h-4 w-4/5 bg-gray-100 rounded-lg" />
          </div>
          <div className="bg-white rounded-[28px] border border-orange-100 h-80" />
        </div>
      </div>
    </section>
  );
}

// ── FAQ DATA ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "Apakah pelatihan dapat diakses selamanya?",
    answer:
      "Ya, seluruh materi pelatihan dapat diakses kapan saja dan selamanya setelah peserta berhasil mendaftar dan melakukan pembayaran.",
  },
  {
    question: "Apakah peserta mendapatkan sertifikat?",
    answer:
      "Peserta akan mendapatkan sertifikat digital kelulusan setelah menyelesaikan seluruh materi dan tugas pelatihan yang tersedia.",
  },
  {
    question: "Bagaimana sistem pembelajaran dilakukan?",
    answer:
      "Pembelajaran dilakukan secara online melalui video HD, PDF materi, dan latihan praktik yang dapat diakses kapan saja dengan jadwal yang fleksibel.",
  },
  {
    question: "Apakah terdapat tugas dan project praktik?",
    answer:
      "Ya, setiap pelatihan memiliki tugas, kuis, dan project nyata untuk membantu peserta memahami materi lebih mendalam dan membangun portofolio.",
  },
];

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function BootcampDetailContent() {
  const { slug } = useParams();
  const [bootcamp, setBootcamp] = useState(null);
  const [relatedBootcamps, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBootcamp();
  }, [slug]);

  const fetchBootcamp = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/api/frontend/pelatihan/${slug}`,
      );
      const result = await response.json();
      setBootcamp(result.pelatihan);
      setRelated(result.rekomendasi || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SkeletonContent />;
  if (!bootcamp) return null;

  return (
    <section className="relative overflow-hidden bg-[#fffaf5]">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-orange-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-80 left-0 w-[360px] h-[360px] bg-amber-200/15 blur-[100px] rounded-full pointer-events-none" />

      {/* Top rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-start">
          {/* ── LEFT CONTENT ──────────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* ABOUT */}
            <div>
              <SectionHeading
                eyebrow="Tentang Pelatihan"
                line1="Pelajari Skill Digital"
                line2Stroke="Secara Praktis"
                line2Grad="& Profesional"
              />
              <p className="mt-6 text-[#6b5a53] leading-[1.85] text-[15px]">
                {bootcamp.deskripsi}
              </p>
            </div>

            <Divider />

            {/* CURRICULUM */}
            <div>
              <SectionHeading
                eyebrow="Kurikulum"
                line1="Materi yang"
                line2Grad="Akan Dipelajari"
              />
              <div
                className="
                  mt-7
                  prose prose-sm max-w-none
                  prose-headings:font-black prose-headings:text-[#1e130e]
                  prose-headings:text-base prose-headings:mt-7 prose-headings:mb-3
                  prose-headings:pl-4 prose-headings:py-2.5
                  prose-headings:bg-orange-50 prose-headings:border-l-[3px] prose-headings:border-orange-400
                  prose-headings:rounded-r-xl
                  prose-p:text-[#6b5a53] prose-p:leading-relaxed prose-p:text-sm
                  prose-ul:space-y-2 prose-li:text-sm prose-li:text-[#4a3830]
                  prose-li:bg-white prose-li:border prose-li:border-orange-100/80
                  prose-li:rounded-xl prose-li:px-4 prose-li:py-2.5
                  prose-li:list-none
                  [&_li::before]:content-[''] [&_li]:relative
                  [&_li]:before:absolute [&_li]:before:left-0
                "
                dangerouslySetInnerHTML={{ __html: bootcamp.materi }}
              />
            </div>

            {/* RELATED */}
            {relatedBootcamps.length > 0 && (
              <>
                <Divider />
                <div>
                  <div className="flex items-end justify-between gap-6 mb-7 flex-wrap">
                    <SectionHeading
                      eyebrow="Rekomendasi"
                      line1="Jelajahi Pelatihan"
                      line2Grad="Lainnya"
                    />
                    <Link
                      to="/#program"
                      className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 hover:gap-3 transition-all duration-300 shrink-0 mb-1"
                    >
                      Lihat Semua <ArrowIcon />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {relatedBootcamps.map((item) => (
                      <RelatedCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ─────────────────────────────────── */}
          <div className="sticky top-28">
            <SidebarCard bootcamp={bootcamp} />
          </div>
        </div>
      </div>
    </section>
  );
}
