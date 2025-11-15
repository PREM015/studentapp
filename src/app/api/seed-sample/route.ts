import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'john.doe@university.edu' },
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: 'Sample data already exists. Delete existing data first.',
        skipped: true,
      });
    }

    // Create sample user
    const user = await prisma.user.create({
      data: {
        email: 'john.doe@university.edu',
        name: 'John Doe',
        profileImage:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      },
    });

    // Create sample student
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        phone: '+1 (555) 123-4567',
        course: 'Computer Science',
      },
    });

    // Create sample courses
    const course1 = await prisma.course.create({
      data: {
        code: 'CS301',
        name: 'Machine Learning',
        credits: 4,
        description:
          'Comprehensive introduction to machine learning algorithms',
      },
    });

    const course2 = await prisma.course.create({
      data: {
        code: 'CS101',
        name: 'Introduction to Programming',
        credits: 3,
        description: 'Learn the basics of programming',
      },
    });

    // Enroll student in courses
    const enrollment1 = await prisma.courseEnrollment.create({
      data: {
        studentId: student.id,
        courseId: course1.id,
        grade: 'A',
      },
    });

    const enrollment2 = await prisma.courseEnrollment.create({
      data: {
        studentId: student.id,
        courseId: course2.id,
      },
    });

    // Create sample notifications
    const notification1 = await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Welcome!',
        message: 'Welcome to the Student Management System',
      },
    });

    const notification2 = await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'New Assignment Posted',
        message: 'CS301: Machine Learning Project has been posted',
      },
    });

    return NextResponse.json({
      success: true,
      message: '✅ Sample data created successfully!',
      data: {
        user: { id: user.id, email: user.email, name: user.name },
        student: { id: student.id, phone: student.phone },
        courses: [
          { id: course1.id, code: course1.code, name: course1.name },
          { id: course2.id, code: course2.code, name: course2.name },
        ],
        enrollments: [
          { id: enrollment1.id, grade: enrollment1.grade },
          { id: enrollment2.id, grade: enrollment2.grade },
        ],
        notifications: [
          { id: notification1.id, title: notification1.title },
          { id: notification2.id, title: notification2.title },
        ],
      },
    });
  } catch (error: unknown) {
    console.error('Seeding failed:', error);

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
