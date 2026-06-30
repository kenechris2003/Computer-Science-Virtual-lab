"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import apiClient from "@/lib/api/client";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setToken, setLoading, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("virtuallab_auth_token");
      if (token) {
        try {
          apiClient.defaults.headers.Authorization = `Bearer ${token}`;
          const response = await apiClient.get("/api/auth/me");
          setUser(response.data.data);
          setToken(token);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [setUser, setToken, setLoading, logout]);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post("/api/auth/login", { email, password });
    const { user, token } = response.data.data;
    localStorage.setItem("virtuallab_auth_token", token);
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
    setToken(token);
    return user;
  };

  const register = async (data: any) => {
    const response = await apiClient.post("/api/auth/register", data);
    return response.data;
  };

  const logoutUser = () => {
    logout();
    router.push("/login");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout: logoutUser,
  };
}