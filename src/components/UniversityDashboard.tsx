import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  GraduationCap, Users, Award, TrendingUp, Building2, FileCheck, 
  DollarSign, BookOpen, Target, AlertCircle, ChevronRight, 
  Calendar, Bell, Download, BarChart3, Home, Shield
} from 'lucide-react';
import UniversityAnalytics from './university/UniversityAnalytics';
import UniversityCompliance from './university/UniversityCompliance';
import UniversityDepartments from './university/UniversityDepartments';
import UniversityReports from './university/UniversityReports';

export default function UniversityDashboard() {
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
                value="analytics" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="compliance" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <Shield className="w-4 h-4 mr-2" />
                Compliance
              </TabsTrigger>
              <TabsTrigger 
                value="departments" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Departments
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
              >
                <FileCheck className="w-4 h-4 mr-2" />
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
                <h1 className="text-3xl font-bold text-gray-900">University Analytics Dashboard</h1>
                <p className="text-gray-500">Academic Year 2023-24</p>
              </div>
              <div className="flex items-center gap-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>AY 2023-24</option>
                  <option>AY 2022-23</option>
                  <option>AY 2021-22</option>
                </select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Hero Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {[
                { label: 'Total Students', value: '15,420', change: '+850', icon: Users, color: 'blue' },
                { label: 'Faculty Members', value: '680', change: '+25', icon: GraduationCap, color: 'purple' },
                { label: 'Placement Rate', value: '78%', change: '+5%', icon: Target, color: 'green' },
                { label: 'Avg Package', value: '₹4.8L', change: '+8%', icon: DollarSign, color: 'emerald' },
                { label: 'Research Papers', value: '245', change: '+45', icon: BookOpen, color: 'amber' },
                { label: 'NIRF Ranking', value: '#142', change: '↑8', icon: Award, color: 'pink' },
              ].map((metric, idx) => (
                <Card key={idx} className={`p-4 border-2 border-${metric.color}-200 bg-${metric.color}-50`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                      <metric.icon className={`w-5 h-5 text-${metric.color}-600`} />
                    </div>
                    <Badge className={`bg-${metric.color}-600 text-white text-xs`}>
                      {metric.change}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                  <p className="text-xs text-gray-600">{metric.label}</p>
                </Card>
              ))}
            </div>

            {/* Department Overview */}
            <Card className="p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Department Overview</h2>
              <div className="space-y-4">
                {[
                  { dept: 'Computer Science & Engineering', students: 3200, faculty: 180, naac: 'A+', placement: 85, research: 95 },
                  { dept: 'Electronics & Communication', students: 2800, faculty: 145, naac: 'A', placement: 72, research: 78 },
                  { dept: 'Mechanical Engineering', students: 2500, faculty: 130, naac: 'A', placement: 68, research: 65 },
                  { dept: 'Civil Engineering', students: 2200, faculty: 115, naac: 'A', placement: 65, research: 52 },
                  { dept: 'Electrical Engineering', students: 1900, faculty: 105, naac: 'A', placement: 70, research: 60 },
                ].map((dept, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-gray-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{dept.dept}</h3>
                          <p className="text-sm text-gray-500">{dept.students.toLocaleString()} students • {dept.faculty} faculty</p>
                        </div>
                      </div>
                      <Badge className={dept.naac === 'A+' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                        NAAC {dept.naac}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Placement Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={dept.placement} className="flex-1 h-2" />
                          <span className="text-sm font-semibold text-gray-900">{dept.placement}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Research Output</p>
                        <div className="flex items-center gap-2">
                          <Progress value={dept.research} className="flex-1 h-2" />
                          <span className="text-sm font-semibold text-gray-900">{dept.research}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Risk Indicators & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Risk Indicators</h3>
                <div className="space-y-3">
                  {[
                    { category: 'Student Retention', status: 'warning', value: '94%', target: '95%', message: 'Slightly below target' },
                    { category: 'Faculty Attrition', status: 'good', value: '6%', target: '<10%', message: 'Within acceptable range' },
                    { category: 'Placement Rate', status: 'good', value: '78%', target: '>75%', message: 'Above target' },
                    { category: 'Research Output', status: 'warning', value: '245', target: '>250', message: 'Close to target' },
                  ].map((risk, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border-2 ${
                      risk.status === 'good' ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{risk.category}</span>
                        <Badge className={risk.status === 'good' ? 'bg-green-600 text-white' : 'bg-amber-600 text-white'}>
                          {risk.value}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">Target: {risk.target} • {risk.message}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">5-Year Performance Trend</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Student Enrollment', data: [12000, 13200, 14100, 14800, 15420] },
                    { metric: 'Faculty Strength', data: [580, 610, 635, 660, 680] },
                    { metric: 'Placement Rate %', data: [68, 72, 75, 76, 78] },
                  ].map((trend, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{trend.metric}</span>
                        <span className="text-sm font-bold text-gray-900">{trend.data[trend.data.length - 1]}</span>
                      </div>
                      <div className="flex items-end gap-1 h-12">
                        {trend.data.map((value, yearIdx) => {
                          const maxValue = Math.max(...trend.data);
                          const height = (value / maxValue) * 100;
                          return (
                            <div key={yearIdx} className="flex-1 flex flex-col justify-end">
                              <div
                                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:opacity-80"
                                style={{ height: `${height}%` }}
                                title={`${2019 + yearIdx}: ${value}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>2019</span>
                        <span>2023</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Compliance & Financial */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Compliance Status</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('compliance')}>
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'AICTE Approval', status: 'valid', expiry: 'Mar 2025' },
                    { item: 'NAAC Accreditation', status: 'due-soon', expiry: 'Aug 2024' },
                    { item: 'NBA Programs', status: 'valid', expiry: 'Dec 2025' },
                    { item: 'Fire Safety', status: 'overdue', expiry: 'May 2024' },
                    { item: 'ISO Certification', status: 'valid', expiry: 'Jan 2025' },
                    { item: 'NIRF Participation', status: 'valid', expiry: 'Annual' },
                  ].map((compliance, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileCheck className={`w-5 h-5 ${
                          compliance.status === 'valid' ? 'text-green-600' :
                          compliance.status === 'due-soon' ? 'text-amber-600' :
                          'text-red-600'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{compliance.item}</p>
                          <p className="text-xs text-gray-500">Expires: {compliance.expiry}</p>
                        </div>
                      </div>
                      <Badge className={
                        compliance.status === 'valid' ? 'bg-green-100 text-green-700' :
                        compliance.status === 'due-soon' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }>
                        {compliance.status === 'valid' ? 'Valid' :
                         compliance.status === 'due-soon' ? 'Due Soon' : 'Overdue'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Financial Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Annual Budget</span>
                      <span className="text-lg font-bold text-gray-900">₹245 Cr</span>
                    </div>
                    <Progress value={75} className="h-3" />
                    <p className="text-xs text-gray-500 mt-1">75% utilized (₹183.75 Cr)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-900 mb-1">Fee Collection</p>
                      <p className="text-xl font-bold text-blue-900">₹165 Cr</p>
                      <p className="text-xs text-blue-700">92% collected</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-900 mb-1">Grants Received</p>
                      <p className="text-xl font-bold text-green-900">₹45 Cr</p>
                      <p className="text-xs text-green-700">+15% YoY</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Revenue Breakdown</p>
                    <div className="space-y-2">
                      {[
                        { category: 'Tuition Fees', percentage: 67, amount: '₹165 Cr' },
                        { category: 'Research Grants', percentage: 18, amount: '₹45 Cr' },
                        { category: 'Other Income', percentage: 15, amount: '₹35 Cr' },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{item.category}</span>
                            <span className="font-semibold text-gray-900">{item.amount}</span>
                          </div>
                          <Progress value={item.percentage} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {[
                  { activity: 'NAAC renewal application submitted', time: '2 hours ago', type: 'compliance' },
                  { activity: 'Department of CSE achieved A+ grade', time: '1 day ago', type: 'achievement' },
                  { activity: 'New research grant approved - ₹2.5 Cr', time: '2 days ago', type: 'financial' },
                  { activity: 'Annual placement drive completed', time: '3 days ago', type: 'placement' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'compliance' ? 'bg-blue-500' :
                      item.type === 'achievement' ? 'bg-green-500' :
                      item.type === 'financial' ? 'bg-amber-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{item.activity}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
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
                  { label: 'View Analytics', icon: BarChart3, action: () => setActiveTab('analytics') },
                  { label: 'Check Compliance', icon: Shield, action: () => setActiveTab('compliance') },
                  { label: 'Department Reports', icon: Building2, action: () => setActiveTab('departments') },
                  { label: 'Generate Reports', icon: FileCheck, action: () => setActiveTab('reports') },
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

        {/* Analytics Tab */}
        {activeTab === 'analytics' && <UniversityAnalytics />}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && <UniversityCompliance />}

        {/* Departments Tab */}
        {activeTab === 'departments' && <UniversityDepartments />}

        {/* Reports Tab */}
        {activeTab === 'reports' && <UniversityReports />}
      </div>
    </div>
  );
}
