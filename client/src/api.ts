import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
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

export const updateFlow = (
  id: string,
  data: {
    name?: string;
    nodes?: string;
    edges?: string;
  }
) => api.patch(`/flow/${id}`, data);
