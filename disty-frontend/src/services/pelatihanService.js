import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/pelatihan";

export const getPelatihans = async () => {
    return await axios.get(API_URL);
};

export const deletePelatihan = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};