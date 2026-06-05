import { useNavigate } from "react-router-dom";

export default function SertifikasiTable({
    data,
    loading,
    onView,
    onEdit,
    onDelete,
}) {

    const navigate = useNavigate();

    if (loading) {

        return (

            <div className="
                bg-white
                rounded-[32px]
                p-14
                text-center
                shadow-sm
                border
                border-slate-100
            ">

                <div className="
                    animate-spin
                    w-14
                    h-14
                    border-4
                    border-orange-200
                    border-t-orange-500
                    rounded-full
                    mx-auto
                    mb-5
                "></div>

                <p className="
                    text-slate-500
                    font-medium
                ">

                    Memuat data Sertifikasi...

                </p>

            </div>

        );

    }

    return (

        <div className="
            bg-white
            rounded-[32px]
            border
            border-slate-100
            shadow-sm
            overflow-hidden
        ">

            {/* HEADER */}
            <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
                p-7
                border-b
                border-slate-100
            ">

                <div>

                    <h2 className="
                        text-3xl
                        font-black
                        text-slate-800
                    ">

                        Data Sertifikasi

                    </h2>

                    <p className="
                        text-slate-500
                        mt-2
                    ">

                        Kelola seluruh data Sertifikasi dengan mudah

                    </p>

                </div>

                {/* TOTAL */}
                <div className="
                    flex
                    items-center
                    gap-3
                    px-5
                    py-3
                    rounded-2xl
                    bg-orange-100
                    text-orange-600
                    font-bold
                    w-fit
                ">

                    <div className="
                        w-3
                        h-3
                        rounded-full
                        bg-orange-500
                        animate-pulse
                    "></div>

                    Total: {data.length}

                </div>

            </div>

            {/* TABLE HEADER */}
            <div className="
                hidden
                lg:grid
                grid-cols-12
                gap-4
                px-7
                py-5
                bg-slate-50
                border-b
                border-slate-100
                text-sm
                font-bold
                text-slate-500
            ">

                <div className="col-span-1">
                    No
                </div>

                <div className="col-span-2">
                    Sampul
                </div>

                <div className="col-span-3">
                    Nama Sertifikasi
                </div>

                <div className="col-span-2">
                    Kategori
                </div>

                <div className="col-span-2">
                    Harga
                </div>

                <div className="col-span-2 text-center">
                    Aksi
                </div>

            </div>

            {/* EMPTY */}
            {data.length === 0 ? (

                <div className="
                    p-20
                    text-center
                ">

                    <div className="
                        w-28
                        h-28
                        rounded-full
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                        mx-auto
                        mb-6
                    ">

                        <i className="
                            fas
                            fa-book-open
                            text-5xl
                            text-orange-500
                        "></i>

                    </div>

                    <h3 className="
                        text-3xl
                        font-black
                        text-slate-700
                    ">

                        Data Kosong

                    </h3>

                    <p className="
                        text-slate-500
                        mt-3
                    ">

                        Belum ada data Sertifikasi tersedia

                    </p>

                </div>

            ) : (

                data.map((item, index) => (

                    <div
                        key={item.id}
                        className="
                            grid
                            grid-cols-1
                            lg:grid-cols-12
                            gap-5
                            p-7
                            border-b
                            border-slate-100
                            hover:bg-orange-50/40
                            transition
                            items-center
                        "
                    >

                        {/* NO */}
                        <div className="
                            lg:col-span-1
                            text-slate-500
                            font-bold
                        ">

                            #{index + 1}

                        </div>

                        {/* IMAGE */}
                        <div className="
                            lg:col-span-2
                        ">

                            <img
                                src={
                                    item.sampul
                                        ? `http://127.0.0.1:8000/uploads/sertifikasi/${item.sampul}`
                                        : "https://placehold.co/600x400?text=No+Image"
                                }
                                alt=""
                                className="
                                    w-full
                                    lg:w-32
                                    h-24
                                    rounded-2xl
                                    object-cover
                                    shadow-sm
                                    border
                                    border-slate-100
                                "
                            />

                        </div>

                        {/* NAMA */}
                        <div className="
                            lg:col-span-3
                        ">

                            <h3 className="
                                text-lg
                                font-black
                                text-slate-800
                            ">

                                {
                                    item.nama_sertifikasi
                                }

                            </h3>

                            <div className="
                                flex
                                items-center
                                gap-3
                                mt-2
                                flex-wrap
                            ">

                                <span className="
                                    text-sm
                                    text-slate-500
                                ">

                                    {item.metode}

                                </span>

                                <span className="
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    bg-slate-300
                                "></span>

                                <span className="
                                    text-sm
                                    text-slate-500
                                ">

                                    {item.lokasi}

                                </span>

                            </div>

                        </div>

                        {/* KATEGORI */}
                        <div className="
                            lg:col-span-2
                        ">

                            <span
                                className={`
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
                                            ? "bg-green-100 text-green-700"
                                            : "bg-orange-100 text-orange-700"
                                    }
                                `}
                            >

                                <div className={`
                                    w-2
                                    h-2
                                    rounded-full
                                    ${
                                        item.kategori ===
                                        "gratis"
                                            ? "bg-green-500"
                                            : "bg-orange-500"
                                    }
                                `}></div>

                                {
                                    item.kategori
                                }

                            </span>

                        </div>

                        {/* HARGA */}
                        <div className="
                            lg:col-span-2
                        ">

                            <h4 className="
                                text-lg
                                font-black
                                text-slate-700
                            ">

                                Rp{" "}
                                {Number(
                                    item.harga
                                ).toLocaleString(
                                    "id-ID"
                                )}

                            </h4>

                        </div>

                        {/* AKSI */}
                        <div className="
                            lg:col-span-2
                            flex
                            items-center
                            lg:justify-center
                            gap-3
                            flex-wrap
                        ">

                            {/* VIEW */}
                            <button
                                onClick={() =>
                                    navigate(`/admin/sertifikasi/${item.id}`)
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
                                    text-slate-600
                                    transition
                                "
                            >

                                <i className="fas fa-eye"></i>

                            </button>

                            {/* EDIT */}
                            <button
                                onClick={() =>
                                    onEdit(item)
                                }
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    w-11
                                    h-11
                                    rounded-2xl
                                    bg-blue-100
                                    hover:bg-blue-500
                                    hover:text-white
                                    text-blue-600
                                    transition
                                    shadow-sm
                                "
                            >

                                <i className="
                                    fas
                                    fa-pen
                                "></i>

                            </button>

                            {/* DELETE */}
                            <button
                                onClick={() =>
                                    onDelete(item)
                                }
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    w-11
                                    h-11
                                    rounded-2xl
                                    bg-red-100
                                    hover:bg-red-500
                                    hover:text-white
                                    text-red-600
                                    transition
                                    shadow-sm
                                "
                            >

                                <i className="
                                    fas
                                    fa-trash
                                "></i>

                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );
}