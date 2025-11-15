import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  FileCheck, AlertTriangle, CheckCircle, Clock, XCircle,
  Upload, Download, Eye, Calendar, Bell, Shield, FileText
} from 'lucide-react';

export default function UniversityCompliance() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance & Accreditation</h2>
          <p className="text-gray-500">Regulatory compliance and certification management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Set Reminders
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: '24', icon: FileCheck, color: 'blue' },
          { label: 'Compliant', value: '18', icon: CheckCircle, color: 'green' },
          { label: 'Due Soon', value: '4', icon: AlertTriangle, color: 'amber' },
          { label: 'Overdue', value: '2', icon: XCircle, color: 'red' },
        ].map((stat, idx) => (
          <Card key={idx} className={`p-4 border-2 ${
            idx === 3 ? 'border-red-200 bg-red-50' :
            idx === 2 ? 'border-amber-200 bg-amber-50' :
            idx === 1 ? 'border-green-200 bg-green-50' :
            'border-blue-200 bg-blue-50'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Critical Alerts */}
      <Card className="p-6 border-2 border-red-200 bg-red-50">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-2">Critical: Action Required</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded border border-red-200">
                <div>
                  <p className="font-medium text-gray-900">NAAC Accreditation Renewal</p>
                  <p className="text-sm text-gray-600">Application submission due in 15 days</p>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Take Action
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border border-red-200">
                <div>
                  <p className="font-medium text-gray-900">Fire Safety Certificate</p>
                  <p className="text-sm text-gray-600">Expired 5 days ago</p>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Renew Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Regulatory Bodies */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AICTE Compliance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Approval Status</p>
                  <p className="text-sm text-gray-600">Valid till March 2025</p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">Active</Badge>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Required Submissions</h4>
              {[
                { item: 'Annual Report', status: 'completed', date: 'Submitted Apr 2024' },
                { item: 'Faculty Details Update', status: 'pending', date: 'Due Jul 2024' },
                { item: 'Infrastructure Report', status: 'completed', date: 'Submitted May 2024' },
                { item: 'Student Feedback', status: 'in-progress', date: 'Due Jun 2024' },
              ].map((req, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {req.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {req.status === 'pending' && <Clock className="w-4 h-4 text-amber-600" />}
                    {req.status === 'in-progress' && <Clock className="w-4 h-4 text-blue-600" />}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{req.item}</p>
                      <p className="text-xs text-gray-500">{req.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">NAAC Accreditation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900">Renewal Due</p>
                  <p className="text-sm text-gray-600">Expires in 60 days</p>
                </div>
              </div>
              <Badge className="bg-amber-600 text-white">Action Needed</Badge>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Current Grade: A+</h4>
              <div className="space-y-2">
                {[
                  { criterion: 'Curricular Aspects', score: 3.5, max: 4.0 },
                  { criterion: 'Teaching & Learning', score: 3.8, max: 4.0 },
                  { criterion: 'Research & Innovation', score: 3.6, max: 4.0 },
                  { criterion: 'Infrastructure', score: 3.7, max: 4.0 },
                  { criterion: 'Student Support', score: 3.9, max: 4.0 },
                ].map((crit, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{crit.criterion}</span>
                      <span className="font-semibold text-gray-900">{crit.score}/{crit.max}</span>
                    </div>
                    <Progress value={(crit.score / crit.max) * 100} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* All Compliance Items */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Compliance Items</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Validity</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Renewal Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Documents</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { category: 'Accreditation', item: 'AICTE Approval', validity: 'Mar 2025', renewal: 'Dec 2024', status: 'valid', docs: 3 },
                { category: 'Accreditation', item: 'UGC Recognition', validity: 'Permanent', renewal: '-', status: 'valid', docs: 5 },
                { category: 'Accreditation', item: 'NAAC Accreditation', validity: 'Aug 2024', renewal: 'Jun 2024', status: 'due-soon', docs: 12 },
                { category: 'Accreditation', item: 'NBA Accreditation', validity: 'Dec 2025', renewal: 'Sep 2025', status: 'valid', docs: 8 },
                { category: 'Safety', item: 'Fire Safety Certificate', validity: 'May 2024', renewal: 'May 2024', status: 'overdue', docs: 2 },
                { category: 'Safety', item: 'Building Safety Audit', validity: 'Nov 2024', renewal: 'Aug 2024', status: 'valid', docs: 4 },
                { category: 'Legal', item: 'Trust Registration', validity: 'Permanent', renewal: '-', status: 'valid', docs: 3 },
                { category: 'Legal', item: 'Tax Exemption', validity: 'Mar 2025', renewal: 'Dec 2024', status: 'valid', docs: 6 },
                { category: 'Quality', item: 'ISO 9001 Certification', validity: 'Jan 2025', renewal: 'Oct 2024', status: 'valid', docs: 5 },
                { category: 'Quality', item: 'NIRF Participation', validity: 'Annual', renewal: 'Mar 2025', status: 'valid', docs: 10 },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{item.item}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.validity}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.renewal}</td>
                  <td className="py-3 px-4">
                    <Badge className={
                      item.status === 'valid' ? 'bg-green-100 text-green-700' :
                      item.status === 'due-soon' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }>
                      {item.status === 'valid' ? 'Valid' :
                       item.status === 'due-soon' ? 'Due Soon' : 'Overdue'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>{item.docs} files</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Document Repository */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Document Repository</h3>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { category: 'AICTE', count: 15, size: '45 MB' },
            { category: 'NAAC', count: 28, size: '120 MB' },
            { category: 'NBA', count: 18, size: '75 MB' },
            { category: 'Safety', count: 12, size: '30 MB' },
            { category: 'Legal', count: 24, size: '60 MB' },
            { category: 'Audit Reports', count: 10, size: '25 MB' },
            { category: 'Certificates', count: 32, size: '90 MB' },
            { category: 'Others', count: 20, size: '40 MB' },
          ].map((folder, idx) => (
            <Card key={idx} className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <Button variant="ghost" size="sm" className="h-auto p-1">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{folder.category}</h4>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{folder.count} files</span>
                <span>{folder.size}</span>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Compliance Timeline */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Renewal Timeline</h3>
        <div className="space-y-4">
          {[
            { month: 'June 2024', items: ['NAAC Application Submission', 'Annual Report to UGC'] },
            { month: 'July 2024', items: ['Faculty Details Update (AICTE)', 'Building Safety Inspection'] },
            { month: 'August 2024', items: ['NBA Self-Assessment Report'] },
            { month: 'September 2024', items: ['ISO Audit Preparation'] },
            { month: 'October 2024', items: ['ISO Re-certification Audit'] },
          ].map((period, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${
                  idx === 0 ? 'bg-red-100' : idx === 1 ? 'bg-amber-100' : 'bg-blue-100'
                } flex items-center justify-center`}>
                  <Calendar className={`w-5 h-5 ${
                    idx === 0 ? 'text-red-600' : idx === 1 ? 'text-amber-600' : 'text-blue-600'
                  }`} />
                </div>
                {idx < 4 && <div className="w-0.5 h-16 bg-gray-200 my-2" />}
              </div>
              <div className="flex-1 pb-6">
                <h4 className="font-semibold text-gray-900 mb-2">{period.month}</h4>
                <ul className="space-y-1">
                  {period.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
