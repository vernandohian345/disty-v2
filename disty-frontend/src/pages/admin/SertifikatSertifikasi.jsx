import {
    useEffect,
    useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import api from "../../api/axios";

export default function SertifikatSertifikasi() {

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
            await api.get(
                "/sertifikat-sertifikasi"
            );

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

    const handleDownloadBnsp = (id) => {

        window.open(
            `http://127.0.0.1:8000/api/sertifikat-sertifikasi/download-bnsp/${id}`,
            "_blank"
        );

    };

    const filteredPeserta = peserta.filter(
        (item) => {

            // SEARCH
            if (
                !item.user?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            ) {
                return false;
            }

            // FILTER
            if (
                filterStatus === "sudah_upload" &&
                !item.sertifikat_bnsp
            ) {
                return false;
            }

            if (
                filterStatus === "belum_upload" &&
                item.sertifikat_bnsp
            ) {
                return false;
            }

            return true;
        }
    );

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

                        Sertifikat BNSP

                    </h1>

                    <p className="
                        text-slate-500
                        mt-2
                    ">

                        Kelola upload sertifikat BNSP peserta

                    </p>

                </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                {/* TOTAL */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <h5 className="text-slate-500 text-sm">
                        Total Peserta
                    </h5>

                    <h2 className="text-3xl font-black mt-2">
                        {stats.total_peserta}
                    </h2>

                </div>

                {/* Belum UPLOAD */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <h5 className="text-slate-500 text-sm">
                        Belum Upload BNSP
                    </h5>

                    <h2 className="text-3xl font-black text-orange-500 mt-2">
                        {stats.belum_sertifikat_bnsp}
                    </h2>

                </div>

                {/* Sudah UPLOAD */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">

                    <h5 className="text-slate-500 text-sm">
                        Sudah Upload BNSP
                    </h5>

                    <h2 className="text-3xl font-black text-green-600 mt-2">
                        {stats.sudah_sertifikat_bnsp}
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

                    <option value="sudah_upload">
                        Sudah Upload
                    </option>

                    <option value="belum_upload">
                        Belum Upload
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
                                    Sertifikasi
                                </th>

                                <th className="p-5 text-left">
                                    Status
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
                                                        {item.user?.name}
                                                    </h5>

                                                    <p className="
                                                        text-sm
                                                        text-slate-500
                                                    ">
                                                        {item.user?.email}
                                                    </p>

                                                </div>

                                            </td>

                                            {/* SERTIFIKASI */}
                                            <td className="p-5">

                                                {
                                                    item.sertifikasi
                                                        ?.nama_sertifikasi
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

                                            {/* SERTIFIKAT */}
                                            <td className="p-5">

                                                {
                                                    item.sertifikat_bnsp
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

                                                    {
                                                        item.sertifikat_bnsp && (

                                                            <button
                                                                onClick={() =>
                                                                    handleDownloadBnsp(item.id)
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