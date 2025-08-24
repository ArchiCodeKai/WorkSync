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
    // LinkedIn Provider - Custom OAuth configuration
    ...(process.env.LINKEDIN_CLIENT_ID && 
        process.env.LINKEDIN_CLIENT_ID !== 'your-real-linkedin-client-id' && 
        process.env.LINKEDIN_CLIENT_SECRET && 
        process.env.LINKEDIN_CLIENT_SECRET !== 'your-real-linkedin-client-secret' 
        ? [{
          id: 'linkedin',
          name: 'LinkedIn',
          type: 'oauth' as const,
          version: '2.0',
          authorization: {
            url: 'https://www.linkedin.com/oauth/v2/authorization',
            params: {
              scope: 'openid profile email',
              response_type: 'code'
            }
          },
          token: 'https://www.linkedin.com/oauth/v2/accessToken',
          userinfo: 'https://api.linkedin.com/v2/userinfo',
          clientId: process.env.LINKEDIN_CLIENT_ID!,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
          client: {
            token_endpoint_auth_method: 'client_secret_post' as const
          },
          profile(profile: any) {
            return {
              id: profile.sub,
              name: profile.name,
              email: profile.email,
              image: profile.picture
            }
          }
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
  // Enable linking accounts with same email
  events: {
    async linkAccount({ user, account, profile }) {
      // Allow linking different OAuth providers with same email
    }
  },
}