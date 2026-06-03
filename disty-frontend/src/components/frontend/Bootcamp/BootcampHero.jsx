import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { FaArrowRight, FaUsers, FaStar, FaGraduationCap } from "react-icons/fa";

import programHeroImage from "/src/assets/images/training.jpg";
import distyLogo from "/src/assets/images/logo-putih.png";

function useCounter(target, duration = 1800, delay = 700) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const start = Date.now();

      const tick = () => {
        const elapsed = Date.now() - start;

        const progress = Math.min(elapsed / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        setCount(Math.round(target * eased));

        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, duration, delay]);

  return count;
}

const marqueeItems = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
  "Cloud Computing",
  "Cybersecurity",
  "Mobile Development",
  "AI & Machine Learning",
];

const stats = [
  {
    icon: FaUsers,

    bg: "bg-orange-500",

    label: "Peserta Aktif",

    value: null,

    suffix: "+",

    target: 500,
  },

  {
    icon: FaStar,

    bg: "bg-amber-400",

    label: "Rating Program",

    value: "4.9/5",

    suffix: "",

    target: null,
  },

  {
    icon: FaGraduationCap,

    bg: "bg-emerald-500",

    label: "Program Tersedia",

    value: "24+",

    suffix: "",

    target: null,
  },
];

const tags = ["Bootcamp", "Sertifikasi", "Mentoring", "Workshop"];

