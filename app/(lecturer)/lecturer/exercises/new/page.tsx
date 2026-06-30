"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewExercisePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    labType: "PROGRAMMING",
    difficulty: "BEGINNER",
    points: "10",
    language: "python",
    starterCode: "",
    expectedOutput: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated Save
    setTimeout(() => {
      setIsLoading(false);
      alert("Exercise created successfully!");
      router.push("/lecturer/exercises");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Back Link & Header */}
        <div className="space-y-2">
          <Link
            href="/lecturer/exercises"
            className="inline-flex items-center gap-1 text-xs font-semibold text-surface-500 hover:text-primary-600 transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Back to exercises
          </Link>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Create New Exercise</h1>
          <p className="text-surface-650 dark:text-surface-400">Define a student learning task and matching templates.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <div className="space-y-4">
              <div>
                <label className="block mb-1.5 text-xs font-bold text-surface-600 dark:text-surface-300">Exercise Title</label>
                <Input
                  required
                  name="title"
                  placeholder="e.g. Find Prime Numbers"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold text-surface-600 dark:text-surface-300">Description</label>
                <textarea
                  required
                  name="description"
                  placeholder="Write a program to..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1.5 text-xs font-bold text-surface-600 dark:text-surface-300">Lab Type</label>
                  <select
                    name="labType"
                    value={formData.labType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 focus:border-primary-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
                  >
                    <option value="PROGRAMMING">Programming Lab</option>
                    <option value="WEB_DEVELOPMENT">Web Development Lab</option>
                    <option value="DATABASE">Database Lab</option>
                    <option value="OPERATING_SYSTEMS">Operating Systems Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-bold text-surface-600 dark:text-surface-300">Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 focus:border-primary-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1.5 text-xs font-bold text-surface-600 dark:text-surface-300">Points Awarded</label>
                  <Input
                    required
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-bold text-surface-600 dark:text-surface-300">Default Programming Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 focus:border-primary-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-sm font-semibold text-surface-900 dark:text-white">Workspace Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1.5 text-xs font-bold text-surface-600 dark:text-surface-300">Starter Code</label>
                <textarea
                  name="starterCode"
                  placeholder="# Write your starter code script here"
                  value={formData.starterCode}
                  onChange={handleChange}
                  rows={4}
                  className="w-full font-mono rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold text-surface-600 dark:text-surface-300">Expected Output (for automated checks)</label>
                <textarea
                  name="expectedOutput"
                  placeholder="Expected output strings..."
                  value={formData.expectedOutput}
                  onChange={handleChange}
                  rows={2}
                  className="w-full font-mono rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Link href="/lecturer/exercises">
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </Link>
            <Button variant="primary" type="submit" isLoading={isLoading}>
              <Save className="mr-2 h-4 w-4" /> Save Exercise
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
