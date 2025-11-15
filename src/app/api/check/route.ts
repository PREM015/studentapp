import { errorResponse, successResponse } from '@/lib/api-response';
import { getSession } from 'next-auth/react';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return errorResponse('Unauthorized', 401);
    }

    return successResponse({
      authenticated: true,
      user: session.user,
    });
  } catch (error) {
    return errorResponse('Failed to check authentication');
  }
}
