import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
  // Create sample students
  const student1 = await prisma.student.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      course: 'Computer Science',
    },
  })
  
  const student2 = await prisma.student.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      course: 'Mathematics',
    },
  })
  
  console.log({ student1, student2 })
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