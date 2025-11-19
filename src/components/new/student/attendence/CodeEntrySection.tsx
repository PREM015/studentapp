"use client"
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { markAttendanceByCode } from '@/app/actions/attendance';

export default function CodeEntrySection({ studentId }: { studentId: number }) {
  const [sessionCode, setSessionCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await markAttendanceByCode(studentId, sessionCode);
      if (result.success) {
        toast.success('Attendance marked successfully!');
        setSessionCode('');
      } else {
        toast.error(result.error || 'Failed to mark attendance');
      }
    } catch (error) {
      toast.error('An error occurred while marking attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          disabled={sessionCode.length !== 6 || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Marking...' : 'Mark Present'}
        </Button>
      </div>
    </Card>
  );
}