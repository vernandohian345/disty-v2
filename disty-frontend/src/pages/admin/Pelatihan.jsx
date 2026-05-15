import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
    getPelatihans,
    deletePelatihan,
} from "../../services/pelatihanService";

import {
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";

export default function Pelatihan() {

    const [pelatihans, setPelatihans] = useState([]);

    useEffect(() => {
        fetchPelatihans();
    }, []);

    const fetchPelatihans = async () => {

        try {

            const response =
                await getPelatihans();

            console.log(response.data);

            setPelatihans(
                response.data.data.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            confirm("Yakin hapus pelatihan?");

        if (!confirmDelete) return;

        try {

            await deletePelatihan(id);

            fetchPelatihans();

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <AdminLayout>

            <div className="p-6">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Kelola Pelatihan
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Manage data pelatihan
                        </p>

                    </div>

                    <button
                        className="
                            flex
                            items-center
                            gap-2
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            transition
                        "
                    >

                        <Plus size={18} />

                        Tambah Pelatihan

                    </button>

                </div>

                {/* TABLE */}
                <div
                    className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        border-slate-200
                        overflow-hidden
                    "
                >

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead
                                className="
                                    bg-slate-100
                                    text-slate-700
                                "
                            >

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        No
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Sampul
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Nama Pelatihan
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Kategori
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Harga
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Durasi
                                    </th>

                                    <th className="text-center px-6 py-4">
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {pelatihans.length > 0 ? (

                                    pelatihans.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <tr
                                                key={item.id}
                                                className="
                                                    border-t
                                                    hover:bg-slate-50
                                                "
                                            >

                                                <td className="px-6 py-4">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <img
                                                        src={`http://127.0.0.1:8000/uploads/pelatihan/${item.sampul}`}
                                                        alt=""
                                                        className="
                                                            w-20
                                                            h-14
                                                            object-cover
                                                            rounded-lg
                                                        "
                                                    />

                                                </td>

                                                <td className="px-6 py-4 font-medium">
                                                    {item.nama_pelatihan}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {item.kategori}
                                                </td>

                                                <td className="px-6 py-4">

                                                    Rp.
                                                    {item.harga}

                                                </td>

                                                <td className="px-6 py-4">
                                                    {item.durasi}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center justify-center gap-3">

                                                        {/* EDIT */}
                                                        <button
                                                            className="
                                                                w-10
                                                                h-10
                                                                rounded-lg
                                                                bg-yellow-100
                                                                text-yellow-600
                                                                hover:bg-yellow-200
                                                                flex
                                                                items-center
                                                                justify-center
                                                            "
                                                        >

                                                            <Pencil size={18} />

                                                        </button>

                                                        {/* DELETE */}
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            className="
                                                                w-10
                                                                h-10
                                                                rounded-lg
                                                                bg-red-100
                                                                text-red-600
                                                                hover:bg-red-200
                                                                flex
                                                                items-center
                                                                justify-center
                                                            "
                                                        >

                                                            <Trash2 size={18} />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="
                                                text-center
                                                py-10
                                                text-slate-500
                                            "
                                        >

                                            Data pelatihan kosong

                                        </td>

                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}