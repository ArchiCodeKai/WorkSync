# WorkSync Security Configuration Guide

## Overview
This document outlines the security setup for WorkSync, including OAuth configuration, environment variables, and best practices.

## Environment Variables

### Required Environment Variables
Create a `.env.local` file with the following variables:

```bash
# Database Configuration
DATABASE_URL="file:./dev.db"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # Update for production
NODE_ENV="development"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"         # Update for production
NEXTAUTH_SECRET="your-secret-key-here"       # Generate a secure random string

# Google OAuth (Required for Google Sign-in)
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# LinkedIn OAuth (Optional - Currently using mock)
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"

# Apple OAuth (Optional - Currently using mock)
APPLE_CLIENT_ID="your-apple-client-id"
APPLE_CLIENT_SECRET="your-apple-client-secret"
```

## OAuth Provider Setup

### Google OAuth Setup

1. **Google Cloud Console Setup**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API and Google OAuth2 API
   
2. **Create OAuth Credentials**:
   - Go to Credentials > Create Credentials > OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://yourdomain.com/api/auth/callback/google`
   
3. **Configure Environment Variables**:
   ```bash
   GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

### LinkedIn OAuth Setup (Future Implementation)

1. **LinkedIn Developers**:
   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
   - Create a new app
   - Configure OAuth redirect URLs
   
2. **Redirect URLs**:
   - Development: `http://localhost:3000/api/auth/callback/linkedin`
   - Production: `https://yourdomain.com/api/auth/callback/linkedin`

### Apple Sign-In Setup (Future Implementation)

1. **Apple Developer Account**:
   - Requires paid Apple Developer account
   - Configure Sign in with Apple
   - Set up Service IDs and redirect URLs

## Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` files to version control
- Use different secrets for different environments
- Rotate secrets regularly
- Use strong, random secrets (minimum 32 characters)

### 2. NextAuth Secret Generation
Generate a secure secret using:
```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Production Configuration
- Use HTTPS only in production
- Set secure cookie attributes
- Configure CSRF protection
- Enable rate limiting

### 4. Database Security
- Use PostgreSQL or MySQL in production (not SQLite)
- Enable database connection encryption
- Use database connection pooling
- Regular database backups

## Current Implementation Status

✅ **Completed**:
- NextAuth.js integration
- Google OAuth provider setup (needs real credentials)
- Prisma database with NextAuth adapter
- Session management
- Protected routes with AuthGuard

🚧 **In Progress / Mock**:
- LinkedIn OAuth (using mock authentication)
- Apple Sign-In (using mock authentication)

## Development vs Production

### Development
- SQLite database for simplicity
- Mock authentication for LinkedIn/Apple
- HTTP allowed (localhost)
- Detailed error messages

### Production Checklist
- [ ] Switch to PostgreSQL/MySQL
- [ ] Configure real OAuth credentials
- [ ] Set up HTTPS
- [ ] Update NEXTAUTH_URL
- [ ] Generate secure NEXTAUTH_SECRET
- [ ] Configure domain verification
- [ ] Set up monitoring and logging
- [ ] Enable rate limiting
- [ ] Configure CORS properly

## Testing Authentication

### Mock Authentication
The system includes mock authentication for development:
- Google: Uses real NextAuth.js flow (needs credentials)
- LinkedIn: Uses mock data stored in localStorage
- Apple: Uses mock data stored in localStorage

### Real Authentication Testing
1. Set up Google OAuth credentials
2. Update environment variables
3. Test sign-in flow
4. Verify user data persistence
5. Test sign-out functionality

## Troubleshooting

### Common Issues
1. **OAuth Configuration Error**: Check client ID/secret
2. **Redirect URI Mismatch**: Verify redirect URLs in OAuth settings
3. **Session Not Persisting**: Check database connection
4. **CORS Errors**: Verify domain configuration

### Debug Mode
Enable debug logging by setting:
```bash
NEXTAUTH_DEBUG=true
```

## Security Monitoring

### Recommended Monitoring
- Failed authentication attempts
- Unusual login patterns
- Database access patterns
- API rate limiting violations

### Logging
NextAuth.js provides comprehensive logging for:
- Authentication events
- Session management
- Token refresh events
- Error tracking