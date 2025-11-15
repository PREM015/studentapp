import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.leaderboardEntry.deleteMany();
  await prisma.analyticsSnapshot.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.submissionAttachment.deleteMany();
  await prisma.assignmentAttachment.deleteMany();
  await prisma.vaultFile.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.clubEvent.deleteMany();
  await prisma.clubAchievement.deleteMany();
  await prisma.clubMember.deleteMany();
  await prisma.clubSocialLink.deleteMany();
  await prisma.club.deleteMany();
  await prisma.jobSkill.deleteMany();
  await prisma.jobRequirement.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.company.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.eventTag.deleteMany();
  await prisma.event.deleteMany();
  await prisma.gradeItem.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.rubricCriteria.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.course.deleteMany();
  await prisma.departmentAchievement.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.specialization.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.education.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.student.deleteMany();
  await prisma.department.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.user.deleteMany();

  // Create Departments
  console.log('📚 Creating departments...');
  const csDept = await prisma.department.create({
    data: {
      name: 'Computer Science and Engineering',
      code: 'CSE',
      hod: 'Dr. Rajesh Kumar',
      faculty: 45,
      studentsCount: 480,
      coursesCount: 32,
      labs: 8,
      achievements: {
        create: [
          { description: 'Best Department Award 2024' },
          { description: 'Research Excellence Award' },
          { description: '100% Placement Record' }
        ]
      }
    }
  });

  const eceDept = await prisma.department.create({
    data: {
      name: 'Electronics and Communication Engineering',
      code: 'ECE',
      hod: 'Dr. Priya Sharma',
      faculty: 38,
      studentsCount: 420,
      coursesCount: 28,
      labs: 6,
      achievements: {
        create: [
          { description: 'Innovation Award 2024' },
          { description: 'Industry Collaboration Excellence' }
        ]
      }
    }
  });

  const mechDept = await prisma.department.create({
    data: {
      name: 'Mechanical Engineering',
      code: 'MECH',
      hod: 'Dr. Amit Verma',
      faculty: 42,
      studentsCount: 450,
      coursesCount: 30,
      labs: 7,
      achievements: {
        create: [
          { description: 'Best Lab Facilities 2024' }
        ]
      }
    }
  });

  // Create Users and Teachers
  console.log('👨‍🏫 Creating teachers...');
  const teacher1User = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'teacher',
      status: 'active',
      profileImage: 'https://i.pravatar.cc/150?img=1',
      teacher: {
        create: {
          employeeId: 'EMP001',
          departmentId: csDept.id,
          designation: 'Professor',
          phone: '+91-9876543210',
          officeRoom: 'CS-201',
          officeHours: 'Mon-Fri 2:00 PM - 4:00 PM',
          joinDate: new Date('2015-08-15'),
          totalStudents: 120,
          rating: 4.7,
          publications: 45,
          experience: '12 years',
          specializations: {
            create: [
              { name: 'Machine Learning' },
              { name: 'Data Science' },
              { name: 'Artificial Intelligence' }
            ]
          },
          educations: {
            create: [
              { degree: 'Ph.D. in Computer Science', university: 'MIT', year: '2012' },
              { degree: 'M.Tech in AI', university: 'Stanford', year: '2008' }
            ]
          },
          achievements: {
            create: [
              { title: 'Best Teacher Award', year: '2023' },
              { title: 'Research Excellence Award', year: '2022' }
            ]
          }
        }
      },
      userSettings: {
        create: {
          emailNotifications: true,
          pushNotifications: true,
          theme: 'light',
          language: 'en',
          timezone: 'Asia/Kolkata'
        }
      }
    },
    include: { teacher: true }
  });

  const teacher2User = await prisma.user.create({
    data: {
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      role: 'teacher',
      status: 'active',
      profileImage: 'https://i.pravatar.cc/150?img=2',
      teacher: {
        create: {
          employeeId: 'EMP002',
          departmentId: csDept.id,
          designation: 'Associate Professor',
          phone: '+91-9876543211',
          officeRoom: 'CS-202',
          officeHours: 'Tue-Thu 3:00 PM - 5:00 PM',
          joinDate: new Date('2018-01-10'),
          totalStudents: 90,
          rating: 4.5,
          publications: 28,
          experience: '8 years',
          specializations: {
            create: [
              { name: 'Database Systems' },
              { name: 'Cloud Computing' }
            ]
          },
          educations: {
            create: [
              { degree: 'Ph.D. in Database Systems', university: 'Berkeley', year: '2016' }
            ]
          },
          achievements: {
            create: [
              { title: 'Innovation in Teaching', year: '2023' }
            ]
          }
        }
      }
    },
    include: { teacher: true }
  });

  // Create Students
  console.log('👨‍🎓 Creating students...');
  const studentUsers = [];
  const studentProfiles = [
    { name: 'Rahul Sharma', rollNo: 'CS21001', cgpa: 9.2, attendance: 92, points: 850, semester: 6 },
    { name: 'Priya Patel', rollNo: 'CS21002', cgpa: 8.8, attendance: 95, points: 780, semester: 6 },
    { name: 'Amit Kumar', rollNo: 'CS21003', cgpa: 8.5, attendance: 88, points: 720, semester: 6 },
    { name: 'Sneha Reddy', rollNo: 'CS21004', cgpa: 9.0, attendance: 90, points: 800, semester: 6 },
    { name: 'Vikram Singh', rollNo: 'CS21005', cgpa: 8.3, attendance: 85, points: 680, semester: 6 },
    { name: 'Anjali Desai', rollNo: 'CS21006', cgpa: 8.9, attendance: 93, points: 760, semester: 6 },
    { name: 'Rohan Gupta', rollNo: 'CS21007', cgpa: 8.7, attendance: 89, points: 740, semester: 6 },
    { name: 'Kavya Iyer', rollNo: 'CS21008', cgpa: 9.1, attendance: 94, points: 820, semester: 6 },
  ];

  for (let i = 0; i < studentProfiles.length; i++) {
    const profile = studentProfiles[i];
    const user = await prisma.user.create({
      data: {
        name: profile.name,
        email: `${profile.rollNo.toLowerCase()}@student.edu`,
        role: 'student',
        status: 'active',
        profileImage: `https://i.pravatar.cc/150?img=${i + 10}`,
        student: {
          create: {
            rollNo: profile.rollNo,
            departmentId: csDept.id,
            batch: '2021',
            semester: profile.semester,
            section: 'A',
            cgpa: profile.cgpa,
            attendance: profile.attendance,
            phone: `+91-98765432${10 + i}`,
            dateOfBirth: new Date('2003-05-15'),
            address: `${i + 1}, Student Hostel, University Campus`,
            guardianName: `Guardian of ${profile.name}`,
            guardianPhone: `+91-98765433${10 + i}`,
            joinDate: new Date('2021-08-01'),
            points: profile.points,
            rank: i + 1,
            badges: {
              create: [
                { name: 'Early Bird', issuedAt: new Date('2023-09-01') },
                { name: 'Perfect Attendance', issuedAt: new Date('2023-10-15') }
              ]
            }
          }
        },
        userSettings: {
          create: {
            emailNotifications: true,
            pushNotifications: true,
            theme: 'dark',
            language: 'en',
            timezone: 'Asia/Kolkata'
          }
        }
      },
      include: { student: true }
    });
    studentUsers.push(user);
  }

  // Create Courses
  console.log('📖 Creating courses...');
  const course1 = await prisma.course.create({
    data: {
      code: 'CS601',
      name: 'Machine Learning',
      credits: 4,
      semester: 6,
      departmentId: csDept.id,
      instructorId: teacher1User.teacher!.id,
      enrolledCount: 8,
      maxCapacity: 60,
      syllabus: 'Introduction to ML, Supervised Learning, Unsupervised Learning, Neural Networks',
      description: 'Comprehensive course covering fundamental and advanced machine learning concepts',
      progress: 65,
      status: 'Active',
      schedules: {
        create: [
          { day: 'Monday', time: '9:00 AM - 10:30 AM', room: 'CS-Lab1' },
          { day: 'Wednesday', time: '9:00 AM - 10:30 AM', room: 'CS-Lab1' },
          { day: 'Friday', time: '11:00 AM - 12:30 PM', room: 'CS-101' }
        ]
      }
    }
  });

  const course2 = await prisma.course.create({
    data: {
      code: 'CS602',
      name: 'Database Management Systems',
      credits: 4,
      semester: 6,
      departmentId: csDept.id,
      instructorId: teacher2User.teacher!.id,
      enrolledCount: 8,
      maxCapacity: 60,
      syllabus: 'RDBMS, SQL, NoSQL, Transactions, Query Optimization',
      description: 'In-depth study of database systems and management',
      progress: 55,
      status: 'Active',
      schedules: {
        create: [
          { day: 'Tuesday', time: '10:00 AM - 11:30 AM', room: 'CS-102' },
          { day: 'Thursday', time: '10:00 AM - 11:30 AM', room: 'CS-102' }
        ]
      }
    }
  });

  // Enroll Students in Courses
  console.log('📝 Enrolling students in courses...');
  for (const studentUser of studentUsers) {
    await prisma.enrollment.create({
      data: {
        studentId: studentUser.student!.id,
        courseId: course1.id,
        status: 'enrolled',
        progress: Math.random() * 40 + 50
      }
    });

    await prisma.enrollment.create({
      data: {
        studentId: studentUser.student!.id,
        courseId: course2.id,
        status: 'enrolled',
        progress: Math.random() * 40 + 45
      }
    });
  }

  // Create Attendance Records
  console.log('✅ Creating attendance records...');
  const attendanceStatuses: Array<'present' | 'absent' | 'late'> = ['present', 'present', 'present', 'present', 'absent', 'late'];
  for (let day = 0; day < 10; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    for (const studentUser of studentUsers) {
      await prisma.attendance.create({
        data: {
          studentId: studentUser.student!.id,
          courseId: course1.id,
          date: date,
          status: attendanceStatuses[Math.floor(Math.random() * attendanceStatuses.length)],
          markedAt: date,
          method: 'QRCode'
        }
      });
    }
  }

  // Create Assignments
  console.log('📋 Creating assignments...');
  const assignment1 = await prisma.assignment.create({
    data: {
      title: 'Linear Regression Implementation',
      courseId: course1.id,
      description: 'Implement linear regression from scratch using Python',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalPoints: 100,
      status: 'InProgress',
      rubric: {
        create: [
          { criteria: 'Code Quality', points: 30 },
          { criteria: 'Documentation', points: 20 },
          { criteria: 'Accuracy', points: 30 },
          { criteria: 'Report', points: 20 }
        ]
      }
    }
  });

  const assignment2 = await prisma.assignment.create({
    data: {
      title: 'SQL Query Optimization',
      courseId: course2.id,
      description: 'Optimize given SQL queries and write a report',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      totalPoints: 100,
      status: 'InProgress',
      rubric: {
        create: [
          { criteria: 'Query Optimization', points: 40 },
          { criteria: 'Explanation', points: 30 },
          { criteria: 'Performance Analysis', points: 30 }
        ]
      }
    }
  });

  // Create Submissions
  console.log('📤 Creating submissions...');
  for (const studentUser of studentUsers.slice(0, 5)) {
    await prisma.submission.create({
      data: {
        assignmentId: assignment1.id,
        studentId: studentUser.student!.id,
        submittedAt: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000),
        grade: 75 + Math.random() * 20,
        feedback: 'Good work! Consider improving documentation.',
        status: 'Graded',
        earnedPoints: Math.floor(75 + Math.random() * 20)
      }
    });
  }

  // Create Grades
  console.log('🎯 Creating grades...');
  for (const studentUser of studentUsers) {
    const grade1 = await prisma.grade.create({
      data: {
        studentId: studentUser.student!.id,
        courseId: course1.id,
        totalScore: 85 + Math.random() * 10,
        grade: 'A',
        letterGrade: 'A',
        items: {
          create: [
            { name: 'Mid-term', score: 38, total: 40 },
            { name: 'Assignments', score: 27, total: 30 },
            { name: 'Final', score: 47, total: 50 }
          ]
        }
      }
    });

    const grade2 = await prisma.grade.create({
      data: {
        studentId: studentUser.student!.id,
        courseId: course2.id,
        totalScore: 80 + Math.random() * 10,
        grade: 'A',
        letterGrade: 'A-',
        items: {
          create: [
            { name: 'Mid-term', score: 36, total: 40 },
            { name: 'Projects', score: 26, total: 30 },
            { name: 'Final', score: 45, total: 50 }
          ]
        }
      }
    });
  }

  // Create Events
  console.log('🎉 Creating events...');
  const event1 = await prisma.event.create({
    data: {
      title: 'Tech Fest 2024',
      type: 'Conference',
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      time: '10:00 AM',
      location: 'Main Auditorium',
      organizer: 'Tech Club',
      description: 'Annual technical festival featuring competitions, workshops, and guest lectures',
      registeredCount: 150,
      maxCapacity: 500,
      status: 'RegistrationOpen',
      image: 'https://picsum.photos/800/400?random=1',
      tags: {
        create: [
          { tag: 'Technology' },
          { tag: 'Innovation' },
          { tag: 'Competition' }
        ]
      }
    }
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Machine Learning Workshop',
      type: 'Workshop',
      date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      time: '2:00 PM',
      location: 'CS Lab 1',
      organizer: 'AI Club',
      description: 'Hands-on workshop on building ML models',
      registeredCount: 45,
      maxCapacity: 50,
      status: 'RegistrationOpen',
      image: 'https://picsum.photos/800/400?random=2',
      tags: {
        create: [
          { tag: 'AI' },
          { tag: 'Machine Learning' },
          { tag: 'Workshop' }
        ]
      }
    }
  });

  // Register students for events
  console.log('🎫 Registering students for events...');
  for (const studentUser of studentUsers.slice(0, 4)) {
    await prisma.eventRegistration.create({
      data: {
        eventId: event1.id,
        studentId: studentUser.student!.id
      }
    });
  }

  // Create Companies
  console.log('🏢 Creating companies...');
  const company1 = await prisma.company.create({
    data: {
      name: 'Tech Giants Inc.',
      logo: 'https://logo.clearbit.com/google.com',
      industry: 'Information Technology',
      location: 'Bangalore, India',
      employeeCount: '10000+',
      website: 'https://techgiants.com',
      description: 'Leading technology company specializing in AI and Cloud solutions',
      jobOpenings: 5,
      averagePackage: '15 LPA',
      recruitmentDrive: 'January 2025',
      eligibilityCriteria: 'CGPA > 7.5, No active backlogs',
      contactPerson: 'HR Manager',
      contactEmail: 'recruitment@techgiants.com',
      status: 'Active'
    }
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'StartupXYZ',
      logo: 'https://logo.clearbit.com/microsoft.com',
      industry: 'Software Development',
      location: 'Hyderabad, India',
      employeeCount: '500-1000',
      website: 'https://startupxyz.com',
      description: 'Innovative startup focusing on fintech solutions',
      jobOpenings: 3,
      averagePackage: '12 LPA',
      recruitmentDrive: 'February 2025',
      eligibilityCriteria: 'CGPA > 7.0',
      contactPerson: 'Talent Acquisition Lead',
      contactEmail: 'careers@startupxyz.com',
      status: 'Active'
    }
  });

  // Create Job Postings
  console.log('💼 Creating job postings...');
  await prisma.jobPosting.create({
    data: {
      companyId: company1.id,
      title: 'Software Development Engineer',
      type: 'Fulltime',
      location: 'Bangalore',
      package: '15-18 LPA',
      description: 'Looking for talented software engineers to join our team',
      applicationDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      appliedCount: 35,
      shortlistedCount: 12,
      status: 'Open',
      requirements: {
        create: [
          { requirement: 'Strong programming skills in Java/Python' },
          { requirement: 'Understanding of data structures and algorithms' },
          { requirement: 'Good problem-solving abilities' }
        ]
      },
      skills: {
        create: [
          { skill: 'Java' },
          { skill: 'Python' },
          { skill: 'SQL' },
          { skill: 'AWS' }
        ]
      }
    }
  });

  await prisma.jobPosting.create({
    data: {
      companyId: company2.id,
      title: 'Data Science Intern',
      type: 'Internship',
      location: 'Hyderabad',
      stipend: '25,000/month',
      duration: '6 months',
      description: 'Internship opportunity in data science and machine learning',
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      appliedCount: 28,
      shortlistedCount: 8,
      status: 'Open',
      requirements: {
        create: [
          { requirement: 'Knowledge of Python and ML libraries' },
          { requirement: 'Understanding of statistics' }
        ]
      },
      skills: {
        create: [
          { skill: 'Python' },
          { skill: 'TensorFlow' },
          { skill: 'Pandas' },
          { skill: 'NumPy' }
        ]
      }
    }
  });

  // Create Clubs
  console.log('🎭 Creating clubs...');
  const club1 = await prisma.club.create({
    data: {
      name: 'Coding Club',
      logo: 'https://picsum.photos/200/200?random=10',
      category: 'Technical',
      description: 'Promoting coding culture and competitive programming',
      memberCount: 120,
      president: 'Rahul Sharma',
      vicePresident: 'Priya Patel',
      faculty: 'Dr. Sarah Johnson',
      email: 'codingclub@university.edu',
      upcomingEvents: 3,
      pastEvents: 15,
      status: 'active',
      socialLinks: {
        create: [
          { platform: 'Instagram', url: 'https://instagram.com/codingclub' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/codingclub' }
        ]
      },
      achievements: {
        create: [
          { description: 'Won Inter-College Hackathon 2024' },
          { description: 'Organized 10+ workshops in 2024' }
        ]
      }
    }
  });

  const club2 = await prisma.club.create({
    data: {
      name: 'AI & ML Club',
      logo: 'https://picsum.photos/200/200?random=11',
      category: 'Technical',
      description: 'Exploring artificial intelligence and machine learning',
      memberCount: 85,
      president: 'Amit Kumar',
      vicePresident: 'Sneha Reddy',
      faculty: 'Dr. Sarah Johnson',
      email: 'aimlclub@university.edu',
      upcomingEvents: 2,
      pastEvents: 8,
      status: 'active',
      socialLinks: {
        create: [
          { platform: 'Twitter', url: 'https://twitter.com/aimlclub' },
          { platform: 'GitHub', url: 'https://github.com/aimlclub' }
        ]
      },
      achievements: {
        create: [
          { description: 'Published research papers in ML conferences' }
        ]
      }
    }
  });

  // Add club members
  console.log('👥 Adding club members...');
  for (const studentUser of studentUsers.slice(0, 4)) {
    await prisma.clubMember.create({
      data: {
        clubId: club1.id,
        studentId: studentUser.student!.id,
        role: 'Member'
      }
    });
  }

  // Link clubs to events
  await prisma.clubEvent.create({
    data: {
      clubId: club1.id,
      eventId: event1.id
    }
  });

  await prisma.clubEvent.create({
    data: {
      clubId: club2.id,
      eventId: event2.id
    }
  });

  // Create Notifications
  console.log('🔔 Creating notifications...');
  for (const studentUser of studentUsers) {
    await prisma.notification.create({
      data: {
        userId: studentUser.id,
        type: 'assignment',
        title: 'New Assignment Posted',
        message: 'Linear Regression Implementation assignment has been posted',
        priority: 'high',
        link: '/assignments',
        icon: '📝'
      }
    });

    await prisma.notification.create({
      data: {
        userId: studentUser.id,
        type: 'event',
        title: 'Tech Fest Registration Open',
        message: 'Register now for Tech Fest 2024',
        priority: 'medium',
        link: '/events',
        icon: '🎉'
      }
    });
  }

  // Create Leaderboard Entries
  console.log('🏆 Creating leaderboard entries...');
  const sortedStudents = [...studentUsers].sort((a, b) => b.student!.points - a.student!.points);
  for (let i = 0; i < sortedStudents.length; i++) {
    await prisma.leaderboardEntry.create({
      data: {
        rank: i + 1,
        studentId: sortedStudents[i].student!.id,
        points: sortedStudents[i].student!.points,
        badges: 2,
        avatar: sortedStudents[i].profileImage
      }
    });
  }

  // Create Calendar Events
  console.log('📅 Creating calendar events...');
  await prisma.calendarEvent.create({
    data: {
      title: 'Machine Learning - Lecture',
      type: 'class',
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      startTime: '9:00 AM',
      endTime: '10:30 AM',
      location: 'CS-Lab1',
      instructor: 'Dr. Sarah Johnson',
      description: 'Neural Networks and Deep Learning',
      color: '#3b82f6'
    }
  });

  await prisma.calendarEvent.create({
    data: {
      title: 'Mid-term Exam - DBMS',
      type: 'exam',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      location: 'Main Hall',
      description: 'Database Management Systems Mid-term',
      color: '#ef4444'
    }
  });

  await prisma.calendarEvent.create({
    data: {
      title: 'Assignment Deadline - ML',
      type: 'deadline',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startTime: '11:59 PM',
      description: 'Linear Regression Implementation due',
      color: '#f59e0b'
    }
  });

  // Create Analytics Snapshot
  console.log('📊 Creating analytics snapshot...');
  await prisma.analyticsSnapshot.create({
    data: {
      overallAttendance: 89.5,
      overallCGPA: 8.68,
      totalStudents: 8,
      activeStudents: 8,
      topPerformers: 3,
      atRiskStudents: 1,
      totalPlacements: 145,
      averagePackage: '12.5 LPA',
      highestPackage: '45 LPA',
      companiesVisited: 75,
      offersReceived: 198,
      placementRate: 92.5,
      totalCourses: 2,
      activeCourses: 2,
      completedCourses: 0,
      averageClassSize: 45.5
    }
  });

  console.log('✅ Database seeding completed successfully!');
  console.log(`
📊 Summary:
- Departments: 3
- Teachers: 2
- Students: 8
- Courses: 2
- Assignments: 2
- Events: 2
- Companies: 2
- Job Postings: 2
- Clubs: 2
- Notifications: ${studentUsers.length * 2}
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });