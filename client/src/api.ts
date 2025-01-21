import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postName = async (name: string, email: string) => {
  try {
    const response = await api.post("/auth", {
      name: name,
      email: email,
    });
    return response.data;
  } catch (error) {
    if (error instanceof axios.AxiosError)
      console.error(
        "Error posting user:",
        error.response?.data || error.message
      );
    throw error;
  }
};
