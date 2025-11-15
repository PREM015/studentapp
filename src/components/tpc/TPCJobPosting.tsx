import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { 
  Briefcase, Plus, Edit, Trash2, Eye, Users, Calendar, MapPin,
  DollarSign, Clock, TrendingUp, Filter, Search, Send, X,
  CheckCircle, XCircle, AlertCircle, Building2, GraduationCap
} from 'lucide-react';

export default function TPCJobPosting() {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'TCS',
      type: 'Full-time',
      package: '5.2L',
      location: 'Bangalore',
      posted: '2 days ago',
      deadline: '2024-06-25',
      applicants: 45,
      shortlisted: 12,
      status: 'active',
      category: 'Engineering',
      experience: '0-2 years',
      openings: 5
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Infosys',
      type: 'Full-time',
      package: '4.8L',
      location: 'Pune',
      posted: '5 days ago',
      deadline: '2024-06-22',
      applicants: 38,
      shortlisted: 8,
      status: 'active',
      category: 'Analytics',
      experience: '0-1 years',
      openings: 3
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Wipro',
      type: 'Full-time',
      package: '4.5L',
      location: 'Hyderabad',
      posted: '1 week ago',
      deadline: '2024-06-20',
      applicants: 52,
      shortlisted: 15,
      status: 'closed',
      category: 'Engineering',
      experience: '0-2 years',
      openings: 4
    },
  ];

  if (selectedJob) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedJob(null)}>
            ← Back to Jobs
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Job
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Close Job
            </Button>
          </div>
        </div>

        {/* Job Details */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                🏢
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{selectedJob.title}</h1>
                <p className="text-lg text-gray-600">{selectedJob.company}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className="bg-green-100 text-green-700">{selectedJob.status}</Badge>
                  <span className="text-sm text-gray-500">Posted {selectedJob.posted}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">₹{selectedJob.package}</p>
              <p className="text-sm text-gray-500">per annum</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Type</span>
              </div>
              <p className="font-semibold text-gray-900">{selectedJob.type}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Location</span>
              </div>
              <p className="font-semibold text-gray-900">{selectedJob.location}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Experience</span>
              </div>
              <p className="font-semibold text-gray-900">{selectedJob.experience}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Openings</span>
              </div>
              <p className="font-semibold text-gray-900">{selectedJob.openings}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="font-semibold text-gray-900 mb-3">Job Description</h3>
            <p className="text-gray-700 mb-4">
              We are looking for talented software engineers to join our dynamic team. 
              The ideal candidate will be responsible for developing high-quality applications, 
              writing clean and efficient code, and working collaboratively with cross-functional teams.
            </p>

            <h3 className="font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Design, develop, test, and deploy software applications</li>
              <li>Write clean, maintainable code following best practices</li>
              <li>Collaborate with team members on various projects</li>
              <li>Participate in code reviews and provide constructive feedback</li>
              <li>Debug and troubleshoot application issues</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Java', 'Python', 'JavaScript', 'SQL', 'Git', 'Agile', 'Problem Solving', 'Communication'].map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>

            <h3 className="font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>B.Tech/B.E. in Computer Science or related field</li>
              <li>CGPA: 7.0 and above</li>
              <li>No active backlogs</li>
              <li>Graduation year: 2024</li>
            </ul>
          </div>
        </Card>

        {/* Application Stats */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Applications</h3>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.applicants}</p>
            <Progress value={(selectedJob.applicants / 60) * 100} className="mb-2" />
            <p className="text-sm text-gray-500">{Math.round((selectedJob.applicants / 60) * 100)}% of eligible students</p>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Shortlisted</h3>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.shortlisted}</p>
            <Progress value={(selectedJob.shortlisted / selectedJob.applicants) * 100} className="mb-2" />
            <p className="text-sm text-gray-500">{Math.round((selectedJob.shortlisted / selectedJob.applicants) * 100)}% of applicants</p>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Deadline</h3>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">5</p>
            <p className="text-sm text-gray-500">days remaining</p>
            <p className="text-xs text-gray-400 mt-1">{selectedJob.deadline}</p>
          </Card>
        </div>

        {/* Applicants List */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Applicants ({selectedJob.applicants})</h3>
            <div className="flex items-center gap-2">
              <Input placeholder="Search applicants..." className="w-64" />
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Branch</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">CGPA</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Applied On</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const statuses = ['Applied', 'Shortlisted', 'Rejected'];
                  const status = statuses[idx % 3];
                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                            alt="Student"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Student {idx + 1}</p>
                            <p className="text-sm text-gray-500">CSE2022{(idx + 1).toString().padStart(3, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">Computer Science</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-700">
                          {(7.5 + Math.random() * 1.5).toFixed(2)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">Jun {10 + idx}, 2024</td>
                      <td className="py-3 px-4">
                        <Badge className={
                          status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                          status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {status === 'Applied' && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
          <p className="text-gray-500">{jobs.length} active jobs</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateJob(!showCreateJob)}>
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Jobs', value: '28', icon: Briefcase, color: 'blue' },
          { label: 'Active', value: '18', icon: TrendingUp, color: 'green' },
          { label: 'Total Applications', value: '342', icon: Users, color: 'purple' },
          { label: 'Avg Response', value: '75%', icon: CheckCircle, color: 'amber' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Create Job Form */}
      {showCreateJob && (
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Post New Job</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowCreateJob(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <Input placeholder="e.g., Software Engineer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Select Company</option>
                  <option>TCS</option>
                  <option>Infosys</option>
                  <option>Wipro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Engineering</option>
                  <option>Analytics</option>
                  <option>Design</option>
                  <option>Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Openings *</label>
                <Input type="number" placeholder="5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Package (LPA) *</label>
                <Input placeholder="e.g., 5.2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <Input placeholder="e.g., Bangalore" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Required</label>
                <Input placeholder="e.g., 0-2 years" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
                <Input type="date" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
              <Textarea rows={4} placeholder="Describe the role, responsibilities, and requirements..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
              <Input placeholder="Enter skills separated by commas" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Criteria</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Minimum CGPA</label>
                  <Input type="number" step="0.1" placeholder="7.0" />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Maximum Backlogs</label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowCreateJob(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="Search jobs..." className="pl-10" />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Closed</option>
            <option>Draft</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Companies</option>
            <option>TCS</option>
            <option>Infosys</option>
            <option>Wipro</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Jobs List */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card 
            key={job.id} 
            className="p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                  🏢
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <Badge className={
                      job.status === 'active' ? 'bg-green-100 text-green-700' :
                      job.status === 'closed' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>₹{job.package} LPA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-700">{job.applicants}</p>
                    <p className="text-xs text-gray-600">Applicants</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">{job.shortlisted}</p>
                    <p className="text-xs text-gray-600">Shortlisted</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Posted {job.posted}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
