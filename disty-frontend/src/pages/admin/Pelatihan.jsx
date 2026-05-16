// src/pages/admin/Pelatihan.jsx

import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import PelatihanModal from "../../components/admin/pelatihan/PelatihanModal";

import DeleteModal from "../../components/admin/pelatihan/DeleteModal";

import {
    getPelatihans,
    createPelatihan,
    updatePelatihan,
    deletePelatihan,
} from "../../services/pelatihanService";

export default function Pelatihan() {

    // =========================
    // STATE
    // =========================
    const [pelatihans, setPelatihans] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    // MODAL CREATE & EDIT
    const [openModal, setOpenModal] =
        useState(false);

    const [editData, setEditData] =
        useState(null);

    // MODAL DELETE
    const [deleteModal, setDeleteModal] =
        useState(false);

    const [selectedPelatihan, setSelectedPelatihan] =
        useState(null);

    // =========================
    // FETCH DATA
    // =========================
    useEffect(() => {

        fetchPelatihans();

    }, []);

    const fetchPelatihans =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getPelatihans();

                console.log(
                    response.data
                );

                setPelatihans(
                    response.data.data.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    // =========================
    // CREATE
    // =========================
    const handleCreate =
        async (formData) => {

            try {

                const response =
                    await createPelatihan(
                        formData
                    );

                console.log(
                    response.data
                );

                await fetchPelatihans();

                setOpenModal(false);

            } catch (error) {

                console.log(error);

                alert(
                    "Gagal menambahkan pelatihan"
                );

            }

        };

    // =========================
    // UPDATE
    // =========================
    const handleUpdate =
        async (formData) => {

            try {

                const response =
                    await updatePelatihan(
                        editData.id,
                        formData
                    );

                console.log(
                    response.data
                );

                await fetchPelatihans();

                setOpenModal(false);

                setEditData(null);

            } catch (error) {

                console.log(error);

                alert(
                    "Gagal update pelatihan"
                );

            }

        };

    // =========================
    // DELETE
    // =========================
    const handleDelete =
        async () => {

            try {

                const response =
                    await deletePelatihan(
                        selectedPelatihan.id
                    );

                console.log(
                    response.data
                );

                await fetchPelatihans();

                setDeleteModal(false);

                setSelectedPelatihan(null);

            } catch (error) {

                console.log(error);

                alert(
                    "Gagal menghapus pelatihan"
                );

            }

        };

    // =========================
    // SEARCH
    // =========================
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

            {/* HEADER */}
            <div
                className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-5
                    mb-8
                "
            >

                <div>

                    <h1
                        className="
                            text-4xl
                            font-black
                            text-slate-800
                        "
                    >

                        Kelola Pelatihan

                    </h1>

                    <p
                        className="
                            text-slate-500
                            mt-2
                        "
                    >

                        Manage seluruh data pelatihan

                    </p>

                </div>

                {/* BUTTON TAMBAH */}
                <button
                    onClick={() => {

                        setEditData(null);

                        setOpenModal(true);

                    }}
                    className="
                        px-6
                        py-4
                        rounded-2xl
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        font-bold
                        shadow-lg
                        shadow-orange-200
                        transition
                    "
                >

                    + Tambah Pelatihan

                </button>

            </div>

            {/* SEARCH */}
            <div
                className="
                    bg-white
                    rounded-3xl
                    p-5
                    shadow-sm
                    border
                    border-slate-100
                    mb-6
                "
            >

                <div className="relative">

                    <i
                        className="
                            fas fa-search
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    ></i>

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
                            pl-12
                            pr-4
                            py-4
                            rounded-2xl
                            border
                            border-slate-200
                            focus:outline-none
                            focus:ring-4
                            focus:ring-orange-200
                        "
                    />

                </div>

            </div>

            {/* TABLE */}
            <div
                className="
                    bg-white
                    rounded-[35px]
                    shadow-sm
                    overflow-hidden
                    border
                    border-slate-100
                "
            >

                {/* HEADER TABLE */}
                <div
                    className="
                        grid
                        grid-cols-7
                        gap-4
                        p-5
                        bg-slate-50
                        border-b
                        font-bold
                        text-slate-700
                    "
                >

                    <div>No</div>

                    <div>Sampul</div>

                    <div>Pelatihan</div>

                    <div>Kategori</div>

                    <div>Harga</div>

                    <div>Durasi</div>

                    <div className="text-center">
                        Aksi
                    </div>

                </div>

                {/* LOADING */}
                {loading ? (

                    <div
                        className="
                            p-10
                            text-center
                            text-slate-500
                        "
                    >

                        Loading...

                    </div>

                ) : filteredPelatihans.length === 0 ? (

                    <div
                        className="
                            p-16
                            text-center
                        "
                    >

                        <div
                            className="
                                w-24
                                h-24
                                rounded-full
                                bg-orange-100
                                flex
                                items-center
                                justify-center
                                mx-auto
                                mb-5
                            "
                        >

                            <i
                                className="
                                    fas fa-book
                                    text-3xl
                                    text-orange-500
                                "
                            ></i>

                        </div>

                        <h3
                            className="
                                text-2xl
                                font-black
                                text-slate-700
                            "
                        >

                            Data Tidak Ada

                        </h3>

                    </div>

                ) : (

                    filteredPelatihans.map(
                        (item, index) => (

                            <div
                                key={item.id}
                                className="
                                    grid
                                    grid-cols-7
                                    gap-4
                                    p-5
                                    items-center
                                    border-b
                                    hover:bg-slate-50
                                    transition
                                "
                            >

                                {/* NO */}
                                <div>

                                    {index + 1}

                                </div>

                                {/* IMAGE */}
                                <div>

                                    <img
                                        src={
                                            item.sampul
                                                ? `http://127.0.0.1:8000/uploads/pelatihan/${item.sampul}`
                                                : "https://placehold.co/300x200?text=No+Image"
                                        }
                                        alt=""
                                        className="
                                            w-20
                                            h-16
                                            rounded-2xl
                                            object-cover
                                        "
                                    />

                                </div>

                                {/* NAMA */}
                                <div>

                                    <h3
                                        className="
                                            font-bold
                                            text-slate-800
                                        "
                                    >

                                        {
                                            item.nama_pelatihan
                                        }

                                    </h3>

                                    <p
                                        className="
                                            text-sm
                                            text-slate-500
                                            mt-1
                                        "
                                    >

                                        {
                                            item.bahasa
                                        }

                                    </p>

                                </div>

                                {/* KATEGORI */}
                                <div>

                                    <span
                                        className={`
                                            px-4
                                            py-2
                                            rounded-full
                                            text-xs
                                            font-bold
                                            ${
                                                item.kategori ===
                                                "gratis"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"
                                            }
                                        `}
                                    >

                                        {
                                            item.kategori
                                        }

                                    </span>

                                </div>

                                {/* HARGA */}
                                <div>

                                    Rp{" "}
                                    {Number(
                                        item.harga
                                    ).toLocaleString(
                                        "id-ID"
                                    )}

                                </div>

                                {/* DURASI */}
                                <div>

                                    {
                                        item.durasi
                                    }

                                </div>

                                {/* AKSI */}
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-3
                                    "
                                >

                                    {/* EDIT */}
                                    <button
                                        onClick={() => {

                                            setEditData(
                                                item
                                            );

                                            setOpenModal(
                                                true
                                            );

                                        }}
                                        className="
                                            w-11
                                            h-11
                                            rounded-2xl
                                            bg-blue-100
                                            hover:bg-blue-500
                                            text-blue-600
                                            hover:text-white
                                            transition
                                        "
                                    >

                                        <i className="fas fa-pen"></i>

                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => {

                                            setSelectedPelatihan(
                                                item
                                            );

                                            setDeleteModal(
                                                true
                                            );

                                        }}
                                        className="
                                            w-11
                                            h-11
                                            rounded-2xl
                                            bg-red-100
                                            hover:bg-red-500
                                            text-red-600
                                            hover:text-white
                                            transition
                                        "
                                    >

                                        <i className="fas fa-trash"></i>

                                    </button>

                                </div>

                            </div>

                        )
                    )

                )}

            </div>

            {/* MODAL CREATE & EDIT */}
            <PelatihanModal
                isOpen={openModal}
                onClose={() => {

                    setOpenModal(false);

                    setEditData(null);

                }}
                onSubmit={
                    editData
                        ? handleUpdate
                        : handleCreate
                }
                editData={editData}
            />

            {/* DELETE MODAL */}
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