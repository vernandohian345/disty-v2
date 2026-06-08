import { useEffect, useState } from "react";
import { ChevronDown, ArrowDownUp, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

export default function BlogList({
  blogs,
  activeCategory,
  sortType,
  setSortType,
  currentPage,
  setCurrentPage,
  searchQuery,
  loading,
}) {
  const articlesPerPage = 10;
  const [openSort, setOpenSort] = useState(false);
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);
  const filteredArticles = [...blogs]
    .filter((blog) => {
      const matchesCategory =
        activeCategory === "Semua" ? true : blog.category === activeCategory;

      const matchesSearch =
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })

    .sort((a, b) => {
      if (sortType === "Terpopuler") {
        return b.views - a.views;
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

  if (loading) {
    return (
      <div className="space-y-5">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-[#fffaf5] rounded-2xl border border-slate-200 overflow-hidden p-4 animate-pulse"
          >
            <div className="grid md:grid-cols-[180px_1fr] gap-4">
              {/* Image */}
              <div className="bg-slate-200 rounded-2xl h-[170px]" />

              {/* Content */}
              <div className="space-y-4">
                <div className="h-3 w-32 bg-slate-200 rounded-full" />

                <div className="h-5 w-full bg-slate-200 rounded-full" />

                <div className="h-5 w-2/3 bg-slate-200 rounded-full" />

                <div className="h-4 w-full bg-slate-200 rounded-full" />

                <div className="h-4 w-1/2 bg-slate-200 rounded-full" />

                <div className="flex justify-end">
                  <div className="h-4 w-16 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Top */}
      <div className="flex items-center justify-between mb-5 lg:mb-8">
        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setOpenSort(!openSort)}
            className="
              flex items-center justify-between gap-4
              w-full sm:w-[190px]
              bg-white
              border border-slate-200
              rounded-2xl
              px-4 py-2.5
              hover:border-orange-300
              transition-all
              hover:shadow-md  duration-300"
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
            <div
              className="
              absolute left-0 sm:right-0 sm:left-auto
              mt-3
              w-full sm:w-[190px]
              bg-white
              border border-slate-200
              rounded-2xl
              shadow-xl
              overflow-hidden
              z-30 "
            >
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
      {currentArticles.length > 0 ? (
        <div className="space-y-5">
          {currentArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-[24px] lg:rounded-[32px] p-6 lg:p-14 text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-3xl mx-auto">
            🔍
          </div>

          <h3 className="text-xl lg:text-2xl font-black text-slate-900 mt-6">
            Artikel Tidak Ditemukan
          </h3>

          <p className="text-slate-500 mt-3 max-w-md mx-auto leading-relaxed">
            Coba gunakan keyword lain atau pilih kategori berbeda untuk
            menemukan artikel yang kamu cari.
          </p>

          <button
            onClick={() => {
              setCurrentPage(1);
            }}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 lg:mt-10 flex-wrap">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className=" w-9 h-9 lg:w-10 lg:h-10 text-sm rounded-xl border border-slate-200 bg-white hover:border-orange-300 disabled:opacity-40 transition-all"
        >
          ←
        </button>

        {/* Pages */}
        {[...Array(totalPages)]
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(totalPages, currentPage + 2),
          )
          .map((_, idx) => {
            const page = Math.max(0, currentPage - 3) + idx + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl font-bold ${
                  currentPage === page
                    ? "bg-orange-500 text-white"
                    : "border border-slate-200 bg-white"
                }`}
              >
                {page}
              </button>
            );
          })}

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
