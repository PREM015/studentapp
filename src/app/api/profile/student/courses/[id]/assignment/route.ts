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

    const assignments = await prisma.assignment.findMany({
      where: { courseId },
      include: {
        rubric: true,
        submissions: studentId ? {
          where: { studentId: parseInt(studentId) },
          include: {
            attachments: {
              include: { vaultFile: true },
            },
          },
        } : undefined,
      },
      orderBy: { dueDate: 'asc' },
    });

    return successResponse(assignments);
  } catch (error) {
    return errorResponse('Failed to fetch assignments');
  }
}
