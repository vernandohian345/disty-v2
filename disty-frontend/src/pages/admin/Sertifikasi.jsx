import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import SertifikasiModal from "../../components/admin/sertifikasi/SertifikasiModal";

import DeleteModal from "../../components/admin/pelatihan/DeleteModal";

import {
    getSertifikasis,
    createSertifikasi,
    updateSertifikasi,
    deleteSertifikasi,
} from "../../services/sertifikasiService";

export default function Sertifikasi() {

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

    const [selectedData, setSelectedData] =
        useState(null);


    const loadSertifikasis = async () => {

        try {

            const response =
                await getSertifikasis();

            setSertifikasis(
                response.data.data.data
            );

        } catch (error) {

            console.log(error);

        }

    };
    // =========================
    // FETCH
    // =========================
    useEffect(() => {

        const loadData = async () => {

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

        loadData();

    }, []);

   

    // =========================
    // CREATE
    // =========================
    const handleCreate =
        async (formData) => {

            try {

                await createSertifikasi(
                    formData
                );

                await loadSertifikasis();

                setOpenModal(false);

            } catch (error) {

                console.log(
                    error.response?.data
                );

                alert(
                    JSON.stringify(
                        error.response?.data
                    )
                );

            }

        };

    // =========================
    // UPDATE
    // =========================
    const handleUpdate =
        async (formData) => {

            try {

                await updateSertifikasi(
                    editData.id,
                    formData
                );

                await loadSertifikasis();

                setOpenModal(false);

                setEditData(null);

            } catch (error) {

                console.log(
                    error.response?.data
                );

                alert(
                    JSON.stringify(
                        error.response?.data
                    )
                );

            }

        };

    // =========================
    // DELETE
    // =========================
    const handleDelete =
        async () => {

            try {

                await deleteSertifikasi(
                    selectedData.id
                );

                await loadSertifikasis();

                setDeleteModal(false);

                setSelectedData(null);

            } catch (error) {

                console.log(error);

            }

        };

    // =========================
    // SEARCH
    // =========================
    const filteredData =
        sertifikasis.filter((item) =>
            item.nama_sertifikasi
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <AdminLayout>

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

                <div>

                    <h1 className="text-4xl font-black text-slate-800">

                        Kelola Sertifikasi

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Manage seluruh data sertifikasi

                    </p>

                </div>

                <button
                    onClick={() => {

                        setEditData(null);

                        setOpenModal(true);

                    }}
                    className="
                    px-6 py-4 
                    rounded-2xl 
                    bg-orange-500 
                    hover:bg-orange-600 
                    text-white font-bold shadow-lg 
                    shadow-orange-200 transition"
                >

                    + Tambah Sertifikasi

                </button>

            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6">

                <div className="relative">

                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                    <input
                        type="text"
                        placeholder="Cari sertifikasi..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-200"
                    />

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-[35px] shadow-sm overflow-hidden border border-slate-100">

                {/* HEADER */}
                <div className="grid grid-cols-7 gap-4 p-5 bg-slate-50 border-b font-bold text-slate-700">

                    <div>No</div>

                    <div>Sampul</div>

                    <div>Sertifikasi</div>

                    <div>Kategori</div>

                    <div>Harga</div>

                    <div>Durasi</div>

                    <div className="text-center">
                        Aksi
                    </div>

                </div>

                {/* LOADING */}
                {
                    loading ? (

                        <div className="p-10 text-center">

                            Loading...

                        </div>

                    ) : filteredData.length === 0 ? (

                        <div className="p-16 text-center">

                            Tidak ada data

                        </div>

                    ) : (

                        filteredData.map(
                            (item, index) => (

                                <div
                                    key={item.id}
                                    className="grid grid-cols-7 gap-4 p-5 items-center border-b hover:bg-slate-50 transition"
                                >

                                    <div>

                                        {index + 1}

                                    </div>

                                    {/* IMAGE */}
                                    <div>

                                        <img
                                            src={
                                                item.sampul
                                                    ? `http://127.0.0.1:8000/uploads/sertifikasi/${item.sampul}`
                                                    : "https://placehold.co/300x200?text=No+Image"
                                            }
                                            alt=""
                                            className="w-20 h-16 rounded-2xl object-cover"
                                        />

                                    </div>

                                    {/* NAMA */}
                                    <div>

                                        <h3 className="font-bold text-slate-800">

                                            {
                                                item.nama_sertifikasi
                                            }

                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">

                                            {
                                                item.bahasa
                                            }

                                        </p>

                                    </div>

                                    {/* KATEGORI */}
                                    <div>

                                        <span
                                            className={`
                                                px-4 py-2 rounded-full text-xs font-bold
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
                                    <div className="flex items-center justify-center gap-3">

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
                                            className="w-11 h-11 rounded-2xl bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white transition"
                                        >

                                            <i className="fas fa-pen"></i>

                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={() => {

                                                setSelectedData(
                                                    item
                                                );

                                                setDeleteModal(
                                                    true
                                                );

                                            }}
                                            className="w-11 h-11 rounded-2xl bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition"
                                        >

                                            <i className="fas fa-trash"></i>

                                        </button>

                                    </div>

                                </div>

                            )
                        )

                    )
                }

            </div>

            {/* MODAL */}
            <SertifikasiModal
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

            {/* DELETE */}
            <DeleteModal
                isOpen={deleteModal}
                onClose={() => {

                    setDeleteModal(false);

                    setSelectedData(null);

                }}
                onDelete={handleDelete}
                title={
                    selectedData?.nama_sertifikasi
                }
            />

        </AdminLayout>

    );
}