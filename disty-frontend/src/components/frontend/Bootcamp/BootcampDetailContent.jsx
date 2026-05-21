import { useParams, Link } from "react-router-dom";

import bootcamps from "../../../data/bootcamps";

export default function BootcampDetailContent() {
  const { slug } = useParams();

  const bootcamp = bootcamps.find((item) => item.slug === slug);

  if (!bootcamp) {
    return null;
  }

  const relatedBootcamps = bootcamps
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#fffaf5] py-24">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            {/* About */}
            <div>
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                Tentang Pelatihan
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#2B1D16] leading-tight">
                Pelajari Skill Digital
                <span className="block text-orange-500">
                  Secara Praktis & Profesional
                </span>
              </h2>

              <p className="mt-8 text-[#6b625d] leading-relaxed text-lg">
                {bootcamp.description}
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-20">
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                Benefit Pelatihan
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {bootcamp.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white border border-orange-100 rounded-[28px] p-6 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-[#2B1D16]">
                      {benefit}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="mt-20">
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                Materi Pembelajaran
              </p>

              <div className="mt-8 space-y-5">
                {bootcamp.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white border border-orange-100 rounded-[24px] px-6 py-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <h3 className="text-lg font-semibold text-[#2B1D16]">
                      {material}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="sticky top-28 bg-white border border-orange-100 rounded-[32px] p-8 shadow-sm">
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                Informasi Pelatihan
              </p>

              {/* Info List */}
              <div className="mt-8 space-y-6">
                {/* Duration */}
                <div className="flex items-center justify-between">
                  <p className="text-[#6b625d]">Durasi</p>

                  <h3 className="font-bold text-[#2B1D16]">
                    {bootcamp.duration}
                  </h3>
                </div>

                {/* Level */}
                <div className="flex items-center justify-between">
                  <p className="text-[#6b625d]">Level</p>

                  <h3 className="font-bold text-[#2B1D16]">{bootcamp.level}</h3>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <p className="text-[#6b625d]">Harga</p>

                  <h3 className="font-bold text-orange-500">
                    {bootcamp.price}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-orange-100 my-8"></div>

              {/* Button */}
              <button className="w-full bg-orange-500 hover:bg-orange-400 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-orange-500/20">
                Daftar Sekarang
              </button>

              <button className="w-full mt-4 bg-[#2B1D16] hover:bg-black text-white py-4 rounded-2xl font-semibold transition-all duration-300">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-28">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                Pelatihan Lainnya
              </p>

              <h2 className="mt-3 text-4xl font-black text-[#2B1D16]">
                Jelajahi Pelatihan
                <span className="block text-orange-500">Lainnya</span>
              </h2>
            </div>
          </div>

          {/* Related Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {relatedBootcamps.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-orange-100 rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              >
                {/* Thumbnail */}
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-2xl font-black text-[#2B1D16] leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[#6b625d] leading-relaxed">
                    {item.shortDescription}
                  </p>

                  <Link
                    to={`/pelatihan/${item.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Lihat Detail
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
