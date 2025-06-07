import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signupUser = (data: {
  username: string;
  email: string;
  password: string;
}) => api.post("/auth/signup", data);

export const loginUser = (data: any) => api.post("/auth/login", data);
