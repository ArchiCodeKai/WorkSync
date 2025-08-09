import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
// Note: Email sending will be implemented later with nodemailer

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, name: true }
    })

    // Always return success to prevent email enumeration
    // (Security best practice: don't reveal if email exists)
    const response = {
      success: true,
      message: 'If an account with that email exists, we have sent a password reset link.'
    }

    // Only create reset token if user actually exists
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

      // Clean up any existing unused tokens for this email
      await prisma.passwordResetToken.deleteMany({
        where: {
          email: email.toLowerCase(),
          used: false,
          expiresAt: { lt: new Date() } // Delete expired tokens
        }
      })

      // Create new reset token
      await prisma.passwordResetToken.create({
        data: {
          email: email.toLowerCase(),
          token: resetToken,
          expiresAt,
          used: false
        }
      })

      // TODO: Send email with reset link
      // const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset/${resetToken}`
      // await sendPasswordResetEmail(user.email, user.name, resetLink)
      
      console.log('Password reset requested for:', email)
      console.log('Reset token:', resetToken)
      console.log('Reset link would be:', `${process.env.NEXTAUTH_URL}/auth/reset/${resetToken}`)
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}