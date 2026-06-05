export default function SertifikatStats({ peserta }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {/* TOTAL */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h5 className="text-slate-500 text-sm">Total Peserta</h5>
        <h2 className="text-3xl font-black mt-2">{peserta.length}</h2>
      </div>

      {/* PAID */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h5 className="text-slate-500 text-sm">Paid</h5>
        <h2 className="text-3xl font-black text-green-600 mt-2">
          {peserta.filter((item) => item.status === "paid").length}
        </h2>
      </div>

      {/* BELUM */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h5 className="text-slate-500 text-sm">Belum Selesai</h5>

        <h2 className="text-3xl font-black text-orange-500 mt-2">
          {peserta.filter((item) => item.status !== "completed").length}
        </h2>
      </div>

      {/* SERTIFIKAT */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h5 className="text-slate-500 text-sm">Sudah Bersertifikat</h5>
        <h2 className="text-3xl font-black text-blue-600 mt-2">
          {peserta.filter((item) => item.sertifikat_pelatihan).length}
        </h2>
      </div>
    </div>
  );
}
