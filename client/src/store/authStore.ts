import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  user_id: string;
}

interface AuthState {
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      setUser: (user) => localStorage.setItem("user", JSON.stringify(user)),
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
