import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getDashboard = async () => {

    const token = localStorage.getItem("token");

    return await axios.get(
        `${API_URL}/dashboard`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );
};