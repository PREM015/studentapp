import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test connection
    await prisma.$connect();

    // Count all main tables
    const counts = {
      users: await prisma.user.count(),
      students: await prisma.student.count(),
      courses: await prisma.course.count(),
      notifications: await prisma.notification.count(),
      enrollments: await prisma.courseEnrollment.count(),
    };

    // --- Test Create + Delete User ---
    // Your User model requires createdAt & updatedAt
    // Prisma auto-fills them, so no need to add manually.

    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@test.com`,
        name: 'Test User',
        profileImage: null, // if field is optional
      },
    });

    // Delete test user
    await prisma.user.delete({
      where: { id: testUser.id },
    });

    // Disconnect
    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: '✅ Database connection successful!',
      database: 'Neon PostgreSQL',
      counts,
      test: 'Created and deleted a test user successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database test failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}
