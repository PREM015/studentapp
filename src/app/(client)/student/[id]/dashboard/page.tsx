import {
  Award,
  Bell,
  BookOpen,
  Clock,
  Flame,
  Settings,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import prisma from '@/lib/prisma';

import {
  formatDistanceToNow,
  isWithinInterval,
  startOfDay,
  endOfDay,
  isAfter,
} from 'date-fns';

// ---- Helpers ----
const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length > 1) return `${parts[0][0]}${parts[parts.length - 1][0]}`;
  return name.substring(0, 2);
};

// ---- Fetch Dashboard Data ----
async function getDashboardData(studentId: number) {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  // Fetch student with user
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      user: { select: { id: true, name: true, profileImage: true } },
    },
  });

  if (!student) return null;

  const userId = student.userId;

  const [unreadNotificationCount, todaysClasses, upcomingAssignments, recentBadges] =
    await prisma.$transaction([
      // Unread notifications → belong to USER, not STUDENT
      prisma.notification.count({
        where: { userId, read: false },
      }),

      // Today's classes
      prisma.calendarEvent.findMany({
        where: {
          type: 'CLASS',
          date: { gte: todayStart, lte: todayEnd },
          course: {
            enrollments: {
              some: { studentId },
            },
          },
        },
        select: {
          id: true,
          title: true,
          startTime: true,
          endTime: true,
          location: true,
          instructor: true,
          date: true,
        },
        orderBy: { startTime: 'asc' },
        take: 5,
      }),

      // Upcoming assignments
      prisma.studentAssignment.findMany({
        where: {
          studentId,
          status: { in: ['NOT_STARTED', 'IN_PROGRESS'] },
          assignment: { dueDate: { gte: new Date() } },
        },
        include: {
          assignment: {
            include: { course: { select: { name: true } } },
          },
        },
        orderBy: { assignment: { dueDate: 'asc' } },
        take: 3,
      }),

      // Recent badges
      prisma.studentBadge.findMany({
        where: { studentId },
        orderBy: { awardedAt: 'desc' },
        take: 5,
      }),
    ]);

  // Total pending assignments count
  const pendingAssignmentsCount = await prisma.studentAssignment.count({
    where: {
      studentId,
      status: { in: ['NOT_STARTED', 'IN_PROGRESS'] },
    },
  });

  return {
    student,
    unreadNotificationCount,
    todaysClasses,
    upcomingAssignments,
    recentBadges,
    pendingAssignmentsCount,
  };
}

// ---- Page ----
export default async function StudentDashboardPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const studentId = parseInt(id, 10);
  if (isNaN(studentId)) notFound();

  const data = await getDashboardData(studentId);
  if (!data) notFound();

  const {
    student,
    unreadNotificationCount,
    todaysClasses,
    upcomingAssignments,
    recentBadges,
    pendingAssignmentsCount,
  } = data;

  const now = new Date();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage src={student.user.profileImage ?? ''} alt={student.user.name} />
            <AvatarFallback>{getInitials(student.user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-gray-500">Welcome back,</p>
            <h1 className="font-semibold text-gray-900">{student.user.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/student/${student.id}/notifications`}>
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href={`/student/${student.id}/settings`}>
              <Settings className="w-5 h-5 text-gray-600" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="p-4 md:p-6 space-y-6">
        {/* Streak Card */}
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 text-white shadow-lg">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-bold">15 Day Streak</h4>
                <p className="text-sm text-blue-100">Excellent consistency!</p>
              </div>
            </div>

            <div className="hidden sm:flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div key={i} className={`w-2 h-8 rounded-full ${i < 5 ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Attendance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.attendance.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Overall average</p>
            </CardContent>
          </Card>

          {/* Points */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.points}</div>
              <p className="text-xs text-muted-foreground">Keep earning!</p>
            </CardContent>
          </Card>

          {/* Rank */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Batch Rank</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {student.rank ? `#${student.rank}` : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">In {student.department}</p>
            </CardContent>
          </Card>

          {/* Pending Work */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Work</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAssignmentsCount}</div>
              <p className="text-xs text-muted-foreground">Assignments</p>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Classes</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {todaysClasses.length > 0 ? (
                todaysClasses.map((cls) => {
                  const dateStr = cls.date.toISOString().split('T')[0];
                  const start = new Date(`${dateStr}T${cls.startTime}`);
                  const end = cls.endTime
                    ? new Date(`${dateStr}T${cls.endTime}`)
                    : new Date(start.getTime() + 50 * 60000);

                  const isOngoing = isWithinInterval(now, { start, end });
                  const isUpcoming = isAfter(start, now);

                  return (
                    <div key={cls.id} className="flex items-center gap-4">
                      <div className="text-center w-16">
                        <p className="text-sm font-semibold">{cls.startTime}</p>
                        <p className="text-xs text-gray-500">{cls.endTime ?? ''}</p>
                      </div>

                      <div
                        className={`w-1.5 h-12 rounded-full ${
                          isOngoing
                            ? 'bg-green-500 animate-pulse'
                            : isUpcoming
                            ? 'bg-blue-500'
                            : 'bg-gray-400'
                        }`}
                      />

                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{cls.title}</h5>
                        <p className="text-sm text-gray-500">
                          {cls.location} • {cls.instructor}
                        </p>
                      </div>

                      {isOngoing && <Badge variant="destructive">Live</Badge>}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-sm text-gray-500 py-4">
                  No classes today.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader className="flex flex-row items-center">
              <CardTitle>Upcoming Assignments</CardTitle>
              <Button asChild variant="link" className="ml-auto">
                <Link href={`/student/${student.id}/assignments`}>See All</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              {upcomingAssignments.length > 0 ? (
                upcomingAssignments.map(({ assignment, status }) => (
                  <div key={assignment.id}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-xs text-blue-600 font-semibold">
                          {assignment.course.name}
                        </p>
                        <h5 className="font-medium text-gray-900 text-sm">
                          {assignment.title}
                        </h5>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-amber-600 font-medium">
                        <Clock className="w-4 h-4" />
                        <span>
                          Due{' '}
                          {formatDistanceToNow(assignment.dueDate, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>

                    {status === 'IN_PROGRESS' && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-gray-700">
                            40%
                          </span>
                        </div>
                        <Progress value={40} className="h-1.5" />
                      </div>
                    )}

                    {status === 'NOT_STARTED' && (
                      <Button asChild size="sm" className="w-full mt-2">
                        <Link href={`/assignments/${assignment.id}`}>
                          Start Now
                        </Link>
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 py-4">
                  No assignments due soon.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card>
          <CardHeader className="flex flex-row items-center">
            <CardTitle>Recent Achievements</CardTitle>
            <Button asChild variant="link" className="ml-auto">
              <Link href={`/student/${student.id}/achievements`}>View All</Link>
            </Button>
          </CardHeader>

          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
              {recentBadges.length > 0 ? (
                recentBadges.map((badge) => {
                  const isNew =
                    badge.awardedAt >
                    new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

                  return (
                    <div
                      key={badge.id}
                      className="flex-shrink-0 w-32 p-3 border border-gray-200 rounded-xl text-center relative bg-gray-50/50"
                    >
                      {isNew && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                      )}

                      <div className="text-4xl mb-2">🏆</div>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {badge.badge}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(badge.awardedAt, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-sm text-gray-500 py-4 w-full">
                  Start completing tasks to earn badges!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
