import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Bell,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function TeacherDashboard() {
  const todayClasses = [
    { time: '9:00 AM', subject: 'Data Structures', class: 'CSE-A', room: 'Lab 301', students: 60, status: 'upcoming' },
    { time: '11:00 AM', subject: 'Web Development', class: 'CSE-B', room: 'Room 205', students: 55, status: 'upcoming' },
    { time: '2:00 PM', subject: 'Database Systems', class: 'IT-A', room: 'Lab 402', students: 50, status: 'upcoming' }
  ];

  const pendingTasks = [
    { task: 'Grade Assignment 3 - Data Structures', count: 45, deadline: 'Today', priority: 'high' },
    { task: 'Review Project Submissions', count: 12, deadline: 'Tomorrow', priority: 'high' },
    { task: 'Update Course Material', count: 3, deadline: 'This Week', priority: 'medium' },
    { task: 'Prepare Exam Questions', count: 1, deadline: 'Next Week', priority: 'low' }
  ];

  const recentSubmissions = [
    { student: 'Rahul Kumar', assignment: 'Assignment 3', course: 'Data Structures', time: '2 hours ago' },
    { student: 'Priya Sharma', assignment: 'Project Report', course: 'Web Development', time: '3 hours ago' },
    { student: 'Amit Patel', assignment: 'Lab Work 5', course: 'Database Systems', time: '5 hours ago' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Rajesh!</h2>
        <p className="text-gray-500 mt-1">Here's what's happening with your classes today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Classes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Grading</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">45</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">165</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Attendance</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">87%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Today's Schedule
        </h3>
        <div className="space-y-3">
          {todayClasses.map((cls, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{cls.time}</p>
                    <Badge className="mt-1 bg-blue-100 text-blue-700 text-xs">
                      {cls.room}
                    </Badge>
                  </div>
                  <div className="border-l border-gray-300 pl-4">
                    <h4 className="font-semibold text-gray-900">{cls.subject}</h4>
                    <p className="text-sm text-gray-600">{cls.class} • {cls.students} students</p>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Mark Attendance
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pending Tasks */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-orange-600" />
          Pending Tasks
        </h3>
        <div className="space-y-3">
          {pendingTasks.map((task, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-600">{task.count} items • Due: {task.deadline}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Recent Submissions
          </h3>
          <div className="space-y-3">
            {recentSubmissions.map((sub, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{sub.student}</p>
                    <p className="text-sm text-gray-600">{sub.assignment}</p>
                    <p className="text-xs text-gray-500 mt-1">{sub.course} • {sub.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Class Performance */}
        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Class Performance Overview
          </h3>
          <div className="space-y-4">
            {[
              { class: 'Data Structures (CSE-A)', avg: 85, attendance: 90 },
              { class: 'Web Development (CSE-B)', avg: 88, attendance: 85 },
              { class: 'Database Systems (IT-A)', avg: 82, attendance: 88 }
            ].map((cls, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{cls.class}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avg Score</span>
                    <span className="font-medium text-gray-900">{cls.avg}%</span>
                  </div>
                  <Progress value={cls.avg} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Attendance</span>
                    <span className="font-medium text-gray-900">{cls.attendance}%</span>
                  </div>
                  <Progress value={cls.attendance} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="p-6 bg-blue-50 border-2 border-blue-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Important Announcements
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Mid-term exam schedule released</p>
                <p className="text-sm text-gray-600 mt-1">Please review the exam schedule and upload question papers by June 25.</p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-green-200">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Faculty development workshop</p>
                <p className="text-sm text-gray-600 mt-1">Join us for the online workshop on modern teaching methodologies - June 22, 3 PM.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
