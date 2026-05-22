import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function BootcampSection() {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBootcamps();
  }, []);

  useEffect(() => {
    fetchBootcamps();
  }, [search, activeFilter]);

  const fetchBootcamps = async () => {
    try {
      setLoading(true);

      let url = "http://127.0.0.1:8000/api/frontend/pelatihan";

      const params = new URLSearchParams();

      if (search) {
        params.append("q", search);
      }

      if (activeFilter === "Gratis") {
        params.append("kategori", "gratis");
      }

      if (activeFilter === "Berbayar") {
        params.append("kategori", "berbayar");
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);

      const result = await response.json();

      setBootcamps(result.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-2xl font-bold text-orange-500">
          Memuat Pelatihan...
        </h2>
      </section>
    );
  }

  return (
    <section id="program">
      <section className="relative overflow-hidden bg-[#fffaf5] py-10">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-300/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* LEFT */}
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-6xl font-black leading-[1.05] text-[#2B1D16]">
                Temukan Pelatihan test
                <span className="block text-orange-500">
                  Sesuai Minat dan Skillmu
                </span>
              </h2>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:max-w-xl">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari pelatihan..."
                  className="
        w-full
        h-[62px]
        rounded-full
        border border-orange-100
        bg-white
        px-7
        pr-20
        text-[#2B1D16]
        outline-none
        focus:border-orange-300
        shadow-sm
      "
                />

                <button
                  className="
        absolute
        right-2
        top-1/2
        -translate-y-1/2
        w-14
        h-14
        rounded-full
        bg-orange-500
        hover:bg-orange-600
        flex
        items-center
        justify-center
        text-white
        transition-all
        duration-300
      "
                >
                  🔍
                </button>
              </div>

              {/* FILTER */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {["Semua", "Gratis", "Berbayar"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
          px-5
          h-11
          rounded-full
          text-sm
          font-semibold
          transition-all
          duration-300
          border
          ${
            activeFilter === filter
              ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
              : "bg-white border-orange-100 text-[#2B1D16] hover:border-orange-300 hover:text-orange-500"
          }
        `}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="mt-14">
            <p className="text-[#6b625d]">
              Menampilkan{" "}
              <span className="font-bold text-[#2B1D16]">
                {bootcamps.length}
              </span>{" "}
              pelatihan tersedia
            </p>
          </div>

          {/* Grid */}

          {bootcamps.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {bootcamps.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-orange-100 rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Thumbnail */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                    {/* Status */}
                    <div className="absolute top-5 right-5">
                      <span className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-full">
                        {Number(item.harga) === 0 ? "Gratis" : "Berbayar"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    {/* Category */}
                    <p className="text-orange-500 font-semibold text-sm uppercase tracking-wide">
                      {item.kategori}
                    </p>

                    {/* Title */}
                    <h3 className="mt-3 text-2xl font-black leading-tight text-[#2B1D16]">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-[#6b625d] leading-relaxed">
                      {item.short_description}
                    </p>

                    {/* Info */}
                    <div className="mt-8 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#9c928d]">
                          Durasi
                        </p>

                        <h4 className="mt-1 font-bold text-[#2B1D16]">
                          {item.durasi}
                        </h4>
                      </div>

                      <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-[#9c928d]">
                          Harga
                        </p>

                        <h4 className="mt-1 font-bold text-orange-500">
                          {Number(item.harga) === 0
                            ? "Gratis"
                            : `Rp${Number(item.harga).toLocaleString("id-ID")}`}
                        </h4>
                      </div>
                    </div>

                    {/* Button */}
                    <Link
                      to={`/pelatihan/${item.slug}`}
                      className="mt-8 inline-flex items-center justify-center w-full bg-[#2B1D16] hover:bg-orange-500 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 9.172a4 4 0 015.656 5.656M15 15l6 6"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#2B1D16]">
                Pelatihan Tidak Ditemukan
              </h3>

              <p className="mt-3 text-[#6b625d] max-w-md mx-auto">
                Coba gunakan kata kunci lain atau ubah filter pencarian
                pelatihanmu.
              </p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
