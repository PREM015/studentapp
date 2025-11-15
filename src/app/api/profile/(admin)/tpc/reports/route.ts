// on hold

import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reportType = searchParams.get('type'); // 'placement' | 'company' | 'student'
    const year = searchParams.get('year');

    let report: any = {};

    if (reportType === 'placement') {
      // Placement statistics
      const analytics = await prisma.analyticsSnapshot.findFirst({
        orderBy: { recordedAt: 'desc' },
      });

      const jobsByType = await prisma.jobPosting.groupBy({
        by: ['type'],
        _count: true,
        where: year
          ? {
              postedDate: {
                gte: new Date(`${year}-01-01`),
                lte: new Date(`${year}-12-31`),
              },
            }
          : undefined,
      });

      report = {
        analytics,
        jobsByType,
      };
    } else if (reportType === 'company') {
      // Company-wise report
      const companies = await prisma.company.findMany({
        include: {
          jobPostings: {
            where: year
              ? {
                  postedDate: {
                    gte: new Date(`${year}-01-01`),
                    lte: new Date(`${year}-12-31`),
                  },
                }
              : undefined,
          },
          _count: {
            select: { jobPostings: true },
          },
        },
      });

      report = { companies };
    } else if (reportType === 'student') {
      // Student placement report
      const students = await prisma.student.findMany({
        where: {
          semester: { gte: 6 },
        },
        include: {
          user: true,
          department: true,
        },
        orderBy: { cgpa: 'desc' },
      });

      report = { students };
    }

    return successResponse(report);
  } catch (error) {
    return errorResponse('Failed to generate report');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, filters, format } = body;

    // Generate report based on type and filters
    // This would typically generate a PDF or Excel file
    // For now, returning data that can be exported

    let reportData: any = {};

    if (type === 'placement-summary') {
      reportData = await prisma.analyticsSnapshot.findFirst({
        orderBy: { recordedAt: 'desc' },
      });
    } else if (type === 'student-list') {
      reportData = await prisma.student.findMany({
        where: filters?.departmentId
          ? { departmentId: filters.departmentId }
          : undefined,
        include: {
          user: true,
          department: true,
        },
      });
    }

    return successResponse(
      { data: reportData, format },
      'Report generated successfully'
    );
  } catch (error) {
    return errorResponse('Failed to generate report');
  }
}
