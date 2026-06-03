import { motion } from "framer-motion";

import cert1 from "/src/assets/images/sertifikat-tuk.jpg";

const certificates = [
  {
    image: cert1,
    title: "Sertifikat Lisensi Tempat Uji Kompetensi (TUK)",
    description:
      "PT Disty Akademi telah mendapatkan lisensi resmi sebagai Tempat Uji Kompetensi (TUK) yang ditetapkan oleh Badan Nasional Sertifikasi Profesi (BNSP). Dengan legalitas ini, perusahaan kami berhak menyelenggarakan uji kompetensi yang diakui secara nasional.",
  },
];

export default function LegalSection() {
  return (
    <section className="relative py-24 bg-[#fffaf5] overflow-hidden">
      {/* Glow Background */}
      <div className="absolute top-10 right-0 w-[350px] h-[350px] bg-orange-100 blur-3xl opacity-50 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center bg-orange-100 text-orange-500 px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
            Legalitas
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            Sertifikasi &
            <span className="block text-orange-500">Legalitas Resmi</span>
          </h2>

          <p className="mt-5 text-sm lg:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Disty Academy memiliki legalitas dan sertifikasi resmi sebagai
            bentuk komitmen dalam menyediakan layanan pendidikan dan pelatihan
            yang profesional serta terpercaya.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-20 space-y-20">
          {certificates.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-3xl shadow-lg border border-orange-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full max-w-md object-contain rounded-2xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="inline-flex items-center bg-orange-100 text-orange-500 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                  Sertifikasi Resmi
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  {item.title}
                </h3>

                <p className="mt-6 text-slate-600 text-lg leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-8 w-20 h-1 bg-orange-500 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
