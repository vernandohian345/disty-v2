import { BadgeCheck, BookOpen, Users } from "lucide-react";
import Reveal from "../../ui/Reveal";

export default function AboutSection() {
  return (
    <section className="pt-8 py-1 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-5 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

              <img
                src="/src/assets/images/distydevo.jpg"
                alt="About Disty"
                className="relative z-10 rounded-[32px] shadow-soft w-full"
              />
            </div>

            {/* Content */}
            <div>
              {/* Small Title */}
              <div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                Tentang Disty Akademi
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-black leading-tight text-darkText">
                Satu Platform,
                <span className="text-orange-300 block">
                  Semua Skill & Sertifikasi
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Disty Akademi hadir sebagai platform pembelajaran modern yang
                membantu generasi digital meningkatkan kemampuan melalui
                bootcamp, pelatihan, dan sertifikasi profesional terpercaya.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-6">
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                    <BookOpen className="text-orange-300 w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-darkText">
                      Bootcamp Interaktif
                    </h3>

                    <p className="text-slate-500 mt-1">
                      Belajar langsung dari mentor profesional dengan materi
                      industri terkini.
                    </p>
                  </div>
                </div>

                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyanAccent/10 flex items-center justify-center">
                    <BadgeCheck className="text-orange-300 w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-darkText">
                      Sertifikasi Resmi
                    </h3>

                    <p className="text-slate-500 mt-1">
                      Dapatkan sertifikat resmi untuk meningkatkan kredibilitas
                      profesional.
                    </p>
                  </div>
                </div>

                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purpleAccent/10 flex items-center justify-center">
                    <Users className="text-orange-300 w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-darkText">
                      Komunitas Aktif
                    </h3>

                    <p className="text-slate-500 mt-1">
                      Terhubung dengan peserta lain dan bangun networking
                      profesional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
