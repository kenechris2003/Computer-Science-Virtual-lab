export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  matricNumber?: string | null;
  role: "STUDENT" | "LECTURER" | "ADMIN";
  isVerified: boolean;
  avatar?: string | null;
  department?: string | null;
  level?: number | null;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  bio?: string | null;
  phone?: string | null;
  address?: string | null;
  institution: string;
  faculty: string;
  preferences?: Record<string, any>;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  level: number;
  semester: number;
  creditUnits: number;
  isActive: boolean;
}

export interface Laboratory {
  id: string;
  title: string;
  description?: string | null;
  type: "PROGRAMMING" | "WEB_DEVELOPMENT" | "DATABASE" | "OPERATING_SYSTEMS";
  courseId?: string | null;
  isActive: boolean;
  orderIndex: number;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions?: string | null;
  starterCode?: string | null;
  expectedOutput?: string | null;
  testCases?: any[];
  language?: string | null;
  labId: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  points: number;
  timeLimit?: number | null;
  isPublished: boolean;
  submissions?: Submission[];
}

export interface Submission {
  id: string;
  userId: string;
  exerciseId: string;
  code: string;
  output?: string | null;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "TIMEOUT" | "ERROR";
  score?: number | null;
  executionTime?: number | null;
  memoryUsed?: number | null;
  errorMessage?: string | null;
  submittedAt: string;
  reviewedAt?: string | null;
  feedback?: string | null;
}

export interface SavedCode {
  id: string;
  userId: string;
  title?: string | null;
  language: string;
  code: string;
  labType: "PROGRAMMING" | "WEB_DEVELOPMENT" | "DATABASE" | "OPERATING_SYSTEMS";
  exerciseId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "SUBMISSION" | "EXERCISE";
  isRead: boolean;
  link?: string | null;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details?: Record<string, any>;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
}

export interface CodeExecutionResult {
  stdout: string;
  stderr: string;
  compile_output?: string;
  message?: string;
  status?: {
    id: number;
    description: string;
  };
  time?: string;
  memory?: number;
  token?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalExercises: number;
  totalSubmissions: number;
  pendingReviews: number;
  averageScore: number;
  recentActivity: ActivityLog[];
}

export interface StudentStats {
  totalExercises: number;
  completedExercises: number;
  averageScore: number;
  totalPoints: number;
  rank: number;
  streak: number;
  recentSubmissions: Submission[];
  savedCodeCount: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  matricNumber?: string;
  department?: string;
  level?: number;
}

export interface TerminalCommand {
  command: string;
  output: string;
  timestamp: number;
}

export interface EditorState {
  code: string;
  language: string;
  output: string;
  isRunning: boolean;
  lastSaved: string | null;
  executionTime: number | null;
}