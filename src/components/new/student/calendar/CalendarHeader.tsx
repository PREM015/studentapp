"use client"
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddTaskDialog from './AddTaskDialog';

interface CalendarHeaderProps {
  year: number;
  month: number;
  monthName: string;
  studentId: number;
}

export default function CalendarHeader({ year, month, monthName, studentId }: CalendarHeaderProps) {
  const router = useRouter();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? new Date(year, month - 1)
      : new Date(year, month + 1);
    
    router.push(`/student/calendar?year=${newDate.getFullYear()}&month=${newDate.getMonth()}`);
  };

  return (
    <>
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h3 className="font-semibold text-gray-900">
            {monthName} {year}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {isAddTaskOpen && (
        <AddTaskDialog 
          studentId={studentId}
          onClose={() => setIsAddTaskOpen(false)}
        />
      )}
    </>
  );
}