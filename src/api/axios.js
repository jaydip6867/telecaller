import axios from "axios";

const API = axios.create({
  baseURL: "https://telecaller-backend.onrender.com/api",
  // baseURL: "http://localhost:4000/api",
});

// token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;