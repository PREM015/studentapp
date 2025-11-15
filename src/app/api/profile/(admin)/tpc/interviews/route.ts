import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // This would typically fetch interview schedules
    // For now, returning job postings with their application counts
    const interviews = await prisma.jobPosting.findMany({
      where: {
        status: 'Open',
        shortlistedCount: { gt: 0 },
      },
      include: {
        company: true,
      },
      orderBy: { applicationDeadline: 'asc' },
    });

    return successResponse(interviews);
  } catch (error) {
    return errorResponse('Failed to fetch interviews');
  }
}