import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Star, Award, Target,
  Users, Download, Filter, Search, GraduationCap, Briefcase,
  CheckCircle, XCircle, Clock, BarChart3, PieChart
} from 'lucide-react';

export default function TPCStudentAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Analytics</h2>
          <p className="text-gray-500">Placement readiness and performance insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>Batch 2024</option>
            <option>Batch 2023</option>
            <option>Batch 2022</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Total Students', value: '200', change: '+10', icon: Users, color: 'blue' },
          { label: 'Placed', value: '156', change: '+12', icon: CheckCircle, color: 'green' },
          { label: 'In Process', value: '32', change: '+5', icon: Clock, color: 'amber' },
          { label: 'Not Placed', value: '12', change: '-2', icon: XCircle, color: 'red' },
          { label: 'Placement Rate', value: '78%', change: '+5%', icon: Target, color: 'purple' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <Badge className={`${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              } text-xs`}>
                {stat.change}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Placement Readiness Score */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Readiness Distribution</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { category: 'Highly Ready', count: 85, percentage: 42.5, color: 'green', description: 'CGPA > 8, Skills certified, Projects completed' },
            { category: 'Ready', count: 65, percentage: 32.5, color: 'blue', description: 'CGPA > 7, Good skills, Some projects' },
            { category: 'Needs Improvement', count: 35, percentage: 17.5, color: 'amber', description: 'CGPA > 6.5, Basic skills, Limited projects' },
            { category: 'At Risk', count: 15, percentage: 7.5, color: 'red', description: 'CGPA < 6.5, Gaps in skills/experience' },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg border-2 border-${item.color}-200 bg-${item.color}-50`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{item.category}</h4>
                <Badge className={`bg-${item.color}-600 text-white`}>
                  {item.count}
                </Badge>
              </div>
              <Progress value={item.percentage} className="mb-2" />
              <p className="text-sm text-gray-600 mb-2">{item.percentage}% of total</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Branch-wise Analysis */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch-wise Placement Status</h3>
          <div className="space-y-3">
            {[
              { branch: 'Computer Science', total: 100, placed: 85, percentage: 85 },
              { branch: 'Information Technology', total: 50, placed: 42, percentage: 84 },
              { branch: 'Electronics', total: 30, placed: 20, percentage: 67 },
              { branch: 'Mechanical', total: 20, placed: 9, percentage: 45 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{item.branch}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{item.placed}/{item.total}</span>
                    <Badge className={
                      item.percentage >= 80 ? 'bg-green-100 text-green-700' :
                      item.percentage >= 60 ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }>
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Distribution</h3>
          <div className="space-y-3">
            {[
              { range: '> 10 LPA', count: 15, color: 'purple' },
              { range: '7-10 LPA', count: 35, color: 'blue' },
              { range: '5-7 LPA', count: 58, color: 'green' },
              { range: '3-5 LPA', count: 42, color: 'amber' },
              { range: '< 3 LPA', count: 6, color: 'red' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                  <span className="font-medium text-gray-900">{item.range}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={(item.count / 156) * 100} className="w-24 h-2" />
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Performers & At-Risk Students */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <Badge className="bg-green-100 text-green-700">Top 10</Badge>
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Student Name {idx + 1}</p>
                    <p className="text-sm text-gray-500">CSE2022{(idx + 1).toString().padStart(3, '0')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900">{(9.5 - idx * 0.2).toFixed(1)}</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    ₹{12 - idx}L Package
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">At-Risk Students</h3>
            <Badge className="bg-red-100 text-red-700">15 Students</Badge>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Student A', issue: 'Low CGPA (6.2)', risk: 'High', action: 'Counseling scheduled' },
              { name: 'Student B', issue: 'Attendance < 75%', risk: 'High', action: 'Warning issued' },
              { name: 'Student C', issue: 'No placement applications', risk: 'Medium', action: 'Follow-up required' },
              { name: 'Student D', issue: 'Failed interviews (3)', risk: 'Medium', action: 'Mock interviews' },
              { name: 'Student E', issue: 'Skill gap identified', risk: 'Low', action: 'Training enrolled' },
            ].map((student, idx) => (
              <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                student.risk === 'High' ? 'border-red-500 bg-red-50' :
                student.risk === 'Medium' ? 'border-amber-500 bg-amber-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.issue}</p>
                  </div>
                  <Badge className={
                    student.risk === 'High' ? 'bg-red-600 text-white' :
                    student.risk === 'Medium' ? 'bg-amber-600 text-white' :
                    'bg-blue-600 text-white'
                  }>
                    {student.risk}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-gray-600">{student.action}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Student List */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Student Database</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search students..." className="pl-9 w-64" />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Branches</option>
              <option>Computer Science</option>
              <option>IT</option>
              <option>Electronics</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Status</option>
              <option>Placed</option>
              <option>In Process</option>
              <option>Not Placed</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Branch</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">CGPA</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Applications</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Interviews</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Package</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Readiness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.from({ length: 15 }).map((_, idx) => {
                const statuses = ['Placed', 'In Process', 'Not Placed'];
                const status = idx < 10 ? 'Placed' : idx < 13 ? 'In Process' : 'Not Placed';
                const cgpa = (7 + Math.random() * 2.5).toFixed(2);
                const readiness = parseFloat(cgpa) >= 8.5 ? 'High' : parseFloat(cgpa) >= 7.5 ? 'Medium' : 'Low';
                
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                          alt="Student"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Student {idx + 1}</p>
                          <p className="text-sm text-gray-500">CSE2022{(idx + 1).toString().padStart(3, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      Computer Science
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        parseFloat(cgpa) >= 8.5 ? 'bg-green-100 text-green-700' :
                        parseFloat(cgpa) >= 7.5 ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }>
                        {cgpa}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {5 + Math.floor(Math.random() * 10)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {2 + Math.floor(Math.random() * 5)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        status === 'Placed' ? 'bg-green-100 text-green-700' :
                        status === 'In Process' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }>
                        {status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {status === 'Placed' ? (
                        <span className="font-semibold text-gray-900">
                          ₹{(4 + Math.random() * 6).toFixed(1)}L
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          readiness === 'High' ? 'bg-green-500' :
                          readiness === 'Medium' ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`} />
                        <span className="text-sm text-gray-700">{readiness}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Skills Gap Analysis */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Gap Analysis</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { skill: 'Data Structures', proficient: 75, learning: 20, gap: 5 },
            { skill: 'Web Development', proficient: 60, learning: 30, gap: 10 },
            { skill: 'Database Systems', proficient: 65, learning: 25, gap: 10 },
            { skill: 'Cloud Computing', proficient: 40, learning: 35, gap: 25 },
            { skill: 'Machine Learning', proficient: 30, learning: 40, gap: 30 },
            { skill: 'System Design', proficient: 35, learning: 30, gap: 35 },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">{item.skill}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Proficient</span>
                  <span className="font-semibold">{item.proficient}%</span>
                </div>
                <Progress value={item.proficient} className="h-2 bg-green-200" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Learning</span>
                  <span className="font-semibold">{item.learning}%</span>
                </div>
                <Progress value={item.learning} className="h-2 bg-blue-200" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-700">Gap</span>
                  <span className="font-semibold">{item.gap}%</span>
                </div>
                <Progress value={item.gap} className="h-2 bg-red-200" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
