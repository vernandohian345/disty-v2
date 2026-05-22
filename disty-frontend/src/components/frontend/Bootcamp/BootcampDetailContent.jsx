import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BootcampDetailContent() {
  const { slug } = useParams();
  useEffect(() => {
    fetchBootcamp();
  }, [slug]);

  const [bootcamp, setBootcamp] = useState(null);
  const [relatedBootcamps, setRelatedBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBootcamp = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://127.0.0.1:8000/api/frontend/pelatihan/${slug}`,
      );

      const result = await response.json();

      setBootcamp(result.pelatihan);
      setRelatedBootcamps(result.rekomendasi || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-2xl font-bold text-orange-500">
          Memuat Detail Pelatihan...
        </h2>
      </section>
    );
  }

  if (!bootcamp) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#fffaf5] py-24">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            {/* About */}
            <div>
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                Tentang Pelatihan
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#2B1D16] leading-tight">
                Pelajari Skill Digital
                <span className="block text-orange-500">
                  Secara Praktis & Profesional
                </span>
              </h2>

              <p className="mt-8 text-[#6b625d] leading-relaxed text-lg">
                {bootcamp.deskripsi}
              </p>
            </div>

            {/* WHAT YOU GET */}
            <div className="mt-16">
              <h3 className="text-3xl font-black text-[#2B1D16]">
                Yang Akan Kamu Dapatkan
              </h3>

              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                {bootcamp.benefits?.map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-start
                      gap-4
                      rounded-3xl
                      border border-orange-100
                      bg-orange-50/40
                      p-5
                    "
                  >
                    {/* ICON */}
                    <div
                      className="
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-2xl
                      bg-orange-500
                      text-white
                      text-lg
                      flex-shrink-0
                    "
                    >
                      ✓
                    </div>

                    <p className="text-[#2B1D16] font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            {/* CURRICULUM */}
            <div className="mt-20">
              <h3 className="text-3xl font-black text-[#2B1D16]">
                Materi yang Akan Dipelajari
              </h3>

              <div className="mt-10 space-y-5">
                {bootcamp.materi?.map((material, index) => (
                  <div
                    key={index}
                    className="
                      group
                      flex
                      items-center
                      gap-6
                      rounded-[28px]
                      border border-orange-100
                      bg-white
                      p-6
                      hover:border-orange-300
                      hover:shadow-lg
                      transition-all
                      duration-300
                    "
                  >
                    {/* NUMBER */}
                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        min-w-[70px]
                        h-[70px]
                        rounded-3xl
                        bg-orange-500
                        text-white
                        text-2xl
                        font-black
                        shadow-lg
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* CONTENT */}
                    <div>
                      <h4 className="text-xl font-bold text-[#2B1D16]">
                        {material}
                      </h4>

                      <p className="mt-2 text-[#6b625d] leading-relaxed">
                        Pelajari materi secara bertahap melalui video
                        pembelajaran, latihan praktik, dan studi kasus modern.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="sticky top-28 bg-white border border-orange-100 rounded-[32px] p-8 shadow-sm">
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                Informasi Pelatihan
              </p>

              {/* Info List */}
              <div className="mt-8 space-y-6">
                {/* Duration */}
                <div className="flex items-center justify-between">
                  <p className="text-[#6b625d]">Durasi</p>

                  <h3 className="font-bold text-[#2B1D16]">
                    {bootcamp.durasi}
                  </h3>
                </div>

                {/* Level */}
                <div className="flex items-center justify-between">
                  <p className="text-[#6b625d]">Level</p>

                  <h3 className="font-bold text-[#2B1D16]">{bootcamp.level}</h3>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <p className="text-[#6b625d]">Harga</p>

                  <h3 className="font-bold text-orange-500">
                    {Number(bootcamp.harga) === 0
                      ? "Gratis"
                      : `Rp${Number(bootcamp.harga).toLocaleString("id-ID")}`}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-orange-100 my-8"></div>

              {/* Button */}
              <Link
                to={`/checkout/${bootcamp.slug}`}
                className="
    w-full
    bg-orange-500
    hover:bg-orange-400
    text-white
    py-4
    rounded-2xl
    font-semibold
    transition-all
    duration-300
    shadow-lg
    shadow-orange-500/20
    flex
    items-center
    justify-center
  "
              >
                Daftar Sekarang
              </Link>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Disty%20Academy,%20saya%20ingin%20bertanya%20tentang%20pelatihan."
                target="_blank"
                rel="noopener noreferrer"
                c
                className="
    w-full
    mt-4
    bg-[#2B1D16]
    hover:bg-black
    text-white
    py-4
    rounded-2xl
    font-semibold
    transition-all
    duration-300

    flex
    items-center
    justify-center"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <div className="max-w-4xl">
            <p className="text-orange-500 font-semibold uppercase tracking-wide">
              FAQ
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#2B1D16] leading-tight">
              Pertanyaan yang
              <span className="block text-orange-500">Sering Ditanyakan</span>
            </h2>
          </div>

          <div className="mt-12 space-y-5">
            {[
              {
                question: "Apakah pelatihan dapat diakses selamanya?",
                answer:
                  "Ya, seluruh materi pelatihan dapat diakses kapan saja setelah peserta berhasil mendaftar.",
              },
              {
                question: "Apakah peserta mendapatkan sertifikat?",
                answer:
                  "Peserta akan mendapatkan sertifikat penyelesaian setelah menyelesaikan seluruh materi dan tugas pelatihan.",
              },
              {
                question: "Bagaimana sistem pembelajarannya?",
                answer:
                  "Pembelajaran dilakukan secara online melalui video, PDF materi, dan latihan praktik yang dapat diakses fleksibel.",
              },
              {
                question: "Apakah terdapat tugas praktik?",
                answer:
                  "Ya, setiap pelatihan memiliki tugas dan latihan praktik untuk membantu peserta memahami materi secara lebih mendalam.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="
          rounded-[28px]
          border border-orange-100
          bg-white
          p-7
          hover:border-orange-300
          hover:shadow-lg
          transition-all
          duration-300
        "
              >
                <h3 className="text-xl font-bold text-[#2B1D16]">
                  {faq.question}
                </h3>

                <p className="mt-4 text-[#6b625d] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mt-28">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                Pelatihan Lainnya
              </p>

              <h2 className="mt-3 text-4xl font-black text-[#2B1D16]">
                Jelajahi Pelatihan
                <span className="block text-orange-500">Lainnya</span>
              </h2>
            </div>
          </div>

          {/* Related Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {relatedBootcamps.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-orange-100 rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              >
                {/* Thumbnail */}
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-2xl font-black text-[#2B1D16] leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[#6b625d] leading-relaxed">
                    {item.short_description}
                  </p>

                  <Link
                    to={`/pelatihan/${item.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Lihat Detail
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
