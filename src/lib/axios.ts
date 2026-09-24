import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authentication token to every request when available
api.interceptors.request.use(
  (config) => {
    const token = getToken();

   if (token) {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${token}`;
}

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle API errors in one central place
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      (error.response?.status === 400
        ? "Invalid username or password. Please try again."
        : "Something went wrong. Please try again.");

    return Promise.reject(new Error(message));
  }
);

export default api;