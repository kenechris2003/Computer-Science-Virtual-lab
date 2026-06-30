"use client";

import { cn } from "@/utils/cn";
import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data found",
  description = "There is nothing to display here yet.",
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="mb-4 rounded-full bg-surface-100 p-4 dark:bg-surface-800">
        {icon || <FileQuestion className="h-8 w-8 text-surface-400" />}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-surface-900 dark:text-surface-100">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-surface-500 dark:text-surface-400">{description}</p>
      {action}
    </div>
  );
}