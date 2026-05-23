import {
  FaBookOpen,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function ProfilePelatihan({
  pelatihan = [],
}) {
  return (
    <div className="mt-14">
      {/* TITLE */}
      <div className="flex items-center gap-3 mb-6">
        <FaBookOpen className="text-orange-500 text-2xl" />

        <h1 className="text-3xl font-black text-slate-800">
          Pelatihan Saya
        </h1>
      </div>

      {/* EMPTY */}
      {pelatihan.length === 0 ? (
        <div
          className="
            bg-white
            rounded-[35px]
            p-10
            text-center
            shadow-lg
          "
        >
          <h1 className="text-2xl font-bold text-slate-700">
            Belum Ada Pelatihan
          </h1>

          <p className="text-slate-500 mt-2">
            Kamu belum mengikuti pelatihan
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pelatihan.map((item, index) => (
            <div
              key={item?.id || index}
              className="
                bg-white
                rounded-[30px]
                p-6
                shadow-lg
                border
                border-slate-100
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
              "
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div
                  className="
                    w-14 h-14
                    rounded-2xl
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaBookOpen className="text-orange-500 text-xl" />
                </div>

                <div
                  className="
                    px-4
                    py-2
                    rounded-2xl
                    bg-orange-100
                    text-orange-600
                    text-sm
                    font-bold
                    capitalize
                  "
                >
                  {item?.status || "pending"}
                </div>
              </div>

              {/* TITLE */}
              <h1
                className="
                  mt-5
                  text-xl
                  font-black
                  text-slate-800
                "
              >
                {item?.pelatihan
                  ?.nama_pelatihan ||
                  item?.pelatihan?.title ||
                  "Pelatihan"}
              </h1>

              {/* PRICE */}
              <div className="mt-5 flex items-center gap-3">
                <FaMoneyBillWave className="text-green-500" />

                <p className="font-semibold text-slate-600">
                  Rp{" "}
                  {item?.pelatihan?.harga?.toLocaleString(
                    "id-ID"
                  ) || "0"}
                </p>
              </div>

              {/* DATE */}
              <p className="mt-4 text-sm text-slate-400">
                Bergabung:
                {" "}
                {new Date(
                  item.created_at
                ).toLocaleDateString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}