import { motion } from "framer-motion";

export default function VisionMission() {
  return (
    <section className="relative pt-16 pb-24 bg-[#fffaf5] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-100 blur-3xl opacity-50 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Label */}
          <div className="inline-flex items-center bg-orange-100 text-orange-500 px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
            Visi & Misi
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            Membangun Kompetensi
            <span className="block text-orange-500">SDM Unggul</span>
            Berbasis Standar Nasional
          </h2>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 mt-20">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white border border-orange-100 rounded-[32px] p-10 shadow-sm"
          >
            <p className="text-sm font-bold tracking-[0.25em] uppercase text-orange-500 mb-5 text-center">
              Visi
            </p>

            <h3 className="text-xl font-black text-slate-900 leading-relaxed">
              Menjadi Lembaga pelatihan nasional yang terbaik, terkemuka dan
              terpercaya dalam memberikan menyelenggarakan pendidikan dan
              pelatihan berbasis kompetensi sesuai dengan Standar Kompetensi
              Kerja Nasional Indonesia (SKKNI)
            </h3>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white border border-orange-100 rounded-[32px] p-10 shadow-sm"
          >
            <p className="text-sm font-bold tracking-[0.25em] uppercase text-orange-500 mb-5 text-center">
              Misi
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <p className="text-slate-600 leading-relaxed">
                  Mendukung pengembangan sumberdaya manusia yang unggul dan
                  berdaya saing.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <p className="text-slate-600 leading-relaxed">
                  Melaksanakan pendiikan dan pelatihan berbasis kompetensi
                  sesuai dengan SKKNI
                </p>
              </div>

              <div className="flex items-start gap-4">
                <p className="text-slate-600 leading-relaxed">
                  Menyelenggarakan pelatihan sesuai dengan kebutuhan pelanggan
                  serta mengikuti perkembangan zaman, agar dapat mendukung
                  pertumbuhan dan pengembangan bisnis perusahaan klien.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <p className="text-slate-600 leading-relaxed">
                  Menyediakan fasilitas dan lingkungan belajar yang kondusif
                  untuk pertumbuhan dan perkembangan individu
                </p>
              </div>

              <div className="flex items-start gap-4">
                <p className="text-slate-600 leading-relaxed">
                  Memberikan pelayanan terbaik yang mengutamakan kepuasan
                  pelanggan.{" "}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
