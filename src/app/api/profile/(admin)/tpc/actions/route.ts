import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  let _action =null;
  try {
    const body = await req.json();
    const { action, entityType, entityId, data } = body;
    _action= action
    let result: any;

    switch (action) {
      case 'approve':
        if (entityType === 'company') {
          result = await prisma.company.update({
            where: { id: entityId },
            data: { status: 'Active' },
          });
        } else if (entityType === 'job') {
          result = await prisma.jobPosting.update({
            where: { id: entityId },
            data: { status: 'Open' },
          });
        }
        break;

      case 'reject':
        if (entityType === 'company') {
          result = await prisma.company.update({
            where: { id: entityId },
            data: { status: 'Inactive' },
          });
        } else if (entityType === 'job') {
          result = await prisma.jobPosting.update({
            where: { id: entityId },
            data: { status: 'Closed' },
          });
        }
        break;

      case 'close':
        if (entityType === 'job') {
          result = await prisma.jobPosting.update({
            where: { id: entityId },
            data: { status: 'Filled' },
          });
        }
        break;

      default:
        return errorResponse('Invalid action', 400);
    }

    return successResponse(result, `${action} completed successfully`);
  } catch (error) {
    return errorResponse(`Failed to perform ${_action || 'action'}`);
  }
}