export default function ProgramHero() {
  const studentCount = useCounter(500, 1800, 700);

  return (
    <section className="relative overflow-hidden bg-[#fffaf5]">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
        {/* ========================================
            HERO SHELL
        ======================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]

            min-h-[540px]
            lg:min-h-[650px]

            bg-[#1a0f0a]

            border
            border-white/[0.08]

            shadow-[0_32px_100px_rgba(0,0,0,0.55)]
          "
        >
          {/* ========================================
              BACKGROUND
          ======================================== */}
          <div className="absolute inset-0">
            <img
              src={programHeroImage}
              alt="Program Disty Academy"
              className="
                w-full
                h-full
                object-cover
                object-center
                scale-110
                opacity-35
              "
            />

            {/* GRADIENT */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-r
                from-[#0d0604]/98
                via-[#110807]/88
                to-[#0d0604]/40
              "
            />

            {/* VIGNETTE */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-[#0d0604]/80
                via-transparent
                to-transparent
              "
            />
          </div>
          {/* ========================================
              NOISE OVERLAY
          ======================================== */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.035]
              mix-blend-screen
              pointer-events-none
            "
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,

              backgroundSize: "180px 180px",
            }}
          />
          {/* ========================================
              AMBIENT GLOW
          ======================================== */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],

              opacity: [0.14, 0.24, 0.14],
            }}
            transition={{
              duration: 7,

              repeat: Infinity,

              ease: "easeInOut",
            }}
            className="
              absolute
              -top-24
              -left-24

              w-[650px]
              h-[650px]

              bg-orange-600/20

              blur-[110px]
              rounded-full

              pointer-events-none
            "
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],

              opacity: [0.04, 0.1, 0.04],
            }}
            transition={{
              duration: 9,

              repeat: Infinity,

              ease: "easeInOut",

              delay: 2.5,
            }}
            className="
              absolute
              bottom-0
              right-10

              w-[380px]
              h-[380px]

              bg-amber-400/15

              blur-[90px]
              rounded-full

              pointer-events-none
            "
          />
          {/* ========================================
              GRID
          ======================================== */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div
              className="
                h-full
                w-full

                bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

                bg-[size:64px_64px]
              "
            />
          </div>
          {/* ========================================
              ACCENT LINE
          ======================================== */}
          <div
            className="
              absolute
              top-0
              right-[33%]

              w-px
              h-full

              bg-gradient-to-b
              from-transparent
              via-orange-500/15
              to-transparent

              -rotate-12
              origin-top

              pointer-events-none
            "
          />
          {/* ========================================
              TOP LOGO
          ======================================== */}
          <div className="absolute top-8 left-14 z-30">
            <img
              src="/src/assets/images/logo-putih.png"
              alt="Disty Akademi"
              className="w-[140px] object-contain drop-shadow-xl"
            />
          </div>

          {/* ========================================
              FLOATING STATS
          ======================================== */}
          <div
            className="
              hidden
              lg:flex

              absolute
              right-12
              top-1/2
              -translate-y-1/2

              z-20

              flex-col
              gap-3
            "
          >
            {stats.map(
              (
                { icon: Icon, bg, label, value, suffix, target },

                i,
              ) => (
                <motion.div
                  key={label}
                  initial={{
                    opacity: 0,
                    x: 50,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.15,
                  }}
                  whileHover={{
                    x: -5,

                    transition: {
                      duration: 0.2,
                    },
                  }}
                  className="
                    flex
                    items-center
                    gap-4

                    px-5
                    py-4

                    rounded-2xl

                    bg-white/[0.07]
                    backdrop-blur-2xl

                    border
                    border-white/[0.09]

                    cursor-default
                    select-none
                  "
                >
                  <div
                    className={`
                      w-11
                      h-11

                      rounded-xl

                      ${bg}

                      flex
                      items-center
                      justify-center

                      text-white
                      text-[15px]

                      shrink-0
                      shadow-lg
                    `}
                  >
                    <Icon />
                  </div>

                  <div>
                    <p
                      className="
                        text-white/45
                        text-xs
                        font-medium
                        mb-0.5
                      "
                    >
                      {label}
                    </p>

                    <h3
                      className="
                        text-[18px]
                        font-black
                        text-white
                        tracking-tight
                        leading-none
                      "
                    >
                      {target != null ? `${studentCount}${suffix}` : value}
                    </h3>
                  </div>
                </motion.div>
              ),
            )}
          </div>
          {/* ========================================
              CONTENT
          ======================================== */}
          <div
            className="
              relative
              z-10

              flex
              items-center

              min-h-[540px]
              lg:min-h-[650px]

              px-6
              py-12

              sm:px-10

              lg:px-14
            "
          >
            <div className="max-w-[580px]">
              {/* ========================================
                  HEADING
              ======================================== */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 36,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                }}
                className="
                  font-black
                  leading-[1.0]
                  tracking-[-0.02em]
                "
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                }}
              >
                <span className="text-white">Jelajahi</span>
                <br />
                <span
                  className="text-transparent"
                  style={{
                    WebkitTextStroke: "1.5px rgba(251,146,60,0.75)",
                  }}
                >
                  Program
                </span>
                <br />
                <span className="text-white">Masa</span>{" "}
                <span
                  className="
                    bg-gradient-to-r
                    from-orange-400
                    via-amber-300
                    to-orange-400

                    bg-clip-text
                    text-transparent
                  "
                >
                  Depan
                </span>
              </motion.h1>

              {/* ========================================
                  TAGS
              ======================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.35,
                }}
                className="
                  flex
                  flex-wrap
                  gap-2
                  mt-6
                "
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      text-[11px]

                      px-3
                      py-1.5

                      rounded-full

                      font-semibold

                      border
                      border-orange-500/30

                      bg-orange-500/[0.12]

                      text-orange-300

                      tracking-wide
                    "
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* ========================================
                  DESCRIPTION
              ======================================== */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.48,
                }}
                className="
                  mt-6

                  text-sm
                  sm:text-[15px]

                  text-white/50

                  leading-[1.75]

                  max-w-[460px]
                "
              >
                Bootcamp, pelatihan, dan sertifikasi profesional yang dirancang
                untuk membantu kamu berkembang dan siap bersaing di era digital.
              </motion.p>

              {/* ========================================
                  BUTTONS
              ======================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.62,
                }}
                className="
                  mt-10
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {/* PRIMARY */}
                <a
                  href="#program"
                  className="
                    group

                    inline-flex
                    items-center
                    justify-center
                    gap-3

                    h-12
                    px-7

                    rounded-xl

                    bg-gradient-to-r
                    from-orange-500
                    to-orange-400

                    hover:from-orange-400
                    hover:to-amber-400

                    text-white
                    text-sm
                    font-bold

                    transition-all
                    duration-300

                    shadow-[0_10px_32px_rgba(249,115,22,0.38)]

                    hover:shadow-[0_14px_40px_rgba(249,115,22,0.55)]

                    hover:-translate-y-0.5
                  "
                >
                  <span>Lihat Semua Program</span>

                  <FaArrowRight
                    className="
                      group-hover:translate-x-1
                      transition-transform
                      text-[11px]
                    "
                  />
                </a>

                {/* SECONDARY */}
                <button
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2.5

                    h-12
                    px-7

                    rounded-xl

                    border
                    border-white/[0.14]

                    bg-white/[0.06]

                    hover:bg-white/[0.11]

                    hover:border-white/[0.22]

                    text-white/75
                    hover:text-white

                    text-sm
                    font-semibold

                    backdrop-blur-sm

                    transition-all
                    duration-300
                  "
                >
                  Konsultasi Gratis
                </button>
              </motion.div>
            </div>
          </div>
          {/* ========================================
              MARQUEE
          ======================================== */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0

              border-t
              border-white/[0.07]

              overflow-hidden

              bg-white/[0.02]
              backdrop-blur-sm
            "
          >
            <div
              className="flex"
              style={{
                animation: "marquee 28s linear infinite",
              }}
            >
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
                (item, i) => (
                  <span
                    key={i}
                    className="
                    inline-flex
                    items-center
                    gap-3.5

                    px-6
                    py-3.5

                    text-white
                    text-[10px]
                    font-semibold
                    uppercase

                    tracking-[0.18em]

                    whitespace-nowrap
                    shrink-0
                  "
                  >
                    <span
                      className="
                      w-1
                      h-1
                      rounded-full
                      bg-orange-500/50
                      shrink-0
                    "
                    />

                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          KEYFRAMES
      ======================================== */}

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
