"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SqlPlayground } from "@/components/labs/SqlPlayground";
import { Card } from "@/components/ui/Card";

export default function DatabaseLab() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Database Lab</h1>
        <p className="text-surface-600 dark:text-surface-400">Practice SQL queries with our interactive playground</p>
      </div>
      <div className="h-[calc(100vh-12rem)] rounded-xl border border-surface-200 bg-white overflow-hidden dark:border-surface-700 dark:bg-surface-800">
        <SqlPlayground />
      </div>
    </DashboardLayout>
  );
}