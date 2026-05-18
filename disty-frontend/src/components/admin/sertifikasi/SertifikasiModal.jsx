import { useEffect, useState } from "react";

export default function SertifikasiModal({
    isOpen,
    onClose,
    onSubmit,
    editData,
}) {

    const [form, setForm] =
        useState({
            nama_sertifikasi: "",
            deskripsi: "",
            materi: "",
            kategori: "gratis",
            link_grup: "",
            durasi: "",
            harga: 0,
            bahasa: "",
            tanggal_sertifikasi: "",
            sampul: null,
        });

    useEffect(() => {

        if (editData) {

            setForm({
                nama_sertifikasi:
                    editData.nama_sertifikasi || "",

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

                tanggal_sertifikasi:
                    editData.tanggal_sertifikasi || "",

                sampul: null,
            });

        }

    }, [editData]);

    const handleChange = (e) => {

        const {
            name,
            value,
            files,
        } = e.target;

        setForm({
            ...form,

            [name]:
                files &&
                files.length > 0
                    ? files[0]
                    : value,
        });

    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const formData =
                new FormData();

            Object.keys(form).forEach(
                (key) => {

                    if (
                        key === "sampul"
                    ) {

                        if (
                            form.sampul instanceof File
                        ) {

                            formData.append(
                                "sampul",
                                form.sampul
                            );

                        }

                    } else {

                        formData.append(
                            key,
                            form[key]
                        );

                    }

                }
            );

            await onSubmit(
                formData
            );

        };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-5">

            <div className="w-full max-w-5xl bg-white rounded-[35px] shadow-2xl overflow-hidden">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white">

                    <div className="flex items-start justify-between">

                        <div>

                            <h2 className="text-4xl font-black">

                                {
                                    editData
                                        ? "Edit Sertifikasi"
                                        : "Tambah Sertifikasi"
                                }

                            </h2>

                            <p className="mt-2 text-orange-100">

                                Kelola data sertifikasi

                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/30"
                        >

                            ✕

                        </button>

                    </div>

                </div>

                {/* BODY */}
                <form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-6 max-h-[80vh] overflow-y-auto"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <input
                            type="text"
                            name="nama_sertifikasi"
                            value={form.nama_sertifikasi}
                            onChange={handleChange}
                            placeholder="Nama Sertifikasi"
                            className="w-full p-4 rounded-2xl border border-slate-200"
                            required
                        />

                        <input
                            type="text"
                            name="bahasa"
                            value={form.bahasa}
                            onChange={handleChange}
                            placeholder="Bahasa"
                            className="w-full p-4 rounded-2xl border border-slate-200"
                            required
                        />

                        <input
                            type="text"
                            name="durasi"
                            value={form.durasi}
                            onChange={handleChange}
                            placeholder="Durasi"
                            className="w-full p-4 rounded-2xl border border-slate-200"
                            required
                        />

                        <input
                            type="date"
                            name="tanggal_sertifikasi"
                            value={form.tanggal_sertifikasi}
                            onChange={handleChange}
                            className="w-full p-4 rounded-2xl border border-slate-200"
                            required
                        />

                        <select
                            name="kategori"
                            value={form.kategori}
                            onChange={handleChange}
                            className="w-full p-4 rounded-2xl border border-slate-200"
                        >

                            <option value="gratis">

                                Gratis

                            </option>

                            <option value="berbayar">

                                Berbayar

                            </option>

                        </select>

                        <input
                            type="number"
                            name="harga"
                            value={form.harga}
                            onChange={handleChange}
                            disabled={
                                form.kategori === "gratis"
                            }
                            placeholder="Harga"
                            className="w-full p-4 rounded-2xl border border-slate-200"
                        />

                        <input
                            type="text"
                            name="link_grup"
                            value={form.link_grup}
                            onChange={handleChange}
                            placeholder="Link Grup"
                            className="w-full p-4 rounded-2xl border border-slate-200 md:col-span-2"
                        />

                        <textarea
                            rows="4"
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            placeholder="Deskripsi"
                            className="w-full p-4 rounded-2xl border border-slate-200 md:col-span-2"
                        />

                        <textarea
                            rows="4"
                            name="materi"
                            value={form.materi}
                            onChange={handleChange}
                            placeholder="Materi"
                            className="w-full p-4 rounded-2xl border border-slate-200 md:col-span-2"
                        />

                        {/* FILE */}
                        <div className="md:col-span-2">

                            <label className="flex items-center justify-center w-full h-44 border-2 border-dashed border-orange-300 rounded-3xl cursor-pointer hover:bg-orange-50 transition">

                                <div className="text-center">

                                    <i className="fas fa-cloud-upload-alt text-5xl text-orange-400 mb-3"></i>

                                    <p className="font-semibold text-slate-700">

                                        Upload Gambar

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

                            {
                                form.sampul && (

                                    <img
                                        src={URL.createObjectURL(form.sampul)}
                                        alt=""
                                        className="mt-4 w-full h-52 object-cover rounded-3xl"
                                    />

                                )
                            }

                        </div>

                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-end gap-4 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 font-bold transition"
                        >

                            Batal

                        </button>

                        <button
                            type="submit"
                            className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-200 transition"
                        >

                            {
                                editData
                                    ? "Update Sertifikasi"
                                    : "Simpan Sertifikasi"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}