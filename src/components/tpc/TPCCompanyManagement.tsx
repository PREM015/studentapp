import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Building2, Search, Filter, Plus, Star, Phone, Mail, Globe,
  MapPin, Calendar, Users, Briefcase, TrendingUp, FileText,
  Edit, Trash2, Eye
} from 'lucide-react';

export default function TPCCompanyManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddCompany, setShowAddCompany] = useState(false);

  const companies = [
    { name: 'TCS', industry: 'IT Services', tier: 5, partnership: 'Premium', placements: 12, avgPackage: '5.2L', logo: '🏢' },
    { name: 'Infosys', industry: 'IT Services', tier: 5, partnership: 'Premium', placements: 10, avgPackage: '4.8L', logo: '🏢' },
    { name: 'Wipro', industry: 'IT Services', tier: 4, partnership: 'Regular', placements: 8, avgPackage: '4.5L', logo: '🏢' },
    { name: 'Accenture', industry: 'Consulting', tier: 5, partnership: 'Premium', placements: 7, avgPackage: '5.0L', logo: '🏢' },
    { name: 'Cognizant', industry: 'IT Services', tier: 4, partnership: 'Regular', placements: 6, avgPackage: '4.2L', logo: '🏢' },
    { name: 'Amazon', industry: 'E-commerce', tier: 5, partnership: 'Premium', placements: 4, avgPackage: '8.5L', logo: '🏢' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Database</h2>
          <p className="text-gray-500">{companies.length} companies registered</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddCompany(!showAddCompany)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Company
        </Button>
      </div>

      {/* Add Company Form */}
      {showAddCompany && (
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Company</h3>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="partnership">Partnership</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <Input placeholder="e.g., Tech Solutions Inc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Code</label>
                  <Input placeholder="Auto-generated" disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry Sector *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>IT Services</option>
                    <option>Banking & Finance</option>
                    <option>Manufacturing</option>
                    <option>Healthcare</option>
                    <option>E-commerce</option>
                    <option>Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>MNC</option>
                    <option>Startup</option>
                    <option>SME</option>
                    <option>PSU</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
                  <Input type="number" placeholder="2000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>1-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>501-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                  <Input type="url" placeholder="https://example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                  <Input type="url" placeholder="https://linkedin.com/company/..." />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Name *</label>
                  <Input placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                  <Input placeholder="HR Manager" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input type="email" placeholder="contact@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <Input type="tel" placeholder="+91 9876543210" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Office Address *</label>
                <Textarea rows={3} placeholder="Complete office address..." />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Input placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <Input placeholder="Maharashtra" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <Input placeholder="India" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="partnership" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Since</label>
                  <Input type="number" placeholder="2020" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Type *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Premium</option>
                    <option>Regular</option>
                    <option>Trial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="focus:outline-none">
                      <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MOU Document</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload MOU document</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MOU Expiry Date</label>
                  <Input type="date" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">Enable renewal reminder</span>
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setShowAddCompany(false)}>
              Cancel
            </Button>
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add Company
            </Button>
          </div>
        </Card>
      )}

      {/* Filters & Search */}
      <Card className="p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="Search companies..." className="pl-10" />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Industries</option>
            <option>IT Services</option>
            <option>Banking</option>
            <option>Manufacturing</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Partnerships</option>
            <option>Premium</option>
            <option>Regular</option>
            <option>Trial</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Tiers</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Companies Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {companies.map((company, idx) => (
            <Card key={idx} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl mb-3">
                  {company.logo}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{company.name}</h3>
                <Badge className={
                  company.partnership === 'Premium' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }>
                  {company.partnership}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium text-gray-900">{company.industry}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tier:</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: company.tier }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Placements:</span>
                  <span className="font-semibold text-gray-900">{company.placements}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Avg Package:</span>
                  <span className="font-semibold text-gray-900">₹{company.avgPackage}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Briefcase className="w-4 h-4 mr-1" />
                  Post Job
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Companies Table */}
      {viewMode === 'list' && (
        <Card className="p-6 border border-gray-200">
          <div className="border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Industry</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tier</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Partnership</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Placements</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg Package</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {companies.map((company, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                          {company.logo}
                        </div>
                        <span className="font-medium text-gray-900">{company.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{company.industry}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: company.tier }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        company.partnership === 'Premium' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }>
                        {company.partnership}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{company.placements}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">₹{company.avgPackage}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Toggle View Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
        >
          Switch to {viewMode === 'grid' ? 'List' : 'Grid'} View
        </Button>
      </div>
    </div>
  );
}
