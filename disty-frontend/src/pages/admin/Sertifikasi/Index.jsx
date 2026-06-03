import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../layouts/AdminLayout";

import SertifikasiTable from "../../../components/admin/sertifikasi/SertifikasiTable";

import SertifikasiModal from "../../../components/admin/sertifikasi/SertifikasiModal";

import DeleteModal from "../../../components/admin/sertifikasi/DeleteModal";

import {
    getSertifikasis,
    updateSertifikasi,
    deleteSertifikasi,
} from "../../../services/SertifikasiService";

export default function IndexSertifikasi() {

    const navigate = useNavigate();

    const [sertifikasis, setSertifikasis] =
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

    const [selectedSertifikasi, setSelectedSertifikasi] =
        useState(null);

    useEffect(() => {

        fetchSertifikasis();

    }, []);

    const fetchSertifikasis =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getSertifikasis();

                setSertifikasis(
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

                await updateSertifikasi(
                    editData.id,
                    formData
                );

                await fetchSertifikasis();

                setOpenModal(false);

                setEditData(null);

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete =
        async () => {

            try {

                await deleteSertifikasi(
                    selectedSertifikasi.id
                );

                await fetchSertifikasis();

                setDeleteModal(false);

                setSelectedSertifikasi(null);

            } catch (error) {

                console.log(error);

            }

        };

    const filteredSertifikasis =
        sertifikasis.filter((item) =>
            item.nama_sertifikasi
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

                        Kelola Sertifikasi

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Manage seluruh data Sertifikasi

                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate(
                            "/admin/sertifikasi/create"
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

                    + Tambah Sertifikasi

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

                    Total Sertifikasi

                </p>

                <h2 className="
                    text-5xl
                    font-black
                    text-slate-800
                    mt-4
                ">

                    {sertifikasis.length}

                </h2>

                <p className="
                    text-sm
                    text-slate-400
                    mt-3
                ">

                    Semua data Sertifikasi

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

                    Sertifikasi Gratis

                </p>

                <h2 className="
                    text-5xl
                    font-black
                    text-slate-800
                    mt-4
                ">

                    {
                        sertifikasis.filter(
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

                    Sertifikasi tanpa biaya

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

                                Sertifikasi Berbayar

                            </p>

                            <h2 className="
                                text-5xl
                                font-black
                                text-slate-800
                                mt-4
                            ">

                                {
                                    sertifikasis.filter(
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

                                Sertifikasi premium

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
                    placeholder="Cari sertifikasi..."
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

            <SertifikasiTable
                data={filteredSertifikasis}
                loading={loading}
                onView={(item) => {

                    console.log(item.id);

                    window.location.href =
                        `/admin/sertifikasi/${item.id}`;

                }}
                
                onEdit={(item) => {

                    setEditData(item);

                    setOpenModal(true);

                }}
                onDelete={(item) => {

                    setSelectedSertifikasi(item);

                    setDeleteModal(true);

                }}
            />

            {editData && (

                <SertifikasiModal
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

                    setSelectedSertifikasi(null);

                }}
                onDelete={handleDelete}
                title={
                    selectedSertifikasi?.nama_sertifikasi
                }
            />

        </AdminLayout>

    );
}