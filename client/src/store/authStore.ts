import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: localStorage.getItem("token"),
      setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
