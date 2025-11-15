import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const departments = await prisma.department.findMany({
      include: {
        achievements: true,
        _count: {
          select: {
            students: true,
            teachers: true,
            courses: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return successResponse(departments);
  } catch (error) {
    return errorResponse('Failed to fetch departments');
  }
}