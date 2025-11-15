import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { 
  BookOpen, Upload, FileText, Video, Link, Users, Calendar,
  Plus, Edit, Trash2, Eye, Download, CheckCircle, Clock,
  TrendingUp, Award, Send, MessageSquare
} from 'lucide-react';

export default function TeacherCoursework() {
  const [selectedView, setSelectedView] = useState<'overview' | 'materials' | 'assignments'>('overview');
  const [showCreateMaterial, setShowCreateMaterial] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Data Structures & Algorithms</h2>
              <Badge className="bg-blue-100 text-blue-700">CSE-301</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Semester: 5th</span>
              <span>•</span>
              <span>Credits: 4</span>
              <span>•</span>
              <span>Batch: CSE-2022-A</span>
              <span>•</span>
              <span>60 Students</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Mon/Wed/Fri: 9:00-10:30 AM • Lab-101
            </p>
          </div>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Course
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Avg Attendance', value: '82%', icon: Users, color: 'blue' },
            { label: 'Submission Rate', value: '75%', icon: CheckCircle, color: 'green' },
            { label: 'Average Grade', value: 'B+', icon: Award, color: 'purple' },
            { label: 'At-Risk Students', value: '3', icon: TrendingUp, color: 'amber' },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Tabs value={selectedView} onValueChange={(v: any) => setSelectedView(v)}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="col-span-2 p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { type: 'submission', text: '5 students submitted Assignment 3', time: '2 hours ago' },
                  { type: 'material', text: 'Uploaded new video: Tree Traversals', time: '1 day ago' },
                  { type: 'grade', text: 'Published grades for Assignment 2', time: '2 days ago' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'submission' ? 'bg-blue-100' :
                      activity.type === 'material' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {activity.type === 'submission' && <FileText className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'material' && <Upload className="w-4 h-4 text-green-600" />}
                      {activity.type === 'grade' && <Award className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming */}
            <Card className="p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Upcoming</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-sm text-blue-900">Next Class</span>
                  </div>
                  <p className="text-xs text-blue-700">Tomorrow, 9:00 AM</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-sm text-amber-900">Assignment Due</span>
                  </div>
                  <p className="text-xs text-amber-700">In 2 days</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Syllabus */}
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Course Syllabus</h3>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="space-y-2">
              {[
                { module: 'Module 1: Introduction to Data Structures', topics: 5, completed: true },
                { module: 'Module 2: Arrays and Linked Lists', topics: 8, completed: true },
                { module: 'Module 3: Stacks and Queues', topics: 6, completed: true },
                { module: 'Module 4: Trees', topics: 10, completed: false },
                { module: 'Module 5: Graphs', topics: 8, completed: false },
              ].map((module, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{module.module}</h4>
                      <p className="text-sm text-gray-500 mt-1">{module.topics} topics</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.completed ? (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-700">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Course Materials</h3>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreateMaterial(!showCreateMaterial)}>
                <Plus className="w-4 h-4 mr-2" />
                Upload Material
              </Button>
            </div>

            {showCreateMaterial && (
              <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Upload New Material</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <Input placeholder="e.g., Binary Search Trees - Lecture Notes" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Module 1: Introduction</option>
                      <option>Module 2: Arrays & Linked Lists</option>
                      <option>Module 3: Stacks & Queues</option>
                      <option>Module 4: Trees</option>
                      <option>Module 5: Graphs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Textarea rows={3} placeholder="Add description..." />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, PPT, Video (Max 50MB)</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowCreateMaterial(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Material
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Materials List */}
            <div className="space-y-4">
              {['Module 1: Introduction', 'Module 2: Arrays & Linked Lists', 'Module 3: Stacks & Queues'].map((module, moduleIdx) => (
                <div key={moduleIdx}>
                  <h4 className="font-medium text-gray-900 mb-3">{module}</h4>
                  <div className="space-y-2">
                    {[
                      { title: 'Lecture Notes', type: 'pdf', size: '2.3 MB', views: 45, downloads: 38 },
                      { title: 'Video Lecture', type: 'video', duration: '45:20', views: 32, downloads: 0 },
                      { title: 'Practice Problems', type: 'pdf', size: '1.2 MB', views: 28, downloads: 25 },
                    ].map((material, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            material.type === 'pdf' ? 'bg-red-100' :
                            material.type === 'video' ? 'bg-purple-100' :
                            'bg-blue-100'
                          }`}>
                            {material.type === 'pdf' && <FileText className="w-6 h-6 text-red-600" />}
                            {material.type === 'video' && <Video className="w-6 h-6 text-purple-600" />}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{material.title}</h5>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-gray-500">
                                {material.type === 'video' ? material.duration : material.size}
                              </span>
                              <span className="text-sm text-gray-500">• {material.views} views</span>
                              {material.downloads > 0 && (
                                <span className="text-sm text-gray-500">• {material.downloads} downloads</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-6">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Assignments</h3>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowCreateAssignment(!showCreateAssignment)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </div>

            {showCreateAssignment && (
              <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Create New Assignment</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <Input placeholder="e.g., Binary Tree Implementation" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>Module 4: Trees</option>
                        <option>Module 5: Graphs</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Marks</label>
                      <Input type="number" placeholder="100" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Due Time</label>
                      <Input type="time" defaultValue="23:59" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Textarea rows={4} placeholder="Assignment description and instructions..." />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowCreateAssignment(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Create Assignment
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Assignments List */}
            <div className="space-y-3">
              {[
                { title: 'Binary Tree Implementation', module: 'Module 4', dueDate: 'Jun 18, 2024', submitted: 45, total: 60, graded: 30 },
                { title: 'Linked List Operations', module: 'Module 2', dueDate: 'Jun 12, 2024', submitted: 58, total: 60, graded: 58 },
                { title: 'Stack & Queue Problems', module: 'Module 3', dueDate: 'Jun 8, 2024', submitted: 55, total: 60, graded: 52 },
              ].map((assignment, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                      <p className="text-sm text-gray-500">{assignment.module}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                    <Badge className={
                      assignment.graded === assignment.submitted ? 'bg-green-100 text-green-700' :
                      assignment.submitted === assignment.total ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }>
                      {assignment.graded === assignment.submitted ? 'All Graded' :
                       assignment.submitted === assignment.total ? 'All Submitted' : 'Active'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Submissions</p>
                      <Progress value={(assignment.submitted / assignment.total) * 100} className="mb-1" />
                      <p className="text-sm font-semibold text-gray-900">{assignment.submitted}/{assignment.total}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Graded</p>
                      <Progress value={(assignment.graded / assignment.submitted) * 100} className="mb-1" />
                      <p className="text-sm font-semibold text-gray-900">{assignment.graded}/{assignment.submitted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Avg Score</p>
                      <p className="text-2xl font-bold text-gray-900">82%</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Submissions
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Award className="w-4 h-4 mr-2" />
                      Grade ({assignment.submitted - assignment.graded} pending)
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Enrolled Students (60)</h3>
              <div className="flex items-center gap-2">
                <Input placeholder="Search students..." className="w-64" />
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Attendance</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assignments</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg Grade</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const attendance = 80 + Math.random() * 15;
                    const isAtRisk = attendance < 75;
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
                              <p className="font-medium text-gray-900">Student Name {idx + 1}</p>
                              <p className="text-sm text-gray-500">CSE2022{(idx + 1).toString().padStart(3, '0')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Progress value={attendance} className="h-2" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 w-12">{Math.round(attendance)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-900">8/10</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={
                            idx < 3 ? 'bg-green-100 text-green-700' :
                            idx < 7 ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }>
                            {idx < 3 ? 'A' : idx < 7 ? 'B+' : 'B'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {isAtRisk ? (
                            <Badge className="bg-red-100 text-red-700">At Risk</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">On Track</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            View Profile
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
