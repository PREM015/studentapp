import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Search, Filter, Download, Mail, Phone, Calendar, 
  TrendingUp, TrendingDown, AlertTriangle, Star, Users,
  Eye, MessageSquare, ChevronRight, CheckCircle, XCircle
} from 'lucide-react';

export default function TeacherStudents() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const students = Array.from({ length: 60 }, (_, i) => ({
    id: `CSE2022${(i + 1).toString().padStart(3, '0')}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@university.edu`,
    phone: '+91 98765 43210',
    batch: 'CSE-2022-A',
    semester: 6,
    cgpa: (7 + Math.random() * 2.5).toFixed(2),
    attendance: 75 + Math.floor(Math.random() * 25),
    assignments: {
      submitted: 8 + Math.floor(Math.random() * 4),
      total: 12,
    },
    performance: ['Excellent', 'Good', 'Average', 'Needs Attention'][Math.floor(Math.random() * 4)],
    lastActive: ['2 hours ago', '1 day ago', '3 days ago'][Math.floor(Math.random() * 3)],
  }));

  if (selectedStudent) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedStudent(null)}>
            ← Back to Students
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Student Profile */}
        <Card className="p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop`}
              alt={selectedStudent.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                  <p className="text-gray-600">{selectedStudent.id}</p>
                  <Badge className={`mt-2 ${
                    selectedStudent.performance === 'Excellent' ? 'bg-green-100 text-green-700' :
                    selectedStudent.performance === 'Good' ? 'bg-blue-100 text-blue-700' :
                    selectedStudent.performance === 'Average' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedStudent.performance}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900 mb-1">CGPA</p>
                  <p className="text-2xl font-bold text-blue-900">{selectedStudent.cgpa}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-900 mb-1">Attendance</p>
                  <p className="text-2xl font-bold text-green-900">{selectedStudent.attendance}%</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-900 mb-1">Assignments</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {selectedStudent.assignments.submitted}/{selectedStudent.assignments.total}
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-900 mb-1">Semester</p>
                  <p className="text-2xl font-bold text-amber-900">{selectedStudent.semester}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{selectedStudent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{selectedStudent.batch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Last active: {selectedStudent.lastActive}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
            <div className="space-y-3">
              {[
                { subject: 'Data Structures', score: 85, trend: 'up' },
                { subject: 'Web Development', score: 92, trend: 'up' },
                { subject: 'Database Systems', score: 78, trend: 'down' },
                { subject: 'Operating Systems', score: 88, trend: 'up' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{item.score}%</span>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { activity: 'Submitted Assignment 3', time: '2 hours ago', type: 'success' },
                { activity: 'Attended Data Structures class', time: '1 day ago', type: 'info' },
                { activity: 'Missed Web Dev class', time: '2 days ago', type: 'warning' },
                { activity: 'Scored 92% in Quiz 2', time: '3 days ago', type: 'success' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {item.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  {item.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />}
                  {item.type === 'info' && <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{item.activity}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Students</h2>
          <p className="text-gray-500">{students.length} students across all classes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: students.length, icon: Users, color: 'blue' },
          { label: 'Excellent', value: students.filter(s => s.performance === 'Excellent').length, icon: Star, color: 'green' },
          { label: 'Need Attention', value: students.filter(s => s.performance === 'Needs Attention').length, icon: AlertTriangle, color: 'red' },
          { label: 'Avg Attendance', value: '82%', icon: TrendingUp, color: 'purple' },
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

      {/* Filters */}
      <Card className="p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Batches</option>
            <option>CSE-2022-A</option>
            <option>CSE-2022-B</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Performance</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
            <option>Needs Attention</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Students List */}
      <Card className="border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">CGPA</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Attendance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assignments</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Performance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.slice(0, 20).map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.batch}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{student.id}</td>
                  <td className="py-3 px-4">
                    <Badge className={
                      parseFloat(student.cgpa) >= 8.5 ? 'bg-green-100 text-green-700' :
                      parseFloat(student.cgpa) >= 7.5 ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }>
                      {student.cgpa}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Progress value={student.attendance} className="w-16 h-2" />
                      <span className="text-sm font-semibold text-gray-900">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {student.assignments.submitted}/{student.assignments.total}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={
                      student.performance === 'Excellent' ? 'bg-green-100 text-green-700' :
                      student.performance === 'Good' ? 'bg-blue-100 text-blue-700' :
                      student.performance === 'Average' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }>
                      {student.performance}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
