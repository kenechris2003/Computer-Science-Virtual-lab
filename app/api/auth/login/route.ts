import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createToken } from "@/lib/auth/jwt";
import { loginSchema } from "@/utils/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Check for demo accounts
    if (email === "student@virtuallab.edu.ng" && password === "student123") {
      const token = await createToken({
        userId: "demo-student",
        email: "student@virtuallab.edu.ng",
        role: "STUDENT",
      });

      const response = NextResponse.json({
        success: true,
        data: {
          user: {
            id: "demo-student",
            email: "student@virtuallab.edu.ng",
            firstName: "Demo",
            lastName: "Student",
            matricNumber: "CSC/2023/001",
            role: "STUDENT",
            isVerified: true,
            avatar: null,
            department: "Computer Science",
            level: 300,
          },
          token,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        },
      });

      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    if (email === "lecturer@virtuallab.edu.ng" && password === "lecturer123") {
      const token = await createToken({
        userId: "demo-lecturer",
        email: "lecturer@virtuallab.edu.ng",
        role: "LECTURER",
      });

      const response = NextResponse.json({
        success: true,
        data: {
          user: {
            id: "demo-lecturer",
            email: "lecturer@virtuallab.edu.ng",
            firstName: "Demo",
            lastName: "Lecturer",
            matricNumber: null,
            role: "LECTURER",
            isVerified: true,
            avatar: null,
            department: "Computer Science",
            level: null,
          },
          token,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        },
      });

      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "LOGIN",
        details: { method: "email" },
        ipAddress: req.headers.get("x-forwarded-for") || (req as any).ip || undefined,
        userAgent: req.headers.get("user-agent") || undefined,
      },
    });

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          matricNumber: user.matricNumber,
          role: user.role,
          isVerified: user.isVerified,
          avatar: user.avatar,
          department: user.department,
          level: user.level,
        },
        token,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}