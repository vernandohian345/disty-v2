export default function ArticleCard({
  image,
  category,
  title,
  description,
  date,
  views,
}) {
  return (
    <article className="group min-h-[360px] group bg-white rounded-[28px] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover group-hover:scale-105 transition-all duration-700"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xl text-orange-500 text-sm font-semibold px-3 py-[6px] text-[11px] rounded-full shadow-lg">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl line-clamp-3 font-black text-slate-900 leading-tight group-hover:text-orange-500 transition-all duration-300">
          {title}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 text-sm text-slate-400">
          <span>{date}</span>

          <div className="flex items-center gap-3">
            <span>👁</span>
            <span>{views}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
