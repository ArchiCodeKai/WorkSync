import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Temporarily disabled
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // LinkedIn OpenID Connect Provider - Custom configuration
    ...(process.env.LINKEDIN_CLIENT_ID && 
        process.env.LINKEDIN_CLIENT_ID !== 'your-real-linkedin-client-id' && 
        process.env.LINKEDIN_CLIENT_SECRET && 
        process.env.LINKEDIN_CLIENT_SECRET !== 'your-real-linkedin-client-secret' 
        ? [{
          id: 'linkedin',
          name: 'LinkedIn',
          type: 'oidc' as const,
          issuer: 'https://www.linkedin.com/oauth',
          clientId: process.env.LINKEDIN_CLIENT_ID!,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
          authorization: {
            params: {
              scope: 'openid profile email',
            },
          },
          profile(profile: any) {
            return {
              id: profile.sub,
              name: profile.name,
              email: profile.email,
              image: profile.picture,
            }
          },
        }] : []),
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