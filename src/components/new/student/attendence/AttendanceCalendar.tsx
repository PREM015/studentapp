import { AttendanceStatus } from '@prisma/client';

interface AttendanceRecord {
  id: number;
  date: Date;
  status: AttendanceStatus;
}

export default function AttendanceCalendar({ 
  monthAttendance 
}: { 
  monthAttendance: AttendanceRecord[] 
}) {
  const getDaysInMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getStatusForDay = (day: number) => {
    const record = monthAttendance.find(a => 
      new Date(a.date).getDate() === day
    );
    return record?.status;
  };

  const getStatusColor = (status?: AttendanceStatus) => {
    if (!status) return 'bg-gray-100 text-gray-400';
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700';
      case 'late':
        return 'bg-amber-100 text-amber-700';
      case 'absent':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-400';
    }
  };

  const daysInMonth = getDaysInMonth();

  return (
    <>
      <div className="grid grid-cols-7 gap-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {[...Array(daysInMonth)].map((_, idx) => {
          const status = getStatusForDay(idx + 1);
          return (
            <div
              key={idx}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                getStatusColor(status)
              }`}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-100" />
          <span className="text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-amber-100" />
          <span className="text-gray-600">Late</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-100" />
          <span className="text-gray-600">Absent</span>
        </div>
      </div>
    </>
  );
}