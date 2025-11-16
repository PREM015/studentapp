"use client"
import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus, Calendar as CalendarIcon } from 'lucide-react';

export default function StudentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h3 className="font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Calendar Grid */}
        <Card className="p-4 border border-gray-200">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, idx) => (
              <div key={idx} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {[...Array(firstDayOfMonth)].map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square" />
            ))}
            {[...Array(daysInMonth)].map((_, idx) => {
              const day = idx + 1;
              const isToday = day === new Date().getDate() && 
                             currentDate.getMonth() === new Date().getMonth() &&
                             currentDate.getFullYear() === new Date().getFullYear();
              const isSelected = day === selectedDate.getDate() &&
                                currentDate.getMonth() === selectedDate.getMonth() &&
                                currentDate.getFullYear() === selectedDate.getFullYear();
              
              // Mock event indicators
              const hasClass = day % 2 === 0;
              const hasAssignment = day % 3 === 0;
              const hasEvent = day % 5 === 0;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={`aspect-square rounded-lg text-sm font-medium transition-colors relative ${
                    isToday ? 'bg-blue-600 text-white' :
                    isSelected ? 'bg-blue-100 text-blue-900' :
                    'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {day}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {hasClass && <div className="w-1 h-1 rounded-full bg-blue-500" />}
                    {hasAssignment && <div className="w-1 h-1 rounded-full bg-red-500" />}
                    {hasEvent && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-gray-600">Class</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-gray-600">Assignment</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-gray-600">Event</span>
            </div>
          </div>
        </Card>

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
              <Card className="p-3 border-l-4 border-l-blue-500 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Data Structures</h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>9:00 AM - 10:30 AM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Lab-101</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dr. Sharma</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 text-xs">Class</Badge>
                </div>
              </Card>

              {/* Assignment */}
              <Card className="p-3 border-l-4 border-l-red-500 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Binary Tree Assignment</h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Due by 11:59 PM</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Data Structures</p>
                  </div>
                  <Badge className="bg-red-100 text-red-700 text-xs">Due</Badge>
                </div>
              </Card>

              {/* Event */}
              <Card className="p-3 border-l-4 border-l-purple-500 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Tech Workshop</h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>3:00 PM - 5:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Auditorium</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Technical Club</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">Event</Badge>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="classes" className="mt-0">
              <Card className="p-3 border-l-4 border-l-blue-500 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Data Structures</h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>9:00 AM - 10:30 AM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Lab-101</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="mt-0">
              <Card className="p-3 border-l-4 border-l-red-500 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Binary Tree Assignment</h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Due by 11:59 PM</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-700 text-xs">High Priority</Badge>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <Card className="p-3 border-l-4 border-l-purple-500 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Tech Workshop</h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>3:00 PM - 5:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Auditorium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
