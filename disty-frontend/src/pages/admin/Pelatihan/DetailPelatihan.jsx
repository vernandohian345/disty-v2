import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import axios from "axios";

export default function DetailPelatihan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelatihan, setPelatihan] = useState(null);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/pelatihan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPelatihan(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!pelatihan) {
    return (
      <AdminLayout>
        <div className="p-10">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* HEADER */}
        <div
          className="
            bg-white
            rounded-[32px]
            overflow-hidden
            shadow-sm
            border
            border-slate-100
          "
        >
          <div className="relative">
            <img
              src={`http://127.0.0.1:8000/uploads/pelatihan/${pelatihan.thumbnail}`}
              alt={pelatihan.nama_pelatihan}
              className="
                w-full
                h-[350px]
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/70
                to-black/10
              "
            />

            {/* BACK BUTTON */}
            <div
              className="
                absolute
                top-6
                right-6
                z-20
              "
            >
              <button
                onClick={() => navigate("/admin/pelatihan")}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  px-7
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-400
                  text-white
                  font-bold
                  text-lg
                  shadow-2xl
                  shadow-orange-500/30
                  hover:scale-105
                  transition-all
                "
              >
                <i className="fas fa-arrow-left group-hover:-translate-x-1 transition"></i>
                Kembali
              </button>
            </div>

            {/* CONTENT */}
            <div
              className="
                absolute
                bottom-0
                left-0
                p-10
                text-white
              "
            >
              <span
                className={`
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2
                  rounded-full
                  text-sm
                  font-bold
                  tracking-widest
                  mb-5
                  ${
                    pelatihan.kategori === "gratis"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }
                `}
              >
                {pelatihan.kategori?.toUpperCase()}
              </span>

              <h1 className="text-5xl font-black mb-4">
                {pelatihan.nama_pelatihan}
              </h1>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-6
                  text-lg
                "
              >
                <div className="flex items-center gap-2">
                  <i className="fas fa-user-tie"></i>
                  {pelatihan.instruktur}
                </div>

                <div className="flex items-center gap-2">
                  <i className="fas fa-laptop"></i>
                  {pelatihan.metode}
                </div>

                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i>
                  {pelatihan.lokasi}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            color="orange"
            icon="fa-wallet"
            title="Harga"
            value={`Rp ${Number(pelatihan.harga || 0).toLocaleString("id-ID")}`}
          />

          <InfoCard
            color="green"
            icon="fa-users"
            title="Peserta"
            value={pelatihan.transaksi_count || 0}
          />
        </div>

        {/* DESKRIPSI */}
        <div
          className="
            bg-white
            rounded-[32px]
            p-10
            shadow-sm
            border
            border-slate-100
          "
        >
          <h2 className="text-3xl font-black mb-6">Deskripsi Pelatihan</h2>

          <div
            className="
              text-slate-700
              leading-[2]
              text-lg
              whitespace-pre-line
            "
          >
            {pelatihan.deskripsi}
          </div>
        </div>

        {/* MODUL */}
        {pelatihan.moduls?.length > 0 && (
          <div
            className="
              bg-white
              rounded-[32px]
              p-10
              shadow-sm
              border
              border-slate-100
            "
          >
            <h2 className="text-3xl font-black mb-6">Modul Pelatihan</h2>

            <div className="space-y-4">
              {pelatihan.moduls.map((modul, index) => (
                <div
                  key={modul.id}
                  className="
                    p-5
                    rounded-2xl
                    bg-slate-50
                    border
                    border-slate-100
                  "
                >
                  <div className="font-bold">Modul {index + 1}</div>

                  <div className="text-slate-600 mt-1">{modul.judul}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESERTA */}
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-sm
            border
            border-slate-100
            overflow-hidden
          "
        >
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-3xl font-black">Peserta Pelatihan</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-5 text-left">Nama</th>
                  <th className="p-5 text-left">Email</th>
                  <th className="p-5 text-left">No HP</th>
                  <th className="p-5 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {pelatihan.transaksi?.length > 0 ? (
                  pelatihan.transaksi.map((item) => (
                    <tr key={item.id}>
                      <td className="p-5">{item.user?.name}</td>

                      <td className="p-5">{item.user?.email}</td>

                      <td className="p-5">{item.nomor_hp}</td>

                      <td className="p-5">
                        <span
                          className={`
              px-4 py-2 rounded-full text-sm font-bold
              ${
                item.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-10 text-slate-500">
                      Belum ada peserta
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function InfoCard({ color, icon, title, value }) {
  const colors = {
    orange: "from-orange-500 to-orange-400",
    blue: "from-blue-500 to-sky-400",
    red: "from-red-500 to-pink-400",
    green: "from-emerald-500 to-green-400",
  };

  return (
    <div
      className={`
        rounded-[30px]
        p-7
        text-white
        shadow-xl
        bg-gradient-to-br
        ${colors[color]}
      `}
    >
      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
        <i className={`fas ${icon} text-2xl`}></i>
      </div>

      <p className="text-center font-semibold mb-3">{title}</p>

      <h2 className="text-center text-2xl font-black">{value}</h2>
    </div>
  );
}
