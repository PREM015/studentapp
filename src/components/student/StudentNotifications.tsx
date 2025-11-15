import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Bell, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Calendar,
  Award,
  BookOpen,
  Users,
  X
} from 'lucide-react';

export default function StudentNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'urgent',
      icon: AlertCircle,
      title: 'Assignment Due Tomorrow',
      message: 'Data Structures Assignment 3 is due tomorrow at 11:59 PM',
      time: '10 mins ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      icon: CheckCircle2,
      title: 'Grade Published',
      message: 'Your grade for Web Development Project has been published - A',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      icon: Calendar,
      title: 'Class Rescheduled',
      message: 'Database Systems class tomorrow moved to 2:00 PM',
      time: '5 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'achievement',
      icon: Award,
      title: 'New Badge Unlocked!',
      message: 'You earned the "Perfect Week" badge for 100% attendance this week',
      time: '1 day ago',
      read: false
    },
    {
      id: 5,
      type: 'info',
      icon: BookOpen,
      title: 'New Material Uploaded',
      message: 'Dr. Sharma uploaded new lecture notes for Data Structures',
      time: '1 day ago',
      read: true
    },
    {
      id: 6,
      type: 'info',
      icon: Users,
      title: 'Club Event Reminder',
      message: 'Coding Club hackathon starts this Saturday at 9:00 AM',
      time: '2 days ago',
      read: true
    },
    {
      id: 7,
      type: 'urgent',
      icon: AlertCircle,
      title: 'Low Attendance Alert',
      message: 'Your attendance in Operating Systems is below 75%',
      time: '3 days ago',
      read: true
    },
    {
      id: 8,
      type: 'success',
      icon: CheckCircle2,
      title: 'Points Earned',
      message: 'You earned 50 points for completing Assignment 2 on time',
      time: '4 days ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500">{unreadCount} unread</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Urgent</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {notifications.filter(n => n.type === 'urgent' && !n.read).length}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Achievements</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {notifications.filter(n => n.type === 'achievement').length}
            </p>
          </Card>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 space-y-2">
        {notifications.map((notif) => (
          <Card 
            key={notif.id} 
            className={`p-4 ${notif.read ? 'bg-white' : 'bg-purple-50 border-purple-200'}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                notif.type === 'urgent' ? 'bg-red-100' :
                notif.type === 'success' ? 'bg-green-100' :
                notif.type === 'achievement' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                <notif.icon className={`w-5 h-5 ${
                  notif.type === 'urgent' ? 'text-red-600' :
                  notif.type === 'success' ? 'text-green-600' :
                  notif.type === 'achievement' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{notif.title}</h4>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{notif.time}</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State (if no notifications) */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500 text-center text-sm">
            You're all caught up! Check back later for updates.
          </p>
        </div>
      )}
    </div>
  );
}
