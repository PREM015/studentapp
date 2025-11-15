import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        users: {   // relation to User
          select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
          },
        },
        course_enrollments: {   // relation to CourseEnrollment
          include: {
            courses: {   // relation inside CourseEnrollment
              select: {
                id: true,
                code: true,
                name: true,
                credits: true,
              },
            },
          },
        },
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}
