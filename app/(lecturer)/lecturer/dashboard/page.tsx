"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  Users,
  BookOpen,
  FileText,
  TrendingUp,
  Activity,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const stats = [
  { label: "Total Students", value: "156", icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "Exercises", value: "120", icon: BookOpen, color: "bg-purple-50 text-purple-600" },
  { label: "Submissions", value: "2,340", icon: FileText, color: "bg-green-50 text-green-600" },
  { label: "Pending Reviews", value: "18", icon: AlertCircle, color: "bg-amber-50 text-amber-600" },
];

const recentSubmissions = [
  { student: "Chinedu Okonkwo", exercise: "Hello World", lab: "Programming", score: 5, status: "completed", time: "2 min ago" },
  { student: "Amina Ibrahim", exercise: "CSS Flexbox", lab: "Web Dev", score: 8, status: "completed", time: "15 min ago" },
  { student: "Emmanuel Adeyemi", exercise: "SQL JOIN", lab: "Database", score: null, status: "pending", time: "1 hour ago" },
  { student: "Fatima Bello", exercise: "Linux Commands", lab: "OS", score: 12, status: "completed", time: "2 hours ago" },
  { student: "Oluwaseun Ogunleye", exercise: "Factorial", lab: "Programming", score: null, status: "pending", time: "3 hours ago" },
];

const studentPerformance = [
  { name: "Chinedu O.", score: 92, progress: 85 },
  { name: "Amina I.", score: 88, progress: 78 },
  { name: "Emmanuel A.", score: 76, progress: 65 },
  { name: "Fatima B.", score: 95, progress: 92 },
  { name: "Oluwaseun O.", score: 71, progress: 58 },
];

export default function LecturerDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Lecturer Dashboard</h1>
            <p className="text-surface-600 dark:text-surface-400">Manage your students and monitor their progress</p>
          </div>
          <div className="flex gap-3">
            <Link href="/lecturer/exercises">
              <Button variant="secondary">
                <BookOpen className="mr-2 h-4 w-4" /> Manage Exercises
              </Button>
            </Link>
            <Link href="/lecturer/exercises/new">
              <Button variant="primary">
                <GraduationCap className="mr-2 h-4 w-4" /> Create Exercise
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="flex items-center gap-4">
              <div className={`rounded-xl p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-surface-500">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Submissions */}
          <Card className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-surface-900 dark:text-white">Recent Submissions</h3>
              <Link href="/lecturer/submissions">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-200 text-left dark:border-surface-700">
                    <th className="pb-3 font-medium text-surface-500">Student</th>
                    <th className="pb-3 font-medium text-surface-500">Exercise</th>
                    <th className="pb-3 font-medium text-surface-500">Lab</th>
                    <th className="pb-3 font-medium text-surface-500">Score</th>
                    <th className="pb-3 font-medium text-surface-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((sub, i) => (
                    <tr key={i} className="border-b border-surface-100 dark:border-surface-800">
                      <td className="py-3 font-medium text-surface-900 dark:text-white">{sub.student}</td>
                      <td className="py-3 text-surface-600 dark:text-surface-400">{sub.exercise}</td>
                      <td className="py-3">
                        <Badge variant="default" size="sm">{sub.lab}</Badge>
                      </td>
                      <td className="py-3 font-medium">
                        {sub.score !== null ? `${sub.score}/20` : "—"}
                      </td>
                      <td className="py-3">
                        <Badge variant={sub.status === "completed" ? "success" : "warning"} size="sm">
                          {sub.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Student Performance */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-surface-900 dark:text-white">Top Students</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-4">
              {studentPerformance.map((student, i) => (
                <div key={i}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-surface-900 dark:text-white">{student.name}</span>
                    <span className="text-surface-500">{student.score}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-100 dark:bg-surface-700">
                    <div
                      className="h-2 rounded-full bg-primary-600 transition-all"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-surface-200 pt-4 dark:border-surface-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-surface-600 dark:text-surface-400">Class Average</span>
                <span className="font-bold text-surface-900 dark:text-white">84.4%</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-surface-600 dark:text-surface-400">Completion Rate</span>
                <span className="font-bold text-surface-900 dark:text-white">75.6%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Overview */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-surface-900 dark:text-white">Weekly Activity</h3>
            <Activity className="h-5 w-5 text-primary-600" />
          </div>
          <div className="grid gap-4 sm:grid-cols-7">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const activity = [45, 62, 38, 55, 78, 30, 25][i];
              return (
                <div key={day} className="text-center">
                  <div className="mb-2 flex h-32 items-end justify-center rounded-lg bg-surface-100 dark:bg-surface-800">
                    <div
                      className="w-full rounded-t-lg bg-primary-500 transition-all"
                      style={{ height: `${activity}%` }}
                    />
                  </div>
                  <p className="text-xs font-medium text-surface-600 dark:text-surface-400">{day}</p>
                  <p className="text-xs text-surface-500">{activity} submissions</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}