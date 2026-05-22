import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
    getPesertaSertifikat,
    markCompleted,
    generateSertifikat,
    downloadSertifikat,
    previewSertifikat,
    regenerateSertifikat,
} from "../../services/sertifikatPelatihanService";

export default function SertifikatPelatihan() {

    const [loading, setLoading] =
        useState(true);

    const [peserta, setPeserta] =
        useState([]);

    const [stats, setStats] =
    useState({});

    const [filterStatus, setFilterStatus] =
        useState("all");

    const [search, setSearch] =
        useState("");

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

            setStats(
                response.data.stats
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

            const confirmGenerate =
                window.confirm(
                    "Generate sertifikat peserta ini?"
                );

            if (!confirmGenerate) return;

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

    // =========================
    // REGENERATE
    // =========================
    const handleRegenerate = async (id) => {

        const confirmRegenerate =
            window.confirm(
                "Regenerate sertifikat?"
            );

        if (!confirmRegenerate) return;

        try {

            await regenerateSertifikat(id);

            alert("Sertifikat berhasil di-regenerate");

            fetchData();

        } catch (error) {

            console.log(error);

            alert("Gagal regenerate sertifikat");

        }

    };

    // =========================
    // PREVIEW
    // =========================
    const handlePreview =
        async (id) => {

            try {

                const response =
                    await previewSertifikat(id);

                const file =
                    new Blob(
                        [response.data],
                        {
                            type: "application/pdf",
                        }
                    );

                const fileURL =
                    URL.createObjectURL(file);

                window.open(
                    fileURL,
                    "_blank"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Gagal preview sertifikat"
                );

            }

        };

    const filteredPeserta =
    peserta.filter((item) => {

        // FILTER STATUS
        if (
            filterStatus === "approved" &&
            item.status !== "approved"
        ) {
            return false;
        }

        if (
            filterStatus === "pending" &&
            item.status !== "pending"
        ) {
            return false;
        }

        if (
            filterStatus === "completed" &&
            !item.is_completed
        ) {
            return false;
        }

        if (
            filterStatus === "not_completed" &&
            item.is_completed
        ) {
            return false;
        }

        // SEARCH NAMA
        if (
            !item.nama
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        ) {
            return false;
        }

        return true;

    });

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
            
            {/* FILTER */}
            <div className="
                flex
                flex-col
                md:flex-row
                gap-4
                mb-6
            ">

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Cari peserta..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        bg-white
                        border
                        rounded-2xl
                        px-5
                        py-3
                        w-full
                        md:w-80
                        outline-none
                    "
                />

                {/* FILTER STATUS */}
                <select
                    value={filterStatus}
                    onChange={(e) =>
                        setFilterStatus(e.target.value)
                    }
                    className="
                        bg-white
                        border
                        rounded-2xl
                        px-5
                        py-3
                        outline-none
                    "
                >

                    <option value="all">
                        Semua
                    </option>

                    <option value="approved">
                        Approved
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="completed">
                        Sudah Selesai
                    </option>

                    <option value="not_completed">
                        Belum Selesai
                    </option>

                </select>

            </div>

            {/* STATS */}
            <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
                mb-8
            ">

                {/* TOTAL */}
                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-sm
                ">

                    <p className="text-slate-500">
                        Total Peserta
                    </p>

                    <h2 className="
                        text-4xl
                        font-black
                        mt-2
                    ">
                        {stats.total_peserta || 0}
                    </h2>

                </div>

                {/* BELUM SERTIFIKAT */}
                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-sm
                ">

                    <p className="text-slate-500">
                        Belum Sertifikat
                    </p>

                    <h2 className="
                        text-4xl
                        font-black
                        mt-2
                        text-orange-500
                    ">
                        {stats.belum_sertifikat || 0}
                    </h2>

                </div>

                {/* SUDAH SERTIFIKAT */}
                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-sm
                ">

                    <p className="text-slate-500">
                        Sudah Sertifikat
                    </p>

                    <h2 className="
                        text-4xl
                        font-black
                        mt-2
                        text-green-500
                    ">
                        {stats.sudah_sertifikat || 0}
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

                                ) : filteredPeserta.length === 0 ? (

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

                                    filteredPeserta.map((item) => (

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

                                                <span
                                                    className={`
                                                        px-4
                                                        py-2
                                                        rounded-full
                                                        text-sm
                                                        font-bold
                                                        ${
                                                            item.status === "approved"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }
                                                    `}
                                                >

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

                                                        <span className="
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            bg-yellow-100
                                                            text-yellow-700
                                                            text-sm
                                                            font-bold
                                                        ">

                                                            Belum Selesai

                                                        </span>

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

                                                <div
                                                    className="
                                                        flex
                                                        flex-wrap
                                                        gap-3
                                                    "
                                                >

                                                    {/* BELUM SELESAI */}
                                                    {
                                                        !item.is_completed && (

                                                            <button
                                                                onClick={() =>
                                                                    handleCompleted(item.id)
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

                                                    {/* SUDAH SELESAI TAPI BELUM ADA SERTIFIKAT */}
                                                    {
                                                        item.is_completed &&
                                                        !item.sertifikat_pelatihan && (

                                                            <button
                                                                onClick={() =>
                                                                    handleGenerate(item.id)
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

                                                    {/* SUDAH ADA SERTIFIKAT */}
                                                    {
                                                        item.sertifikat_pelatihan && (

                                                            <>

                                                                {/* PREVIEW */}
                                                                <button
                                                                    onClick={() =>
                                                                        handlePreview(item.id)
                                                                    }
                                                                    className="
                                                                        px-4
                                                                        py-2
                                                                        rounded-xl
                                                                        bg-purple-500
                                                                        text-white
                                                                        font-bold
                                                                    "
                                                                >

                                                                    Preview

                                                                </button>

                                                                {/* DOWNLOAD */}
                                                                <button
                                                                    onClick={() =>
                                                                        handleDownload(item.id)
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

                                                                {/* REGENERATE */}
                                                                <button
                                                                    onClick={() =>
                                                                        handleRegenerate(item.id)
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

                                                                    Regenerate

                                                                </button>

                                                            </>

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