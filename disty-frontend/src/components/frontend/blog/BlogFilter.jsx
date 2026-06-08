import { Search } from "lucide-react";

const categories = [
  "Semua",
  "Teknologi",
  "Karir",
  "Digital Marketing",
  "UI/UX",
  "Artificial Intelligence",
  "Web Development",
  "Mobile App",
  "Data Science",
  "Cyber Security",
  "Startup",
];

export default function BlogFilter({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <aside
      className="
        bg-white
        rounded-[24px]
        lg:rounded-[32px]
        border
        border-slate-200
        p-4
        lg:p-6
        lg:sticky
        lg:top-28
      "
    >
      {/* Search */}
      <div>
        <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">
          Pencarian
        </p>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel..."
            className="
              w-full
              bg-[#f8fafc]
              border
              border-slate-200
              rounded-xl
              pl-10
              pr-4
              py-2.5
              text-sm
            focus:outline-none 
            focus:ring-4 
            focus:ring-orange-100 
            transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div id="blog-categories" className="mt-8">
        <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">
          Kategori
        </p>

        {/* Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-col gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`w-full text-left px-5 py-3 rounded-2xl border text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-orange-500 border-orange-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.18)]"
                  : "bg-white border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
