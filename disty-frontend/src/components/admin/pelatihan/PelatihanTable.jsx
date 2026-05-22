import {
    Eye,
    Pencil,
    Trash2,
    BookOpen,
} from "lucide-react";

export default function PelatihanTable({
    data = [],
    loading,
    onView,
    onEdit,
    onDelete,
}) {

    if (loading) {

        return (

            <div className="
                bg-white
                rounded-[32px]
                p-10
                text-center
                shadow-sm
            ">

                <div className="
                    animate-spin
                    w-12
                    h-12
                    border-4
                    border-orange-500
                    border-t-transparent
                    rounded-full
                    mx-auto
                " />

                <p className="
                    mt-5
                    text-slate-500
                    font-medium
                ">

                    Loading data pelatihan...

                </p>

            </div>

        );

    }

    return (

        <div className="
            bg-white
            rounded-[32px]
            overflow-hidden
            border
            border-slate-200
            shadow-sm
        ">

            {/* HEADER */}
            <div className="
                flex
                items-center
                justify-between
                px-8
                py-6
                border-b
                border-slate-100
            ">

                <div>

                    <h2 className="
                        text-3xl
                        font-black
                        text-slate-800
                    ">

                        Data Pelatihan

                    </h2>

                    <p className="
                        text-slate-500
                        mt-2
                    ">

                        Kelola seluruh data pelatihan dengan mudah

                    </p>

                </div>

                <div className="
                    px-6
                    py-3
                    rounded-2xl
                    bg-orange-100
                    text-orange-600
                    font-bold
                    flex
                    items-center
                    gap-2
                ">

                    <span className="
                        w-3
                        h-3
                        rounded-full
                        bg-orange-500
                    " />

                    Total:
                    {Array.isArray(data)
                        ? data.length
                        : 0}

                </div>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

                <table className="
                    w-full
                    min-w-[1000px]
                ">

                    <thead className="
                        bg-slate-50
                    ">

                        <tr>

                            <th className="
                                px-6
                                py-5
                                text-left
                                text-sm
                                font-bold
                                text-slate-600
                            ">

                                No

                            </th>

                            <th className="
                                px-6
                                py-5
                                text-left
                                text-sm
                                font-bold
                                text-slate-600
                            ">

                                Sampul

                            </th>

                            <th className="
                                px-6
                                py-5
                                text-left
                                text-sm
                                font-bold
                                text-slate-600
                            ">

                                Pelatihan

                            </th>

                            <th className="
                                px-6
                                py-5
                                text-left
                                text-sm
                                font-bold
                                text-slate-600
                            ">

                                Kategori

                            </th>

                            <th className="
                                px-6
                                py-5
                                text-left
                                text-sm
                                font-bold
                                text-slate-600
                            ">

                                Harga

                            </th>

                            <th className="
                                px-6
                                py-5
                                text-center
                                text-sm
                                font-bold
                                text-slate-600
                            ">

                                Aksi

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {Array.isArray(data) &&
                        data.length > 0 ? (

                            data.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            item.id
                                        }
                                        className="
                                            border-t
                                            border-slate-100
                                            hover:bg-orange-50/40
                                            transition
                                        "
                                    >

                                        {/* NO */}
                                        <td className="
                                            px-6
                                            py-6
                                            font-bold
                                            text-slate-700
                                        ">

                                            #
                                            {index + 1}

                                        </td>

                                        {/* THUMBNAIL */}
                                        <td className="
                                            px-6
                                            py-6
                                        ">

                                            <img
                                                src={
                                                    item.thumbnail_url
                                                        ? item.thumbnail_url
                                                        : "https://placehold.co/600x400?text=No+Image"
                                                }
                                                alt=""
                                                className="
                                                    w-28
                                                    h-20
                                                    rounded-2xl
                                                    object-cover
                                                    border
                                                "
                                            />

                                        </td>

                                        {/* TITLE */}
                                        <td className="
                                            px-6
                                            py-6
                                        ">

                                            <h3 className="
                                                text-lg
                                                font-bold
                                                text-slate-800
                                            ">

                                                {
                                                    item.title
                                                }

                                            </h3>

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                mt-2
                                                text-sm
                                                text-slate-500
                                            ">

                                                <BookOpen
                                                    size={
                                                        16
                                                    }
                                                />

                                                {
                                                    item.level
                                                }

                                            </div>

                                        </td>

                                        {/* KATEGORI */}
                                        <td className="
                                            px-6
                                            py-6
                                        ">

                                            <div className={`
                                                inline-flex
                                                items-center
                                                gap-2
                                                px-4
                                                py-2
                                                rounded-full
                                                text-sm
                                                font-bold
                                                ${
                                                    item.kategori ===
                                                    "gratis"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-blue-100 text-blue-600"
                                                }
                                            `}>

                                                <span className="
                                                    w-2
                                                    h-2
                                                    rounded-full
                                                    bg-current
                                                " />

                                                {
                                                    item.kategori
                                                }

                                            </div>

                                        </td>

                                        {/* HARGA */}
                                        <td className="
                                            px-6
                                            py-6
                                            font-black
                                            text-slate-800
                                        ">

                                            Rp
                                            {" "}
                                            {Number(
                                                item.harga
                                            ).toLocaleString(
                                                "id-ID"
                                            )}

                                        </td>

                                        {/* AKSI */}
                                        <td className="
                                            px-6
                                            py-6
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-3
                                            ">

                                                {/* VIEW */}
                                                <button
                                                    onClick={() =>
                                                        onView(
                                                            item
                                                        )
                                                    }
                                                    className="
                                                        w-12
                                                        h-12
                                                        rounded-2xl
                                                        bg-slate-100
                                                        hover:bg-slate-200
                                                        flex
                                                        items-center
                                                        justify-center
                                                        transition
                                                    "
                                                >

                                                    <Eye
                                                        size={
                                                            18
                                                        }
                                                    />

                                                </button>

                                                {/* EDIT */}
                                                <button
                                                    onClick={() =>
                                                        onEdit(
                                                            item
                                                        )
                                                    }
                                                    className="
                                                        w-12
                                                        h-12
                                                        rounded-2xl
                                                        bg-blue-100
                                                        hover:bg-blue-200
                                                        text-blue-600
                                                        flex
                                                        items-center
                                                        justify-center
                                                        transition
                                                    "
                                                >

                                                    <Pencil
                                                        size={
                                                            18
                                                        }
                                                    />

                                                </button>

                                                {/* DELETE */}
                                                <button
                                                    onClick={() =>
                                                        onDelete(
                                                            item
                                                        )
                                                    }
                                                    className="
                                                        w-12
                                                        h-12
                                                        rounded-2xl
                                                        bg-red-100
                                                        hover:bg-red-200
                                                        text-red-600
                                                        flex
                                                        items-center
                                                        justify-center
                                                        transition
                                                    "
                                                >

                                                    <Trash2
                                                        size={
                                                            18
                                                        }
                                                    />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="
                                        py-24
                                        text-center
                                    "
                                >

                                    <div className="
                                        w-20
                                        h-20
                                        rounded-full
                                        bg-orange-100
                                        mx-auto
                                        flex
                                        items-center
                                        justify-center
                                        text-orange-500
                                    ">

                                        <BookOpen
                                            size={
                                                40
                                            }
                                        />

                                    </div>

                                    <h3 className="
                                        mt-6
                                        text-3xl
                                        font-black
                                        text-slate-700
                                    ">

                                        Data Kosong

                                    </h3>

                                    <p className="
                                        mt-3
                                        text-slate-500
                                    ">

                                        Belum ada data pelatihan tersedia

                                    </p>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}