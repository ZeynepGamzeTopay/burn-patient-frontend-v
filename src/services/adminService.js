import axios from "axios";

const FLASK_API = process.env.REACT_APP_FLASK_API_URL;
const BACKEND_API = process.env.REACT_APP_BACKEND_API_URL;

export const getAdminInfo = async () => {
  const token = localStorage.getItem("token"); // Admin giriş token'ı
  return await axios.get(`${BACKEND_API}/api/admin/info`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
