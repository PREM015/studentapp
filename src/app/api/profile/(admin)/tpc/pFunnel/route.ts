import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Placement funnel showing progression through stages
    const totalStudents = await prisma.student.count({
      where: { semester: { gte: 6 } }, // Final year students
    });

    const registeredStudents = totalStudents; // Assuming all register

    const companies = await prisma.company.findMany({
      where: { status: 'Active' },
      include: {
        jobPostings: {
          include: {
            _count: true,
          },
        },
      },
    });

    const totalJobPostings = await prisma.jobPosting.count({
      where: { status: { in: ['Open', 'Filled'] } },
    });

    const placedStudents = await prisma.jobPosting.count({
      where: { status: 'Filled' },
    });

    const funnelData = {
      totalStudents,
      registeredStudents,
      companiesVisited: companies.length,
      totalJobPostings,
      applicationsReceived: await prisma.jobPosting.aggregate({
        _sum: { appliedCount: true },
      }),
      shortlisted: await prisma.jobPosting.aggregate({
        _sum: { shortlistedCount: true },
      }),
      placedStudents,
      placementRate:
        totalStudents > 0
          ? ((placedStudents / totalStudents) * 100).toFixed(2)
          : 0,
    };

    return successResponse(funnelData);
  } catch (error) {
    return errorResponse('Failed to fetch placement funnel');
  }
}
