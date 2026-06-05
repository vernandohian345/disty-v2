import AdminLayout from "../../layouts/AdminLayout";

import SertifikatStats from "../../components/admin/sertifikat-pelatihan/SertifikatStats";
import SertifikatFilter from "../../components/admin/sertifikat-pelatihan/SertifikatFilter";
import SertifikatTable from "../../components/admin/sertifikat-pelatihan/SertifikatTable";
import SertifikatPreviewModal from "../../components/admin/sertifikat-pelatihan/SertifikatPreviewModal";

import useSertifikatPelatihan from "../../hooks/useSertifikatPelatihan";

export default function SertifikatPelatihan() {
  const {
    loading,
    peserta,
    previewData,
    setPreviewData,
    filterStatus,
    setFilterStatus,
    search,
    setSearch,
    filteredPeserta,
    handleCompleted,
    handleGenerate,
    handleDownload,
    handleRegenerate,
    handlePreview,
    sertifikatRef,
  } = useSertifikatPelatihan();

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-800">
            Sertifikat Pelatihan
          </h1>

          <p className="text-slate-500 mt-2">Generate sertifikat peserta</p>
        </div>
      </div>

      {/* STATS */}
      <SertifikatStats peserta={peserta} />

      {/* FILTER */}
      <SertifikatFilter
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* TABLE */}
      <SertifikatTable
        loading={loading}
        peserta={filteredPeserta}
        handleCompleted={handleCompleted}
        handleGenerate={handleGenerate}
        handlePreview={handlePreview}
        handleDownload={handleDownload}
        handleRegenerate={handleRegenerate}
      />

      {/* PREVIEW MODAL */}
      <SertifikatPreviewModal
        previewData={previewData}
        setPreviewData={setPreviewData}
        handleDownload={handleDownload}
        sertifikatRef={sertifikatRef}
      />
    </AdminLayout>
  );
}
