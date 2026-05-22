import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api/pelatihan";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => {
    return {
        Authorization:
            `Bearer ${getToken()}`,

        Accept:
            "application/json",

        "Content-Type":
            "multipart/form-data",
    };
};

export const getPelatihans =
    async () => {

        return await axios.get(
            API_URL,
            {
                headers: authHeader(),
            }
        );

    };

export const getPelatihan =
    async (id) => {

        return await axios.get(
            `${API_URL}/${id}`,
            {
                headers: authHeader(),
            }
        );

    };

export const createPelatihan =
    async (formData) => {

        return await axios.post(
            API_URL,
            formData,
            {
                headers: authHeader(),
            }
        );

    };

export const updatePelatihan =
    async (id, formData) => {

        return await axios.post(
            `${API_URL}/update/${id}`,
            formData,
            {
                headers: authHeader(),
            }
        );

    };

export const deletePelatihan =
    async (id) => {

        return await axios.delete(
            `${API_URL}/${id}`,
            {
                headers: authHeader(),
            }
        );

    };