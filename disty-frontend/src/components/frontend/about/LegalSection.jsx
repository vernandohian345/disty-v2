import { motion } from "framer-motion";

import cert1 from "/src/assets/images/sertifikat-tuk.jpg";
import cert2 from "/src/assets/images/sertifikat-tuk.jpg";
import cert3 from "/src/assets/images/sertifikat-tuk.jpg";

const certificates = [
  {
    image: cert1,
    title: "Sertifikat Lisensi Tempat Uji Kompetensi (TUK)",
    description:
      "PT Disty Akademi telah mendapatkan lisensi resmi sebagai Tempat Uji Kompetensi (TUK) yang ditetapkan oleh Badan Nasional Sertifikasi Profesi (BNSP). Dengan legalitas ini, perusahaan kami berhak menyelenggarakan uji kompetensi yang diakui secara nasional.",
  },
  {
    image: cert2,
    title: "Legalitas Pelatihan",
    description:
      "Legalitas resmi sebagai lembaga pelatihan dan pengembangan kompetensi.",
  },
  {
    image: cert3,
    title: "Sertifikat Kompetensi",
    description:
      "Bukti komitmen Disty Academy dalam menyediakan pendidikan berkualitas.",
  },
];

export default function LegalSection() {
  return (
    <section className="relative pt-10 pb-24 bg-[#fffaf5]">
      {/* Glow */}
      <div className="absolute top-10 right-0 w-[350px] h-[350px] bg-orange-100 blur-3xl opacity-50 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Label */}
          <div className="inline-flex items-center bg-orange-100 text-orange-500 px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
            Legalitas
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-[1.1]">
            Sertifikasi &
            <span className="block text-orange-500">Legalitas Resmi</span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm lg:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Disty Academy memiliki legalitas dan sertifikasi resmi sebagai
            bentuk komitmen dalam menyediakan layanan pendidikan dan pelatihan
            yang profesional serta terpercaya.
          </p>
        </motion.div>

        {/* Certificate Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {certificates.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-orange-100
                bg-white
                shadow-sm
              "
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt="Certificate"
                    className="
                      w-full
                      h-[420px]
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
