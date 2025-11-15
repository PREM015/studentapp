// Application Constants for SmartCurriculum

export const APP_NAME = 'SmartCurriculum';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'Comprehensive Education Management Platform';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Authentication
export const TOKEN_KEY = 'smartcurriculum_token';
export const USER_KEY = 'smartcurriculum_user';
export const REFRESH_TOKEN_KEY = 'smartcurriculum_refresh_token';
export const SESSION_TIMEOUT = 3600000; // 1 hour in milliseconds

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  TPC: 'tpc',
  CLUB: 'club',
  UNIVERSITY: 'university',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  
  // Student Routes
  STUDENT_LOGIN: '/student/login',
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_ATTENDANCE: '/student/attendance',
  STUDENT_COURSEWORK: '/student/coursework',
  STUDENT_CALENDAR: '/student/calendar',
  STUDENT_PROFILE: '/student/profile',
  STUDENT_VAULT: '/student/vault',
  STUDENT_NOTIFICATIONS: '/student/notifications',
  
  // Teacher Routes
  TEACHER_LOGIN: '/teacher/login',
  TEACHER_DASHBOARD: '/teacher/dashboard',
  TEACHER_ATTENDANCE: '/teacher/attendance',
  TEACHER_COURSEWORK: '/teacher/coursework',
  TEACHER_GRADING: '/teacher/grading',
  TEACHER_STUDENTS: '/teacher/students',
  TEACHER_CALENDAR: '/teacher/calendar',
  TEACHER_PROFILE: '/teacher/profile',
  TEACHER_NOTIFICATIONS: '/teacher/notifications',
  
  // TPC Routes
  TPC_LOGIN: '/tpc/login',
  TPC_DASHBOARD: '/tpc/dashboard',
  TPC_ANALYTICS: '/tpc/analytics',
  TPC_COMPANIES: '/tpc/companies',
  TPC_JOBS: '/tpc/jobs',
  TPC_REPORTS: '/tpc/reports',
  
  // Club Routes
  CLUB_LOGIN: '/club/login',
  CLUB_DASHBOARD: '/club/dashboard',
  CLUB_MEMBERS: '/club/members',
  CLUB_EVENTS: '/club/events',
  CLUB_ACTIVITIES: '/club/activities',
  CLUB_CHAT: '/club/chat',
  
  // University Routes
  UNIVERSITY_LOGIN: '/university/login',
  UNIVERSITY_DASHBOARD: '/university/dashboard',
  UNIVERSITY_ANALYTICS: '/university/analytics',
  UNIVERSITY_COMPLIANCE: '/university/compliance',
  UNIVERSITY_DEPARTMENTS: '/university/departments',
  UNIVERSITY_REPORTS: '/university/reports',
  UNIVERSITY_USERS: '/university/users',
  
  // Common Routes
  FORGOT_PASSWORD: '/forgot-password',
  SETTINGS: '/settings',
  HELP: '/help',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  SEARCH: '/search',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
} as const;

// Attendance
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
} as const;

export const ATTENDANCE_METHODS = {
  QR_CODE: 'QR Code',
  CODE_ENTRY: 'Code Entry',
  MANUAL: 'Manual',
} as const;

export const ATTENDANCE_THRESHOLDS = {
  EXCELLENT: 85,
  GOOD: 75,
  AVERAGE: 65,
  LOW: 0,
} as const;

// Grading
export const GRADE_SCALE = {
  'A+': { min: 90, max: 100 },
  'A': { min: 85, max: 89 },
  'A-': { min: 80, max: 84 },
  'B+': { min: 75, max: 79 },
  'B': { min: 70, max: 74 },
  'B-': { min: 65, max: 69 },
  'C+': { min: 60, max: 64 },
  'C': { min: 55, max: 59 },
  'C-': { min: 50, max: 54 },
  'D': { min: 45, max: 49 },
  'F': { min: 0, max: 44 },
} as const;

// Assignment Status
export const ASSIGNMENT_STATUS = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  SUBMITTED: 'Submitted',
  GRADED: 'Graded',
  OVERDUE: 'Overdue',
} as const;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = {
  DOCUMENTS: ['.pdf', '.doc', '.docx', '.txt', '.ppt', '.pptx'],
  IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  VIDEOS: ['.mp4', '.avi', '.mov', '.wmv'],
  ARCHIVES: ['.zip', '.rar', '.7z'],
} as const;

export const VAULT_STORAGE_LIMIT = 100 * 1024 * 1024; // 100MB

// Notification Types
export const NOTIFICATION_TYPES = {
  ASSIGNMENT: 'assignment',
  ATTENDANCE: 'attendance',
  GRADE: 'grade',
  EVENT: 'event',
  ANNOUNCEMENT: 'announcement',
  ALERT: 'alert',
  MESSAGE: 'message',
} as const;

