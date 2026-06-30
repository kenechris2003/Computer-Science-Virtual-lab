"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { User, Mail, GraduationCap, Building2, Camera } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-surface-900 dark:text-white">Profile</h1>

        {/* Profile Header */}
        <Card className="mb-6 text-center">
          <div className="relative mx-auto mb-4 inline-block">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-3xl font-bold text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-surface-500">{user?.email}</p>
          <div className="mt-3 flex justify-center gap-2">
            <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
              {user?.role === "LECTURER" ? "Lecturer" : "Student"}
            </span>
            <span className="rounded-full bg-surface-100 px-3 py-1 text-sm font-medium text-surface-600 dark:bg-surface-700 dark:text-surface-300">
              {user?.department || "Computer Science"}
            </span>
          </div>
        </Card>

        {/* Profile Details */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-surface-900 dark:text-white">Personal Information</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg bg-surface-50 p-3 dark:bg-surface-800">
              <User className="h-5 w-5 text-surface-400" />
              <div>
                <p className="text-xs text-surface-500">Full Name</p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-surface-50 p-3 dark:bg-surface-800">
              <Mail className="h-5 w-5 text-surface-400" />
              <div>
                <p className="text-xs text-surface-500">Email</p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-surface-50 p-3 dark:bg-surface-800">
              <GraduationCap className="h-5 w-5 text-surface-400" />
              <div>
                <p className="text-xs text-surface-500">Matric Number</p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">
                  {user?.matricNumber || "Not set"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-surface-50 p-3 dark:bg-surface-800">
              <Building2 className="h-5 w-5 text-surface-400" />
              <div>
                <p className="text-xs text-surface-500">Level</p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">
                  {user?.level || 100} Level
                </p>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 space-y-4 border-t border-surface-200 pt-6 dark:border-surface-700">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First Name" defaultValue={user?.firstName} />
                <Input label="Last Name" defaultValue={user?.lastName} />
              </div>
              <Input label="Bio" placeholder="Tell us about yourself..." />
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button variant="primary">Save Changes</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}