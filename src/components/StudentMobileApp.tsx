"use client"
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import StudentLogin from './student/StudentLogin';
import StudentDashboard from './student/StudentDashboard';
import StudentAttendance from './student/StudentAttendance';
import StudentProfile from './student/StudentProfile';
import StudentCalendar from './student/StudentCalendar';
import StudentVault from './student/StudentVault';
import StudentCoursework from './student/StudentCoursework';

export default function StudentMobileApp() {

  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative pb-20">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="dashboard" className="m-0 mt-0">
          <StudentDashboard />
        </TabsContent>
        <TabsContent value="attendance" className="m-0 mt-0">
          <StudentAttendance />
        </TabsContent>
        <TabsContent value="calendar" className="m-0 mt-0">
          <StudentCalendar />
        </TabsContent>
        <TabsContent value="vault" className="m-0 mt-0">
          <StudentVault />
        </TabsContent>
        <TabsContent value="coursework" className="m-0 mt-0">
          <StudentCoursework />
        </TabsContent>
        <TabsContent value="profile" className="m-0 mt-0">
          <StudentProfile />
        </TabsContent>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 z-50">
          <TabsList className="w-full h-16 grid grid-cols-6 bg-white rounded-none border-0">
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Calendar</span>
            </TabsTrigger>
            <TabsTrigger 
              value="attendance" 
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 -mt-4"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="text-xs mt-1">QR Scan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="coursework" 
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xs">Courses</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vault" 
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="text-xs">Vault</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
