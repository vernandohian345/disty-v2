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

  const [pelatihans, setPelatihans] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [kategoriFilter, setKategoriFilter] = useState("");

  const [sortFilter, setSortFilter] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editData, setEditData] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedPelatihan, setSelectedPelatihan] = useState(null);

  useEffect(() => {
    fetchPelatihans();
  }, []);

  const fetchPelatihans = async () => {
    try {
      setLoading(true);
      const response = await getPelatihans();
      setPelatihans(response.data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (formData) => {
    try {
      await updatePelatihan(editData.id, formData);
      await fetchPelatihans();
      setOpenModal(false);
      setEditData(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await deletePelatihan(selectedPelatihan.id);
      await fetchPelatihans();
      setDeleteModal(false);
      setSelectedPelatihan(null);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredPelatihans = pelatihans
    .filter((item) => {
      const matchSearch = item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchKategori =
        kategoriFilter === "" ? true : item.kategori === kategoriFilter;

      return matchSearch && matchKategori;
    })
    .sort((a, b) => {
      if (sortFilter === "terpopuler") {
        return (b.views || 0) - (a.views || 0);
      }

      if (sortFilter === "terendah") {
        return Number(a.harga) - Number(b.harga);
      }

      return 0;
    });
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black">Kelola Pelatihan</h1>
          <p className="text-slate-500 mt-2">Manage seluruh data pelatihan</p>
        </div>
        <button
          onClick={() => navigate("/admin/pelatihan/create")}
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
      <div
        className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
                mb-6
            "
      >
        {/* TOTAL */}
        <div
          className="
                bg-white
                rounded-[30px]
                p-7
                shadow-sm
                border
                border-slate-100
                relative
                overflow-hidden
            "
        >
          <div
            className="
                    absolute
                    -right-8
                    -top-8
                    w-36
                    h-36
                    rounded-full
                    bg-orange-100/50
                "
          ></div>
          <div
            className="
                    flex
                    items-start
                    justify-between
                    relative
                    z-10
                "
          >
            <div>
              <p
                className="
                            text-slate-500
                            font-medium
                        "
              >
                Total Pelatihan
              </p>
              <h2
                className="
                            text-5xl
                            font-black
                            text-slate-800
                            mt-4
                        "
              >
                {pelatihans.length}
              </h2>
              <p
                className="
                            text-sm
                            text-slate-400
                            mt-3
                        "
              >
                Semua data pelatihan
              </p>
            </div>
            <div
              className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                        text-orange-500
                        text-2xl
                    "
            >
              <i
                className="
                            fas
                            fa-book-open
                        "
              ></i>
            </div>
          </div>
        </div>
        {/* GRATIS */}
        <div
          className="
                bg-white
                rounded-[30px]
                p-7
                shadow-sm
                border
                border-slate-100
                relative
                overflow-hidden
            "
        >
          <div
            className="
                    absolute
                    -right-8
                    -top-8
                    w-36
                    h-36
                    rounded-full
                    bg-green-100/50
                "
          ></div>
          <div
            className="
                    flex
                    items-start
                    justify-between
                    relative
                    z-10
                "
          >
            <div>
              <p
                className="
                            text-slate-500
                            font-medium
                        "
              >
                Pelatihan Gratis
              </p>
              <h2
                className="
                            text-5xl
                            font-black
                            text-slate-800
                            mt-4
                        "
              >
                {pelatihans.filter((item) => item.kategori === "gratis").length}
              </h2>
              <p
                className="
                            text-sm
                            text-slate-400
                            mt-3
                        "
              >
                Pelatihan tanpa biaya
              </p>
            </div>
            <div
              className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-green-100
                        flex
                        items-center
                        justify-center
                        text-green-500
                        text-2xl
                    "
            >
              <i
                className="
                            fas
                            fa-gift
                        "
              ></i>
            </div>
          </div>
        </div>
        {/* BERBAYAR */}
        <div
          className="
                    bg-white
                    rounded-[30px]
                    p-7
                    shadow-sm
                    border
                    border-slate-100
                    relative
                    overflow-hidden
                "
        >
          <div
            className="
                        absolute
                        -right-8
                        -top-8
                        w-36
                        h-36
                        rounded-full
                        bg-blue-100/50
                    "
          ></div>
          <div
            className="
                        flex
                        items-start
                        justify-between
                        relative
                        z-10
                    "
          >
            <div>
              <p
                className="
                                text-slate-500
                                font-medium
                            "
              >
                Pelatihan Berbayar
              </p>
              <h2
                className="
                                text-5xl
                                font-black
                                text-slate-800
                                mt-4
                            "
              >
                {
                  pelatihans.filter((item) => item.kategori === "berbayar")
                    .length
                }
              </h2>
              <p
                className="
                                text-sm
                                text-slate-400
                                mt-3
                            "
              >
                Pelatihan premium
              </p>
            </div>
            <div
              className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-blue-500
                            text-2xl
                        "
            >
              <i
                className="
                                fas
                                fa-crown
                            "
              ></i>
            </div>
          </div>
        </div>
      </div>
      {/* SEARCH & FILTER */}
      <div
        className="
                bg-white
                rounded-[32px]
                p-6
                mb-6
                border
                border-slate-100
                shadow-sm
            "
      >
        <div
          className="
                    flex
                    flex-col
                    xl:flex-row
                    gap-5
                    xl:items-center
                    xl:justify-between
                "
        >
          {/* SEARCH */}
          <div
            className="
                        flex-1
                        relative
                    "
          >
            {/* ICON */}
            <div
              className="
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            text-lg
                        "
            >
              <i
                className="
                                fas
                                fa-search
                            "
              ></i>
            </div>

            {/* INPUT */}
            <input
              type="text"
              placeholder="Cari pelatihan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                                w-full
                                h-16
                                pl-14
                                pr-5
                                rounded-2xl
                                border
                                border-slate-200
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-200
                                text-slate-700
                                font-medium
                                transition
                            "
            />
          </div>

          {/* FILTER AREA */}
          <div
            className="
                        flex
                        flex-col
                        md:flex-row
                        gap-4
                    "
          >
            {/* FILTER KATEGORI */}
            <div
              className="
                            relative
                            min-w-[220px]
                        "
            >
              <select
                value={kategoriFilter}
                onChange={(e) => setKategoriFilter(e.target.value)}
                className="
                                    w-full
                                    h-16
                                    px-5
                                    appearance-none
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
                <option value="">Semua Kategori</option>

                <option value="gratis">Gratis</option>

                <option value="berbayar">Berbayar</option>
              </select>

              {/* ICON */}
              <div
                className="
                                absolute
                                right-5
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                                pointer-events-none
                            "
              >
                <i
                  className="
                                    fas
                                    fa-chevron-down
                                "
                ></i>
              </div>
            </div>

            {/* FILTER SORT */}
            <div
              className="
                            relative
                            min-w-[220px]
                        "
            >
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="
                                    w-full
                                    h-16
                                    px-5
                                    appearance-none
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
                <option value="">Urutkan</option>

                <option value="terpopuler">Terpopuler</option>

                <option value="terendah">Harga Terendah</option>
              </select>
              {/* ICON */}
              <div
                className="
                                absolute
                                right-5
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                                pointer-events-none
                            "
              >
                <i
                  className="
                                    fas
                                    fa-chevron-down
                                "
                ></i>
              </div>
            </div>
            {/* RESET */}
            <button
              type="button"
              onClick={() => {
                setSearch("");

                setKategoriFilter("");

                setSortFilter("");
              }}
              className="
                                h-16
                                px-6
                                rounded-2xl
                                bg-slate-100
                                hover:bg-slate-200
                                transition
                                font-bold
                                text-slate-700
                                whitespace-nowrap
                            "
            >
              <i
                className="
                                fas
                                fa-rotate-left
                                mr-2
                            "
              ></i>
              Reset
            </button>
          </div>
        </div>
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
        title={selectedPelatihan?.title}
      />
    </AdminLayout>
  );
}
