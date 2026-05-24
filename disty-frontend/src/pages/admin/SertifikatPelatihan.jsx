import {
    useEffect,
    useState,
    useRef
} from "react";

import AdminLayout from "../../layouts/AdminLayout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import SertifikatTemplate from "../../components/admin/sertifikat/SertifikatTemplate";
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
    
    const sertifikatRef = useRef();

    const [previewData, setPreviewData] =
        useState(null);

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
        async (item) => {

            try {

                setPreviewData(item);

                setTimeout(async () => {

                    const canvas =
                        await html2canvas(
                            sertifikatRef.current,
                            {
                                scale: 3,
                                useCORS: true,
                            }
                        );

                    const imgData =
                        canvas.toDataURL(
                            "image/png"
                        );

                    const pdf =
                        new jsPDF({
                            orientation: "landscape",
                            unit: "px",
                            format: [
                                1600,
                                1131
                            ],
                        });

                    pdf.addImage(
                        imgData,
                        "PNG",
                        0,
                        0,
                        1600,
                        1131
                    );

                    pdf.save(
                        "sertifikat-pelatihan.pdf"
                    );

                }, 300);

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
        const handleRegenerate =
        async (id) => {
            const confirmRegenerate =
                window.confirm(
                    "Regenerate sertifikat?"
                );
            if (!confirmRegenerate) return;

            try {
                await regenerateSertifikat(id);
                alert(
                    "Sertifikat berhasil di-regenerate"
                );
                fetchData();
            } catch (error) {
                console.log(error);
                alert(
                    "Gagal regenerate sertifikat"
                );
            }
    };

    // =========================
    // PREVIEW
    // =========================
   const handlePreview = (item) => {
    setPreviewData(item);

};

    // =========================
    // FILTER
    // =========================
    const filteredPeserta =
        peserta.filter((item) => {

            // FILTER STATUS
            if (
                filterStatus === "paid" &&
                item.status !== "paid"
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
                item.status !== "completed"
            ) {
                return false;
            }

            if (
                filterStatus === "not_completed" &&
                item.status === "completed"
            ) {
                return false;
            }

            // SEARCH
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

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                {/* TOTAL */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <h5 className="text-slate-500 text-sm">
                        Total Peserta
                    </h5>

                    <h2 className="text-3xl font-black mt-2">
                        {peserta.length}
                    </h2>

                </div>

                {/* PAID */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <h5 className="text-slate-500 text-sm">
                        Paid
                    </h5>

                    <h2 className="text-3xl font-black text-green-600 mt-2">

                        {
                            peserta.filter(
                                (item) =>
                                    item.status === "paid"
                            ).length
                        }

                    </h2>

                </div>

                {/* BELUM SELESAI */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <h5 className="text-slate-500 text-sm">
                        Belum Selesai
                    </h5>

                    <h2 className="text-3xl font-black text-orange-500 mt-2">

                        {
                            peserta.filter(
                                (item) =>
                                    item.status !== "completed"
                            ).length
                        }

                    </h2>

                </div>

                {/* SUDAH SERTIFIKAT */}
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

                {/* FILTER */}
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

                    <option value="paid">
                        Paid
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
                                                            item.status === "paid"
                                                                ? "bg-green-100 text-green-700"
                                                                : item.status === "completed"
                                                                ? "bg-blue-100 text-blue-700"
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
                                                    item.status === "completed" ? (

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

                                                    {/* TANDAI SELESAI */}
                                                    {
                                                        item.status === "paid" && (

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

                                                    {/* GENERATE */}
                                                    {
                                                        item.status === "completed" &&
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
                                                                        handlePreview(item)
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
                                                                        handleDownload(item)
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
        {/* PREVIEW MODAL */}
        {
            previewData && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        bg-black/70
                        flex
                        items-center
                        justify-center
                        p-5
                    "
                >
                    <div
                        className="
                            bg-white
                            rounded-2xl
                            overflow-auto
                            max-w-[95vw]
                            max-h-[95vh]
                            p-5
                        "
                    >
                        {/* TEMPLATE */}
                        <SertifikatTemplate
                            ref={sertifikatRef}
                            data={previewData}
                        />
                        {/* BUTTON */}
                        <div
                            className="
                                flex
                                justify-end
                                gap-3
                                mt-5
                            "
                        >
                            {/* CLOSE */}
                            <button
                                onClick={() =>
                                    setPreviewData(null)
                                }
                                className="
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-slate-500
                                    text-white
                                    font-bold
                                "
                            >
                                Tutup
                            </button>

                            {/* DOWNLOAD */}
                            <button
                                onClick={() =>
                                    handleDownload(previewData)
                                }
                                className="
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-blue-600
                                    text-white
                                    font-bold
                                "
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )
        }                        
            </div>
                {/* HIDDEN TEMPLATE */}
                <div className="fixed -left-[9999px] top-0">

                    {
                        previewData && (

                            <SertifikatTemplate
                                ref={sertifikatRef}
                                data={previewData}
                            />

                        )
                    }

                </div>
        </AdminLayout>

    );
}