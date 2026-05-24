// ==============================
// IMPORT
// ==============================

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FaClock, FaLayerGroup, FaBookOpen, FaTimes } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function MyPelatihan() {
  // ==============================
  // STATE
  // ==============================

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedPelatihan, setSelectedPelatihan] = useState(null);

  const navigate = useNavigate();

  // ==============================
  // FETCH DATA
  // ==============================

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/my-pelatihan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();

      setData(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // STATUS COLOR
  // ==============================

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "paid":
        return "bg-blue-100 text-blue-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==============================
  // STATUS TEXT
  // ==============================

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Selesai";

      case "pending":
        return "Menunggu";

      case "paid":
        return "Dibayar";

      case "rejected":
        return "Ditolak";

      default:
        return status;
    }
  };

  // ==============================
  // FORMAT DATE
  // ==============================

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ==============================
  // FILTER + SEARCH
  // ==============================

  const filteredData = data.filter((item) => {
    const matchStatus = statusFilter === "all" || item.status === statusFilter;

    const matchSearch = item.pelatihan?.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  // ==============================
  // DASHBOARD STATS
  // ==============================

  const totalPelatihan = data.length;

  const completedPelatihan = data.filter(
    (item) => item.status === "completed",
  ).length;

  const pendingPelatihan = data.filter(
    (item) => item.status === "pending" || item.status === "paid",
  ).length;

  // ==============================
  // RENDER
  // ==============================

  return (
    <section
      className="
        bg-[#fffaf5]
        min-h-screen
        py-24
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          px-4
        "
      >
        {/* ==============================
            TOP NAVIGATION
        ============================== */}

        <div
          className="
            flex
            items-center
            justify-between
            mb-8
            bg-white/70
            backdrop-blur-2xl
            border
            border-white/30
            rounded-3xl
            px-6
            py-4
            shadow-lg
            shadow-black/5
          "
        >
          {/* LEFT */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate(-1)}
              className="
                w-12
                h-12
                rounded-2xl
                bg-[#fffaf5]
                hover:bg-orange-100
                flex
                items-center
                justify-center
                text-xl
                text-[#2B1D16]
                transition-all
                hover:scale-105
              "
            >
              ←
            </button>

            {/* TEXT */}
            <div>
              <p
                className="
                  text-sm
                  text-black/40
                "
              >
                Dashboard / Pelatihan
              </p>

              <h2
                className="
                  text-lg
                  font-bold
                  text-[#2B1D16]
                "
              >
                Pelatihan Saya
              </h2>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
            "
          >
            <div
              className="
                px-4
                py-2
                rounded-2xl
                bg-orange-100
                text-orange-600
                text-sm
                font-semibold
              "
            >
              {totalPelatihan} Pelatihan
            </div>
          </div>
        </div>

        {/* ==============================
            HERO DASHBOARD
        ============================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-[#2B1D16]
            p-10
            lg:p-14
            text-white
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute
              top-0
              right-0
              w-[300px]
              h-[300px]
              bg-orange-500/20
              blur-3xl
              rounded-full
            "
          />

          <div className="relative z-10">
            <p
              className="
                text-orange-300
                font-semibold
              "
            >
              Dashboard Pelatihan
            </p>

            <h1
              className="
                mt-3
                text-4xl
                lg:text-5xl
                font-black
              "
            >
              Pelatihan Saya
            </h1>

            <p
              className="
                mt-4
                text-white/70
                max-w-2xl
              "
            >
              Kelola seluruh pelatihan, status pembayaran, dan akses kelas Anda
              dalam satu dashboard.
            </p>

            {/* SEARCH */}
            <div className="mt-8">
              <input
                type="text"
                placeholder="Cari pelatihan saya..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  bg-white
                  text-black
                  border
                  border-black/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:ring-2
                  focus:ring-orange-400
                "
              />
            </div>

            {/* STATS */}
            <div
              className="
                grid
                grid-cols-2
                lg:grid-cols-3
                gap-4
                mt-10
              "
            >
              {/* TOTAL */}
              <div
                className="
                  bg-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-5
                "
              >
                <p className="text-white/60">Total Pelatihan</p>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-black
                  "
                >
                  {totalPelatihan}
                </h2>
              </div>

              {/* COMPLETED */}
              <div
                className="
                  bg-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-5
                "
              >
                <p className="text-white/60">Completed</p>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-black
                  "
                >
                  {completedPelatihan}
                </h2>
              </div>

              {/* PENDING */}
              <div
                className="
                  bg-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-5
                "
              >
                <p className="text-white/60">Pending</p>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-black
                  "
                >
                  {pendingPelatihan}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* ==============================
            FILTER BUTTON
        ============================== */}

        <div
          className="
            flex
            flex-wrap
            gap-3
            mt-6
          "
        >
          {["all", "completed", "pending", "paid", "rejected"].map((item) => (
            <button
              key={item}
              onClick={() => setStatusFilter(item)}
              className={`
                px-5
                py-2
                rounded-full
                text-sm
                font-semibold
                transition-all

                ${
                  statusFilter === item
                    ? `
                      bg-orange-500
                      text-white
                    `
                    : `
                      bg-white
                      text-black
                      border
                      border-black/10
                    `
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ==============================
            CARD GRID
        ============================== */}

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            mt-10
          "
        >
          {/* ==============================
              LOADING
          ============================== */}

          {loading ? (
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  animate-pulse
                "
              >
                <div
                  className="
                    h-52
                    bg-gray-200
                  "
                />

                <div className="p-6">
                  <div
                    className="
                      h-6
                      bg-gray-200
                      rounded-lg
                    "
                  />

                  <div
                    className="
                      h-4
                      bg-gray-100
                      rounded-lg
                      mt-4
                    "
                  />

                  <div
                    className="
                      h-10
                      bg-gray-200
                      rounded-2xl
                      mt-6
                    "
                  />
                </div>
              </div>
            ))
          ) : filteredData.length === 0 ? (
            /* ==============================
                EMPTY STATE
            ============================== */

            <div
              className="
                col-span-full
                bg-white
                rounded-3xl
                p-14
                text-center
                border
                border-black/5
              "
            >
              <div className="text-7xl">📚</div>

              <h2
                className="
                  mt-6
                  text-2xl
                  font-bold
                  text-[#2B1D16]
                "
              >
                Belum Ada Pelatihan
              </h2>

              <p
                className="
                  mt-3
                  text-black/50
                "
              >
                Anda belum mengikuti pelatihan apa pun.
              </p>
            </div>
          ) : (
            /* ==============================
                CARD LIST
            ============================== */

            filteredData.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  border
                  border-black/5
                  hover:-translate-y-2
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >
                {/* THUMBNAIL */}
                <img
                  src={`http://127.0.0.1:8000/uploads/pelatihan/${item.pelatihan?.thumbnail}`}
                  alt=""
                  className="
                    w-full
                    h-52
                    object-cover
                  "
                />

                <div className="p-6">
                  {/* TITLE */}
                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#2B1D16]
                    "
                  >
                    {item.pelatihan?.title}
                  </h2>

                  {/* DATE */}
                  <p
                    className="
                      mt-2
                      text-sm
                      text-black/50
                    "
                  >
                    Tanggal Daftar:
                    <span
                      className="
                        font-semibold
                        ml-2
                      "
                    >
                      {formatDate(item.created_at)}
                    </span>
                  </p>

                  {/* STATUS */}
                  <div className="mt-4">
                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        ${getStatusClass(item.status)}
                      `}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </div>

                  {/* DETAIL BUTTON */}
                  <button
                    onClick={() => setSelectedPelatihan(item)}
                    className="
                      w-full
                      h-12
                      mb-3
                      mt-6
                      border
                      border-black/10
                      hover:bg-black/5
                      rounded-2xl
                      font-semibold
                      transition-all
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <FaBookOpen />

                    <span>Lihat Detail</span>
                  </button>

                  {/* ACTION BUTTON */}
                  <div>
                    {/* COMPLETED */}
                    {item.status === "completed" && (
                      <button
                        onClick={() => {
                          toast.success("Membuka kelas...");

                          window.open(item.pelatihan?.link_grup, "_blank");
                        }}
                        className="
                          w-full
                          h-12
                          bg-green-500
                          hover:bg-green-400
                          text-white
                          rounded-2xl
                          font-semibold
                          transition-all
                        "
                      >
                        Masuk Kelas
                      </button>
                    )}

                    {/* REJECTED */}
                    {item.status === "rejected" && (
                      <button
                        onClick={() =>
                          navigate("/payment", {
                            state: {
                              transaksi: item,
                            },
                          })
                        }
                        className="
                          w-full
                          h-12
                          bg-red-500
                          hover:bg-red-400
                          text-white
                          rounded-2xl
                          font-semibold
                          transition-all
                        "
                      >
                        Upload Ulang
                      </button>
                    )}

                    {/* PENDING */}
                    {(item.status === "pending" || item.status === "paid") && (
                      <button
                        disabled
                        className="
                          w-full
                          h-12
                          bg-yellow-400
                          text-white
                          rounded-2xl
                          font-semibold
                          cursor-not-allowed
                        "
                      >
                        Menunggu Verifikasi
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ==============================
          DETAIL MODAL
      ============================== */}

      {selectedPelatihan && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-50
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              bg-white
              w-full
              max-w-3xl
              max-h-[90vh]
              overflow-y-auto
              rounded-[32px]
              overflow-hidden
              relative
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedPelatihan(null)}
              className="
                absolute
                top-5
                right-5
                w-10
                h-10
                rounded-full
                bg-white/80
                backdrop-blur-xl
                hover:bg-white
                transition
                z-10
                flex
                items-center
                justify-center
              "
            >
              <FaTimes />
            </button>

            {/* THUMBNAIL */}
            <div className="relative">
              <img
                src={`http://127.0.0.1:8000/uploads/pelatihan/${selectedPelatihan.pelatihan?.thumbnail}`}
                alt=""
                className="
                  w-full
                  h-72
                  object-cover
                "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/70
                  to-transparent
                "
              />

              {/* TITLE */}
              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  text-white
                "
              >
                <p className="text-sm text-white/70">Pelatihan</p>

                <h2
                  className="
                    text-3xl
                    font-black
                    mt-2
                  "
                >
                  {selectedPelatihan.pelatihan?.title}
                </h2>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-8">
              {/* STATUS */}
              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  ${getStatusClass(selectedPelatihan.status)}
                `}
              >
                {getStatusText(selectedPelatihan.status)}
              </span>

              {/* DESCRIPTION */}
              <div className="mt-6">
                <h3
                  className="
                    text-lg
                    font-bold
                    text-[#2B1D16]
                  "
                >
                  Deskripsi
                </h3>

                <p
                  className="
                    mt-3
                    text-black/60
                    leading-relaxed
                  "
                >
                  {selectedPelatihan.pelatihan?.description}
                </p>
              </div>

              {/* INFO GRID */}
              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-4
                  mt-8
                "
              >
                {/* TANGGAL */}
                <div
                  className="
                    bg-[#fffaf5]
                    rounded-2xl
                    p-5
                  "
                >
                  <p className="text-sm text-black/50">Tanggal Daftar</p>

                  <h3 className="font-bold mt-1">
                    {formatDate(selectedPelatihan.created_at)}
                  </h3>
                </div>

                {/* KATEGORI */}
                <div
                  className="
                    bg-[#fffaf5]
                    rounded-2xl
                    p-5
                  "
                >
                  <p className="text-sm text-black/50">Kategori</p>

                  <h3 className="font-bold mt-1 capitalize">
                    {selectedPelatihan.pelatihan?.kategori}
                  </h3>
                </div>

                {/* DURASI */}
                <div
                  className="
                    bg-[#fffaf5]
                    rounded-2xl
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                        text-orange-500
                      "
                    >
                      <FaClock />
                    </div>

                    <div>
                      <p className="text-sm text-black/50">Durasi</p>

                      <h3 className="font-bold mt-1">3 Bulan</h3>
                    </div>
                  </div>
                </div>

                {/* LEVEL */}
                <div
                  className="
                    bg-[#fffaf5]
                    rounded-2xl
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                        text-orange-500
                      "
                    >
                      <FaLayerGroup />
                    </div>

                    <div>
                      <p className="text-sm text-black/50">Level</p>

                      <h3 className="font-bold mt-1">Beginner</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-4
                  mt-10
                "
              >
                {/* MASUK KELAS */}
                {selectedPelatihan.status === "completed" && (
                  <button
                    onClick={() => {
                      toast.success("Membuka kelas...");

                      window.open(
                        selectedPelatihan.pelatihan?.link_grup,
                        "_blank",
                      );
                    }}
                    className="
                      flex-1
                      h-14
                      rounded-2xl
                      bg-green-500
                      hover:bg-green-400
                      text-white
                      font-bold
                      transition-all
                    "
                  >
                    Masuk Kelas
                  </button>
                )}

                {/* CLOSE */}
                <button
                  onClick={() => setSelectedPelatihan(null)}
                  className="
                    flex-1
                    h-14
                    rounded-2xl
                    border
                    border-black/10
                    hover:bg-black/5
                    font-semibold
                    transition-all
                  "
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
