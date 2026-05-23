import {
  FaTimes,
  FaSave,
} from "react-icons/fa";

export default function EditProfileModal({
  editOpen,
  setEditOpen,
  formData,
  setFormData,
  handleUpdateProfile,
  user,
}) {
  if (!editOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        p-5
      "
    >
      <div
        className="
          w-full
          max-w-lg
          bg-white
          rounded-[35px]
          shadow-2xl
          p-8
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-slate-800">
            Edit Profile
          </h1>

          <button
            onClick={() => setEditOpen(false)}
            className="
              w-10 h-10
              rounded-xl
              bg-slate-100
              hover:bg-slate-200
              flex
              items-center
              justify-center
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Nama
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                border
                border-slate-200
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Role
            </label>

            <input
              type="text"
              value={user?.role}
              disabled
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                bg-slate-100
                text-slate-500
                cursor-not-allowed
              "
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpdateProfile}
            className="
              w-full
              h-14
              rounded-2xl
              bg-orange-500
              hover:bg-orange-600
              text-white
              font-bold
              flex
              items-center
              justify-center
              gap-3
              transition-all
            "
          >
            <FaSave />

            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}