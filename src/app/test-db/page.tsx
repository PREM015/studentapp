// src/app/test-db/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

// Define proper types
interface TestResult {
  success: boolean;
  message?: string;
  database?: string;
  counts?: {
    users: number;
    students: number;
    teachers: number;
    courses: number;
    notifications: number;
    departments: number;
  };
  test?: string;
  timestamp?: string;
  error?: string;
  details?: unknown;
}

interface SeedResult {
  success: boolean;
  message?: string;
  data?: {
    user: { id: string; email: string };
    student: { id: string; rollNo: string };
    course: { id: string; code: string };
    notification: { id: string; title: string };
  };
  error?: string;
}

interface StudentData {
  id: string;
  userId: string;
  rollNo: string;
  department: string;
  batch: string;
  semester: number;
  section: string;
  cgpa: number;
  attendance: number;
  phone: string;
  dateOfBirth: string;
  joinDate: string;
  points: number;
  badges: string[];
  rank: number;
  user: {
    id: string;
    name: string;
    email: string;
    profileImage: string | null;
  };
}

interface StudentsResult {
  success: boolean;
  count?: number;
  students?: StudentData[];
  error?: string;
}

export default function TestDbPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [seedResult, setSeedResult] = useState<SeedResult | null>(null);
  const [students, setStudents] = useState<StudentsResult | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json() as TestResult;
      setTestResult(data);
    } catch (error) {
      setTestResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect' 
      });
    }
    setLoading(false);
  };

  const seedData = async () => {
    setLoading(true);
    setSeedResult(null);
    try {
      const response = await fetch('/api/seed-sample', { method: 'POST' });
      const data = await response.json() as SeedResult;
      setSeedResult(data);
    } catch (error) {
      setSeedResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to seed' 
      });
    }
    setLoading(false);
  };

  const fetchStudents = async () => {
    setLoading(true);
    setStudents(null);
    try {
      const response = await fetch('/api/students');
      const data = await response.json() as StudentsResult;
      setStudents(data);
    } catch (error) {
      setStudents({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch' 
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🧪 Database Connection Test</h1>
        <p className="text-muted-foreground">
          Test Next.js + Prisma + Neon PostgreSQL integration
        </p>
      </div>

      <div className="grid gap-6">
        {/* Test Connection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">1️⃣</span> Test Database Connection
            </CardTitle>
            <CardDescription>
              Verify that Next.js can connect to Neon PostgreSQL and perform basic operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testConnection} 
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Connection'
              )}
            </Button>
            
            {testResult && (
              <Alert variant={testResult.success ? 'default' : 'destructive'}>
                {testResult.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {testResult.success ? 'Success!' : 'Error'}
                </AlertTitle>
                <AlertDescription>
                  <pre className="mt-2 p-4 bg-muted rounded overflow-auto text-sm">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Seed Sample Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">2️⃣</span> Create Sample Data
            </CardTitle>
            <CardDescription>
              Insert test records (User, Student, Course, Notification) into the database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={seedData} 
              disabled={loading}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Seeding...
                </>
              ) : (
                'Seed Sample Data'
              )}
            </Button>
            
            {seedResult && (
              <Alert variant={seedResult.success ? 'default' : 'destructive'}>
                {seedResult.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {seedResult.success ? 'Success!' : 'Error'}
                </AlertTitle>
                <AlertDescription>
                  <pre className="mt-2 p-4 bg-muted rounded overflow-auto text-sm">
                    {JSON.stringify(seedResult, null, 2)}
                  </pre>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Fetch Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">3️⃣</span> Fetch Students
            </CardTitle>
            <CardDescription>
              Retrieve data from the database with relations (Student + User)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={fetchStudents} 
              disabled={loading}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                'Fetch Students'
              )}
            </Button>
            
            {students && (
              <Alert variant={students.success ? 'default' : 'destructive'}>
                {students.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {students.success ? `Found ${students.count} students` : 'Error'}
                </AlertTitle>
                <AlertDescription>
                  <pre className="mt-2 p-4 bg-muted rounded overflow-auto text-sm max-h-96">
                    {JSON.stringify(students, null, 2)}
                  </pre>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">✅ Success Checklist</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>✓ Database connection successful</li>
          <li>✓ Can create records</li>
          <li>✓ Can read records with relations</li>
          <li>✓ Next.js + Prisma + Neon working perfectly!</li>
        </ul>
      </div>
    </div>
  );
}