export const NOTIFICATION_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// Gamification
export const POINTS_SYSTEM = {
  ATTENDANCE_FULL_WEEK: 50,
  ASSIGNMENT_ON_TIME: 30,
  QUIZ_COMPLETION: 20,
  EXAM_90_PLUS: 100,
  PARTICIPATION: 10,
  STREAK_BONUS: 25,
} as const;

export const BADGES = {
  ATTENDANCE_CHAMP: {
    name: 'Attendance Champ',
    description: '100% attendance for a month',
    icon: '🏆',
  },
  ASSIGNMENT_PRO: {
    name: 'Assignment Pro',
    description: 'Submitted all assignments on time',
    icon: '📝',
  },
  TOP_PERFORMER: {
    name: 'Top Performer',
    description: 'Ranked in top 10 of the class',
    icon: '⭐',
  },
  EARLY_BIRD: {
    name: 'Early Bird',
    description: 'Attended all early morning classes',
    icon: '🌅',
  },
  TEAM_PLAYER: {
    name: 'Team Player',
    description: 'Participated in 5+ group projects',
    icon: '🤝',
  },
  CONSISTENT: {
    name: 'Consistent',
    description: 'Maintained 30-day streak',
    icon: '🔥',
  },
} as const;

export const RANKS = {
  BEGINNER: { name: 'Beginner', minPoints: 0, color: 'gray' },
  BRONZE: { name: 'Bronze', minPoints: 500, color: 'orange' },
  SILVER: { name: 'Silver', minPoints: 1000, color: 'gray' },
  GOLD: { name: 'Gold', minPoints: 2000, color: 'yellow' },
  PLATINUM: { name: 'Platinum', minPoints: 3000, color: 'blue' },
} as const;

// Theme
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

// Languages
export const LANGUAGES = {
  EN: { code: 'en', name: 'English' },
  ES: { code: 'es', name: 'Español' },
  FR: { code: 'fr', name: 'Français' },
  DE: { code: 'de', name: 'Deutsch' },
  ZH: { code: 'zh', name: '中文' },
} as const;

// Timezones
export const TIMEZONES = {
  ET: { value: 'America/New_York', label: 'Eastern Time (ET)' },
  CT: { value: 'America/Chicago', label: 'Central Time (CT)' },
  MT: { value: 'America/Denver', label: 'Mountain Time (MT)' },
  PT: { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  GMT: { value: 'Europe/London', label: 'London (GMT)' },
  IST: { value: 'Asia/Kolkata', label: 'India (IST)' },
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  TIME: 'HH:mm A',
  DATETIME: 'MMMM DD, YYYY HH:mm A',
} as const;

// Pagination
export const ITEMS_PER_PAGE = 10;
export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#8B5CF6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#06B6D4',
} as const;

// Days of Week
export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

// Months
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

// Semesters
export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

// Departments
export const DEPARTMENTS = {
  CSE: 'Computer Science',
  ME: 'Mechanical Engineering',
  EE: 'Electrical Engineering',
  CE: 'Civil Engineering',
  ECE: 'Electronics & Communication',
  IT: 'Information Technology',
} as const;

// Event Types
export const EVENT_TYPES = {
  CONFERENCE: 'Conference',
  WORKSHOP: 'Workshop',
  COMPETITION: 'Competition',
  SEMINAR: 'Seminar',
  SOCIAL: 'Social',
  CULTURAL: 'Cultural',
  SPORTS: 'Sports',
} as const;

// Job Types
export const JOB_TYPES = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  INTERNSHIP: 'Internship',
  CONTRACT: 'Contract',
} as const;

// Club Categories
export const CLUB_CATEGORIES = {
  TECHNICAL: 'Technical',
  CULTURAL: 'Cultural',
  SPORTS: 'Sports',
  SOCIAL: 'Social',
  ACADEMIC: 'Academic',
} as const;

// Status
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  SAVE_SUCCESS: 'Changes saved successfully.',
  DELETE_SUCCESS: 'Deleted successfully.',
  UPDATE_SUCCESS: 'Updated successfully.',
  UPLOAD_SUCCESS: 'File uploaded successfully.',
} as const;

// Social Media
export const SOCIAL_MEDIA = {
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  FACEBOOK: 'facebook',
  YOUTUBE: 'youtube',
} as const;

// Contact
export const CONTACT_INFO = {
  EMAIL: 'support@smartcurriculum.edu',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Education Street, Tech Park, CA 94025, United States',
  SUPPORT_HOURS: 'Mon-Fri: 9:00 AM - 6:00 PM',
} as const;

// Export default
export default {
  APP_NAME,
  APP_VERSION,
  API_BASE_URL,
  USER_ROLES,
  ROUTES,
  ATTENDANCE_STATUS,
  GRADE_SCALE,
  NOTIFICATION_TYPES,
  POINTS_SYSTEM,
  BADGES,
  THEMES,
  LANGUAGES,
};
