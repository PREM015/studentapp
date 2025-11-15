import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Plus, 
  Search,
  Edit,
  Trash2,
  BarChart3,
  Award,
  Clock,
  DollarSign,
  UserCheck
} from 'lucide-react';

export default function UniversityDepartments() {
  const departments = [
    {
      name: 'Computer Science & Engineering',
      code: 'CSE',
      hod: 'Dr. Rajesh Kumar',
      faculty: 45,
      students: 850,
      programs: ['B.Tech', 'M.Tech', 'PhD'],
      avgPlacement: 92,
      avgPackage: '8.5 LPA',
      budget: '₹2.5 Cr',
      labs: 12,
      status: 'Active',
      rating: 4.5
    },
    {
      name: 'Electrical Engineering',
      code: 'EE',
      hod: 'Dr. Priya Sharma',
      faculty: 38,
      students: 620,
      programs: ['B.Tech', 'M.Tech'],
      avgPlacement: 88,
      avgPackage: '7.2 LPA',
      budget: '₹1.8 Cr',
      labs: 10,
      status: 'Active',
      rating: 4.3
    },
    {
      name: 'Mechanical Engineering',
      code: 'ME',
      hod: 'Dr. Amit Verma',
      faculty: 42,
      students: 720,
      programs: ['B.Tech', 'M.Tech', 'PhD'],
      avgPlacement: 85,
      avgPackage: '6.8 LPA',
      budget: '₹2.0 Cr',
      labs: 15,
      status: 'Active',
      rating: 4.2
    },
    {
      name: 'Civil Engineering',
      code: 'CE',
      hod: 'Dr. Suresh Reddy',
      faculty: 35,
      students: 580,
      programs: ['B.Tech', 'M.Tech'],
      avgPlacement: 82,
      avgPackage: '6.2 LPA',
      budget: '₹1.5 Cr',
      labs: 8,
      status: 'Active',
      rating: 4.0
    },
    {
      name: 'Electronics & Communication',
      code: 'ECE',
      hod: 'Dr. Anjali Nair',
      faculty: 40,
      students: 680,
      programs: ['B.Tech', 'M.Tech'],
      avgPlacement: 90,
      avgPackage: '7.8 LPA',
      budget: '₹1.9 Cr',
      labs: 11,
      status: 'Active',
      rating: 4.4
    },
    {
      name: 'Information Technology',
      code: 'IT',
      hod: 'Dr. Vikram Singh',
      faculty: 32,
      students: 540,
      programs: ['B.Tech', 'M.Tech'],
      avgPlacement: 94,
      avgPackage: '9.2 LPA',
      budget: '₹1.6 Cr',
      labs: 9,
      status: 'Active',
      rating: 4.6
    }
  ];

  const recentActivities = [
    { dept: 'CSE', activity: 'New lab equipment approved', time: '2 hours ago', type: 'budget' },
    { dept: 'EE', activity: '5 new faculty joined', time: '5 hours ago', type: 'faculty' },
    { dept: 'ME', activity: 'Industry partnership signed with Tata Motors', time: '1 day ago', type: 'partnership' },
    { dept: 'IT', activity: 'Placement drive completed - 95% placed', time: '2 days ago', type: 'placement' },
    { dept: 'ECE', activity: 'Research grant of ₹50L received', time: '3 days ago', type: 'research' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Department Management</h2>
          <p className="text-gray-500 mt-1">Manage all departments and their resources</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Departments</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{departments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">All Active</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Faculty</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {departments.reduce((sum, d) => sum + d.faculty, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-600">Across all departments</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {departments.reduce((sum, d) => sum + d.students, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-600">Active enrollment</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Placement</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {Math.round(departments.reduce((sum, d) => sum + d.avgPlacement, 0) / departments.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+5% from last year</span>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search departments..." 
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All Departments</Button>
            <Button variant="outline" size="sm">Engineering</Button>
            <Button variant="outline" size="sm">Science</Button>
          </div>
        </div>
      </Card>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept, idx) => (
          <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{dept.name}</h3>
                  <p className="text-sm text-gray-500">{dept.code}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* HOD Info */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">HOD:</span>
              <span className="text-sm font-medium text-gray-900">{dept.hod}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Faculty</p>
                <p className="text-lg font-bold text-gray-900">{dept.faculty}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Students</p>
                <p className="text-lg font-bold text-gray-900">{dept.students}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Labs</p>
                <p className="text-lg font-bold text-gray-900">{dept.labs}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Budget</p>
                <p className="text-lg font-bold text-gray-900">{dept.budget}</p>
              </div>
            </div>

            {/* Programs */}
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <div className="flex gap-1">
                {dept.programs.map((prog, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {prog}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Placement Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Placement Rate</span>
                <span className="font-medium text-gray-900">{dept.avgPlacement}%</span>
              </div>
              <Progress value={dept.avgPlacement} className="h-2" />
              
              <div className="flex items-center justify-between text-sm mt-3">
                <span className="text-gray-600">Avg Package</span>
                <span className="font-bold text-green-600">{dept.avgPackage}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className={`w-4 h-4 ${i < Math.floor(dept.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-gray-600 ml-2">{dept.rating}</span>
              </div>
              <Badge className={dept.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {dept.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Recent Department Activities
        </h3>
        <div className="space-y-3">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge variant="outline">{activity.dept}</Badge>
                <span className="text-sm text-gray-900">{activity.activity}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Department Comparison Chart */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          Department Comparison
        </h3>
        <div className="space-y-4">
          {departments.map((dept, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">{dept.code}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{dept.students} students</span>
                  <span className="text-green-600 font-medium">{dept.avgPlacement}%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Progress value={(dept.students / 1000) * 100} className="flex-1 h-2" />
                <Progress value={dept.avgPlacement} className="flex-1 h-2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
