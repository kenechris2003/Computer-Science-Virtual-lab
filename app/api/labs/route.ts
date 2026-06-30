import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const labs = await prisma.laboratory.findMany({
      where: { isActive: true },
      include: {
        exercises: {
          where: { isPublished: true },
          select: {
            id: true,
            title: true,
            difficulty: true,
            points: true,
          },
        },
        course: true,
      },
      orderBy: { orderIndex: "asc" },
    });

    return NextResponse.json({ success: true, data: labs });
  } catch (error) {
    console.error("Get labs error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}