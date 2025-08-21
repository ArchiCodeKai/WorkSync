import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Temporarily disabled
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // LinkedIn Provider - Only enable if credentials are provided
    ...(process.env.LINKEDIN_CLIENT_ID && 
        process.env.LINKEDIN_CLIENT_ID !== 'your-real-linkedin-client-id' && 
        process.env.LINKEDIN_CLIENT_SECRET && 
        process.env.LINKEDIN_CLIENT_SECRET !== 'your-real-linkedin-client-secret' 
        ? [LinkedInProvider({
          clientId: process.env.LINKEDIN_CLIENT_ID!,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
        })] : []),
    // Apple Provider - will need Apple app setup  
    // Apple provider configuration would go here
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  // 允許使用相同 email 的不同 OAuth 提供商登入
  allowDangerousEmailAccountLinking: true,
}