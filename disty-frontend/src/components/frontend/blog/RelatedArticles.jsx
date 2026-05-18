import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function RelatedArticles({ relatedArticles }) {
  return (
    <div className="mt-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-orange-500 font-semibold">Artikel Pilihan</p>

          <h2 className="text-4xl font-black text-slate-900 mt-2">
            Artikel Terkait
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {relatedArticles.map((article) => (
          <Link key={article.id} to={`/blog/${article.slug}`} className="group">
            <article className="bg-white border border-slate-200 rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[240px] object-cover group-hover:scale-110 transition-all duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-7">
                {/* Top */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-xs font-bold">
                    {article.category}
                  </span>

                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Eye size={15} />

                    <span>{article.views}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-slate-900 leading-snug group-hover:text-orange-500 transition-all duration-300 line-clamp-2">
                  {article.title}
                </h3>

                {/* Desc */}
                <p className="mt-4 text-slate-500 leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
