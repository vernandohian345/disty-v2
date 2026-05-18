import axios from "axios";

const API_URL = "https://akademidistyindonesia.com/api";

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