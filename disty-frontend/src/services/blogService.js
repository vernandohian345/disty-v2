import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api/blog";

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
// GET ALL BLOG
// ==========================
export const getBlogs =
    async () => {

        return await axios.get(
            API_URL,
            {
                headers: authHeader(),
            }
        );

    };

// ==========================
// GET DETAIL
// ==========================
export const getBlog =
    async (id) => {

        return await axios.get(
            `${API_URL}/${id}`,
            {
                headers: authHeader(),
            }
        );

    };

// ==========================
// CREATE BLOG
// ==========================
export const createBlog =
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
// UPDATE BLOG
// ==========================
export const updateBlog =
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
// DELETE BLOG
// ==========================
export const deleteBlog =
    async (id) => {

        return await axios.delete(
            `${API_URL}/${id}`,
            {
                headers: authHeader(),
            }
        );

    };