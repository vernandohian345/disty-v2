import { useState } from "react";

import RichTextEditor from "../../shared/RichTextEditor";
import { useNavigate } from "react-router-dom";

export default function PelatihanForm({
    onSubmit,
    editData = null,
}) {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title:
            editData?.title || "",

        deskripsi:
            editData?.deskripsi || "",

        materi:
            editData?.materi || "",

        kategori:
            editData?.kategori || "gratis",

        link_grup:
            editData?.link_grup || "",

        durasi:
            editData?.durasi || "",

        harga:
            editData?.harga || 0,

        bahasa:
            editData?.bahasa || "",

        tanggal_pelatihan:
            editData?.tanggal_pelatihan || "",

        thumbnail: null,
    });

    const handleChange = (e) => {

        const {
            name,
            value,
            files,
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                files && files.length > 0
                    ? files[0]
                    : value,
        }));

    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const formData =
                new FormData();

            Object.keys(form).forEach(
                (key) => {

                    if (
                        form[key] !== null
                    ) {

                        formData.append(
                            key,
                            form[key]
                        );

                    }

                }
            );

            await onSubmit(formData);

        };

    return (

        <form
            onSubmit={handleSubmit}
            className="
                bg-white
                rounded-[35px]
                shadow-sm
                border
                border-slate-100
                overflow-hidden
            "
        >
            {/* TOP NAVIGATION */}
            <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
                p-6
                bg-slate-50
                border-b
                border-slate-100
            ">

                {/* LEFT */}
                <div className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                ">

                    {/* BACK */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            rounded-2xl
                            bg-white
                            border
                            border-slate-200
                            hover:bg-slate-100
                            transition
                            font-semibold
                            text-slate-700
                            shadow-sm
                        "
                    >

                        <i className="
                            fas
                            fa-arrow-left
                        "></i>

                        Kembali

                    </button>

                    {/* HOME */}
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            rounded-2xl
                            bg-blue-500
                            hover:bg-blue-600
                            transition
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-blue-200
                        "
                    >

                        <i className="
                            fas
                            fa-home
                        "></i>

                        Beranda

                    </button>

                </div>

                {/* STATUS */}
                <div className="
                    flex
                    items-center
                    gap-3
                    px-5
                    py-3
                    rounded-2xl
                    bg-orange-100
                    text-orange-600
                    font-bold
                    w-fit
                ">

                    <div className="
                        w-3
                        h-3
                        rounded-full
                        bg-orange-500
                        animate-pulse
                    "></div>

                    {
                        editData
                            ? "Mode Edit Pelatihan"
                            : "Mode Tambah Pelatihan"
                    }

                </div>

            </div>
        
            {/* HEADER */}
            <div className="
                bg-gradient-to-r
                from-orange-500
                to-orange-400
                p-8
                text-white
            ">

                <h2 className="
                    text-4xl
                    font-black
                ">

                    {
                        editData
                            ? "Edit Pelatihan"
                            : "Tambah Pelatihan"
                    }

                </h2>

                <p className="
                    text-orange-100
                    mt-2
                ">

                    Kelola data pelatihan dengan mudah

                </p>

            </div>

            {/* BODY */}
            <div className="
                p-8
                space-y-8
            ">

                {/* GRID */}
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                ">

                    {/* NAMA */}
                    <div className="md:col-span-2">

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Nama Pelatihan

                        </label>

                        <input
                            type="text"
                            name="title"
                            value={
                                form.title
                            }
                            onChange={handleChange}
                            placeholder="Masukkan nama pelatihan"
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                border
                                border-slate-200
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-200
                            "
                            required
                        />

                    </div>

                    {/* BAHASA */}
                    <div>

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Bahasa

                        </label>

                        <input
                            type="text"
                            name="bahasa"
                            value={form.bahasa}
                            onChange={handleChange}
                            placeholder="Contoh: Indonesia"
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                border
                                border-slate-200
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-200
                            "
                            required
                        />

                    </div>

                    {/* DURASI */}
                    <div>

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Durasi

                        </label>

                        <input
                            type="text"
                            name="durasi"
                            value={form.durasi}
                            onChange={handleChange}
                            placeholder="Contoh: 2 Jam"
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                border
                                border-slate-200
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-200
                            "
                            required
                        />

                    </div>

                    {/* KATEGORI */}
                    <div>
                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Kategori

                        </label>

                        <div className="relative">

                            <select
                                name="kategori"
                                value={form.kategori}
                                onChange={handleChange}
                                className="
                                    w-full
                                    appearance-none
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    font-semibold
                                    text-slate-700
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-orange-200
                                    cursor-pointer
                                "
                            >

                                <option value="gratis">
                                    Gratis
                                </option>

                                <option value="berbayar">
                                    Berbayar
                                </option>

                            </select>

                            {/* ICON */}
                            <div className="
                                absolute
                                right-5
                                top-1/2
                                -translate-y-1/2
                                pointer-events-none
                                text-slate-400
                            ">

                                <i className="
                                    fas
                                    fa-chevron-down
                                "></i>

                            </div>

                        </div>

                    </div>

                    {/* HARGA */}
                    <div>

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Harga

                        </label>

                        <input
                            type="number"
                            name="harga"
                            value={form.harga}
                            onChange={handleChange}
                            disabled={
                                form.kategori ===
                                "gratis"
                            }
                            placeholder="Masukkan harga"
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                border
                                border-slate-200
                                disabled:bg-slate-100
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-200
                            "
                        />

                    </div>

                    {/* TANGGAL */}
                    <div className="md:col-span-2">

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Tanggal Pelatihan

                        </label>

                        <input
                            type="date"
                            name="tanggal_pelatihan"
                            value={
                                form.tanggal_pelatihan
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                border
                                border-slate-200
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-200
                            "
                            required
                        />

                    </div>

                    {/* LINK */}
                    <div className="md:col-span-2">

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Link Grup

                        </label>

                        <input
                            type="text"
                            name="link_grup"
                            value={form.link_grup}
                            onChange={handleChange}
                            placeholder="Masukkan link grup"
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                border
                                border-slate-200
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-200
                            "
                            required
                        />

                    </div>

                    {/* DESKRIPSI */}
                    <div className="md:col-span-2">

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Deskripsi

                        </label>

                        <textarea
                            rows="5"
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            placeholder="Masukkan deskripsi pelatihan"
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                border
                                border-slate-200
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-200
                            "
                            required
                        />

                    </div>

                    {/* MATERI */}
                    <div className="md:col-span-2">

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Materi

                        </label>

                        <div className="
                            border
                            border-slate-200
                            rounded-2xl
                            overflow-hidden
                        ">

                            <RichTextEditor
                                content={form.materi}
                                onChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        materi: value,
                                    }))
                                }
                            />

                        </div>

                    </div>

                    {/* SAMPUL */}
                    <div className="md:col-span-2">

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-slate-700
                            mb-2
                        ">

                            Sampul Pelatihan

                        </label>

                        <label
                            className="
                                flex
                                items-center
                                justify-center
                                w-full
                                h-56
                                border-2
                                border-dashed
                                border-orange-300
                                rounded-3xl
                                cursor-pointer
                                hover:bg-orange-50
                                transition
                                overflow-hidden
                                relative
                            "
                        >

                            {
                                form.thumbnail
                                    ? (

                                        <img
                                            src={URL.createObjectURL(form.thumbnail)}
                                            alt=""
                                            className="
                                                absolute
                                                inset-0
                                                w-full
                                                h-full
                                                object-contain
                                                bg-white
                                            "
                                        />

                                    ) : editData?.thumbnail ? (

                                        <img
                                            src={`http://127.0.0.1:8000/uploads/pelatihan/${editData.thumbnail}`}
                                            alt=""
                                            className="
                                                absolute
                                                inset-0
                                                w-full
                                                h-full
                                                object-contain
                                                bg-white
                                            "
                                        />

                                    ) : (

                                        <div className="
                                            text-center
                                            z-10
                                        ">

                                            <div className="
                                                w-20
                                                h-20
                                                rounded-full
                                                bg-orange-100
                                                flex
                                                items-center
                                                justify-center
                                                mx-auto
                                                mb-4
                                            ">

                                                <i className="
                                                    fas
                                                    fa-cloud-upload-alt
                                                    text-3xl
                                                    text-orange-500
                                                "></i>

                                            </div>

                                            <p className="
                                                font-bold
                                                text-slate-700
                                            ">

                                                Upload Gambar

                                            </p>

                                            <p className="
                                                text-sm
                                                text-slate-400
                                                mt-2
                                            ">

                                                JPG, PNG maksimal 2MB

                                            </p>

                                        </div>

                                    )
                            }

                            <input
                                type="file"
                                name="thumbnail"
                                accept="
                                    image/png,
                                    image/jpeg,
                                    image/jpg
                                "
                                onChange={handleChange}
                                className="hidden"
                            />

                        </label>

                    </div>

                </div>

            </div>

            {/* FOOTER */}
            <div className="
                p-8
                border-t
                border-slate-100
                flex
                items-center
                justify-end
                gap-4
            ">

                <button
                    type="button"
                    className="
                        px-6
                        py-4
                        rounded-2xl
                        bg-slate-100
                        hover:bg-slate-200
                        font-bold
                        transition
                    "
                >

                    Batal

                </button>

                <button
                    type="submit"
                    className="
                        px-8
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

                    {
                        editData
                            ? "Update Pelatihan"
                            : "Simpan Pelatihan"
                    }

                </button>

            </div>

        </form>

    );
}