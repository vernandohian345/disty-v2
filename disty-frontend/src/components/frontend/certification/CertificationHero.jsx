export default function CertificationHero() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf5] pt-36 pb-24">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <span className="inline-flex items-center px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
          Sertifikasi Profesional
        </span>

        <h1 className="mt-6 text-5xl lg:text-7xl font-black text-[#2B1D16] leading-tight">
          Raih Sertifikasi
          <span className="block text-orange-500">
            Tingkatkan Kredibilitasmu
          </span>
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-[#6b625d] leading-relaxed">
          Ikuti sertifikasi profesional yang dirancang untuk meningkatkan
          kompetensi, memperkuat portofolio, dan mendukung perkembangan karirmu.
        </p>
      </div>
    </section>
  );
}
