import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../ui/Button";
import Reveal from "../../ui/Reveal";

import { FaArrowRight } from "react-icons/fa";

export default function ProgramSection() {
  const [pelatihan, setPelatihan] = useState([]);
  const [sertifikasi, setSertifikasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [pelatihanRes, sertifikasiRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/frontend/pelatihan"),
        fetch("http://127.0.0.1:8000/api/frontend/sertifikasi"),
      ]);

      const pelatihanData = await pelatihanRes.json();
      const sertifikasiData = await sertifikasiRes.json();

      setPelatihan(pelatihanData.data?.slice(0, 3) || []);
      setSertifikasi(sertifikasiData.data?.data?.slice(0, 3) || []);
    } catch (error) {
      console.error("Gagal mengambil data program:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCard = (
    image,
    title,
    category,
    description,
    link,
    type = "pelatihan",
  ) => (
    <Reveal key={title}>
      <Link
        to={link}
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
        <img
          src={image}
          alt={title}
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
          {category}
        </div>

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
          <span className="text-orange-300 text-sm font-semibold uppercase">
            {type}
          </span>

          <h3
            className="
              text-3xl
              font-black
              leading-tight
              mt-3
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-4
              text-white/70
              leading-relaxed
              line-clamp-3
            "
          >
            {description}
          </p>

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
            <span>Lihat Detail</span>
            <FaArrowRight />
          </div>
        </div>
      </Link>
    </Reveal>
  );

  return (
    <section
      className="
        py-28
        relative
        overflow-hidden
        bg-white
      "
    >
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
          {/* HEADER */}
          <div className="text-center max-w-4xl mx-auto">
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
              <span className="text-[#f9c115] block">Sesuai Passion Kamu</span>
            </h2>

            <p
              className="
                mt-6
                text-lg
                text-slate-600
                leading-relaxed
              "
            >
              Temukan berbagai pelatihan dan sertifikasi terbaik yang dirancang
              sesuai kebutuhan industri digital modern.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-orange-500">
                Memuat Program...
              </h3>
            </div>
          ) : (
            <>
              {/* PELATIHAN */}
              <div className="mt-20">
                <h3 className="text-3xl font-black text-[#2B1D16] mb-8">
                  Pelatihan
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pelatihan.map((item) =>
                    renderCard(
                      item.thumbnail_url,
                      item.title,
                      item.kategori,
                      item.short_description,
                      `/pelatihan/${item.slug}`,
                      "Pelatihan",
                    ),
                  )}
                </div>
              </div>

              {/* SERTIFIKASI */}
              <div className="mt-24">
                <h3 className="text-3xl font-black text-[#2B1D16] mb-8">
                  Sertifikasi
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sertifikasi.map((item) =>
                    renderCard(
                      `http://127.0.0.1:8000/uploads/sertifikasi/${item.sampul}`,
                      item.nama_sertifikasi,
                      item.kategori,
                      item.deskripsi,
                      `/sertifikasi/${item.slug}`,
                      "Sertifikasi",
                    ),
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="flex justify-center gap-4 mt-20">
                <Link to="/pelatihan">
                  <Button>Lihat Semua Pelatihan</Button>
                </Link>

                <Link to="/sertifikasi">
                  <Button>Lihat Semua Sertifikasi</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}
