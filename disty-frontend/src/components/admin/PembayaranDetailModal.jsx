export default function PembayaranDetailModal({
  open,
  onClose,
  data,
  onApprove,
  onReject,
}) {
  if (!open || !data) return null;

  const item = data.pelatihan || data.sertifikasi;

  return (
    <div
      className="
            fixed
            inset-0
            z-50
            bg-black/50
            flex
            items-center
            justify-center
            p-5
        "
    >
      <div
        className="
                bg-white
                rounded-[30px]
                w-full
                max-w-3xl
                max-h-[90vh]
                overflow-y-auto
                shadow-2xl
            "
      >
        {/* HEADER */}
        <div
          className="
                    bg-gradient-to-r
                    from-orange-500
                    to-orange-400
                    p-6
                    text-white
                    flex
                    justify-between
                    items-center
                "
        >
          <div>
            <h2
              className="
                            text-3xl
                            font-black
                        "
            >
              Detail Pembayaran
            </h2>

            <p className="text-orange-100">Verifikasi pembayaran peserta</p>
          </div>

          <button
            onClick={onClose}
            className="
                            w-10
                            h-10
                            rounded-xl
                            bg-white/20
                        "
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          <div
            className="
                        grid
                        md:grid-cols-2
                        gap-6
                    "
          >
            <div>
              <h5
                className="
                                font-bold
                                text-slate-700
                                mb-2
                            "
              >
                Peserta
              </h5>

              <p>{data.user?.name}</p>
            </div>

            <div>
              <h5
                className="
                                font-bold
                                text-slate-700
                                mb-2
                            "
              >
                Email
              </h5>

              <p>{data.user?.email}</p>
            </div>

            <div>
              <h5
                className="
                                font-bold
                                text-slate-700
                                mb-2
                            "
              >
                Program
              </h5>

              <p>{item?.nama_pelatihan || item?.nama_sertifikasi}</p>
            </div>

            <div>
              <h5
                className="
                                font-bold
                                text-slate-700
                                mb-2
                            "
              >
                Status
              </h5>

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
                {data.status}
              </span>
            </div>
          </div>

          {/* BUKTI */}
          <div className="mt-8">
            <h5
              className="
                            font-bold
                            text-slate-700
                            mb-4
                        "
            >
              Bukti Pembayaran
            </h5>

            <img
              src={`http://127.0.0.1:8000/${data.bukti}`}
              alt="Bukti"
              className="
  w-full
  max-h-[250px]
  rounded-3xl
  object-contain
  bg-gray-100
"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x400";
              }}
            />
          </div>

          {/* FOOTER */}
          <div
            className="
                        flex
                        flex-wrap
                        justify-end
                        gap-4
                        mt-8
                    "
          >
            <button
              onClick={() => onReject(data.id)}
              className="
                                px-6
                                py-3
                                rounded-2xl
                                bg-red-500
                                text-white
                                font-bold
                            "
            >
              Reject
            </button>

            <button
              onClick={() => onApprove(data.id)}
              className="
                                px-6
                                py-3
                                rounded-2xl
                                bg-green-500
                                text-white
                                font-bold
                            "
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
