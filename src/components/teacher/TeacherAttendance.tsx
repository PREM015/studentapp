import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { 
  QrCode, Users, CheckCircle, XCircle, Clock, AlertTriangle,
  Search, Filter, Download, Send, RefreshCw, ChevronRight
} from 'lucide-react';

export default function TeacherAttendance() {
  const [step, setStep] = useState(1);
  const [sessionCode, setSessionCode] = useState('AB12CD');
  const [timeRemaining, setTimeRemaining] = useState(298);
  const [submissions, setSubmissions] = useState(42);

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {[
          { num: 1, label: 'Select Class' },
          { num: 2, label: 'Generate Session' },
          { num: 3, label: 'Mark Attendance' },
          { num: 4, label: 'Review & Submit' },
        ].map((s, idx) => (
          <div key={idx} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step > s.num ? 'bg-green-600 text-white' :
                step === s.num ? 'bg-blue-600 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-sm font-medium ${
                step === s.num ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {s.label}
              </span>
            </div>
            {idx < 3 && (
              <div className={`flex-1 h-0.5 mx-2 ${
                step > s.num ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Class */}
      {step === 1 && (
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Class Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>CSE-2022-A</option>
                <option>CSE-2022-B</option>
                <option>CSE-2023-A</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Data Structures (CSE-301)</option>
                <option>Web Development (CSE-302)</option>
                <option>Database Systems (CSE-303)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <Input type="date" defaultValue="2024-06-15" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <Input type="time" defaultValue="09:00" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Theory</option>
                <option>Practical</option>
                <option>Tutorial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic Covered</label>
              <Input placeholder="e.g., Binary Search Trees - Implementation" />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setStep(2)}>
              Next: Generate Session
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Generate Session */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code Attendance</h3>
            
            {/* QR Code Display */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-80 h-80 bg-white border-4 border-gray-200 rounded-xl p-4 mb-4">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-white" />
                </div>
              </div>
              
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <p className="text-2xl font-bold text-red-600 font-mono">
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                <p className="text-sm text-gray-600">Code expires in</p>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
                  <p className="text-sm text-gray-500 mb-1">Session ID</p>
                  <p className="text-xl font-bold text-gray-900 font-mono">SES-2024-06-15-001</p>
                </div>
                <div className="px-4 py-2 bg-blue-100 rounded-lg border border-blue-300">
                  <p className="text-sm text-blue-700 mb-1">Code</p>
                  <p className="text-xl font-bold text-blue-900 font-mono">{sessionCode}</p>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New Code
              </Button>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Instructions:</strong> Display this QR code on the projector for students to scan. 
                Students can also manually enter the code shown above.
              </p>
            </div>
          </Card>

          {/* Live Submissions Panel */}
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Live Submissions</h4>
              <Badge className="bg-green-100 text-green-700">
                {submissions} received
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-3 border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{60}</p>
                <p className="text-xs text-gray-500">Total Students</p>
              </Card>
              <Card className="p-3 border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{60 - submissions}</p>
                <p className="text-xs text-gray-500">Missing</p>
              </Card>
            </div>

            <Progress value={(submissions / 60) * 100} className="mb-2" />
            <p className="text-sm text-gray-600 mb-4">{Math.round((submissions / 60) * 100)}% submitted</p>

            <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg border border-amber-200 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-900">2 Flagged</span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-auto p-1">View</Button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Array.from({ length: submissions }).map((_, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900">CSE2022{(idx + 1).toString().padStart(3, '0')}</span>
                  </div>
                  <span className="text-xs text-gray-500">{idx + 1}s ago</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => setStep(3)}
            >
              Continue to Mark Attendance
            </Button>
          </Card>
        </div>
      )}

      {/* Step 3: Mark Attendance */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3 p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Student Attendance List</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search student..." className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                All (60)
              </Button>
              <Button variant="outline" size="sm" className="bg-green-50 border-green-200">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Present (42)
              </Button>
              <Button variant="outline" size="sm" className="bg-red-50 border-red-200">
                <XCircle className="w-4 h-4 mr-2 text-red-600" />
                Absent (18)
              </Button>
              <Button variant="outline" size="sm" className="bg-amber-50 border-amber-200">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" />
                Flagged (2)
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      <Checkbox />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Roll No</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Submission Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const status = idx < 7 ? 'present' : idx < 9 ? 'absent' : 'flagged';
                    return (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <Checkbox />
                        </td>
                        <td className="py-3 px-4 text-sm font-mono text-gray-900">
                          CSE2022{(idx + 1).toString().padStart(3, '0')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                              alt="Student"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-sm text-gray-900">Student Name {idx + 1}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <select className={`text-sm px-3 py-1 rounded border ${
                            status === 'present' ? 'bg-green-50 border-green-200 text-green-700' :
                            status === 'absent' ? 'bg-red-50 border-red-200 text-red-700' :
                            'bg-amber-50 border-amber-200 text-amber-700'
                          }`}>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="late">Late</option>
                            <option value="excused">Excused</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {status === 'present' ? '9:02 AM' : status === 'flagged' ? '9:05 AM' : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Mark All Present</Button>
                <Button variant="outline" size="sm">Mark All Absent</Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(4)}>
                Continue to Review
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-4 border border-amber-200 bg-amber-50">
              <h4 className="font-semibold text-amber-900 mb-3">Flagged Students</h4>
              <div className="space-y-3">
                {[
                  { roll: 'CSE2022042', reason: 'Device fingerprint mismatch', confidence: 78 },
                  { roll: 'CSE2022055', reason: 'Location outside boundary', confidence: 65 },
                ].map((flag, idx) => (
                  <div key={idx} className="p-3 bg-white rounded border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 text-sm">{flag.roll}</span>
                      <Badge className="bg-red-100 text-red-700 text-xs">
                        {flag.confidence}% proxy
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{flag.reason}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-7">Mark Genuine</Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-7 text-red-600">Mark Proxy</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Missing Students</h4>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-900">CSE2022{(idx + 43).toString().padStart(3, '0')}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">P</Button>
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">A</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Send className="w-4 h-4 mr-2" />
                Send Reminder
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Present', value: 42, color: 'green' },
              { label: 'Absent', value: 16, color: 'red' },
              { label: 'Late', value: 2, color: 'amber' },
              { label: 'Excused', value: 0, color: 'gray' },
            ].map((stat, idx) => (
              <Card key={idx} className={`p-4 border-2 border-${stat.color}-200 bg-${stat.color}-50`}>
                <p className={`text-3xl font-bold text-${stat.color}-700`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Review</h3>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Roll No</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const status = idx < 7 ? 'present' : idx < 9 ? 'absent' : 'late';
                    return (
                      <tr key={idx}>
                        <td className="py-3 px-4 text-sm font-mono">CSE2022{(idx + 1).toString().padStart(3, '0')}</td>
                        <td className="py-3 px-4 text-sm">Student Name {idx + 1}</td>
                        <td className="py-3 px-4">
                          <Badge className={`text-xs ${
                            status === 'present' ? 'bg-green-100 text-green-700' :
                            status === 'absent' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {status === 'present' ? '9:02 AM' : status === 'late' ? '9:15 AM' : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Add any additional remarks for this session..."
              />
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                Back to Edit
              </Button>
              <Button variant="outline" className="flex-1">
                Save as Draft
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Attendance
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
