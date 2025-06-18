import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${VITE_BACKEND_URL}/api/`,
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

export const createFlow = (data: {
  name: string;
  nodes: string;
  edges: string;
  user_id?: string;
}) => api.post("/flow", data);

export const getFlow = (id: any) => api.get(`/flow/${id}`);

export const getMyFlows = (id: string) => api.get(`/flow/getFlows/${id}`);

export const preregisterUser = (data: { username: string; email: string }) =>
  api.post("/join", data);
