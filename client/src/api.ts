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

export const loginUser = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const saveFlow = (data: {
  name: string;
  nodes: string;
  edges: string;
  user_id?: string;
}) => api.post("/flow", data);

export const getFlow = (id: number) => api.get(`/flow/${id}`);
