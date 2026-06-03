import { motion } from "framer-motion";
import Button from "../../ui/Button";

import heroImage from "../../../assets/images/beranda-hero.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 pt-6 lg:pt-6">
        {/* Floating Logo */}
        <div className="absolute top-8 left-14 z-30">
          <img
            src="/src/assets/images/logo-putih.png"
            alt="Disty Akademi"
            className="w-[140px] object-contain drop-shadow-xl"
          />
        </div>
        {/* Hero Container */}
        <div className="relative overflow-hidden bg-[#ffe3ca] min-h-[calc(100vh-90px)] rounded-[32px]">
          {/* Background Glow */}
          <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#fdb64d] blur-3xl rounded-full"></div>

          {/* Hero Image */}
          <div className="absolute inset-0 ">
            <img
              src={heroImage}
              alt="Hero"
              className="w-full h-full object-cover object-[70%_center] opacity-90"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B1D16]/75 via-[#2B1D16]/45 to-transparent"></div>
          </div>
          {/* Orange Glow 1 */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-400/25 rounded-full blur-3xl"></div>
          {/* Orange Glow 2 */}
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-amber-300/20 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[calc(100vh-90px)] px-6 py-16 sm:px-5 lg:px-10 lg:pt-28">
            {/* Top Spacer */}
            <div></div>

            {/* Bottom Content */}
            <div className="flex flex-col gap-10">
              {/* Left Text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
                  Platform Sertifikasi & Bootcamp Terpercaya
                </div>

                {/* Heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-white">
                  Tingkatkan Skill,
                  <span className="block text-orange-400">
                    Raih Sertifikat Resmi
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl">
                  Disty Akademi hadir untuk membantu kamu mengembangkan skill
                  digital melalui bootcamp dan sertifikasi profesional
                  terpercaya.
                </p>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button>Mulai Belajar</Button>
                  <Button variant="secondary">Lihat Program</Button>
                </div>
              </motion.div>

              {/* Cards Row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
              >
                {/* Card 1 - BNSP */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] p-5 shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/25 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/100 text-[20px] font-medium uppercase tracking-widest">
                      Sertifikasi
                    </p>
                    <h3 className="text-[50px] font-black text-orange-400 leading-tight">
                      BNSP
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-white/100 text-[16px]">
                        Diakui Profesional
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Peserta */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] p-5 shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/25 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/100 text-[20px] font-medium uppercase tracking-widest">
                      Peserta
                    </p>
                    <h3 className="text-[50px] font-black text-orange-400 leading-tight">
                      500+
                    </h3>
                    <p className="text-white/100 text-[16px] mt-1">
                      Peserta Aktif Disty
                    </p>
                  </div>
                </div>

                {/* Card 3 - Program */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] p-5 shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/25 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/100 text-[20px] font-medium uppercase tracking-widest">
                      Program
                    </p>
                    <h3 className="text-[50px] font-black text-orange-400 leading-tight">
                      50+
                    </h3>
                    <p className="text-white/100 text-[16px] mt-1">
                      Bootcamp Digital
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
