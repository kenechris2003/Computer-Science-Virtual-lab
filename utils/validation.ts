import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  matricNumber: z.string().optional(),
  department: z.string().optional(),
  level: z.number().min(100).max(500).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const exerciseSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  instructions: z.string().optional(),
  starterCode: z.string().optional(),
  expectedOutput: z.string().optional(),
  language: z.string().default("python"),
  labId: z.string(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).default("BEGINNER"),
  points: z.number().min(1).max(100).default(10),
  timeLimit: z.number().min(1).max(300).optional(),
});

export const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  bio: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  institution: z.string().optional(),
  faculty: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ExerciseInput = z.infer<typeof exerciseSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;