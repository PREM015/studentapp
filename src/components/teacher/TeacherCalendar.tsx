import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';

export default function TeacherCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 15)); // June 15, 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const events = [
    { date: 15, type: 'class', title: 'Data Structures', time: '9:00 AM', room: 'Lab-101' },
    { date: 15, type: 'class', title: 'Web Development', time: '11:00 AM', room: 'Room-205' },
    { date: 15, type: 'class', title: 'Database Systems', time: '2:00 PM', room: 'Lab-102' },
    { date: 16, type: 'exam', title: 'Mid-term Exam', time: '10:00 AM', room: 'Hall A' },
    { date: 18, type: 'meeting', title: 'Faculty Meeting', time: '3:00 PM', room: 'Conference' },
    { date: 20, type: 'deadline', title: 'Assignment Submission', time: '11:59 PM', room: 'Online' },
    { date: 22, type: 'class', title: 'Data Structures', time: '9:00 AM', room: 'Lab-101' },
    { date: 25, type: 'event', title: 'Workshop: AI/ML', time: '2:00 PM', room: 'Auditorium' },
  ];

  const getEventsForDate = (day: number) => {
    return events.filter(event => event.date === day);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const selectedDayEvents = selectedDate ? getEventsForDate(selectedDate.getDate()) : getEventsForDate(currentDate.getDate());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
          <p className="text-gray-500">Manage your schedule and events</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center py-2 text-sm font-semibold text-gray-700">
                {day}
              </div>
            ))}

            {Array.from({ length: startingDayOfWeek }, (_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(day);
              const isToday = day === 15; // Current day in our demo
              const isSelected = selectedDate?.getDate() === day;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={`aspect-square p-1 rounded-lg border transition-all ${
                    isSelected ? 'border-blue-500 bg-blue-50' :
                    isToday ? 'border-blue-300 bg-blue-50' :
                    'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map((event, idx) => (
                      <div
                        key={idx}
                        className={`h-1 rounded-full ${
                          event.type === 'class' ? 'bg-blue-500' :
                          event.type === 'exam' ? 'bg-red-500' :
                          event.type === 'meeting' ? 'bg-purple-500' :
                          event.type === 'deadline' ? 'bg-amber-500' :
                          'bg-green-500'
                        }`}
                      />
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">+{dayEvents.length - 2}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-4">
            {[
              { type: 'class', label: 'Classes', color: 'bg-blue-500' },
              { type: 'exam', label: 'Exams', color: 'bg-red-500' },
              { type: 'meeting', label: 'Meetings', color: 'bg-purple-500' },
              { type: 'deadline', label: 'Deadlines', color: 'bg-amber-500' },
              { type: 'event', label: 'Events', color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Events for Selected Day */}
        <Card className="p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">
            {selectedDate ? `Events on ${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}` : "Today's Events"}
          </h3>
          
          {selectedDayEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    event.type === 'class' ? 'border-blue-500 bg-blue-50' :
                    event.type === 'exam' ? 'border-red-500 bg-red-50' :
                    event.type === 'meeting' ? 'border-purple-500 bg-purple-50' :
                    event.type === 'deadline' ? 'border-amber-500 bg-amber-50' :
                    'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No events scheduled</p>
            </div>
          )}
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.filter(e => e.date >= 15).slice(0, 6).map((event, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <Badge className={
                  event.type === 'class' ? 'bg-blue-100 text-blue-700' :
                  event.type === 'exam' ? 'bg-red-100 text-red-700' :
                  event.type === 'meeting' ? 'bg-purple-100 text-purple-700' :
                  event.type === 'deadline' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }>
                  {event.type}
                </Badge>
                <span className="text-sm font-semibold text-gray-900">Jun {event.date}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
