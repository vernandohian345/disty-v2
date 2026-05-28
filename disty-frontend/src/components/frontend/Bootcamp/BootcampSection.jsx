import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// ── SKELETON CARD ─────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-[28px] overflow-hidden border border-orange-50 animate-pulse">
      <div className="h-[200px] bg-orange-50" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-24 bg-orange-100 rounded-full" />
        <div className="h-5 w-3/4 bg-gray-100 rounded-lg" />
        <div className="h-4 w-full bg-gray-100 rounded-lg" />
        <div className="h-4 w-2/3 bg-gray-100 rounded-lg" />
        <div className="h-px bg-orange-50 my-4" />
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-100 rounded" />
          <div className="h-4 w-20 bg-gray-100 rounded" />
        </div>
        <div className="h-12 bg-gray-100 rounded-2xl mt-4" />
      </div>
    </div>
  );
}

// ── BOOTCAMP CARD ─────────────────────────────────────────
function BootcampCard({ item, index }) {
  const isFree = Number(item.harga) === 0;

  return (
    <div
      className="
        group bg-white rounded-[28px] overflow-hidden
        border border-orange-50/80
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_24px_64px_rgba(249,115,22,0.12)]
        hover:border-orange-100
      "
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative h-[200px] overflow-hidden bg-orange-50">
        <img
          src={item.thumbnail_url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Price badge */}
        <span
          className={`
            absolute top-4 right-4
            text-[10px] font-bold px-3.5 py-1.5 rounded-full
            ${
              isFree
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
            }
          `}
        >
          {isFree ? "Gratis" : "Berbayar"}
        </span>

        {/* Category badge */}
        <span
          className="
          absolute bottom-4 left-4
          text-[9px] font-bold uppercase tracking-[0.13em]
          text-white/90 bg-white/15 backdrop-blur-sm
          border border-white/20
          px-3 py-1.5 rounded-full
        "
        >
          {item.kategori}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3
          className="
          text-[17px] font-black leading-tight text-[#1e130e]
          group-hover:text-orange-500 transition-colors duration-300
          line-clamp-2
        "
        >
          {item.title}
        </h3>

        <p className="mt-3 text-xs text-[#8a7870] leading-[1.7] line-clamp-2">
          {item.short_description}
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-orange-100 to-transparent" />

        {/* Meta row */}
        <div className="flex items-center justify-between">
          {/* Duration */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-orange-300"
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
            </div>
            <div>
              <p className="text-[9px] text-[#b0988e] font-medium uppercase tracking-wider">
                Durasi
              </p>
              <p className="text-xs font-black text-[#1e130e] leading-none mt-0.5">
                {item.durasi}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-[9px] text-[#b0988e] font-medium uppercase tracking-wider mb-0.5">
              Harga
            </p>
            <p
              className={`text-[15px] font-black leading-none ${isFree ? "text-emerald-600" : "text-orange-500"}`}
            >
              {isFree
                ? "Gratis"
                : `Rp${Number(item.harga).toLocaleString("id-ID")}`}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/pelatihan/${item.slug}`}
          className="
            mt-5 flex items-center justify-between w-full
            bg-[#1e130e] hover:bg-orange-500
            text-white text-sm font-bold
            px-5 py-3.5 rounded-2xl
            transition-all duration-300
            group/btn
          "
        >
          <span>Lihat Detail</span>
          <div
            className="
            w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center
            group-hover/btn:translate-x-1 transition-transform
          "
          >
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
                d="M17 8l4 4-4 4M3 12h18"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}

// ── EMPTY STATE ───────────────────────────────────────────
function EmptyState({ search, filter, onReset }) {
  return (
    <div className="py-20 flex flex-col items-center text-center col-span-full">
      <div
        className="
        w-20 h-20 rounded-3xl
        bg-orange-50 border border-orange-100
        flex items-center justify-center mb-6
      "
      >
        <svg
          className="w-9 h-9 text-orange-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-black text-[#1e130e] mb-3">
        Pelatihan Tidak Ditemukan
      </h3>
      <p className="text-[#8a7870] text-sm max-w-sm leading-relaxed mb-8">
        {search
          ? `Tidak ada pelatihan untuk "${search}". Coba kata kunci lain.`
          : `Belum ada pelatihan dengan filter "${filter}" saat ini.`}
      </p>
      <button
        onClick={onReset}
        className="
          inline-flex items-center gap-2 px-6 py-3 rounded-2xl
          bg-[#1e130e] hover:bg-orange-500
          text-white text-sm font-bold
          transition-all duration-300
        "
      >
        Reset Pencarian
      </button>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────
export default function BootcampSection() {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const searchTimer = useRef(null);

  useEffect(() => {
    fetchBootcamps();
  }, []);

  // Re-fetch on filter/search change
  useEffect(() => {
    fetchBootcamps();
  }, [search, activeFilter]);

  // Debounce: wait 400 ms after typing before updating `search`
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

  const fetchBootcamps = async () => {
    try {
      setLoading(true);
      let url = "http://127.0.0.1:8000/api/frontend/pelatihan";
      const params = new URLSearchParams();
      if (search) params.append("q", search);
      if (activeFilter === "Gratis") params.append("kategori", "gratis");
      if (activeFilter === "Berbayar") params.append("kategori", "berbayar");
      if (params.toString()) url += `?${params.toString()}`;
      const response = await fetch(url);
      const result = await response.json();
      setBootcamps(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ["Semua", "Gratis", "Berbayar"];

  return (
    <section id="program" className="relative bg-[#fffaf5] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-[480px] h-[480px] bg-orange-200/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-amber-200/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Top decorative rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        {/* ── HEADER ─────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          {/* Title */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-orange-400" />
              <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Program Pelatihan
              </span>
            </div>

            <h2
              className="font-black leading-[1.04] tracking-tight text-[#1e130e]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
            >
              Temukan Pelatihan
              <span className="block">
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1.5px #f97316" }}
                >
                  Sesuai Minat
                </span>
                <span className="text-[#1e130e]"> dan</span>
              </span>
              <span className="block bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                Skillmu
              </span>
            </h2>
          </div>

          {/* Search + Filter */}
          <div className="w-full lg:max-w-md space-y-4">
            {/* Search input */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-300 group-focus-within:text-orange-500 transition-colors pointer-events-none">
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
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Cari pelatihan..."
                className="
                  w-full h-[52px] rounded-2xl
                  border border-orange-100 bg-white
                  pl-11 pr-10 text-sm font-medium text-[#1e130e]
                  placeholder:text-[#c4b0a6]
                  outline-none
                  focus:border-orange-300 focus:ring-4 focus:ring-orange-100/80
                  transition-all duration-300 shadow-sm
                "
              />

              {inputValue && (
                <button
                  onClick={clearSearch}
                  className="
                    absolute right-3.5 top-1/2 -translate-y-1/2
                    w-6 h-6 flex items-center justify-center
                    rounded-full bg-orange-100 hover:bg-orange-200
                    text-orange-400 text-[10px] font-bold
                    transition-colors
                  "
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    relative h-10 px-5 rounded-xl text-xs font-bold
                    border transition-all duration-300
                    ${
                      activeFilter === filter
                        ? "bg-[#1e130e] border-[#1e130e] text-white shadow-lg shadow-[#1e130e]/15"
                        : "bg-white border-orange-100 text-[#6b5a53] hover:border-orange-300 hover:text-orange-500"
                    }
                  `}
                >
                  {filter}
                  {activeFilter === filter && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RESULT COUNT ───────────────────────────── */}
        {!loading && (
          <div className="flex items-center gap-3 mb-10">
            <div
              className="
              w-10 h-10 rounded-xl
              bg-orange-500/10 text-orange-500
              flex items-center justify-center
              font-black text-sm
            "
            >
              {bootcamps.length}
            </div>
            <p className="text-sm text-[#8a7870]">
              pelatihan tersedia
              {search && (
                <>
                  {" "}
                  untuk{" "}
                  <span className="font-semibold text-[#1e130e]">
                    "{search}"
                  </span>
                </>
              )}
              {activeFilter !== "Semua" && (
                <>
                  {" "}
                  · filter:{" "}
                  <span className="font-semibold text-orange-500">
                    {activeFilter}
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        {/* ── GRID ───────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : bootcamps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {bootcamps.map((item, i) => (
              <BootcampCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid">
            <EmptyState
              search={search}
              filter={activeFilter}
              onReset={resetAll}
            />
          </div>
        )}
      </div>
    </section>
  );
}
