"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-10 bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Virtual Lab</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-surface-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">
            Sign in to access your laboratory
          </p>
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-8 shadow-lg dark:border-surface-700 dark:bg-surface-800">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary-600 hover:text-primary-700">
            Create one
          </Link>
        </p>

        <div className="mt-6 rounded-lg bg-surface-50 p-4 text-center text-xs text-surface-500 dark:bg-surface-800 dark:text-surface-400">
          <p className="font-medium mb-1">Demo Accounts</p>
          <p>Student: student@virtuallab.edu.ng / student123</p>
          <p>Lecturer: lecturer@virtuallab.edu.ng / lecturer123</p>
        </div>
      </div>
    </div>
  );
}