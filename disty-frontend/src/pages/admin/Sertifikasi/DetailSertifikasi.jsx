import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";

export default function DetailSertifikasi() {

    const { id } = useParams();

    const [sertifikasi, setSertifikasi] = useState(null);

    const [pesertaCount, setPesertaCount] = useState(0);
    
    useEffect(() => {
        fetchDetailSertifikasi();
    }, []);

    const fetchDetailSertifikasi = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://127.0.0.1:8000/api/sertifikasi/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSertifikasi(response.data.data);
            setPesertaCount(response.data.peserta_count);

        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    if (!sertifikasi) {
        return <div>Loading...</div>;
    }

    const isFull = pesertaCount >= sertifikasi.kuota;
    

    return (

        <AdminLayout>

            <div className="p-8">

                <div className="
                    bg-white
                    rounded-[32px]
                    shadow-sm
                    border
                    border-slate-100
                    overflow-hidden
                ">

                    {/* HEADER */}
                    <div className="
                        bg-orange-500
                        p-10
                        text-white
                    ">

                        <h1 className="
                            text-5xl
                            font-black
                        ">

                            Detail Sertifikasi

                        </h1>

                        <p className="
                            mt-3
                            text-orange-100
                        ">

                            Informasi lengkap sertifikasi

                        </p>

                    </div>

                    {/* CONTENT */}
                    <div className="p-10">

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-8
                        ">

                            {/* LEFT */}
                            <div>

                                <img
                                    src={sertifikasi.sampul_url}
                                    alt=""
                                    className="
                                        w-full
                                        h-[400px]
                                        object-cover
                                        rounded-2xl
                                        border
                                    "
                                />

                            </div>

                            {/* RIGHT */}
                            <div>

                                <h2 className="
                                    text-4xl
                                    font-black
                                    text-slate-800
                                ">

                                    {sertifikasi.nama_sertifikasi}

                                </h2>

                                <div className="
                                    mt-6
                                    space-y-4
                                ">

                                    <div className="flex items-center gap-2">

                                        <span className="font-bold">
                                            Status:
                                        </span>

                                        <span
                                            className={`
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                font-bold
                                                capitalize
                                                ${
                                                    !isFull && sertifikasi.status === "open"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >

                                            {isFull ? "full" : sertifikasi.status}

                                        </span>

                                    </div>

                                    <div>
                                        <span className="font-bold">
                                            Mode:
                                        </span>{" "}
                                        {sertifikasi.mode}
                                    </div>

                                    <div>
                                        <span className="font-bold">
                                            Kuota:
                                        </span>{" "}
                                        {pesertaCount} / {sertifikasi.kuota} Peserta
                                    </div>

                                    <div>
                                        <span className="font-bold">
                                            Tanggal:
                                        </span>{" "}
                                        {formatDate(sertifikasi.tanggal_sertifikasi)}
                                    </div>

                                    <div>
                                        <span className="font-bold">
                                            Harga:
                                        </span>{" "}

                                        {sertifikasi.harga == 0
                                            ? "Gratis"
                                            : formatRupiah(sertifikasi.harga)}
                                    </div>

                                </div>

                               <a
                                    href={sertifikasi.link_grup}
                                    target="_blank"
                                    className="
                                        inline-flex
                                        mt-8
                                        px-6
                                        py-4
                                        rounded-2xl
                                        bg-green-500
                                        hover:bg-green-600
                                        text-white
                                        font-bold
                                    "
                                >

                                    Buka Grup WhatsApp

                                </a>

                            </div>

                        </div>

                        {/* STATISTIK */}
                        <div className="
                            mt-12
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-6
                        ">

                            {/* TOTAL PESERTA */}
                            <div className="
                                bg-white
                                border
                                border-slate-200
                                rounded-2xl
                                p-6
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <div>

                                        <p className="
                                            text-slate-500
                                            text-sm
                                        ">
                                            Total Peserta
                                        </p>

                                        <h3 className="
                                            mt-2
                                            text-3xl
                                            font-black
                                            text-slate-800
                                        ">
                                            {pesertaCount || 0}
                                        </h3>

                                    </div>

                                    <div className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-orange-100
                                        flex
                                        items-center
                                        justify-center
                                        text-2xl
                                    ">

                                        👥

                                    </div>

                                </div>

                            </div>

                            {/* KUOTA TERSISA */}
                            <div className="
                                bg-white
                                border
                                border-slate-200
                                rounded-2xl
                                p-6
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <div>

                                        <p className="
                                            text-slate-500
                                            text-sm
                                        ">
                                            Kuota Tersisa
                                        </p>

                                        <h3 className="
                                            mt-2
                                            text-3xl
                                            font-black
                                            text-slate-800
                                        ">
                                            {sertifikasi.kuota - pesertaCount}
                                        </h3>

                                    </div>

                                    <div className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-blue-100
                                        flex
                                        items-center
                                        justify-center
                                        text-2xl
                                    ">

                                        🎯

                                    </div>

                                </div>

                            </div>

                            {/* STATUS */}
                            <div className="
                                bg-white
                                border
                                border-slate-200
                                rounded-2xl
                                p-6
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <div>

                                        <p className="
                                            text-slate-500
                                            text-sm
                                        ">
                                            Status Pendaftaran
                                        </p>

                                        <div className="mt-4">

                                            <span
                                                className={`
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                    text-sm
                                                    font-bold
                                                    uppercase
                                                    ${
                                                        !isFull && sertifikasi.status === "open"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }
                                                `}
                                            >

                                                {isFull ? "FULL" : sertifikasi.status}

                                            </span>

                                        </div>

                                    </div>

                                    <div className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-green-100
                                        flex
                                        items-center
                                        justify-center
                                        text-2xl
                                    ">

                                        📋

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* PESERTA */}
                        <div className="mt-14">

                            <h3 className="
                                text-2xl
                                font-black
                                mb-6
                            ">

                                Peserta Terdaftar

                            </h3>

                            <div className="
                                overflow-x-auto
                                border
                                border-slate-200
                                rounded-2xl
                            ">

                                <table className="w-full">

                                    <thead className="bg-slate-100">

                                        <tr>

                                            <th className="p-4 text-left">
                                                No
                                            </th>

                                            <th className="p-4 text-left">
                                                Nama
                                            </th>

                                            <th className="p-4 text-left">
                                                Email
                                            </th>

                                            <th className="p-4 text-left">
                                                Status
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {sertifikasi.transaksi &&
                                        sertifikasi.transaksi.length > 0 ? (

                                            sertifikasi.transaksi.map((item, index) => (

                                                <tr
                                                    key={item.id}
                                                    className="
                                                        border-t
                                                        hover:bg-slate-50
                                                        transition
                                                    "
                                                >

                                                    <td className="p-4">
                                                        {index + 1}
                                                    </td>

                                                    <td className="p-4">
                                                        {item.user?.name}
                                                    </td>

                                                    <td className="p-4">
                                                        {item.user?.email}
                                                    </td>

                                                    <td className="p-4">

                                                        <span
                                                            className={`
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                text-sm
                                                                font-bold
                                                                capitalize

                                                                ${
                                                                    item.status === "paid"
                                                                        ? "bg-green-100 text-green-700"

                                                                    : item.status === "pending"
                                                                        ? "bg-yellow-100 text-yellow-700"

                                                                    : item.status === "failed"
                                                                        ? "bg-red-100 text-red-700"

                                                                    : "bg-slate-100 text-slate-700"
                                                                }
                                                            `}
                                                        >

                                                            {item.status}

                                                        </span>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="
                                                        py-14
                                                        text-center
                                                    "
                                                >

                                                    <div className="
                                                        flex
                                                        flex-col
                                                        items-center
                                                        justify-center
                                                    ">

                                                        <div className="
                                                            w-16
                                                            h-16
                                                            rounded-full
                                                            bg-slate-100
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-3xl
                                                        ">

                                                            👥

                                                        </div>

                                                        <h4 className="
                                                            mt-4
                                                            text-lg
                                                            font-bold
                                                            text-slate-700
                                                        ">

                                                            Belum Ada Peserta

                                                        </h4>

                                                        <p className="
                                                            mt-1
                                                            text-sm
                                                            text-slate-500
                                                        ">

                                                            Peserta yang mendaftar sertifikasi akan muncul di sini

                                                        </p>

                                                    </div>

                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* DESKRIPSI */}
                        <div className="mt-10">

                            <h3 className="
                                text-2xl
                                font-black
                                mb-4
                            ">

                                Deskripsi

                            </h3>

                            <p className="
                                text-slate-600
                                leading-relaxed
                            ">

                               {sertifikasi.deskripsi}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}