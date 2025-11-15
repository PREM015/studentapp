import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = parseInt(params.id);
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                schedules: true,
                assignments: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    // Get general calendar events
    const calendarEvents = await prisma.calendarEvent.findMany({
      where: {
        date: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
    });

    // Build calendar with classes, assignments, and events
    const calendar = {
      classes: student.enrollments.flatMap(e => 
        e.course.schedules.map(s => ({
          type: 'class',
          title: e.course.name,
          day: s.day,
          time: s.time,
          room: s.room,
          courseCode: e.course.code,
        }))
      ),
      assignments: student.enrollments.flatMap(e =>
        e.course.assignments.map(a => ({
          type: 'assignment',
          title: a.title,
          dueDate: a.dueDate,
          course: e.course.name,
          points: a.totalPoints,
        }))
      ),
      events: calendarEvents,
    };

    return successResponse(calendar);
  } catch (error) {
    return errorResponse('Failed to fetch calendar');
  }
}
