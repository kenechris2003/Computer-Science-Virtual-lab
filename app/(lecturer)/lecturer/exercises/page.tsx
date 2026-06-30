"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { useState } from "react";
import { Plus, Search, Filter, BookOpen, Edit2, Trash2, ExternalLink } from "lucide-react";

// Mock exercises list
const initialExercises = [
  {
    id: "hello-world",
    title: "Hello World",
    lab: "Programming",
    difficulty: "BEGINNER",
    points: 5,
    language: "python",
    status: "Published"
  },
  {
    id: "sum-two-numbers",
    title: "Sum of Two Numbers",
    lab: "Programming",
    difficulty: "BEGINNER",
    points: 10,
    language: "python",
    status: "Published"
  },
  {
    id: "even-odd",
    title: "Even or Odd",
    lab: "Programming",
    difficulty: "BEGINNER",
    points: 10,
    language: "python",
    status: "Published"
  },
  {
    id: "factorial",
    title: "Factorial Calculator",
    lab: "Programming",
    difficulty: "INTERMEDIATE",
    points: 15,
    language: "python",
    status: "Published"
  },
  {
    id: "prime-check",
    title: "Prime Number Check",
    lab: "Programming",
    difficulty: "INTERMEDIATE",
    points: 20,
    language: "python",
    status: "Draft"
  }
];

export default function ExercisesPage() {
  const [exercises, setExercises] = useState(initialExercises);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = exercises.filter(ex =>
    ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.lab.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      setExercises(exercises.filter(ex => ex.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Manage Exercises</h1>
            <p className="text-surface-600 dark:text-surface-400">View, edit, and create student lab exercises</p>
          </div>
          <Link href="/lecturer/exercises/new">
            <Button variant="primary">
              <Plus className="mr-2 h-4 w-4" /> New Exercise
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" padding="sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search exercises by title or lab type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-surface-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-primary-500 dark:border-surface-700 dark:bg-surface-800"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-1.5 h-3.5 w-3.5" /> Filter
            </Button>
          </div>
        </Card>

        {/* Exercises Table */}
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-surface-200 bg-surface-50/75 dark:border-surface-700 dark:bg-surface-800/40">
                  <th className="px-6 py-4 font-semibold text-surface-700 dark:text-surface-300">Exercise Info</th>
                  <th className="px-6 py-4 font-semibold text-surface-700 dark:text-surface-300">Lab Type</th>
                  <th className="px-6 py-4 font-semibold text-surface-700 dark:text-surface-300">Difficulty</th>
                  <th className="px-6 py-4 font-semibold text-surface-700 dark:text-surface-300">Points</th>
                  <th className="px-6 py-4 font-semibold text-surface-700 dark:text-surface-300">Status</th>
                  <th className="px-6 py-4 font-semibold text-surface-700 dark:text-surface-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-750">
                {filteredExercises.length > 0 ? (
                  filteredExercises.map((ex) => (
                    <tr key={ex.id} className="hover:bg-surface-50/50 dark:hover:bg-surface-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-surface-900 dark:text-white">{ex.title}</div>
                        <div className="text-xs text-surface-500 capitalize">{ex.language}</div>
                      </td>
                      <td className="px-6 py-4 text-surface-650 dark:text-surface-300 font-medium">
                        {ex.lab}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={ex.difficulty === "BEGINNER" ? "success" : "warning"}>
                          {ex.difficulty}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-mono text-surface-650 dark:text-surface-300">
                        {ex.points} pts
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          ex.status === "Published"
                            ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                            : "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400"
                        }`}>
                          {ex.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            title="Edit"
                            className="rounded p-1.5 text-surface-500 hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-white transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(ex.id)}
                            title="Delete"
                            className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-surface-450 select-none">
                      <BookOpen className="mx-auto h-8 w-8 text-surface-300 mb-2 stroke-1" />
                      No exercises found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
