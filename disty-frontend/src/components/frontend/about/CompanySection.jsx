import { motion } from "framer-motion";

import companyImage from "../../../assets/images/company.jpg";

export default function CompanySection() {
  return (
    <section className="relative py-28 bg-[#fffaf5] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-100 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
              <img
                src={companyImage}
                alt="Disty Academy"
                className="h-[460px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-xs font-semibold mb-6">
              Tentang Kami
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-black leading-tight text-slate-900">
              Membangun Ekosistem
              <span className="block text-orange-500">
                Pembelajaran Digital
              </span>
              Modern
            </h2>

            {/* Description */}
            <div className="mt-8 space-y-5 text-sm lg:text-base text-slate-600 leading-relaxed">
              <p>
                Disty Academy hadir sebagai platform edukasi digital yang
                membantu generasi muda meningkatkan keterampilan melalui program
                pelatihan, sertifikasi profesional, dan pembelajaran berbasis
                praktik.
              </p>

              <p>
                Kami percaya bahwa akses pendidikan digital yang modern dan
                berkualitas dapat membantu menciptakan talenta unggul yang siap
                bersaing di era industri teknologi masa depan.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
