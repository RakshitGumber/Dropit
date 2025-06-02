import axios from "axios";

const api = axios.create({
  baseURL: "./api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = (data: any) => api.post("/users", data);
