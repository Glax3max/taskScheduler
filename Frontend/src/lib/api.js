import axios from "axios";
import { getToken } from "./auth.js";

/**
 * Shared API client.
 *
 * Set `VITE_API_BASE_URL` to match your backend, e.g.:
 *   VITE_API_BASE_URL=http://localhost:5000/api/v1
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

