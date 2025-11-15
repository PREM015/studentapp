import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  TrendingUp, TrendingDown, Users, GraduationCap, Award,
  DollarSign, BookOpen, Building2, BarChart3, Download,
  Calendar, Target, AlertCircle, CheckCircle
} from 'lucide-react';

export default function UniversityAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">University Analytics</h2>
          <p className="text-gray-500">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>Academic Year 2023-24</option>
            <option>Academic Year 2022-23</option>
            <option>Academic Year 2021-22</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-6 gap-4">
        {[
          { label: 'Total Students', value: '15,420', change: '+850', trend: 'up', icon: Users },
          { label: 'Faculty', value: '680', change: '+25', trend: 'up', icon: GraduationCap },
          { label: 'Placement Rate', value: '78%', change: '+5%', trend: 'up', icon: Target },
          { label: 'Avg Package', value: '₹4.8L', change: '+8%', trend: 'up', icon: DollarSign },
          { label: 'Research Papers', value: '245', change: '+45', trend: 'up', icon: BookOpen },
          { label: 'NIRF Rank', value: '#142', change: '↑8', trend: 'up', icon: Award },
        ].map((metric, idx) => (
          <Card key={idx} className="p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <metric.icon className="w-5 h-5 text-blue-600" />
              <div className={`flex items-center gap-1 text-xs ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{metric.change}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-xs text-gray-500">{metric.label}</p>
          </Card>
        ))}
      </div>

      {/* Department Performance */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance Overview</h3>
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Students</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Faculty</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg CGPA</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Placement</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Research</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NAAC</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { dept: 'Computer Science & Engineering', students: 3200, faculty: 180, cgpa: 8.2, placement: 85, research: 95, naac: 'A+', score: 92 },
                { dept: 'Electronics & Communication', students: 2800, faculty: 145, cgpa: 7.9, placement: 72, research: 78, naac: 'A', score: 85 },
                { dept: 'Mechanical Engineering', students: 2500, faculty: 130, cgpa: 7.7, placement: 68, research: 65, naac: 'A', score: 82 },
                { dept: 'Civil Engineering', students: 2200, faculty: 115, cgpa: 7.6, placement: 65, research: 52, naac: 'A', score: 78 },
                { dept: 'Electrical Engineering', students: 1900, faculty: 105, cgpa: 7.8, placement: 70, research: 60, naac: 'A', score: 80 },
              ].map((dept, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{dept.dept}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{dept.students.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{dept.faculty}</td>
                  <td className="py-3 px-4">
                    <Badge className={
                      dept.cgpa >= 8 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }>
                      {dept.cgpa}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Progress value={dept.placement} className="w-16 h-2" />
                      <span className="text-sm font-semibold text-gray-900">{dept.placement}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{dept.research}</td>
                  <td className="py-3 px-4">
                    <Badge className={
                      dept.naac === 'A+' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }>
                      {dept.naac}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Progress value={dept.score} className="w-24 h-2" />
                      <span className="text-sm font-semibold text-gray-900">{dept.score}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Academic Performance Trends */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">5-Year Academic Trends</h3>
          <div className="space-y-4">
            {[
              { metric: 'Average CGPA', years: [7.2, 7.4, 7.6, 7.7, 7.8], current: 7.8 },
              { metric: 'Student Satisfaction', years: [75, 78, 80, 82, 85], current: 85 },
              { metric: 'Faculty-Student Ratio', years: [18, 17, 16, 15, 14], current: 14 },
            ].map((trend, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{trend.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{trend.current}</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {trend.years.map((value, yearIdx) => {
                    const maxValue = Math.max(...trend.years);
                    const height = (value / maxValue) * 100;
                    return (
                      <div key={yearIdx} className="flex-1 flex flex-col justify-end">
                        <div
                          className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                          title={`${2019 + yearIdx}: ${value}`}
                        />
                        <p className="text-xs text-center text-gray-500 mt-1">{2019 + yearIdx}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement & Research Trends</h3>
          <div className="space-y-4">
            {[
              { metric: 'Placement Rate (%)', years: [68, 72, 75, 76, 78], current: 78 },
              { metric: 'Research Publications', years: [180, 195, 210, 225, 245], current: 245 },
              { metric: 'Average Package (LPA)', years: [4.2, 4.4, 4.5, 4.6, 4.8], current: 4.8 },
            ].map((trend, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{trend.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{trend.current}</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {trend.years.map((value, yearIdx) => {
                    const maxValue = Math.max(...trend.years);
                    const height = (value / maxValue) * 100;
                    return (
                      <div key={yearIdx} className="flex-1 flex flex-col justify-end">
                        <div
                          className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                          title={`${2019 + yearIdx}: ${value}`}
                        />
                        <p className="text-xs text-center text-gray-500 mt-1">{2019 + yearIdx}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Infrastructure & Resources */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure & Resources Utilization</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { resource: 'Classrooms', total: 120, occupied: 95, percentage: 79 },
            { resource: 'Labs', total: 45, occupied: 38, percentage: 84 },
            { resource: 'Library Seats', total: 500, occupied: 380, percentage: 76 },
            { resource: 'Sports Facilities', total: 15, occupied: 12, percentage: 80 },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">{item.resource}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Utilization</span>
                  <span className="font-semibold text-gray-900">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <p className="text-xs text-gray-500">{item.occupied} / {item.total} in use</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Student Demographics */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Distribution by Year</h3>
          <div className="space-y-3">
            {[
              { year: '1st Year', count: 4200, percentage: 27 },
              { year: '2nd Year', count: 4000, percentage: 26 },
              { year: '3rd Year', count: 3800, percentage: 25 },
              { year: '4th Year', count: 3420, percentage: 22 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.year}</span>
                  <span className="font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="flex-1 h-2" />
                  <span className="text-xs text-gray-500 w-12">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#E5E7EB" strokeWidth="20" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#3B82F6" strokeWidth="20" 
                    strokeDasharray="440" strokeDashoffset="110" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">75%</p>
                    <p className="text-xs text-gray-500">Male</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-700">Male</span>
                </div>
                <span className="font-semibold text-gray-900">11,565 (75%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  <span className="text-sm text-gray-700">Female</span>
                </div>
                <span className="font-semibold text-gray-900">3,855 (25%)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">International Students</h3>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 mb-2">285</p>
              <p className="text-sm text-gray-500">from 28 countries</p>
            </div>
            <div className="space-y-2">
              {[
                { country: 'Nepal', count: 85 },
                { country: 'Bangladesh', count: 62 },
                { country: 'Sri Lanka', count: 45 },
                { country: 'Others', count: 93 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.country}</span>
                  <span className="font-semibold text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Key Performance Indicators */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { kpi: 'Student Retention Rate', current: 94, target: 95, status: 'warning' },
            { kpi: 'Faculty Satisfaction', current: 88, target: 85, status: 'good' },
            { kpi: 'Research Grant Success', current: 72, target: 75, status: 'warning' },
            { kpi: 'Alumni Employment Rate', current: 92, target: 90, status: 'good' },
            { kpi: 'Industry Collaborations', current: 45, target: 40, status: 'good' },
            { kpi: 'Student-Faculty Ratio', current: 14, target: 15, status: 'good' },
          ].map((kpi, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{kpi.kpi}</h4>
                {kpi.status === 'good' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current</span>
                  <span className="text-2xl font-bold text-gray-900">{kpi.current}</span>
                </div>
                <Progress value={(kpi.current / kpi.target) * 100} className="h-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Target: {kpi.target}</span>
                  <span className={kpi.status === 'good' ? 'text-green-600' : 'text-amber-600'}>
                    {kpi.current > kpi.target ? '↑' : '↓'} {Math.abs(kpi.current - kpi.target)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
