import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";

interface OnboardingTutorialProps {
  userRole?: "student" | "teacher" | "tpc" | "club" | "university";
  onComplete?: () => void;
  onSkip?: () => void;
}

export default function OnboardingTutorial({
  userRole = "student",
  onComplete,
  onSkip,
}: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // ---------------- STUDENT STEPS ----------------
  const studentSteps = [
    {
      icon: GraduationCap,
      title: "Welcome to SmartCurriculum!",
      description: "Your all-in-one platform for managing your academic journey",
      details: [
        "Track your attendance and coursework",
        "View grades and performance analytics",
        "Earn points and climb the leaderboard",
        "Access study materials anytime, anywhere",
      ],
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Calendar,
      title: "Mark Your Attendance",
      description: "Never miss a class with our smart attendance system",
      details: [
        "Scan QR codes shown by your teacher",
        "Or enter the 6-digit attendance code",
        "View your attendance percentage by subject",
        "Get alerts if your attendance drops below 75%",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      icon: BookOpen,
      title: "Access Your Coursework",
      description: "All your study materials in one place",
      details: [
        "Download lecture notes, PDFs, and videos",
        "Submit assignments before deadlines",
        "Track your progress module by module",
        "Get instant notifications for new materials",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      title: "Gamification & Rewards",
      description: "Make learning fun with points and badges",
      details: [
        "Earn points for attendance, assignments, and tests",
        "Unlock badges for achievements",
        "Compete on the leaderboard with classmates",
        "Maintain streaks for bonus multipliers",
      ],
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: FileText,
      title: "Your Personal Vault",
      description: "Secure storage for important documents",
      details: [
        "Store certificates, IDs, and resumes",
        "100MB of free cloud storage",
        "Access your files from any device",
        "Organize with folders and tags",
      ],
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: CheckCircle,
      title: "You’re All Set!",
      description: "Ready to start your SmartCurriculum journey",
      details: [
        "Explore the dashboard to see your stats",
        "Check today’s classes and upcoming assignments",
        "Customize your profile and settings",
        "Need help? Visit the Help Center anytime",
      ],
      color: "from-green-500 to-blue-600",
    },
  ];

  // ---------------- TEACHER STEPS ----------------
  const teacherSteps = [
    {
      icon: GraduationCap,
      title: "Welcome to SmartCurriculum!",
      description: "Your comprehensive teaching management platform",
      details: [
        "Manage classes and student attendance",
        "Create and grade assignments",
        "Upload study materials and resources",
        "Track student performance with analytics",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Manage Your Classes",
      description: "All your courses in one dashboard",
      details: [
        "View all your classes and schedules",
        "Track enrollment and student lists",
        "Create attendance sessions with QR codes",
        "Monitor class performance metrics",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Calendar,
      title: "Attendance Made Easy",
      description: "Quick and efficient attendance tracking",
      details: [
        "Generate QR codes or 6-digit codes",
        "Real-time attendance tracking",
        "Flag proxy attempts automatically",
        "View attendance reports and analytics",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: BookOpen,
      title: "Course Materials",
      description: "Share resources with your students",
      details: [
        "Upload PDFs, videos, and presentations",
        "Organize content into modules",
        "Track material access and engagement",
        "Schedule content releases",
      ],
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: FileText,
      title: "Assignments & Grading",
      description: "Streamlined assignment management",
      details: [
        "Create assignments with rubrics",
        "Set deadlines and point values",
        "Review submissions online",
        "Provide feedback and grades",
      ],
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: CheckCircle,
      title: "Ready to Teach!",
      description: "Start managing your classes effectively",
      details: [
        "Explore your teacher dashboard",
        "Check today’s schedule",
        "Review pending grading tasks",
        "Access help and support anytime",
      ],
      color: "from-green-500 to-blue-600",
    },
  ];

  const steps = userRole === "student" ? studentSteps : teacherSteps;
  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else onComplete?.();
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => onSkip?.();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 relative">

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? "w-8 bg-blue-600"
                  : index < currentStep
                  ? "bg-blue-400"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="text-center mb-6">
          <div
            className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center shadow-xl`}
          >
            <currentStepData.icon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-3xl text-gray-900 mb-3">
            {currentStepData.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {currentStepData.description}
          </p>

          <div className="bg-gray-50 rounded-xl p-6 text-left">
            <ul className="space-y-3">
              {currentStepData.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>

          <Button onClick={handleSkip} variant="ghost" className="text-gray-600">
            Skip Tutorial
          </Button>

          <Button
            onClick={handleNext}
            className={`gap-2 bg-gradient-to-r ${currentStepData.color}`}
          >
            {currentStep === steps.length - 1 ? (
              <>
                <span>Get Started</span>
                <CheckCircle className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
