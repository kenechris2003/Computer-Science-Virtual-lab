"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LinuxTerminal } from "@/components/labs/LinuxTerminal";

export default function OsLab() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Operating Systems Lab</h1>
        <p className="text-surface-600 dark:text-surface-400">Master Linux commands in a simulated terminal environment</p>
      </div>
      <div className="h-[calc(100vh-12rem)]">
        <LinuxTerminal />
      </div>
    </DashboardLayout>
  );
}