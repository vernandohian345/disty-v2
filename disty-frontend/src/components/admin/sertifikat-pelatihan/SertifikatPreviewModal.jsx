import SertifikatTemplate from "./SertifikatTemplate";

export default function SertifikatPreviewModal({
    previewData,
    setPreviewData,
    handleDownload,
    sertifikatRef,
}) {

    if (!previewData) return null;

    return (
        <>
            {/* MODAL */}
            <div
                className="
                    fixed
                    inset-0
                    z-50
                    bg-black/70
                    flex
                    items-center
                    justify-center
                    p-5
                "
            >

                <div
                    className="
                        bg-white
                        rounded-2xl
                        overflow-auto
                        max-w-[95vw]
                        max-h-[95vh]
                        p-5
                    "
                >

                    <SertifikatTemplate
                        ref={sertifikatRef}
                        data={previewData}
                    />

                    <div
                        className="
                            flex
                            justify-end
                            gap-3
                            mt-5
                        "
                    >

                        <button
                            onClick={() =>
                                setPreviewData(null)
                            }
                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-slate-500
                                text-white
                                font-bold
                            "
                        >
                            Tutup
                        </button>

                        <button
                            onClick={() =>
                                handleDownload(previewData)
                            }
                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-blue-600
                                text-white
                                font-bold
                            "
                        >
                            Download PDF
                        </button>

                    </div>

                </div>

            </div>

            {/* HIDDEN TEMPLATE */}
            <div className="fixed -left-[9999px] top-0">

                <SertifikatTemplate
                    ref={sertifikatRef}
                    data={previewData}
                />

            </div>
        </>
    );
}