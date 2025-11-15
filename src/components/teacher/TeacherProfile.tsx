import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, BookOpen, 
  Users, Clock, TrendingUp, Edit, Download, Star, 
  GraduationCap, Briefcase, FileText, CheckCircle
} from 'lucide-react';

export default function TeacherProfile() {
  const teacherData = {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Computer Science',
    designation: 'Associate Professor',
    employeeId: 'EMP-2019-1234',
    joinDate: 'August 2019',
    officeRoom: 'CS Building, Room 305',
    officeHours: 'Mon-Fri: 2:00 PM - 4:00 PM',
    specialization: ['Machine Learning', 'Data Science', 'AI'],
    education: [
      { degree: 'Ph.D. in Computer Science', university: 'Stanford University', year: '2018' },
      { degree: 'M.S. in Computer Science', university: 'MIT', year: '2015' },
      { degree: 'B.Tech in CSE', university: 'IIT Delhi', year: '2013' },
    ],
    experience: '6+ years in academia',
  };

  const stats = [
    { label: 'Active Courses', value: '8', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Total Students', value: '342', icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Classes This Week', value: '16', icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  ];

  const courses = [
    { code: 'CS301', name: 'Machine Learning', students: 65, progress: 75, status: 'Active' },
    { code: 'CS402', name: 'Deep Learning', students: 48, progress: 60, status: 'Active' },
    { code: 'CS501', name: 'AI Fundamentals', students: 82, progress: 85, status: 'Active' },
    { code: 'CS205', name: 'Data Structures', students: 95, progress: 40, status: 'Active' },
  ];

  const achievements = [
    { title: 'Best Teacher Award', year: '2023', icon: Award, color: 'text-yellow-600' },
    { title: 'Research Excellence', year: '2022', icon: FileText, color: 'text-blue-600' },
    { title: '100+ Publications', year: '2021', icon: BookOpen, color: 'text-green-600' },
    { title: 'Innovation Grant', year: '2020', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const publications = [
    { title: 'Deep Learning Approaches for Image Classification', journal: 'IEEE Transactions', year: '2024', citations: 45 },
    { title: 'Machine Learning in Healthcare', journal: 'Nature AI', year: '2023', citations: 128 },
    { title: 'Explainable AI Systems', journal: 'ACM Computing', year: '2023', citations: 67 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header with Cover */}
      <div className="h-48 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 relative">
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop"
              alt="Profile"
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
            />
            <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">{teacherData.name}</h1>
            <p className="text-gray-600 mb-3">{teacherData.designation} • {teacherData.department}</p>
            <div className="flex flex-wrap gap-2">
              {teacherData.specialization.map((spec) => (
                <Badge key={spec} variant="secondary" className="bg-blue-100 text-blue-700">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download CV
            </Button>
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card className="p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{teacherData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{teacherData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{teacherData.officeRoom}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{teacherData.officeHours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Joined {teacherData.joinDate}</span>
                  </div>
                </div>
              </Card>

              {/* Education */}
              <Card className="p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  Education
                </h3>
                <div className="space-y-4">
                  {teacherData.education.map((edu, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                      <div>
                        <p className="text-sm text-gray-900">{edu.degree}</p>
                        <p className="text-xs text-gray-600">{edu.university}</p>
                        <p className="text-xs text-gray-500">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-4">Current Courses (2024-25)</h3>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.code} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900">{course.code} - {course.name}</h4>
                        <p className="text-sm text-gray-600">{course.students} students enrolled</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">{course.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Course Progress</span>
                        <span className="text-gray-900">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-4">Recent Publications</h3>
              <div className="space-y-4">
                {publications.map((pub, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-gray-900 mb-2">{pub.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{pub.journal}</span>
                      <span>•</span>
                      <span>{pub.year}</span>
                      <span>•</span>
                      <span className="text-blue-600">{pub.citations} citations</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center`}>
                      <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.year}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
