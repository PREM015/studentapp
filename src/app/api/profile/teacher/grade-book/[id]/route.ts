import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{ id: string }>}
) {
  try {
    const { id } = await params;
    const courseId = parseInt(id);

    const grades = await prisma.grade.findMany({
      where: { courseId },
      include: {
        student: {
          include: { user: true },
        },
        items: true,
      },
      orderBy: {
        student: {
          rollNo: 'asc',
        },
      },
    });

    return successResponse(grades);
  } catch (error) {
    return errorResponse('Failed to fetch grade book');
  }
}
