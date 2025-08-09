import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create test users
  const testUsers = [
    {
      email: 'john@example.com',
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      provider: 'google',
      providerId: 'google_123456'
    },
    {
      email: 'jane@example.com', 
      name: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400',
      provider: 'linkedin',
      providerId: 'linkedin_789012'
    }
  ]

  for (const userData of testUsers) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData
    })
    console.log(`✅ Created user: ${user.name} (${user.email})`)

    // Add sample job applications for each user
    const jobApplications = [
      {
        company: 'Google',
        position: 'Frontend Developer',
        location: 'Mountain View, CA',
        salary: '$120,000 - $180,000',
        status: 'INTERVIEW_SCHEDULED' as const,
        priority: 'HIGH' as const,
        source: 'LinkedIn',
        userId: user.id
      },
      {
        company: 'Netflix',
        position: 'Full Stack Engineer',
        location: 'Los Gatos, CA',
        salary: '$140,000 - $200,000',
        status: 'APPLIED' as const,
        priority: 'MEDIUM' as const,
        source: '104',
        userId: user.id
      },
      {
        company: 'Airbnb',
        position: 'React Developer',
        location: 'San Francisco, CA',
        salary: '$130,000 - $190,000',
        status: 'REJECTED' as const,
        priority: 'HIGH' as const,
        source: 'Company Website',
        userId: user.id
      }
    ]

    for (const jobData of jobApplications) {
      await prisma.jobApplication.create({ data: jobData })
    }

    // Add sample mood entries
    const moodEntries = [
      { moodScore: 8, note: '今天面試很順利！', tags: '["confident", "happy"]', userId: user.id },
      { moodScore: 6, note: '有點焦慮，但還是保持樂觀', tags: '["anxious", "hopeful"]', userId: user.id },
      { moodScore: 9, note: '收到面試邀請了！', tags: '["excited", "grateful"]', userId: user.id }
    ]

    for (const moodData of moodEntries) {
      await prisma.moodEntry.create({ data: moodData })
    }

    // Add sample pomodoro sessions
    const pomodoroSessions = [
      { duration: 25, taskName: '準備技術面試', completed: true, category: 'INTERVIEW_PREP' as const, userId: user.id },
      { duration: 25, taskName: 'React 學習', completed: true, category: 'STUDY' as const, userId: user.id },
      { duration: 25, taskName: '履歷修改', completed: false, category: 'JOB_SEARCH' as const, userId: user.id }
    ]

    for (const pomodoroData of pomodoroSessions) {
      await prisma.pomodoroSession.create({ data: pomodoroData })
    }

    // Add sample learning entries
    const learningEntries = [
      {
        platform: 'GitHub',
        activity: 'Committed code',
        description: 'Implemented user authentication system',
        duration: 120,
        difficulty: 'Medium',
        tags: '["React", "NextJS", "Authentication"]',
        userId: user.id
      },
      {
        platform: 'LeetCode',
        activity: 'Solved problem',
        description: 'Two Sum - Easy',
        duration: 30,
        difficulty: 'Easy',
        tags: '["Algorithms", "Array", "Hash Table"]',
        userId: user.id
      }
    ]

    for (const learningData of learningEntries) {
      await prisma.learningEntry.create({ data: learningData })
    }
  }

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })