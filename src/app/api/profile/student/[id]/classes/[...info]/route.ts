// dashboard class section reade only
import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; info: string[] } }
) {
  try {
    const studentId = parseInt(params.id);
    const [action, ...rest] = params.info;

    if (action === 'upcoming') {
      const enrollments = await prisma.enrollment.findMany({
        where: { studentId },
        include: {
          course: {
            include: {
              schedules: true,
              instructor: {
                include: { user: true },
              },
            },
          },
        },
      });

      // Get today's day and filter upcoming classes
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const upcomingClasses = enrollments.flatMap(e =>
        e.course.schedules
          .filter(s => s.day === today)
          .map(s => ({
            course: e.course,
            schedule: s,
            instructor: e.course.instructor,
          }))
      );

      return successResponse(upcomingClasses);
    }

    return errorResponse('Invalid action', 400);
  } catch (error) {
    return errorResponse('Failed to fetch classes');
  }
}