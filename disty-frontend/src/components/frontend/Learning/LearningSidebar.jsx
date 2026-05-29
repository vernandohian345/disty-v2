import {
  FaPlayCircle,
  FaCheckCircle,
  FaLock,
  FaClipboardCheck,
} from "react-icons/fa";

export default function LearningSidebar({
  course,
  selectedModule,
  setSelectedModule,
}) {
  const completedModules = course.modules.filter(
    (module) => module.completed,
  ).length;

  const isExamUnlocked = completedModules === course.modules.length;
  return (
    <aside
      className="
        xl:sticky
        xl:top-28

        h-fit

        rounded-[36px]

        bg-white

        border
        border-black/5

        overflow-hidden

        shadow-sm
      "
    >
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        className="
          relative

          h-56

          overflow-hidden
        "
      >
        {/* IMAGE */}
        <img
          src={course.thumbnail}
          alt={course.title}
          className="
            w-full
            h-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
          "
        />

        {/* CONTENT */}
        <div
          className="
            absolute
            bottom-6
            left-6
            right-6
          "
        >
          {/* CATEGORY */}
          <div
            className="
              inline-flex
              items-center

              px-4
              py-2

              rounded-full

              bg-white/20
              backdrop-blur-xl

              text-white
              text-xs
              font-semibold
            "
          >
            {course.category}
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-4

              text-2xl
              font-black

              text-white

              leading-snug
            "
          >
            {course.title}
          </h2>
        </div>
      </div>

      {/* ========================================
          BODY
      ======================================== */}

      <div className="p-6">
        {/* ========================================
            SECTION TITLE
        ======================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            mb-6
          "
        >
          <h3
            className="
              text-lg
              font-black
              text-[#2B1D16]
            "
          >
            Materi Kelas
          </h3>

          <span
            className="
              text-sm
              text-black/40
              font-medium
            "
          >
            {course.modules.length} Modul
          </span>
        </div>

        {/* ========================================
            MODULE LIST
        ======================================== */}

        <div className="space-y-4">
          {course?.modules?.map((module, index) => {
            const isActive = selectedModule?.id === module.id;

            return (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className={`
                    group

                    w-full

                    flex
                    items-start
                    gap-4

                    text-left

                    p-5

                    rounded-3xl

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-[#2B1D16]
                          text-white
                        `
                        : `
                          bg-[#faf7f4]
                          hover:bg-[#f3ece7]
                        `
                    }
                  `}
              >
                {/* ICON */}
                <div
                  className={`
                      w-12
                      h-12

                      rounded-2xl

                      flex
                      items-center
                      justify-center

                      shrink-0

                      ${
                        module.completed
                          ? `
                            bg-emerald-500
                            text-white
                          `
                          : isActive
                            ? `
                            bg-orange-500
                            text-white
                          `
                            : `
                            bg-white
                            text-orange-500
                          `
                      }
                    `}
                >
                  {module.completed ? <FaCheckCircle /> : <FaPlayCircle />}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  {/* TOP */}
                  <div
                    className="
                        flex
                        items-center
                        justify-between

                        gap-4
                      "
                  >
                    <h4
                      className="
                          font-bold
                          leading-snug
                        "
                    >
                      {index + 1}. {module.title}
                    </h4>

                    {/* STATUS */}
                    {module.completed ? (
                      <FaCheckCircle
                        className="
                            text-emerald-400
                            shrink-0
                          "
                      />
                    ) : (
                      <FaLock
                        className={`
                            shrink-0

                            ${
                              isActive
                                ? `
                                  text-orange-300
                                `
                                : `
                                  text-black/30
                                `
                            }
                          `}
                      />
                    )}
                  </div>

                  {/* DURATION */}
                  <p
                    className={`
                        mt-2

                        text-sm

                        ${
                          isActive
                            ? `
                              text-white/60
                            `
                            : `
                              text-black/40
                            `
                        }
                      `}
                  >
                    {module.duration}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================
            FINAL EXAM
        ======================================== */}

        <div
          className="
            mt-8

            rounded-[32px]

            bg-[#2B1D16]

            p-6
          "
        >
          {/* TOP */}
          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            {/* ICON */}
            <div
              className="
                w-14
                h-14

                rounded-2xl

                bg-orange-500

                flex
                items-center
                justify-center

                text-white
                text-xl

                shrink-0
              "
            >
              <FaClipboardCheck />
            </div>

            {/* CONTENT */}
            <div>
              <h3
                className="
                  text-xl
                  font-black
                  text-white
                "
              >
                Ujian Akhir
              </h3>

              <p
                className="
                  mt-2

                  text-sm
                  leading-relaxed

                  text-white/60
                "
              >
                Selesaikan seluruh materi untuk membuka ujian akhir.
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            className="
              mt-6

              w-full
              h-14

              rounded-2xl

              bg-orange-500
              hover:bg-orange-400

              text-white
              font-semibold

              transition-all
              duration-300
            "
          >
            Mulai Ujian
          </button>
        </div>
      </div>
    </aside>
  );
}
