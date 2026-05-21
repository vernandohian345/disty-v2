import { useParams, Link } from "react-router-dom";

import bootcamps from "../../../data/bootcamps";

export default function BootcampDetailHero() {
  const { slug } = useParams();

  const bootcamp = bootcamps.find((item) => item.slug === slug);

  if (!bootcamp) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#fffaf5]">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
        {/* Container */}
        <div className="relative overflow-hidden rounded-[32px] min-h-[700px] bg-[#1f140f]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={bootcamp.thumbnail}
              alt={bootcamp.title}
              className="w-full h-full object-cover object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#140d09]/95 via-[#140d09]/85 to-black/40"></div>
          </div>

          {/* Glow */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 blur-3xl rounded-full"></div>

          {/* Content */}
          <div className="relative z-10 flex items-end min-h-[700px] px-6 py-14 sm:px-10 lg:px-16">
            <div className="max-w-3xl">
              {/* Category */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold">
                Pelatihan Professional
              </div>

              {/* Title */}
              <h1 className="mt-6 text-4xl sm:text-4xl lg:text-7xl font-black leading-[1.05] text-white">
                {bootcamp.title}
              </h1>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
                {bootcamp.description}
              </p>

              {/* Info */}
              <div className="mt-10 lg:sticky lg:top-28 flex-col sm:flex-row flex-wrap items-center gap-8">
                {/* Duration */}
                <div>
                  <p className="text-white/50 text-sm uppercase tracking-widest">
                    Durasi
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {bootcamp.duration}
                  </h3>
                </div>

                {/* Divider */}
                <div className="w-px h-12 hidden sm:block bg-white/10"></div>

                {/* Level */}
                <div>
                  <p className="text-white/50 text-sm uppercase tracking-widest">
                    Level
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {bootcamp.level}
                  </h3>
                </div>

                {/* Divider */}
                <div className="w-px h-12 bg-white/10"></div>

                {/* Price */}
                <div>
                  <p className="text-white/50 text-sm uppercase tracking-widest">
                    Harga
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-orange-400">
                    {bootcamp.price}
                  </h3>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/checkout/${bootcamp.slug}`}
                  className="
    w-full
    bg-orange-500
    hover:bg-orange-400
    text-white
    py-4
    rounded-2xl
    font-semibold
    transition-all
    duration-300
    shadow-lg
    shadow-orange-500/20
    flex
    items-center
    justify-center
  "
                >
                  Daftar Sekarang
                </Link>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Disty%20Academy,%20saya%20ingin%20bertanya%20tentang%20pelatihan."
                  target="_blank"
                  rel="noopener noreferrer"
                  c
                  className="
    w-full
    mt-4
    bg-[#2B1D16]
    hover:bg-black
    text-white
    py-4
    rounded-2xl
    font-semibold
    transition-all
    duration-300

    flex
    items-center
    justify-center"
                >
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
