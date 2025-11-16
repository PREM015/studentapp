/**
 * SEED SCRIPT for SmartCurriculum Platform
 * 
 * WARNING: This script will first DELETE ALL existing data in the database
 * before populating it with mock data. Do not run this on a production database.
 * 
 * Usage:
 * 1. Ensure you have `ts-node` and `bcryptjs` installed: npm install -D ts-node bcryptjs @types/bcryptjs
 * 2. Update your `package.json` to add: "prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }
 * 3. Run `npx prisma db seed`.
 */

import {
  PrismaClient,
  UserRole,
  UserStatus,
  AttendanceStatus,
  AttendanceMethod,
  AssignmentStatus,
  CourseStatus,
  EventType,
  EventStatus,
  JobType,
  JobStatus,
  ApplicationStatus, // ADDED
  ClubCategory,
  NotificationType,
  NotificationPriority,
  FileType,
  FileCategory,
  CalendarEventType,
} from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Import mock data
import {
  SAMPLE_STUDENTS,
  SAMPLE_TEACHERS,
  SAMPLE_COURSES,
  SAMPLE_ATTENDANCE,
  SAMPLE_ASSIGNMENTS,
  SAMPLE_GRADES,
  SAMPLE_EVENTS,
  SAMPLE_COMPANIES,
  SAMPLE_JOB_POSTINGS,
  SAMPLE_CLUBS,
  SAMPLE_NOTIFICATIONS,
  SAMPLE_VAULT_FILES,
  SAMPLE_CALENDAR_EVENTS,
  SAMPLE_ANALYTICS,
  SAMPLE_LEADERBOARD,
  SAMPLE_DEPARTMENTS,
} from '@/data/mockData';

const prisma = new PrismaClient();

// Helper function to safely convert strings to enums
function toEnum<T extends Record<string, string>>(
  value: string,
  enumObj: T,
  fallback: T[keyof T]
): T[keyof T] {
  const key = value.toUpperCase().replace(/\s+/g, '_').replace(/-/g, '_');
  return (enumObj[key as keyof T] as T[keyof T]) || fallback;
}

