import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, CheckCircle, AlertTriangle, Scale, UserCheck, Download } from 'lucide-react';

export default function TermsOfService() {
  const sections = [
    {
      icon: UserCheck,
      title: '1. Acceptance of Terms',
      content: 'By accessing and using SmartCurriculum, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our platform. These terms apply to all users including students, teachers, administrators, and other stakeholders.',
    },
    {
      icon: FileText,
      title: '2. Use of Service',
      subsections: [
        {
          subtitle: '2.1 Eligibility',
          text: 'You must be affiliated with an educational institution that has a valid license to use SmartCurriculum. Students must be enrolled, and faculty/staff must be employed by a participating institution.',
        },
        {
          subtitle: '2.2 Account Registration',
          text: 'You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
        },
        {
          subtitle: '2.3 Acceptable Use',
          text: 'You agree to use SmartCurriculum only for lawful purposes and in accordance with your institution\'s policies. You must not misuse the platform, attempt unauthorized access, or interfere with other users\' experience.',
        },
      ],
    },
    {
      icon: Scale,
      title: '3. User Responsibilities',
      subsections: [
        {
          subtitle: '3.1 Academic Integrity',
          text: 'You must maintain academic integrity when using the platform. Cheating, plagiarism, proxy attendance, or any form of academic dishonesty is strictly prohibited and may result in account termination.',
        },
        {
          subtitle: '3.2 Content Submission',
          text: 'You are responsible for all content you submit, including assignments, forum posts, and communications. You grant SmartCurriculum a license to use, display, and distribute your content as necessary to provide services.',
        },
        {
          subtitle: '3.3 Conduct',
          text: 'You must treat other users with respect. Harassment, discrimination, hate speech, or any form of abusive behavior will not be tolerated and may result in immediate account suspension.',
        },
      ],
    },
    {
      icon: CheckCircle,
      title: '4. Services Provided',
      subsections: [
        {
          subtitle: '4.1 Platform Features',
          text: 'SmartCurriculum provides attendance tracking, coursework management, grade tracking, document storage, communication tools, and analytics. Features may vary based on your institution\'s subscription.',
        },
        {
          subtitle: '4.2 Service Availability',
          text: 'We strive to maintain 99.9% uptime but do not guarantee uninterrupted access. We may suspend services for maintenance, updates, or in case of technical issues. We will provide advance notice when possible.',
        },
        {
          subtitle: '4.3 Updates and Changes',
          text: 'We reserve the right to modify, suspend, or discontinue any feature or service at any time. We will notify users of significant changes through the platform or email.',
        },
      ],
    },
    {
      icon: AlertTriangle,
      title: '5. Intellectual Property',
      subsections: [
        {
          subtitle: '5.1 Platform Ownership',
          text: 'SmartCurriculum and all its features, design, code, and content are owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our platform without permission.',
        },
        {
          subtitle: '5.2 User Content',
          text: 'You retain ownership of content you submit but grant us a license to use it for service provision. Educational materials uploaded by teachers remain their property, subject to institutional policies.',
        },
        {
          subtitle: '5.3 Third-Party Content',
          text: 'Some materials may be licensed from third parties. You must respect all copyright notices and licensing terms when using such content.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl mb-4">Terms of Service</h1>
          <p className="text-lg text-white/90 mb-2">
            Effective Date: November 7, 2025
          </p>
          <p className="text-white/80">
            Please read these terms carefully before using SmartCurriculum
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <Card className="p-8 mb-8 border-2 border-purple-200 bg-purple-50">
          <p className="text-gray-700 leading-relaxed">
            These Terms of Service ("Terms") govern your access to and use of SmartCurriculum, 
            an educational management platform provided by SmartCurriculum Inc. ("Company," "we," "us," or "our"). 
            By using our services, you enter into a binding agreement with us and agree to comply with these Terms.
          </p>
        </Card>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl text-gray-900 pt-2">{section.title}</h2>
              </div>

              {section.content && (
                <p className="text-gray-700 leading-relaxed pl-16">{section.content}</p>
              )}

              {section.subsections && (
                <div className="space-y-6 pl-16">
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-lg text-gray-900 mb-2">{subsection.subtitle}</h3>
                      <p className="text-gray-700 leading-relaxed">{subsection.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="space-y-8 mt-8">
          <Card className="p-8 border border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-6">6. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                SmartCurriculum is provided "as is" without warranties of any kind. We do not guarantee 
                that the platform will meet your requirements or be error-free. We are not liable for:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Loss of data or educational records due to technical failures</li>
                <li>Consequences of service interruptions or downtime</li>
                <li>Actions or content of other users on the platform</li>
                <li>Third-party services or integrations</li>
                <li>Decisions made by your institution based on platform data</li>
              </ul>
              <p>
                Our total liability for any claims shall not exceed the amount paid by your institution 
                for the service in the preceding 12 months.
              </p>
            </div>
          </Card>

          <Card className="p-8 border border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-6">7. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your use of SmartCurriculum is also governed by our Privacy Policy, which explains how we 
              collect, use, and protect your personal information. By using our services, you consent to 
              our data practices as described in the Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We comply with FERPA (Family Educational Rights and Privacy Act) and other applicable 
              educational privacy laws. Your educational records are protected and shared only as 
              permitted by law and institutional policy.
            </p>
          </Card>

          <Card className="p-8 border border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-6">8. Termination</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>8.1 By You:</strong> You may stop using SmartCurriculum at any time. Your institution 
                may also remove your access upon graduation, withdrawal, or termination of employment.
              </p>
              <p>
                <strong>8.2 By Us:</strong> We may suspend or terminate your account if you violate these Terms, 
                engage in prohibited activities, or if your institution's license expires. We will provide 
                notice when possible, except in cases of serious violations.
              </p>
              <p>
                <strong>8.3 Effect of Termination:</strong> Upon termination, you lose access to the platform. 
                Your educational records may be retained according to institutional policies and legal requirements.
              </p>
            </div>
          </Card>

          <Card className="p-8 border border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-6">9. Dispute Resolution</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Any disputes arising from these Terms or your use of SmartCurriculum shall first be 
                resolved through good faith negotiations. If negotiations fail, disputes shall be resolved 
                through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
              <p>
                These Terms are governed by the laws of the State of California, without regard to conflict 
                of law principles. Any arbitration shall take place in San Francisco, California.
              </p>
            </div>
          </Card>

          <Card className="p-8 border border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-6">10. General Provisions</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you 
                and SmartCurriculum regarding use of the platform.
              </p>
              <p>
                <strong>Amendments:</strong> We may modify these Terms at any time. Significant changes will 
                be notified via email or platform announcement. Continued use after changes constitutes acceptance.
              </p>
              <p>
                <strong>Severability:</strong> If any provision of these Terms is found invalid, the remaining 
                provisions shall remain in full effect.
              </p>
              <p>
                <strong>No Waiver:</strong> Our failure to enforce any right or provision shall not constitute 
                a waiver of such right or provision.
              </p>
            </div>
          </Card>

          <Card className="p-8 border border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-6">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these Terms of Service, please contact:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>SmartCurriculum Legal Department</strong></p>
              <p>Email: legal@smartcurriculum.edu</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Education Street, Tech Park, CA 94025, United States</p>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="gap-2 h-12 px-8 bg-purple-600 hover:bg-purple-700">
            <CheckCircle className="w-5 h-5" />
            I Accept These Terms
          </Button>
          <Button variant="outline" className="gap-2 h-12 px-8">
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2 h-12 px-8">
            View Privacy Policy
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            © 2025 SmartCurriculum Inc. All rights reserved. | Last updated: November 7, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
