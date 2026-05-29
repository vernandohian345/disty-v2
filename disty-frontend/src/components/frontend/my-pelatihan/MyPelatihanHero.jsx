import { motion } from "framer-motion";

import {
  FaBookOpen,
  FaChartLine,
  FaPlayCircle,
  FaArrowRight,
} from "react-icons/fa";

export default function MyPelatihanHero() {
  return (
    <section>
      {/* ========================================
          HERO CONTAINER
      ======================================== */}

      <div
        className="
          relative
          overflow-hidden

          rounded-[40px]

          bg-[#1B120D]

          min-h-[420px]

          border
          border-white/5

          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        "
      >
        {/* ========================================
            BACKGROUND GLOW
        ======================================== */}

        <div
          className="
            absolute
            top-0
            right-0

            w-[400px]
            h-[400px]

            bg-orange-500/10

            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0

            w-[300px]
            h-[300px]

            bg-amber-400/10

            rounded-full
            blur-3xl
          "
        />

        {/* ========================================
            GRID PATTERN
        ======================================== */}

        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="
              h-full
              w-full

              bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

              bg-[size:60px_60px]
            "
          />
        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div
          className="
            relative
            z-10

            grid
            lg:grid-cols-2

            gap-12

            p-8
            lg:p-14
          "
        >
          {/* ========================================
              LEFT CONTENT
          ======================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2

                px-4
                py-2

                rounded-full

                bg-orange-500/15

                text-orange-300
                text-sm
                font-semibold
              "
            >
              Dashboard Pembelajaran
            </div>

            {/* TITLE */}
            <h1
              className="
                mt-7

                text-4xl
                lg:text-6xl

                font-black

                text-white

                leading-[1.05]
              "
            >
              Selamat Datang
              <span className="block text-orange-400">di Kelas Kamu</span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6

                text-white/60

                text-base
                leading-relaxed

                max-w-2xl
              "
            >
              Lanjutkan proses belajarmu, selesaikan materi, kerjakan quiz, dan
              raih sertifikat terbaikmu bersama Disty Academy.
            </p>

            {/* BUTTON */}
            <div className="mt-10">
              <button
                className="
                  group

                  inline-flex
                  items-center
                  gap-3

                  h-14
                  px-8

                  rounded-2xl

                  bg-orange-500
                  hover:bg-orange-400

                  text-white
                  font-semibold

                  transition-all
                  duration-300

                  shadow-[0_10px_30px_rgba(249,115,22,0.35)]
                "
              >
                <FaPlayCircle />

                <span>Mulai Belajar</span>

                <FaArrowRight
                  className="
                    group-hover:translate-x-1
                    transition-all
                  "
                />
              </button>
            </div>
          </motion.div>

          {/* ========================================
              RIGHT CONTENT
          ======================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="
              flex
              items-center
              justify-end
            "
          >
            <div
              className="
                w-full
                max-w-md

                space-y-5
              "
            >
              {/* CARD 1 */}
              <div
                className="
                  rounded-[32px]

                  bg-white/5

                  backdrop-blur-xl

                  border
                  border-white/10

                  p-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  {/* ICON */}
                  <div
                    className="
                      w-16
                      h-16

                      rounded-3xl

                      bg-orange-500

                      flex
                      items-center
                      justify-center

                      text-white
                      text-2xl
                    "
                  >
                    <FaBookOpen />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <p className="text-white/40 text-sm">Total Kelas</p>

                    <h3
                      className="
                        text-4xl
                        font-black
                        text-white
                        mt-2
                      "
                    >
                      4
                    </h3>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div
                className="
                  rounded-[32px]

                  bg-white/5

                  backdrop-blur-xl

                  border
                  border-white/10

                  p-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  {/* ICON */}
                  <div
                    className="
                      w-16
                      h-16

                      rounded-3xl

                      bg-emerald-500

                      flex
                      items-center
                      justify-center

                      text-white
                      text-2xl
                    "
                  >
                    <FaChartLine />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <p className="text-white/40 text-sm">Progress Belajar</p>

                    <h3
                      className="
                        text-4xl
                        font-black
                        text-white
                        mt-2
                      "
                    >
                      68%
                    </h3>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-6">
                  <div
                    className="
                      h-4

                      rounded-full

                      bg-white/10
                      overflow-hidden
                    "
                  >
                    <div
                      className="
                        h-full

                        rounded-full

                        bg-gradient-to-r
                        from-orange-500
                        to-amber-400
                      "
                      style={{
                        width: "68%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
