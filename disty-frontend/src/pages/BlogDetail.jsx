import Navbar from "../components/frontend/Navbar";
import Footer from "../components/frontend/Footer";

import { CalendarDays, Eye, Share2 } from "lucide-react";

import { useParams, Link } from "react-router-dom";

const relatedArticles = [
  {
    title: "Cara Menjadi Frontend Developer Modern",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "AI Tools yang Membantu Produktivitas",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Strategi Konten Sosial Media 2026",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function BlogDetail() {
  const { slug } = useParams();

  return (
    <>
      <Navbar />

      <section className="bg-[#fdfaf7] pt-36 pb-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          {/* Top */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-orange-100 text-orange-500 px-5 py-2 rounded-full font-semibold mb-6">
              Artikel Blog
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              {slug.replaceAll("-", " ")}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-slate-500">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />

                <span>15 Mei 2026</span>
              </div>

              <div className="flex items-center gap-2">
                <Eye size={18} />

                <span>1.2K Views</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-500">
                  D
                </div>

                <span>Disty Akademi</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-14 max-w-6xl mx-auto overflow-hidden rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
              alt=""
              className="w-full h-[550px] object-cover"
            />
          </div>

          {/* Content Layout */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-14 mt-20 max-w-7xl mx-auto">
            {/* LEFT */}
            <article className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed">
                <p>
                  Blog telah menjadi bagian penting dalam strategi digital
                  modern. Tidak hanya sebagai media informasi, blog juga mampu
                  meningkatkan branding, SEO, dan kredibilitas sebuah platform.
                </p>

                <p>
                  Dengan artikel berkualitas, sebuah platform dapat membangun
                  hubungan yang lebih dekat dengan audiens sekaligus memperluas
                  jangkauan organik dari mesin pencari.
                </p>

                <h2>Mengapa Blog Sangat Penting?</h2>

                <p>
                  Blog memungkinkan perusahaan atau personal brand untuk berbagi
                  insight, edukasi, dan pengalaman kepada audience secara lebih
                  mendalam.
                </p>

                {/* Quote */}
                <blockquote className="border-l-4 border-orange-500 bg-orange-50 rounded-r-2xl px-6 py-5 italic text-slate-700">
                  “Content is no longer just king, it is the entire kingdom.”
                </blockquote>

                <p>
                  Selain itu, blog juga membantu meningkatkan authority sebuah
                  website di mata Google melalui konten yang konsisten dan
                  relevan.
                </p>

                {/* Inline Image */}
                <div className="my-10 overflow-hidden rounded-[28px]">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
                    alt=""
                    className="w-full h-[420px] object-cover"
                  />
                </div>

                <h2>Strategi Membuat Blog Modern</h2>

                <p>
                  Blog modern bukan hanya tentang tulisan panjang, tetapi juga
                  pengalaman pengguna yang nyaman, tampilan visual yang menarik,
                  dan navigasi yang mudah dipahami.
                </p>

                <ul>
                  <li>Gunakan typography yang nyaman dibaca</li>
                  <li>Buat struktur heading yang jelas</li>
                  <li>Optimalkan gambar dan performa website</li>
                  <li>Gunakan CTA yang jelas</li>
                  <li>Pastikan responsive di semua device</li>
                </ul>

                {/* Highlight Box */}
                <div className="bg-slate-900 text-white rounded-[28px] p-8 mt-10">
                  <h3 className="text-2xl font-black mb-4">Insight Penting</h3>

                  <p className="text-slate-300 leading-relaxed">
                    Blog yang konsisten diperbarui memiliki peluang lebih besar
                    mendapatkan traffic organik dan meningkatkan engagement
                    user.
                  </p>
                </div>
              </div>
            </article>

            {/* RIGHT */}
            <aside className="space-y-8">
              {/* Share */}
              <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-6">
                  <Share2 size={20} className="text-orange-500" />

                  <h3 className="text-xl font-black text-slate-900">
                    Bagikan Artikel
                  </h3>
                </div>

                <div className="flex gap-4">
                  <button className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-105 transition-all">
                    <span className="font-bold">f</span>
                  </button>

                  <button className="w-12 h-12 rounded-2xl bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-105 transition-all">
                    <span className="font-bold">X</span>
                  </button>

                  <button className="w-12 h-12 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center hover:scale-105 transition-all">
                    <span className="font-bold">in</span>
                  </button>
                </div>
              </div>

              {/* Related */}
              <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <h3 className="text-2xl font-black text-slate-900 mb-8">
                  Artikel Terkait
                </h3>

                <div className="space-y-5">
                  {relatedArticles.map((article, index) => (
                    <Link
                      key={index}
                      to={`/blog/${article.title
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                      className="group flex gap-4"
                    >
                      <img
                        src={article.image}
                        alt=""
                        className="w-24 h-24 rounded-2xl object-cover"
                      />

                      <div>
                        <h4 className="font-bold text-slate-800 leading-snug group-hover:text-orange-500 transition-all">
                          {article.title}
                        </h4>

                        <p className="text-sm text-slate-400 mt-2">
                          Baca artikel →
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
