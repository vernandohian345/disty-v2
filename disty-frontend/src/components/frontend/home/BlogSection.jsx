import Button from "../../ui/Button";
import Reveal from "../../ui/Reveal";

const blogs = [
  {
    title: "5 Skill Digital yang Paling Dicari Tahun Ini",
    category: "Career",
    image:
      "/src/assets/images/Beranda/5 Skill Digital yang Paling Dicari Tahun Ini.jpg",
    date: "10 Mei 2026",
  },

  {
    title: "Cara Memulai Karir sebagai UI/UX Designer",
    category: "Design",
    image: "/src/assets/images/training.jpg",
    date: "8 Mei 2026",
  },

  {
    title: "Tips Belajar Coding untuk Pemula",
    category: "Programming",
    image: "/src/assets/images/magangdisty.png",
    date: "5 Mei 2026",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-purpleAccent/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-[#f9c115] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Blog & Artikel
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-darkText leading-tight">
              Update Insight &
              <span className="text-[#f9c115] block">
                Informasi Digital Terbaru
              </span>
            </h2>
          </div>

          <Button className="flex items-center gap-2">
            Lihat Semua Artikel
          </Button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {blogs.map((blog, index) => (
            <Reveal key={index} delay={index * 0.15}>
              <div
                key={index}
                className="group bg-white rounded-[32px] overflow-hidden shadow-soft hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Top Info */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="bg-primary/10 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold">
                      {blog.category}
                    </span>

                    <span className="text-sm text-slate-500">{blog.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-darkText leading-snug group-hover:text-primary transition">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-slate-600 leading-relaxed">
                    Pelajari insight terbaru seputar dunia digital, teknologi,
                    dan pengembangan karir profesional.
                  </p>

                  {/* Button */}
                  <button className="mt-6 text-orange-300 font-semibold hover:underline">
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
