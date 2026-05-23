import {
  FaUserCircle,
  FaEdit,
} from "react-icons/fa";

export default function ProfileHeader({
  user,
  pelatihan,
  sertifikasi,
  onEdit,
}) {
  return (
    <div
      className="
        bg-white
        rounded-[35px]
        overflow-hidden
        shadow-2xl
      "
    >
      <div
        className="
          h-56
          bg-gradient-to-r
          from-orange-400
          to-orange-600
          relative
        "
      >
        <div className="absolute bottom-0 left-10 translate-y-1/2">
          <div
            className="
              w-40 h-40
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              shadow-2xl
            "
          >
            <FaUserCircle
              size={110}
              className="text-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="pt-28 px-10 pb-10">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div>
            <h1 className="text-4xl font-black">
              {user?.name}
            </h1>

            <p className="text-slate-500 capitalize mt-2">
              {user?.role}
            </p>

            <button
              onClick={onEdit}
              className="
                mt-5
                flex
                items-center
                gap-3
                px-6
                py-3
                rounded-2xl
                bg-orange-500
                hover:bg-orange-600
                text-white
                font-semibold
              "
            >
              <FaEdit />

              Edit Profile
            </button>
          </div>

          <div className="flex gap-4">
            <div className="bg-orange-100 rounded-3xl px-6 py-5 text-center">
              <h1 className="text-3xl font-black text-orange-600">
                {pelatihan.length}
              </h1>

              <p>Pelatihan</p>
            </div>

            <div className="bg-orange-100 rounded-3xl px-6 py-5 text-center">
              <h1 className="text-3xl font-black text-orange-600">
                {sertifikasi.length}
              </h1>

              <p>Sertifikasi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}