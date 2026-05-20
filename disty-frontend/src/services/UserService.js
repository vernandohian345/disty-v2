import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api/users";

// TOKEN
const getToken = () => {
    return localStorage.getItem("token");
};

// HEADER
const authHeader = () => {
    return {
        Authorization:
            `Bearer ${getToken()}`,
        Accept: "application/json",
    };
};

// GET USERS
export const getUsers = async () => {
    return await axios.get(API_URL, {
        headers: authHeader(),
    });
};

// CREATE USER
export const createUser =
    async (data) => {

        return await axios.post(
            API_URL,
            data,
            {
                headers: authHeader(),
            }
        );

    };

// UPDATE USER
export const updateUser =
    async (id, data) => {

        return await axios.put(
            `${API_URL}/${id}`,
            data,
            {
                headers: authHeader(),
            }
        );

    };

// DELETE USER
export const deleteUser =
    async (id) => {

        return await axios.delete(
            `${API_URL}/${id}`,
            {
                headers: authHeader(),
            }
        );

    };