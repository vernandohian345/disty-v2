import { FaPlay, FaClock, FaLayerGroup, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PelatihanCard({ course }) {
  const pelatihan = course.pelatihan || course;
  return (
    <div
      className="
        group
        relative

        overflow-hidden

        rounded-[32px]

        bg-white

        border
        border-black/5

        shadow-sm
        hover:shadow-2xl

        transition-all
        duration-500

        hover:-translate-y-2
      "
    >
      {/* ========================================
          THUMBNAIL
      ======================================== */}

      <div
        className="
          relative
          overflow-hidden
          h-60
        "
      >
        <img
          src={pelatihan?.thumbnail_url || "/placeholder.jpg"}
          alt={pelatihan?.title}
          className="
    w-full h-full object-cover
    group-hover:scale-[1.07]
    transition-transform duration-700 ease-out
  "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/70
            via-black/10
            to-transparent
          "
        />

        {/* CATEGORY */}
        <div
          className="
            absolute
            top-5
            left-5

            px-4
            py-2

            rounded-full

            bg-white/90
            backdrop-blur-xl

            text-sm
            font-semibold

            text-[#2B1D16]
          "
        >
          {pelatihan?.kategori}
        </div>

        {/* PROGRESS */}
        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              text-white
              text-sm
              mb-2
            "
          >
            <span className="font-medium">Progress</span>

            <span className="font-bold">68%</span>
          </div>

          {/* BAR */}
          <div
            className="
              h-3

              rounded-full

              bg-white/20
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

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className="p-7">
        {/* TITLE */}
        <h3
          className="
            text-2xl
            font-black
            text-[#2B1D16]

            leading-snug
          "
        >
          {pelatihan?.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            mt-4

            text-black/55

            leading-relaxed

            text-sm
          "
        >
          {pelatihan?.short_description}
        </p>

        {/* STATS */}
        <div
          className="
            flex
            flex-wrap
            gap-3

            mt-6
          "
        >
          {/* DURATION */}
          <div
            className="
              flex
              items-center
              gap-2

              px-4
              py-3

              rounded-2xl

              bg-[#f8f5f2]
            "
          >
            <FaClock className="text-orange-500 text-sm" />

            <span
              className="
                text-sm
                font-medium
                text-black/70
              "
            >
              {pelatihan?.duration}
            </span>
          </div>

          {/* MODULE */}
          <div
            className="
              flex
              items-center
              gap-2

              px-4
              py-3

              rounded-2xl

              bg-[#f8f5f2]
            "
          >
            <FaLayerGroup className="text-orange-500 text-sm" />

            <span
              className="
                text-sm
                font-medium
                text-black/70
              "
            >
              {Array.isArray(pelatihan?.materi) ? pelatihan.materi.length : 1}{" "}
              Modul
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <Link
          to={`/learning/${pelatihan.id}`}
          className="
    group/btn

    mt-8

    w-full
    h-14

    rounded-2xl

    bg-[#2B1D16]
    hover:bg-orange-500

    text-white
    font-semibold

    transition-all
    duration-300

    inline-flex
    items-center
    justify-center
    gap-3
  "
        >
          <FaPlay />

          <span>Masuk Kelas</span>

          <FaArrowRight
            className="
      group-hover/btn:translate-x-1
      transition-all
    "
          />
        </Link>
      </div>
    </div>
  );
}
