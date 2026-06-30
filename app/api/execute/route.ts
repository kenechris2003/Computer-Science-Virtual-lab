import { NextRequest, NextResponse } from "next/server";
import { executeCode } from "@/lib/api/execute";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { code, language, stdin, provider = "piston" } = await req.json();

    if (!code || !language) {
      return NextResponse.json(
        { success: false, error: "Code and language are required" },
        { status: 400 }
      );
    }

    const result = await executeCode(code, language, stdin, provider as "judge0" | "piston");

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Execution error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Execution failed" },
      { status: 500 }
    );
  }
}