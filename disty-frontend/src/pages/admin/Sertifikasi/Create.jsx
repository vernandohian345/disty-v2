import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../layouts/AdminLayout";

import SertifikasiForm from "../../../components/admin/Sertifikasi/SertifikasiForm";

import {
    createSertifikasi,
} from "../../../services/sertifikasiService";

export default function CreateSertifikasi() {

    const navigate = useNavigate();

    const handleSubmit =
        async (formData) => {

            try {

                await createSertifikasi(
                    formData
                );

                navigate(
                    "/admin/sertifikasi"
                );

            } catch (error) {

                console.log(
                    error.response.data
                );

            }

        };

    return (

        <AdminLayout>

            <div className="mb-8">

                <h1 className="text-4xl font-black">

                    Tambah Sertifikasi

                </h1>

            </div>

            <SertifikasiForm
                onSubmit={handleSubmit}
            />

        </AdminLayout>

    );
}