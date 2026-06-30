"use client";

import { useAuth } from "@/hooks/useAuth";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Code2,
  Globe,
  Database,
  Terminal,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  GraduationCap
} from "lucide-react";

interface SidebarLink {
  name: string;
  href: string;
  icon: any;
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useThemeStore();
  const pathname = usePathname() || "";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getLinks = (): SidebarLink[] => {
    if (user?.role === "LECTURER") {
      return [
        { name: "Dashboard", href: "/lecturer/dashboard", icon: LayoutDashboard },
        { name: "Exercises", href: "/lecturer/exercises", icon: Code2 },
      ];
    }
    // Default Student links
    return [
      { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
      { name: "Programming Lab", href: "/student/labs/programming", icon: Code2 },
      { name: "Web Dev Lab", href: "/student/labs/web", icon: Globe },
      { name: "Database Lab", href: "/student/labs/database", icon: Database },
      { name: "OS Lab", href: "/student/labs/os", icon: Terminal },
      { name: "Profile", href: "/student/profile", icon: User },
      { name: "Settings", href: "/student/settings", icon: Settings },
    ];
  };

  const navLinks = getLinks();

  return (
    <div className="min-h-screen bg-surface-50 text-surface-900 transition-colors duration-200 dark:bg-surface-950 dark:text-surface-50">
      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-surface-200 bg-white px-4 dark:border-surface-800 dark:bg-surface-900 lg:hidden">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          <span className="font-bold text-lg tracking-tight">Virtual Lab</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-surface-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed bottom-0 top-0 left-0 z-50 flex w-64 flex-col border-r border-surface-200 bg-white transition-transform duration-300 dark:border-surface-800 dark:bg-surface-900 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center gap-2 border-b border-surface-200 px-6 dark:border-surface-800">
          <GraduationCap className="h-7 w-7 text-primary-600 dark:text-primary-400" />
          <span className="font-bold text-xl tracking-tight text-surface-900 dark:text-white">Virtual Lab</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 shadow-sm"
                    : "text-surface-600 hover:bg-surface-50 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-600 dark:text-primary-400" : "text-surface-400")} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Summary */}
        <div className="border-t border-surface-200 p-4 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 font-semibold shadow-inner">
              {user?.firstName?.charAt(0) || user?.email?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-surface-900 dark:text-white">
                {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
              </p>
              <p className="truncate text-xs text-surface-500 font-medium">
                {user?.role === "LECTURER" ? "Lecturer" : `Level ${user?.level || 100} • Student`}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-surface-200 bg-white py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-50 hover:text-red-700 focus:outline-none dark:border-surface-800 dark:bg-surface-800 dark:text-red-400 dark:hover:bg-red-950/20"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex flex-col lg:pl-64">
        {/* Desktop Topbar */}
        <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-surface-200 bg-white/80 backdrop-blur-md px-8 dark:border-surface-800 dark:bg-surface-900/80 lg:flex">
          <div className="text-sm font-medium text-surface-500">
            {pathname.includes("/student/labs")
              ? "Laboratory Environment"
              : pathname.includes("/settings")
              ? "System Configuration"
              : "Dashboard Overview"}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 transition-colors dark:text-surface-400 dark:hover:bg-surface-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="h-4 w-px bg-surface-200 dark:bg-surface-800" />
            <div className="flex items-center gap-2 text-sm font-semibold text-surface-750 dark:text-surface-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Connected
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
