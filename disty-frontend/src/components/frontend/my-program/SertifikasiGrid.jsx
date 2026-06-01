export default function SertifikasiGrid({ data }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "paid":
        return "bg-blue-100 text-blue-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (!data.length) {
    return (
      <div
        className="
          mt-10
          bg-white
          rounded-3xl
          p-10
          text-center
          shadow-sm
        "
      >
        <h3
          className="
            text-xl
            font-bold
            text-[#2B1D16]
          "
        >
          Belum Ada Sertifikasi
        </h3>

        <p
          className="
            mt-3
            text-[#6b625d]
          "
        >
          Anda belum mengikuti sertifikasi apa pun.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        mt-10
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {data.map((item) => (
        <div
          key={item.id}
          className="
            bg-white
            rounded-3xl
            p-6
            border
            border-orange-100
            shadow-sm
            hover:shadow-md
            transition-all
          "
        >
          {/* Gambar */}
          <div className="mb-5 overflow-hidden rounded-2xl">
            <img
              src={`http://127.0.0.1:8000/uploads/sertifikasi/${item.sertifikasi?.sampul}`}
              alt={item.sertifikasi?.nama_sertifikasi}
              className="
                w-full
                h-48
                object-cover
                transition-all
                duration-300
                hover:scale-105
              "
            />
          </div>

          {/* Nama Sertifikasi */}
          <h3
            className="
              text-xl
              font-bold
              text-[#2B1D16]
              line-clamp-2
            "
          >
            {item.sertifikasi?.nama_sertifikasi}
          </h3>

          {/* Informasi Sertifikasi */}
          <div
            className="
              mt-4
              space-y-2
              text-sm
              text-[#6b625d]
            "
          >
            <p>📅 {item.sertifikasi?.tanggal_sertifikasi || "-"}</p>

            <p>🌐 {item.sertifikasi?.bahasa || "-"}</p>

            <p>⏱ {item.sertifikasi?.durasi || "-"}</p>
          </div>

          {/* Status */}
          <div className="mt-5">
            <p
              className="
                text-sm
                text-[#6b625d]
                mb-2
              "
            >
              Status
            </p>

            <span
              className={`
                inline-flex
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                ${getStatusColor(item.status)}
              `}
            >
              {formatStatus(item.status)}
            </span>
          </div>

          {/* Tombol */}
          <div className="mt-6">
            {item.status === "approved" ? (
              <button
                onClick={() =>
                  window.open(item.sertifikasi?.link_grup, "_blank")
                }
                className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-400
                  text-white
                  py-3
                  rounded-2xl
                  font-semibold
                  transition-all
                "
              >
                Masuk Kelas
              </button>
            ) : item.status === "rejected" ? (
              <button
                disabled
                className="
                  w-full
                  bg-red-100
                  text-red-600
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >
                Ditolak
              </button>
            ) : (
              <button
                disabled
                className="
                  w-full
                  bg-gray-200
                  text-gray-500
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >
                Menunggu Verifikasi
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
