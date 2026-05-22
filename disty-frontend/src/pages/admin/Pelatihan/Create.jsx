import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../layouts/AdminLayout";

import PelatihanForm from "../../../components/admin/pelatihan/PelatihanForm";

import { createPelatihan } from "../../../services/pelatihanService";

export default function CreatePelatihan() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createPelatihan(formData);

      navigate("/admin/pelatihan");
    } catch (error) {
      console.log(error.response.data);

      alert(JSON.stringify(error.response.data, null, 2));
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-black">Tambah Pelatihan</h1>
      </div>

      <PelatihanForm onSubmit={handleSubmit} />
    </AdminLayout>
  );
}
