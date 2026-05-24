export default function SertifikatFilter({
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
}) {

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Cari peserta..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="
                    bg-white
                    border
                    rounded-2xl
                    px-5
                    py-3
                    w-full
                    md:w-80
                    outline-none
                "
            />

            {/* FILTER */}
            <select
                value={filterStatus}
                onChange={(e) =>
                    setFilterStatus(e.target.value)
                }
                className="
                    bg-white
                    border
                    rounded-2xl
                    px-5
                    py-3
                    outline-none
                "
            >

                <option value="all">
                    Semua
                </option>

                <option value="paid">
                    Paid
                </option>

                <option value="pending">
                    Pending
                </option>

                <option value="completed">
                    Sudah Selesai
                </option>

                <option value="not_completed">
                    Belum Selesai
                </option>

            </select>

        </div>
    );
}