import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentSection() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [bukti, setBukti] = useState(null);
  const type = location.state?.type;
  const harga = location.state?.harga;
  const namaProgram = location.state?.nama_program;

  const transaksi = location.state?.transaksi;

  if (!transaksi) {
    return (
      <div className="py-40 text-center">Data transaksi tidak ditemukan</div>
    );
  }

  const handleUpload = async () => {
    if (!bukti) {
      alert("Upload bukti terlebih dahulu");

      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("bukti", bukti);

      const endpoint =
        type === "sertifikasi"
          ? "http://127.0.0.1:8000/api/profile/upload-bukti-sertifikasi"
          : "http://127.0.0.1:8000/api/profile/upload-bukti-pelatihan";

      formData.append("transaksi_id", transaksi.id);

      const response = await fetch(
        endpoint,

        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },

          body: formData,
        },
      );

      const result = await response.json();
      alert(result.message);
      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[#fffaf5] py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-black/5">
          <h1 className="text-4xl font-black text-[#2B1D16]">Pembayaran</h1>

          <p className="mt-3 text-black/60">
            Selesaikan pembayaran pelatihan Anda
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex justify-between">
              <span>Kode Transaksi</span>
              <span className="font-bold">
                {type === "sertifikasi"
                  ? `SRT-${transaksi.id}`
                  : transaksi.kode_transaksi}
              </span>{" "}
            </div>

            <div className="flex justify-between">
              <span>Program</span>

              <span className="font-bold">
                {type === "sertifikasi"
                  ? namaProgram
                  : transaksi.nama_pelatihan}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Pembayaran</span>

              <span className="font-bold text-orange-500">
                Rp{" "}
                {Number(
                  type === "sertifikasi" ? harga : transaksi.total_harga,
                ).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Status</span>

              <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                Pending
              </span>
            </div>

            <div className="mt-10">
              <label className="block text-sm font-semibold mb-3">
                Upload Bukti Transfer
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBukti(e.target.files[0])}
                className="
                        w-full
                        border
                        border-black/10
                        rounded-2xl
                        px-4
                        py-4
                        "
              />

              <button
                onClick={handleUpload}
                className="
                        mt-6
                        w-full
                        bg-orange-500
                        hover:bg-orange-400
                        text-white
                        py-4
                        rounded-2xl
                        font-semibold
                        transition-all
                        "
              >
                Upload Bukti Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
