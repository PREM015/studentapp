import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{ id: string }>}
) {
  try {
    const {id} = await params
    const deptId = Number(id);

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
