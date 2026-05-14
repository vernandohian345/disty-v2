import Button from "../../ui/Button";
import Reveal from "../../ui/Reveal";

const programs = [
  {
    title: "UI/UX Design Bootcamp",
    category: "Design",
    image: "/src/assets/images/Beranda/UIUX Design Bootcamp.jpg",
    students: "120+ Peserta",
  },

  {
    title: "Frontend Web Development",
    category: "Programming",
    image: "/src/assets/images/Beranda/Frontend Web Development.jpg",
    students: "200+ Peserta",
  },

  {
    title: "Digital Marketing Mastery",
    category: "Marketing",
    image: "/src/assets/images/Beranda/Digital_Marketing.jpg",
    students: "90+ Peserta",
  },
];

export default function ProgramSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl"></div>
      <Reveal>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Program Unggulan
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-darkText leading-tight">
              Pilih Program
              <span className="text-orange-300 block">Sesuai Passion Kamu</span>
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Temukan berbagai bootcamp dan pelatihan terbaik yang dirancang
              langsung sesuai kebutuhan industri digital modern.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {programs.map((program, index) => (
              <Reveal key={index} delay={index * 0.2}>
                <a
                  href="/program"
                  className="group cursor-pointer bg-white rounded-[32px] overflow-hidden shadow-soft hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* Badge */}
                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-primary">
                      {program.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-sm text-slate-500">{program.students}</p>

                    <h3 className="text-2xl font-bold text-darkText mt-3 leading-snug">
                      {program.title}
                    </h3>

                    <p className="mt-4 text-slate-600 leading-relaxed">
                      Pelajari skill modern yang dibutuhkan industri dengan
                      mentor profesional dan kurikulum terbaru.
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          {/* Bottom CTA */}
          <div className="flex justify-center mt-16">
            <Button>Lihat Semua Program</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
