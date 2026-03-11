import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Địa chỉ server Backend
});

export default instance;
