import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ classid: string }> }
) {
  try {
    const {classid} = await params
    const courseId = parseInt(classid);
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date') || new Date().toISOString();

    const attendances = await prisma.attendance.findMany({
      where: {
        courseId,
        date: new Date(date),
      },
      include: {
        student: {
          include: { user: true },
        },
      },
      orderBy: {
        student: {
          rollNo: 'asc',
        },
      },
    });

    return successResponse(attendances);
  } catch (error) {
    return errorResponse('Failed to fetch attendance');
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { classid: string } }
) {
  try {
    const courseId = parseInt(params.classid);
    const body = await req.json();
    const { date, attendanceData, method } = body;

    // attendanceData: Array<{ studentId: number, status: 'present' | 'absent' | 'late' }>
    const attendanceRecords = await prisma.$transaction(async (tx) => {
      const results: any[] = [];
      const attendanceDate = new Date(date);

      for (const record of attendanceData) {
        const existing = await tx.attendance.findFirst({
          where: {
            studentId: record.studentId,
            courseId,
            date: attendanceDate,
          },
        });

        if (existing) {
          const updated = await tx.attendance.update({
            where: { id: existing.id },
            data: {
              status: record.status,
              markedAt: new Date(),
              method: method || 'Manual',
            },
          });
          results.push(updated);
        } else {
          const created = await tx.attendance.create({
            data: {
              studentId: record.studentId,
              courseId,
              date: attendanceDate,
              status: record.status,
              markedAt: new Date(),
              method: method || 'Manual',
            },
          });
          results.push(created);
        }
      }

      return results;
    });

    return successResponse(
      attendanceRecords,
      'Attendance marked successfully'
    );
  } catch (error) {
    return errorResponse('Failed to mark attendance');
  }
}