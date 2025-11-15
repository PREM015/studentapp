import { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  Search, HelpCircle, BookOpen, Video, MessageCircle, 
  Mail, Phone, ChevronDown, ChevronUp, ExternalLink,
  User, Lock, Calendar, FileText, Award, Bell
} from 'lucide-react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    { icon: User, title: 'Account & Profile', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: Lock, title: 'Security & Privacy', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: Calendar, title: 'Attendance', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: FileText, title: 'Coursework', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { icon: Award, title: 'Grades & Points', color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { icon: Bell, title: 'Notifications', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  ];

  const faqs = [
    {
      question: 'How do I mark my attendance?',
      answer: 'You can mark your attendance in two ways: 1) Scan the QR code displayed by your teacher in class, or 2) Enter the 6-digit attendance code provided. Make sure you are within the geofencing radius of your classroom for successful submission.',
    },
    {
      question: 'How is my attendance percentage calculated?',
      answer: 'Your attendance percentage is calculated as (Total Classes Attended / Total Classes Conducted) × 100. This is calculated separately for each subject and also as an overall percentage across all subjects.',
    },
    {
      question: 'What are gamification points and how do I earn them?',
      answer: 'Gamification points are rewards for various activities: 100% attendance for a week (50 points), submitting assignments on time (30 points), achieving 90%+ in tests (100 points), and maintaining streaks (bonus multipliers). Check your profile to see all achievement badges!',
    },
    {
      question: 'How do I submit assignments?',
      answer:
        "Go to Coursework → Select your course → Assignments tab → Click on the assignment → Upload your file (PDF, DOC, or DOCX up to 10MB) → Add any comments → Submit. You\'ll receive a confirmation email upon successful submission.",
    },
    {
      question: 'Can I view my grades immediately after submission?',
      answer: 'No, grades are visible only after your teacher has reviewed and graded your submission. You will receive a notification when grades are published.',
    },
    {
      question: 'What is the Vault and how much storage do I get?',
      answer: 'The Vault is your personal document storage space within SmartCurriculum. Students get 100MB of free storage to store certificates, resumes, ID cards, and other important documents. You can organize files into folders and access them anytime.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login screen, enter your registered email address, and we will send you a password reset link. The link is valid for 24 hours.',
    },
    {
      question: 'Why can\'t I see my today\'s classes?',
      answer: 'If you don’t see today’s classes, it could be because: 1) No classes are scheduled for today, 2) there’s a timetable update pending, or 3) you need to refresh the app.',
    },
    {
      question: 'How do I turn off notifications?',
      answer: 'Go to Settings → Notifications → Toggle off the notification types you don’t want to receive.',
    },
    {
      question: 'What should I do if I am marked absent when I attended class?',
      answer: 'Contact your teacher immediately. Teachers can manually update attendance with proper justification.',
    },
  ];

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Detailed guides and tutorials',
      action: 'View Docs',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      action: 'Watch Now',
    },
    {
      icon: MessageCircle,
      title: 'Community Forum',
      description: 'Ask questions and get answers',
      action: 'Join Forum',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-lg text-gray-600 mb-8">
            Search for answers or browse our help categories below
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <Card key={index} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <action.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>
              <Button variant="link" className="p-0 h-auto text-blue-600">
                {action.action} <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`p-6 ${category.bgColor} rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <category.icon className={`w-8 h-8 ${category.color} mx-auto mb-3`} />
                <p className="text-sm text-gray-900 text-center">{category.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-900 pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 border-t border-gray-200 pt-4">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="text-center">
            <h2 className="text-2xl text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gap-2 h-12 px-6 bg-blue-600 hover:bg-blue-700">
                <Mail className="w-5 h-5" />
                Email Support
              </Button>
              <Button variant="outline" className="gap-2 h-12 px-6 border-2">
                <MessageCircle className="w-5 h-5" />
                Live Chat
              </Button>
              <Button variant="outline" className="gap-2 h-12 px-6 border-2">
                <Phone className="w-5 h-5" />
                Call Us
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              Average response time: <strong>2 hours</strong>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
