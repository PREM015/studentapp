import {
  Award,
  Calendar,
  Edit,
  Flame,
  Lock,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, isSameDay, subDays } from 'date-fns';
import { AttendanceRecord, AttendanceStatus, LeaderboardEntry, Student } from '@prisma/client';
import prisma from '@/lib/prisma';


// --- Data Fetching ---

// CHANGED: Define a new type that includes the optional 'isUser' property.
type LeaderboardEntryWithUser = LeaderboardEntry & { isUser?: boolean };

type ProfileData = {
  student: Student & {
    user: { name: string; profileImage: string | null };
    eventRegistrations: { id: number }[];
    clubMemberships: { position: string | null }[];
    badges: { id: number, badge: string, awardedAt: Date }[];
  };
  grades: (({
    course: { name: string };
  } & { totalScore: number; letterGrade: string })[]);
  leaderboard: LeaderboardEntryWithUser[]; // CHANGED: Use the new type here.
  attendanceRecords: Pick<AttendanceRecord, 'date' | 'status'>[];
};

async function getProfileData(studentId: number): Promise<ProfileData | null> {
  const [student, grades, leaderboardEntries, attendanceRecords] = await prisma.$transaction([
    prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: { select: { name: true, profileImage: true } },
        eventRegistrations: { select: { id: true } },
        clubMemberships: { select: { position: true } },
        badges: { orderBy: { awardedAt: 'desc' } },
      },
    }),
    prisma.grade.findMany({
      where: { studentId },
      include: { course: { select: { name: true } } },
    }),
    prisma.leaderboardEntry.findMany({
      orderBy: { rank: 'asc' },
      take: 10,
    }),
    prisma.attendanceRecord.findMany({
      where: {
        studentId,
        date: { gte: subDays(new Date(), 35) }, // last 5 weeks
      },
      select: { date: true, status: true },
    }),
  ]);

  if (!student) return null;

  const userRankEntry = await prisma.leaderboardEntry.findUnique({ where: { studentId } });

  // CHANGED: Explicitly type the new array to allow adding the 'isUser' property.
  const finalLeaderboard: LeaderboardEntryWithUser[] = [...leaderboardEntries];

  // Add the current user to the list if they are not in the top 10
  if (userRankEntry && !finalLeaderboard.some(e => e.studentId === studentId)) {
      finalLeaderboard.push(userRankEntry);
  }

  finalLeaderboard.sort((a, b) => a.rank - b.rank);

  // Now this operation is type-safe because 'finalLeaderboard' is an array of 'LeaderboardEntryWithUser'
  finalLeaderboard.forEach(entry => {
    if(entry.studentId === studentId) {
      entry.isUser = true;
    }
  });


  return { student, grades, leaderboard: finalLeaderboard, attendanceRecords };
}

// --- Helper Functions & Components (No changes below this line in logic) ---

const getInitials = (name: string) => {
  const names = name.split(' ');
  return names.length > 1
    ? `${names[0][0]}${names[names.length - 1][0]}`
    : name.substring(0, 2);
};