async function main() {
  console.log('🌱 Starting database seeding...');
  console.log('⚠️  WARNING: This will delete all existing data!');

  // ----------------------------------------
  // 1. Clean up existing data (in correct order)
  // ----------------------------------------
  console.log('🧹 Cleaning up database...');
  
  try {
    // Delete in order of dependencies (children first)
    await prisma.notification.deleteMany();
    await prisma.vaultFile.deleteMany();
    await prisma.calendarEvent.deleteMany();
    await prisma.analytics.deleteMany();
    await prisma.leaderboardEntry.deleteMany();
    await prisma.studentBadge.deleteMany();
    await prisma.eventRegistration.deleteMany();
    await prisma.jobApplication.deleteMany();
    await prisma.clubMembership.deleteMany();
    await prisma.clubEvent.deleteMany();
    await prisma.rubricCriteria.deleteMany();
    await prisma.studentAssignment.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.grade.deleteMany();
    await prisma.attendanceRecord.deleteMany();
    await prisma.courseEnrollment.deleteMany();
    await prisma.courseSchedule.deleteMany();
    await prisma.course.deleteMany();
    await prisma.education.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.club.deleteMany();
    await prisma.jobPosting.deleteMany();
    await prisma.company.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.student.deleteMany();
    await prisma.user.deleteMany();
    await prisma.department.deleteMany();

    console.log('✅ Database cleaned.');
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    throw error;
  }

  // ----------------------------------------
  // 2. Hash a dummy password
  // ----------------------------------------
  const hashedPassword = await bcrypt.hash('password123', 10);

  // ----------------------------------------
  // 3. Seed independent models
  // ----------------------------------------
  console.log('📚 Seeding Departments...');
  await prisma.department.createMany({
    data: SAMPLE_DEPARTMENTS.map(d => ({
      name: d.name,
      code: d.code,
      hod: d.hod,
      facultyCount: d.faculty,
      studentCount: d.students,
      courseCount: d.courses,
      labCount: d.labs,
      achievements: d.achievements || [],
    })),
  });
  console.log(`✅ Created ${SAMPLE_DEPARTMENTS.length} departments`);

  console.log('🏢 Seeding Companies...');
  const companies = await Promise.all(
    SAMPLE_COMPANIES.map(company =>
      prisma.company.create({
        data: {
          name: company.name,
          logo: company.logo,
          industry: company.industry,
          location: company.location,
          employeeCount: company.employeeCount,
          website: company.website,
          description: company.description,
          averagePackage: company.averagePackage,
          recruitmentDrive: company.recruitmentDrive,
          eligibilityCriteria: company.eligibilityCriteria,
          contactPerson: company.contactPerson,
          contactEmail: company.contactEmail,
          status: toEnum(company.status, UserStatus, UserStatus.ACTIVE),
        },
      }),
    ),
  );
  console.log(`✅ Created ${companies.length} companies`);

  // ----------------------------------------
  // 4. Seed Users and their profiles
  // ----------------------------------------
  console.log('👨‍🏫 Seeding Teachers...');
  const teacherUsers = await Promise.all(
    SAMPLE_TEACHERS.map(teacherData =>
      prisma.user.create({
        data: {
          name: teacherData.name,
          email: teacherData.email,
          password: hashedPassword,
          role: UserRole.TEACHER,
          profileImage: teacherData.profileImage,
          status: UserStatus.ACTIVE,
          teacher: {
            create: {
              employeeId: teacherData.employeeId,
              department: teacherData.department,
              designation: teacherData.designation,
              specialization: teacherData.specialization,
              phone: teacherData.phone,
              officeRoom: teacherData.officeRoom,
              officeHours: teacherData.officeHours,
              joinDate: new Date(teacherData.joinDate),
              totalStudents: teacherData.totalStudents,
              rating: teacherData.rating,
              publications: teacherData.publications,
              experience: teacherData.experience,
              education: {
                create: teacherData.education?.map(edu => ({
                  degree: edu.degree,
                  university: edu.university,
                  year: edu.year,
                })) || [],
              },
              achievements: {
                create: teacherData.achievements?.map(ach => ({
                  title: ach.title,
                  year: ach.year,
                })) || [],
              },
            },
          },
        },
        include: { teacher: true },
      }),
    ),
  );
  const teachers = teacherUsers.map(u => u.teacher!);
  console.log(`✅ Created ${teachers.length} teachers`);

  console.log('👨‍🎓 Seeding Students...');
  const studentUsers = await Promise.all(
    SAMPLE_STUDENTS.map(studentData =>
      prisma.user.create({
        data: {
          name: studentData.name,
          email: studentData.email,
          password: hashedPassword,
          role: UserRole.STUDENT,
          profileImage: studentData.profileImage,
          status: toEnum(studentData.status, UserStatus, UserStatus.ACTIVE),
          student: {
            create: {
              rollNo: studentData.rollNo,
              department: studentData.department,
              batch: studentData.batch,
              semester: studentData.semester,
              section: studentData.section,
              cgpa: studentData.cgpa,
              attendance: studentData.attendance,
              phone: studentData.phone,
              dateOfBirth: new Date(studentData.dateOfBirth),
              address: studentData.address,
              guardianName: studentData.guardianName,
              guardianPhone: studentData.guardianPhone,
              joinDate: new Date(studentData.joinDate),
              points: studentData.points,
              rank: studentData.rank,
              badges: {
                create: studentData.badges.map(badgeName => ({
                  badge: badgeName,
                })),
              },
            },
          },
        },
        include: { student: true },
      }),
    ),
  );
  const students = studentUsers.map(u => u.student!);
  console.log(`✅ Created ${students.length} students`);

  // ----------------------------------------
  // 5. Seed Courses and Assignments
  // ----------------------------------------
  console.log('📖 Seeding Courses...');
  const courses = await Promise.all(
    SAMPLE_COURSES.map(courseData => {
      const instructorIndex = courseData.instructorId - 1;
      if (!teachers[instructorIndex]) {
        throw new Error(`Teacher with index ${instructorIndex} not found for course ${courseData.code}`);
      }
      
      return prisma.course.create({
        data: {
          code: courseData.code,
          name: courseData.name,
          credits: courseData.credits,
          semester: courseData.semester,
          department: courseData.department,
          instructorId: teachers[instructorIndex].id,
          maxCapacity: courseData.maxCapacity,
          syllabus: courseData.syllabus,
          description: courseData.description,
          progress: courseData.progress,
          status: toEnum(courseData.status, CourseStatus, CourseStatus.ACTIVE),
          schedules: {
            create: courseData.schedule.map(s => ({
              day: s.day,
              time: s.time,
              room: s.room,
            })),
          },
        },
      });
    }),
  );
  console.log(`✅ Created ${courses.length} courses`);

  console.log('📝 Seeding Assignments...');
  const assignments = await Promise.all(
    SAMPLE_ASSIGNMENTS.map(assignData => {
      const courseIndex = assignData.courseId - 1;
      if (!courses[courseIndex]) {
        throw new Error(`Course with index ${courseIndex} not found for assignment ${assignData.title}`);
      }

      return prisma.assignment.create({
        data: {
          title: assignData.title,
          courseId: courses[courseIndex].id,
          description: assignData.description,
          dueDate: new Date(assignData.dueDate),
          totalPoints: assignData.totalPoints,
          attachments: assignData.attachments || [],
          rubrics: {
            create: assignData.rubric?.map(r => ({
              criteria: r.criteria,
              points: r.points,
            })) || [],
          },
        },
      });
    }),
  );
  console.log(`✅ Created ${assignments.length} assignments`);

  // ----------------------------------------
  // 6. Seed Relational Data
  // ----------------------------------------
  console.log('🔗 Seeding Course Enrollments...');
  await prisma.courseEnrollment.createMany({
    data: [
      { studentId: students[0].id, courseId: courses[0].id },
      { studentId: students[0].id, courseId: courses[1].id },
    ],
  });

  console.log('✅ Seeding Attendance Records...');
  const validAttendanceRecords = SAMPLE_ATTENDANCE.map(att => {
    const studentIndex = att.studentId - 1;
    const courseIndex = att.courseId - 1;
    
    if (!students[studentIndex] || !courses[courseIndex]) {
      console.warn(`⚠️  Skipping attendance: student ${att.studentId} or course ${att.courseId} not found`);
      return null;
    }
    
    return {
      studentId: students[studentIndex].id,
      courseId: courses[courseIndex].id,
      date: new Date(att.date),
      status: toEnum(att.status, AttendanceStatus, AttendanceStatus.PRESENT),
      markedAt: att.markedAt ? new Date(att.markedAt) : new Date(), // FIXED
      method: att.method ? toEnum(att.method, AttendanceMethod, AttendanceMethod.QR_CODE) : null,
      latitude: att.latitude,
      longitude: att.longitude,
    };
  }).filter(Boolean);

  if (validAttendanceRecords.length > 0) {
    await prisma.attendanceRecord.createMany({
      data: validAttendanceRecords as any[],
    });
  }

  console.log('📤 Seeding Student Assignments...');
  if (assignments.length >= 2 && SAMPLE_ASSIGNMENTS[1].submittedAt) {
    await prisma.studentAssignment.create({
      data: {
        studentId: students[0].id,
        assignmentId: assignments[1].id,
        status: AssignmentStatus.GRADED,
        submittedAt: new Date(SAMPLE_ASSIGNMENTS[1].submittedAt),
        submittedPoints: SAMPLE_ASSIGNMENTS[1].submittedPoints,
        grade: SAMPLE_ASSIGNMENTS[1].grade,
        feedback: SAMPLE_ASSIGNMENTS[1].feedback,
        attachments: SAMPLE_ASSIGNMENTS[1].attachments || [],
      },
    });

    await prisma.studentAssignment.create({
      data: {
        studentId: students[0].id,
        assignmentId: assignments[0].id,
        status: AssignmentStatus.IN_PROGRESS,
        attachments: [],
      },
    });
  }

  console.log('📊 Seeding Grades...');
  const validGrades = SAMPLE_GRADES.filter(g => {
    const studentIndex = g.studentId - 1;
    const courseIndex = g.courseId - 1;
    return students[studentIndex] && courses[courseIndex];
  }).map(g => {
    const studentIndex = g.studentId - 1;
    const courseIndex = g.courseId - 1;
    
    return {
      studentId: students[studentIndex].id,
      courseId: courses[courseIndex].id,
      assignments: g.assignments,
      quizzes: g.quizzes,
      finalExam: g.finalExam,
      totalScore: g.totalScore,
      grade: g.grade,
      letterGrade: g.letterGrade,
    };
  });

  if (validGrades.length > 0) {
    await prisma.grade.createMany({
      data: validGrades,
    });
  }

  // ----------------------------------------
  // 7. Seed Events, Jobs, and Clubs
  // ----------------------------------------
  console.log('🎉 Seeding Events...');
  const events = await Promise.all(
    SAMPLE_EVENTS.map(eventData =>
      prisma.event.create({
        data: {
          title: eventData.title,
          type: toEnum(eventData.type, EventType, EventType.SEMINAR),
          date: new Date(eventData.date),
          time: eventData.time,
          location: eventData.location,
          organizer: eventData.organizer,
          description: eventData.description,
          maxCapacity: eventData.maxCapacity,
          status: toEnum(eventData.status, EventStatus, EventStatus.UPCOMING),
          tags: eventData.tags || [],
          image: eventData.image || null, // FIXED
        },
      }),
    ),
  );
  console.log(`✅ Created ${events.length} events`);

  console.log('💼 Seeding Job Postings...');
  await prisma.jobPosting.createMany({
    data: SAMPLE_JOB_POSTINGS.map(job => {
      const companyIndex = job.companyId - 1;
      
      return {
        companyId: companies[companyIndex].id,
        title: job.title,
        type: job.type === 'Full-time' ? JobType.FULL_TIME : JobType.INTERNSHIP,
        location: job.location,
        duration: job.duration,
        stipend: job.stipend,
        package: job.package,
        description: job.description,
        requirements: job.requirements,
        skills: job.skills,
        applicationDeadline: new Date(job.applicationDeadline),
        status: toEnum(job.status, JobStatus, JobStatus.OPEN),
        postedDate: new Date(job.postedDate),
      };
    }),
  });
  console.log(`✅ Created ${SAMPLE_JOB_POSTINGS.length} job postings`);

  console.log('🎭 Seeding Clubs...');
  await prisma.club.createMany({
    data: SAMPLE_CLUBS.map(club => ({
      name: club.name,
      logo: club.logo,
      category: toEnum(club.category, ClubCategory, ClubCategory.TECHNICAL),
      description: club.description,
      president: club.president,
      vicePresident: club.vicePresident,
      facultyId: teachers[0].id,
      email: club.email,
      instagram: club.socialMedia?.instagram,
      twitter: club.socialMedia?.twitter,
      linkedin: club.socialMedia?.linkedin,
      achievements: club.achievements || [],
      status: toEnum(club.status, UserStatus, UserStatus.ACTIVE),
    })),
  });
  console.log(`✅ Created ${SAMPLE_CLUBS.length} clubs`);

  // ----------------------------------------
  // 8. Seed User-Specific Data
  // ----------------------------------------
  console.log('🔔 Seeding Notifications...');
  await prisma.notification.createMany({
    data: SAMPLE_NOTIFICATIONS.map(n => ({
      userId: studentUsers[0].id,
      type: toEnum(n.type, NotificationType, NotificationType.ANNOUNCEMENT),
      title: n.title,
      message: n.message,
      timestamp: new Date(n.timestamp),
      read: n.read,
      priority: toEnum(n.priority, NotificationPriority, NotificationPriority.MEDIUM),
      link: n.link,
      icon: n.icon,
    })),
  });

  console.log('📁 Seeding Vault Files...');
  await prisma.vaultFile.createMany({
    data: SAMPLE_VAULT_FILES.map(file => ({
      userId: studentUsers[0].id,
      name: file.name,
      type: toEnum(file.type, FileType, FileType.DOCUMENT),
      size: file.size,
      category: toEnum(file.category, FileCategory, FileCategory.DOCUMENTS),
      tags: file.tags,
      uploadedAt: new Date(file.uploadedAt),
      url: 'https://example.com/placeholder.pdf',
    })),
  });

  console.log('📅 Seeding Calendar Events...');
  if (SAMPLE_CALENDAR_EVENTS.length > 0 && courses[0]) {
    await prisma.calendarEvent.create({
      data: {
        title: SAMPLE_CALENDAR_EVENTS[0].title,
        type: CalendarEventType.CLASS,
        date: new Date(SAMPLE_CALENDAR_EVENTS[0].date),
        startTime: SAMPLE_CALENDAR_EVENTS[0].startTime,
        endTime: SAMPLE_CALENDAR_EVENTS[0].endTime,
        location: SAMPLE_CALENDAR_EVENTS[0].location,
        instructor: SAMPLE_CALENDAR_EVENTS[0].instructor,
        color: SAMPLE_CALENDAR_EVENTS[0].color,
        courseId: courses[0].id,
      },
    });
  }
  
  if (SAMPLE_CALENDAR_EVENTS.length > 1) {
    await prisma.calendarEvent.create({
      data: {
        title: SAMPLE_CALENDAR_EVENTS[1].title,
        type: CalendarEventType.DEADLINE,
        date: new Date(SAMPLE_CALENDAR_EVENTS[1].date),
        startTime: SAMPLE_CALENDAR_EVENTS[1].startTime,
        endTime: SAMPLE_CALENDAR_EVENTS[1].endTime,
        location: SAMPLE_CALENDAR_EVENTS[1].location,
        instructor: SAMPLE_CALENDAR_EVENTS[1].instructor,
        color: SAMPLE_CALENDAR_EVENTS[1].color,
      },
    });
  }
  
  if (SAMPLE_CALENDAR_EVENTS.length > 2 && events.length > 0) {
    await prisma.calendarEvent.create({
      data: {
        title: SAMPLE_CALENDAR_EVENTS[2].title,
        type: CalendarEventType.EVENT,
        date: new Date(SAMPLE_CALENDAR_EVENTS[2].date),
        startTime: SAMPLE_CALENDAR_EVENTS[2].startTime,
        endTime: SAMPLE_CALENDAR_EVENTS[2].endTime,
        location: SAMPLE_CALENDAR_EVENTS[2].location,
        instructor: SAMPLE_CALENDAR_EVENTS[2].instructor,
        color: SAMPLE_CALENDAR_EVENTS[2].color,
        eventId: events[0].id,
      },
    });
  }

  // ----------------------------------------
  // 9. Seed Analytics and Leaderboard
  // ----------------------------------------
  console.log('📈 Seeding Analytics...');
  await prisma.analytics.create({
    data: {
      totalStudents: SAMPLE_ANALYTICS.studentPerformance.totalStudents,
      activeStudents: SAMPLE_ANALYTICS.studentPerformance.activeStudents,
      topPerformers: SAMPLE_ANALYTICS.studentPerformance.topPerformers,
      atRiskStudents: SAMPLE_ANALYTICS.studentPerformance.atRiskStudents,
      overallAttendance: SAMPLE_ANALYTICS.studentPerformance.overallAttendance,
      overallCGPA: SAMPLE_ANALYTICS.studentPerformance.overallCGPA,
      totalPlacements: SAMPLE_ANALYTICS.placementStats.totalPlacements,
      averagePackage: SAMPLE_ANALYTICS.placementStats.averagePackage,
      highestPackage: SAMPLE_ANALYTICS.placementStats.highestPackage,
      companiesVisited: SAMPLE_ANALYTICS.placementStats.companiesVisited,
      offersReceived: SAMPLE_ANALYTICS.placementStats.offersReceived, // FIXED
      placementRate: SAMPLE_ANALYTICS.placementStats.placementRate,
      totalCourses: SAMPLE_ANALYTICS.courseStats.totalCourses,
      activeCourses: SAMPLE_ANALYTICS.courseStats.activeCourses,
      completedCourses: SAMPLE_ANALYTICS.courseStats.completedCourses,
      averageClassSize: SAMPLE_ANALYTICS.courseStats.averageClassSize,
      monthlyAttendanceData: "Low", // FIXED
    },
  });

  console.log('🏆 Seeding Leaderboard...');
  for (let i = 0; i < Math.min(students.length, SAMPLE_LEADERBOARD.length); i++) {
    await prisma.leaderboardEntry.create({
      data: {
        studentId: students[i].id,
        rank: SAMPLE_LEADERBOARD[i].rank,
        name: SAMPLE_LEADERBOARD[i].name,
        points: SAMPLE_LEADERBOARD[i].points,
        badges: SAMPLE_STUDENTS[i].badges.length,
        avatar: SAMPLE_STUDENTS[i].profileImage,
      },
    });
  }

  console.log('\n✨ Seeding completed successfully! ✨\n');
  console.log('📊 Summary:');
  console.log(`   • ${teachers.length} teachers`);
  console.log(`   • ${students.length} students`);
  console.log(`   • ${courses.length} courses`);
  console.log(`   • ${assignments.length} assignments`);
  console.log(`   • ${events.length} events`);
  console.log(`   • ${companies.length} companies`);
  console.log(`   • ${SAMPLE_CLUBS.length} clubs`);
  console.log('\n🔑 Default password for all users: password123\n');
}

main()
  .catch(e => {
    console.error('\n❌ An error occurred during seeding:\n');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });