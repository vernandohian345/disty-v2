export default function CertificationDetailHero() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf5] pt-32 pb-16">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <span className="inline-flex px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
          Detail Sertifikasi
        </span>

        <h1 className="mt-5 text-4xl lg:text-6xl font-black text-[#2B1D16]">
          Informasi Sertifikasi
        </h1>

        <p className="mt-4 text-[#6b625d] max-w-2xl">
          Pelajari detail program sertifikasi dan tingkatkan kompetensimu
          bersama Disty Academy.
        </p>
      </div>
    </section>
  );
}
