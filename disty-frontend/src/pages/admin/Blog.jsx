import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
} from "../../services/blogService";

export default function Blog() {

    // =========================
    // STATE
    // =========================
    const [blogs, setBlogs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    // MODAL FORM
    const [openModal, setOpenModal] =
        useState(false);

    const [editData, setEditData] =
        useState(null);

    // DELETE MODAL
    const [deleteModal, setDeleteModal] =
        useState(false);

    const [selectedBlog, setSelectedBlog] =
        useState(null);

    // FORM STATE
    const [form, setForm] = useState({
        judul: "",
        konten: "",
        kategori: "",
        penulis: "",
        status: "draft",
        sampul: null,
    });

    // =========================
    // FETCH DATA
    // =========================
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {

        try {

            setLoading(true);

            const response = await getBlogs();

            setBlogs(
                response.data.data.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    // =========================
    // OPEN MODAL
    // =========================
    const openCreateModal = () => {
        setForm({
            judul: "",
            konten: "",
            kategori: "",
            penulis: "",
            status: "draft",
            sampul: null,
        });
        setEditData(null);
        setOpenModal(true);
    };

    const openEditModal = (item) => {
        setForm({
            judul: item.judul,
            konten: item.konten,
            kategori: item.kategori ?? "",
            penulis: item.penulis ?? "",
            status: item.status,
            sampul: null,
        });
        setEditData(item);
        setOpenModal(true);
    };

    // =========================
    // SUBMIT FORM
    // =========================
    const handleSubmit = async () => {

        try {

            const formData = new FormData();
            formData.append("judul", form.judul);
            formData.append("konten", form.konten);
            formData.append("kategori", form.kategori);
            formData.append("penulis", form.penulis);
            formData.append("status", form.status);
            if (form.sampul) {
                formData.append("sampul", form.sampul);
            }

            if (editData) {
                await updateBlog(editData.id, formData);
            } else {
                await createBlog(formData);
            }

            await fetchBlogs();
            setOpenModal(false);
            setEditData(null);

        } catch (error) {

            console.log(error.response?.data);
            alert(JSON.stringify(error.response?.data));

        }

    };

    // =========================
    // DELETE
    // =========================
    const handleDelete = async () => {

        try {

            await deleteBlog(selectedBlog.id);
            await fetchBlogs();
            setDeleteModal(false);
            setSelectedBlog(null);

        } catch (error) {

            console.log(error);
            alert("Gagal menghapus blog");

        }

    };

    // =========================
    // SEARCH
    // =========================
    const filteredBlogs = blogs.filter(
        (item) =>
            item.judul
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    return (

        <AdminLayout>

            {/* HEADER */}
            <div
                className="
                    flex flex-col lg:flex-row
                    lg:items-center lg:justify-between
                    gap-5 mb-8
                "
            >

                <div>

                    <h1 className="text-4xl font-black text-slate-800">
                        Kelola Blog
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage seluruh data blog
                    </p>

                </div>

                <button
                    onClick={openCreateModal}
                    className="
                        px-6 py-4 rounded-2xl
                        bg-orange-500 hover:bg-orange-600
                        text-white font-bold
                        shadow-lg shadow-orange-200 transition
                    "
                >
                    + Tambah Blog
                </button>

            </div>

            {/* SEARCH */}
            <div
                className="
                    bg-white rounded-3xl p-5
                    shadow-sm border border-slate-100 mb-6
                "
            >

                <div className="relative">

                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                    <input
                        type="text"
                        placeholder="Cari blog..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full pl-12 pr-4 py-4 rounded-2xl
                            border border-slate-200
                            focus:outline-none focus:ring-4 focus:ring-orange-200
                        "
                    />

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-[35px] shadow-sm overflow-hidden border border-slate-100">

                {/* HEADER TABLE */}
                <div
                    className="
                        grid grid-cols-6 gap-4 p-5
                        bg-slate-50 border-b
                        font-bold text-slate-700
                    "
                >
                    <div>No</div>
                    <div>Sampul</div>
                    <div>Judul</div>
                    <div>Kategori</div>
                    <div>Status</div>
                    <div className="text-center">Aksi</div>
                </div>

                {/* LOADING */}
                {loading ? (

                    <div className="p-10 text-center text-slate-500">
                        Loading...
                    </div>

                ) : filteredBlogs.length === 0 ? (

                    <div className="p-16 text-center">

                        <div
                            className="
                                w-24 h-24 rounded-full bg-orange-100
                                flex items-center justify-center
                                mx-auto mb-5
                            "
                        >
                            <i className="fas fa-newspaper text-3xl text-orange-500"></i>
                        </div>

                        <h3 className="text-2xl font-black text-slate-700">
                            Belum Ada Blog
                        </h3>

                    </div>

                ) : (

                    filteredBlogs.map((item, index) => (

                        <div
                            key={item.id}
                            className="
                                grid grid-cols-6 gap-4 p-5
                                items-center border-b
                                hover:bg-slate-50 transition
                            "
                        >

                            {/* NO */}
                            <div>{index + 1}</div>

                            {/* SAMPUL */}
                            <div>
                                <img
                                    src={
                                        item.sampul
                                            ? `http://127.0.0.1:8000/uploads/blog/${item.sampul}`
                                            : "https://placehold.co/300x200?text=No+Image"
                                    }
                                    alt=""
                                    className="w-20 h-16 rounded-2xl object-cover"
                                />
                            </div>

                            {/* JUDUL */}
                            <div>
                                <h3 className="font-bold text-slate-800">
                                    {item.judul}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    {item.penulis}
                                </p>
                            </div>

                            {/* KATEGORI */}
                            <div>
                                <span className="px-4 py-2 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                    {item.kategori ?? "-"}
                                </span>
                            </div>

                            {/* STATUS */}
                            <div>
                                <span
                                    className={`
                                        px-4 py-2 rounded-full text-xs font-bold
                                        ${
                                            item.status === "published"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-slate-100 text-slate-600"
                                        }
                                    `}
                                >
                                    {item.status}
                                </span>
                            </div>

                            {/* AKSI */}
                            <div className="flex items-center justify-center gap-3">

                                <button
                                    onClick={() => openEditModal(item)}
                                    className="
                                        w-11 h-11 rounded-2xl
                                        bg-blue-100 hover:bg-blue-500
                                        text-blue-600 hover:text-white transition
                                    "
                                >
                                    <i className="fas fa-pen"></i>
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedBlog(item);
                                        setDeleteModal(true);
                                    }}
                                    className="
                                        w-11 h-11 rounded-2xl
                                        bg-red-100 hover:bg-red-500
                                        text-red-600 hover:text-white transition
                                    "
                                >
                                    <i className="fas fa-trash"></i>
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

            {/* MODAL FORM CREATE & EDIT */}
            {openModal && (

                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

                    <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                        <h2 className="text-2xl font-black text-slate-800 mb-6">
                            {editData ? "Edit Blog" : "Tambah Blog"}
                        </h2>

                        <div className="space-y-4">

                            {/* JUDUL */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    value={form.judul}
                                    onChange={(e) => setForm({ ...form, judul: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-200"
                                    placeholder="Judul blog"
                                />
                            </div>

                            {/* KONTEN */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Konten
                                </label>
                                <textarea
                                    value={form.konten}
                                    onChange={(e) => setForm({ ...form, konten: e.target.value })}
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-200 resize-none"
                                    placeholder="Isi konten blog..."
                                />
                            </div>

                            {/* KATEGORI & PENULIS */}
                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        Kategori
                                    </label>
                                   <select
                                        value={form.kategori}
                                        onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-200"
                                    >
                                        <option value="">-- Pilih Kategori --</option>
                                        <option value="Teknologi">Teknologi</option>
                                        <option value="Karir">Karir</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="UI/UX">UI/UX</option>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile App">Mobile App</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Cyber Security">Cyber Security</option>
                                        <option value="Startup">Startup</option>
                                    </select>
                                                                    </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        Penulis
                                    </label>
                                    <input
                                        type="text"
                                        value={form.penulis}
                                        onChange={(e) => setForm({ ...form, penulis: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-200"
                                        placeholder="Nama penulis"
                                    />
                                </div>

                            </div>

                            {/* STATUS */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-200"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            {/* SAMPUL */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Sampul {editData && "(kosongkan jika tidak ingin mengubah)"}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setForm({ ...form, sampul: e.target.files[0] })}
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200"
                                />
                                {editData?.sampul && (
                                    <img
                                        src={`http://127.0.0.1:8000/uploads/blog/${editData.sampul}`}
                                        alt="sampul"
                                        className="mt-3 w-32 h-24 rounded-2xl object-cover"
                                    />
                                )}
                            </div>

                        </div>

                        {/* BUTTON */}
                        <div className="flex gap-3 mt-8">

                            <button
                                onClick={() => {
                                    setOpenModal(false);
                                    setEditData(null);
                                }}
                                className="
                                    flex-1 py-4 rounded-2xl
                                    border border-slate-200
                                    text-slate-600 font-bold
                                    hover:bg-slate-50 transition
                                "
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="
                                    flex-1 py-4 rounded-2xl
                                    bg-orange-500 hover:bg-orange-600
                                    text-white font-bold transition
                                "
                            >
                                {editData ? "Simpan Perubahan" : "Tambah Blog"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* DELETE MODAL */}
            {deleteModal && (

                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

                    <div className="bg-white rounded-3xl p-8 w-full max-w-md text-center">

                        <div
                            className="
                                w-20 h-20 rounded-full bg-red-100
                                flex items-center justify-center
                                mx-auto mb-5
                            "
                        >
                            <i className="fas fa-trash text-2xl text-red-500"></i>
                        </div>

                        <h2 className="text-2xl font-black text-slate-800 mb-2">
                            Hapus Blog?
                        </h2>

                        <p className="text-slate-500 mb-8">
                            Blog <span className="font-bold text-slate-700">"{selectedBlog?.judul}"</span> akan dihapus permanen.
                        </p>

                        <div className="flex gap-3">

                            <button
                                onClick={() => {
                                    setDeleteModal(false);
                                    setSelectedBlog(null);
                                }}
                                className="
                                    flex-1 py-4 rounded-2xl
                                    border border-slate-200
                                    text-slate-600 font-bold
                                    hover:bg-slate-50 transition
                                "
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleDelete}
                                className="
                                    flex-1 py-4 rounded-2xl
                                    bg-red-500 hover:bg-red-600
                                    text-white font-bold transition
                                "
                            >
                                Hapus
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </AdminLayout>

    );
}