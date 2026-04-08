import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/login", { email, password });
          const { token, user } = response.data.data;

          set({ user, token, isLoading: false });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Login failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/register", {
            name,
            email,
            password,
          });
          const { token, user } = response.data.data;

          set({ user, token, isLoading: false });
          return { success: true };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Registration failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      checkAuth: async () => {
        const token = get().token;
        if (!token) return;

        set({ isLoading: true });
        try {
          const response = await api.get("/auth/me");
          set({ user: response.data.data.user, isLoading: false });
        } catch (error) {
          set({ user: null, token: null, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export { useAuthStore };
