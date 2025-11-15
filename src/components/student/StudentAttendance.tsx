import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { QrCode, MapPin, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function StudentAttendance() {
  const [sessionCode, setSessionCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Mark Attendance</h2>
        <p className="text-sm text-gray-500">Scan QR or enter session code</p>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Session Timer */}
        <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-900">Session expires in</span>
            </div>
            <div className="text-2xl font-bold text-red-600 font-mono">04:32</div>
          </div>
        </Card>

        {/* QR Scanner Section */}
        <Card className="p-6 border border-gray-200">
          <div className="text-center">
            <div className={`mx-auto w-64 h-64 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden ${
              isScanning ? 'bg-black' : 'bg-gray-100 border-2 border-dashed border-gray-300'
            }`}>
              {!isScanning ? (
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Camera view will appear here</p>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {/* Simulated camera view */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                  
                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-blue-500 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-blue-500 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-blue-500 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-blue-500 rounded-br-lg" />
                  
                  {/* Scanning line animation */}
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-blue-500 animate-pulse" />
                  
                  <p className="absolute bottom-8 left-0 right-0 text-center text-white text-sm">
                    Position QR code within frame
                  </p>
                </div>
              )}
            </div>
            
            <Button 
              className={`w-full ${isScanning ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={() => setIsScanning(!isScanning)}
            >
              {isScanning ? 'Stop Scanning' : 'Start QR Scanner'}
            </Button>
            
            <p className="text-sm text-gray-500 mt-3">
              Scan the QR code displayed by your teacher
            </p>
          </div>
        </Card>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-50 text-gray-500 font-medium">OR</span>
          </div>
        </div>

        {/* Manual Code Entry */}
        <Card className="p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Enter Session Code</h4>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Enter 6-digit code (e.g., AB12CD)"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
              className="text-center text-lg font-mono tracking-widest uppercase h-12"
              maxLength={6}
            />
            <p className="text-xs text-gray-500 text-center">
              Example: AB12CD
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={sessionCode.length !== 6}>
              Mark Present
            </Button>
          </div>
        </Card>

        {/* Location Status */}
        <Card className="p-4 border border-green-200 bg-green-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="font-medium text-green-900">Location Verified</h5>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-sm text-green-700">You are in the classroom</p>
              <p className="text-xs text-green-600 mt-1">Distance: 12m from center</p>
            </div>
          </div>
        </Card>

        {/* Attendance History Tab */}
        <Card className="p-4 border border-gray-200">
          <Tabs defaultValue="week" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
            
            <TabsContent value="week" className="mt-0 space-y-2">
              {[
                { date: 'Today, 9:00 AM', subject: 'Data Structures', status: 'present', points: 2 },
                { date: 'Yesterday, 11:00 AM', subject: 'Web Development', status: 'present', points: 2 },
                { date: 'Jun 13, 2:00 PM', subject: 'DBMS', status: 'late', points: 1 },
                { date: 'Jun 12, 9:00 AM', subject: 'Data Structures', status: 'absent', points: 0 },
                { date: 'Jun 11, 11:00 AM', subject: 'Web Development', status: 'present', points: 2 },
              ].map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {record.status === 'present' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {record.status === 'late' && <AlertCircle className="w-5 h-5 text-amber-600" />}
                    {record.status === 'absent' && <XCircle className="w-5 h-5 text-red-600" />}
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{record.subject}</p>
                      <p className="text-xs text-gray-500">{record.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-xs ${
                      record.status === 'present' ? 'bg-green-100 text-green-700' :
                      record.status === 'late' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </Badge>
                    {record.points > 0 && (
                      <p className="text-xs text-purple-600 font-medium mt-1">+{record.points} pts</p>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="month" className="mt-0">
              {/* Calendar View */}
              <div className="grid grid-cols-7 gap-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div key={idx} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {[...Array(30)].map((_, idx) => {
                  const status = idx % 5 === 0 ? 'absent' : idx % 7 === 0 ? 'late' : 'present';
                  return (
                    <div
                      key={idx}
                      className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                        status === 'present' ? 'bg-green-100 text-green-700' :
                        status === 'late' ? 'bg-amber-100 text-amber-700' :
                        status === 'absent' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-100" />
                  <span className="text-gray-600">Present</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-amber-100" />
                  <span className="text-gray-600">Late</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-red-100" />
                  <span className="text-gray-600">Absent</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
