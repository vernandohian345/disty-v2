import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogCard({ article }) {
  return (
    <Link to={`/blog/${article.slug}`} className="block">
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
              {article.category}
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
  );
}
