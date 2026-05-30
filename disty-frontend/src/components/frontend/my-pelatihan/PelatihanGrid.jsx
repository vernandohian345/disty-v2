import PelatihanCard from "./PelatihanCard";

export default function PelatihanGrid({ data }) {
  // ========================================
  // EMPTY STATE
  // ========================================

  if (!data || data.length === 0) {
    return (
      <section className="mt-20">
        <div
          className="
            rounded-[36px]

            bg-white

            border
            border-black/5

            p-14

            text-center
          "
        >
          <h2
            className="
              text-3xl
              font-black
              text-[#2B1D16]
            "
          >
            Belum Ada Pelatihan
          </h2>

          <p
            className="
              mt-4
              text-black/50
            "
          >
            Kamu belum mengikuti kelas pelatihan apapun.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20">
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          mb-8
        "
      >
        <div>
          <h2
            className="
              text-3xl
              font-black
              text-[#2B1D16]
            "
          >
            Kelas Saya
          </h2>

          <p
            className="
              text-black/50
              mt-2
            "
          >
            Seluruh kelas yang sedang kamu pelajari.
          </p>
        </div>
      </div>

      {/* ========================================
          GRID
      ======================================== */}

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-3

          gap-8
        "
      >
        {data.map((item) => (
          <PelatihanCard key={item.id} course={item} />
        ))}
      </div>
    </section>
  );
}
