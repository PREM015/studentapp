import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  GraduationCap, Target, Users, Zap, Award, Globe, 
  TrendingUp, Shield, Smartphone, BarChart, Heart, Lightbulb
} from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Access everything on the go with our responsive mobile app',
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Get instant notifications for attendance, grades, and events',
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Track your progress with detailed analytics and insights',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security',
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Earn points, badges, and climb the leaderboard',
    },
    {
      icon: Globe,
      title: 'Cloud Storage',
      description: 'Store and access your documents from anywhere',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Students' },
    { value: '2K+', label: 'Teachers' },
    { value: '100+', label: 'Universities' },
    { value: '98%', label: 'Satisfaction' },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Education Officer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    },
    {
      name: 'James Wilson',
      role: 'Customer Success',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl mb-6">
            SmartCurriculum
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90">
            Revolutionizing Education Management
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            A comprehensive platform connecting students, teachers, placement cells, clubs, and administrators in one seamless ecosystem.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <Target className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower educational institutions with modern technology that simplifies administration, 
              enhances learning experiences, and fosters better communication between all stakeholders.
            </p>
          </Card>

          <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <Lightbulb className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-2xl text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the world's most trusted education management platform, 
              making quality education accessible and manageable for millions of students and educators globally.
            </p>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                <p className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Why Choose SmartCurriculum?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern technology and designed for the future of education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <Card className="p-8 md:p-12 mb-16 border-2 border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <Heart className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  SmartCurriculum was born out of a simple observation: educational institutions were 
                  struggling with fragmented systems, manual processes, and disconnected stakeholders. 
                  Students, teachers, and administrators were spending more time managing paperwork than 
                  focusing on what matters most—learning and teaching.
                </p>
                <p>
                  In 2023, our founding team of educators and technologists came together with a vision 
                  to create a unified platform that would streamline every aspect of educational management. 
                  We spent months researching, interviewing students and teachers, and understanding the 
                  pain points across different educational institutions.
                </p>
                <p>
                  Today, SmartCurriculum serves over 50,000 students and 2,000 teachers across 100+ 
                  universities. We're proud to be making a difference in the lives of students and 
                  educators every day, and we're just getting started.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Passionate people working to transform education
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <Users className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Student-Centric</h3>
              <p className="text-gray-700">
                Every decision we make puts students first, ensuring the best learning experience.
              </p>
            </Card>

            <Card className="p-6 border-2 border-green-200 bg-green-50">
              <TrendingUp className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-700">
                We continuously evolve and adopt the latest technologies to stay ahead.
              </p>
            </Card>

            <Card className="p-6 border-2 border-purple-200 bg-purple-50">
              <Shield className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Trust & Security</h3>
              <p className="text-gray-700">
                We protect your data with the highest standards of security and privacy.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white text-center border-0">
          <h2 className="text-3xl md:text-4xl mb-4">Join the SmartCurriculum Family</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Transform your educational institution with our comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="h-12 px-8 bg-white text-blue-600 hover:bg-gray-100">
              Request a Demo
            </Button>
            <Button variant="outline" className="h-12 px-8 border-2 border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 px-4 text-center">
        <p className="text-gray-400">
          © 2025 SmartCurriculum. All rights reserved. | Built with ❤️ for Education
        </p>
      </div>
    </div>
  );
}
