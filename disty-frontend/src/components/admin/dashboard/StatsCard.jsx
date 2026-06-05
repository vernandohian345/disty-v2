import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function StatsCard({ title, value, icon, bgColor, link }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-100
        bg-white
        p-4
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        cursor-pointer
        h-[210px]
      "
    >
      {/* Decoration */}
      <div
        className="
          absolute
          top-3
          right-3
          h-10
          w-10
          rounded-full
          bg-slate-50
        "
      />

      {/* Icon */}
      <div
        className={`
          h-11
          w-11
          rounded-xl
          flex
          items-center
          justify-center
          ${bgColor}
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="
          mt-3
          text-[11px]
          font-semibold
          uppercase
          tracking-wider
          text-slate-500
          line-clamp-2
        "
      >
        {title}
      </h3>

      {/* Number */}
      <h2
        className="
          mt-2
          text-3xl
          font-bold
          text-slate-800
        "
      >
        {value}
      </h2>

      {/* Footer */}
      <div
        className="
          absolute
          bottom-4
          left-4
          right-4
          flex
          items-center
          justify-between
          rounded-full
          bg-slate-50
          px-3
          py-2
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-medium text-slate-600">Detail</span>
        </div>

        <ChevronRight size={14} className="text-slate-400" />
      </div>
    </div>
  );
}
