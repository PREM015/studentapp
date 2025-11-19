"use server"
import { prisma } from '@/lib/prisma';
import { AttendanceStatus, AttendanceMethod } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function markAttendanceByQR(studentId: number, qrCode: string) {
  try {
    // Validate QR code and get course session info
    // In real implementation, you'd decode the QR and validate session
    const courseId = parseInt(qrCode.slice(0, 2)); // Mock extraction
    
    // Check if attendance already exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        studentId,
        courseId,
        date: {
          gte: today,
        },
      },
    });

    if (existingAttendance) {
      return { success: false, error: 'Attendance already marked for this class' };
    }

    // Mark attendance
    await prisma.attendance.create({
      data: {
        studentId,
        courseId,
        date: new Date(),
        status: AttendanceStatus.present,
        method: AttendanceMethod.QRCode,
        markedAt: new Date(),
      },
    });

    // Update student points
    await prisma.student.update({
      where: { id: studentId },
      data: {
        points: { increment: 2 },
      },
    });

    revalidatePath('/student/attendance');
    return { success: true };
  } catch (error) {
    console.error('Error marking attendance:', error);
    return { success: false, error: 'Failed to mark attendance' };
  }
}

export async function markAttendanceByCode(studentId: number, code: string) {
  try {
    // Validate session code
    // In real implementation, you'd validate against active session codes
    const courseId = 1; // Mock course ID
    
    // Check if attendance already exists
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        studentId,
        courseId,
        date: {
          gte: today,
        },
      },
    });

    if (existingAttendance) {
      return { success: false, error: 'Attendance already marked for this class' };
    }

    // Mark attendance
    await prisma.attendance.create({
      data: {
        studentId,
        courseId,
        date: new Date(),
        status: AttendanceStatus.present,
        method: AttendanceMethod.CodeEntry,
        markedAt: new Date(),
      },
    });

    // Update student points
    await prisma.student.update({
      where: { id: studentId },
      data: {
        points: { increment: 2 },
      },
    });

    revalidatePath('/student/attendance');
    return { success: true };
  } catch (error) {
    console.error('Error marking attendance:', error);
    return { success: false, error: 'Failed to mark attendance' };
  }
}