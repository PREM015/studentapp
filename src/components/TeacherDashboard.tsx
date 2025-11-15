"use client"
import { useState } from 'react';
import { Input } from './ui/input';
import { 
  BookOpen, Users, CheckCircle, TrendingUp, Clock, Calendar, 
  Bell, Search, GraduationCap, FileText, BarChart3, Settings,
  ChevronRight, AlertCircle, ClipboardCheck, Award, BookMarked
} from 'lucide-react';
import TeacherAttendance from './teacher/TeacherAttendance';
import TeacherCoursework from './teacher/TeacherCoursework';
import TeacherGrading from './teacher/TeacherGrading';
import TeacherStudents from './teacher/TeacherStudents';
import TeacherCalendar from './teacher/TeacherCalendar';
import TeacherDashboardView from './teacher/TeacherDashboard';

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">SmartCurriculum</h3>
              <p className="text-xs text-gray-500">Teacher Portal</p>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">Dr. Rajesh Sharma</p>
              <p className="text-xs text-gray-500">Professor, CSE</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'classes', label: 'My Classes', icon: BookMarked },
            { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
            { id: 'grading', label: 'Grade Book', icon: Award },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search students, classes, assignments..."
                  className="pl-10 h-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>AY 2023-24</option>
                <option>AY 2024-25</option>
              </select>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeSection === 'dashboard' && <TeacherDashboardView />}

          {activeSection === 'classes' && <TeacherCoursework />}

          {activeSection === 'attendance' && (
            <TeacherAttendance />
          )}

          {activeSection === 'grading' && (
            <TeacherGrading />
          )}

          {activeSection === 'students' && (
            <TeacherStudents />
          )}

          {activeSection === 'calendar' && (
            <TeacherCalendar />
          )}
        </div>
      </main>
    </div>
  );
}
