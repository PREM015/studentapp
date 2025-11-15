import { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Search, Filter, X, FileText, Users, Calendar, 
  BookOpen, Award, Building, ChevronRight, Clock
} from 'lucide-react';

export default function SearchResults() {
  const [searchQuery, setSearchQuery] = useState('machine learning');
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    category: 'all',
    sortBy: 'relevance',
  });

  const searchResults = {
    courses: [
      {
        id: 1,
        type: 'course',
        title: 'Machine Learning Fundamentals',
        code: 'CS301',
        instructor: 'Dr. Sarah Johnson',
        students: 65,
        semester: 'Fall 2024',
        relevance: 95,
      },
      {
        id: 2,
        type: 'course',
        title: 'Advanced Machine Learning',
        code: 'CS501',
        instructor: 'Prof. Michael Chen',
        students: 42,
        semester: 'Fall 2024',
        relevance: 88,
      },
    ],
    materials: [
      {
        id: 1,
        type: 'material',
        title: 'Introduction to Machine Learning - Lecture Notes',
        course: 'CS301',
        format: 'PDF',
        pages: 45,
        uploadedBy: 'Dr. Sarah Johnson',
        date: '2 days ago',
        relevance: 92,
      },
      {
        id: 2,
        type: 'material',
        title: 'Machine Learning Algorithms - Video Tutorial',
        course: 'CS301',
        format: 'Video',
        duration: '1h 23m',
        uploadedBy: 'Dr. Sarah Johnson',
        date: '1 week ago',
        relevance: 85,
      },
      {
        id: 3,
        type: 'material',
        title: 'Machine Learning Project Guidelines',
        course: 'CS301',
        format: 'PDF',
        pages: 12,
        uploadedBy: 'Dr. Sarah Johnson',
        date: '2 weeks ago',
        relevance: 78,
      },
    ],
    assignments: [
      {
        id: 1,
        type: 'assignment',
        title: 'Machine Learning Classification Project',
        course: 'CS301',
        dueDate: 'Dec 15, 2024',
        status: 'In Progress',
        points: 100,
        relevance: 90,
      },
      {
        id: 2,
        type: 'assignment',
        title: 'ML Algorithm Implementation',
        course: 'CS501',
        dueDate: 'Dec 20, 2024',
        status: 'Not Started',
        points: 150,
        relevance: 82,
      },
    ],
    students: [
      {
        id: 1,
        type: 'student',
        name: 'Emily Machine',
        rollNo: 'CS21B1042',
        batch: '2021-2025',
        department: 'Computer Science',
        relevance: 45,
      },
    ],
    events: [
      {
        id: 1,
        type: 'event',
        title: 'Workshop on Machine Learning Applications',
        date: 'Dec 18, 2024',
        time: '2:00 PM - 5:00 PM',
        location: 'Auditorium',
        organizer: 'CS Department',
        relevance: 88,
      },
      {
        id: 2,
        type: 'event',
        title: 'Guest Lecture: ML in Healthcare',
        date: 'Dec 22, 2024',
        time: '10:00 AM - 12:00 PM',
        location: 'Room 305',
        organizer: 'AI Club',
        relevance: 75,
      },
    ],
  };

  const totalResults = 
    searchResults.courses.length +
    searchResults.materials.length +
    searchResults.assignments.length +
    searchResults.students.length +
    searchResults.events.length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'material': return FileText;
      case 'assignment': return Award;
      case 'student': return Users;
      case 'event': return Calendar;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-700';
      case 'material': return 'bg-green-100 text-green-700';
      case 'assignment': return 'bg-purple-100 text-purple-700';
      case 'student': return 'bg-orange-100 text-orange-700';
      case 'event': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative max-w-3xl mx-auto mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500"
              placeholder="Search courses, materials, students..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <p className="text-sm text-gray-600">
              Found <strong>{totalResults}</strong> results for "<strong>{searchQuery}</strong>"
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="all">
              All ({totalResults})
            </TabsTrigger>
            <TabsTrigger value="courses">
              <BookOpen className="w-4 h-4 mr-2" />
              Courses ({searchResults.courses.length})
            </TabsTrigger>
            <TabsTrigger value="materials">
              <FileText className="w-4 h-4 mr-2" />
              Materials ({searchResults.materials.length})
            </TabsTrigger>
            <TabsTrigger value="assignments">
              <Award className="w-4 h-4 mr-2" />
              Assignments ({searchResults.assignments.length})
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              Events ({searchResults.events.length})
            </TabsTrigger>
            <TabsTrigger value="students">
              <Users className="w-4 h-4 mr-2" />
              Students ({searchResults.students.length})
            </TabsTrigger>
          </TabsList>

          {/* All Results */}
          <TabsContent value="all" className="space-y-6">
            {/* Courses */}
            {searchResults.courses.length > 0 && (
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Courses</h3>
                <div className="space-y-3">
                  {searchResults.courses.map((course) => (
                    <Card key={course.id} className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="text-gray-900 mb-1">{course.title}</h4>
                              <p className="text-sm text-gray-600">
                                {course.code} • {course.instructor} • {course.students} students
                              </p>
                            </div>
                            <Badge className={getTypeColor('course')}>Course</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{course.semester}</span>
                            <span>•</span>
                            <span>{course.relevance}% relevance</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Materials */}
            {searchResults.materials.length > 0 && (
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Materials</h3>
                <div className="space-y-3">
                  {searchResults.materials.map((material) => (
                    <Card key={material.id} className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="text-gray-900 mb-1">{material.title}</h4>
                              <p className="text-sm text-gray-600">
                                {material.course} • {material.format} • {material.pages ? `${material.pages} pages` : material.duration}
                              </p>
                            </div>
                            <Badge className={getTypeColor('material')}>{material.format}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>By {material.uploadedBy}</span>
                            <span>•</span>
                            <span>{material.date}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Assignments */}
            {searchResults.assignments.length > 0 && (
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Assignments</h3>
                <div className="space-y-3">
                  {searchResults.assignments.map((assignment) => (
                    <Card key={assignment.id} className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="text-gray-900 mb-1">{assignment.title}</h4>
                              <p className="text-sm text-gray-600">
                                {assignment.course} • Due: {assignment.dueDate} • {assignment.points} points
                              </p>
                            </div>
                            <Badge className={
                              assignment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                              assignment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }>
                              {assignment.status}
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            {searchResults.events.length > 0 && (
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Events</h3>
                <div className="space-y-3">
                  {searchResults.events.map((event) => (
                    <Card key={event.id} className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="text-gray-900 mb-1">{event.title}</h4>
                              <p className="text-sm text-gray-600">
                                {event.date} • {event.time}
                              </p>
                              <p className="text-sm text-gray-600">
                                {event.location} • by {event.organizer}
                              </p>
                            </div>
                            <Badge className={getTypeColor('event')}>Event</Badge>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Individual Category Tabs */}
          <TabsContent value="courses">
            <div className="space-y-3">
              {searchResults.courses.map((course) => (
                <Card key={course.id} className="p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-gray-900 mb-2">{course.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Course Code</p>
                          <p className="text-gray-900">{course.code}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Instructor</p>
                          <p className="text-gray-900">{course.instructor}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Students</p>
                          <p className="text-gray-900">{course.students}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Semester</p>
                          <p className="text-gray-900">{course.semester}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add similar detailed views for other tabs */}
        </Tabs>
      </div>
    </div>
  );
}
