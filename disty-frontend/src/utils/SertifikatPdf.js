import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPdfSertifikat =
    async (sertifikatRef) => {

        try {

            const canvas =
                await html2canvas(
                    sertifikatRef.current,
                    {
                        scale: 3,
                        useCORS: true,
                    }
                );

            const imgData =
                canvas.toDataURL(
                    "image/png"
                );

            const pdf =
                new jsPDF({
                    orientation: "landscape",
                    unit: "px",
                    format: [
                        1600,
                        1131
                    ],
                });

            pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                1600,
                1131
            );

            pdf.save(
                "sertifikat-pelatihan.pdf"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Gagal download sertifikat"
            );

        }

};