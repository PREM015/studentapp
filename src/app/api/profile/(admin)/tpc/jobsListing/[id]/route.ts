import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = parseInt(params.id);

    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId },
      include: {
        company: true,
        requirements: true,
        skills: true,
      },
    });

    if (!job) {
      return errorResponse('Job not found', 404);
    }

    return successResponse(job);
  } catch (error) {
    return errorResponse('Failed to fetch job details');
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = parseInt(params.id);
    const body = await req.json();

    const job = await prisma.jobPosting.update({
      where: { id: jobId },
      data: {
        title: body.title,
        type: body.type,
        location: body.location,
        duration: body.duration,
        stipend: body.stipend,
        package: body.package,
        description: body.description,
        applicationDeadline: body.applicationDeadline
          ? new Date(body.applicationDeadline)
          : undefined,
        status: body.status,
      },
      include: {
        company: true,
        requirements: true,
        skills: true,
      },
    });

    return successResponse(job, 'Job updated successfully');
  } catch (error) {
    return errorResponse('Failed to update job');
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = parseInt(params.id);

    await prisma.jobPosting.delete({
      where: { id: jobId },
    });

    return successResponse(null, 'Job deleted successfully');
  } catch (error) {
    return errorResponse('Failed to delete job');
  }
}
