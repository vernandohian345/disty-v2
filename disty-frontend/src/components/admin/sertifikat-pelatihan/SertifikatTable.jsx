import { Eye, Download, RefreshCcw, CheckCircle } from "lucide-react";

export default function SertifikatTable({
  loading,
  peserta,
  handleCompleted,
  handlePreview,
  handleDownload,
  handleRegenerate,
}) {
  return (
    <div
      className="
                bg-white
                rounded-3xl
                shadow-sm
                overflow-hidden
            "
    >
      {/* MOBILE VIEW */}
      <div className="lg:hidden p-4 space-y-4">
        {loading ? (
          <div className="bg-white rounded-3xl p-8 text-center">Loading...</div>
        ) : peserta.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center">
            Tidak ada peserta
          </div>
        ) : (
          peserta.map((item) => (
            <div
              key={item.id}
              className="
          bg-white
          rounded-3xl
          border
          border-slate-100
          shadow-sm
          p-4
        "
            >
              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">{item.nama}</h4>

                  <p className="text-sm text-slate-500">{item.email}</p>
                </div>

                <span
                  className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-bold
              ${
                item.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : item.status === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
              }
            `}
                >
                  {item.status}
                </span>
              </div>

              {/* PELATIHAN */}
              <div className="mt-4">
                <p className="text-xs text-slate-400">Pelatihan</p>

                <h5 className="font-semibold text-slate-700 mt-1">
                  {item.pelatihan?.title || "-"}
                </h5>
              </div>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div
                  className="
              rounded-2xl
              bg-slate-50
              p-3
            "
                >
                  <p className="text-xs text-slate-400">Completion</p>

                  <p className="font-bold mt-1">
                    {item.status === "completed" ? "Selesai" : "Belum"}
                  </p>
                </div>

                <div
                  className="
              rounded-2xl
              bg-slate-50
              p-3
            "
                >
                  <p className="text-xs text-slate-400">Sertifikat</p>

                  <p className="font-bold mt-1">
                    {item.status === "completed" ? "Tersedia" : "Belum Ada"}
                  </p>
                </div>
              </div>

              {/* ACTION */}
              <div
                className="
            mt-4
            flex
            flex-wrap
            gap-2
          "
              >
                {item.status === "paid" && (
                  <button
                    onClick={() => handleCompleted(item.id)}
                    className="
                flex-1
                h-11
                rounded-2xl
                bg-orange-100
                text-orange-600
                font-semibold
                flex
                items-center
                justify-center
                gap-2
              "
                  >
                    <CheckCircle size={16} />
                    Selesaikan
                  </button>
                )}

                {item.status === "completed" && (
                  <>
                    <button
                      onClick={() => handlePreview(item)}
                      className="
                  flex-1
                  h-11
                  rounded-2xl
                  bg-purple-100
                  text-purple-600
                  flex
                  items-center
                  justify-center
                "
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => handleDownload(item)}
                      className="
                  flex-1
                  h-11
                  rounded-2xl
                  bg-blue-100
                  text-blue-600
                  flex
                  items-center
                  justify-center
                "
                    >
                      <Download size={18} />
                    </button>

                    <button
                      onClick={() => handleRegenerate(item.id)}
                      className="
                  flex-1
                  h-11
                  rounded-2xl
                  bg-orange-100
                  text-orange-600
                  flex
                  items-center
                  justify-center
                "
                    >
                      <RefreshCcw size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* TABLE DESKTOP */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-5 text-left">Peserta</th>

              <th className="p-5 text-left">Pelatihan</th>

              <th className="p-5 text-left">Status</th>

              <th className="p-5 text-left">Completion</th>

              <th className="p-5 text-left">Sertifikat</th>

              <th className="p-5 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="
                                            p-10
                                            text-center
                                        "
                >
                  Loading...
                </td>
              </tr>
            ) : peserta.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="
                                            p-10
                                            text-center
                                        "
                >
                  Tidak ada peserta
                </td>
              </tr>
            ) : (
              peserta.map((item) => (
                <tr key={item.id} className="border-t">
                  {/* PESERTA */}
                  <td className="p-5">
                    <div>
                      <h5 className="font-bold">{item.nama}</h5>

                      <p
                        className="
                                                        text-sm
                                                        text-slate-500
                                                    "
                      >
                        {item.email}
                      </p>
                    </div>
                  </td>

                  {/* PELATIHAN */}
                  <td className="p-5">{item.pelatihan?.title || "-"}</td>

                  {/* STATUS */}
                  <td className="p-5">
                    <span
                      className={`
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                    text-sm
                                                    font-bold
                                                    ${
                                                      item.status === "paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status ===
                                                            "completed"
                                                          ? "bg-blue-100 text-blue-700"
                                                          : "bg-yellow-100 text-yellow-700"
                                                    }
                                                `}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* COMPLETION */}
                  <td className="p-5">
                    {item.status === "completed" ? (
                      <span
                        className="
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            bg-blue-100
                                                            text-blue-700
                                                            text-sm
                                                            font-bold
                                                        "
                      >
                        Selesai
                      </span>
                    ) : (
                      <span
                        className="
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            bg-yellow-100
                                                            text-yellow-700
                                                            text-sm
                                                            font-bold
                                                        "
                      >
                        Belum Selesai
                      </span>
                    )}
                  </td>

                  {/* SERTIFIKAT */}
                  <td className="p-5">
                    {item.status === "completed" ? "Tersedia" : "Belum Ada"}
                  </td>

                  {/* ACTION */}
                  <td className="p-5">
                    <div
                      className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    flex-nowrap
                                                "
                    >
                      {/* TANDAI SELESAI */}
                      {item.status === "paid" && (
                        <button
                          onClick={() => handleCompleted(item.id)}
                          className="
                                                                w-9
                                                                h-9
                                                                rounded-lg
                                                                bg-orange-50
                                                                hover:bg-orange-100
                                                                text-orange-600
                                                                flex
                                                                items-center
                                                                justify-center
                                                                transition-all
                                                                duration-200
                                                                shrink-0
                                                            "
                          title="Tandai Selesai"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}

                      {/* PREVIEW */}
                      {item.status === "completed" && (
                        <>
                          <button
                            onClick={() => handlePreview(item)}
                            className="
                                                                    w-9
                                                                    h-9
                                                                    rounded-lg
                                                                    bg-purple-50
                                                                    hover:bg-purple-100
                                                                    text-purple-600
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    transition-all
                                                                    duration-200
                                                                    shrink-0
                                                                "
                            title="Preview"
                          >
                            <Eye size={16} />
                          </button>

                          {/* DOWNLOAD */}
                          <button
                            onClick={() => handleDownload(item)}
                            className="
                                                                    w-9
                                                                    h-9
                                                                    rounded-lg
                                                                    bg-blue-50
                                                                    hover:bg-blue-100
                                                                    text-blue-600
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    transition-all
                                                                    duration-200
                                                                    shrink-0
                                                                "
                            title="Download"
                          >
                            <Download size={16} />
                          </button>

                          {/* REGENERATE */}
                          <button
                            onClick={() => handleRegenerate(item.id)}
                            className="
                                                                    w-9
                                                                    h-9
                                                                    rounded-lg
                                                                    bg-orange-50
                                                                    hover:bg-orange-100
                                                                    text-orange-600
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    transition-all
                                                                    duration-200
                                                                    shrink-0
                                                                "
                            title="Regenerate"
                          >
                            <RefreshCcw size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
