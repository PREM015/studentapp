import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import CalendarHeader from '@/components/new/student/calendar/CalendarHeader';
import CalendarGrid from '@/components/new/student/calendar/CalendarHeader'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function getStudentId(userId: number) {
  const student = await prisma.student.findUnique({
    where: { userId },
    select: { id: true }
  });
  return student?.id;
}

async function getCalendarData(studentId: number, year: number, month: number) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

  // Get classes from enrolled courses
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId },
    include: {
      course: {
        include: {
          schedules: true,
          instructor: {
            include: { user: true }
          }
        }
      }
    }
  });

  // Get assignments due this month
  const assignments = await prisma.assignment.findMany({
    where: {
      course: {
        enrollments: {
          some: { studentId }
        }
      },
      dueDate: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      course: true,
      submissions: {
        where: { studentId }
      }
    },
    orderBy: { dueDate: 'asc' }
  });

  // Get events for this month
  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      registrations: {
        where: { studentId }
      }
    },
    orderBy: { date: 'asc' }
  });

  // Get calendar events
  const calendarEvents = await prisma.calendarEvent.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    orderBy: { date: 'asc' }
  });

  return {
    enrollments,
    assignments,
    events,
    calendarEvents
  };
}

function getDayEvents(
  day: number,
  month: number,
  year: number,
  data: Awaited<ReturnType<typeof getCalendarData>>
) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  
  const dayEvents = {
    classes: [] as any[],
    assignments: [] as any[],
    events: [] as any[],
    calendarEvents: [] as any[]
  };

  // Get classes for this day
  data.enrollments.forEach(enrollment => {
    enrollment.course.schedules
      .filter(schedule => schedule.day === dayOfWeek)
      .forEach(schedule => {
        dayEvents.classes.push({
          id: `class-${enrollment.course.id}-${schedule.id}`,
          title: enrollment.course.name,
          time: schedule.time,
          room: schedule.room,
          instructor: enrollment.course.instructor.user.name,
          type: 'class'
        });
      });
  });

  // Get assignments due on this day
  data.assignments
    .filter(assignment => {
      const dueDay = new Date(assignment.dueDate).getDate();
      return dueDay === day;
    })
    .forEach(assignment => {
      dayEvents.assignments.push({
        id: assignment.id,
        title: assignment.title,
        course: assignment.course.name,
        dueTime: new Date(assignment.dueDate).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        }),
        status: assignment.submissions[0]?.status || 'NotStarted',
        type: 'assignment'
      });
    });

  // Get events on this day
  data.events
    .filter(event => {
      const eventDay = new Date(event.date).getDate();
      return eventDay === day;
    })
    .forEach(event => {
      dayEvents.events.push({
        id: event.id,
        title: event.title,
        time: event.time,
        location: event.location,
        organizer: event.organizer,
        isRegistered: event.registrations.length > 0,
        type: 'event'
      });
    });

  // Get calendar events on this day
  data.calendarEvents
    .filter(calEvent => {
      const eventDay = new Date(calEvent.date).getDate();
      return eventDay === day;
    })
    .forEach(calEvent => {
      dayEvents.calendarEvents.push({
        id: calEvent.id,
        title: calEvent.title,
        startTime: calEvent.startTime,
        endTime: calEvent.endTime,
        location: calEvent.location,
        description: calEvent.description,
        color: calEvent.color,
        type: calEvent.type
      });
    });

  return dayEvents;
}

