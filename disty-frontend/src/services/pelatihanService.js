import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api/pelatihan";

// ==========================
// TOKEN
// ==========================
const getToken = () => {
    return localStorage.getItem("token");
};

// ==========================
// HEADER
// ==========================
const authHeader = () => {
    return {
        Authorization:
            `Bearer ${getToken()}`,

        Accept:
            "application/json",
    };
};

// ==========================
// GET ALL PELATIHAN
// ==========================
export const getPelatihans =
    async () => {

        return await axios.get(
            API_URL,
            {
                headers: authHeader(),
            }
        );

    };

// ==========================
// GET DETAIL
// ==========================
export const getPelatihan =
    async (id) => {

        return await axios.get(
            `${API_URL}/${id}`,
            {
                headers: authHeader(),
            }
        );

    };

// ==========================
// CREATE PELATIHAN
// ==========================
export const createPelatihan =
    async (formData) => {

        return await axios.post(
            API_URL,
            formData,
            {
                headers: {
                    ...authHeader(),

                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    };

// ==========================
// UPDATE PELATIHAN
// ==========================
export const updatePelatihan =
    async (id, formData) => {

        return await axios.post(
            `${API_URL}/update/${id}`,
            formData,
            {
                headers: {
                    ...authHeader(),

                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    };

// ==========================
// DELETE PELATIHAN
// ==========================
export const deletePelatihan =
    async (id) => {

        return await axios.delete(
            `${API_URL}/${id}`,
            {
                headers: authHeader(),
            }
        );

    };