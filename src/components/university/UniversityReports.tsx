import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  GraduationCap,
  Award,
  Building2,
  DollarSign,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  FileBarChart,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function UniversityReports() {
  const reportCategories = [
    {
      category: 'Academic Reports',
      icon: GraduationCap,
      color: 'blue',
      reports: [
        { 
          name: 'Semester Performance Report',
          description: 'Overall academic performance by semester',
          format: 'PDF, Excel',
          lastGenerated: '2 hours ago',
          size: '2.4 MB',
          status: 'Ready'
        },
        { 
          name: 'Department-wise Results',
          description: 'Detailed results analysis per department',
          format: 'PDF, Excel',
          lastGenerated: '5 hours ago',
          size: '3.1 MB',
          status: 'Ready'
        },
        { 
          name: 'Student Progression Analysis',
          description: 'Year-wise student progression tracking',
          format: 'PDF',
          lastGenerated: '1 day ago',
          size: '1.8 MB',
          status: 'Ready'
        },
        { 
          name: 'Course Completion Statistics',
          description: 'Course completion rates and trends',
          format: 'Excel, CSV',
          lastGenerated: '1 day ago',
          size: '890 KB',
          status: 'Ready'
        }
      ]
    },
    {
      category: 'Placement Reports',
      icon: Award,
      color: 'green',
      reports: [
        { 
          name: 'Annual Placement Report',
          description: 'Comprehensive placement statistics for the year',
          format: 'PDF, PowerPoint',
          lastGenerated: '1 day ago',
          size: '5.2 MB',
          status: 'Ready'
        },
        { 
          name: 'Company-wise Placement Analysis',
          description: 'Detailed breakdown by recruiting companies',
          format: 'PDF, Excel',
          lastGenerated: '2 days ago',
          size: '1.5 MB',
          status: 'Ready'
        },
        { 
          name: 'Salary Package Distribution',
          description: 'CTC ranges and package statistics',
          format: 'Excel, CSV',
          lastGenerated: '2 days ago',
          size: '650 KB',
          status: 'Ready'
        },
        { 
          name: 'Internship to PPO Conversion',
          description: 'Pre-placement offer conversion rates',
          format: 'PDF',
          lastGenerated: '3 days ago',
          size: '1.1 MB',
          status: 'Ready'
        }
      ]
    },
    {
      category: 'Financial Reports',
      icon: DollarSign,
      color: 'purple',
      reports: [
        { 
          name: 'Budget Utilization Report',
          description: 'Department-wise budget allocation and usage',
          format: 'Excel, PDF',
          lastGenerated: '6 hours ago',
          size: '2.8 MB',
          status: 'Ready'
        },
        { 
          name: 'Fee Collection Summary',
          description: 'Student fee collection status and pending',
          format: 'Excel',
          lastGenerated: '12 hours ago',
          size: '1.9 MB',
          status: 'Ready'
        },
        { 
          name: 'Scholarship Distribution',
          description: 'Scholarship awards and disbursements',
          format: 'PDF, Excel',
          lastGenerated: '1 day ago',
          size: '780 KB',
          status: 'Ready'
        },
        { 
          name: 'Revenue & Expenditure Statement',
          description: 'Monthly financial statements',
          format: 'PDF',
          lastGenerated: 'Processing',
          size: '-',
          status: 'Pending'
        }
      ]
    },
    {
      category: 'Compliance & Accreditation',
      icon: FileText,
      color: 'orange',
      reports: [
        { 
          name: 'NAAC Self-Study Report (SSR)',
          description: 'Complete NAAC accreditation documentation',
          format: 'PDF',
          lastGenerated: '1 week ago',
          size: '12.5 MB',
          status: 'Ready'
        },
        { 
          name: 'NBA Program Assessment',
          description: 'Department-wise NBA compliance report',
          format: 'PDF, Excel',
          lastGenerated: '1 week ago',
          size: '8.3 MB',
          status: 'Ready'
        },
        { 
          name: 'AICTE Annual Report',
          description: 'AICTE mandatory annual disclosure',
          format: 'PDF',
          lastGenerated: '2 weeks ago',
          size: '6.7 MB',
          status: 'Ready'
        },
        { 
          name: 'UGC Compliance Documentation',
          description: 'UGC regulatory compliance reports',
          format: 'PDF',
          lastGenerated: '2 weeks ago',
          size: '4.2 MB',
          status: 'Ready'
        }
      ]
    },
    {
      category: 'Faculty & Staff Reports',
      icon: Users,
      color: 'indigo',
      reports: [
        { 
          name: 'Faculty Performance Evaluation',
          description: 'Annual faculty assessment reports',
          format: 'PDF, Excel',
          lastGenerated: '3 days ago',
          size: '3.4 MB',
          status: 'Ready'
        },
        { 
          name: 'Faculty Recruitment Summary',
          description: 'New faculty hiring and onboarding',
          format: 'Excel',
          lastGenerated: '5 days ago',
          size: '920 KB',
          status: 'Ready'
        },
        { 
          name: 'Professional Development Activities',
          description: 'Faculty training and workshops attended',
          format: 'PDF',
          lastGenerated: '1 week ago',
          size: '1.6 MB',
          status: 'Ready'
        },
        { 
          name: 'Research Publications Report',
          description: 'Faculty research output and citations',
          format: 'Excel, CSV',
          lastGenerated: '1 week ago',
          size: '1.2 MB',
          status: 'Ready'
        }
      ]
    },
    {
      category: 'Infrastructure Reports',
      icon: Building2,
      color: 'teal',
      reports: [
        { 
          name: 'Lab Equipment Inventory',
          description: 'Complete laboratory equipment tracking',
          format: 'Excel',
          lastGenerated: '4 days ago',
          size: '2.1 MB',
          status: 'Ready'
        },
        { 
          name: 'Library Resources Report',
          description: 'Books, journals, and digital resources',
          format: 'PDF, Excel',
          lastGenerated: '5 days ago',
          size: '1.7 MB',
          status: 'Ready'
        },
        { 
          name: 'Campus Facilities Utilization',
          description: 'Classrooms, halls, and facilities usage',
          format: 'Excel',
          lastGenerated: '1 week ago',
          size: '890 KB',
          status: 'Ready'
        },
        { 
          name: 'Maintenance & Repair Log',
          description: 'Infrastructure maintenance activities',
          format: 'PDF',
          lastGenerated: '1 week ago',
          size: '1.3 MB',
          status: 'Ready'
        }
      ]
    }
  ];

  const quickStats = [
    { label: 'Total Reports', value: '52', trend: '+8 this month', icon: FileText },
    { label: 'Ready to Download', value: '48', trend: '4 pending', icon: CheckCircle2 },
    { label: 'Generated Today', value: '6', trend: '12 scheduled', icon: Clock },
    { label: 'Storage Used', value: '2.8 GB', trend: '5.2 GB available', icon: FileBarChart }
  ];

  const scheduledReports = [
    { name: 'Weekly Attendance Report', schedule: 'Every Monday 9:00 AM', nextRun: 'Tomorrow 9:00 AM' },
    { name: 'Monthly Financial Summary', schedule: 'Last day of month', nextRun: 'In 5 days' },
    { name: 'Quarterly Performance Review', schedule: 'End of quarter', nextRun: 'In 28 days' },
    { name: 'Daily Activity Log', schedule: 'Every day 11:59 PM', nextRun: 'Today 11:59 PM' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-500 mt-1">Generate and download institutional reports</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Create Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.trend}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Scheduled Reports */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Scheduled Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scheduledReports.map((report, idx) => (
            <div key={idx} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <p className="text-xs text-gray-600 mt-1">Schedule: {report.schedule}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <p className="text-sm text-purple-700 font-medium">{report.nextRun}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Report Categories */}
      <Tabs defaultValue="academic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="placement">Placement</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>

        {reportCategories.map((category, catIdx) => (
          <TabsContent key={catIdx} value={category.category.toLowerCase().split(' ')[0]} className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{category.category}</h3>
                  <p className="text-sm text-gray-500">{category.reports.length} reports available</p>
                </div>
              </div>

              <div className="space-y-4">
                {category.reports.map((report, idx) => (
                  <div key={idx} className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{report.name}</h4>
                          <Badge className={
                            report.status === 'Ready' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FileSpreadsheet className="w-4 h-4" />
                            <span>{report.format}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{report.lastGenerated}</span>
                          </div>
                          {report.size !== '-' && (
                            <div className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" />
                              <span>{report.size}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {report.status === 'Ready' && (
                          <>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              Preview
                            </Button>
                          </>
                        )}
                        {report.status === 'Pending' && (
                          <Button size="sm" variant="outline" disabled>
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Processing...
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Custom Report Builder */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PieChart className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Need a Custom Report?</h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Use our report builder to create custom reports with specific metrics, date ranges, and filters tailored to your needs.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Build Custom Report
            </Button>
            <Button variant="outline">
              View Templates
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
