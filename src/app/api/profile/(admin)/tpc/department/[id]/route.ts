import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const deptId = Number(context.params.id);

    if (isNaN(deptId)) {
      return errorResponse("Invalid department ID", 400);
    }

    const department = await prisma.department.findUnique({
      where: { id: deptId },
      include: {
        achievements: true,
        students: {
          include: {
            user: true,
            badges: true,
          },
          orderBy: { cgpa: "desc" },
        },
        teachers: {
          include: {
            user: true,
            specializations: true,
          },
        },
        courses: {
          include: {
            instructor: {
              include: { user: true },
            },
          },
        },
      },
    });

    if (!department) {
      return errorResponse("Department not found", 404);
    }

    return successResponse(department);
  } catch (error) {
    console.error("GET /department/[id] error:", error);
    return errorResponse("Failed to fetch department details", 500);
  }
}
