import axios from "axios";

const API_URL = "http://localhost:8000/api";

// =========================
// GET TOKEN
// =========================
const getToken = () => {
    return localStorage.getItem("token");
};

// =========================
// HEADER AUTH
// =========================
const authHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: "application/json",
        },
    };
};

// =========================
// LIST PESERTA
// =========================
export const getPesertaSertifikat = async () => {

    return await axios.get(
        `${API_URL}/sertifikat-pelatihan`,
        authHeader()
    );

};

// =========================
// MARK COMPLETED
// =========================
export const markCompleted = async (id) => {

    return await axios.post(
        `${API_URL}/sertifikat-pelatihan/complete/${id}`,
        {},
        authHeader()
    );

};

// =========================
// GENERATE
// =========================
export const generateSertifikat = async (id) => {

    return await axios.post(
        `${API_URL}/sertifikat-pelatihan/generate/${id}`,
        {},
        authHeader()
    );

};

// =========================
// DOWNLOAD
// =========================
export const downloadSertifikat = async (id) => {

    return await axios.get(
        `${API_URL}/sertifikat-pelatihan/download/${id}`,
        {
            ...authHeader(),
            responseType: "blob",
        }
    );

};

// =========================
// PREVIEW
// =========================
export const previewSertifikat = async (id) => {

    return await axios.get(
        `${API_URL}/sertifikat-pelatihan/preview/${id}`,
        {
            ...authHeader(),
            responseType: "blob",
        }
    );

};

// =========================
// REGENERATE
// =========================
export const regenerateSertifikat = async (id) => {

    return await axios.post(
        `${API_URL}/sertifikat-pelatihan/regenerate/${id}`,
        {},
        authHeader()
    );

};

// =========================
// MY CERTIFICATES
// =========================
export const getMyCertificates = async () => {

    return await axios.get(
        `${API_URL}/my-certificates`,
        authHeader()
    );

};