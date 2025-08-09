import { prisma } from '../src/lib/prisma'

async function checkDatabase() {
  try {
    console.log('📊 Checking database contents...\n')

    // Check users
    const users = await prisma.user.findMany({
      include: {
        jobApplications: true,
        moodEntries: true,
        pomodoroSessions: true,
        learningEntries: true
      }
    })

    console.log(`👥 Found ${users.length} users:`)
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Provider: ${user.provider}`)
      console.log(`    📋 Jobs: ${user.jobApplications.length}`)
      console.log(`    😊 Moods: ${user.moodEntries.length}`)
      console.log(`    🍅 Pomodoros: ${user.pomodoroSessions.length}`)
      console.log(`    📚 Learning: ${user.learningEntries.length}\n`)
    })

    // Check job applications status distribution
    const jobStats = await prisma.jobApplication.groupBy({
      by: ['status'],
      _count: true
    })

    console.log('📈 Job Applications by Status:')
    jobStats.forEach(stat => {
      console.log(`  - ${stat.status}: ${stat._count} applications`)
    })

    console.log('\n✅ Database check completed!')
  } catch (error) {
    console.error('❌ Database check failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()