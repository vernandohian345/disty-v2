import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// ── ICONS ─────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M3 12h18" />
  </svg>
);

// ── SKELETON CARD ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-orange-50 animate-pulse">
      <div className="h-48 bg-orange-50" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-orange-100 rounded-full" />
        <div className="h-5 w-3/4 bg-gray-100 rounded-lg" />
        <div className="h-4 w-full bg-gray-100 rounded-lg" />
        <div className="h-4 w-2/3 bg-gray-100 rounded-lg" />
        <div className="h-px bg-orange-50 my-3" />
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-100 rounded" />
          <div className="h-4 w-20 bg-gray-100 rounded" />
        </div>
        <div className="h-11 bg-gray-100 rounded-2xl mt-3" />
      </div>
    </div>
  );
}

// ── CERTIFICATION CARD ────────────────────────────────────────────────────────
function CertCard({ item, index }) {
  const isFree = Number(item.harga) === 0;

  const formatTanggal = (tanggal) =>
    new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div
      className="
        group bg-white rounded-[30px] overflow-hidden
        border border-orange-100
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-500
      "
      style={{ animation: `fadeUp 0.5s ${index * 80}ms both` }}
    >
      {/* Thumbnail */}
      <div className="relative h-[220px] bg-orange-100 overflow-hidden">
        <img
          src={item.sampul_url || "https://placehold.co/600x400?text=Sertifikasi"}
          alt={item.nama_sertifikasi}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-6">

        {/* Badges */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              item.kategori === "gratis"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {item.kategori}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              item.status === "full"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {item.status === "full" ? "FULL" : "OPEN"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-[#2B1D16] group-hover:text-orange-500 transition-colors duration-300">
          {item.nama_sertifikasi}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[#6b625d] line-clamp-3 text-sm leading-relaxed">
          {item.deskripsi}
        </p>

        {/* Meta */}
        <div className="mt-6 flex justify-between items-end">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[8px] bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-300 shrink-0">
              <ClockIcon />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tanggal</p>
              <h4 className="font-bold text-sm">{formatTanggal(item.tanggal_sertifikasi)}</h4>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Harga</p>
            <h4 className={`font-bold text-sm ${isFree ? "text-green-600" : "text-orange-500"}`}>
              {isFree ? "Gratis" : `Rp${Number(item.harga).toLocaleString("id-ID")}`}
            </h4>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/sertifikasi/${item.slug}`}
          className="
            mt-4 flex items-center justify-between w-full
            bg-[#1e130e] hover:bg-orange-500
            text-white text-[13px] font-bold
            px-5 py-3.5 rounded-2xl
            transition-all duration-300 group/btn
          "
        >
          <span>Lihat Detail</span>
          <div className="w-6 h-6 rounded-[9px] bg-white/15 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
            <ArrowIcon />
          </div>
        </Link>

      </div>
    </div>
  );
}

// ── EMPTY STATE ───────────────────────────────────────────────────────────────
function EmptyState({ search, onReset }) {
  return (
    <div className="col-span-full py-20 flex flex-col items-center text-center">
      <div
        className="w-18 h-18 rounded-[22px] mb-5 bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl"
        style={{ width: 72, height: 72 }}
      >
        🔍
      </div>
      <h3 className="text-xl font-black text-[#1e130e] mb-2">
        Sertifikasi Tidak Ditemukan
      </h3>
      <p className="text-sm text-[#8a7870] max-w-xs leading-relaxed mb-6">
        {search
          ? `Tidak ada sertifikasi untuk "${search}". Coba kata kunci lain.`
          : "Belum ada sertifikasi dengan filter ini."}
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1e130e] hover:bg-orange-500 text-white text-sm font-bold transition-all duration-300"
      >
        Reset Pencarian
      </button>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function CertificationSection() {
  const [sertifikasis, setSertifikasis] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [inputValue, setInputValue]     = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const searchTimer                     = useRef(null);

  // ── FETCH ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        let url = "http://127.0.0.1:8000/api/frontend/sertifikasi";
        const params = new URLSearchParams();

        if (search) params.append("q", search);
        if (activeFilter !== "Semua") params.append("kategori", activeFilter.toLowerCase());
        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url);
        const result   = await response.json();

        setSertifikasis(result.data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [search, activeFilter]);

  // ── HANDLERS ───────────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearch(val), 400);
  };

  const clearSearch = () => {
    setInputValue("");
    setSearch("");
  };

  const resetAll = () => {
    clearSearch();
    setActiveFilter("Semua");
  };

  const filters = ["Semua", "Gratis", "Berbayar"];

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Keyframe for card entrance */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="sertifikasi" className="relative bg-[#fffaf5] overflow-hidden pb-24">

        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-200/20 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-amber-200/15 blur-[90px] rounded-full pointer-events-none" />

        {/* Top rule */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent mb-12" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

          {/* ── SEARCH + FILTER ROW ──────────────────────────── */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-7">

            {/* Search input */}
            <div className="relative group w-full lg:max-w-sm">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-300 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Cari sertifikasi..."
                className="
                  w-full h-[50px] rounded-2xl
                  border border-orange-100 bg-white
                  pl-11 pr-10 text-sm font-medium text-[#1e130e]
                  placeholder:text-[#c4b0a6] outline-none
                  focus:border-orange-300 focus:ring-4 focus:ring-orange-100/80
                  transition-all duration-300 shadow-sm
                "
              />
              {inputValue && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 text-orange-400 text-[9px] font-bold transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    relative h-10 px-5 rounded-xl text-xs font-bold
                    border transition-all duration-300
                    ${activeFilter === filter
                      ? "bg-[#1e130e] border-[#1e130e] text-white shadow-md"
                      : "bg-white border-orange-100 text-[#6b5a53] hover:border-orange-300 hover:text-orange-500"
                    }
                  `}
                >
                  {filter}
                  {activeFilter === filter && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full border border-[#fffaf5]" />
                  )}
                </button>
              ))}
            </div>

          </div>
          {/* end search + filter row */}

          {/* ── RESULT COUNT ─────────────────────────────────── */}
          {!loading && (
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-black text-sm">
                {sertifikasis.length}
              </div>
              <p className="text-sm text-[#8a7870]">
                sertifikasi tersedia
                {inputValue && (
                  <> untuk <span className="font-semibold text-[#1e130e]">"{inputValue}"</span></>
                )}
                {activeFilter !== "Semua" && (
                  <> · filter: <span className="font-semibold text-orange-500">{activeFilter}</span></>
                )}
              </p>
            </div>
          )}

          {/* ── GRID ─────────────────────────────────────────── */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : sertifikasis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sertifikasis.map((item, i) => (
                <CertCard key={item.id} item={item} index={i} />
              ))}
            </div>
          ) : (
            <div className="grid">
              <EmptyState search={inputValue} onReset={resetAll} />
            </div>
          )}

        </div>
        {/* end container */}

      </section>
    </>
  );
}