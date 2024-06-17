import axios from "axios";

export const baseURL = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   headers: { "x-token": localStorage.getItem("token") },
});
