import programs from "../../../data/programs";

import { Link } from "react-router-dom";

export default function ProgramSection() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf5] py-24">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          {/* Left */}
          <div className="max-w-2xl">
            <p className="text-orange-500 font-semibold tracking-wide uppercase mb-4">
              Explore Programs
            </p>

            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-[#2B1D16]">
              Program Pilihan
              <span className="block text-orange-500">
                Untuk Pengembangan Skill
              </span>
            </h2>
          </div>

          {/* Right */}
          <p className="max-w-xl text-[#6b625d] leading-relaxed">
            Temukan berbagai bootcamp, pelatihan, dan sertifikasi profesional
            yang dirancang untuk membantu meningkatkan kemampuan dan memperluas
            peluang karier digitalmu.
          </p>
        </div>

        {/* Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group relative bg-white border border-orange-100 rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >
              {/* Thumbnail */}
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={program.thumbnail}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                {/* Category */}
                <div className="absolute top-5 left-5">
                  <span className="bg-white/10 backdrop-blur-xl border border-white/10 text-white text-xs font-semibold px-4 py-2 rounded-full">
                    {program.category}
                  </span>
                </div>

                {/* Status */}
                <div className="absolute top-5 right-5">
                  <span className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-full">
                    {program.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                {/* Title */}
                <h3 className="text-2xl font-black leading-tight text-[#2B1D16]">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-[#6b625d] leading-relaxed">
                  {program.shortDescription}
                </p>

                {/* Info */}
                <div className="mt-8 flex items-center justify-between">
                  {/* Duration */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#9c928d]">
                      Duration
                    </p>

                    <h4 className="mt-1 font-bold text-[#2B1D16]">
                      {program.duration}
                    </h4>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-[#9c928d]">
                      Price
                    </p>

                    <h4 className="mt-1 font-bold text-orange-500">
                      {program.price}
                    </h4>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-orange-100 my-7"></div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  {/* Certificate */}
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>

                    <p className="text-sm text-[#6b625d]">Sertifikat Resmi</p>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/program/${program.slug}`}
                    className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Detail Program
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
