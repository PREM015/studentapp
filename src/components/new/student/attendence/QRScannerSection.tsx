"use client"
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { markAttendanceByQR } from '@/app/actions/attendance';

export default function QRScannerSection({ studentId }: { studentId: number }) {
  const [isScanning, setIsScanning] = useState(false);

  const handleQRScan = async (qrCode: string) => {
    try {
      const result = await markAttendanceByQR(studentId, qrCode);
      if (result.success) {
        toast.success('Attendance marked successfully!');
        setIsScanning(false);
      } else {
        toast.error(result.error || 'Failed to mark attendance');
      }
    } catch (error) {
      toast.error('An error occurred while marking attendance');
    }
  };

  return (
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
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-blue-500 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-blue-500 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-blue-500 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-blue-500 rounded-br-lg" />
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
  );
}