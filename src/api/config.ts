import axios from "axios";

export const baseURL = axios.create({
   baseURL: "http://localhost:3000/api/",
   headers: { "x-token": localStorage.getItem("token") },
});
