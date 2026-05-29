import { FaClipboardCheck, FaLock, FaArrowRight } from "react-icons/fa";

export default function ExamBanner({ course }) {
  // ========================================
  // CHECK COMPLETION
  // ========================================

  const totalModules = course.modules.length;

  const completedModules = course.modules.filter(
    (module) => module.completed,
  ).length;

  const isUnlocked = totalModules === completedModules;

  return (
    <section className="mt-8">
      {/* ========================================
          CONTAINER
      ======================================== */}

      <div
        className="
          relative
          overflow-hidden

          rounded-[40px]

          bg-[#1B120D]

          border
          border-white/5

          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            top-0
            right-0

            w-[300px]
            h-[300px]

            bg-orange-500/10

            rounded-full
            blur-3xl
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10

            grid
            lg:grid-cols-[120px_1fr_auto]

            gap-8

            items-center

            p-8
            lg:p-10
          "
        >
          {/* ICON */}
          <div
            className="
              w-24
              h-24

              rounded-[32px]

              bg-orange-500

              flex
              items-center
              justify-center

              text-white
              text-4xl
            "
          >
            {isUnlocked ? <FaClipboardCheck /> : <FaLock />}
          </div>

          {/* CONTENT */}
          <div>
            <h2
              className="
                text-3xl
                lg:text-4xl

                font-black

                text-white
              "
            >
              {isUnlocked ? "Ujian Akhir Terbuka" : "Ujian Akhir Terkunci"}
            </h2>

            <p
              className="
                mt-4

                text-white/60

                leading-relaxed

                max-w-3xl
              "
            >
              {isUnlocked
                ? `
                  Selamat! Kamu sudah
                  menyelesaikan seluruh materi.
                  Sekarang kamu bisa mengikuti
                  ujian akhir untuk mendapatkan
                  sertifikat.
                `
                : `
                  Selesaikan seluruh materi
                  terlebih dahulu untuk membuka
                  ujian akhir dan mendapatkan
                  sertifikat.
                `}
            </p>
          </div>

          {/* BUTTON */}
          <button
            disabled={!isUnlocked}
            className="
              group

              h-16
              px-8

              rounded-2xl

              bg-orange-500
              hover:bg-orange-400

              disabled:bg-white/10
              disabled:text-white/40
              disabled:cursor-not-allowed

              text-white
              font-semibold

              transition-all
              duration-300

              inline-flex
              items-center
              gap-3
            "
          >
            <span>Mulai Ujian</span>

            <FaArrowRight
              className="
                group-hover:translate-x-1
                transition-all
              "
            />
          </button>
        </div>
      </div>
    </section>
  );
}
