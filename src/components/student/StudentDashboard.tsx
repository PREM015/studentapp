import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import {
  Flame,
  Trophy,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  Bell,
  Settings,
} from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">Good Morning,</p>
            <h3 className="font-semibold text-gray-900">Rahul Kumar</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Streak Card */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-bold">15 Day Streak</h4>
                <p className="text-sm text-orange-100">Keep it up! 🔥</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-8 rounded-full ${
                    i < 5 ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                +5%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-500">Attendance</p>
          </Card>

          <Card className="p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                +20
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900">450</p>
            <p className="text-sm text-gray-500">Total Points</p>
          </Card>

          <Card className="p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">#12</p>
            <p className="text-sm text-gray-500">Rank in Batch</p>
          </Card>

          <Card className="p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-500">Pending</p>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Today's Classes</h4>
            <p className="text-sm text-gray-500">Jun 15, 2024</p>
          </div>

          <div className="space-y-3">
            {[
              {
                time: '9:00 AM',
                subject: 'Data Structures',
                room: 'Lab-101',
                teacher: 'Dr. Sharma',
                status: 'upcoming',
                color: 'blue',
              },
              {
                time: '11:00 AM',
                subject: 'Web Development',
                room: 'Room-205',
                teacher: 'Prof. Gupta',
                status: 'ongoing',
                color: 'green',
              },
              {
                time: '2:00 PM',
                subject: 'Database Systems',
                room: 'Lab-102',
                teacher: 'Dr. Patel',
                status: 'upcoming',
                color: 'blue',
              },
            ].map((cls, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex flex-col items-center">
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {cls.time}
                  </p>
                </div>
                <div
                  className={`w-1 h-full rounded-full ${
                    cls.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900">{cls.subject}</h5>
                    {cls.status === 'ongoing' && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                        Live
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {cls.room} • {cls.teacher}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            View Full Schedule
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Card>

        {/* Upcoming Assignments */}
        <Card className="p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              Upcoming Assignments
            </h4>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 h-auto p-0"
            >
              See All
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                subject: 'Data Structures',
                title: 'Binary Tree Implementation',
                due: '2 days',
                priority: 'high',
                progress: 60,
              },
              {
                subject: 'Web Development',
                title: 'React Portfolio Project',
                due: '5 days',
                priority: 'medium',
                progress: 30,
              },
              {
                subject: 'DBMS',
                title: 'SQL Query Assignment',
                due: '1 week',
                priority: 'low',
                progress: 0,
              },
            ].map((assignment, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <Badge
                      className={`text-xs mb-1 ${
                        assignment.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : assignment.priority === 'medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {assignment.subject}
                    </Badge>
                    <h5 className="font-medium text-gray-900 text-sm">
                      {assignment.title}
                    </h5>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      Due in {assignment.due}
                    </span>
                  </div>
                </div>
                {assignment.progress > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium text-gray-700">
                        {assignment.progress}%
                      </span>
                    </div>
                    <Progress value={assignment.progress} className="h-1.5" />
                  </div>
                )}
                {assignment.progress === 0 && (
                  <Button
                    size="sm"
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 h-8"
                  >
                    Start Now
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Recent Achievements</h4>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 h-auto p-0"
            >
              View All
            </Button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { name: 'Perfect Week', icon: '🌟', date: 'Today', new: true },
              { name: 'Early Bird', icon: '🌅', date: '2 days ago', new: true },
              {
                name: 'Top Scorer',
                icon: '🏆',
                date: '1 week ago',
                new: false,
              },
              { name: 'Helpful', icon: '🤝', date: '2 weeks ago', new: false },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-28 p-3 border border-gray-200 rounded-lg text-center relative"
              >
                {badge.new && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="text-xs font-medium text-gray-900">
                  {badge.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{badge.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
