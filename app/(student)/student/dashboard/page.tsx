"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import {
  Code2,
  Globe,
  Database,
  Terminal,
  Trophy,
  Flame,
  Clock,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Award,
} from "lucide-react";

const labs = [
  {
    id: "programming",
    title: "Programming Lab",
    description: "Python & Java coding exercises",
    icon: Code2,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    exercises: 45,
    completed: 12,
    lastAccessed: "2 hours ago",
  },
  {
    id: "web",
    title: "Web Development Lab",
    description: "HTML, CSS & JavaScript projects",
    icon: Globe,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    exercises: 30,
    completed: 8,
    lastAccessed: "1 day ago",
  },
  {
    id: "database",
    title: "Database Lab",
    description: "SQL queries & database design",
    icon: Database,
    color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    exercises: 25,
    completed: 5,
    lastAccessed: "3 days ago",
  },
  {
    id: "os",
    title: "OS Lab",
    description: "Linux commands & shell scripting",
    icon: Terminal,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    exercises: 20,
    completed: 3,
    lastAccessed: "5 days ago",
  },
];

const recentActivities = [
  { action: "Completed", target: "Hello World exercise", lab: "Programming", time: "2 hours ago", points: 5 },
  { action: "Submitted", target: "CSS Flexbox layout", lab: "Web Dev", time: "1 day ago", points: 10 },
  { action: "Started", target: "SQL JOIN queries", lab: "Database", time: "3 days ago", points: 0 },
];

export default function StudentDashboard() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              Welcome back, {user?.firstName || "Student"}! 👋
            </h1>
            <p className="text-surface-600 dark:text-surface-400">
              Here&apos;s your learning progress today
            </p>
          </div>
          <Link href="/student/labs/programming">
            <Button variant="primary">
              <Code2 className="mr-2 h-4 w-4" /> Continue Learning
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Exercises Completed", value: "28", icon: BookOpen, color: "text-blue-600" },
            { label: "Total Points", value: "340", icon: Trophy, color: "text-amber-600" },
            { label: "Day Streak", value: "5 days", icon: Flame, color: "text-red-500" },
            { label: "Hours Practiced", value: "24h", icon: Clock, color: "text-green-600" },
          ].map((stat) => (
            <Card key={stat.label} className="flex items-center gap-4">
              <div className={`rounded-lg bg-surface-100 p-3 dark:bg-surface-700 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-surface-500">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Labs Grid */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-white">Your Laboratories</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {labs.map((lab) => {
              const Icon = lab.icon;
              const progress = Math.round((lab.completed / lab.exercises) * 100);
              return (
                <Link key={lab.id} href={`/student/labs/${lab.id}`}>
                  <Card hover className="group">
                    <div className="flex items-start justify-between">
                      <div className={`rounded-xl p-3 ${lab.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="default">{progress}%</Badge>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-surface-900 dark:text-white group-hover:text-primary-600">
                      {lab.title}
                    </h3>
                    <p className="text-sm text-surface-500">{lab.description}</p>
                    <div className="mt-4">
                      <div className="mb-1 flex justify-between text-xs text-surface-500">
                        <span>{lab.completed} of {lab.exercises} exercises</span>
                        <span>{lab.lastAccessed}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-surface-100 dark:bg-surface-700">
                        <div
                          className="h-2 rounded-full bg-primary-600 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Performance */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-surface-900 dark:text-white">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg bg-surface-50 p-3 dark:bg-surface-800/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/20">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {activity.action} <span className="text-primary-600">{activity.target}</span>
                    </p>
                    <p className="text-xs text-surface-500">
                      {activity.lab} &middot; {activity.time}
                    </p>
                  </div>
                  {activity.points > 0 && (
                    <Badge variant="success">+{activity.points} pts</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <h3 className="mb-4 font-semibold text-surface-900 dark:text-white">Performance</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20">
                  <span className="text-2xl font-bold text-primary-600">B+</span>
                </div>
                <p className="text-sm font-medium text-surface-900 dark:text-white">Overall Grade</p>
                <p className="text-xs text-surface-500">Top 15% of class</p>
              </div>
              <div className="border-t border-surface-200 pt-4 dark:border-surface-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-600 dark:text-surface-400">Rank</span>
                  <span className="font-medium text-surface-900 dark:text-white">#12 of 156</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-surface-600 dark:text-surface-400">Completion</span>
                  <span className="font-medium text-surface-900 dark:text-white">34%</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-surface-600 dark:text-surface-400">Avg. Score</span>
                  <span className="font-medium text-surface-900 dark:text-white">78.5%</span>
                </div>
              </div>
              <div className="border-t border-surface-200 pt-4 dark:border-surface-700">
                <h4 className="mb-2 text-sm font-medium text-surface-900 dark:text-white">Achievements</h4>
                <div className="flex gap-2">
                  {[Trophy, Flame, Award].map((Icon, i) => (
                    <div key={i} className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/20">
                      <Icon className="h-5 w-5 text-amber-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}