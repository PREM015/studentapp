'use client';

import { useState } from 'react';
import StudentMobileApp from '@/components/StudentMobileApp';
import TeacherDashboard from '@/components/TeacherDashboard';
import TPCDashboard from '@/components/TPCDashboard';
import ClubDashboard from '@/components/ClubDashboard';
import UniversityDashboard from '@/components/UniversityDashboard';
import BackButton from '@/components/BackButton';
import { Card } from '@/components/ui/card';
import { GraduationCap, BookOpen, Briefcase, Users, Building2 } from 'lucide-react';

type Role = 'select' | 'student' | 'teacher' | 'tpc' | 'club' | 'university';

export default function Page() {
  const [currentRole, setCurrentRole] = useState<Role>('select');

  if (currentRole === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl p-8 md:p-12 border-2 border-gray-200 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">SmartCurriculum</h1>
            <p className="text-gray-600">Select your role to continue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                role: 'student' as Role,
                title: 'Student',
                description: 'Access courses, attendance, grades',
                icon: GraduationCap,
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
              },
              {
                role: 'teacher' as Role,
                title: 'Teacher',
                description: 'Manage classes, grades, materials',
                icon: BookOpen,
                color: 'from-green-500 to-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
              },
              {
                role: 'tpc' as Role,
                title: 'TPC',
                description: 'Placements, companies, analytics',
                icon: Briefcase,
                color: 'from-purple-500 to-purple-600',
                bgColor: 'bg-purple-50',
                borderColor: 'border-purple-200',
              },
              {
                role: 'club' as Role,
                title: 'Club',
                description: 'Events, members, activities',
                icon: Users,
                color: 'from-pink-500 to-pink-600',
                bgColor: 'bg-pink-50',
                borderColor: 'border-pink-200',
              },
              {
                role: 'university' as Role,
                title: 'University',
                description: 'Analytics, compliance, reports',
                icon: Building2,
                color: 'from-amber-500 to-amber-600',
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200',
              },
            ].map((item) => (
              <button
                key={item.role}
                onClick={() => setCurrentRole(item.role)}
                className={`group p-6 rounded-xl border-2 ${item.borderColor} ${item.bgColor} 
                hover:shadow-xl transition-all duration-300 hover:scale-105 text-left`}
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.color} flex 
                items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      {currentRole === 'student' && (
        <>
          <StudentMobileApp />
          <BackButton onClick={() => setCurrentRole('select')} />
        </>
      )}

      {currentRole === 'teacher' && (
        <>
          <TeacherDashboard />
          <BackButton onClick={() => setCurrentRole('select')} />
        </>
      )}

      {currentRole === 'tpc' && (
        <>
          <TPCDashboard />
          <BackButton onClick={() => setCurrentRole('select')} />
        </>
      )}

      {currentRole === 'club' && (
        <>
          <ClubDashboard />
          <BackButton onClick={() => setCurrentRole('select')} />
        </>
      )}

      {currentRole === 'university' && (
        <>
          <UniversityDashboard />
          <BackButton onClick={() => setCurrentRole('select')} />
        </>
      )}
    </>
  );
}
