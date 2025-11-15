import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Home, RefreshCw, AlertTriangle, Mail } from 'lucide-react';

interface ServerError500Props {
  onRetry?: () => void;
  onNavigateHome?: () => void;
  errorDetails?: string;
}

export default function ServerError500({ onRetry, onNavigateHome, errorDetails }: ServerError500Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 text-center border-2 border-gray-200 shadow-2xl">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-xl">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h2 className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
            500
          </h2>
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Internal Server Error
          </h1>
          <p className="text-lg text-gray-600 mb-4 max-w-md mx-auto">
            Something went wrong on our end. We're working to fix it!
          </p>
        </div>

        {/* Error Details (if provided) */}
        {errorDetails && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-mono">
              Error: {errorDetails}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={onRetry}
            className="gap-2 h-12 px-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Button>
          <Button
            onClick={onNavigateHome}
            variant="outline"
            className="gap-2 h-12 px-6 border-2"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Button>
        </div>

        {/* What happened */}
        <div className="pt-8 border-t border-gray-200 space-y-4">
          <h3 className="text-lg text-gray-900 mb-4">What happened?</h3>
          <div className="grid gap-4 max-w-lg mx-auto text-left">
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-red-600">1</span>
              </div>
              <p className="text-sm text-gray-700">
                Our server encountered an unexpected error while processing your request
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-orange-600">2</span>
              </div>
              <p className="text-sm text-gray-700">
                Our team has been automatically notified and is investigating
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-yellow-600">3</span>
              </div>
              <p className="text-sm text-gray-700">
                Please try again in a few moments. The issue is usually temporary
              </p>
            </div>
          </div>
        </div>

        {/* Status & Support */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Check System Status</strong>
              </p>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700">
                status.smartcurriculum.edu →
              </a>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-900">
                <strong>Contact Support</strong>
              </p>
              <a href="#" className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1 justify-center">
                <Mail className="w-3 h-3" />
                support@smartcurriculum.edu
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p className="text-xs text-gray-500">
            Error ID: {Math.random().toString(36).substring(7).toUpperCase()} • {new Date().toLocaleString()}
          </p>
        </div>
      </Card>
    </div>
  );
}
