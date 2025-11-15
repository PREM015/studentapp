import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const userCount = await prisma.user.count();
    const studentCount = await prisma.student.count();
    const teacherCount = await prisma.teacher.count();
    const courseCount = await prisma.course.count();

    return successResponse({
      connected: true,
      counts: {
        users: userCount,
        students: studentCount,
        teachers: teacherCount,
        courses: courseCount,
      },
    });
  } catch (error) {
    return errorResponse('Database connection failed');
  }
}