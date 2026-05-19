import { motion } from "framer-motion";

import programHeroImage from "/src/assets/images/training.jpg";

export default function ProgramHero() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf5]">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
        {/* Hero Container */}
        <div className="relative overflow-hidden rounded-[32px] min-h-[calc(100vh-90px)] bg-[#1f140f]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={programHeroImage}
              alt="Program Disty Academy"
              className="w-full h-full object-cover object-center opacity-80"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#140d09]/95 via-[#140d09]/75 to-black/40"></div>
          </div>

          {/* Glow Effects */}
          <div className="absolute -top-10 -left-10 w-[450px] h-[450px] bg-orange-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-amber-300/10 blur-3xl rounded-full"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center min-h-[calc(100vh-90px)] px-6 py-24 sm:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] text-white">
                Jelajahi Program
                <span className="block text-orange-400">Untuk Masa Depan</span>
                Digitalmu
              </h1>

              {/* Description */}
              <p className="mt-8 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
                Disty Academy menghadirkan berbagai bootcamp, pelatihan, dan
                sertifikasi profesional yang dirancang untuk membantu kamu
                berkembang, meningkatkan skill, dan siap bersaing di era digital
                modern.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-orange-500/20">
                  Lihat Program
                </button>

                <button className="bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300">
                  Hubungi Kami
                </button>
              </div>

              {/* Bottom Info */}
              <div className="mt-16 flex flex-wrap items-center gap-8">
                <div>
                  <h3 className="text-3xl font-black text-orange-400">50+</h3>

                  <p className="mt-1 text-white/60 text-sm">Program Digital</p>
                </div>

                <div className="w-px h-12 bg-white/10"></div>

                <div>
                  <h3 className="text-3xl font-black text-orange-400">500+</h3>

                  <p className="mt-1 text-white/60 text-sm">Peserta Aktif</p>
                </div>

                <div className="w-px h-12 bg-white/10"></div>

                <div>
                  <h3 className="text-3xl font-black text-orange-400">100%</h3>

                  <p className="mt-1 text-white/60 text-sm">Sertifikat Resmi</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
