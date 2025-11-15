import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const analytics = await prisma.analyticsSnapshot.findFirst({
      orderBy: { recordedAt: 'desc' },
    });

    const activeJobs = await prisma.jobPosting.count({
      where: { status: 'Open' },
    });

    const totalCompanies = await prisma.company.count();

    const recentPlacements = await prisma.jobPosting.findMany({
      where: { status: 'Filled' },
      include: { company: true },
      orderBy: { postedDate: 'desc' },
      take: 10,
    });

    return successResponse({
      analytics,
      activeJobs,
      totalCompanies,
      recentPlacements,
    });
  } catch (error) {
    return errorResponse('Failed to fetch TPC dashboard');
  }
}
