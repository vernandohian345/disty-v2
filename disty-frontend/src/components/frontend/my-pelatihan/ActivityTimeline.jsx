import {
  FaCheckCircle,
  FaPlayCircle,
  FaClipboardCheck,
  FaArrowRight,
} from "react-icons/fa";

export default function ActivityTimeline() {
  // ========================================
  // DUMMY ACTIVITY
  // ========================================

  const activities = [
    {
      title: "Menyelesaikan Materi HTML",

      description: "Kamu telah menyelesaikan modul dasar HTML.",

      time: "2 Jam Lalu",

      icon: FaCheckCircle,

      color: "bg-emerald-500",
    },

    {
      title: "Melanjutkan Kelas Frontend",

      description: "Progress belajar meningkat menjadi 68%.",

      time: "Kemarin",

      icon: FaPlayCircle,

      color: "bg-orange-500",
    },

    {
      title: "Quiz CSS Diselesaikan",

      description: "Kamu berhasil mendapatkan skor 90.",

      time: "2 Hari Lalu",

      icon: FaClipboardCheck,

      color: "bg-blue-500",
    },
  ];

  return (
    <section className="mt-20 mb-10">
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          mb-8
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
            Aktivitas Belajar
          </h2>

          <p
            className="
              mt-2
              text-black/50
            "
          >
            Riwayat aktivitas terbaru selama proses belajar.
          </p>
        </div>
      </div>

      {/* ========================================
          TIMELINE
      ======================================== */}

      <div
        className="
          relative

          rounded-[36px]

          bg-white

          border
          border-black/5

          p-8
        "
      >
        {/* LINE */}
        <div
          className="
            absolute
            top-10
            bottom-10
            left-14

            w-[2px]

            bg-[#f1ebe7]
          "
        />

        {/* ITEMS */}
        <div className="space-y-8">
          {activities.map(
            (
              { title, description, time, icon: Icon, color },

              index,
            ) => (
              <div
                key={index}
                className="
                  relative

                  flex
                  items-start
                  gap-6
                "
              >
                {/* ICON */}
                <div
                  className={`
                    relative
                    z-10

                    w-12
                    h-12

                    rounded-2xl

                    ${color}

                    flex
                    items-center
                    justify-center

                    text-white
                    text-lg

                    shrink-0
                  `}
                >
                  <Icon />
                </div>

                {/* CONTENT */}
                <div
                  className="
                    flex-1

                    rounded-3xl

                    bg-[#faf7f4]

                    p-6
                  "
                >
                  {/* TOP */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between

                      gap-4
                    "
                  >
                    <h3
                      className="
                        text-xl
                        font-bold
                        text-[#2B1D16]
                      "
                    >
                      {title}
                    </h3>

                    <span
                      className="
                        text-sm
                        text-black/40
                        whitespace-nowrap
                      "
                    >
                      {time}
                    </span>
                  </div>

                  {/* DESC */}
                  <p
                    className="
                      mt-3

                      text-black/55

                      leading-relaxed
                    "
                  >
                    {description}
                  </p>

                  {/* ACTION */}
                  <button
                    className="
                      group

                      mt-5

                      inline-flex
                      items-center
                      gap-3

                      text-orange-500
                      font-semibold

                      hover:text-orange-400

                      transition-all
                    "
                  >
                    <span>Lihat Detail</span>

                    <FaArrowRight
                      className="
                        group-hover:translate-x-1
                        transition-all
                      "
                    />
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
