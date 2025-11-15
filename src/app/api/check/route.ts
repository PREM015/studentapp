import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Harmless check – does not change or insert anything
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      ok: true,
      message: "Prisma + Neon connection working",
    });
  } catch (error: unknown) {
      return NextResponse.json({
        ok: false,
        error: error.message
      });
  }
}
