import programHeroImage from "/src/assets/images/training.jpg";
import certificateIcon from "/src/assets/images/logo-putih.png";
import { motion } from "framer-motion";

const STATS = [
  { icon: "🎓", label: "Program", value: "20+" },
  { icon: "⭐", label: "Rating", value: "4.9/5" },
  { icon: "✅", label: "Tersertifikasi", value: "500+" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CertificationHero() {
  return (
    <section className="px-4 lg:px-8 pt-6">
      <div className="relative overflow-hidden rounded-[36px] min-h-[650px]">
        {/* Background */}
        <div className="absolute inset-0">
          <motion.img
            src={programHeroImage}
            alt="Certification Hero"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full object-cover object-center opacity-80"
          />

          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-[#140d09]/95
              via-[#140d09]/75
              to-black/40
            "
          />
        </div>

        {/* Ambient Orbs */}
        <div
          className="
            absolute -top-20 -left-20
            w-[500px] h-[500px]
            rounded-full
            bg-[radial-gradient(circle,rgba(253,186,116,0.22)_0%,transparent_70%)]
            animate-[pulse_7s_ease-in-out_infinite]
          "
        />

        <div
          className="
            absolute -bottom-16 -right-16
            w-[400px] h-[400px]
            rounded-full
            bg-[radial-gradient(circle,rgba(251,191,36,0.14)_0%,transparent_70%)]
            animate-[pulse_9s_ease-in-out_2s_infinite]
          "
        />

        {/* Grid Overlay */}
        <div
          className="
            absolute inset-0
            opacity-[0.03]
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />

        {/* Border Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center py-12">
            {/* LEFT SIDE */}
            <motion.div
              className="text-left"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* Image */}
              <motion.img
                src={certificateIcon}
                alt="Certification"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: [0, -12, 0],
                }}
                transition={{
                  opacity: {
                    duration: 0.8,
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="
                  w-24
                  lg:w-28
                  mb-8
                  drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]
                "
              />
              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="font-black tracking-tight leading-[1.02] mb-6"
                style={{ fontSize: "clamp(2rem,5vw,5rem)" }}
              >
                <span className="block text-white">Raih Sertifikasi,</span>

                <span
                  className="block text-transparent"
                  style={{ WebkitTextStroke: "2px #f97316" }}
                >
                  Buktikan Kompetensi
                </span>

                <span className="block bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Tingkatkan Karirmu
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="
                  text-[15px]
                  text-white/75
                  leading-relaxed
                  max-w-xl
                  mb-10
                "
              >
                Ikuti sertifikasi profesional yang dirancang untuk meningkatkan
                kompetensi, memperkuat portofolio, dan mendukung perkembangan
                karirmu di era digital.
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mt-10"
              >
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  href="#sertifikasi"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    h-14
                    px-8
                    rounded-2xl
                    bg-gradient-to-r
                    from-orange-500
                    to-orange-400
                    hover:from-orange-400
                    hover:to-amber-400
                    text-white
                    font-bold
                    shadow-[0_10px_32px_rgba(249,115,22,0.38)]
                    transition-all
                    duration-300
                  "
                >
                  Lihat Sertifikasi
                  <motion.svg
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4-4 4M3 12h18"
                    />
                  </motion.svg>
                </motion.a>

                <motion.a
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    h-14
                    px-8
                    rounded-2xl
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-white/10
                    text-white
                    font-bold
                    hover:bg-white
                    hover:text-orange-500
                    transition-all
                    duration-300
                  "
                >
                  Konsultasi Gratis
                </motion.a>
              </motion.div>
            </motion.div>
            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-5 items-center lg:items-end">
              {STATS.map(({ icon, label, value }, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: index * 0.2 },
                    x: { duration: 0.8, delay: index * 0.2 },
                    y: {
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                  }}
                  viewport={{ once: true }}
                  key={label}
                  className="
                    w-full
                    max-w-[280px]
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/10
                    rounded-[24px]
                    px-3
                    py-3
                    
                    hover:-translate-y-1
                  hover:border-orange-400/30
                    hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)]
                    transition-all
                    duration-300
                  "
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className="
                        w-10 h-10
                        rounded-2xl
                        bg-gradient-to-br
                        from-orange-500
                        to-amber-400
                        flex
                        items-center
                        justify-center
                        text-lg
                        shadow-lg
                        shrink-0
                      "
                    >
                      {icon}
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-white/60 text-[15px] font-medium">
                        {label}
                      </p>

                      <p className="text-white text-xl font-black">{value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