// Skill Radar Chart Component
function SkillRadarChart({ student, eventCount }: { student: ProfileData['student'], eventCount: number }) {
  const scores = {
    academic: (student.cgpa / 10) * 100, // Assuming CGPA is out of 10
    attendance: student.attendance,
    participation: Math.min(eventCount / 10, 1) * 100, // 100% at 10 events
    skills: Math.min(student.points / 1000, 1) * 100, // 100% at 1000 points
    leadership: student.clubMemberships.some(m => ["president", "vicepresident"].includes(m.position?.toLowerCase() ?? '')) ? 80 : 40,
  };

  const points = [
    { x: 100, y: 20 },  // Academic
    { x: 180, y: 75 },  // Attendance
    { x: 155, y: 160 }, // Participation
    { x: 45, y: 160 },  // Skills
    { x: 20, y: 75 },   // Leadership
  ];

  const scoreToPoint = (score: number, point: { x: number; y: number }) => {
    const ratio = score / 100;
    return {
      x: 100 + (point.x - 100) * ratio,
      y: 100 + (point.y - 100) * ratio,
    };
  };

  const scorePoints = [
    scoreToPoint(scores.academic, points[0]),
    scoreToPoint(scores.attendance, points[1]),
    scoreToPoint(scores.participation, points[2]),
    scoreToPoint(scores.skills, points[3]),
    scoreToPoint(scores.leadership, points[4]),
  ];

  const polygonPoints = scorePoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <Card className="p-5 md:p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <h4 className="font-semibold text-gray-900 mb-4 text-center md:text-left">Skill Assessment</h4>
      <div className="relative w-full aspect-square max-w-xs mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {[0.2, 0.4, 0.6, 0.8, 1.0].map(s => (
            <polygon key={s} points="100,20 180,75 155,160 45,160 20,75" fill="none" stroke="#E5E7EB" strokeWidth="1" transform-origin="center" transform={`scale(${s})`} />
          ))}
          {points.map((p, i) => <line key={i} x1="100" y1="100" x2={p.x} y2={p.y} stroke="#E5E7EB" strokeWidth="1" /> )}
          <polygon points={polygonPoints} fill="url(#blueGradient)" fillOpacity="0.4" stroke="#3B82F6" strokeWidth="2" />
          <text x="100" y="15" textAnchor="middle" className="text-xs fill-gray-700 font-medium">Academic</text>
          <text x="190" y="80" textAnchor="start" className="text-xs fill-gray-700 font-medium">Attendance</text>
          <text x="170" y="175" textAnchor="middle" className="text-xs fill-gray-700 font-medium">Participation</text>
          <text x="30" y="175" textAnchor="middle" className="text-xs fill-gray-700 font-medium">Skills</text>
          <text x="10" y="80" textAnchor="end" className="text-xs fill-gray-700 font-medium">Leadership</text>
        </svg>
      </div>
    </Card>
  );
}

// Attendance Calendar Component
function AttendanceCalendar({ records }: { records: ProfileData['attendanceRecords'] }) {
    const days = Array.from({ length: 35 }, (_, i) => subDays(new Date(), i)).reverse();
    
    const getColor = (status: AttendanceStatus) => {
        switch (status) {
            case 'PRESENT': return 'bg-green-500';
            case 'LATE': return 'bg-amber-400';
            case 'ABSENT': return 'bg-red-400';
            default: return 'bg-gray-200';
        }
    };
    
    const streak = records.reduce((acc, record, index, arr) => {
        if(index === 0) return record.status === 'PRESENT' ? 1 : 0;
        const today = record.date;
        const yesterday = arr[index-1].date;
        if(record.status === 'PRESENT' && isSameDay(today, subDays(yesterday, -1))) {
            return acc + 1;
        }
        return acc;
    }, 0);

  return (
    <Card className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h4 className="font-semibold text-gray-900">Attendance Streak</h4>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-orange-500">{streak}</p>
          <p className="text-xs text-gray-500">days</p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const record = records.find(r => isSameDay(r.date, day));
          return (
            <div
              key={i}
              className={`w-full aspect-square rounded ${record ? getColor(record.status) : 'bg-gray-200'}`}
              title={`${format(day, 'MMM d, yyyy')}: ${record?.status ?? 'No Data'}`}
            />
          );
        })}
      </div>
    </Card>
  );
}


// --- Main Page Component ---

