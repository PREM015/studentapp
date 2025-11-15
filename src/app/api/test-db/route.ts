import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Count records in each table
    const counts = {
      users: await prisma.user.count(),
      students: await prisma.student.count(),
      courses: await prisma.course.count(),
      notifications: await prisma.notification.count(),
      enrollments: await prisma.courseEnrollment.count(),
    };

    // Test create and delete
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@test.com`,
        name: 'Test User',
      },
    });

    await prisma.user.delete({
      where: { id: testUser.id },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: '✅ Database connection successful!',
      database: 'Neon PostgreSQL',
      counts,
      test: 'Created and deleted test user successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : error,
      },
      { status: 500 }
    );
  }
}