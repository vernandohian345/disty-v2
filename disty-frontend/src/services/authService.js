import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);

  // simpan token
  localStorage.setItem("token", response.data.token);

  // simpan user
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response;
};

export const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
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
    },
  );
};
