import Navbar from "../components/frontend/Navbar";
import Footer from "../components/frontend/Footer";

import blogHero from "/src/assets/images/blog/blog_hero.jpg";

export default function Blog() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen overflow-hidden bg-[#fdfaf7]">
        <div className="max-w-[1800px] mx-auto px-4 lg:px-6 pt-6">
          {/* Hero Container */}
          <div className="relative overflow-hidden rounded-[32px] min-h-[calc(100vh-90px)] bg-[#ff8b2c]">
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
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-300/30 blur-3xl rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-200/20 blur-3xl rounded-full"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center min-h-[calc(100vh-90px)] px-6 py-20 lg:px-10 lg:pt-36">
              <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* LEFT */}
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold mb-7">
                    ✦ Disty Akademi Blog
                  </div>

                  {/* Heading */}
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] text-white">
                    Insight, Tips &
                    <span className="block text-orange-200">
                      Digital Innovation
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mt-7 text-lg text-white/85 leading-relaxed max-w-xl">
                    Temukan artikel terbaru seputar teknologi, digital
                    marketing, pengembangan skill, hingga insight industri
                    kreatif untuk generasi digital masa kini.
                  </p>

                  {/* CTA */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button className="bg-white text-orange-500 px-7 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                      Jelajahi Artikel
                    </button>

                    <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-7 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                      Trending Topics
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="relative flex justify-center lg:justify-end">
                  {/* Main Image */}
                  <div className="relative w-full max-w-[620px]">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                      alt="Blog"
                      className="w-full h-[540px] object-cover rounded-[36px] shadow-2xl"
                    />

                    {/* Floating Article Card */}
                    <div className="absolute -bottom-10 -left-10 bg-white/95 backdrop-blur-xl rounded-[28px] p-7 shadow-2xl max-w-[320px]">
                      <p className="text-orange-500 text-sm font-bold mb-3">
                        Artikel Populer
                      </p>

                      <h3 className="text-3xl font-black text-slate-800 leading-tight">
                        Strategi Branding Digital untuk UMKM Modern
                      </h3>

                      <p className="mt-4 text-slate-500 text-sm leading-relaxed">
                        Pelajari bagaimana UMKM modern membangun identitas
                        digital yang kuat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
