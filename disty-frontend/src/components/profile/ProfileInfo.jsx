import {
  FaEnvelope,
  FaUserTag,
} from "react-icons/fa";

export default function ProfileInfo({ user }) {
  return (
    <div className="grid md:grid-cols-2 gap-5 mt-10">
      {/* EMAIL */}
      <div
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-lg
        "
      >
        <div className="flex items-center gap-4">
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
            <FaEnvelope className="text-orange-500 text-xl" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <h3 className="font-bold text-slate-800">
              {user?.email}
            </h3>
          </div>
        </div>
      </div>

      {/* ROLE */}
      <div
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-lg
        "
      >
        <div className="flex items-center gap-4">
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
            <FaUserTag className="text-orange-500 text-xl" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Role
            </p>

            <h3 className="font-bold text-slate-800 capitalize">
              {user?.role}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}