
import {
    Eye,
    Download,
    RefreshCcw,
    CheckCircle,
    FileBadge,
} from "lucide-react";

export default function SertifikatTable({
    loading,
    peserta,
    handleCompleted,
    handleGenerate,
    handlePreview,
    handleDownload,
    handleRegenerate,
}) {

    return (
        <div className="
            bg-white
            rounded-3xl
            shadow-sm
            overflow-hidden
        ">

            <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                    <thead className="bg-slate-50">

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
                                        className="border-t"
                                    >
                                        <td className="p-5">
                                            <div>
                                                <h5 className="font-bold">
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

                                        <td className="p-5">
                                            {
                                                item.pelatihan
                                                    ?.title || "-"
                                            }

                                        </td>

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
                                        <td className="p-5">
                                            {
                                                item.sertifikat_pelatihan
                                                    ? "Sudah Ada"
                                                    : "Belum Ada"
                                            }
                                        </td>

                                        <td className="p-5">
                                        <div className="
                                            flex
                                            flex-col
                                            gap-2
                                        ">
                                            {/* COMPLETED */}
                                            {
                                                item.status === "paid" && (

                                                    <button
                                                        onClick={() =>
                                                            handleCompleted(item.id)
                                                        }
                                                        className="
                                                            w-9
                                                            h-9
                                                            rounded-lg
                                                            bg-orange-50
                                                            hover:bg-orange-100
                                                            text-orange-600
                                                            flex
                                                            items-center
                                                            justify-center
                                                            transition-all
                                                            duration-200
                                                            shrink-0
                                                        "
                                                        title="Tandai Selesai"
                                                    >

                                                        <CheckCircle size={16} />

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
                                                            w-9
                                                            h-9
                                                            rounded-lg
                                                            bg-green-50
                                                            hover:bg-green-100
                                                            text-green-600
                                                            flex
                                                            items-center
                                                            justify-center
                                                            transition-all
                                                            duration-200
                                                            shrink-0
                                                        "
                                                        title="Generate Sertifikat"
                                                    >

                                                        <FileBadge size={16} />

                                                    </button>

                                                )
                                            }
                                            {/* SUDAH ADA */}
                                            {
                                                item.sertifikat_pelatihan && (

                                                    <>
                                                        {/* PREVIEW */}
                                                        <button
                                                            onClick={() =>
                                                                handlePreview(item)
                                                            }
                                                            className="
                                                                w-9
                                                                h-9
                                                                rounded-lg
                                                                bg-purple-50
                                                                hover:bg-purple-100
                                                                text-purple-600
                                                                flex
                                                                items-center
                                                                justify-center
                                                                transition-all
                                                                duration-200
                                                                shrink-0
                                                            "
                                                            title="Preview"
                                                        >

                                                            <Eye size={16} />

                                                        </button>

                                                        {/* DOWNLOAD */}
                                                        <button
                                                            onClick={() =>
                                                                handleDownload(item)
                                                            }
                                                            className="
                                                                w-9
                                                                h-9
                                                                rounded-lg
                                                                bg-blue-50
                                                                hover:bg-blue-100
                                                                text-blue-600
                                                                flex
                                                                items-center
                                                                justify-center
                                                                transition-all
                                                                duration-200
                                                                shrink-0
                                                            "
                                                            title="Download"
                                                        >

                                                            <Download size={16} />

                                                        </button>

                                                        {/* REGENERATE */}
                                                        <button
                                                            onClick={() =>
                                                                handleRegenerate(item.id)
                                                            }
                                                            className="
                                                                w-9
                                                                h-9
                                                                rounded-lg
                                                                bg-orange-50
                                                                hover:bg-orange-100
                                                                text-orange-600
                                                                flex
                                                                items-center
                                                                justify-center
                                                                transition-all
                                                                duration-200
                                                                shrink-0
                                                            "
                                                            title="Regenerate"
                                                        >
                                                            <RefreshCcw size={16} />

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
    );
}