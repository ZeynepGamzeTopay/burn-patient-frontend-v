import axios from "axios";

const FLASK_API = process.env.REACT_APP_FLASK_API_URL;
const BACKEND_API = process.env.REACT_APP_BACKEND_API_URL;

const api = axios.create({
  baseURL: `${BACKEND_API}`,
  withCredentials: true,  // Önemli
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const loginAdmin = (url, data) => api.post(url, data);
export const loginDoctor = (url, data) => api.post(url, data);

export default api;
