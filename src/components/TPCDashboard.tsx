"use client"
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Briefcase, Building2, Users, TrendingUp, Calendar, FileText, DollarSign, Target, Clock, MapPin, ChevronRight, BarChart3, Home } from 'lucide-react';
import TPCCompanyManagement from './tpc/TPCCompanyManagement';
import TPCJobPosting from './tpc/TPCJobPosting';
import TPCStudentAnalytics from './tpc/TPCStudentAnalytics';
import TPCReports from './tpc/TPCReports';

export default function TPCDashboard() {
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
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="companies" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Companies
              </TabsTrigger>
              <TabsTrigger 
                value="jobs" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Job Postings
              </TabsTrigger>
              <TabsTrigger 
                value="students" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <Users className="w-4 h-4 mr-2" />
                Student Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Reports
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
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Training & Placement Dashboard</h1>
                <p className="text-gray-500">Placement Drive 2024</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setActiveTab('jobs')}>
                <Briefcase className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { label: 'Total Companies', value: '45', change: '+5', icon: Building2, color: 'blue' },
                { label: 'Active Jobs', value: '28', change: '+18', icon: Briefcase, color: 'green' },
                { label: 'Applications', value: '342', change: '+120', icon: Users, color: 'purple' },
                { label: 'Placed Students', value: '156', subtext: '78% rate', icon: Target, color: 'amber' },
                { label: 'Avg Package', value: '₹4.5L', change: '↑12%', icon: DollarSign, color: 'emerald' },
              ].map((stat, idx) => (
                <Card key={idx} className={`p-4 border-2 border-${stat.color}-200 bg-${stat.color}-50`}>
                  <div className="flex items-start justify-between mb-2">
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    {stat.change && (
                      <Badge className={`bg-${stat.color}-600 text-white text-xs`}>
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.subtext || stat.label}</p>
                </Card>
              ))}
            </div>

            {/* Placement Funnel */}
            <Card className="p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Placement Funnel</h2>
              <div className="space-y-3">
                {[
                  { stage: 'Eligible Students', count: 200, percentage: 100 },
                  { stage: 'Applied', count: 180, percentage: 90 },
                  { stage: 'Shortlisted', count: 165, percentage: 82.5 },
                  { stage: 'Interview Scheduled', count: 140, percentage: 70 },
                  { stage: 'Offers Received', count: 160, percentage: 80 },
                  { stage: 'Joined', count: 156, percentage: 78 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm font-medium text-gray-900">{item.stage}</div>
                    <div className="flex-1">
                      <Progress value={item.percentage} className="h-8" />
                    </div>
                    <div className="w-32 text-right">
                      <span className="text-lg font-bold text-gray-900">{item.count}</span>
                      <span className="text-sm text-gray-500 ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { type: 'company', text: 'New company registered: Amazon', time: '2 hours ago', icon: Building2 },
                    { type: 'job', text: 'Job posted: Software Engineer at TCS', time: '5 hours ago', icon: Briefcase },
                    { type: 'application', text: '12 students applied for Infosys role', time: '1 day ago', icon: Users },
                    { type: 'placement', text: '3 students placed at Wipro', time: '2 days ago', icon: Target },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <activity.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Urgent Actions */}
              <Card className="p-6 border border-amber-200 bg-amber-50">
                <h3 className="font-semibold text-gray-900 mb-4">Urgent Actions</h3>
                <div className="space-y-3">
                  {[
                    { text: 'Review 24 pending applications', priority: 'high' },
                    { text: 'Schedule interviews for TCS drive', priority: 'high' },
                    { text: 'Update placement statistics', priority: 'medium' },
                    { text: 'Send reminder to 15 students', priority: 'medium' },
                  ].map((action, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
                      <span className="text-sm text-gray-900">{action.text}</span>
                      <Badge className={action.priority === 'high' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'}>
                        {action.priority === 'high' ? 'High' : 'Medium'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Upcoming Interviews */}
            <Card className="p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Company</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Students</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { date: 'Jun 20, 2024', company: 'TCS', role: 'Software Engineer', students: 45, type: 'Technical' },
                      { date: 'Jun 22, 2024', company: 'Infosys', role: 'Data Analyst', students: 38, type: 'HR + Technical' },
                      { date: 'Jun 25, 2024', company: 'Wipro', role: 'Frontend Developer', students: 32, type: 'Technical' },
                    ].map((interview, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{interview.date}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{interview.company}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{interview.role}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{interview.students}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{interview.type}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Top Companies & Department Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Top Recruiting Companies</h3>
                <div className="space-y-3">
                  {[
                    { company: 'TCS', placements: 12, package: '5.2L' },
                    { company: 'Infosys', placements: 10, package: '4.8L' },
                    { company: 'Wipro', placements: 8, package: '4.5L' },
                    { company: 'Accenture', placements: 7, package: '5.0L' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.company}</p>
                        <p className="text-sm text-gray-500">{item.placements} placements</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">₹{item.package}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Department-wise Placement</h3>
                <div className="space-y-3">
                  {[
                    { dept: 'Computer Science', placed: 85, total: 100, percentage: 85 },
                    { dept: 'Information Tech', placed: 42, total: 50, percentage: 84 },
                    { dept: 'Electronics', placed: 20, total: 30, percentage: 67 },
                    { dept: 'Mechanical', placed: 9, total: 20, percentage: 45 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{item.dept}</span>
                        <span className="font-semibold text-gray-900">{item.placed}/{item.total}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && <TPCCompanyManagement />}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && <TPCJobPosting />}

        {/* Students Tab */}
        {activeTab === 'students' && <TPCStudentAnalytics />}

        {/* Reports Tab */}
        {activeTab === 'reports' && <TPCReports />}
      </div>
    </div>
  );
}
