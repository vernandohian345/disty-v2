import { useEffect, useState } from "react";
import {
  Clock3,
  CheckCircle2,
  Wallet,
  CreditCard,
  ArrowLeft,
  ReceiptText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";

export default function MyTransactions() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  useEffect(() => {
    fetchData();

    if (location.state?.paymentStatus === "success") {
      Swal.fire({
        icon: "success",
        title: "Pembayaran Berhasil",
        text: "Pembayaran Anda berhasil.",
        confirmButtonColor: "#f97316",
      });
    }

    if (location.state?.paymentStatus === "pending") {
      Swal.fire({
        icon: "info",
        title: "Pembayaran Pending",
        text: "Silakan selesaikan pembayaran Anda.",
        confirmButtonColor: "#f97316",
      });
    }

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/my-transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async (id, jenis) => {
    try {
      const token = localStorage.getItem("token");

      const endpoint =
        jenis === "sertifikasi"
          ? `http://127.0.0.1:8000/api/transaksi/sertifikasi/check-status/${id}`
          : `http://127.0.0.1:8000/api/transaksi/check-status/${id}`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (result.data?.transaction_status === "paid") {
        Toast.fire({
          icon: "success",
          title: "Pembayaran berhasil diperbarui",
        });

        fetchData();
      } else {
        Toast.fire({
          icon: "info",
          title: "Pembayaran masih pending",
        });
      }
    } catch (error) {
      console.log(error);

      Toast.fire({
        icon: "error",
        title: "Gagal mengecek status",
      });
    }
  };

  const handleRepay = async (id, jenis) => {
    try {
      const token = localStorage.getItem("token");

      const endpoint =
        jenis === "sertifikasi"
          ? `http://127.0.0.1:8000/api/transaksi/sertifikasi/repay/${id}`
          : `http://127.0.0.1:8000/api/transaksi/repay/${id}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();

      window.snap.pay(result.snap_token, {
        onSuccess: async () => {
          await fetchData();

          Swal.fire({
            icon: "success",
            title: "Pembayaran Berhasil",
            text: "Pembayaran berhasil diverifikasi.",
            confirmButtonColor: "#f97316",
          });
        },

        onPending: async () => {
          await fetchData();

          Swal.fire({
            icon: "info",
            title: "Pembayaran Pending",
            text: "Silakan selesaikan pembayaran Anda.",
            confirmButtonColor: "#f97316",
          });
        },

        onError: () => {
          Toast.fire({
            icon: "error",
            title: "Pembayaran gagal",
          });
        },

        onClose: () => {
          Swal.fire({
            icon: "warning",
            title: "Pembayaran belum selesai",
            text: "Anda menutup popup pembayaran.",
            confirmButtonColor: "#f97316",
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData =
    activeTab === "all"
      ? data
      : activeTab === "completed"
        ? data.filter(
            (item) => item.status === "completed" || item.status === "approved",
          )
        : data.filter((item) => item.status === activeTab);

  const pendingCount = data.filter((item) => item.status === "pending").length;

  const completedCount = data.filter(
    (item) => item.status === "completed" || item.status === "approved",
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500 animate-pulse">
          Memuat transaksi...
        </div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => navigate("/pelatihan")}
              className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium text-slate-700">
                Kembali
              </span>
            </button>
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3">
              <ReceiptText size={18} className="text-orange-500" />{" "}
              <div>
                <p className="text-xs text-slate-500">Total Transaksi</p>{" "}
                <h2 className="text-xl font-semibold text-slate-900">
                  {data.length}
                </h2>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
                Riwayat Transaksi
              </h1>
              <p className="mt-2 text-slate-500">
                Kelola seluruh pembayaran pelatihan Disty Academy.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Pending</p>
                    <h2 className="mt-1 text-2xl font-semibold text-orange-500">
                      {pendingCount}
                    </h2>
                  </div>
                  <Clock3 className="text-orange-500" size={22} />
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Selesai</p>
                    <h2 className="mt-1 text-2xl font-semibold text-green-500">
                      {completedCount}
                    </h2>
                  </div>
                  <CheckCircle2 className="text-green-500" size={22} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {" "}
            {[
              { key: "all", label: "Semua" },
              { key: "pending", label: "Pending" },
              { key: "completed", label: "Selesai" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${activeTab === tab.key ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-4">
            {filteredData.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Wallet size={48} className="mx-auto text-slate-300" />
                <h2 className="mt-4 text-xl font-semibold text-slate-900">
                  Tidak Ada Transaksi
                </h2>
              </div>
            ) : (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-orange-300 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                        <CreditCard size={22} className="text-orange-500" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          {item.nama_program || item.pelatihan?.title}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Kode :
                          <span className="ml-1 font-medium text-slate-700">
                            {item.kode_transaksi}
                          </span>
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${item.jenis === "pelatihan" ? "bg-purple-50 text-purple-600" : "bg-cyan-50 text-cyan-600"}`}
                          >
                            {item.jenis}
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "pending" ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"}`}
                          >
                            {item.status}
                          </div>
                          <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                            Rp
                            {Number(item.total_harga).toLocaleString("id-ID")}
                          </div>
                          {item.payment_type && (
                            <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                              {item.payment_type}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-auto">
                      {item.status === "pending" ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleRepay(item.id, item.jenis)}
                            className="h-10 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition"
                          >
                            Bayar Sekarang
                          </button>
                          <button
                            onClick={() =>
                              handleCheckStatus(item.id, item.jenis)
                            }
                            className="h-10 px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition"
                          >
                            Check Status
                          </button>
                        </div>
                      ) : (
                        <div className="px-4 py-2 rounded-xl bg-green-50 text-green-600 text-sm font-medium">
                          Pembayaran Selesai
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