function getEventBadgeColor(type: string) {
  switch (type) {
    case 'class':
      return 'bg-blue-100 text-blue-700';
    case 'assignment':
      return 'bg-red-100 text-red-700';
    case 'event':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function getBorderColor(type: string) {
  switch (type) {
    case 'class':
      return 'border-l-blue-500';
    case 'assignment':
      return 'border-l-red-500';
    case 'event':
      return 'border-l-purple-500';
    default:
      return 'border-l-gray-500';
  }
}

function getIconBg(type: string) {
  switch (type) {
    case 'class':
      return 'bg-blue-100';
    case 'assignment':
      return 'bg-red-100';
    case 'event':
      return 'bg-purple-100';
    default:
      return 'bg-gray-100';
  }
}

function getIconColor(type: string) {
  switch (type) {
    case 'class':
      return 'text-blue-600';
    case 'assignment':
      return 'text-red-600';
    case 'event':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
}

interface PageProps {
  searchParams: {
    year?: string;
    month?: string;
    day?: string;
  };
}

export default async function StudentCalendarPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return <div>Please login to view calendar</div>;
  }

  const studentId = await getStudentId(session.user.id);
  
  if (!studentId) {
    return <div>Student profile not found</div>;
  }

  const currentDate = new Date();
  const year = searchParams.year ? parseInt(searchParams.year) : currentDate.getFullYear();
  const month = searchParams.month ? parseInt(searchParams.month) : currentDate.getMonth();
  const selectedDay = searchParams.day ? parseInt(searchParams.day) : currentDate.getDate();

  const calendarData = await getCalendarData(studentId, year, month);
  const selectedDayEvents = getDayEvents(selectedDay, month, year, calendarData);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const selectedDate = new Date(year, month, selectedDay);

  // Prepare calendar indicators for each day
  const dayIndicators = {} as Record<number, { hasClass: boolean; hasAssignment: boolean; hasEvent: boolean }>;
  for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
    const events = getDayEvents(day, month, year, calendarData);
    dayIndicators[day] = {
      hasClass: events.classes.length > 0,
      hasAssignment: events.assignments.length > 0,
      hasEvent: events.events.length > 0
    };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader 
        year={year} 
        month={month} 
        monthName={monthNames[month]}
        studentId={studentId}
      />

      <div className="p-4 pb-24 space-y-4">
        <CalendarGrid
          year={year}
          month={month}
          selectedDay={selectedDay}
          dayIndicators={dayIndicators}
        />

        {/* Selected Day Events */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h4>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="assignments">Tasks</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0 space-y-2">
              {/* Classes */}
              {selectedDayEvents.classes.map((classItem) => (
                <Card key={classItem.id} className={`p-3 border-l-4 ${getBorderColor('class')} border border-gray-200`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${getIconBg('class')} flex items-center justify-center flex-shrink-0`}>
                      <CalendarIcon className={`w-5 h-5 ${getIconColor('class')}`} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{classItem.title}</h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{classItem.room}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{classItem.instructor}</p>
                    </div>
                    <Badge className={`text-xs ${getEventBadgeColor('class')}`}>Class</Badge>
                  </div>
                </Card>
              ))}

              {/* Assignments */}
              {selectedDayEvents.assignments.map((assignment) => (
                <Card key={assignment.id} className={`p-3 border-l-4 ${getBorderColor('assignment')} border border-gray-200`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${getIconBg('assignment')} flex items-center justify-center flex-shrink-0`}>
                      <Clock className={`w-5 h-5 ${getIconColor('assignment')}`} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{assignment.title}</h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Due by {assignment.dueTime}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{assignment.course}</p>
                    </div>
                    <Badge className={`text-xs ${getEventBadgeColor('assignment')}`}>
                      {assignment.status === 'Submitted' ? 'Submitted' : 'Due'}
                    </Badge>
                  </div>
                </Card>
              ))}

              {/* Events */}
              {selectedDayEvents.events.map((event) => (
                <Card key={event.id} className={`p-3 border-l-4 ${getBorderColor('event')} border border-gray-200`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${getIconBg('event')} flex items-center justify-center flex-shrink-0`}>
                      <CalendarIcon className={`w-5 h-5 ${getIconColor('event')}`} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{event.title}</h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{event.organizer}</p>
                    </div>
                    <Badge className={`text-xs ${getEventBadgeColor('event')}`}>
                      {event.isRegistered ? 'Registered' : 'Event'}
                    </Badge>
                  </div>
                </Card>
              ))}

              {selectedDayEvents.classes.length === 0 && 
               selectedDayEvents.assignments.length === 0 && 
               selectedDayEvents.events.length === 0 && (
                <p className="text-center text-gray-500 py-8">No events scheduled for this day</p>
              )}
            </TabsContent>

            <TabsContent value="classes" className="mt-0 space-y-2">
              {selectedDayEvents.classes.map((classItem) => (
                <Card key={classItem.id} className={`p-3 border-l-4 ${getBorderColor('class')} border border-gray-200`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${getIconBg('class')} flex items-center justify-center flex-shrink-0`}>
                      <CalendarIcon className={`w-5 h-5 ${getIconColor('class')}`} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{classItem.title}</h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{classItem.room}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {selectedDayEvents.classes.length === 0 && (
                <p className="text-center text-gray-500 py-4">No classes scheduled</p>
              )}
            </TabsContent>

            <TabsContent value="assignments" className="mt-0 space-y-2">
              {selectedDayEvents.assignments.map((assignment) => (
                <Card key={assignment.id} className={`p-3 border-l-4 ${getBorderColor('assignment')} border border-gray-200`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${getIconBg('assignment')} flex items-center justify-center flex-shrink-0`}>
                      <Clock className={`w-5 h-5 ${getIconColor('assignment')}`} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{assignment.title}</h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Due by {assignment.dueTime}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getEventBadgeColor('assignment')}`}>
                      {assignment.status === 'Submitted' ? 'Completed' : 'High Priority'}
                    </Badge>
                  </div>
                </Card>
              ))}
              {selectedDayEvents.assignments.length === 0 && (
                <p className="text-center text-gray-500 py-4">No assignments due</p>
              )}
            </TabsContent>

            <TabsContent value="events" className="mt-0 space-y-2">
              {selectedDayEvents.events.map((event) => (
                <Card key={event.id} className={`p-3 border-l-4 ${getBorderColor('event')} border border-gray-200`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${getIconBg('event')} flex items-center justify-center flex-shrink-0`}>
                      <CalendarIcon className={`w-5 h-5 ${getIconColor('event')}`} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{event.title}</h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {selectedDayEvents.events.length === 0 && (
                <p className="text-center text-gray-500 py-4">No events scheduled</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}