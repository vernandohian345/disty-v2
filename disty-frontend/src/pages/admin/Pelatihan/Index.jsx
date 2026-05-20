import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../layouts/AdminLayout";

import PelatihanTable from "../../../components/admin/pelatihan/PelatihanTable";

import PelatihanModal from "../../../components/admin/pelatihan/PelatihanModal";

import DeleteModal from "../../../components/admin/pelatihan/DeleteModal";

import {
    getPelatihans,
    updatePelatihan,
    deletePelatihan,
} from "../../../services/pelatihanService";

export default function IndexPelatihan() {

    const navigate = useNavigate();

    const [pelatihans, setPelatihans] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [openModal, setOpenModal] =
        useState(false);

    const [editData, setEditData] =
        useState(null);

    const [deleteModal, setDeleteModal] =
        useState(false);

    const [selectedPelatihan, setSelectedPelatihan] =
        useState(null);

    useEffect(() => {

        fetchPelatihans();

    }, []);

    const fetchPelatihans =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getPelatihans();

                setPelatihans(
                    response.data.data.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    const handleUpdate =
        async (formData) => {

            try {

                await updatePelatihan(
                    editData.id,
                    formData
                );

                await fetchPelatihans();

                setOpenModal(false);

                setEditData(null);

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete =
        async () => {

            try {

                await deletePelatihan(
                    selectedPelatihan.id
                );

                await fetchPelatihans();

                setDeleteModal(false);

                setSelectedPelatihan(null);

            } catch (error) {

                console.log(error);

            }

        };

    const filteredPelatihans =
        pelatihans.filter((item) =>
            item.nama_pelatihan
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <AdminLayout>

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-4xl font-black">

                        Kelola Pelatihan

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Manage seluruh data pelatihan

                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate(
                            "/admin/pelatihan/create"
                        )
                    }
                    className="
                        px-6
                        py-4
                        rounded-2xl
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        font-bold
                    "
                >

                    + Tambah Pelatihan

                </button>

            </div>

            {/* STATS CARD */}
<div className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-6
    mb-6
">

    {/* TOTAL */}
    <div className="
        bg-white
        rounded-[30px]
        p-7
        shadow-sm
        border
        border-slate-100
        relative
        overflow-hidden
    ">

        <div className="
            absolute
            -right-8
            -top-8
            w-36
            h-36
            rounded-full
            bg-orange-100/50
        "></div>

        <div className="
            flex
            items-start
            justify-between
            relative
            z-10
        ">

            <div>

                <p className="
                    text-slate-500
                    font-medium
                ">

                    Total Pelatihan

                </p>

                <h2 className="
                    text-5xl
                    font-black
                    text-slate-800
                    mt-4
                ">

                    {pelatihans.length}

                </h2>

                <p className="
                    text-sm
                    text-slate-400
                    mt-3
                ">

                    Semua data pelatihan

                </p>

            </div>

            <div className="
                w-16
                h-16
                rounded-2xl
                bg-orange-100
                flex
                items-center
                justify-center
                text-orange-500
                text-2xl
            ">

                <i className="
                    fas
                    fa-book-open
                "></i>

            </div>

        </div>

    </div>

    {/* GRATIS */}
    <div className="
        bg-white
        rounded-[30px]
        p-7
        shadow-sm
        border
        border-slate-100
        relative
        overflow-hidden
    ">

        <div className="
            absolute
            -right-8
            -top-8
            w-36
            h-36
            rounded-full
            bg-green-100/50
        "></div>

        <div className="
            flex
            items-start
            justify-between
            relative
            z-10
        ">

            <div>

                <p className="
                    text-slate-500
                    font-medium
                ">

                    Pelatihan Gratis

                </p>

                <h2 className="
                    text-5xl
                    font-black
                    text-slate-800
                    mt-4
                ">

                    {
                        pelatihans.filter(
                            (item) =>
                                item.kategori ===
                                "gratis"
                        ).length
                    }

                </h2>

                <p className="
                    text-sm
                    text-slate-400
                    mt-3
                ">

                    Pelatihan tanpa biaya

                </p>

            </div>

            <div className="
                w-16
                h-16
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
                text-green-500
                text-2xl
            ">

                <i className="
                    fas
                    fa-gift
                "></i>

            </div>

        </div>

    </div>

                {/* BERBAYAR */}
                <div className="
                    bg-white
                    rounded-[30px]
                    p-7
                    shadow-sm
                    border
                    border-slate-100
                    relative
                    overflow-hidden
                ">

                    <div className="
                        absolute
                        -right-8
                        -top-8
                        w-36
                        h-36
                        rounded-full
                        bg-blue-100/50
                    "></div>

                    <div className="
                        flex
                        items-start
                        justify-between
                        relative
                        z-10
                    ">

                        <div>

                            <p className="
                                text-slate-500
                                font-medium
                            ">

                                Pelatihan Berbayar

                            </p>

                            <h2 className="
                                text-5xl
                                font-black
                                text-slate-800
                                mt-4
                            ">

                                {
                                    pelatihans.filter(
                                        (item) =>
                                            item.kategori ===
                                            "berbayar"
                                    ).length
                                }

                            </h2>

                            <p className="
                                text-sm
                                text-slate-400
                                mt-3
                            ">

                                Pelatihan premium

                            </p>

                        </div>

                        <div className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-blue-500
                            text-2xl
                        ">

                            <i className="
                                fas
                                fa-crown
                            "></i>

                        </div>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl p-5 mb-6">

                <input
                    type="text"
                    placeholder="Cari pelatihan..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                    "
                />

            </div>

            <PelatihanTable
                data={filteredPelatihans}
                loading={loading}
                onView={(item) => {
                    console.log(item);
                }}
                
                onEdit={(item) => {

                    setEditData(item);

                    setOpenModal(true);

                }}
                onDelete={(item) => {

                    setSelectedPelatihan(item);

                    setDeleteModal(true);

                }}
            />

            {editData && (

                <PelatihanModal
                    isOpen={openModal}
                    onClose={() => {

                        setOpenModal(false);

                        setEditData(null);

                    }}
                    onSubmit={handleUpdate}
                    editData={editData}
                />

            )}

            <DeleteModal
                isOpen={deleteModal}
                onClose={() => {

                    setDeleteModal(false);

                    setSelectedPelatihan(null);

                }}
                onDelete={handleDelete}
                title={
                    selectedPelatihan?.nama_pelatihan
                }
            />

        </AdminLayout>

    );
}