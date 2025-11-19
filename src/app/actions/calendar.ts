"use server"
import { prisma } from '@/lib/prisma';
import { CalendarEventType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface AddEventData {
  title: string;
  type: CalendarEventType;
  date: string;
  startTime: string;
  endTime?: string;
  location?: string;
  description?: string;
}

export async function addCalendarEvent(data: AddEventData) {
  try {
    const color = getEventColor(data.type);
    
    await prisma.calendarEvent.create({
      data: {
        title: data.title,
        type: data.type,
        date: new Date(data.date),
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        description: data.description,
        color
      }
    });

    revalidatePath('/student/calendar');
    return { success: true };
  } catch (error) {
    console.error('Error adding calendar event:', error);
    return { success: false, error: 'Failed to add event' };
  }
}

function getEventColor(type: CalendarEventType): string {
  switch (type) {
    case CalendarEventType.class:
      return '#3B82F6'; // blue
    case CalendarEventType.exam:
      return '#EF4444'; // red
    case CalendarEventType.deadline:
      return '#F59E0B'; // amber
    case CalendarEventType.event:
      return '#8B5CF6'; // purple
    case CalendarEventType.holiday:
      return '#10B981'; // green
    default:
      return '#6B7280'; // gray
  }
}