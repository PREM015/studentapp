import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; cId: string } }
) {
  try {
    const studentId = parseInt(params.id);
    const courseId = parseInt(params.cId);

    const attendances = await prisma.attendance.findMany({
      where: {
        studentId,
        courseId,
      },
      include: {
        course: {
          select: {
            name: true,
            code: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    // Calculate statistics
    const total = attendances.length;
    const present = attendances.filter(a => a.status === 'present').length;
    const absent = attendances.filter(a => a.status === 'absent').length;
    const late = attendances.filter(a => a.status === 'late').length;
    const percentage = total > 0 ? (present / total) * 100 : 0;

    return successResponse({
      attendances,
      statistics: {
        total,
        present,
        absent,
        late,
        percentage: percentage.toFixed(2),
      },
    });
  } catch (error) {
    return errorResponse('Failed to fetch attendance');
  }
}
