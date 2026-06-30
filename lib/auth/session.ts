import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { prisma } from "@/lib/db";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  if (payload.userId === "demo-student") {
    return {
      id: "demo-student",
      email: "student@virtuallab.edu.ng",
      firstName: "Demo",
      lastName: "Student",
      role: "STUDENT",
      isVerified: true,
      avatar: null,
      department: "Computer Science",
      level: 300,
    };
  }

  if (payload.userId === "demo-lecturer") {
    return {
      id: "demo-lecturer",
      email: "lecturer@virtuallab.edu.ng",
      firstName: "Demo",
      lastName: "Lecturer",
      role: "LECTURER",
      isVerified: true,
      avatar: null,
      department: "Computer Science",
      level: null,
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId as string },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isVerified: true,
      avatar: true,
      department: true,
      level: true,
    },
  });

  return user;
}

export async function requireAuth() {
  const user = await getSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireRole(role: string | string[]) {
  const user = await requireAuth();
  const roles = Array.isArray(role) ? role : [role];
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
  return user;
}