import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CheckoutSection() {
  const { type, slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomor_hp: "",
    paymentMethod: "transfer",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [slug, type]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Silakan login terlebih dahulu");
        navigate("/login");
        return;
      }

      const response = await fetch(
        type === "sertifikasi"
          ? "http://127.0.0.1:8000/api/transaksi/sertifikasi"
          : "http://127.0.0.1:8000/api/transaksi/pelatihan",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            type === "sertifikasi"
              ? {
                  sertifikasi_id: data.id,
                  nama: formData.nama,
                  email: formData.email,
                  nomor_hp: formData.nomor_hp,
                  paymentMethod: formData.paymentMethod,
                }
              : {
                  pelatihan_id: data.id,
                  nama: formData.nama,
                  email: formData.email,
                  nomor_hp: formData.nomor_hp,
                  paymentMethod: formData.paymentMethod,
                },
          ),
        },
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        alert(result.message);

        return;
      }

      if (result.status === "success") {
        // FLOW SERTIFIKASI
        if (type === "sertifikasi") {
          // GRATIS
          if (result.kategori === "gratis" && result.link_grup) {
            window.open(result.link_grup, "_blank");

            navigate("/success");

            return;
          }

          // BERBAYAR
          navigate("/payment", {
            state: {
              transaksi: result.transaksi,
              type: "sertifikasi",
              harga: data.harga,
              nama_program: data.nama_sertifikasi,
            },
          });

          return;
        }

        // FLOW PELATIHAN
        if (result.kategori === "gratis" && result.link_grup) {
          window.open(result.link_grup, "_blank");

          navigate("/success");
        } else {
          window.snap.pay(result.snap_token, {
            onSuccess: function (result) {
              console.log(result);

              alert("Pembayaran berhasil!");

              navigate("/payment-success");
            },

            onPending: function (result) {
              console.log(result);

              alert("Menunggu pembayaran");

              navigate("/payment-pending");
            },

            onError: function (result) {
              console.log(result);

              alert("Pembayaran gagal");

              navigate("/payment-failed");
            },

            onClose: function () {
              alert("Popup pembayaran ditutup");
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const endpoint =
        type === "sertifikasi"
          ? `http://127.0.0.1:8000/api/frontend/sertifikasi/${slug}`
          : `http://127.0.0.1:8000/api/frontend/pelatihan/${slug}`;

      const response = await fetch(endpoint);

      const result = await response.json();

      if (type === "sertifikasi") {
        setData(result.sertifikasi);
      } else {
        setData(result.pelatihan);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-2xl font-bold text-orange-500">
          Memuat Checkout...
        </h2>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const isSertifikasi = type === "sertifikasi";

  const title = isSertifikasi ? data.nama_sertifikasi : data.title;

  const description = isSertifikasi ? data.deskripsi : data.short_description;

  const image = isSertifikasi
    ? `http://127.0.0.1:8000/uploads/sertifikasi/${data.sampul}`
    : data.thumbnail_url;

  return (
    <section className="relative overflow-hidden bg-[#fffaf5] py-24">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* LEFT */}
          <div>
            {/* Thumbnail */}
            <div className="overflow-hidden rounded-[36px]">
              <img
                src={image}
                alt={title}
                className="w-full h-[380px] object-cover"
              />
            </div>

            {/* Content */}
            <div className="mt-8">
              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                {isSertifikasi ? "Checkout Sertifikasi" : "Checkout Pelatihan"}
              </p>

              <h1 className="mt-4 text-4xl font-black text-[#2B1D16] leading-tight">
                {title}
              </h1>

              <p className="mt-6 text-[#6b625d] leading-relaxed text-lg">
                {description}
              </p>

              {isSertifikasi && (
                <div className="mt-8">
                  <h3 className="font-bold text-[#2B1D16] mb-4">
                    Materi Sertifikasi
                  </h3>

                  <p className="text-[#6b625d] whitespace-pre-line">
                    {data.materi}
                  </p>
                </div>
              )}

              {/* Benefit */}

              {!isSertifikasi && (
                <div className="mt-8 space-y-4">
                  {data.benefits?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold">
                        ✓
                      </div>

                      <p className="text-[#2B1D16] font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white border border-orange-100 rounded-[36px] p-8 shadow-sm">
            <p className="text-orange-500 font-semibold uppercase tracking-wide">
              Form Pendaftaran
            </p>

            <h2 className="mt-4 text-3xl font-black text-[#2B1D16]">
              Lengkapi Data Diri
            </h2>

            {/* FORM */}
            <div className="mt-10 space-y-6">
              {/* Nama */}
              <div>
                <label className="block mb-3 font-semibold text-[#2B1D16]">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border border-orange-100
                    px-5
                    outline-none
                    focus:border-orange-300
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-3 font-semibold text-[#2B1D16]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border border-orange-100
                    px-5
                    outline-none
                    focus:border-orange-300
                  "
                />
              </div>

              {/* Nomor HP */}
              <div>
                <label className="block mb-3 font-semibold text-[#2B1D16]">
                  Nomor HP
                </label>

                <input
                  type="text"
                  name="nomor_hp"
                  value={formData.nomor_hp}
                  onChange={handleChange}
                  placeholder="Masukkan n\Nomor HP"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border border-orange-100
                    px-5
                    outline-none
                    focus:border-orange-300
                  "
                />
              </div>

              {/* Payment Method */}
              {Number(data.harga) > 0 && (
                <div>
                  <label
                    className="
      block
      mb-3
      font-semibold
      text-[#2B1D16]
    "
                  >
                    Metode Pembayaran
                  </label>

                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="
        w-full
        h-14
        rounded-2xl
        border
        border-orange-100
        px-5
        outline-none
        focus:border-orange-300
      "
                  >
                    <option value="transfer">Transfer Bank</option>

                    <option value="ewallet">E-Wallet</option>
                  </select>
                </div>
              )}

              {/* SUMMARY */}
              <div className="rounded-[28px] bg-orange-50 border border-orange-100 p-6">
                <p className="text-[#2B1D16] font-bold text-lg">
                  Ringkasan Pesanan
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[#6b625d]">
                      {isSertifikasi ? "Sertifikasi" : "Pelatihan"}
                    </p>

                    <h3 className="font-semibold text-[#2B1D16]">{title}</h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[#6b625d]">Durasi</p>

                    <h3 className="font-semibold text-[#2B1D16]">
                      {data.durasi}
                    </h3>
                  </div>

                  {!isSertifikasi && (
                    <div className="flex items-center justify-between">
                      <p className="text-[#6b625d]">Level</p>

                      <h3 className="font-semibold text-[#2B1D16]">
                        {data.level}
                      </h3>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-orange-100 my-6"></div>

                {/* Total */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-[#2B1D16]">Total</p>

                  <h3 className="text-2xl font-black text-orange-500">
                    {Number(data.harga) === 0
                      ? "Gratis"
                      : `Rp${Number(data.harga).toLocaleString("id-ID")}`}
                  </h3>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleCheckout}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-orange-500
                  hover:bg-orange-400
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                  shadow-lg
                  shadow-orange-500/20
                "
              >
                {Number(data.harga) === 0
                  ? "Daftar Sekarang"
                  : "Lanjut Pembayaran"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
