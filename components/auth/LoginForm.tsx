"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import apiClient from "@/lib/api/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginSchema } from "@/utils/validation";
import toast from "react-hot-toast";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate inputs with Zod client-side
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/api/auth/login", { email, password });
      const responseData = response.data;

      if (responseData.success) {
        const { user, token } = responseData.data;

        // Store token in localStorage
        localStorage.setItem("virtuallab_auth_token", token);
        
        // Update state in Zustand store
        setUser(user);
        setToken(token);

        toast.success(`Welcome back, ${user.firstName}!`);

        // Redirect based on role
        if (user.role === "STUDENT") {
          router.push("/student/dashboard");
        } else if (user.role === "LECTURER" || user.role === "ADMIN") {
          router.push("/lecturer/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(responseData.error || "Login failed");
      }
    } catch (err: any) {
      console.error("Login request error:", err);
      const message = err.response?.data?.error || "Invalid email or password. Please try again.";
      toast.error(message);
      if (err.response?.data?.details?.fieldErrors) {
        const fieldErrors = err.response.data.details.fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your university email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        disabled={isLoading}
      />

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
            Password <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={isLoading}
        />
        <div className="flex justify-end mt-2">
          <Link
            href="/forgot-password"
            className="text-xs text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
}
