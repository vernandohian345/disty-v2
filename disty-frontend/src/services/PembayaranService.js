import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api";

const getToken = () =>
    localStorage.getItem("token");

// ======================
// GET PEMBAYARAN
// ======================
export const getPembayaran =
    async (
        type = "pelatihan",
        status = "all"
    ) => {

        return await axios.get(
            `${API_URL}/pembayaran?type=${type}&status=${status}`,
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

// ======================
// APPROVE
// ======================
export const approvePembayaran =
    async (type, id) => {

        return await axios.post(
            `${API_URL}/pembayaran/${type}/${id}/approve`,
            {},
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

// ======================
// REJECT
// ======================
export const rejectPembayaran =
    async (type, id) => {

        return await axios.post(
            `${API_URL}/pembayaran/${type}/${id}/reject`,
            {},
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