"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-8 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Virtual Lab</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-surface-900 dark:text-white">Create Account</h1>
          <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">
            Join thousands of Nigerian CS students
          </p>
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-8 shadow-lg dark:border-surface-700 dark:bg-surface-800">
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}