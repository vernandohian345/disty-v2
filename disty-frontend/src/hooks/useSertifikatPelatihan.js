import {
    useEffect,
    useState,
    useRef
} from "react";

import {
    getPesertaSertifikat,
    markCompleted,
    generateSertifikat,
    regenerateSertifikat,
} from "../services/sertifikatPelatihanService";

import { downloadPdfSertifikat } from "../utils/sertifikatPdf";

export default function useSertifikatPelatihan() {

    const [loading, setLoading] =
        useState(true);

    const [peserta, setPeserta] =
        useState([]);

    const [previewData, setPreviewData] =
        useState(null);

    const [filterStatus, setFilterStatus] =
        useState("all");

    const [search, setSearch] =
        useState("");

    const sertifikatRef = useRef();

    const fetchData = async () => {

        try {

            setLoading(true);

            const response =
                await getPesertaSertifikat();

            setPeserta(
                response.data.data.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    const handleCompleted =
        async (id) => {

            try {

                await markCompleted(id);

                alert(
                    "Peserta ditandai selesai"
                );

                fetchData();

            } catch (error) {

                console.log(error);

            }

        };

    const handleGenerate =
        async (id) => {

            try {

                await generateSertifikat(id);

                alert(
                    "Sertifikat berhasil dibuat"
                );

                fetchData();

            } catch (error) {

                console.log(error);

            }

        };

    const handleDownload =
        async (item) => {

            setPreviewData(item);

            setTimeout(async () => {

                await downloadPdfSertifikat(
                    sertifikatRef
                );

            }, 300);

        };

    const handleRegenerate =
        async (id) => {

            try {

                await regenerateSertifikat(id);

                alert(
                    "Sertifikat berhasil di-regenerate"
                );

                fetchData();

            } catch (error) {

                console.log(error);

            }

        };

    const handlePreview = (item) => {

        setPreviewData(item);

    };

    const filteredPeserta =
        peserta.filter((item) => {

            if (
                filterStatus === "paid" &&
                item.status !== "paid"
            ) {
                return false;
            }

            if (
                filterStatus === "pending" &&
                item.status !== "pending"
            ) {
                return false;
            }

            if (
                filterStatus === "completed" &&
                item.status !== "completed"
            ) {
                return false;
            }

            if (
                filterStatus === "not_completed" &&
                item.status === "completed"
            ) {
                return false;
            }

            if (
                !item.nama
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            ) {
                return false;
            }

            return true;

        });

    return {
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
    };

}