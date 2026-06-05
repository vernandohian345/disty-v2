export default function UserTable({ data, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div
        className="
                bg-white/70
                backdrop-blur-xl
                border
                border-white/20
                rounded-[40px]
                p-14
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            "
      >
        <div
          className="
                    flex
                    flex-col
                    items-center
                    justify-center
                "
        >
          <div
            className="
                        relative
                        w-20
                        h-20
                    "
          >
            <div
              className="
                            absolute
                            inset-0
                            rounded-full
                            border-[6px]
                            border-orange-200
                        "
            ></div>

            <div
              className="
                            absolute
                            inset-0
                            rounded-full
                            border-[6px]
                            border-orange-500
                            border-t-transparent
                            animate-spin
                        "
            ></div>
          </div>

          <h3
            className="
                        mt-8
                        text-2xl
                        font-black
                        text-slate-800
                    "
          >
            Loading Users
          </h3>

          <p
            className="
                        text-slate-500
                        mt-2
                    "
          >
            Sedang mengambil data user...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/20
            bg-white/80
            backdrop-blur-2xl
            shadow-[0_20px_70px_rgba(0,0,0,0.08)]
        "
    >
      {/* TOP GLOW */}
      <div
        className="
                absolute
                -top-32
                -right-32
                w-72
                h-72
                rounded-full
                bg-orange-400/10
                blur-3xl
            "
      ></div>

      {/* HEADER */}
      <div
        className="
                relative
                z-10
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
                px-8
                py-7
                border-b
                border-slate-100
            "
      >
        <div>
          <h2
            className="
                        text-3xl
                        font-black
                        text-slate-800
                        tracking-tight
                    "
          >
            User Management
          </h2>

          <p
            className="
                        text-slate-500
                        mt-2
                    "
          >
            Kelola akun admin dan user dengan mudah
          </p>
        </div>

        <div
          className="
                    px-6
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-orange-500
                    to-orange-600
                    text-white
                    font-bold
                    shadow-lg
                    shadow-orange-300/40
                "
        >
          {data.length} Total User
        </div>
      </div>

      {/* MOBILE TABLE*/}
      <div className="lg:hidden p-4 space-y-4">
        {data.map((item) => (
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
            <div className="flex items-center gap-4">
              <div
                className="
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-br
            from-orange-400
            to-orange-600
            flex
            items-center
            justify-center
            text-white
            font-black
            text-lg
          "
              >
                {item.name?.charAt(0)}
              </div>

              <div className="flex-1">
                <h3
                  className="
              font-black
              text-slate-800
            "
                >
                  {item.name}
                </h3>

                <p
                  className="
              text-sm
              text-slate-500
            "
                >
                  @{item.username}
                </p>
              </div>
            </div>

            {/* EMAIL */}
            <div
              className="
          mt-4
          rounded-2xl
          bg-slate-50
          p-3
        "
            >
              <p className="text-xs text-slate-400">Email</p>

              <p
                className="
            text-sm
            font-medium
            text-slate-700
            break-all
          "
              >
                {item.email}
              </p>
            </div>

            {/* ROLE */}
            <div className="mt-4">
              <span
                className={`
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            text-sm
            font-bold
            ${
              item.role === "admin"
                ? "bg-orange-100 text-orange-600"
                : "bg-blue-100 text-blue-600"
            }
          `}
              >
                <div
                  className={`
              w-2
              h-2
              rounded-full
              ${item.role === "admin" ? "bg-orange-500" : "bg-blue-500"}
            `}
                />

                {item.role === "admin" ? "Administrator" : "User"}
              </span>
            </div>

            {/* ACTION */}
            <div
              className="
          mt-4
          grid
          grid-cols-2
          gap-3
        "
            >
              <button
                onClick={() => onEdit(item)}
                className="
            h-11
            rounded-2xl
            bg-blue-100
            text-blue-600
            font-semibold
            flex
            items-center
            justify-center
            gap-2
          "
              >
                <i className="fas fa-pen"></i>
                Edit
              </button>

              <button
                onClick={() => onDelete(item)}
                className="
            h-11
            rounded-2xl
            bg-red-100
            text-red-600
            font-semibold
            flex
            items-center
            justify-center
            gap-2
          "
              >
                <i className="fas fa-trash"></i>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE DESKTOP */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="
                            border-b
                            border-slate-100
                            bg-slate-50/70
                        "
            >
              <th
                className="
                                px-8
                                py-5
                                text-left
                                text-sm
                                font-bold
                                text-slate-500
                            "
              >
                USER
              </th>

              <th
                className="
                                px-8
                                py-5
                                text-left
                                text-sm
                                font-bold
                                text-slate-500
                            "
              >
                EMAIL
              </th>

              <th
                className="
                                px-8
                                py-5
                                text-left
                                text-sm
                                font-bold
                                text-slate-500
                            "
              >
                ROLE
              </th>

              <th
                className="
                                px-8
                                py-5
                                text-center
                                text-sm
                                font-bold
                                text-slate-500
                            "
              >
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className="
                                    group
                                    border-b
                                    border-slate-100/80
                                    hover:bg-orange-50/40
                                    transition-all
                                    duration-300
                                "
              >
                {/* USER */}
                <td
                  className="
                                    px-8
                                    py-6
                                "
                >
                  <div
                    className="
                                        flex
                                        items-center
                                        gap-5
                                    "
                  >
                    {/* AVATAR */}
                    <div
                      className="
                                            relative
                                        "
                    >
                      <div
                        className="
                                                absolute
                                                inset-0
                                                rounded-3xl
                                                bg-orange-500
                                                blur-xl
                                                opacity-30
                                                group-hover:opacity-50
                                                transition-all
                                            "
                      ></div>

                      <div
                        className="
                                                relative
                                                w-16
                                                h-16
                                                rounded-3xl
                                                bg-gradient-to-br
                                                from-orange-400
                                                via-orange-500
                                                to-orange-600
                                                flex
                                                items-center
                                                justify-center
                                                text-white
                                                text-xl
                                                font-black
                                                shadow-lg
                                            "
                      >
                        {item.name?.charAt(0)}
                      </div>
                    </div>

                    {/* INFO */}
                    <div>
                      <h3
                        className="
                                                text-lg
                                                font-black
                                                text-slate-800
                                            "
                      >
                        {item.name}
                      </h3>

                      <p
                        className="
                                                text-slate-500
                                                font-medium
                                            "
                      >
                        @{item.username}
                      </p>
                    </div>
                  </div>
                </td>

                {/* EMAIL */}
                <td
                  className="
                                    px-8
                                    py-6
                                "
                >
                  <div
                    className="
                                        inline-flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        rounded-2xl
                                        bg-slate-50
                                        border
                                        border-slate-100
                                    "
                  >
                    <i
                      className="
                                            fas
                                            fa-envelope
                                            text-orange-500
                                        "
                    ></i>

                    <span
                      className="
                                            font-semibold
                                            text-slate-700
                                        "
                    >
                      {item.email}
                    </span>
                  </div>
                </td>

                {/* ROLE */}
                <td
                  className="
                                    px-8
                                    py-6
                                "
                >
                  <div
                    className={`
                                            inline-flex
                                            items-center
                                            gap-2
                                            px-5
                                            py-3
                                            rounded-2xl
                                            font-bold
                                            text-sm
                                            shadow-sm
                                            ${
                                              item.role === "admin"
                                                ? "bg-orange-100 text-orange-600"
                                                : "bg-blue-100 text-blue-600"
                                            }
                                        `}
                  >
                    <div
                      className={`
                                                w-2
                                                h-2
                                                rounded-full
                                                ${
                                                  item.role === "admin"
                                                    ? "bg-orange-500"
                                                    : "bg-blue-500"
                                                }
                                            `}
                    ></div>

                    {item.role === "admin" ? "Administrator" : "User"}
                  </div>
                </td>

                {/* ACTION */}
                <td
                  className="
                                    px-8
                                    py-6
                                "
                >
                  <div
                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-4
                                    "
                  >
                    <button
                      onClick={() => onEdit(item)}
                      className="
                                                group/edit
                                                w-12
                                                h-12
                                                rounded-2xl
                                                bg-blue-100
                                                hover:bg-blue-500
                                                transition-all
                                                duration-300
                                                flex
                                                items-center
                                                justify-center
                                            "
                    >
                      <i
                        className="
                                                fas
                                                fa-pen
                                                text-blue-500
                                                group-hover/edit:text-white
                                            "
                      ></i>
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="
                                                group/delete
                                                w-12
                                                h-12
                                                rounded-2xl
                                                bg-red-100
                                                hover:bg-red-500
                                                transition-all
                                                duration-300
                                                flex
                                                items-center
                                                justify-center
                                            "
                    >
                      <i
                        className="
                                                fas
                                                fa-trash
                                                text-red-500
                                                group-hover/delete:text-white
                                            "
                      ></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
