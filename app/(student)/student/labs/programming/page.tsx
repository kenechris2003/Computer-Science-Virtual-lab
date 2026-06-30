"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, Circle } from "lucide-react";

const exercises = [
  {
    id: "hello-world",
    title: "Hello World",
    description: "Write a Python program that prints 'Hello, World!' to the console.",
    difficulty: "BEGINNER",
    points: 5,
    starterCode: `# Write your code here`,
    language: "python",
    completed: false,
  },
  {
    id: "sum-two-numbers",
    title: "Sum of Two Numbers",
    description: "Write a program that takes two numbers as input and prints their sum.",
    difficulty: "BEGINNER",
    points: 10,
    starterCode: `# Get two numbers from user
num1 = int(input())
num2 = int(input())

# Calculate and print sum`,
    language: "python",
    completed: false,
  },
  {
    id: "even-odd",
    title: "Even or Odd",
    description: "Write a program to check if a number is even or odd.",
    difficulty: "BEGINNER",
    points: 10,
    starterCode: `number = int(input())

# Check if even or odd`,
    language: "python",
    completed: true,
  },
  {
    id: "factorial",
    title: "Factorial Calculator",
    description: "Calculate the factorial of a given number using a loop.",
    difficulty: "INTERMEDIATE",
    points: 15,
    starterCode: `n = int(input())

# Calculate factorial`,
    language: "python",
    completed: false,
  },
  {
    id: "prime-check",
    title: "Prime Number Check",
    description: "Write a program to check if a number is prime.",
    difficulty: "INTERMEDIATE",
    points: 20,
    starterCode: `number = int(input())

# Check if prime`,
    language: "python",
    completed: false,
  },
];

export default function ProgrammingLab() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const exercise = exercises[currentExercise];

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 lg:flex-row">
        {/* Exercise Panel */}
        <div className="flex w-full flex-col gap-4 lg:w-80">
          <div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white">Programming Lab</h1>
            <p className="text-sm text-surface-500">Python & Java exercises</p>
          </div>

          {/* Exercise List */}
          <div className="flex-1 overflow-y-auto rounded-xl border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-800">
            <div className="p-3">
              <p className="mb-2 text-xs font-semibold uppercase text-surface-500">Exercises</p>
              {exercises.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => setCurrentExercise(i)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors ${
                    i === currentExercise
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                      : "hover:bg-surface-50 dark:hover:bg-surface-700/50"
                  }`}
                >
                  {ex.completed ? (
                    <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-surface-400" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{ex.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={ex.difficulty === "BEGINNER" ? "success" : "warning"} size="sm">
                        {ex.difficulty}
                      </Badge>
                      <span className="text-xs text-surface-500">{ex.points} pts</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <Card padding="sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-surface-600 dark:text-surface-400">Progress</span>
              <span className="font-medium">
                {exercises.filter((e) => e.completed).length}/{exercises.length}
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-surface-100 dark:bg-surface-700">
              <div
                className="h-2 rounded-full bg-primary-600 transition-all"
                style={{ width: `${(exercises.filter((e) => e.completed).length / exercises.length) * 100}%` }}
              />
            </div>
          </Card>
        </div>

        {/* Exercise Details + Editor */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Exercise Info */}
          <Card padding="sm" className="shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-surface-900 dark:text-white">{exercise.title}</h2>
                  <Badge variant={exercise.difficulty === "BEGINNER" ? "success" : "warning"}>
                    {exercise.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400">{exercise.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentExercise === 0}
                  onClick={() => setCurrentExercise(currentExercise - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentExercise === exercises.length - 1}
                  onClick={() => setCurrentExercise(currentExercise + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Code Editor */}
          <div className="flex-1 min-h-0 rounded-xl border border-surface-200 overflow-hidden dark:border-surface-700">
            <CodeEditor
              labType="PROGRAMMING"
              exerciseId={exercise.id}
              defaultCode={exercise.starterCode}
              defaultLanguage={exercise.language}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}