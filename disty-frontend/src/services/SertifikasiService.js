import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api/sertifikasi";

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
// GET ALL
// ==========================
export const getSertifikasis =
    async () => {

        return await axios.get(
            API_URL,
            {
                headers: authHeader(),
            }
        );

    };

// ==========================
// CREATE
// ==========================
export const createSertifikasi =
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
// UPDATE
// ==========================
export const updateSertifikasi =
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
// DELETE
// ==========================
export const deleteSertifikasi =
    async (id) => {

        return await axios.delete(
            `${API_URL}/${id}`,
            {
                headers: authHeader(),
            }
        );

    };