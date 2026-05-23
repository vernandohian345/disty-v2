import { useEffect, useState } from "react";


export default function PelatihanModal({
    isOpen,
    onClose,
    onSubmit,
    editData,
}) {

    // =========================
    // INITIAL FORM
    // =========================
    const initialForm = {
        nama_pelatihan: "",
        deskripsi: "",
        materi: "",
        kategori: "gratis",
        link_grup: "",
        durasi: "",
        harga: 0,
        bahasa: "",
        tanggal_pelatihan: "",
        sampul: null,
    };

    const [form, setForm] =
        useState(initialForm);

    // =========================
    // SET EDIT DATA
    // =========================
    useEffect(() => {

        if (editData) {

            setForm({
                nama_pelatihan:
                    editData.nama_pelatihan || "",

                deskripsi:
                    editData.deskripsi || "",

                materi:
                    editData.materi || "",

                kategori:
                    editData.kategori || "gratis",

                link_grup:
                    editData.link_grup || "",

                durasi:
                    editData.durasi || "",

                harga:
                    editData.harga || 0,

                bahasa:
                    editData.bahasa || "",

                tanggal_pelatihan:
                    editData.tanggal_pelatihan || "",

                sampul: null,
            });

        } else {

            setForm(initialForm);

        }

    }, [editData, isOpen]);

    // =========================
    // HANDLE CHANGE
    // =========================
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

    // =========================
    // SUBMIT
    // =========================
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const formData =
                    new FormData();

                formData.append(
                    "nama_pelatihan",
                    form.nama_pelatihan
                );

                formData.append(
                    "deskripsi",
                    form.deskripsi
                );

                formData.append(
                    "materi",
                    form.materi || ""
                );

                formData.append(
                    "kategori",
                    form.kategori
                );

                formData.append(
                    "link_grup",
                    form.link_grup
                );

                formData.append(
                    "durasi",
                    form.durasi
                );

                formData.append(
                    "harga",
                    form.kategori === "gratis"
                        ? 0
                        : form.harga
                );

                formData.append(
                    "bahasa",
                    form.bahasa
                );

                formData.append(
                    "tanggal_pelatihan",
                    form.tanggal_pelatihan
                );

                // FILE
                if (
                    form.sampul instanceof File
                ) {

                    formData.append(
                        "sampul",
                        form.sampul
                    );

                }

                await onSubmit(
                    formData
                );

            } catch (error) {

                console.log(error);

            }

        };

    if (!isOpen) return null;

    return (

        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
            p-5
        ">

            <div className="
                w-full
                max-w-5xl
                bg-white
                rounded-[35px]
                shadow-2xl
                overflow-hidden
            ">

                {/* HEADER */}
                <div className="
                    bg-gradient-to-r
                    from-orange-500
                    to-orange-400
                    p-8
                    text-white
                ">

                    <div className="
                        flex
                        items-start
                        justify-between
                    ">

                        <div>

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
                                mt-2
                                text-orange-100
                            ">

                                Kelola data pelatihan dengan mudah

                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-white/20
                                hover:bg-white/30
                                transition
                            "
                        >

                            ✕

                        </button>

                    </div>

                </div>

                {/* BODY */}
                <form
                    onSubmit={handleSubmit}
                    className="
                        p-8
                        space-y-6
                        max-h-[80vh]
                        overflow-y-auto
                    "
                >

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
                                name="nama_pelatihan"
                                value={form.nama_pelatihan}
                                onChange={handleChange}
                                className="
                                    w-full
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
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
                                className="
                                    w-full
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
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
                                className="
                                    w-full
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
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

                            <select
                                name="kategori"
                                value={form.kategori}
                                onChange={handleChange}
                                className="
                                    w-full
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
                                "
                            >

                                <option value="gratis">

                                    Gratis

                                </option>

                                <option value="berbayar">

                                    Berbayar

                                </option>

                            </select>

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
                                    form.kategori === "gratis"
                                }
                                className="
                                    w-full
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    disabled:bg-slate-100
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
                                    form.tanggal_pelatihan || ""
                                }
                                onChange={handleChange}
                                className="
                                    w-full
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
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
                                className="
                                    w-full
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
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
                                rows="4"
                                name="deskripsi"
                                value={form.deskripsi}
                                onChange={handleChange}
                                className="
                                    w-full
                                    p-4
                                    rounded-2xl
                                    border
                                    border-slate-200
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
                                bg-white
                                rounded-2xl
                                overflow-hidden
                                border
                                border-slate-200
                            ">

                                <ReactQuill
                                    theme="snow"
                                    value={form.materi}
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            materi: value,
                                        }))
                                    }
                                    modules={{
                                        toolbar: [
                                            [
                                                {
                                                    header: [
                                                        1,
                                                        2,
                                                        3,
                                                        false,
                                                    ],
                                                },
                                            ],

                                            [
                                                "bold",
                                                "italic",
                                                "underline",
                                            ],

                                            [
                                                {
                                                    list: "ordered",
                                                },
                                                {
                                                    list: "bullet",
                                                },
                                            ],

                                            [
                                                "link",
                                                "image",
                                                "video",
                                            ],

                                            ["clean"],
                                        ],
                                    }}
                                    className="
                                        h-72
                                        mb-12
                                    "
                                />

                            </div>

                        </div>

                        {/* FILE */}
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

                            <label className="
                                flex
                                items-center
                                justify-center
                                w-full
                                h-44
                                border-2
                                border-dashed
                                border-orange-300
                                rounded-3xl
                                cursor-pointer
                                hover:bg-orange-50
                                transition
                            ">

                                <div className="text-center">

                                    <i className="
                                        fas
                                        fa-cloud-upload-alt
                                        text-5xl
                                        text-orange-400
                                        mb-3
                                    "></i>

                                    <p className="
                                        font-semibold
                                        text-slate-700
                                    ">

                                        Upload Gambar

                                    </p>

                                    <p className="
                                        text-sm
                                        text-slate-400
                                        mt-1
                                    ">

                                        JPG, PNG max 2MB

                                    </p>

                                </div>

                                <input
                                    type="file"
                                    name="sampul"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={handleChange}
                                    className="hidden"
                                />

                            </label>

                            {/* PREVIEW */}
                            {
                                form.sampul instanceof File ? (

                                    <img
                                        src={URL.createObjectURL(form.sampul)}
                                        alt=""
                                        className="
                                            mt-4
                                            w-full
                                            h-52
                                            object-cover
                                            rounded-3xl
                                        "
                                    />

                                ) : editData?.sampul ? (

                                    <img
                                        src={`http://127.0.0.1:8000/uploads/pelatihan/${editData.sampul}`}
                                        alt=""
                                        className="
                                            mt-4
                                            w-full
                                            h-52
                                            object-cover
                                            rounded-3xl
                                        "
                                    />

                                ) : null
                            }

                        </div>

                    </div>

                    {/* FOOTER */}
                    <div className="
                        flex
                        justify-end
                        gap-4
                        pt-5
                    ">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                px-6
                                py-4
                                rounded-2xl
                                bg-slate-200
                                hover:bg-slate-300
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

            </div>

        </div>
    );
}