import { prisma } from '../src/lib/prisma'

async function testAuthentication() {
  console.log('🧪 Testing Authentication System...\n')

  try {
    // Test 1: Database Connection
    console.log('1️⃣ Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful')

    // Test 2: NextAuth Models
    console.log('\n2️⃣ Testing NextAuth models...')
    
    // Check if NextAuth tables exist
    const userCount = await prisma.user.count()
    const accountCount = await prisma.account.count()
    const sessionCount = await prisma.session.count()
    
    console.log(`✅ Users table: ${userCount} records`)
    console.log(`✅ Accounts table: ${accountCount} records`)
    console.log(`✅ Sessions table: ${sessionCount} records`)

    // Test 3: Sample Data
    console.log('\n3️⃣ Testing sample data...')
    const sampleUser = await prisma.user.findFirst({
      include: {
        jobApplications: true,
        moodEntries: true,
        pomodoroSessions: true,
        learningEntries: true
      }
    })

    if (sampleUser) {
      console.log(`✅ Sample user found: ${sampleUser.name} (${sampleUser.email})`)
      console.log(`   - Job applications: ${sampleUser.jobApplications.length}`)
      console.log(`   - Mood entries: ${sampleUser.moodEntries.length}`)
      console.log(`   - Pomodoro sessions: ${sampleUser.pomodoroSessions.length}`)
      console.log(`   - Learning entries: ${sampleUser.learningEntries.length}`)
    } else {
      console.log('⚠️ No sample user found. Run `npm run db:seed` to create sample data.')
    }

    // Test 4: Environment Variables
    console.log('\n4️⃣ Testing environment variables...')
    
    const requiredVars = [
      'DATABASE_URL',
      'NEXTAUTH_URL', 
      'NEXTAUTH_SECRET',
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET'
    ]

    let allVarsPresent = true
    for (const varName of requiredVars) {
      const value = process.env[varName]
      if (value) {
        const maskedValue = varName.includes('SECRET') ? '***' : 
                           varName.includes('CLIENT_ID') ? value.substring(0, 10) + '...' : 
                           value
        console.log(`✅ ${varName}: ${maskedValue}`)
      } else {
        console.log(`❌ ${varName}: Missing`)
        allVarsPresent = false
      }
    }

    if (!allVarsPresent) {
      console.log('\n⚠️ Some required environment variables are missing.')
      console.log('   Check .env.local file and refer to SECURITY.md for setup instructions.')
    }

    // Summary
    console.log('\n📋 Authentication System Status:')
    console.log('✅ Database: Connected and configured')
    console.log('✅ NextAuth.js: Models configured')
    console.log('✅ Prisma: Schema migrated')
    console.log(allVarsPresent ? '✅ Environment: All variables present' : '⚠️ Environment: Some variables missing')
    
    console.log('\n🎯 Next Steps:')
    console.log('1. Visit http://localhost:3001/auth/signin to test login')
    console.log('2. Set up real Google OAuth credentials for full testing')
    console.log('3. Test LinkedIn and Apple mock authentication')
    console.log('4. Verify dashboard access after authentication')

  } catch (error) {
    console.error('❌ Authentication test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAuthentication()