import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = parseInt(params.id);

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        department: true,
        badges: true,
        enrollments: {
          include: {
            course: {
              include: {
                instructor: {
                  include: { user: true },
                },
              },
            },
          },
        },
        grades: {
          include: {
            course: true,
            items: true,
          },
        },
      },
    });

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    return successResponse(student);
  } catch (error) {
    return errorResponse('Failed to fetch student profile');
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = parseInt(params.id);
    const body = await req.json();

    const student = await prisma.student.update({
      where: { id: studentId },
      data: {
        phone: body.phone,
        address: body.address,
        guardianName: body.guardianName,
        guardianPhone: body.guardianPhone,
        user: {
          update: {
            name: body.name,
            profileImage: body.profileImage,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return successResponse(student, 'Profile updated successfully');
  } catch (error) {
    return errorResponse('Failed to update profile');
  }
}
