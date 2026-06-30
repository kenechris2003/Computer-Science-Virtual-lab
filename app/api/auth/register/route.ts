import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { registerSchema } from "@/utils/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, matricNumber, department, level } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    if (matricNumber) {
      const existingMatric = await prisma.user.findUnique({ where: { matricNumber } });
      if (existingMatric) {
        return NextResponse.json(
          { success: false, error: "Matric number already registered" },
          { status: 409 }
        );
      }
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        matricNumber,
        department,
        level: level || 100,
        role: "STUDENT",
        profile: {
          create: {
            institution: "University",
            faculty: "Computing",
          },
        },
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "REGISTER",
        details: { method: "email" },
        ipAddress: req.headers.get("x-forwarded-for") || (req as any).ip || undefined,
        userAgent: req.headers.get("user-agent") || undefined,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully. Please verify your email.",
        data: { userId: user.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}