export default async function StudentProfilePage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const studentId = parseInt(id, 10);
  if (isNaN(studentId)) notFound();

  const data = await getProfileData(studentId);
  if (!data) notFound();

  const { student, grades, leaderboard, attendanceRecords } = data;
  const top3 = leaderboard.filter(e => e.rank <= 3).sort((a,b) => a.rank - b.rank);
  const userRank = student.rank ?? "N/A";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="h-40 md:h-52 bg-gradient-to-br from-purple-600 via-blue-500 to-teal-500 relative">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" asChild>
            <Link href={`/student/${student.id}/edit`}>
              <Edit className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-20 pb-24">
        <div className="text-center mb-6">
          <Avatar className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-4 rounded-full border-4 border-white shadow-2xl">
            <AvatarImage src={student.user.profileImage ?? undefined} alt={student.user.name} />
            <AvatarFallback className="text-4xl">{getInitials(student.user.name)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-gray-900">{student.user.name}</h1>
          <p className="text-gray-500">{student.rollNo} • Batch {student.batch}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            {student.rank && student.rank <= 10 && <Badge variant="secondary" className="bg-purple-100 text-purple-700">Top 10</Badge>}
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">Dept. {student.department}</Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full max-w-3xl mx-auto">
          <TabsList className="w-full grid grid-cols-4 mb-4 bg-white shadow-sm rounded-xl p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="achievements">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard">Rank</TabsTrigger>
          </TabsList>
          
          {/* --- OVERVIEW TAB --- */}
          <TabsContent value="overview" className="space-y-4 mt-0">
            <SkillRadarChart student={student} eventCount={student.eventRegistrations.length}/>
            <AttendanceCalendar records={attendanceRecords} />
            <div className="grid grid-cols-2 gap-4">
              <Card className="rounded-xl shadow-sm hover:shadow-md transition">
                <CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Points</CardTitle><Trophy className="h-4 w-4 text-muted-foreground"/></CardHeader>
                <CardContent><div className="text-2xl font-bold">{student.points}</div></CardContent>
              </Card>
              <Card className="rounded-xl shadow-sm hover:shadow-md transition">
                <CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Badges</CardTitle><Award className="h-4 w-4 text-muted-foreground"/></CardHeader>
                <CardContent><div className="text-2xl font-bold">{student.badges.length}</div></CardContent>
              </Card>
              <Card className="rounded-xl shadow-sm hover:shadow-md transition">
                <CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Events</CardTitle><Calendar className="h-4 w-4 text-muted-foreground"/></CardHeader>
                <CardContent><div className="text-2xl font-bold">{student.eventRegistrations.length}</div></CardContent>
              </Card>
              <Card className="rounded-xl shadow-sm hover:shadow-md transition">
                <CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Rank</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground"/></CardHeader>
                <CardContent><div className="text-2xl font-bold">{typeof userRank === 'number' ? `#${userRank}` : userRank}</div></CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- STATS TAB --- */}
          <TabsContent value="stats" className="space-y-4 mt-0">
            <Card className="p-5 md:p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold text-gray-900 mb-4">Subject-wise Performance</h4>
              <div className="space-y-4">
                {grades.length > 0 ? grades.map((grade) => (
                  <div key={grade.course.name}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{grade.course.name}</span>
                      <Badge className={grade.letterGrade.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>{grade.letterGrade}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500 w-24">Performance:</span>
                      <Progress value={grade.totalScore} className="flex-1 h-2" />
                      <span className="text-xs font-medium text-gray-700 w-12 text-right">{grade.totalScore}%</span>
                    </div>
                  </div>
                )) : <p className='text-center text-sm text-gray-500'>No grades recorded yet.</p>}
              </div>
            </Card>
          </TabsContent>

          {/* --- ACHIEVEMENTS TAB --- */}
          <TabsContent value="achievements" className="space-y-4 mt-0">
            <div className="grid grid-cols-3 gap-3">
              {student.badges.map((badge) => (
                <Card key={badge.id} className="p-3 border text-center rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-xs font-medium text-gray-900">{badge.badge}</p>
                </Card>
              ))}
              {/* Example of a locked badge */}
              <Card className="p-3 border text-center border-dashed border-gray-300 bg-gray-50 relative rounded-xl shadow-sm hover:shadow-md transition">
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <div className="text-4xl mb-2 grayscale opacity-40">💡</div>
                <p className="text-xs font-medium text-gray-900">Innovator</p>
              </Card>
            </div>
          </TabsContent>

          {/* --- LEADERBOARD TAB --- */}
          <TabsContent value="leaderboard" className="space-y-4 mt-0">
            <div className="flex items-end justify-center gap-4 mb-6">
                {top3.map((user) => (
                    <div key={user.rank} className={`text-center transition-transform ${user.rank === 1 ? 'scale-110' : 'scale-95'}`}>
                        <div className="relative mb-2">
                            <Avatar className={`mx-auto rounded-full object-cover ${user.rank === 1 ? 'w-20 h-20 border-4 border-yellow-400' : 'w-16 h-16 border-4 border-gray-400'}`}>
                                <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'}`}>{user.rank}</div>
                        </div>
                        <p className="font-semibold text-sm text-gray-900 truncate max-w-[80px]">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.points} pts</p>
                    </div>
                ))}
            </div>
            <Card className="border border-gray-200 divide-y divide-gray-200 rounded-xl shadow-sm">
                {leaderboard.map((user) => (
                    <div key={user.rank} className={`flex items-center justify-between p-3 ${user.isUser ? 'bg-purple-100/40' : ''}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm ${user.isUser ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}>{user.rank}</div>
                            <Avatar className="w-9 h-9">
                                <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <p className={`font-medium text-sm ${user.isUser ? 'text-purple-900' : 'text-gray-900'}`}>{user.isUser ? `You (${user.name})` : user.name}</p>
                        </div>
                        <span className="font-semibold text-gray-900">{user.points}</span>
                    </div>
                ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
