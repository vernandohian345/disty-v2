import axios from "axios";

const API_URL = "https://akademidistyindonesia.com/api";

export const login = async (data) => {
    return axios.post(
        `${API_URL}/login`,
        data
    );
};

export const register = async (data) => {
    return axios.post(
        `${API_URL}/register`,
        data
    );
};

export const logout = async () => {

    const token = localStorage.getItem("token");

    return axios.post(
        `${API_URL}/logout`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};