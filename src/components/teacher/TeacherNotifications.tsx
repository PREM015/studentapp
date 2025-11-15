import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell, CheckCircle, AlertCircle, FileText, Users, 
  Calendar, Award, Trash2, Check, Filter, X
} from 'lucide-react';

export default function TeacherNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'submission',
      icon: FileText,
      title: 'New Assignment Submission',
      message: 'John Doe submitted "Machine Learning Project" for CS301',
      time: '5 minutes ago',
      read: false,
      priority: 'high',
    },
    {
      id: 2,
      type: 'attendance',
      icon: CheckCircle,
      title: 'Attendance Session Completed',
      message: 'CS301 - Morning Batch: 58/60 students marked present',
      time: '1 hour ago',
      read: false,
      priority: 'medium',
    },
    {
      id: 3,
      type: 'alert',
      icon: AlertCircle,
      title: 'Low Attendance Alert',
      message: 'Student Sarah Williams has 55% attendance in CS402',
      time: '2 hours ago',
      read: false,
      priority: 'high',
    },
    {
      id: 4,
      type: 'question',
      icon: Users,
      title: 'Student Question',
      message: 'Mike Johnson asked a question about Lecture 5 content',
      time: '3 hours ago',
      read: true,
      priority: 'medium',
    },
    {
      id: 5,
      type: 'event',
      icon: Calendar,
      title: 'Upcoming Class Reminder',
      message: 'CS501 - Deep Learning starts in 30 minutes (Room 305)',
      time: '4 hours ago',
      read: true,
      priority: 'medium',
    },
    {
      id: 6,
      type: 'submission',
      icon: FileText,
      title: 'Grading Deadline',
      message: 'CS301 Assignment 3 grading due in 2 days',
      time: '5 hours ago',
      read: true,
      priority: 'high',
    },
    {
      id: 7,
      type: 'achievement',
      icon: Award,
      title: 'Course Milestone',
      message: 'CS402 has reached 75% course completion',
      time: 'Yesterday',
      read: true,
      priority: 'low',
    },
    {
      id: 8,
      type: 'submission',
      icon: FileText,
      title: 'Multiple Submissions',
      message: '15 new submissions for CS205 Assignment',
      time: 'Yesterday',
      read: true,
      priority: 'medium',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'submission' | 'attendance' | 'alert'>('all');

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" className="gap-2">
                <Check className="w-4 h-4" />
                Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button onClick={clearAll} variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                <X className="w-4 h-4" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="all" className="gap-2">
              All
              <Badge variant="secondary" className="ml-1">{notifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-2">
              <Bell className="w-4 h-4" />
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-1 bg-red-500">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="submission" className="gap-2">
              <FileText className="w-4 h-4" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="alert" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              Alerts
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <Card className="p-12 text-center border border-gray-200">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications in this category."}
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 border transition-all ${
                  notification.read 
                    ? 'border-gray-200 bg-white' 
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'alert' ? 'bg-red-100' :
                    notification.type === 'submission' ? 'bg-blue-100' :
                    notification.type === 'attendance' ? 'bg-green-100' :
                    notification.type === 'achievement' ? 'bg-yellow-100' :
                    'bg-gray-100'
                  }`}>
                    <notification.icon className={`w-5 h-5 ${
                      notification.type === 'alert' ? 'text-red-600' :
                      notification.type === 'submission' ? 'text-blue-600' :
                      notification.type === 'attendance' ? 'text-green-600' :
                      notification.type === 'achievement' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`text-sm ${notification.read ? 'text-gray-900' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      <Badge className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className={`text-sm mb-2 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Mark read
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteNotification(notification.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-red-600 hover:text-red-700 gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
