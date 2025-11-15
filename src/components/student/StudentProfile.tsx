import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Trophy, Flame, Award, TrendingUp, Calendar, BookOpen, Star, Lock, Edit } from 'lucide-react';

export default function StudentProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient */}
  <div className="h-48  via-yellow-400 to-blue-600 relative">



        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Edit className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-20 pb-24">
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Rahul Kumar</h2>
          <p className="text-gray-500">CSE2022001 • Batch 2022-26</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge className="bg-purple-100 text-purple-700">Top Performer</Badge>
            <Badge className="bg-blue-100 text-blue-700">Tech Enthusiast</Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="achievements">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard">Rank</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-0">
            {/* Pentagonal Skill Radar */}
            <Card className="p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Skill Assessment</h4>
              
              {/* Pentagon Shape */}
              <div className="relative w-full aspect-square max-w-sm mx-auto mb-6">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Background pentagon grid */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, idx) => (
                    <polygon
                      key={idx}
                      points="100,20 180,75 155,160 45,160 20,75"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                      transform={`scale(${scale}) translate(${100 - 100*scale}, ${100 - 100*scale})`}
                    />
                  ))}
                  
                  {/* Grid lines from center */}
                  {[
                    "100,20", "180,75", "155,160", "45,160", "20,75"
                  ].map((point, idx) => (
                    <line
                      key={idx}
                      x1="100"
                      y1="100"
                      x2={point.split(',')[0]}
                      y2={point.split(',')[1]}
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Filled area (actual scores) */}
                  <polygon
                    points="100,32 164,82 143,148 57,148 36,82"
                    fill="url(#blueGradient)"
                    fillOpacity="0.3"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  
                  {/* Labels */}
                  <text x="100" y="15" textAnchor="middle" className="text-xs fill-gray-700 font-medium">Academic</text>
                  <text x="190" y="80" textAnchor="start" className="text-xs fill-gray-700 font-medium">Attendance</text>
                  <text x="170" y="175" textAnchor="middle" className="text-xs fill-gray-700 font-medium">Participation</text>
                  <text x="30" y="175" textAnchor="middle" className="text-xs fill-gray-700 font-medium">Skills</text>
                  <text x="10" y="80" textAnchor="end" className="text-xs fill-gray-700 font-medium">Leadership</text>
                </svg>
              </div>

              {/* Score List */}
              <div className="space-y-2">
                {[
                  { label: 'Academic (CGPA)', value: 85, max: 100 },
                  { label: 'Attendance', value: 85, max: 100 },
                  { label: 'Participation', value: 70, max: 100 },
                  { label: 'Skills', value: 75, max: 100 },
                  { label: 'Leadership', value: 60, max: 100 },
                ].map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{skill.label}</span>
                    <span className="font-semibold text-gray-900">{skill.value}/{skill.max}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Streak Section */}
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h4 className="font-semibold text-gray-900">Attendance Streak</h4>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-500">15</p>
                  <p className="text-xs text-gray-500">days</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Longest: 30 days</span>
                <span>This year: 180 days</span>
              </div>

              {/* Contribution Calendar */}
              <div className="space-y-1">
                {[...Array(5)].map((_, weekIdx) => (
                  <div key={weekIdx} className="flex gap-1">
                    {[...Array(7)].map((_, dayIdx) => {
                      const status = Math.random() > 0.3 ? 'present' : Math.random() > 0.5 ? 'late' : 'absent';
                      return (
                        <div
                          key={dayIdx}
                          className={`flex-1 aspect-square rounded ${
                            status === 'present' ? 'bg-green-500' :
                            status === 'late' ? 'bg-amber-400' :
                            'bg-gray-200'
                          }`}
                          title={`Day ${weekIdx * 7 + dayIdx + 1}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Total Points</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">450</p>
              </Card>

              <Card className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-gray-600">Badges</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </Card>

              <Card className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Events</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </Card>

              <Card className="p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Rank</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">#12</p>
              </Card>
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-4 mt-0">
            <Card className="p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Subject-wise Performance</h4>
              <div className="space-y-4">
                {[
                  { subject: 'Data Structures', attendance: 90, grade: 'A', marks: 92 },
                  { subject: 'Web Development', attendance: 85, grade: 'A', marks: 88 },
                  { subject: 'Database Systems', attendance: 82, grade: 'B+', marks: 82 },
                  { subject: 'Operating Systems', attendance: 78, grade: 'B+', marks: 78 },
                ].map((sub, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{sub.subject}</span>
                      <Badge className={`${
                        sub.grade.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {sub.grade}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-24">Attendance:</span>
                      <Progress value={sub.attendance} className="flex-1 h-2" />
                      <span className="text-xs font-medium text-gray-700 w-12 text-right">{sub.attendance}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-24">Performance:</span>
                      <Progress value={sub.marks} className="flex-1 h-2" />
                      <span className="text-xs font-medium text-gray-700 w-12 text-right">{sub.marks}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4 mt-0">
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Perfect Week', icon: '🌟', unlocked: true, rarity: 'Epic', date: 'Today' },
                { name: 'Early Bird', icon: '🌅', unlocked: true, rarity: 'Rare', date: '2 days ago' },
                { name: 'Top Scorer', icon: '🏆', unlocked: true, rarity: 'Legendary', date: '1 week ago' },
                { name: 'Helpful', icon: '🤝', unlocked: true, rarity: 'Common', date: '2 weeks ago' },
                { name: 'Team Player', icon: '👥', unlocked: true, rarity: 'Rare', date: '3 weeks ago' },
                { name: 'Innovator', icon: '💡', unlocked: true, rarity: 'Epic', date: '1 month ago' },
                { name: 'Mentor', icon: '👨‍🏫', unlocked: false, rarity: 'Legendary', progress: 60 },
                { name: 'Marathon', icon: '🏃', unlocked: false, rarity: 'Epic', progress: 75 },
                { name: 'Scholar', icon: '📚', unlocked: false, rarity: 'Rare', progress: 40 },
              ].map((badge, idx) => (
                <Card 
                  key={idx} 
                  className={`p-3 border text-center relative ${
                    badge.unlocked ? 'border-gray-200' : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  {!badge.unlocked && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className={`text-4xl mb-2 ${!badge.unlocked && 'grayscale opacity-40'}`}>
                    {badge.icon}
                  </div>
                  <p className="text-xs font-medium text-gray-900">{badge.name}</p>
                  <Badge className={`text-xs mt-1 ${
                    badge.rarity === 'Legendary' ? 'bg-yellow-100 text-yellow-700' :
                    badge.rarity === 'Epic' ? 'bg-purple-100 text-purple-700' :
                    badge.rarity === 'Rare' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {badge.rarity}
                  </Badge>
                  {badge.unlocked && badge.date && (
                    <p className="text-xs text-gray-500 mt-1">{badge.date}</p>
                  )}
                  {!badge.unlocked && badge.progress && (
                    <div className="mt-2">
                      <Progress value={badge.progress} className="h-1" />
                      <p className="text-xs text-gray-500 mt-1">{badge.progress}%</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4 mt-0">
            <div className="flex gap-2 mb-4">
              <Button size="sm" variant="default" className="bg-purple-600 hover:bg-purple-700">Batch</Button>
              <Button size="sm" variant="outline">Department</Button>
              <Button size="sm" variant="outline">Global</Button>
            </div>

            {/* Top 3 */}
            <div className="flex items-end justify-center gap-2 mb-6">
              {[
                { rank: 2, name: 'Priya S', points: 520, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
                { rank: 1, name: 'Amit K', points: 580, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
                { rank: 3, name: 'Sneha M', points: 490, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
              ].sort((a, b) => a.rank - b.rank).map((user, idx) => (
                <div key={idx} className={`text-center ${user.rank === 1 ? 'scale-110' : ''}`}>
                  <div className="relative mb-2">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className={`rounded-full object-cover mx-auto ${
                        user.rank === 1 ? 'w-20 h-20 border-4 border-yellow-400' :
                        user.rank === 2 ? 'w-16 h-16 border-4 border-gray-400' :
                        'w-16 h-16 border-4 border-amber-600'
                      }`}
                    />
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                      user.rank === 1 ? 'bg-yellow-400' :
                      user.rank === 2 ? 'bg-gray-400' :
                      'bg-amber-600'
                    }`}>
                      {user.rank}
                    </div>
                  </div>
                  <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.points} pts</p>
                </div>
              ))}
            </div>

            {/* Rest of leaderboard */}
            <Card className="border border-gray-200 divide-y divide-gray-200">
              {[
                { rank: 4, name: 'Vikram R', points: 475, trend: 'up' },
                { rank: 5, name: 'Anjali P', points: 460, trend: 'same' },
                { rank: 12, name: 'You (Rahul K)', points: 450, trend: 'up', isUser: true },
                { rank: 13, name: 'Ravi S', points: 445, trend: 'down' },
                { rank: 14, name: 'Meera T', points: 440, trend: 'up' },
              ].map((user, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3 ${user.isUser ? 'bg-purple-50/30' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      user.isUser ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${user.isUser ? 'text-purple-900' : 'text-gray-900'}`}>
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{user.points}</span>
                    {user.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                    {user.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />}
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
