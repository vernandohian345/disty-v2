import { useState } from "react";
import { ChevronDown, ArrowDownUp, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    category: "Teknologi",
    title: "AI Generatif Mengubah Cara Kita Bekerja",
    description:
      "Transformasi digital yang didorong AI kini merambah hampir semua sektor industri secara masif.",
    date: "15 Mei 2026",
    views: "1.2K",
  },

  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    category: "Karir",
    title: "5 Tips Bangun Personal Branding untuk Mahasiswa",
    description:
      "Bangun citra diri yang kuat dan konsisten untuk membuka lebih banyak peluang karir.",
    date: "14 Mei 2026",
    views: "980",
  },

  {
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    category: "Digital Marketing",
    title: "Strategi Konten Media Sosial yang Efektif di 2026",
    description:
      "Pahami strategi konten terbaru agar engagement meningkat dan audience semakin loyal.",
    date: "13 Mei 2026",
    views: "1.5K",
  },

  {
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    title: "Cara Membuat Landing Page dengan React & Tailwind",
    description:
      "Step-by-step membuat landing page modern, responsif, dan cepat.",
    date: "12 Mei 2026",
    views: "1.1K",
  },

  {
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    category: "Cyber Security",
    title: "Keamanan Data: Ancaman & Cara Melindunginya",
    description:
      "Kenali berbagai ancaman keamanan data dan langkah pencegahannya.",
    date: "11 Mei 2026",
    views: "870",
  },

  {
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",
    category: "Mobile App",
    title: "Tren Mobile App UI/UX yang Akan Populer di 2026",
    description:
      "Melihat tren desain mobile app yang akan mendominasi tahun ini.",
    date: "10 Mei 2026",
    views: "760",
  },

  {
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    category: "Artificial Intelligence",
    title: "AI dalam Dunia Kerja: Peluang atau Ancaman?",
    description:
      "Membahas bagaimana AI memengaruhi pekerjaan dan keterampilan.",
    date: "9 Mei 2026",
    views: "1K",
  },

  {
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    category: "Data Science",
    title: "Data Science untuk Pemula: Panduan Lengkap",
    description:
      "Mulai belajar data science dari dasar hingga membuat project.",
    date: "8 Mei 2026",
    views: "650",
  },

  {
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
    category: "UI/UX",
    title: "Prinsip Desain UI yang Wajib Diketahui",
    description:
      "Pelajari prinsip desain UI agar produk digital lebih menarik.",
    date: "7 Mei 2026",
    views: "540",
  },

  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    category: "Startup",
    title: "Langkah Awal Membangun Startup yang Sukses",
    description:
      "Panduan memulai startup dari ide hingga mendapatkan pengguna.",
    date: "6 Mei 2026",
    views: "620",
  },
];

export default function BlogList({
  activeCategory,
  sortType,
  setSortType,
  currentPage,
  setCurrentPage,
}) {
  const articlesPerPage = 10;
  const [openSort, setOpenSort] = useState(false);
  const filteredArticles = [...articles]
    .filter((article) =>
      activeCategory === "Semua" ? true : article.category === activeCategory,
    )
    .sort((a, b) => {
      if (sortType === "Terpopuler") {
        return parseFloat(b.views) - parseFloat(a.views);
      }

      if (sortType === "A-Z") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const startIndex = (currentPage - 1) * articlesPerPage;

  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage,
  );

  return (
    <div>
      {/* Top */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-slate-900">
          Menampilkan 10 artikel
        </h2>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setOpenSort(!openSort)}
            className="flex items-center justify-between gap-4 w-[190px] bg-white border border-slate-200 rounded-2xl px-4 py-2.5 hover:border-orange-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                <ArrowDownUp size={16} className="text-orange-500" />
              </div>

              <span className="text-sm font-semibold text-slate-800">
                Urutkan
              </span>
            </div>

            <ChevronDown
              size={18}
              className={`text-slate-400 transition-all duration-300 ${
                openSort ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {openSort && (
            <div className="absolute right-0 mt-3 w-[190px] bg-white border border-slate-200 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden z-30">
              <button
                onClick={() => {
                  setSortType("Terbaru");
                  setOpenSort(false);
                }}
                className="w-full px-5 py-4 text-left hover:bg-orange-50 font-medium"
              >
                Terbaru
              </button>

              <button
                onClick={() => {
                  setSortType("Terpopuler");
                  setOpenSort(false);
                }}
                className="w-full px-5 py-4 text-left hover:bg-orange-50 font-medium"
              >
                Terpopuler
              </button>

              <button
                onClick={() => {
                  setSortType("A-Z");
                  setOpenSort(false);
                }}
                className="w-full px-5 py-4 text-left hover:bg-orange-50 font-medium"
              >
                A-Z
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-5">
        {currentArticles.map((article, index) => (
          <Link
            key={index}
            to={`/blog/${article.title.toLowerCase().replaceAll(" ", "-")}`}
            className="block"
          >
            <article className="bg-white rounded-2xl border border-slate-200 hover:-translate-y-1 overflow-hidden hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="grid lg:grid-cols-[180px_1fr]">
                {/* Image */}
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[170px] object-cover"
                  />

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xl px-3 py-1 rounded-full text-[11px] font-semibold">
                    Artikel
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                      <span>{article.date}</span>

                      <span>•</span>

                      <span>{article.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-slate-900 leading-snug hover:text-orange-500 transition-all duration-300 line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2 leading-normal">
                      {article.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex justify-end mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Eye size={14} />

                      <span>{article.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-orange-300 disabled:opacity-40 transition-all"
        >
          ←
        </button>

        {/* Pages */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-10 h-10 rounded-xl font-bold transition-all ${
              currentPage === index + 1
                ? "bg-orange-500 text-white"
                : "border border-slate-200 bg-white hover:border-orange-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-orange-300 disabled:opacity-40 transition-all"
        >
          →
        </button>
      </div>
    </div>
  );
}
