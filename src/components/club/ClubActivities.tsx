"use client"
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  TrendingUp, Calendar, Users, Award, Star, Trophy,
  Target, CheckCircle, MessageSquare, Image, Video
} from 'lucide-react';

export default function ClubActivities() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Activity Feed</h2>
        <p className="text-gray-500">Track all club activities and member engagement</p>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Activities', value: '156', icon: TrendingUp, color: 'blue' },
          { label: 'This Month', value: '24', icon: Calendar, color: 'green' },
          { label: 'Active Members', value: '42', icon: Users, color: 'purple' },
          { label: 'Achievements', value: '18', icon: Trophy, color: 'amber' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Activity Timeline */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {[
            {
              type: 'event',
              user: 'Alice Johnson',
              action: 'created event',
              subject: 'Hackathon 2024',
              time: '2 hours ago',
              icon: Calendar,
              color: 'purple',
            },
            {
              type: 'join',
              user: 'Bob Smith',
              action: 'joined the club',
              subject: '',
              time: '3 hours ago',
              icon: Users,
              color: 'blue',
            },
            {
              type: 'achievement',
              user: 'Carol Williams',
              action: 'earned badge',
              subject: 'Event Organizer',
              time: '5 hours ago',
              icon: Award,
              color: 'amber',
            },
            {
              type: 'post',
              user: 'David Brown',
              action: 'shared',
              subject: 'Workshop photos',
              time: '1 day ago',
              icon: Image,
              color: 'green',
            },
            {
              type: 'attendance',
              user: 'Eve Davis',
              action: 'attended',
              subject: 'Web Dev Workshop',
              time: '2 days ago',
              icon: CheckCircle,
              color: 'green',
            },
            {
              type: 'comment',
              user: 'Frank Miller',
              action: 'commented on',
              subject: 'Next event planning',
              time: '2 days ago',
              icon: MessageSquare,
              color: 'blue',
            },
            {
              type: 'milestone',
              user: 'Technical Club',
              action: 'reached',
              subject: '45 members',
              time: '3 days ago',
              icon: Trophy,
              color: 'purple',
            },
            {
              type: 'event',
              user: 'Grace Lee',
              action: 'completed',
              subject: 'Tech Talk: AI & ML',
              time: '3 days ago',
              icon: CheckCircle,
              color: 'green',
            },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={`w-10 h-10 rounded-full bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  {activity.subject && (
                    <span className="font-semibold text-purple-700">{activity.subject}</span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Member Contribution Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Top Contributors This Month</h3>
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    idx === 0 ? 'bg-amber-500 text-white' :
                    idx === 1 ? 'bg-gray-300 text-gray-700' :
                    idx === 2 ? 'bg-orange-400 text-white' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                    alt="Member"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Member {idx + 1}</p>
                    <p className="text-xs text-gray-500">{5 - Math.floor(idx / 2)} contributions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-gray-900">{50 - idx * 3}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Activity Breakdown</h3>
          <div className="space-y-4">
            {[
              { type: 'Events Organized', count: 12, total: 15, color: 'purple' },
              { type: 'Members Recruited', count: 8, total: 10, color: 'blue' },
              { type: 'Posts Created', count: 24, total: 30, color: 'green' },
              { type: 'Comments & Discussions', count: 45, total: 50, color: 'amber' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.type}</span>
                  <span className="font-semibold text-gray-900">{item.count}/{item.total}</span>
                </div>
                <Progress value={(item.count / item.total) * 100} className="h-2" />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Engagement</span>
              <span className="text-lg font-bold text-purple-700">87%</span>
            </div>
            <Progress value={87} className="h-3" />
          </div>
        </Card>
      </div>

      {/* Achievements Unlocked */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'First Event', description: 'Organized first event', icon: '🎉', unlocked: true },
            { title: '25 Members', description: 'Reached 25 members', icon: '👥', unlocked: true },
            { title: 'Super Organizer', description: '10 events organized', icon: '⭐', unlocked: true },
            { title: 'Top Attendance', description: '95% event attendance', icon: '🏆', unlocked: true },
            { title: '50 Members', description: 'Reach 50 members', icon: '🎯', unlocked: false },
            { title: 'Year Complete', description: 'One year anniversary', icon: '🎂', unlocked: false },
            { title: 'Community Leader', description: '100 contributions', icon: '👑', unlocked: false },
            { title: 'Perfect Score', description: '100% event success', icon: '💯', unlocked: false },
          ].map((achievement, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${
                achievement.unlocked
                  ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-white'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className={`font-semibold mb-1 ${
                achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h4>
              <p className="text-xs text-gray-600">{achievement.description}</p>
              {achievement.unlocked && (
                <Badge className="mt-2 bg-amber-100 text-amber-700 text-xs">Unlocked</Badge>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
