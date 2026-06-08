import blogHero from "/src/assets/images/blog/blog_hero.jpg";
import { Link } from "react-router-dom";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf5]">
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6 pt-3">
        {/* Floating Logo */}
        <div className="absolute top-4 left-4 lg:top-8 lg:left-14 z-30">
          <img
            src="/src/assets/images/logo-putih.png"
            alt="Disty Akademi"
            className="w-[90px] lg:w-[140px] object-contain drop-shadow-xl"
          />
        </div>
        {/* Hero Container */}
        <div className="relative overflow-hidden rounded-[24px] lg:rounded-[32px] bg-[#ff8b2c]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={blogHero}
              alt="Blog Hero"
              className="w-full h-full object-cover object-center opacity-20"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#a94f00]/90 via-[#ff7b00]/70 to-[#ffb067]/40"></div>
          </div>

          {/* Glow */}
          <div className="absolute top-0 left-0 w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-orange-300/30 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-yellow-200/20 blur-3xl rounded-full"></div>

          {/* Content */}
          <div className="relative z-10 px-5 py-16 lg:px-10 lg:pt-24 lg:pb-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center w-full">
              {/* LEFT */}
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-7">
                  ✦ Disty Akademi Blog
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white">
                  Insight, Tips &
                  <span className="block text-orange-200">
                    Digital Innovation
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-5 text-base lg:text-lg text-white/85 leading-relaxed max-w-xl">
                  Temukan artikel terbaru seputar teknologi, digital marketing,
                  pengembangan skill, hingga insight industri kreatif untuk
                  generasi digital masa kini.
                </p>

                {/* CTA */}
                <div className="mt-5">
                  <a
                    href="#blog-content"
                    className="inline-flex items-center justify-center bg-white text-orange-500 px-6 py-3.5 rounded-2xl font-semibold shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.25)] transition-all duration-300"
                  >
                    Jelajahi Artikel
                  </a>
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative flex justify-center lg:justify-end lg:mt-1">
                {/* Main Image */}
                <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] mx-auto">
                  {/* Frame */}
                  <div className="absolute -inset-5 rounded-[42px] border border-white/40 bg-white/5 backdrop-blur-sm"></div>
                  <img
                    src="/src/assets/images/blog/blog_hero_image.jpg"
                    alt="Blog Hero"
                    className="
                      relative z-10
                      w-full
                      h-[240px]
                      sm:h-[300px]
                      lg:h-[360px]
                      object-cover
                      rounded-[24px]
                      lg:rounded-[36px]
                      shadow-2xl
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
