import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

// app/api/profile/student/courses/[id]/assignment/[aid]/route.ts
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; aid: string }> }
) {
  try {
    const {aid}= await params
    const assignmentId = parseInt(aid);
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        course: {
          include: {
            instructor: {
              include: { user: true },
            },
          },
        },
        rubric: true,
        attachments: {
          include: { vaultFile: true },
        },
        submissions: studentId ? {
          where: { studentId: parseInt(studentId) },
          include: {
            attachments: {
              include: { vaultFile: true },
            },
          },
        } : undefined,
      },
    });

    if (!assignment) {
      return errorResponse('Assignment not found', 404);
    }

    return successResponse(assignment);
  } catch (error) {
    return errorResponse('Failed to fetch assignment details');
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; aid: string }>}
) {
  try {
    const {aid, id} = await params
    const assignmentId = parseInt(aid);
    const body = await req.json();
    const { studentId, attachments } = body;

    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        studentId: parseInt(studentId),
        submittedAt: new Date(),
        status: 'Submitted',
        attachments: {
          create: attachments?.map((fileId: number) => ({
            vaultFileId: fileId,
          })),
        },
      },
      include: {
        attachments: {
          include: { vaultFile: true },
        },
      },
    });

    return successResponse(submission, 'Assignment submitted successfully');
  } catch (error) {
    return errorResponse('Failed to submit assignment');
  }
}
