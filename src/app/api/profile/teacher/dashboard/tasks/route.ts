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

    // Get courses taught by teacher
    const courses = await prisma.course.findMany({
      where: { instructorId: parseInt(teacherId) },
      select: { id: true },
    });

    const courseIds = courses.map(c => c.id);

    // Get pending grading tasks
    const pendingGrading = await prisma.submission.findMany({
      where: {
        assignment: {
          courseId: { in: courseIds },
        },
        status: 'Submitted',
        grade: null,
      },
      include: {
        assignment: {
          include: { course: true },
        },
        student: {
          include: { user: true },
        },
      },
      orderBy: { submittedAt: 'asc' },
    });

    // Get upcoming assignments
    const upcomingAssignments = await prisma.assignment.findMany({
      where: {
        courseId: { in: courseIds },
        dueDate: { gte: new Date() },
      },
      include: { course: true },
      orderBy: { dueDate: 'asc' },
      take: 10,
    });

    return successResponse({
      pendingGrading,
      upcomingAssignments,
    });
  } catch (error) {
    return errorResponse('Failed to fetch tasks');
  }
}
