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
// MY SERTIFIKASI
// =========================
export const getMySertifikasi = async () => {
  return await axios.get(
    `${API_URL}/my-certification-certificates`,
    authHeader(),
  );
};
