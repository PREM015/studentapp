import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get recent activities (job postings, applications, etc.)
    const recentJobs = await prisma.jobPosting.findMany({
      include: {
        company: true,
      },
      orderBy: { postedDate: 'desc' },
      take: limit,
    });

    const recentCompanies = await prisma.company.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return successResponse({
      recentJobs,
      recentCompanies,
    });
  } catch (error) {
    return errorResponse('Failed to fetch activity');
  }
}
