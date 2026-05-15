import Reveal from "../../ui/Reveal";
const partners = [
  "/src/assets/images/mitra/bi.png",
  "/src/assets/images/mitra/birawidha.png",
  "/src/assets/images/mitra/blkjbg.png",
  "/src/assets/images/mitra/bnsp.png",
  "/src/assets/images/mitra/dinasjbg.png",
  "/src/assets/images/mitra/iain.png",
  "/src/assets/images/mitra/kemnamker.png",
  "/src/assets/images/mitra/lspikn.png",
  "/src/assets/images/mitra/lspmod.png",
  "/src/assets/images/mitra/patri.png",
  "/src/assets/images/mitra/pln.png",
  "/src/assets/images/mitra/ui.png",
  "/src/assets/images/mitra/unwaha.png",
  "/src/assets/images/mitra/uptblk.png",
  "/src/assets/images/mitra/winpo.png",
];

export default function PartnerSection() {
  return (
    <section className="py-8 bg-white">
      <Reveal>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-[#f9c115] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Partner & Kolaborasi
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-darkText leading-tight">
              Dipercaya Oleh
              <span className="text-[#f9c115] block">
                Berbagai Partner Profesional
              </span>
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Disty Akademi bekerja sama dengan berbagai institusi, komunitas,
              dan perusahaan untuk menghadirkan pengalaman belajar terbaik.
            </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
            {partners.map((partner, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div
                  key={index}
                  className="bg-background rounded-3xl p-8 flex items-center justify-center shadow-soft hover:-translate-y-2 transition-all duration-300 group"
                >
                  <img
                    src={partner}
                    alt="Partner"
                    className="h-12 object-contain grayscale group-hover:grayscale-0 transition duration-500"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
