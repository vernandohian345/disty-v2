import UserForm from "./UserForm";

export default function UserModal({ isOpen, onClose, onSubmit, editData }) {
  if (!isOpen) return null;

  return (
    <div
      className="
                fixed
                inset-0
                z-[999]
                flex
                items-center
                justify-center
                bg-black/50
                backdrop-blur-sm
                p-5
            "
    >
      {/* MODAL */}
      <div
        className="
            relative
            w-full
            max-w-3xl

            max-h-[95vh]
            overflow-y-auto

            bg-white

            rounded-[24px]
            md:rounded-[32px]

            shadow-2xl
        "
      >
        {/* TOP BAR */}
        <div
          className="
                    h-1.5
                    bg-gradient-to-r
                    from-orange-400
                    via-orange-500
                    to-orange-600
                "
        ></div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
                        absolute
                        top-4
                        right-4
                        md:top-6
                        md:right-6
                        w-10
                        h-10
                        z-20
                        md:w-11
                        md:h-11
                        rounded-2xl
                        bg-slate-100
                        hover:bg-red-50
                        hover:text-red-500
                        transition-all
                        flex
                        items-center
                        justify-center
                        text-slate-500
                    "
        >
          <i
            className="
                        fas
                        fa-times
                    "
          ></i>
        </button>

        {/* HEADER */}
        <div
          className="
                    px-5
                    md:px-10
                    pt-6
                    md:pt-10
                    pb-5
                    md:pb-7
                    border-b
                    border-slate-100
                "
        >
          {/* BADGE */}
          <div
            className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        hidden sm:inline-flex
                        rounded-2xl
                        bg-orange-50
                        border
                        border-orange-100
                        text-orange-600
                        text-xs
                        font-bold
                        mb-5
                    "
          >
            <div
              className="
                            w-2
                            h-2
                            rounded-full
                            bg-orange-500
                        "
            ></div>
            Dashboard User Management
          </div>

          {/* TITLE */}
          <h2
            className="
                        text-4xl
                        font-black
                        tracking-tight
                        text-slate-800
                    "
          >
            {editData ? "Edit User" : "Tambah User"}
          </h2>

          {/* DESC */}
          <p
            className="
                        text-slate-500
                        mt-3
                        text-[15px]
                        leading-relaxed
                    "
          >
            Kelola akun admin dan user dashboard dengan tampilan modern dan
            profesional.
          </p>
        </div>

        {/* BODY */}
        <div
          className="
                    p-8
                    bg-slate-50/50
                "
        >
          <UserForm onSubmit={onSubmit} editData={editData} />
        </div>
      </div>
    </div>
  );
}
