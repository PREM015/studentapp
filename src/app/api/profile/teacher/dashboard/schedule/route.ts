import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get('teacherId');

    if (!teacherId) {
      return errorResponse('Teacher ID required', 400);
    }

    const courses = await prisma.course.findMany({
      where: {
        instructorId: parseInt(teacherId),
        status: 'Active',
      },
      include: {
        schedules: true,
        department: true,
      },
      orderBy: { name: 'asc' },
    });

    return successResponse(courses);
  } catch (error) {
    return errorResponse('Failed to fetch schedule');
  }
}