import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api/pelatihan";

const getToken = () => {
    return localStorage.getItem("token");
};

// ==========================
// GET ALL
// ==========================
export const getPelatihans =
    async () => {

        return await axios.get(
            API_URL,
            {
                headers: {
                    Authorization:
                        `Bearer ${getToken()}`,
                    Accept:
                        "application/json",
                },
            }
        );

    };

// ==========================
// CREATE
// ==========================
export const createPelatihan =
    async (data) => {

        return await axios.post(
            API_URL,
            data,
            {
                headers: {
                    Authorization:
                        `Bearer ${getToken()}`,
                    Accept:
                        "application/json",

                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    };

// ==========================
// UPDATE
// ==========================
export const updatePelatihan =
    async (id, data) => {

        data.append(
            "_method",
            "PUT"
        );

        return await axios.post(
            `${API_URL}/${id}`,
            data,
            {
                headers: {
                    Authorization:
                        `Bearer ${getToken()}`,
                    Accept:
                        "application/json",

                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    };

// ==========================
// DELETE
// ==========================
export const deletePelatihan =
    async (id) => {

        return await axios.delete(
            `${API_URL}/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${getToken()}`,
                    Accept:
                        "application/json",
                },
            }
        );

    };