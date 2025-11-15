import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create User 1
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      updatedAt: new Date(),   // REQUIRED
      profileImage: null,
    },
  })

  // Create Student for User 1
  const student1 = await prisma.student.create({
    data: {
      phone: '+1234567890',
      course: 'Computer Science',
      userId: user1.id,        // REQUIRED
      updatedAt: new Date(),   // REQUIRED
    },
  })

  // Create User 2
  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      updatedAt: new Date(),   // REQUIRED
      profileImage: null,
    },
  })

  // Create Student for User 2
  const student2 = await prisma.student.create({
    data: {
      phone: '+1234567891',
      course: 'Mathematics',
      userId: user2.id,        // REQUIRED
      updatedAt: new Date(),   // REQUIRED
    },
  })

  console.log({ user1, student1, user2, student2 })
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
