import Button from "../../ui/Button";
import Reveal from "../../ui/Reveal";

import { FaArrowRight, FaUsers, FaLayerGroup } from "react-icons/fa";

const programs = [
  {
    title: "UI/UX Design Bootcamp",

    category: "Design",

    image: "/src/assets/images/Beranda/UIUX Design Bootcamp.jpg",

    students: "120+ Peserta",

    level: "Beginner",
  },

  {
    title: "Frontend Web Development",

    category: "Programming",

    image: "/src/assets/images/Beranda/Frontend Web Development.jpg",

    students: "200+ Peserta",

    level: "Intermediate",
  },

  {
    title: "Digital Marketing Mastery",

    category: "Marketing",

    image: "/src/assets/images/Beranda/Digital_Marketing.jpg",

    students: "90+ Peserta",

    level: "Beginner",
  },
];

export default function ProgramSection() {
  return (
    <section
      className="
        py-28
        relative
        overflow-hidden
        bg-white
      "
    >
      {/* ==============================
          BACKGROUND GLOW
      ============================== */}

      <div
        className="
          absolute
          top-20
          left-0
          w-96
          h-96
          bg-orange-200/30
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[400px]
          h-[400px]
          bg-yellow-100/40
          rounded-full
          blur-3xl
        "
      />

      <Reveal>
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            lg:px-10
            relative
            z-10
          "
        >
          {/* ==============================
              HEADING
          ============================== */}

          <div
            className="
              text-center
              max-w-4xl
              mx-auto
            "
          >
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-orange-100
                text-orange-500
                px-5
                py-2
                rounded-full
                text-sm
                font-semibold
                mb-6
              "
            >
              Program Unggulan
            </div>

            {/* TITLE */}
            <h2
              className="
                text-4xl
                lg:text-6xl
                font-black
                text-[#2B1D16]
                leading-tight
              "
            >
              Pilih Program
              <span
                className="
                  text-[#f9c115]
                  block
                "
              >
                Sesuai Passion Kamu
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6
                text-lg
                text-slate-600
                leading-relaxed
              "
            >
              Temukan berbagai bootcamp dan pelatihan terbaik yang dirancang
              langsung sesuai kebutuhan industri digital modern.
            </p>
          </div>

          {/* ==============================
              PROGRAM CARDS
          ============================== */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
              mt-20
            "
          >
            {programs.map((program, index) => (
              <Reveal key={index} delay={index * 0.2}>
                <a
                  href="/program"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[36px]
                    h-[520px]
                    block
                    shadow-xl
                    hover:-translate-y-4
                    transition-all
                    duration-700
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={program.image}
                    alt={program.title}
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-110
                      transition
                      duration-700
                    "
                  />

                  {/* OVERLAY */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black
                      via-black/50
                      to-transparent
                    "
                  />

                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-orange-500/0
                      group-hover:bg-orange-500/10
                      transition-all
                      duration-500
                    "
                  />

                  {/* CATEGORY */}
                  <div
                    className="
                      absolute
                      top-6
                      left-6
                      bg-white/90
                      backdrop-blur-xl
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      text-orange-500
                    "
                  >
                    {program.category}
                  </div>

                  {/* CONTENT */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      w-full
                      p-8
                      text-white
                    "
                  >
                    {/* MINI STATS */}
                    <div
                      className="
                        flex
                        items-center
                        gap-4
                        text-sm
                        text-white/70
                      "
                    >
                      {/* STUDENTS */}
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <FaUsers />

                        <span>{program.students}</span>
                      </div>

                      {/* LEVEL */}
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <FaLayerGroup />

                        <span>{program.level}</span>
                      </div>
                    </div>

                    {/* TITLE */}
                    <h3
                      className="
                        text-3xl
                        font-black
                        leading-tight
                        mt-5
                      "
                    >
                      {program.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className="
                        mt-4
                        text-white/70
                        leading-relaxed
                      "
                    >
                      Pelajari skill modern dengan mentor profesional dan
                      kurikulum industri terbaru.
                    </p>

                    {/* CTA */}
                    <div
                      className="
                        mt-8
                        flex
                        items-center
                        gap-3
                        font-semibold
                        text-orange-300
                        group-hover:translate-x-2
                        transition-all
                      "
                    >
                      <span>Lihat Program</span>

                      <FaArrowRight />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* ==============================
              BOTTOM CTA
          ============================== */}

          <div
            className="
              flex
              justify-center
              mt-20
            "
          >
            <Button>Lihat Semua Program</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
