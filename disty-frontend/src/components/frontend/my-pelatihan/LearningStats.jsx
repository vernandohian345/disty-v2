import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

export default function LearningStats({ data }) {
  // ========================================
  // TOTAL KELAS
  // ========================================

  const totalClass = data.length;

  // ========================================
  // COMPLETED CLASS
  // ========================================

  const completedClass = data.filter(
    (item) => item.status === "completed",
  ).length;

  // ========================================
  // PENDING CLASS
  // ========================================

  const pendingClass = data.filter((item) => item.status === "pending").length;

  // ========================================
  // AVG PROGRESS
  // ========================================

  const averageProgress =
    totalClass > 0 ? Math.round((completedClass / totalClass) * 100) : 0;

  // ========================================
  // STATS ARRAY
  // ========================================

  const stats = [
    {
      title: "Total Kelas",

      value: totalClass,

      icon: FaBookOpen,

      gradient: "from-orange-500 to-amber-400",
    },

    {
      title: "Kelas Selesai",

      value: completedClass,

      icon: FaCheckCircle,

      gradient: "from-emerald-500 to-green-400",
    },

    {
      title: "Kelas Pending",

      value: pendingClass,

      icon: FaClock,

      gradient: "from-blue-500 to-cyan-400",
    },

    {
      title: "Progress Belajar",

      value: `${averageProgress}%`,

      icon: FaChartLine,

      gradient: "from-purple-500 to-pink-400",
    },
  ];

  return (
    <section className="mt-20">
      {/* ========================================
          HEADER
      ======================================== */}

      <div className="mb-8">
        <h2
          className="
            text-3xl
            font-black
            text-[#2B1D16]
          "
        >
          Statistik Belajar
        </h2>

        <p
          className="
            mt-2
            text-black/50
          "
        >
          Pantau progress belajar dan perkembangan kelasmu.
        </p>
      </div>

      {/* ========================================
          GRID
      ======================================== */}

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-4

          gap-6
        "
      >
        {stats.map(
          (
            { title, value, icon: Icon, gradient },

            index,
          ) => (
            <div
              key={index}
              className="
                relative
                overflow-hidden

                rounded-[32px]

                bg-white

                border
                border-black/5

                p-7

                shadow-sm
                hover:shadow-xl

                transition-all
                duration-500

                hover:-translate-y-2
              "
            >
              {/* GLOW */}
              <div
                className={`
                  absolute
                  top-0
                  right-0

                  w-32
                  h-32

                  rounded-full

                  bg-gradient-to-br
                  ${gradient}

                  opacity-10

                  blur-3xl
                `}
              />

              {/* ICON */}
              <div
                className={`
                  w-16
                  h-16

                  rounded-3xl

                  bg-gradient-to-br
                  ${gradient}

                  flex
                  items-center
                  justify-center

                  text-white
                  text-2xl

                  shadow-lg
                `}
              >
                <Icon />
              </div>

              {/* VALUE */}
              <h3
                className="
                  mt-8

                  text-5xl
                  font-black

                  text-[#2B1D16]
                "
              >
                {value}
              </h3>

              {/* TITLE */}
              <p
                className="
                  mt-3

                  text-black/50
                  font-medium
                "
              >
                {title}
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
