import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Shield, Eye, Lock, Users, Database, Bell, Download } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: '1. Information We Collect',
      content: [
        {
          subtitle: '1.1 Personal Information',
          text: 'We collect information that you provide directly to us, including: name, email address, phone number, student/employee ID, academic records, attendance data, course enrollment, assignment submissions, and profile information.',
        },
        {
          subtitle: '1.2 Automatically Collected Information',
          text: 'When you use SmartCurriculum, we automatically collect certain information including: IP address, device information, browser type, usage data, location data (for attendance), and log information.',
        },
        {
          subtitle: '1.3 Educational Data',
          text: 'We collect and process educational records including grades, test scores, attendance records, coursework submissions, teacher evaluations, and performance analytics.',
        },
      ],
    },
    {
      icon: Eye,
      title: '2. How We Use Your Information',
      content: [
        {
          subtitle: '2.1 Service Provision',
          text: 'We use your information to provide, maintain, and improve SmartCurriculum services including attendance tracking, grade management, course delivery, and communication between students and teachers.',
        },
        {
          subtitle: '2.2 Analytics and Insights',
          text: 'We analyze usage patterns and performance data to improve our services, provide personalized recommendations, and generate insights about learning outcomes.',
        },
        {
          subtitle: '2.3 Communications',
          text: 'We use your contact information to send service-related notifications, assignment reminders, grade updates, and other important educational communications.',
        },
      ],
    },
    {
      icon: Users,
      title: '3. Information Sharing',
      content: [
        {
          subtitle: '3.1 Within Your Institution',
          text: 'We share your information with teachers, administrators, and other authorized personnel within your educational institution as necessary for educational purposes.',
        },
        {
          subtitle: '3.2 Third-Party Services',
          text: 'We may share data with trusted third-party service providers who assist in operating our platform, always under strict confidentiality agreements.',
        },
        {
          subtitle: '3.3 Legal Requirements',
          text: 'We may disclose information when required by law, court order, or government request, or to protect the rights and safety of SmartCurriculum and its users.',
        },
      ],
    },
    {
      icon: Lock,
      title: '4. Data Security',
      content: [
        {
          subtitle: '4.1 Security Measures',
          text: 'We implement industry-standard security measures including encryption, secure servers, access controls, and regular security audits to protect your data.',
        },
        {
          subtitle: '4.2 Data Encryption',
          text: 'All data transmission is encrypted using SSL/TLS protocols. Sensitive data is encrypted at rest using AES-256 encryption.',
        },
        {
          subtitle: '4.3 Access Controls',
          text: 'We implement role-based access controls to ensure that only authorized personnel can access your information.',
        },
      ],
    },
    {
      icon: Shield,
      title: '5. Your Rights and Choices',
      content: [
        {
          subtitle: '5.1 Access and Correction',
          text: 'You have the right to access, update, and correct your personal information through your account settings or by contacting your institution.',
        },
        {
          subtitle: '5.2 Data Portability',
          text: 'You can request a copy of your data in a machine-readable format. Contact your institution\'s administrator for data export requests.',
        },
        {
          subtitle: '5.3 Deletion',
          text: 'You may request deletion of your account and personal data, subject to legal retention requirements and institutional policies.',
        },
        {
          subtitle: '5.4 Opt-Out',
          text: 'You can opt out of non-essential communications and control your notification preferences in your account settings.',
        },
      ],
    },
    {
      icon: Bell,
      title: '6. Cookies and Tracking',
      content: [
        {
          subtitle: '6.1 Cookie Usage',
          text: 'We use cookies and similar technologies to maintain sessions, remember preferences, and analyze platform usage.',
        },
        {
          subtitle: '6.2 Analytics',
          text: 'We use analytics tools to understand how users interact with SmartCurriculum and to improve user experience.',
        },
        {
          subtitle: '6.3 Your Cookie Choices',
          text: 'You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Privacy Policy</h1>
          <p className="text-lg text-white/90 mb-2">
            Last Updated: November 7, 2025
          </p>
          <p className="text-white/80">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <Card className="p-8 mb-8 border-2 border-blue-200 bg-blue-50">
          <p className="text-gray-700 leading-relaxed mb-4">
            SmartCurriculum ("we," "us," or "our") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our educational platform.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This policy applies to all users including students, teachers, administrators, and other stakeholders. 
            By using SmartCurriculum, you agree to the collection and use of information in accordance with this policy.
          </p>
        </Card>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl text-gray-900 pt-2">{section.title}</h2>
              </div>

              <div className="space-y-6 pl-16">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h3 className="text-lg text-gray-900 mb-2">{item.subtitle}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Important Information */}
        <Card className="p-8 mt-8 border border-gray-200">
          <h2 className="text-2xl text-gray-900 mb-6">7. Additional Information</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-2">Children's Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                SmartCurriculum is intended for use by educational institutions. We comply with applicable 
                laws regarding the collection of information from minors. Parental consent may be required 
                for users under 18 years of age, as determined by your institution.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 mb-2">Data Retention</h3>
              <p className="text-gray-700 leading-relaxed">
                We retain your information for as long as your account is active or as needed to provide services. 
                Educational records are retained according to institutional policies and legal requirements. 
                Inactive accounts may be deleted after a specified period.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 mb-2">International Data Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. 
                We ensure appropriate safeguards are in place for such transfers.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 mb-2">Changes to This Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of significant changes 
                via email or through the platform. Your continued use of SmartCurriculum after changes constitutes 
                acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Email: privacy@smartcurriculum.edu</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Education Street, Tech Park, CA 94025, United States</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="gap-2 h-12 px-8 bg-blue-600 hover:bg-blue-700">
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2 h-12 px-8">
            View Terms of Service
          </Button>
          <Button variant="outline" className="gap-2 h-12 px-8">
            Contact Privacy Team
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            © 2025 SmartCurriculum. All rights reserved. | This document was last updated on November 7, 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
