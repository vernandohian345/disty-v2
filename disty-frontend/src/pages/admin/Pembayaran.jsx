import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import PembayaranDetailModal from "../../components/admin/PembayaranDetailModal";

import {
  getPembayaran,
  approvePembayaran,
  rejectPembayaran,
} from "../../services/pembayaranService";

export default function Pembayaran() {
  // =========================
  // STATES
  // =========================
  const [loading, setLoading] = useState(true);

  const [transaksi, setTransaksi] = useState([]);

  const [stats, setStats] = useState({});

  const [search, setSearch] = useState("");

  const [type, setType] = useState("pelatihan");

  const [status, setStatus] = useState("all");

  const [selectedData, setSelectedData] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [openType, setOpenType] = useState(false);

  const [openStatus, setOpenStatus] = useState(false);

  // =========================
  // FETCH DATA
  // =========================
  const fetchPembayaran = async () => {
    try {
      setLoading(true);

      const response = await getPembayaran(type, status);

      setTransaksi(response.data.data.data);

      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPembayaran();
  }, [type, status]);

  // =========================
  // FILTER SEARCH
  // =========================
  const filteredData = transaksi.filter((item) => {
    const program = item.pelatihan?.title || item.sertifikasi?.nama_sertifikasi;

    return (
      item.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      program?.toLowerCase().includes(search.toLowerCase())
    );
  });

  // =========================
  // APPROVE
  // =========================
  const handleApprove = async (id) => {
    try {
      await approvePembayaran(type, id);

      fetchPembayaran();

      setOpenModal(false);

      alert("Pembayaran berhasil disetujui");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // REJECT
  // =========================
  const handleReject = async (id) => {
    if (!confirm("Yakin ingin menolak pembayaran?")) return;

    try {
      await rejectPembayaran(type, id);

      fetchPembayaran();

      setOpenModal(false);

      alert("Pembayaran berhasil ditolak");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // STATUS BADGE
  // =========================
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return `
                        bg-yellow-100
                        text-yellow-700
                    `;

      case "paid":
        return `
                        bg-blue-100
                        text-blue-700
                    `;

      case "completed":
        return `
                        bg-green-100
                        text-green-700
                    `;

      default:
        return `
                        bg-slate-100
                        text-slate-700
                    `;
    }
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div
        className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-5
                mb-8
            "
      >
        <div>
          <h1
            className="
                        text-4xl
                        font-black
                        text-slate-800
                    "
          >
            Pembayaran Peserta
          </h1>

          <p
            className="
                        text-slate-500
                        mt-2
                    "
          >
            Kelola pembayaran pelatihan & sertifikasi peserta
          </p>
        </div>

        {/* SEARCH */}
        <div
          className="
                    w-full
                    lg:w-96
                    relative
                "
        >
          <input
            type="text"
            placeholder="Cari peserta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
                            w-full
                            pl-12
                            pr-4
                            py-4
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            focus:outline-none
                        "
          />

          <i
            className="
                        fas
                        fa-search
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
          ></i>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
                grid
                grid-cols-2
                xl:grid-cols-4
                gap-3
                md:gap-6
                mb-8
            "
      >
        {/* TOTAL */}
        <div
          className="
                    bg-white
                    rounded-[24px]
                    p-4
                    md:p-6
                    border
                    border-slate-100
                    shadow-sm
                    hover:shadow-lg
                    transition-all
                    duration-300
                "
        >
          <div
            className="
                        flex
                        items-center
                        justify-between
                    "
          >
            <div>
              <p
                className="
                                text-slate-500
                            "
              >
                Total
              </p>

              <h2
                className="
                                text-4xl
                                font-black
                                mt-2
                            "
              >
                {stats.total || 0}
              </h2>
            </div>

            <div
              className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-orange-100
                            flex
                            items-center
                            justify-center
                        "
            >
              <i
                className="
                                fas
                                fa-wallet
                                text-2xl
                                text-orange-500
                            "
              ></i>
            </div>
          </div>
        </div>

        {/* PENDING */}
        <div
          className="
                  bg-white
                  rounded-[24px]
                  p-4
                  md:p-6
                  border
                  border-slate-100
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
        >
          <div
            className="
                        flex
                        items-center
                        justify-between
                    "
          >
            <div>
              <p
                className="
                                text-slate-500
                            "
              >
                Pending
              </p>

              <h2
                className="
                                text-4xl
                                font-black
                                mt-2
                            "
              >
                {stats.pending || 0}
              </h2>
            </div>

            <div
              className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-yellow-100
                            flex
                            items-center
                            justify-center
                        "
            >
              <i
                className="
                                fas
                                fa-clock
                                text-2xl
                                text-yellow-500
                            "
              ></i>
            </div>
          </div>
        </div>

        {/* PAID */}
        <div
          className="
                    bg-white
                    rounded-[24px]
                    p-4
                    md:p-6
                    border
                    border-slate-100
                    shadow-sm
                    hover:shadow-lg
                    transition-all
                    duration-300
                "
        >
          <div
            className="
                        flex
                        items-center
                        justify-between
                    "
          >
            <div>
              <p
                className=" 
                                text-slate-500
                            "
              >
                Dibayar
              </p>

              <h2
                className="
                                text-4xl
                                font-black
                                mt-2
                            "
              >
                {stats.paid || 0}
              </h2>
            </div>

            <div
              className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                        "
            >
              <i
                className="
                                fas
                                fa-money-check
                                text-2xl
                                text-blue-500
                            "
              ></i>
            </div>
          </div>
        </div>

        {/* APPROVED */}
        <div
          className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-sm
                "
        >
          <div
            className="
                        flex
                        items-center
                        justify-between
                    "
          >
            <div>
              <p
                className="
                                text-slate-500
                            "
              >
                Approved
              </p>

              <h2
                className="
                                text-4xl
                                font-black
                                mt-2
                            "
              >
                {stats.completed || 0}
              </h2>
            </div>

            <div
              className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-green-100
                            flex
                            items-center
                            justify-center
                        "
            >
              <i
                className="
                                fas
                                fa-circle-check
                                text-2xl
                                text-green-500
                            "
              ></i>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div
        className="
    bg-white
    rounded-[30px]
    p-6
    shadow-sm
    mb-8
    flex
    flex-col
    lg:flex-row
    gap-5
"
      >
        {/* TYPE */}
        <div
          className="
        relative
        w-full
        lg:w-72
    "
        >
          <label
            className="
            block
            text-sm
            font-bold
            text-slate-600
            mb-2
        "
          >
            Jenis Program
          </label>

          {/* BUTTON */}
          <button
            onClick={() => setOpenType(!openType)}
            className="
                w-full
                bg-slate-50
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                flex
                items-center
                justify-between
                font-semibold
                hover:border-orange-400
                transition
            "
          >
            <span className="capitalize">{type}</span>

            <i
              className={`
                fas
                fa-chevron-down
                transition
                ${openType ? "rotate-180" : ""}
            `}
            ></i>
          </button>

          {/* DROPDOWN */}
          {openType && (
            <div
              className="
                    absolute
                    top-full
                    left-0
                    mt-3
                    w-full
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-slate-100
                    overflow-hidden
                    z-50
                    animate-in
                    fade-in
                    zoom-in-95
                "
            >
              {["pelatihan", "sertifikasi"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setType(item);

                    setOpenType(false);
                  }}
                  className={`
                                    w-full
                                    px-5
                                    py-4
                                    text-left
                                    transition
                                    font-medium
                                    capitalize

                                    ${
                                      type === item
                                        ? `
                                                bg-orange-50
                                                text-orange-600
                                            `
                                        : `
                                                hover:bg-slate-50
                                            `
                                    }
                                `}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* STATUS */}
        <div
          className="
        relative
        w-full
        lg:w-72
    "
        >
          <label
            className="
            block
            text-sm
            font-bold
            text-slate-600
            mb-2
        "
          >
            Status Pembayaran
          </label>

          {/* BUTTON */}
          <button
            onClick={() => setOpenStatus(!openStatus)}
            className="
                w-full
                bg-slate-50
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                flex
                items-center
                justify-between
                font-semibold
                hover:border-orange-400
                transition
            "
          >
            <span className="capitalize">{status}</span>

            <i
              className={`
                fas
                fa-chevron-down
                transition
                ${openStatus ? "rotate-180" : ""}
            `}
            ></i>
          </button>

          {/* DROPDOWN */}
          {openStatus && (
            <div
              className="
                    absolute
                    top-full
                    left-0
                    mt-3
                    w-full
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-slate-100
                    overflow-hidden
                    z-50
                "
            >
              {["all", "pending", "paid", "approved"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setStatus(item);

                    setOpenStatus(false);
                  }}
                  className={`
                                    w-full
                                    px-5
                                    py-4
                                    text-left
                                    transition
                                    font-medium
                                    capitalize

                                    ${
                                      status === item
                                        ? `
                                                bg-orange-50
                                                text-orange-600
                                            `
                                        : `
                                                hover:bg-slate-50
                                            `
                                    }
                                `}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table MOBILE */}
      <div className="block lg:hidden p-4 space-y-4">
        {filteredData.map((item) => {
          const program =
            item.pelatihan?.title || item.sertifikasi?.nama_sertifikasi;

          return (
            <div
              key={item.id}
              className="
              bg-white
              rounded-3xl
              border
              border-slate-100
              shadow-sm
              overflow-hidden
            "
            >
              {/* HEADER */}
              <div className="p-4 flex items-start gap-3">
                <img
                  src={
                    item.bukti
                      ? `http://127.0.0.1:8000/uploads/${item.bukti}`
                      : "https://placehold.co/100x70"
                  }
                  alt=""
                  className="
                  w-20
                  h-20
                  rounded-2xl
                  object-cover
                  border
                  border-slate-100
                "
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 line-clamp-2">
                    {item.user?.name}
                  </h3>

                  <p className="text-sm text-slate-500 truncate">
                    {item.user?.email}
                  </p>

                  <span
                    className={`
                    inline-flex
                    mt-2
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold
                    ${getStatusClass(item.status)}
                  `}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              {/* BODY */}
              <div className="px-4 pb-4">
                <div className="bg-slate-50 rounded-2xl p-3">
                  <p className="text-xs text-slate-400">Program</p>

                  <h4 className="font-semibold text-slate-700 mt-1">
                    {program}
                  </h4>
                </div>

                <button
                  onClick={() => {
                    setSelectedData(item);
                    setOpenModal(true);
                  }}
                  className="
                  w-full
                  mt-4
                  py-3
                  rounded-2xl
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  font-bold
                  transition-all
                "
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Desktop */}
      <div
        className="
                bg-white
                rounded-3xl
                shadow-sm
                overflow-hidden
                hidden lg:table-row
            "
      >
        <div
          className="
                    overflow-x-auto
                "
        >
          <table
            className="
                        w-full
                    "
          >
            <thead
              className="
                            bg-slate-50
                        "
            >
              <tr>
                <th
                  className="
                                    text-left
                                    p-5
                                    font-bold
                                    text-slate-600
                                "
                >
                  Peserta
                </th>

                <th
                  className="
                                    text-left
                                    p-5
                                    font-bold
                                    text-slate-600
                                "
                >
                  Program
                </th>

                <th
                  className="
                                    text-left
                                    p-5
                                    font-bold
                                    text-slate-600
                                "
                >
                  Status
                </th>

                <th
                  className="
                                    text-left
                                    p-5
                                    font-bold
                                    text-slate-600
                                "
                >
                  Bukti
                </th>

                <th
                  className="
                                    text-left
                                    p-5
                                    font-bold
                                    text-slate-600
                                "
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="
                                                text-center
                                                p-10
                                            "
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="
                                                text-center
                                                p-10
                                            "
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const program =
                    item.pelatihan?.title || item.sertifikasi?.nama_sertifikasi;

                  return (
                    <tr
                      key={item.id}
                      className="
                                                        border-t
                                                        border-slate-100
                                                    "
                    >
                      {/* USER */}
                      <td className="p-5">
                        <div>
                          <h5
                            className="
                                                                font-bold
                                                            "
                          >
                            {item.user?.name}
                          </h5>

                          <p
                            className="
                                                                text-sm
                                                                text-slate-500
                                                            "
                          >
                            {item.user?.email}
                          </p>
                        </div>
                      </td>

                      {/* PROGRAM */}
                      <td className="p-5">{program}</td>

                      {/* STATUS */}
                      <td className="p-5">
                        <span
                          className={`
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            text-sm
                                                            font-bold
                                                            ${getStatusClass(item.status)}
                                                        `}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* BUKTI */}
                      <td className="p-5">
                        <img
                          src={
                            item.bukti
                              ? `http://127.0.0.1:8000/uploads/${item.bukti}`
                              : "https://placehold.co/100x70"
                          }
                          alt=""
                          className="
                                                                w-24
                                                                h-16
                                                                object-cover
                                                                rounded-2xl
                                                            "
                        />
                      </td>

                      {/* ACTION */}
                      <td className="p-5">
                        <button
                          onClick={() => {
                            setSelectedData(item);

                            setOpenModal(true);
                          }}
                          className="
                                                                px-5
                                                                py-3
                                                                rounded-2xl
                                                                bg-orange-500
                                                                hover:bg-orange-600
                                                                text-white
                                                                font-bold
                                                            "
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <PembayaranDetailModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={selectedData}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </AdminLayout>
  );
}
