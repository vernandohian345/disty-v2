import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000/api";

const getHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};

const getProfile = async () => {
  return axios.get(
    `${API_URL}/profile`,
    {
      headers: getHeaders(),
    }
  );
};

const updateProfile = async (
  data
) => {
  return axios.put(
    `${API_URL}/profile/update`,
    data,
    {
      headers: {
        ...getHeaders(),
        "Content-Type":
          "application/json",
      },
    }
  );
};

export default {
  getProfile,
  updateProfile,
};