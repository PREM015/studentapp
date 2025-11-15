import { errorResponse, successResponse } from '@/lib/api-response';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get('departmentId');
    const semester = searchParams.get('semester');
    const search = searchParams.get('search');

    const where: any = {};
    
    if (departmentId) where.departmentId = parseInt(departmentId);
    if (semester) where.semester = parseInt(semester);
    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { rollNo: { contains: search, mode: 'insensitive' } },
      ];
    }

    const students = await prisma.student.findMany({
      where,
      include: {
        user: true,
        department: true,
        badges: true,
      },
      orderBy: { rank: 'asc' },
    });

    return successResponse(students);
  } catch (error) {
    return errorResponse('Failed to fetch students');
  }
}
