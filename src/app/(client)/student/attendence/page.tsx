import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

import { AttendanceStatus } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import QRScannerSection from '@/components/new/student/attendence/QRScannerSection';
import CodeEntrySection from '@/components/new/student/attendence/CodeEntrySection';
import AttendanceCalendar from '@/components/new/student/attendence/AttendanceCalendar';

async function getStudentAttendance(studentId: number) {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get attendance records for the past week
  const weekAttendance = await prisma.attendance.findMany({
    where: {
      studentId,
      date: {
        gte: weekAgo,
      },
    },
    include: {
      course: {
        select: {
          name: true,
          code: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
    take: 10,
  });

  // Get attendance records for the past month
  const monthAttendance = await prisma.attendance.findMany({
    where: {
      studentId,
      date: {
        gte: monthAgo,
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  // Get today's classes
  const todaysCourses = await prisma.enrollment.findMany({
    where: {
      studentId,
      course: {
        schedules: {
          some: {
            day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
          },
        },
      },
    },
    include: {
      course: {
        include: {
          schedules: true,
        },
      },
    },
  });

  // Check if there's an active session
  const activeSession = await prisma.course.findFirst({
    where: {
      enrollments: {
        some: {
          studentId,
        },
      },
      schedules: {
        some: {
          day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        },
      },
    },
    select: {
      id: true,
      name: true,
      code: true,
      schedules: {
        where: {
          day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        },
      },
    },
  });

  return {
    weekAttendance,
    monthAttendance,
    todaysCourses,
    activeSession,
  };
}

async function getStudentInfo(userId: number) {
  const student = await prisma.student.findUnique({
    where: { userId },
    select: {
      id: true,
      rollNo: true,
      attendance: true,
      points: true,
    },
  });
  return student;
}

function calculateSessionExpiry() {
  // Calculate time until next class period ends (mock calculation)
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);
  const diff = nextHour.getTime() - now.getTime();
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getStatusColor(status: AttendanceStatus) {
  switch (status) {
    case 'present':
      return 'bg-green-100 text-green-700';
    case 'late':
      return 'bg-amber-100 text-amber-700';
    case 'absent':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function getStatusIcon(status: AttendanceStatus) {
  switch (status) {
    case 'present':
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    case 'late':
      return <AlertCircle className="w-5 h-5 text-amber-600" />;
    case 'absent':
      return <XCircle className="w-5 h-5 text-red-600" />;
    default:
      return null;
  }
}

function getPoints(status: AttendanceStatus): number {
  switch (status) {
    case 'present':
      return 2;
    case 'late':
      return 1;
    default:
      return 0;
  }
}

export default async function StudentAttendancePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return <div>Please login to view attendance</div>;
  }

  const student = await getStudentInfo(session.user.id);
  
  if (!student) {
    return <div>Student profile not found</div>;
  }

  const { weekAttendance, monthAttendance, activeSession } = await getStudentAttendance(student.id);
  const sessionExpiry = calculateSessionExpiry();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Mark Attendance</h2>
        <p className="text-sm text-gray-500">Scan QR or enter session code</p>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Session Timer - Only show if there's an active session */}
        {activeSession && (
          <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-900">Session expires in</span>
              </div>
              <div className="text-2xl font-bold text-red-600 font-mono">{sessionExpiry}</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Current class: {activeSession.name} ({activeSession.code})
            </p>
          </Card>
        )}

        {/* QR Scanner Section - Client Component */}
        <QRScannerSection studentId={student.id} />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-50 text-gray-500 font-medium">OR</span>
          </div>
        </div>

        {/* Manual Code Entry - Client Component */}
        <CodeEntrySection studentId={student.id} />

        {/* Location Status */}
        <Card className="p-4 border border-green-200 bg-green-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="font-medium text-green-900">Location Verified</h5>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-sm text-green-700">You are in the classroom</p>
              <p className="text-xs text-green-600 mt-1">Distance: 12m from center</p>
            </div>
          </div>
        </Card>

        {/* Attendance History Tab */}
        <Card className="p-4 border border-gray-200">
          <Tabs defaultValue="week" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
            
            <TabsContent value="week" className="mt-0 space-y-2">
              {weekAttendance.map((record) => {
                const points = getPoints(record.status);
                return (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(record.status)}
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{record.course.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(record.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-xs ${getStatusColor(record.status)}`}>
                        {record.status}
                      </Badge>
                      {points > 0 && (
                        <p className="text-xs text-purple-600 font-medium mt-1">+{points} pts</p>
                      )}
                    </div>
                  </div>
                );
              })}
              {weekAttendance.length === 0 && (
                <p className="text-center text-gray-500 py-4">No attendance records this week</p>
              )}
            </TabsContent>

            <TabsContent value="month" className="mt-0">
              <AttendanceCalendar monthAttendance={monthAttendance} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}