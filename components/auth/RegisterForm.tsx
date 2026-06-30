"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { registerSchema } from "@/utils/validation";
import toast from "react-hot-toast";

export function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    matricNumber: "",
    department: "",
    level: "100",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const submitData = {
      ...formData,
      level: formData.level ? parseInt(formData.level, 10) : undefined,
      matricNumber: formData.matricNumber || undefined,
      department: formData.department || undefined,
    };

    // Client-side Zod validation
    const validation = registerSchema.safeParse(submitData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/api/auth/register", submitData);
      const responseData = response.data;

      if (responseData.success) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/login");
      } else {
        toast.error(responseData.error || "Registration failed");
      }
    } catch (err: any) {
      console.error("Registration request error:", err);
      const message = err.response?.data?.error || "Registration failed. Please try again.";
      toast.error(message);
      
      if (err.response?.data?.details?.fieldErrors) {
        const serverFieldErrors = err.response.data.details.fieldErrors;
        const mappedErrors: Record<string, string> = {};
        Object.keys(serverFieldErrors).forEach((key) => {
          mappedErrors[key] = serverFieldErrors[key]?.[0] || "";
        });
        setErrors(mappedErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          name="firstName"
          type="text"
          placeholder="John"
          required
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          disabled={isLoading}
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
          required
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          disabled={isLoading}
        />
      </div>

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="yourname@unilag.edu.ng"
        required
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={isLoading}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Matric Number (Optional)"
          name="matricNumber"
          type="text"
          placeholder="123456789"
          value={formData.matricNumber}
          onChange={handleChange}
          error={errors.matricNumber}
          disabled={isLoading}
        />
        <Input
          label="Department (Optional)"
          name="department"
          type="text"
          placeholder="Computer Science"
          value={formData.department}
          onChange={handleChange}
          error={errors.department}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
          Level
        </label>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
        >
          <option value="100">100 Level</option>
          <option value="200">200 Level</option>
          <option value="300">300 Level</option>
          <option value="400">400 Level</option>
          <option value="500">500 Level</option>
        </select>
      </div>

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
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />
      </div>

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        required
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Create Account
      </Button>
    </form>
  );
}
