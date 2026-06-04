import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CertificationSection() {
  const [sertifikasis, setSertifikasis] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] = useState("Semua");

  useEffect(() => {
    fetchSertifikasi();
  }, [search, activeFilter]);

  const fetchSertifikasi = async () => {
    try {
      setLoading(true);

      let url = "http://127.0.0.1:8000/api/frontend/sertifikasi";

      const params = new URLSearchParams();

      if (search) {
        params.append("q", search);
      }

      if (activeFilter !== "Semua") {
        params.append("kategori", activeFilter.toLowerCase());
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);

      const result = await response.json();

      setSertifikasis(result.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-2xl font-bold text-orange-500">
          Memuat Sertifikasi...
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-[#fffaf5] pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Search */}
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Cari sertifikasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              lg:max-w-xl
              h-14
              rounded-full
              border
              border-orange-100
              px-6
              outline-none
              focus:border-orange-300
            "
          />

          <div className="flex flex-wrap gap-3">
            {["Semua", "Gratis", "Berbayar"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`px-5 py-3 rounded-full border transition-all
                ${
                  activeFilter === item
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-orange-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sertifikasis.map((item) => (
            <div
              key={item.id}
              className="
                group
                bg-white
                rounded-[30px]
                overflow-hidden
                border
                border-orange-100
                hover:shadow-xl
                transition-all
              "
            >
              <div className="relative h-[220px] bg-orange-100 flex items-center justify-center">
                <img
                  src={item.sampul_url ||"https://placehold.co/600x400?text=Sertifikasi"}
                  alt={item.nama_sertifikasi}
                  className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-all
                      duration-500
                  "
                />
                <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/20
                    to-transparent
                "></div>
              </div>

              <div className="p-6">

                <div className="flex items-center justify-between mb-4">

                  {/* KATEGORI */}
                  <span
                      className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-bold
                          uppercase

                          ${
                              item.kategori === "gratis"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                          }
                      `}
                  >

                      {item.kategori}

                  </span>

                  {/* STATUS */}
                  <span
                      className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-bold

                          ${
                              item.status === "full"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                          }
                      `}
                  >

                      {
                          item.status === "full"
                              ? "FULL"
                              : "OPEN"
                      }

                  </span>

              </div>

                <h3 className="mt-3 text-2xl font-black text-[#2B1D16]">
                  {item.nama_sertifikasi}
                </h3>

                <p className="mt-3 text-[#6b625d] line-clamp-3">
                  {item.deskripsi}
                </p>

                <div className="mt-6 flex justify-between">
                  <div>
                      <p className="text-xs text-gray-500">
                          Tanggal
                      </p>

                      <h4 className="font-bold">
                          {item.tanggal_sertifikasi}
                      </h4>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Harga</p>

                    <h4 className="font-bold text-orange-500">
                      {Number(item.harga) === 0
                        ? "Gratis"
                        : `Rp${Number(item.harga).toLocaleString("id-ID")}`}
                    </h4>
                  </div>
                </div>

                <Link
                  to={`/sertifikasi/${item.slug}`}
                  className="
                    mt-6
                    w-full
                    inline-flex
                    justify-center
                    py-3
                    rounded-xl
                    bg-[#2B1D16]
                    text-white
                    hover:bg-orange-500
                    transition-all
                  "
                >
                  Lihat Detail
                </Link>
              </div>

              
            </div>
          ))}
        </div>

        {/* Empty */}
        {sertifikasis.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold">Sertifikasi Tidak Ditemukan</h3>
          </div>
        )}
      </div>
    </section>
  );
}
