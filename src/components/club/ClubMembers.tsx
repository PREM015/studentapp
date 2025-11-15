"use client"
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, UserPlus, Search, Filter, Mail, Phone, Calendar,
  Award, TrendingUp, Star, Crown, Shield, Edit, X
} from 'lucide-react';

export default function ClubMembers() {
  const members = [
    { name: 'Alice Johnson', role: 'President', joinDate: '2023-01-15', events: 12, contributions: 45, level: 'Platinum', status: 'active' },
    { name: 'Bob Smith', role: 'Vice President', joinDate: '2023-01-15', events: 10, contributions: 38, level: 'Gold', status: 'active' },
    { name: 'Carol Williams', role: 'Technical Head', joinDate: '2023-02-01', events: 11, contributions: 42, level: 'Gold', status: 'active' },
    { name: 'David Brown', role: 'Event Manager', joinDate: '2023-02-15', events: 9, contributions: 35, level: 'Silver', status: 'active' },
    { name: 'Eve Davis', role: 'Member', joinDate: '2023-03-01', events: 8, contributions: 28, level: 'Silver', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Club Members</h2>
          <p className="text-gray-500">45 active members</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Total Members', value: '45', icon: Users, color: 'blue' },
          { label: 'Active', value: '42', icon: TrendingUp, color: 'green' },
          { label: 'Core Team', value: '8', icon: Crown, color: 'purple' },
          { label: 'Platinum', value: '5', icon: Award, color: 'amber' },
          { label: 'New This Month', value: '3', icon: UserPlus, color: 'pink' },
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

      {/* Member Levels */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Membership Levels</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { level: 'Platinum', count: 5, minEvents: 10, color: 'purple', icon: '💎' },
            { level: 'Gold', count: 12, minEvents: 7, color: 'amber', icon: '🏆' },
            { level: 'Silver', count: 18, minEvents: 4, color: 'gray', icon: '🥈' },
            { level: 'Bronze', count: 10, minEvents: 0, color: 'orange', icon: '🥉' },
          ].map((tier, idx) => (
            <div key={idx} className={`p-4 rounded-lg border-2 border-${tier.color}-200 bg-${tier.color}-50`}>
              <div className="text-3xl mb-2">{tier.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{tier.level}</h4>
              <p className="text-2xl font-bold text-gray-900 mb-2">{tier.count}</p>
              <p className="text-xs text-gray-600">Min {tier.minEvents} events</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="Search members..." className="pl-10" />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Roles</option>
            <option>Core Team</option>
            <option>Members</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Levels</option>
            <option>Platinum</option>
            <option>Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, idx) => {
          const levels = ['Platinum', 'Gold', 'Silver', 'Bronze'];
          const level = levels[idx % 4];
          const roles = ['President', 'Vice President', 'Core Team', 'Member'];
          const role = roles[idx % 4];
          
          return (
            <Card key={idx} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=100&h=100&fit=crop`}
                    alt="Member"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Member {idx + 1}</h4>
                    <Badge className={
                      role === 'President' ? 'bg-purple-100 text-purple-700' :
                      role === 'Vice President' ? 'bg-blue-100 text-blue-700' :
                      role === 'Core Team' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }>
                      {role}
                    </Badge>
                  </div>
                </div>
                {role === 'President' && <Crown className="w-5 h-5 text-amber-500" />}
                {role === 'Vice President' && <Shield className="w-5 h-5 text-blue-500" />}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Membership Level</span>
                  <Badge className={
                    level === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                    level === 'Gold' ? 'bg-amber-100 text-amber-700' :
                    level === 'Silver' ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }>
                    {level}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Events Attended</span>
                  <span className="font-semibold text-gray-900">{8 + idx}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Contribution Score</span>
                  <span className="font-semibold text-gray-900">{30 + idx * 5}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Activity Level</span>
                    <span className="font-semibold text-gray-900">{75 + idx}%</span>
                  </div>
                  <Progress value={75 + idx} className="h-2" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Joined Feb 2023</span>
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Top Contributors */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Top Contributors This Month</h3>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=50&h=50&fit=crop`}
                  alt="Member"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">Member {idx + 1}</p>
                  <p className="text-sm text-gray-500">Core Team</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-gray-900">{50 - idx * 5} points</span>
                </div>
                <p className="text-xs text-gray-500">{5 - idx} contributions</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
