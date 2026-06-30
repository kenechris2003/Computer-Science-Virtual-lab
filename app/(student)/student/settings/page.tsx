"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useThemeStore } from "@/stores/themeStore";
import { Moon, Sun, Monitor, Bell, Shield, Eye } from "lucide-react";

export default function SettingsPage() {
  const { isDark, toggle, setDark } = useThemeStore();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-surface-900 dark:text-white">Settings</h1>

        {/* Appearance */}
        <Card className="mb-6">
          <h3 className="mb-4 font-semibold text-surface-900 dark:text-white">Appearance</h3>
          <div className="space-y-3">
            <button
              onClick={() => setDark(false)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-colors ${
                !isDark
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-surface-200 hover:bg-surface-50 dark:border-surface-700 dark:hover:bg-surface-800"
              }`}
            >
              <Sun className="h-5 w-5 text-amber-500" />
              <div className="text-left">
                <p className="font-medium text-surface-900 dark:text-white">Light Mode</p>
                <p className="text-xs text-surface-500">Clean and bright interface</p>
              </div>
            </button>
            <button
              onClick={() => setDark(true)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-colors ${
                isDark
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-surface-200 hover:bg-surface-50 dark:border-surface-700 dark:hover:bg-surface-800"
              }`}
            >
              <Moon className="h-5 w-5 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-surface-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-surface-500">Easy on the eyes at night</p>
              </div>
            </button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <h3 className="mb-4 font-semibold text-surface-900 dark:text-white">Notifications</h3>
          <div className="space-y-4">
            {[
              { label: "Email Notifications", description: "Receive updates about new exercises", icon: Bell },
              { label: "Submission Alerts", description: "Get notified when your code is reviewed", icon: Monitor },
              { label: "Weekly Digest", description: "Summary of your weekly progress", icon: Eye },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-surface-400" />
                  <div>
                    <p className="font-medium text-surface-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-surface-500">{item.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="peer h-6 w-11 rounded-full bg-surface-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-full dark:bg-surface-700" />
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Security */}
        <Card>
          <h3 className="mb-4 font-semibold text-surface-900 dark:text-white">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-surface-400" />
                <div>
                  <p className="font-medium text-surface-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-xs text-surface-500">Add an extra layer of security</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-surface-400" />
                <div>
                  <p className="font-medium text-surface-900 dark:text-white">Change Password</p>
                  <p className="text-xs text-surface-500">Update your password regularly</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">Update</Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}