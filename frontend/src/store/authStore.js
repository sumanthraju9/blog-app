import { create } from "zustand";
import api from "../api/client";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isLoggedIn:
    typeof window !== "undefined"
      ? localStorage.getItem("isLoggedIn") === "true"
      : false,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  signup: async ({ username, name, email, password }) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/users/signUp", {
        username,
        name,
        email,
        password,
      });

      if (data.success) {
        set({ loading: false });
        return { success: true };
      }

      set({ loading: false, error: data.msg || "Sign up failed" });
      return { success: false };
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.message ||
        "Something went wrong while signing up";
      set({ loading: false, error: msg });
      return { success: false };
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/users/login", { email, password });

      if (data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", "true");
        }
        set({
          token: data.token,
          isLoggedIn: true,
          loading: false,
          
          user: { email },
        });
        return { success: true };
      }

      set({ loading: false, error: data.msg || "Login failed" });
      return { success: false };
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.message ||
        "Something went wrong while logging in";
      set({ loading: false, error: msg });
      return { success: false };
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    }
    set({ user: null, token: null, isLoggedIn: false });
  },
}));
