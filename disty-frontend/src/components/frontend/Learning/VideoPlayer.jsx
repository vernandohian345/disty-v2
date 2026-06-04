import ReactPlayer from "react-player";

import {
  FaPlayCircle,
  FaClock,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";

export default function VideoPlayer({ module }) {
  // ========================================
  // NO MODULE
  // ========================================

  if (!module) {
    return null;
  }
  console.log("MODULE =", module);
  return (
    <section>
      {/* ========================================
          VIDEO CONTAINER
      ======================================== */}

      <div
        className="
          overflow-hidden

          rounded-[40px]

          bg-white

          border
          border-black/5

          shadow-sm
        "
      >
        {/* ========================================
            VIDEO PLAYER
        ======================================== */}

        <div
          className="
            relative

            aspect-video

            bg-black
          "
        >
          <ReactPlayer
            src={module.video}
            controls={true}
            width="100%"
            height="100%"
            playing={false}
          />
        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="p-8 lg:p-10">
          {/* ========================================
              TOP SECTION
          ======================================== */}

          <div
            className="
              flex
              flex-col
              lg:flex-row

              lg:items-start
              lg:justify-between

              gap-6
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

                  bg-orange-500/10

                  text-orange-500
                  text-sm
                  font-semibold
                "
              >
                Sedang Dipelajari
              </div>

              {/* TITLE */}
              <h1
                className="
                  mt-5

                  text-3xl
                  lg:text-5xl

                  font-black

                  text-[#2B1D16]

                  leading-tight
                "
              >
                {module.title}
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
    mt-5
    max-w-3xl
    text-black/55
    leading-relaxed
  "
              >
                {module.materials?.[0]}
              </p>
            </div>

            {/* ========================================
                RIGHT
            ======================================== */}

            <div
              className="
                flex
                flex-wrap
                gap-4
              "
            >
              {/* DURATION */}
              <div
                className="
                  flex
                  items-center
                  gap-3

                  px-5
                  py-4

                  rounded-3xl

                  bg-[#faf7f4]
                "
              >
                <FaClock className="text-orange-500" />

                <div>
                  <p
                    className="
                      text-xs
                      text-black/40
                    "
                  >
                    Durasi
                  </p>

                  <h4
                    className="
                      font-bold
                      text-[#2B1D16]
                    "
                  >
                    {module.duration}
                  </h4>
                </div>
              </div>

              {/* STATUS */}
              <div
                className="
                  flex
                  items-center
                  gap-3

                  px-5
                  py-4

                  rounded-3xl

                  bg-[#faf7f4]
                "
              >
                <FaCheckCircle className="text-emerald-500" />

                <div>
                  <p
                    className="
                      text-xs
                      text-black/40
                    "
                  >
                    Status
                  </p>

                  <h4
                    className="
                      font-bold
                      text-[#2B1D16]
                    "
                  >
                    {module.completed ? "Selesai" : "Belum"}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================
              MATERIAL SECTION
          ======================================== */}

          <div className="mt-12">
            {/* TITLE */}
            <div
              className="
                flex
                items-center
                gap-3

                mb-6
              "
            >
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
                "
              >
                <FaBookOpen />
              </div>

              <div>
                <h2
                  className="
                    text-2xl
                    font-black
                    text-[#2B1D16]
                  "
                >
                  Materi Pembelajaran
                </h2>

                <p
                  className="
                    mt-1
                    text-black/50
                  "
                >
                  Ringkasan materi yang akan dipelajari.
                </p>
              </div>
            </div>

            {/* MATERIAL LIST */}
            <div
              className="
                grid
                md:grid-cols-2

                gap-5
              "
            >
              {module.materials.map((item, index) => (
                <div
                  key={index}
                  className="
                      flex
                      items-start
                      gap-4

                      p-5

                      rounded-3xl

                      bg-[#faf7f4]

                      border
                      border-black/5
                    "
                >
                  {/* NUMBER */}
                  <div
                    className="
                        w-12
                        h-12

                        rounded-2xl

                        bg-orange-500

                        flex
                        items-center
                        justify-center

                        text-white
                        font-bold

                        shrink-0
                      "
                  >
                    {index + 1}
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3
                      className="
                          font-bold
                          text-[#2B1D16]
                        "
                    >
                      {item}
                    </h3>

                    <p
                      className="
                          mt-2

                          text-sm
                          text-black/50

                          leading-relaxed
                        "
                    >
                      Pelajari konsep ini untuk memahami materi dengan lebih
                      mendalam.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
