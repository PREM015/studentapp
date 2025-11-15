// TypeScript Type Definitions for SmartCurriculum Platform

export type UserRole = 'student' | 'teacher' | 'tpc' | 'club' | 'university';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Student extends User {
  rollNo: string;
  department: string;
  batch: string;
  semester: number;
  section: string;
  cgpa: number;
  attendance: number;
  phone: string;
  dateOfBirth: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  joinDate: string;
  points: number;
  badges: string[];
  rank: number;
}

export interface Teacher extends User {
  employeeId: string;
  department: string;
  designation: string;
  specialization: string[];
  phone: string;
  officeRoom: string;
  officeHours: string;
  joinDate: string;
  courses: string[];
  totalStudents: number;
  rating: number;
  publications?: number;
  experience: string;
  education?: Education[];
  achievements?: Achievement[];
}

export interface Education {
  degree: string;
  university: string;
  year: string;
}

export interface Achievement {
  title: string;
  year: string;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  semester: number;
  department: string;
  instructor: string;
  instructorId: number;
  schedule: Schedule[];
  enrolledStudents: number;
  maxCapacity: number;
  syllabus: string;
  description: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Upcoming';
}

export interface Schedule {
  day: string;
  time: string;
  room: string;
}

export interface Attendance {
  id: number;
  studentId: number;
  courseId: number;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedAt?: string;
  method?: 'QR Code' | 'Code Entry' | 'Manual';
  latitude?: number;
  longitude?: number;
}

export interface Assignment {
  id: number;
  title: string;
  courseId: number;
  courseName: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  submittedPoints?: number | null;
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Graded';
  submittedAt?: string | null;
  grade?: string;
  feedback?: string;
  attachments?: string[];
  rubric?: RubricCriteria[];
}

export interface RubricCriteria {
  criteria: string;
  points: number;
  earnedPoints?: number;
}

export interface Grade {
  studentId: number;
  courseId: number;
  assignments: GradeItem[];
  quizzes: GradeItem[];
  finalExam: GradeItem;
  totalScore: number;
  grade: string;
  letterGrade: string;
}

export interface GradeItem {
  name: string;
  score: number;
  total: number;
}

export interface Event {
  id: number;
  title: string;
  type: 'Conference' | 'Workshop' | 'Competition' | 'Seminar' | 'Social';
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  registeredCount: number;
  maxCapacity: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled' | 'Registration Open';
  tags: string[];
  image?: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employeeCount: string;
  website: string;
  description: string;
  jobOpenings: number;
  averagePackage: string;
  recruitmentDrive: string;
  eligibilityCriteria: string;
  contactPerson?: string;
  contactEmail?: string;
  status: 'Active' | 'Inactive';
}

export interface JobPosting {
  id: number;
  companyId: number;
  companyName: string;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  location: string;
  duration?: string;
  stipend?: string;
  package?: string;
  description: string;
  requirements: string[];
  skills: string[];
  applicationDeadline: string;
  appliedCount: number;
  shortlistedCount: number;
  status: 'Open' | 'Closed' | 'Filled';
  postedDate: string;
}

export interface Club {
  id: number;
  name: string;
  logo: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Social' | 'Academic';
  description: string;
  memberCount: number;
  president: string;
  vicePresident?: string;
  faculty: string;
  email: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  upcomingEvents: number;
  pastEvents: number;
  achievements?: string[];
  status: 'Active' | 'Inactive';
}

export interface Notification {
  id: number;
  type: 'assignment' | 'attendance' | 'grade' | 'event' | 'announcement' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  link?: string;
  icon?: string;
}

export interface VaultFile {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'document' | 'video' | 'other';
  size: number;
  uploadedAt: string;
  category: 'Documents' | 'Certificates' | 'IDs' | 'Photos' | 'Other';
  tags: string[];
  url?: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  type: 'class' | 'exam' | 'deadline' | 'event' | 'holiday';
  date: string;
  startTime: string;
  endTime?: string;
  location?: string;
  instructor?: string;
  description?: string;
  color: string;
}

export interface Analytics {
  studentPerformance: {
    overallAttendance: number;
    overallCGPA: number;
    totalStudents: number;
    activeStudents: number;
    topPerformers: number;
    atRiskStudents: number;
  };
  placementStats: {
    totalPlacements: number;
    averagePackage: string;
    highestPackage: string;
    companiesVisited: number;
    offersReceived: number;
    placementRate: number;
  };
  courseStats: {
    totalCourses: number;
    activeCourses: number;
    completedCourses: number;
    averageClassSize: number;
  };
  attendancetrends: {
    month: string;
    attendance: number;
  }[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  badges: number;
  avatar: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  hod: string;
  faculty: number;
  students: number;
  courses: number;
  labs: number;
  achievements?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  loading: boolean;
}

export interface ThemeState {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

// Form Interfaces
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio?: string;
}

export interface SettingsFormData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
}

// API Response Interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter and Sort Interfaces
export interface FilterOptions {
  search?: string;
  department?: string;
  semester?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}
