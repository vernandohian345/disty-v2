import { motion } from "framer-motion";

import { FaPlay, FaClock, FaBookOpen, FaArrowRight } from "react-icons/fa";

export default function ContinueLearning({ data }) {
  // ========================================
  // JIKA TIDAK ADA DATA
  // ========================================

  if (!data || data.length === 0) {
    return null;
  }

  // ========================================
  // AMBIL COURSE PERTAMA
  // ========================================

  const currentCourse = data[0];

  const pelatihan = currentCourse.pelatihan;

  return (
    <section className="mt-14">
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          mb-6
        "
      >
        <div>
          <h2
            className="
              text-3xl
              font-black
              text-[#2B1D16]
            "
          >
            Lanjutkan Belajar
          </h2>

          <p
            className="
              text-black/50
              mt-2
            "
          >
            Teruskan progress belajar kelas kamu sekarang.
          </p>
        </div>
      </div>

      {/* ========================================
          MAIN CARD
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
        className="
          relative
          overflow-hidden

          rounded-[36px]

          bg-[#1B120D]

          min-h-[380px]

          border
          border-white/5

          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        "
      >
        {/* ========================================
            BACKGROUND IMAGE
        ======================================== */}

        <div className="absolute inset-0">
          <img
            src={`http://127.0.0.1:8000/${pelatihan?.thumbnail}`}
            alt={pelatihan?.title}
            className="
              w-full
              h-full
              object-cover
              opacity-20
            "
          />

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-[#1B120D]
              via-[#1B120D]/95
              to-black/40
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

            gap-10

            p-8
            lg:p-12
          "
        >
          {/* ========================================
              LEFT
          ======================================== */}

          <div>
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
              Sedang Dipelajari
            </div>

            {/* TITLE */}
            <h2
              className="
                mt-6

                text-4xl
                lg:text-5xl

                font-black

                text-white

                leading-tight
              "
            >
              {pelatihan?.title}
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6

                text-white/60

                leading-relaxed

                max-w-xl
              "
            >
              Lanjutkan proses belajarmu dan selesaikan kelas untuk mendapatkan
              sertifikat terbaik.
            </p>

            {/* STATS */}
            <div
              className="
                flex
                flex-wrap
                gap-4

                mt-8
              "
            >
              {/* STATUS */}
              <div
                className="
                  flex
                  items-center
                  gap-3

                  px-5
                  py-3

                  rounded-2xl

                  bg-white/5
                  border
                  border-white/5
                "
              >
                <FaClock className="text-orange-400" />

                <div>
                  <p className="text-white/40 text-xs">Status</p>

                  <h4 className="text-white font-semibold capitalize">
                    {currentCourse.status}
                  </h4>
                </div>
              </div>

              {/* CATEGORY */}
              <div
                className="
                  flex
                  items-center
                  gap-3

                  px-5
                  py-3

                  rounded-2xl

                  bg-white/5
                  border
                  border-white/5
                "
              >
                <FaBookOpen className="text-orange-400" />

                <div>
                  <p className="text-white/40 text-xs">Kategori</p>

                  <h4 className="text-white font-semibold">Pelatihan</h4>
                </div>
              </div>
            </div>

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
                "
              >
                <FaPlay />

                <span>Masuk Kelas</span>

                <FaArrowRight
                  className="
                    group-hover:translate-x-1
                    transition-all
                  "
                />
              </button>
            </div>
          </div>

          {/* ========================================
              RIGHT
          ======================================== */}

          <div
            className="
              flex
              items-end
              justify-end
            "
          >
            <div
              className="
                w-full
                max-w-md

                rounded-[32px]

                bg-white/5

                backdrop-blur-xl

                border
                border-white/10

                p-8
              "
            >
              <p className="text-white/40 text-sm">Progress Belajar</p>

              <h3
                className="
                  text-5xl
                  font-black
                  text-white
                  mt-4
                "
              >
                68%
              </h3>

              {/* BAR */}
              <div className="mt-8">
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
        </div>
      </motion.div>
    </section>
  );
}
