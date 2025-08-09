async function testGoogleOAuth() {
  console.log('🧪 Testing Google OAuth Configuration...\n')

  // Test environment variables
  console.log('1️⃣ Environment Variables:')
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const nextAuthUrl = process.env.NEXTAUTH_URL

  console.log(`✅ GOOGLE_CLIENT_ID: ${clientId ? clientId.substring(0, 20) + '...' : '❌ Missing'}`)
  console.log(`✅ GOOGLE_CLIENT_SECRET: ${clientSecret ? '***' + clientSecret.substring(clientSecret.length - 4) : '❌ Missing'}`)
  console.log(`✅ NEXTAUTH_URL: ${nextAuthUrl || '❌ Missing'}`)

  // Test NextAuth endpoints
  console.log('\n2️⃣ NextAuth.js Endpoints:')
  try {
    const baseUrl = nextAuthUrl || 'http://localhost:3000'
    
    // Test providers endpoint
    const providersResponse = await fetch(`${baseUrl}/api/auth/providers`)
    if (providersResponse.ok) {
      const providers = await providersResponse.json()
      console.log('✅ /api/auth/providers - Available providers:')
      Object.keys(providers).forEach(provider => {
        console.log(`   - ${provider}: ${providers[provider].name}`)
      })
    } else {
      console.log('❌ /api/auth/providers - Failed to fetch')
    }

    // Test session endpoint
    const sessionResponse = await fetch(`${baseUrl}/api/auth/session`)
    if (sessionResponse.ok) {
      const session = await sessionResponse.json()
      console.log(`✅ /api/auth/session - ${session.user ? 'User logged in' : 'No active session'}`)
    } else {
      console.log('❌ /api/auth/session - Failed to fetch')
    }

  } catch (error) {
    console.log('❌ Error testing endpoints:', error.message)
  }

  // Instructions
  console.log('\n3️⃣ Google Cloud Console Configuration:')
  console.log('Make sure to set the following in Google Cloud Console:')
  console.log('📍 Authorized redirect URIs:')
  console.log('   - http://localhost:3000/api/auth/callback/google')
  console.log('')
  console.log('🌐 Authorized JavaScript origins:')
  console.log('   - http://localhost:3000')

  console.log('\n🎯 Ready to Test!')
  console.log('Visit: http://localhost:3000/auth/signin')
  console.log('Click "Continue with Google" to test the OAuth flow')
}

testGoogleOAuth().catch(console.error)