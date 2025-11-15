import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id);
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        instructor: {
          include: { user: true },
        },
        department: true,
        schedules: true,
        assignments: {
          include: {
            submissions: studentId ? {
              where: { studentId: parseInt(studentId) },
            } : undefined,
          },
        },
        enrollments: studentId ? {
          where: { studentId: parseInt(studentId) },
        } : undefined,
      },
    });

    if (!course) {
      return errorResponse('Course not found', 404);
    }

    return successResponse(course);
  } catch (error) {
    return errorResponse('Failed to fetch course details');
  }
}
