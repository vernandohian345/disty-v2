import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

if (!relatedArticles.length) {
  return (
    <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
      <div className="text-4xl mb-4">📚</div>

      <h3 className="text-lg font-bold text-slate-800">
        Belum Ada Artikel Terkait
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        Artikel dengan kategori serupa belum tersedia.
      </p>
    </div>
  );
}
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

      <div className="space-y-4">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            className="
        group flex gap-4
        p-3 rounded-2xl
        hover:bg-white
        transition-all duration-300
      "
          >
            {/* Image */}
            <div className="shrink-0 overflow-hidden rounded-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="
            w-24 h-24 object-cover
            group-hover:scale-105
            transition duration-300
          "
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x400/f8fafc/94a3b8?text=Article";
                }}
              />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {/* Category */}
              <p className="text-xs font-semibold text-orange-500 mb-2">
                {article.category}
              </p>

              {/* Title */}
              <h4
                className="
            text-sm font-bold text-slate-800
            leading-snug line-clamp-2
            group-hover:text-orange-500
            transition
          "
              >
                {article.title}
              </h4>

              {/* Date */}
              <p className="text-xs text-slate-400 mt-3">
                {new Date(article.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
