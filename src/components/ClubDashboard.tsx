import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, Calendar, MessageSquare, TrendingUp, Plus, Bell, FileText, Award, Home } from 'lucide-react';
import ClubEventManagement from './club/ClubEventManagement';
import ClubMembers from './club/ClubMembers';
import ClubChat from './club/ClubChat';
import ClubActivities from './club/ClubActivities';

export default function ClubDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-14 bg-transparent border-0 gap-8">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none bg-transparent"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger 
                value="members" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none bg-transparent"
              >
                <Users className="w-4 h-4 mr-2" />
                Members
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none bg-transparent"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="activities" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none bg-transparent"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Activities
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  TC
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Technical Club</h1>
                  <p className="text-gray-500">45 Active Members</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Invite Members
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setActiveTab('events')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Members', value: '45', change: '+8 this month', icon: Users, color: 'blue' },
                { label: 'Upcoming Events', value: '3', change: '2 this week', icon: Calendar, color: 'purple' },
                { label: 'Activities', value: '12', change: '4 this month', icon: TrendingUp, color: 'green' },
                { label: 'Engagement', value: '78%', change: '+12% from last month', icon: Award, color: 'amber' },
              ].map((stat, idx) => (
                <Card key={idx} className={`p-6 border-2 border-${stat.color}-200 bg-${stat.color}-50`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <Badge className={`bg-${stat.color}-600 text-white text-xs`}>
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </Card>
              ))}
            </div>

            {/* Events & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('events')}>
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Hackathon 2024', date: 'Jun 20-21', time: '9:00 AM', registrations: 45, capacity: 50, status: 'filling-fast' },
                    { title: 'Web Dev Workshop', date: 'Jun 25', time: '2:00 PM', registrations: 48, capacity: 50, status: 'filling-fast' },
                    { title: 'Tech Talk: AI & ML', date: 'Jun 28', time: '4:00 PM', registrations: 32, capacity: 60, status: 'open' },
                  ].map((event, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{event.date} • {event.time}</p>
                        </div>
                        <Badge className={
                          event.status === 'filling-fast' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                        }>
                          {event.status === 'filling-fast' ? 'Filling Fast' : 'Open'}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Registrations</span>
                          <span className="font-semibold text-gray-900">{event.registrations}/{event.capacity}</span>
                        </div>
                        <Progress value={(event.registrations / event.capacity) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { type: 'join', text: 'Sarah joined the club', time: '2 hours ago' },
                    { type: 'event', text: 'Hackathon 2024 registrations opened', time: '5 hours ago' },
                    { type: 'post', text: 'New announcement posted', time: '1 day ago' },
                    { type: 'achievement', text: 'Club reached 45 members milestone', time: '2 days ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'join' ? 'bg-blue-100' :
                        activity.type === 'event' ? 'bg-purple-100' :
                        activity.type === 'post' ? 'bg-green-100' :
                        'bg-amber-100'
                      }`}>
                        {activity.type === 'join' && <Users className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'event' && <Calendar className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'post' && <Bell className="w-4 h-4 text-green-600" />}
                        {activity.type === 'achievement' && <Award className="w-4 h-4 text-amber-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Member Engagement */}
            <Card className="p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Member Engagement Breakdown</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { level: 'Platinum', count: 5, color: 'purple' },
                  { level: 'Gold', count: 12, color: 'amber' },
                  { level: 'Silver', count: 18, color: 'gray' },
                  { level: 'Bronze', count: 10, color: 'orange' },
                ].map((tier, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border-2 border-${tier.color}-200 bg-${tier.color}-50`}>
                    <h4 className="font-semibold text-gray-900 mb-2">{tier.level}</h4>
                    <p className="text-3xl font-bold text-gray-900">{tier.count}</p>
                    <p className="text-sm text-gray-600 mt-1">members</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Event Attendance History */}
            <Card className="p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Event Attendance History</h3>
              <div className="space-y-3">
                {[
                  { event: 'Tech Talk: AI & ML', date: 'Jun 15, 2024', registered: 42, attended: 38, percentage: 90 },
                  { event: 'Coding Competition', date: 'Jun 10, 2024', registered: 35, attended: 32, percentage: 91 },
                  { event: 'Python Workshop', date: 'Jun 5, 2024', registered: 50, attended: 45, percentage: 90 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.event}</h4>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Attendance</p>
                        <p className="font-semibold text-gray-900">{item.attended}/{item.registered}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {item.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Post Announcement', icon: Bell, action: () => {} },
                  { label: 'View Members', icon: Users, action: () => setActiveTab('members') },
                  { label: 'Create Event', icon: Calendar, action: () => setActiveTab('events') },
                  { label: 'View Reports', icon: FileText, action: () => {} },
                ].map((action, idx) => (
                  <Button 
                    key={idx} 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={action.action}
                  >
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && <ClubEventManagement />}

        {/* Members Tab */}
        {activeTab === 'members' && <ClubMembers />}

        {/* Chat Tab */}
        {activeTab === 'chat' && <ClubChat />}

        {/* Activities Tab */}
        {activeTab === 'activities' && <ClubActivities />}
      </div>
    </div>
  );
}
