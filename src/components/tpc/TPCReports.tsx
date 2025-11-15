import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  FileText, 
  Download, 
  TrendingUp,
  Users,
  Briefcase,
  Award,
  DollarSign,
  BarChart3,
  Calendar,
  Building2,
  Target,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  PieChart
} from 'lucide-react';

export default function TPCReports() {
  const placementReports = [
    {
      name: 'Overall Placement Statistics',
      description: 'Comprehensive placement data for current academic year',
      metrics: {
        totalStudents: 850,
        placed: 782,
        placementRate: 92,
        avgPackage: '8.5 LPA',
        highestPackage: '45 LPA'
      },
      format: 'PDF, Excel, PowerPoint',
      size: '4.2 MB',
      lastUpdated: '2 hours ago',
      status: 'Ready'
    },
    {
      name: 'Company-wise Placement Report',
      description: 'Detailed breakdown of placements by recruiting companies',
      companies: 145,
      topRecruiters: ['Microsoft', 'Google', 'Amazon', 'TCS', 'Infosys'],
      format: 'PDF, Excel',
      size: '2.8 MB',
      lastUpdated: '5 hours ago',
      status: 'Ready'
    },
    {
      name: 'Department-wise Analysis',
      description: 'Placement statistics segregated by departments',
      departments: [
        { name: 'CSE', placed: 245, total: 260, rate: 94 },
        { name: 'IT', placed: 128, total: 135, rate: 95 },
        { name: 'ECE', placed: 156, total: 175, rate: 89 },
        { name: 'EE', placed: 142, total: 165, rate: 86 },
        { name: 'ME', placed: 111, total: 115, rate: 97 }
      ],
      format: 'PDF, Excel',
      size: '1.9 MB',
      lastUpdated: '1 day ago',
      status: 'Ready'
    },
    {
      name: 'Salary Package Distribution',
      description: 'CTC ranges and package distribution analysis',
      ranges: [
        { range: '< 4 LPA', count: 85, percent: 11 },
        { range: '4-7 LPA', count: 312, percent: 40 },
        { range: '7-10 LPA', count: 215, percent: 27 },
        { range: '10-15 LPA', count: 125, percent: 16 },
        { range: '> 15 LPA', count: 45, percent: 6 }
      ],
      format: 'PDF, Excel',
      size: '1.5 MB',
      lastUpdated: '1 day ago',
      status: 'Ready'
    }
  ];

  const studentReports = [
    {
      name: 'Student Readiness Assessment',
      description: 'Comprehensive evaluation of placement readiness',
      totalAssessed: 850,
      categories: {
        excellent: 156,
        good: 445,
        average: 198,
        needsImprovement: 51
      },
      format: 'PDF, Excel',
      size: '3.1 MB',
      lastUpdated: '3 hours ago',
      status: 'Ready'
    },
    {
      name: 'Skills Gap Analysis',
      description: 'Identified skill gaps and training recommendations',
      topSkills: [
        { skill: 'Full Stack Development', gap: 35 },
        { skill: 'Data Structures & Algorithms', gap: 42 },
        { skill: 'System Design', gap: 58 },
        { skill: 'Cloud Technologies', gap: 65 },
        { skill: 'Machine Learning', gap: 71 }
      ],
      format: 'PDF, Excel',
      size: '2.4 MB',
      lastUpdated: '6 hours ago',
      status: 'Ready'
    },
    {
      name: 'Mock Interview Performance',
      description: 'Analysis of student performance in mock interviews',
      totalInterviews: 1250,
      passRate: 68,
      commonIssues: ['Communication', 'Technical depth', 'Problem solving'],
      format: 'PDF',
      size: '1.8 MB',
      lastUpdated: '1 day ago',
      status: 'Ready'
    },
    {
      name: 'Internship to PPO Conversion',
      description: 'Pre-placement offer conversion statistics',
      internships: 425,
      ppoReceived: 287,
      conversionRate: 67,
      format: 'PDF, Excel',
      size: '1.2 MB',
      lastUpdated: '2 days ago',
      status: 'Ready'
    }
  ];

  const companyReports = [
    {
      name: 'Company Engagement Report',
      description: 'Analysis of company interactions and partnerships',
      totalCompanies: 145,
      newCompanies: 28,
      repeatRecruiters: 117,
      status: 'Ready'
    },
    {
      name: 'Recruitment Drive Analysis',
      description: 'Performance metrics of placement drives',
      totalDrives: 92,
      successful: 78,
      successRate: 85,
      status: 'Ready'
    },
    {
      name: 'Industry Sector Distribution',
      description: 'Placements categorized by industry sectors',
      sectors: [
        { name: 'IT Services', count: 325, percent: 42 },
        { name: 'Product Companies', count: 198, percent: 25 },
        { name: 'Core Engineering', count: 156, percent: 20 },
        { name: 'Consulting', count: 78, percent: 10 },
        { name: 'Others', count: 25, percent: 3 }
      ],
      status: 'Ready'
    }
  ];

  const quickStats = [
    { label: 'Placement Rate', value: '92%', change: '+5%', icon: TrendingUp, color: 'green' },
    { label: 'Avg Package', value: '8.5 LPA', change: '+1.2 LPA', icon: DollarSign, color: 'blue' },
    { label: 'Companies', value: '145', change: '+28 new', icon: Building2, color: 'purple' },
    { label: 'Students Placed', value: '782', change: '850 total', icon: Users, color: 'orange' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Placement Reports & Analytics</h2>
          <p className="text-gray-500 mt-1">Comprehensive placement data and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Select Year
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Placement Statistics Reports */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Placement Statistics Reports
        </h3>
        <div className="space-y-4">
          {placementReports.map((report, idx) => (
            <div key={idx} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{report.name}</h4>
                    <Badge className="bg-green-100 text-green-700">{report.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                </div>
              </div>

              {/* Metrics Display */}
              {report.metrics && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-4 bg-white rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Total Students</p>
                    <p className="text-lg font-bold text-gray-900">{report.metrics.totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Placed</p>
                    <p className="text-lg font-bold text-green-600">{report.metrics.placed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Placement %</p>
                    <p className="text-lg font-bold text-blue-600">{report.metrics.placementRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Avg Package</p>
                    <p className="text-lg font-bold text-purple-600">{report.metrics.avgPackage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Highest</p>
                    <p className="text-lg font-bold text-orange-600">{report.metrics.highestPackage}</p>
                  </div>
                </div>
              )}

              {/* Department Data */}
              {report.departments && (
                <div className="mb-4 space-y-2">
                  {report.departments.map((dept, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-900 w-12">{dept.name}</span>
                      <div className="flex-1">
                        <Progress value={dept.rate} className="h-2" />
                      </div>
                      <span className="text-sm text-gray-600 w-24">{dept.placed}/{dept.total}</span>
                      <span className="text-sm font-medium text-green-600 w-16">{dept.rate}%</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Salary Ranges */}
              {report.ranges && (
                <div className="mb-4 grid grid-cols-2 md:grid-cols-5 gap-3">
                  {report.ranges.map((range, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg border">
                      <p className="text-xs text-gray-500">{range.range}</p>
                      <p className="text-lg font-bold text-gray-900">{range.count}</p>
                      <p className="text-xs text-gray-600">{range.percent}%</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Top Recruiters */}
              {report.topRecruiters && (
                <div className="mb-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Top Recruiters:</span>
                  {report.topRecruiters.map((company, i) => (
                    <Badge key={i} variant="outline">{company}</Badge>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>{report.format}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{report.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    <span>{report.size}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Preview</Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Student Assessment Reports */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          Student Assessment Reports
        </h3>
        <div className="space-y-4">
          {studentReports.map((report, idx) => (
            <div key={idx} className="p-5 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{report.name}</h4>
                    <Badge className="bg-green-100 text-green-700">{report.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>

              {/* Categories */}
              {report.categories && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Excellent</p>
                    <p className="text-xl font-bold text-green-600">{report.categories.excellent}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Good</p>
                    <p className="text-xl font-bold text-blue-600">{report.categories.good}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Average</p>
                    <p className="text-xl font-bold text-yellow-600">{report.categories.average}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Needs Work</p>
                    <p className="text-xl font-bold text-red-600">{report.categories.needsImprovement}</p>
                  </div>
                </div>
              )}

              {/* Skills Gap */}
              {report.topSkills && (
                <div className="mb-4 space-y-2">
                  {report.topSkills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-sm text-gray-900 flex-1">{skill.skill}</span>
                      <div className="w-32">
                        <Progress value={100 - skill.gap} className="h-2" />
                      </div>
                      <span className="text-sm text-red-600 w-16">{skill.gap}% gap</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Interview Stats */}
              {report.totalInterviews && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Total Interviews</p>
                    <p className="text-xl font-bold text-gray-900">{report.totalInterviews}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Pass Rate</p>
                    <p className="text-xl font-bold text-green-600">{report.passRate}%</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Top Issues</p>
                    <p className="text-sm text-gray-600">{report.commonIssues?.join(', ')}</p>
                  </div>
                </div>
              )}

              {/* PPO Conversion */}
              {report.internships && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Internships</p>
                    <p className="text-xl font-bold text-gray-900">{report.internships}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">PPOs Received</p>
                    <p className="text-xl font-bold text-green-600">{report.ppoReceived}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Conversion Rate</p>
                    <p className="text-xl font-bold text-blue-600">{report.conversionRate}%</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-sm text-gray-500 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <FileSpreadsheet className="w-4 h-4" />
                    {report.format}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {report.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    {report.size}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Preview</Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Company Engagement Reports */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-green-600" />
          Company & Recruitment Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {companyReports.map((report, idx) => (
            <div key={idx} className="p-5 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-2">{report.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              
              {report.totalCompanies && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Companies</span>
                    <span className="font-bold text-gray-900">{report.totalCompanies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">New This Year</span>
                    <span className="font-bold text-green-600">{report.newCompanies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Repeat Recruiters</span>
                    <span className="font-bold text-blue-600">{report.repeatRecruiters}</span>
                  </div>
                </div>
              )}

              {report.totalDrives && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Drives</span>
                    <span className="font-bold text-gray-900">{report.totalDrives}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Successful</span>
                    <span className="font-bold text-green-600">{report.successful}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-bold text-blue-600">{report.successRate}%</span>
                  </div>
                </div>
              )}

              {report.sectors && (
                <div className="space-y-2 mb-4">
                  {report.sectors.map((sector, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-32">{sector.name}</span>
                      <div className="flex-1">
                        <Progress value={sector.percent} className="h-1.5" />
                      </div>
                      <span className="text-xs font-medium text-gray-900 w-12">{sector.count}</span>
                    </div>
                  ))}
                </div>
              )}

              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Custom Report Builder */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PieChart className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Custom Report Builder</h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Create tailored placement reports with specific metrics, filters, and visualizations for presentations or analysis.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Build Custom Report
          </Button>
        </div>
      </Card>
    </div>
  );
}
