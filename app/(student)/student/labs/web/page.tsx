"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WebPlayground } from "@/components/labs/WebPlayground";
import { Card } from "@/components/ui/Card";

export default function WebLab() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Web Development Lab</h1>
        <p className="text-surface-600 dark:text-surface-400">Build HTML, CSS, and JavaScript projects with live preview</p>
      </div>
      <div className="h-[calc(100vh-12rem)] rounded-xl border border-surface-200 overflow-hidden dark:border-surface-700">
        <WebPlayground />
      </div>
    </DashboardLayout>
  );
}