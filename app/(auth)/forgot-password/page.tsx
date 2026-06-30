"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { GraduationCap, ArrowLeft, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
    toast.success("Password reset link sent!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Virtual Lab</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-8 shadow-lg dark:border-surface-700 dark:bg-surface-800">
          {isSubmitted ? (
            <div className="text-center">
              <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
              <h2 className="mb-2 text-xl font-bold text-surface-900 dark:text-white">Check Your Email</h2>
              <p className="mb-6 text-sm text-surface-600 dark:text-surface-400">
                We&apos;ve sent a password reset link to {email}
              </p>
              <Link href="/login">
                <Button variant="primary" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="mb-2 text-2xl font-bold text-surface-900 dark:text-white">Forgot Password?</h1>
              <p className="mb-6 text-sm text-surface-600 dark:text-surface-400">
                Enter your email and we&apos;ll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu.ng"
                  required
                />
                <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
                  Send Reset Link
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
          <Link href="/login" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}