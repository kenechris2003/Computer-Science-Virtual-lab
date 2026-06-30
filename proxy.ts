import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password"];
const STUDENT_ROUTES = ["/student"];
const LECTURER_ROUTES = ["/lecturer"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow static files and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Check auth token
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based routing
  const role = payload.role as string;

  if (LECTURER_ROUTES.some((route) => pathname.startsWith(route)) && role !== "LECTURER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }

  if (STUDENT_ROUTES.some((route) => pathname.startsWith(route)) && role !== "STUDENT" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/lecturer/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};