import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { company: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const jobs = await prisma.jobPosting.findMany({
      where,
      include: {
        company: true,
        requirements: true,
        skills: true,
      },
      orderBy: { postedDate: 'desc' },
    });

    return successResponse(jobs);
  } catch (error) {
    return errorResponse('Failed to fetch job listings');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const job = await prisma.jobPosting.create({
      data: {
        companyId: body.companyId,
        title: body.title,
        type: body.type,
        location: body.location,
        duration: body.duration,
        stipend: body.stipend,
        package: body.package,
        description: body.description,
        applicationDeadline: new Date(body.applicationDeadline),
        status: 'Open',
        requirements: {
          create: body.requirements?.map((req: string) => ({
            requirement: req,
          })),
        },
        skills: {
          create: body.skills?.map((skill: string) => ({ skill })),
        },
      },
      include: {
        company: true,
        requirements: true,
        skills: true,
      },
    });

    return successResponse(job, 'Job posting created successfully');
  } catch (error) {
    return errorResponse('Failed to create job posting');
  }
}

