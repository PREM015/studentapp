import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  BookOpen, FileText, Video, Link as LinkIcon, Download, 
  Eye, CheckCircle2, Upload, Send, Clock, Award, ChevronRight,
  Search, Filter, ArrowLeft, Play
} from 'lucide-react';

export default function StudentCoursework() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  // Course List View
  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
          <p className="text-sm text-gray-500">Semester 5 - 2023-24</p>
        </div>

        <div className="p-4 pb-24 space-y-3">
          {[
            { code: 'CSE-301', name: 'Data Structures & Algorithms', teacher: 'Dr. Sharma', progress: 75, attendance: 85, credits: 4 },
            { code: 'CSE-302', name: 'Web Development', teacher: 'Prof. Gupta', progress: 68, attendance: 82, credits: 3 },
            { code: 'CSE-303', name: 'Database Systems', teacher: 'Dr. Patel', progress: 80, attendance: 88, credits: 4 },
            { code: 'CSE-304', name: 'Operating Systems', teacher: 'Prof. Kumar', progress: 72, attendance: 78, credits: 4 },
          ].map((course, idx) => (
            <Card 
              key={idx} 
              className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCourse(course.code)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{course.name}</h4>
                    <Badge className="bg-blue-100 text-blue-700 text-xs">{course.code}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{course.teacher}</p>
                  <p className="text-xs text-gray-500 mt-1">{course.credits} Credits</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-semibold text-gray-900">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Attendance</span>
                    <span className="text-xs font-semibold text-gray-900">{course.attendance}%</span>
                  </div>
                  <Progress value={course.attendance} className="h-1.5" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">8 Materials</Badge>
                <Badge variant="outline" className="text-xs">3 Assignments</Badge>
                <Badge className="bg-green-100 text-green-700 text-xs">B+</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Course Detail View
  if (selectedAssignment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <Button variant="ghost" size="sm" onClick={() => setSelectedAssignment(null)} className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
          <h2 className="text-xl font-bold text-gray-900">{selectedAssignment.title}</h2>
          <p className="text-sm text-gray-500">Due: {selectedAssignment.dueDate}</p>
        </div>

        <div className="p-4 pb-24 space-y-4">
          {/* Assignment Details */}
          <Card className="p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Badge className={`${
                selectedAssignment.status === 'submitted' ? 'bg-green-100 text-green-700' :
                selectedAssignment.status === 'graded' ? 'bg-purple-100 text-purple-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {selectedAssignment.status === 'submitted' ? 'Submitted' :
                 selectedAssignment.status === 'graded' ? 'Graded' : 'Pending'}
              </Badge>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{selectedAssignment.points} Points</p>
                <p className="text-xs text-gray-500">Max Marks</p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700">
                Implement a complete Binary Search Tree with the following operations:
                insert, delete, search, inorder traversal, preorder traversal, and postorder traversal.
                Include proper documentation and test cases.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2 mt-4">Instructions</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>Use any programming language (C++/Java/Python preferred)</li>
                <li>Include comments explaining your logic</li>
                <li>Write at least 5 test cases</li>
                <li>Submit both source code and documentation</li>
              </ul>
            </div>
          </Card>

          {/* Submission Section */}
          {selectedAssignment.status === 'pending' && (
            <Card className="p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Submit Assignment</h4>
              
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload files</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, ZIP (Max 10MB)</p>
                </div>

                <Textarea 
                  placeholder="Add comments or notes for your teacher (optional)"
                  className="resize-none"
                  rows={3}
                />

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Assignment
                </Button>
              </div>
            </Card>
          )}

          {/* Graded View */}
          {selectedAssignment.status === 'graded' && (
            <Card className="p-4 border border-green-200 bg-green-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">Grade Received</h4>
                  <p className="text-sm text-gray-600">Graded on Jun 12, 2024</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">92/100</div>
                  <Badge className="bg-green-600 text-white mt-1">A</Badge>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Teacher's Feedback</h5>
                <p className="text-sm text-gray-700">
                  Excellent implementation! Your code is well-structured and thoroughly commented. 
                  The test cases cover all edge cases. Minor improvement: consider optimizing the delete operation.
                </p>
              </div>

              <Button variant="outline" className="w-full mt-3">
                <Download className="w-4 h-4 mr-2" />
                Download Graded Copy
              </Button>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Material Viewer
  if (selectedMaterial) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <Button variant="ghost" size="sm" onClick={() => setSelectedMaterial(null)} className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Materials
          </Button>
          <h2 className="text-xl font-bold text-gray-900">{selectedMaterial.title}</h2>
          <p className="text-sm text-gray-500">{selectedMaterial.module}</p>
        </div>

        <div className="p-4 pb-24">
          {selectedMaterial.type === 'video' ? (
            <Card className="p-0 border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-50"
                />
                <Button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700">
                  <Play className="w-8 h-8" />
                </Button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Duration: 45:20</span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <Progress value={35} className="h-1.5" />
                <p className="text-xs text-gray-500 mt-1">35% watched</p>
              </div>
            </Card>
          ) : (
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-gray-900">{selectedMaterial.title}.pdf</span>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-16 h-16 text-gray-400" />
              </div>

              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Open in Viewer
              </Button>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Data Structures & Algorithms</h2>
            <p className="text-sm text-gray-500">CSE-301 • Dr. Sharma • 4 Credits</p>
          </div>
          <Badge className="bg-green-100 text-green-700">B+</Badge>
        </div>
      </div>

      {/* Course Info Card */}
      <div className="p-4 pb-0">
        <Card className="p-4 border border-gray-200 mb-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-xs text-gray-500">Attendance</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8/10</p>
              <p className="text-xs text-gray-500">Assignments</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">75%</p>
              <p className="text-xs text-gray-500">Progress</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="materials" className="px-4 pb-24">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-0 space-y-4">
          <Card className="p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Course Description</h4>
            <p className="text-sm text-gray-700">
              This course covers fundamental data structures including arrays, linked lists, stacks, queues, 
              trees, and graphs. Students will learn algorithm analysis and implementation techniques.
            </p>
          </Card>

          <Card className="p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Syllabus</h4>
            <div className="space-y-2">
              {[
                { module: 'Module 1: Introduction', completed: true },
                { module: 'Module 2: Arrays & Linked Lists', completed: true },
                { module: 'Module 3: Stacks & Queues', completed: true },
                { module: 'Module 4: Trees', completed: false },
                { module: 'Module 5: Graphs', completed: false },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">{item.module}</span>
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Upcoming</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Next Class</p>
                  <p className="text-xs text-gray-600">Tomorrow, 9:00 AM • Lab-101</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <FileText className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Assignment Due</p>
                  <p className="text-xs text-gray-600">Binary Tree - Due in 2 days</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="mt-0 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search materials..." className="pl-9 h-9" />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {['Module 1: Introduction', 'Module 2: Arrays & Linked Lists', 'Module 3: Stacks & Queues'].map((module, moduleIdx) => (
            <div key={moduleIdx}>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">{module}</h4>
              <div className="space-y-2 mb-4">
                {[
                  { title: 'Lecture Notes', type: 'pdf', size: '2.3 MB', views: 45 },
                  { title: 'Video Tutorial', type: 'video', duration: '45:20', views: 32 },
                  { title: 'Practice Problems', type: 'pdf', size: '1.2 MB', views: 28 },
                ].map((material, idx) => (
                  <Card 
                    key={idx}
                    className="p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedMaterial({ ...material, module })}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${
                        material.type === 'pdf' ? 'bg-red-100' :
                        material.type === 'video' ? 'bg-purple-100' :
                        'bg-blue-100'
                      } flex items-center justify-center`}>
                        {material.type === 'pdf' && <FileText className="w-5 h-5 text-red-600" />}
                        {material.type === 'video' && <Video className="w-5 h-5 text-purple-600" />}
                        {material.type === 'link' && <LinkIcon className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-gray-900 text-sm">{material.title}</h5>
                        <p className="text-xs text-gray-500">
                          {material.type === 'video' ? material.duration : material.size} • {material.views} views
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="mt-0 space-y-3">
          {[
            { title: 'Binary Tree Implementation', dueDate: 'Jun 18, 11:59 PM', status: 'pending', points: 100, module: 'Module 4' },
            { title: 'Linked List Operations', dueDate: 'Jun 12, 11:59 PM', status: 'graded', points: 100, grade: 92, module: 'Module 2' },
            { title: 'Stack & Queue Problems', dueDate: 'Jun 8, 11:59 PM', status: 'submitted', points: 100, module: 'Module 3' },
          ].map((assignment, idx) => (
            <Card 
              key={idx}
              className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedAssignment(assignment)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{assignment.title}</h5>
                  <p className="text-xs text-gray-500">{assignment.module}</p>
                </div>
                <Badge className={`${
                  assignment.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {assignment.status === 'pending' ? 'Pending' :
                   assignment.status === 'submitted' ? 'Submitted' : 'Graded'}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">Due: {assignment.dueDate}</span>
                </div>
                <span className="text-gray-900 font-semibold">{assignment.points} points</span>
              </div>

              {assignment.status === 'graded' && (
                <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Grade: {assignment.grade}/{assignment.points}</span>
                  </div>
                  <Badge className="bg-green-600 text-white">A</Badge>
                </div>
              )}

              {assignment.status === 'pending' && (
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Assignment
                </Button>
              )}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
