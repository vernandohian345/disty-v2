import { motion } from "framer-motion";

import aboutHeroImage from "/src/assets/images/company.jpg";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fffaf5]">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 pt-6 lg:pt-6">
        {/* Floating Logo */}
        <div className="absolute top-8 left-14 z-30">
          <img
            src="/src/assets/images/logo-putih.png"
            alt="Disty Academy"
            className="w-[140px] object-contain drop-shadow-xl"
          />
        </div>

        {/* Hero Container */}
        <div className="relative overflow-hidden bg-[#ffe3ca] min-h-[calc(100vh-90px)] rounded-[32px]">
          {/* Background Glow */}
          <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#fdb64d] blur-3xl rounded-full"></div>

          {/* Hero Image */}
          <div className="absolute inset-0">
            <img
              src={aboutHeroImage}
              alt="About Disty Academy"
              className="w-full h-full object-cover object-center opacity-90"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1f140f]/90 via-[#1f140f]/65 to-black/40 to-transparent"></div>
          </div>

          {/* Orange Glow */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-400/25 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-amber-300/20 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center min-h-[75vh] px-6 py-24 sm:px-5 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
                Tentang Disty Academy
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white">
                Membangun Generasi
                <span className="block text-orange-400">Digital yang Siap</span>
                Bersaing
              </h1>

              {/* Description */}
              <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
                Disty Academy hadir sebagai platform edukasi dan pengembangan
                skill digital yang berfokus pada pembelajaran modern,
                sertifikasi profesional, dan pengembangan talenta masa depan.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
