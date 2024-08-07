import axios from "axios";

// Create an Axios instance for general use
const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor for adding authorization token
axiosServices.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && !window.location.href.includes("/auth/login")) {
      window.location.pathname = "/auth/login";
    }

    return Promise.reject(error.response?.data || "Unexpected error occurred");
  }
);

export default axiosServices;
