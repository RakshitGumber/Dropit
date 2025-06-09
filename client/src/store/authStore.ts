import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  user_id: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: JSON.parse(localStorage.getItem("user") || "null"),
      setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
      },
      token: localStorage.getItem("token"),
      setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
      },
      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ token: null, user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
