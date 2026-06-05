import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import AdminLayout from "../../../layouts/AdminLayout";

import axios from "axios";

export default function ShowSertifikasi() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [sertifikasi, setSertifikasi] = useState(null);

    const formatTanggal = (tanggal) => {

        return new Date(tanggal).toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

    };

    useEffect(() => {

        fetchDetail();

    }, []);

    const fetchDetail = async () => {

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

        } catch (error) {

            console.log(error);

        }

    };

    if (!sertifikasi) {

        return (
            <AdminLayout>
                <div className="p-10">
                    Loading...
                </div>
            </AdminLayout>
        );

    }

    return (
        <AdminLayout>

            <div className="space-y-8">

                {/* HEADER */}
                <div className="
                    bg-white
                    rounded-[32px]
                    overflow-hidden
                    shadow-sm
                    border
                    border-slate-100
                ">

                    {/* COVER */}
                    <div className="relative">

                        <img
                            src={`http://127.0.0.1:8000/uploads/sertifikasi/${sertifikasi.sampul}`}
                            alt=""
                            className="
                                w-full
                                h-[350px]
                                object-cover
                            "
                        />

                        <div className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/70
                            to-black/10
                        "></div>

                        {/* BUTTON KEMBALI */}
                        <div className="
                            absolute
                            top-6
                            right-6
                            z-20
                        ">

                            <button
                                onClick={() => navigate("/admin/sertifikasi")}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    px-7
                                    py-4
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-orange-500
                                    to-orange-400
                                    text-white
                                    font-bold
                                    text-lg
                                    shadow-2xl
                                    shadow-orange-500/30
                                    hover:scale-105
                                    hover:shadow-orange-500/50
                                    transition-all
                                    duration-300
                                    border
                                    border-white/10
                                "
                            >

                                <i className="
                                    fas
                                    fa-arrow-left
                                    group-hover:-translate-x-1
                                    transition
                                "></i>

                                Kembali

                            </button>

                        </div>

                        {/* CONTENT */}
                        <div className="
                            absolute
                            bottom-0
                            left-0
                            p-10
                            text-white
                        ">

                            <span className={`
                                inline-flex
                                items-center
                                gap-2
                                px-5
                                py-2
                                rounded-full
                                text-sm
                                font-bold
                                tracking-widest
                                mb-5
                                ${
                                    sertifikasi.kategori === "gratis"
                                        ? "bg-green-500"
                                        : "bg-orange-500"
                                }
                            `}>

                                {sertifikasi.kategori.toUpperCase()}

                            </span>

                            <h1 className="
                                text-5xl
                                font-black
                                mb-4
                            ">

                                {sertifikasi.nama_sertifikasi}

                            </h1>

                            <div className="
                                flex
                                flex-wrap
                                items-center
                                gap-6
                                text-lg
                            ">

                                <div className="flex items-center gap-2">
                                    <i className="fas fa-building"></i>
                                    {sertifikasi.penyelenggara}
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="fas fa-laptop"></i>
                                    {sertifikasi.metode}
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {sertifikasi.lokasi}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                
                {/* INFO GRID */}
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                ">

                    {/* HARGA */}
                    <div className="
                        relative
                        overflow-hidden
                        rounded-[30px]
                        p-7
                        bg-gradient-to-br
                        from-orange-500
                        to-orange-400
                        text-white
                        shadow-xl
                    ">

                        <div className="
                            absolute
                            top-0
                            right-0
                            w-32
                            h-32
                            bg-white/10
                            rounded-full
                            -translate-y-10
                            translate-x-10
                        "></div>

                        <div className="
                            flex
                            items-center
                            justify-center
                            w-14
                            h-14
                            rounded-2xl
                            bg-white/20
                            mb-5
                        ">

                            <i className="
                                fas
                                fa-wallet
                                text-2xl
                            "></i>

                        </div>

                        <p className="
                            text-center
                            font-semibold
                            text-orange-100
                            mb-3
                        ">
                            Harga
                        </p>

                        <h2 className="
                            text-3xl
                            font-black
                            text-center
                        ">
                            Rp {Number(
                                sertifikasi.harga
                            ).toLocaleString("id-ID")}
                        </h2>

                    </div>

                    {/* TANGGAL */}
                    <div className="
                        relative
                        overflow-hidden
                        rounded-[30px]
                        p-7
                        bg-gradient-to-br
                        from-blue-500
                        to-sky-400
                        text-white
                        shadow-xl
                    ">

                        <div className="
                            absolute
                            top-0
                            right-0
                            w-32
                            h-32
                            bg-white/10
                            rounded-full
                            -translate-y-10
                            translate-x-10
                        "></div>

                        <div className="
                            flex
                            items-center
                            justify-center
                            w-14
                            h-14
                            rounded-2xl
                            bg-white/20
                            mb-5
                        ">

                            <i className="
                                fas
                                fa-calendar-alt
                                text-2xl
                            "></i>

                        </div>

                        <p className="
                            text-center
                            font-semibold
                            text-blue-100
                            mb-3
                        ">
                            Tanggal Sertifikasi
                        </p>

                        <h2 className="
                            text-2xl
                            font-black
                            text-center
                            leading-snug
                        ">
                            {
                                formatTanggal(
                                    sertifikasi.tanggal_sertifikasi
                                )
                            }
                        </h2>

                    </div>

                    {/* DEADLINE */}
                    <div className="
                        relative
                        overflow-hidden
                        rounded-[30px]
                        p-7
                        bg-gradient-to-br
                        from-red-500
                        to-pink-400
                        text-white
                        shadow-xl
                    ">

                        <div className="
                            absolute
                            top-0
                            right-0
                            w-32
                            h-32
                            bg-white/10
                            rounded-full
                            -translate-y-10
                            translate-x-10
                        "></div>

                        <div className="
                            flex
                            items-center
                            justify-center
                            w-14
                            h-14
                            rounded-2xl
                            bg-white/20
                            mb-5
                        ">

                            <i className="
                                fas
                                fa-clock
                                text-2xl
                            "></i>

                        </div>

                        <p className="
                            text-center
                            font-semibold
                            text-red-100
                            mb-3
                        ">
                            Deadline
                        </p>

                        <h2 className="
                            text-2xl
                            font-black
                            text-center
                            leading-snug
                        ">
                            {
                                formatTanggal(
                                    sertifikasi.deadline_pendaftaran
                                )
                            }
                        </h2>

                    </div>

                    {/* PESERTA */}
                    <div className="
                        relative
                        overflow-hidden
                        rounded-[30px]
                        p-7
                        bg-gradient-to-br
                        from-emerald-500
                        to-green-400
                        text-white
                        shadow-xl
                    ">

                        <div className="
                            absolute
                            top-0
                            right-0
                            w-32
                            h-32
                            bg-white/10
                            rounded-full
                            -translate-y-10
                            translate-x-10
                        "></div>

                        <div className="
                            flex
                            items-center
                            justify-center
                            w-14
                            h-14
                            rounded-2xl
                            bg-white/20
                            mb-5
                        ">

                            <i className="
                                fas
                                fa-users
                                text-2xl
                            "></i>

                        </div>

                        <p className="
                            text-center
                            font-semibold
                            text-green-100
                            mb-3
                        ">
                            Total Peserta
                        </p>

                        <h2 className="
                            text-4xl
                            font-black
                            text-center
                        ">
                            {sertifikasi?.peserta?.length || 0}
                        </h2>

                    </div>

                </div>


                {/* DESKRIPSI */}
                <div className="
                    bg-white
                    rounded-[32px]
                    p-10
                    shadow-sm
                    border
                    border-slate-100
                ">

                    <h2 className="
                        text-3xl
                        font-black
                        mb-6
                    ">

                        Deskripsi Sertifikasi

                    </h2>

                    <div className="
                        text-slate-700
                        leading-[2.3]
                        text-lg
                        whitespace-pre-line
                        break-words
                        text-justify
                    ">

                        {sertifikasi.deskripsi}

                    </div>

                </div>

                {/* LINK GROUP */}
                <div className="
                    bg-gradient-to-r
                    from-green-500
                    to-green-400
                    rounded-[32px]
                    p-10
                    text-white
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    justify-between
                    gap-6
                ">

                    <div>

                        <h2 className="
                            text-3xl
                            font-black
                            mb-3
                        ">
                            Grup Sertifikasi
                        </h2>

                    </div>

                    <a
                        href={sertifikasi.link_grup}
                        target="_blank"
                        className="
                            px-8
                            py-4
                            rounded-2xl
                            bg-white
                            text-green-600
                            font-bold
                            shadow-lg
                        "
                    >
                        Lihat Grup WhatsApp
                    </a>

                </div>

                {/* DATA PESERTA */}
                <div className="
                    bg-white
                    rounded-[32px]
                    shadow-sm
                    border
                    border-slate-100
                    overflow-hidden
                ">

                    <div className="
                        p-8
                        border-b
                        border-slate-100
                    ">

                        <h2 className="
                            text-3xl
                            font-black
                        ">
                            Peserta Sertifikasi
                        </h2>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="p-5 text-left">
                                        Nama
                                    </th>

                                    <th className="p-5 text-left">
                                        Email
                                    </th>

                                    <th className="p-5 text-left">
                                        No Handphone
                                    </th>

                                    <th className="p-5 text-left">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    sertifikasi.peserta?.length > 0 ? (

                                        sertifikasi.peserta.map((peserta) => (

                                            <tr
                                                key={peserta.id}
                                                className="
                                                    border-b
                                                    border-slate-100
                                                "
                                            >

                                                <td className="p-5">
                                                    {peserta.user?.name}
                                                </td>

                                                <td className="p-5">
                                                    {peserta.user?.email}
                                                </td>

                                                <td className="p-5">

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-slate-700
                                                        font-medium
                                                    ">

                                                        <i className="
                                                            fas
                                                            fa-phone-alt
                                                            text-green-500
                                                        "></i>

                                                        {
                                                            peserta.user?.no_hp ||
                                                            peserta.user?.phone ||
                                                            "-"
                                                        }

                                                    </div>

                                                </td>

                                                <td className="p-5">

                                                    <span className="
                                                        px-4
                                                        py-2
                                                        rounded-full
                                                        bg-green-100
                                                        text-green-700
                                                        text-sm
                                                        font-bold
                                                    ">

                                                        Lunas

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="
                                                    text-center
                                                    p-10
                                                    text-slate-500
                                                "
                                            >

                                                Belum ada peserta mendaftar

                                            </td>

                                        </tr>

                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );

}

