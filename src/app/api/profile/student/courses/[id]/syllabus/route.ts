// info m1, m2 
// [m1.notes, m1.tut, m1.problem ]
import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id);

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        name: true,
        code: true,
        syllabus: true,
        description: true,
        credits: true,
        instructor: {
          include: { user: true },
        },
      },
    });

    if (!course) {
      return errorResponse('Course not found', 404);
    }

    return successResponse(course);
  } catch (error) {
    return errorResponse('Failed to fetch syllabus');
  }
}