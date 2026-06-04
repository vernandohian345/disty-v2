import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

import RichTextEditor from "../../shared/RichTextEditor";

const inputClass = `
w-full
p-4
rounded-2xl
border
border-slate-200
focus:outline-none
focus:ring-4
focus:ring-orange-200
transition
`;

const labelClass = `
block
text-sm
font-bold
text-slate-700
mb-2
`;

const buttonClass = `
px-6
py-3
rounded-2xl
font-semibold
transition
`;

export default function PelatihanForm({ onSubmit, editData = null }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    short_description: "",
    deskripsi: "",
    materi: "",
    kategori: "gratis",
    level: "Beginner",
    status: "published",
    link_grup: "",
    durasi: "",
    harga: 0,
    bahasa: "",
    tanggal_pelatihan: "",
    thumbnail: null,
  });

  const [moduls, setModuls] = useState([
    {
      judul: "",
      deskripsi: "",
      video_url: "",
      durasi: "",
      urutan: 1,
    },
  ]);

  useEffect(() => {
    console.log("EDIT DATA =", editData);
    console.log("MODULS =", editData?.moduls);
  }, [editData]);

  useEffect(() => {
    if (!editData) return;

    setForm({
      title: editData.title || "",
      short_description: editData.short_description || "",
      deskripsi: editData.deskripsi || "",
      materi: editData.materi || "",
      kategori: editData.kategori || "gratis",
      level: editData.level || "Beginner",
      status: editData.status || "published",
      link_grup: editData.link_grup || "",
      durasi: editData.durasi || "",
      harga: editData.harga || 0,
      bahasa: editData.bahasa || "",
      tanggal_pelatihan: editData.tanggal_pelatihan || "",
      thumbnail: null,
    });

    if (editData.moduls && editData.moduls.length > 0) {
      setModuls(editData.moduls);
    } else {
      setModuls([
        {
          judul: "",
          deskripsi: "",
          video_url: "",
          durasi: "",
          urutan: 1,
        },
      ]);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleEditorChange = (value) => {
    setForm((prev) => ({
      ...prev,
      materi: value,
    }));
  };

  const addModule = () => {
    setModuls([
      ...moduls,
      {
        judul: "",
        deskripsi: "",
        video_url: "",
        durasi: "",
        urutan: moduls.length + 1,
      },
    ]);
  };

  const removeModule = (index) => {
    const updated = [...moduls];
    updated.splice(index, 1);
    setModuls(updated);
  };

  const handleModuleChange = (index, field, value) => {
    const updated = [...moduls];

    updated[index][field] = value;

    setModuls(updated);
  };

  const previewThumbnail = useMemo(() => {
    if (form.thumbnail) {
      return URL.createObjectURL(form.thumbnail);
    }

    if (editData?.thumbnail) {
      return `http://127.0.0.1:8000/uploads/pelatihan/${editData.thumbnail}`;
    }

    return null;
  }, [form.thumbnail, editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });

    formData.append("moduls", JSON.stringify(moduls));

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
      {/* TOP BAR */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
          p-6
          bg-slate-50
          border-b
          border-slate-100
        "
      >
        {/* LEFT */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`
              ${buttonClass}
              flex
              items-center
              gap-2
              bg-white
              border
              border-slate-200
              hover:bg-slate-100
              text-slate-700
              shadow-sm
            `}
          >
            <i className="fas fa-arrow-left"></i>
            Kembali
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className={`
              ${buttonClass}
              flex
              items-center
              gap-2
              bg-blue-500
              hover:bg-blue-600
              text-white
              shadow-lg
              shadow-blue-200
            `}
          >
            <i className="fas fa-home"></i>
            Beranda
          </button>
        </div>

        {/* STATUS */}
        <div
          className="
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
          "
        >
          <div
            className="
              w-3
              h-3
              rounded-full
              bg-orange-500
              animate-pulse
            "
          ></div>

          {editData ? "Mode Edit Pelatihan" : "Mode Tambah Pelatihan"}
        </div>
      </div>

      {/* HEADER */}
      <div
        className="
          bg-gradient-to-r
          from-orange-500
          to-orange-400
          p-8
          text-white
        "
      >
        <h1 className="text-4xl font-black">
          {editData ? "Edit Pelatihan" : "Tambah Pelatihan"}
        </h1>

        <p className="text-orange-100 mt-2">
          Kelola data pelatihan dengan mudah
        </p>
      </div>

      {/* BODY */}
      <div className="p-8 space-y-8">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          {/* TITLE */}
          <div className="md:col-span-2">
            <label className={labelClass}>Nama Pelatihan</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Masukkan nama pelatihan"
              className={inputClass}
              required
            />
          </div>

          {/* BAHASA */}
          <div>
            <label className={labelClass}>Bahasa</label>

            <input
              type="text"
              name="bahasa"
              value={form.bahasa}
              onChange={handleChange}
              placeholder="Contoh: Indonesia"
              className={inputClass}
              required
            />
          </div>

          {/* DURASI */}
          <div>
            <label className={labelClass}>Durasi</label>

            <input
              type="text"
              name="durasi"
              value={form.durasi}
              onChange={handleChange}
              placeholder="Contoh: 2 Jam"
              className={inputClass}
              required
            />
          </div>

          {/* KATEGORI */}
          <div>
            <label className={labelClass}>Kategori</label>

            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="gratis">Gratis</option>

              <option value="berbayar">Berbayar</option>
            </select>
          </div>

          {/* HARGA */}
          <div>
            <label className={labelClass}>Harga</label>

            <input
              type="number"
              name="harga"
              value={form.harga}
              onChange={handleChange}
              disabled={form.kategori === "gratis"}
              placeholder="Masukkan harga"
              className={`
                ${inputClass}
                disabled:bg-slate-100
              `}
            />
          </div>

          {/* TANGGAL */}
          <div className="md:col-span-2">
            <label className={labelClass}>Tanggal Pelatihan</label>

            <input
              type="date"
              name="tanggal_pelatihan"
              value={form.tanggal_pelatihan}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* LINK GRUP */}
          <div className="md:col-span-2">
            <label className={labelClass}>Link Grup</label>

            <input
              type="text"
              name="link_grup"
              value={form.link_grup}
              onChange={handleChange}
              placeholder="Masukkan link grup"
              className={`${inputClass} text-justify`}
              required
            />
          </div>

          {/* SHORT DESCRIPTION */}
          <div className="md:col-span-2">
            <label className={labelClass}>Short Description</label>

            <textarea
              rows="3"
              name="short_description"
              value={form.short_description}
              onChange={handleChange}
              placeholder="Deskripsi singkat pelatihan"
              className={`${inputClass} text-justify`}
              required
            />
          </div>

          {/* DESKRIPSI */}
          <div className="md:col-span-2">
            <label className={labelClass}>Deskripsi</label>

            <textarea
              rows="5"
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Masukkan deskripsi pelatihan"
              className={`${inputClass} text-justify`}
              required
            />
          </div>

          {/* MATERI */}
          <div className="md:col-span-2">
            <label className={labelClass}>Materi</label>

            <div
              className="
                border
                border-slate-200
                rounded-2xl
                overflow-hidden
              "
            >
              <RichTextEditor
                content={form.materi}
                onChange={handleEditorChange}
              />
            </div>
          </div>

          {/* MODUL PELATIHAN */}

          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <label className={labelClass}>Modul Pelatihan</label>

              <button
                type="button"
                onClick={addModule}
                className="
                  px-4 py-2
                  bg-orange-500
                  text-white
                  rounded-xl
                "
              >
                + Tambah Modul
              </button>
            </div>
            <div className="space-y-5">
              {moduls.map((modul, index) => (
                <div
                  key={index}
                  className="
                    border
                    rounded-2xl
                    p-5
                    bg-slate-50
                  "
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="font-bold text-lg">Modul {index + 1}</h3>

                    {moduls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeModule(index)}
                        className="
                          text-red-500
                          font-semibold
                        "
                      >
                        Hapus
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Judul Modul"
                      value={modul.judul}
                      onChange={(e) =>
                        handleModuleChange(index, "judul", e.target.value)
                      }
                      className={inputClass}
                    />

                    <input
                      type="text"
                      placeholder="Durasi"
                      value={modul.durasi}
                      onChange={(e) =>
                        handleModuleChange(index, "durasi", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                  <textarea
                    rows="3"
                    placeholder="Deskripsi Modul"
                    value={modul.deskripsi}
                    onChange={(e) =>
                      handleModuleChange(index, "deskripsi", e.target.value)
                    }
                    className={`${inputClass} mt-4`}
                  />
                  <input
                    type="text"
                    placeholder="URL Youtube"
                    value={modul.video_url}
                    onChange={(e) =>
                      handleModuleChange(index, "video_url", e.target.value)
                    }
                    className={`${inputClass} mt-4`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* THUMBNAIL */}
          <div className="md:col-span-2">
            <label className={labelClass}>Thumbnail Pelatihan</label>

            <label
              className="
                relative
                flex
                items-center
                justify-center
                w-full
                h-64
                border-2
                border-dashed
                border-orange-300
                rounded-3xl
                cursor-pointer
                overflow-hidden
                hover:bg-orange-50
                transition
              "
            >
              {previewThumbnail ? (
                <img
                  src={previewThumbnail}
                  alt="Thumbnail"
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
                <div className="text-center z-10">
                  <div
                    className="
                      w-20
                      h-20
                      rounded-full
                      bg-orange-100
                      flex
                      items-center
                      justify-center
                      mx-auto
                      mb-4
                    "
                  >
                    <i
                      className="
                        fas
                        fa-cloud-upload-alt
                        text-3xl
                        text-orange-500
                      "
                    ></i>
                  </div>

                  <p
                    className="
                      font-bold
                      text-slate-700
                    "
                  >
                    Upload Gambar
                  </p>

                  <p
                    className="
                      text-sm
                      text-slate-400
                      mt-2
                    "
                  >
                    JPG, PNG maksimal 2MB
                  </p>
                </div>
              )}

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
      <div
        className="
          p-8
          border-t
          border-slate-100
          flex
          flex-col
          sm:flex-row
          justify-end
          gap-4
        "
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`
            ${buttonClass}
            bg-slate-100
            hover:bg-slate-200
          `}
        >
          Batal
        </button>

        <button
          type="submit"
          className={`
            ${buttonClass}
            bg-orange-500
            hover:bg-orange-600
            text-white
            shadow-lg
            shadow-orange-200
          `}
        >
          {editData ? "Update Pelatihan" : "Simpan Pelatihan"}
        </button>
      </div>
    </form>
  );
}
