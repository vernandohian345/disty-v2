import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CertificationDetailContent() {
  const { slug } = useParams();

  const [sertifikasi, setSertifikasi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomor_hp: "",
    paymentMethod: "transfer",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Silakan login terlebih dahulu");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/transaksi/sertifikasi",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sertifikasi_id: sertifikasi.id,
            nama: formData.nama,
            email: formData.email,
            nomor_hp: formData.nomor_hp,
            paymentMethod: formData.paymentMethod,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Terjadi kesalahan");
        return;
      }

      if (result.status === "success") {
        setShowModal(false);

        if (result.kategori === "gratis" && result.link_grup) {
          alert("Pendaftaran berhasil");

          window.open(result.link_grup, "_blank");
        } else {
          alert("Pendaftaran berhasil, silakan tunggu proses verifikasi.");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

    useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/frontend/sertifikasi/${slug}`,
        );

        const result = await response.json();

        setSertifikasi(result.sertifikasi);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-2xl font-bold text-orange-500">
          Memuat Detail Sertifikasi...
        </h2>
      </section>
    );
  }

  if (!sertifikasi) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-2xl font-bold">Sertifikasi Tidak Ditemukan</h2>
      </section>
    );
  }

  const peserta =
    sertifikasi.peserta_terdaftar || 0;

  const isFull =
    peserta >= sertifikasi.kuota;

  const isClosed =
      new Date() >
      new Date(sertifikasi.registration_deadline);

  const formatTanggal = (tanggal) => {
      return new Date(tanggal).toLocaleDateString(
          "id-ID",
          {
              day: "numeric",
              month: "long",
              year: "numeric",
          }
      );
  };

  return (
    <section className="bg-[#fffaf5] pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* LEFT */}
          
          <div className="lg:col-span-2">

              {/* TITLE */}
              <div className="mb-8">

                  <h1 className="
                      text-5xl
                      font-black
                      text-[#2B1D16]
                      leading-tight
                  ">
                      {sertifikasi.nama_sertifikasi}
                  </h1>

              </div>

              {/* IMAGE */}
              <div className="relative">

                  <img
                      src={
                          sertifikasi.sampul_url ||
                          "https://placehold.co/1200x700?text=Sertifikasi"
                      }
                      alt={sertifikasi.nama_sertifikasi}
                      className="
                          w-full
                          h-[420px]
                          object-cover
                          rounded-[32px]
                      "
                  />

              </div>

              {/* CONTENT */}
              <div className="mt-14">

                  <h3 className="
                      text-3xl
                      font-black
                      text-[#2B1D16]
                      mb-5
                  ">
                      Deskripsi Sertifikasi
                  </h3>

                  <p className="
                      text-lg
                      leading-relaxed
                      text-[#6b625d]
                      whitespace-pre-line
                  ">
                      {sertifikasi.deskripsi}
                  </p>

              </div>

          </div>

          {/* RIGHT */}
          <div>
            <div className="
                sticky
                top-28
                bg-white
                rounded-[32px]
                p-8
                border
                border-orange-100
                shadow-xl
            ">
              <h3 className="text-3xl font-black text-orange-500">
                {Number(sertifikasi.harga) === 0
                  ? "Gratis"
                  : `Rp${Number(sertifikasi.harga).toLocaleString("id-ID")}`}
              </h3>

              <div className="mt-8 space-y-4">

                <div>
                  <p className="text-sm text-gray-500">Tanggal Sertifikasi</p>
                  <h4 className="font-bold">
                    {formatTanggal(sertifikasi.tanggal_sertifikasi)}
                  </h4>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Deadline Pendaftaran
                    </p>

                    <h4 className="font-bold">

                        {
                            sertifikasi.registration_deadline
                                ? formatTanggal(
                                    sertifikasi.registration_deadline
                                  )
                                : "-"
                        }

                    </h4>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Mode
                    </p>

                    <h4 className="font-bold capitalize">
                        {sertifikasi.mode}
                    </h4>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Lokasi
                    </p>

                    <h4 className="font-bold">
                        {sertifikasi.lokasi}
                    </h4>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Penyelenggara
                    </p>

                    <h4 className="font-bold">
                        {sertifikasi.penyelenggara}
                    </h4>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Kuota
                    </p>

                    <h4 className="font-bold">
                        {sertifikasi.peserta_terdaftar || 0}
                        / {sertifikasi.kuota} Peserta
                    </h4>
                </div>
              </div>

              <button
                  onClick={() => setShowModal(true)}
                  disabled={isFull || isClosed}
                  className={`
                      mt-10
                      w-full
                      h-14
                      rounded-2xl
                      font-bold
                      text-lg
                      transition-all

                      ${
                          isFull || isClosed
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-orange-500 hover:bg-orange-600 text-white"
                      }
                  `}
              >

                  {
                      isClosed
                          ? "Pendaftaran Ditutup"
                          : isFull
                              ? "Kuota Penuh"
                              : "Daftar Sekarang"
                  }

              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8">
            <h2 className="text-2xl font-black text-[#2B1D16]">
              Daftar Sertifikasi
            </h2>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                className="w-full h-14 border border-orange-100 rounded-2xl px-4"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full h-14 border border-orange-100 rounded-2xl px-4"
              />

              <input
                type="text"
                name="nomor_hp"
                value={formData.nomor_hp}
                onChange={handleChange}
                placeholder="Nomor HP"
                className="w-full h-14 border border-orange-100 rounded-2xl px-4"
              />

              {Number(sertifikasi.harga) > 0 && (
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full h-14 border border-orange-100 rounded-2xl px-4"
                >
                  <option value="transfer">Transfer Bank</option>

                  <option value="ewallet">E-Wallet</option>
                </select>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 h-12 rounded-xl border border-gray-200"
              >
                Batal
              </button>

              <button
                onClick={handleRegister}
                disabled={submitting}
                className="flex-1 h-12 rounded-xl bg-orange-500 text-white"
              >
                {submitting ? "Memproses..." : "Daftar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
