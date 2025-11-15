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

    const teacher = await prisma.teacher.findUnique({
      where: { id: parseInt(teacherId) },
      include: {
        courses: {
          include: {
            enrollments: true,
            assignments: true,
          },
        },
      },
    });

    if (!teacher) {
      return errorResponse('Teacher not found', 404);
    }

    const totalStudents = teacher.courses.reduce(
      (sum, c) => sum + c.enrollments.length,
      0
    );
    const totalAssignments = teacher.courses.reduce(
      (sum, c) => sum + c.assignments.length,
      0
    );
    const activeCourses = teacher.courses.filter(
      c => c.status === 'Active'
    ).length;

    // Get pending submissions
    const pendingSubmissions = await prisma.submission.count({
      where: {
        assignment: {
          courseId: { in: teacher.courses.map(c => c.id) },
        },
        status: 'Submitted',
        grade: null,
      },
    });

    return successResponse({
      totalStudents,
      totalCourses: teacher.courses.length,
      activeCourses,
      totalAssignments,
      pendingSubmissions,
      rating: teacher.rating,
    });
  } catch (error) {
    return errorResponse('Failed to fetch teacher overview');
  }
}
