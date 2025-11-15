import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';
import { 
  Award, TrendingUp, TrendingDown, Minus, Download, Upload,
  ChevronLeft, ChevronRight, Save, Send, Eye, Calculator
} from 'lucide-react';

export default function TeacherGrading() {
  const [selectedStudent, setSelectedStudent] = useState(0);
  const students = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `Student Name ${i + 1}`,
    roll: `CSE2022${(i + 1).toString().padStart(3, '0')}`,
    submitted: i < 45,
    graded: i < 30,
    marks: i < 30 ? 75 + Math.random() * 25 : null,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Grade Book - Data Structures (CSE-301)</h2>
            <p className="text-gray-500">CSE-2022-A • Semester 5 • 2023-24</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Grades
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export (Excel)
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4 mr-2" />
              Publish Grades
            </Button>
          </div>
        </div>
      </Card>

      {/* Grade Statistics */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Average', value: '82.5%', icon: Calculator, color: 'blue' },
          { label: 'Highest', value: '98%', icon: TrendingUp, color: 'green' },
          { label: 'Lowest', value: '45%', icon: TrendingDown, color: 'red' },
          { label: 'Median', value: '84%', icon: Minus, color: 'purple' },
          { label: 'Pass Rate', value: '92%', icon: Award, color: 'amber' },
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

      {/* Grade Table */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Student Grades</h3>
          <div className="flex items-center gap-2">
            <Input placeholder="Search student..." className="w-64" />
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Students</option>
              <option>Graded</option>
              <option>Pending</option>
              <option>At Risk</option>
            </select>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="sticky left-0 bg-gray-50 text-left py-3 px-4 text-sm font-semibold text-gray-700 border-r border-gray-200">
                  Student
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  <div>Assignment 1</div>
                  <div className="text-xs font-normal text-gray-500">Max: 100</div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  <div>Assignment 2</div>
                  <div className="text-xs font-normal text-gray-500">Max: 100</div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  <div>Mid Term</div>
                  <div className="text-xs font-normal text-gray-500">Max: 50</div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  <div>Assignment 3</div>
                  <div className="text-xs font-normal text-gray-500">Max: 100</div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 bg-blue-50">
                  <div>Total</div>
                  <div className="text-xs font-normal text-gray-500">350</div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 bg-blue-50">
                  Percentage
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 bg-blue-50">
                  Grade
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.slice(0, 15).map((student, idx) => {
                const scores = [92, 88, 42, student.graded ? Math.round(75 + Math.random() * 25) : null];
                const total = scores.reduce((sum: number, score) => sum + (score || 0), 0);
                const percentage = Math.round((total / 350) * 100);
                const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : 'C';
                
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="sticky left-0 bg-white py-3 px-4 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.roll}</p>
                        </div>
                      </div>
                    </td>
                    {scores.map((score, scoreIdx) => (
                      <td key={scoreIdx} className="py-3 px-4">
                        {score !== null ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={score}
                              className="w-20 h-8 text-center"
                              max={scoreIdx === 2 ? 50 : 100}
                            />
                            <span className={`text-sm ${
                              (scoreIdx === 2 ? score / 50 : score / 100) >= 0.8 ? 'text-green-600' :
                              (scoreIdx === 2 ? score / 50 : score / 100) >= 0.6 ? 'text-blue-600' :
                              'text-red-600'
                            }`}>
                              {Math.round((scoreIdx === 2 ? score / 50 : score / 100) * 100)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                    ))}
                    <td className="py-3 px-4 bg-blue-50">
                      <span className="font-semibold text-gray-900">{total}</span>
                    </td>
                    <td className="py-3 px-4 bg-blue-50">
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="w-16 h-2" />
                        <span className="font-semibold text-gray-900 w-12">{percentage}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 bg-blue-50">
                      <Badge className={
                        grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                        grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }>
                        {grade}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td className="sticky left-0 bg-gray-50 py-3 px-4 font-semibold text-gray-900 border-r border-gray-200">
                  Class Average
                </td>
                <td className="py-3 px-4 font-semibold text-gray-900">88</td>
                <td className="py-3 px-4 font-semibold text-gray-900">85</td>
                <td className="py-3 px-4 font-semibold text-gray-900">40</td>
                <td className="py-3 px-4 font-semibold text-gray-900">82</td>
                <td className="py-3 px-4 bg-blue-100 font-semibold text-gray-900">295</td>
                <td className="py-3 px-4 bg-blue-100 font-semibold text-gray-900">84%</td>
                <td className="py-3 px-4 bg-blue-100"></td>
                <td className="py-3 px-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Grading Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            {[
              { grade: 'A+ (90-100%)', count: 8, percentage: 13 },
              { grade: 'A (80-89%)', count: 18, percentage: 30 },
              { grade: 'B+ (70-79%)', count: 22, percentage: 37 },
              { grade: 'B (60-69%)', count: 10, percentage: 17 },
              { grade: 'C (50-59%)', count: 2, percentage: 3 },
              { grade: 'F (<50%)', count: 0, percentage: 0 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.grade}</span>
                  <span className="font-semibold text-gray-900">{item.count} students</span>
                </div>
                <div className="relative">
                  <Progress value={item.percentage} className="h-3" />
                  <span className="absolute right-2 top-0 text-xs text-gray-600">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Assessment Breakdown</h3>
          <div className="space-y-4">
            {[
              { name: 'Assignments', weightage: 40, avgScore: 85 },
              { name: 'Mid Term', weightage: 20, avgScore: 80 },
              { name: 'Final Exam', weightage: 30, avgScore: 0, pending: true },
              { name: 'Project', weightage: 10, avgScore: 0, pending: true },
            ].map((assessment, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{assessment.name}</h4>
                    <p className="text-sm text-gray-500">Weightage: {assessment.weightage}%</p>
                  </div>
                  {!assessment.pending ? (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{assessment.avgScore}%</p>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                  )}
                </div>
                {!assessment.pending && (
                  <Progress value={assessment.avgScore} className="h-2" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Calculator className="w-6 h-6" />
            <span className="text-sm">Apply Curve</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Award className="w-6 h-6" />
            <span className="text-sm">Grading Rules</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Save className="w-6 h-6" />
            <span className="text-sm">Save Template</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Download className="w-6 h-6" />
            <span className="text-sm">Generate Report</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
