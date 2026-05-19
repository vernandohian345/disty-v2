import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
    getPesertaSertifikat,
    markCompleted,
    generateSertifikat,
    downloadSertifikat,
} from "../../services/sertifikatPelatihanService";

export default function SertifikatPelatihan() {

    const [loading, setLoading] =
        useState(true);

    const [peserta, setPeserta] =
        useState([]);

    // =========================
    // FETCH DATA
    // =========================
    const fetchData = async () => {

        try {

            setLoading(true);

            const response =
                await getPesertaSertifikat();
            
            console.log(response.data);

            
            setPeserta(
                response.data.data.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    // =========================
    // MARK COMPLETED
    // =========================
    const handleCompleted =
        async (id) => {

            try {

                await markCompleted(id);

                alert(
                    "Peserta ditandai selesai"
                );

                fetchData();

            } catch (error) {

                console.log(error);

                alert(
                    error.response?.data?.message
                );

            }

        };

    // =========================
    // GENERATE
    // =========================
    const handleGenerate =
        async (id) => {

            try {

                await generateSertifikat(id);

                alert(
                    "Sertifikat berhasil dibuat"
                );

                fetchData();

            } catch (error) {

                console.log(error);

                alert(
                    error.response?.data?.message
                );

            }

        };

    // =========================
    // DOWNLOAD
    // =========================
    const handleDownload =
        async (id) => {

            try {

                const response =
                    await downloadSertifikat(id);

                const url =
                    window.URL.createObjectURL(
                        new Blob([response.data])
                    );

                const link =
                    document.createElement("a");

                link.href = url;

                link.setAttribute(
                    "download",
                    "sertifikat.pdf"
                );

                document.body.appendChild(link);

                link.click();

            } catch (error) {

                console.log(error);

                alert(
                    "Gagal download sertifikat"
                );

            }

        };

    return (

        <AdminLayout>

            {/* HEADER */}
            <div className="
                flex
                items-center
                justify-between
                mb-8
            ">

                <div>

                    <h1 className="
                        text-4xl
                        font-black
                        text-slate-800
                    ">

                        Sertifikat Pelatihan

                    </h1>

                    <p className="
                        text-slate-500
                        mt-2
                    ">

                        Generate sertifikat peserta

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h5 className="text-slate-500 text-sm">
                        Total Peserta
                    </h5>

                    <h2 className="text-3xl font-black mt-2">
                        {peserta.length}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h5 className="text-slate-500 text-sm">
                        Approved
                    </h5>

                    <h2 className="text-3xl font-black text-green-600 mt-2">
                        {
                            peserta.filter(
                                (item) =>
                                    item.status === "approved"
                            ).length
                        }
                    </h2>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h5 className="text-slate-500 text-sm">
                        Belum Selesai
                    </h5>

                    <h2 className="text-3xl font-black text-orange-500 mt-2">
                        {
                            peserta.filter(
                                (item) =>
                                    !item.is_completed
                            ).length
                        }
                    </h2>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h5 className="text-slate-500 text-sm">
                        Sudah Bersertifikat
                    </h5>

                    <h2 className="text-3xl font-black text-blue-600 mt-2">
                        {
                            peserta.filter(
                                (item) =>
                                    item.sertifikat_pelatihan
                            ).length
                        }
                    </h2>
                </div>

            </div>

            {/* TABLE */}
            <div className="
                bg-white
                rounded-3xl
                shadow-sm
                overflow-hidden
            ">

                <div className="
                    overflow-x-auto
                ">

                    <table className="w-full min-w-[1100px]">

                        <thead className="
                            bg-slate-50
                        ">

                            <tr>

                                <th className="p-5 text-left">
                                    Peserta
                                </th>

                                <th className="p-5 text-left">
                                    Pelatihan
                                </th>

                                <th className="p-5 text-left">
                                    Status
                                </th>

                                <th className="p-5 text-left">
                                    Completion
                                </th>

                                <th className="p-5 text-left">
                                    Sertifikat
                                </th>

                                <th className="p-5 text-left">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                loading ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="
                                                p-10
                                                text-center
                                            "
                                        >

                                            Loading...

                                        </td>

                                    </tr>

                                ) : peserta.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="
                                                p-10
                                                text-center
                                            "
                                        >

                                            Tidak ada peserta

                                        </td>

                                    </tr>

                                ) : (

                                    peserta.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="
                                                border-t
                                            "
                                        >

                                            {/* PESERTA */}
                                            <td className="p-5">

                                                <div>

                                                    <h5 className="
                                                        font-bold
                                                    ">

                                                        {item.nama}

                                                    </h5>

                                                    <p className="
                                                        text-sm
                                                        text-slate-500
                                                    ">

                                                        {item.email}

                                                    </p>

                                                </div>

                                            </td>

                                            {/* PELATIHAN */}
                                            <td className="p-5">

                                                {
                                                    item.pelatihan
                                                        ?.nama_pelatihan
                                                }

                                            </td>

                                            {/* STATUS */}
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

                                                    {item.status}

                                                </span>

                                            </td>

                                            {/* COMPLETION */}
                                            <td className="p-5">

                                                {
                                                    item.is_completed ? (

                                                        <span className="
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            bg-blue-100
                                                            text-blue-700
                                                            text-sm
                                                            font-bold
                                                        ">

                                                            Selesai

                                                        </span>

                                                    ) : (

                                                        <button
                                                            onClick={() =>
                                                                handleCompleted(
                                                                    item.id
                                                                )
                                                            }
                                                            className="
                                                                px-4
                                                                py-2
                                                                rounded-xl
                                                                bg-orange-500
                                                                text-white
                                                                font-bold
                                                            "
                                                        >

                                                            Tandai Selesai

                                                        </button>

                                                    )
                                                }

                                            </td>

                                            {/* SERTIFIKAT */}
                                            <td className="p-5">

                                                {
                                                    item.sertifikat_pelatihan
                                                        ? "Sudah Ada"
                                                        : "Belum Ada"
                                                }

                                            </td>

                                            {/* ACTION */}
                                            <td className="p-5 pr-10">

                                                <div className="
                                                    flex
                                                    gap-3
                                                ">

                                                    {
                                                        !item.sertifikat_pelatihan && (

                                                            <button
                                                                onClick={() =>
                                                                    handleGenerate(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="
                                                                    px-4
                                                                    py-2
                                                                    rounded-xl
                                                                    bg-green-500
                                                                    text-white
                                                                    font-bold
                                                                "
                                                            >

                                                                Generate

                                                            </button>

                                                        )
                                                    }

                                                    {
                                                        item.sertifikat_pelatihan && (

                                                            <button
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="
                                                                    px-4
                                                                    py-2
                                                                    rounded-xl
                                                                    bg-blue-500
                                                                    text-white
                                                                    font-bold
                                                                "
                                                            >

                                                                Download

                                                            </button>

                                                        )
                                                    }

                                                </div>

                                            </td>

                                        </tr>

                                    ))
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );
}