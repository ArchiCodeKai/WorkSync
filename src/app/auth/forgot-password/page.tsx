'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { ThemeToggleSlider } from '@/components/ui/ThemeToggleSlider'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useLanguage } from '@/lib/hooks/useLanguage'

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setMessage(result.message || 'Password reset email sent successfully')
      } else {
        setError(result.error || 'Failed to send reset email')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Language and Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-10 flex items-center space-x-3">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <LanguageToggle />
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <ThemeToggleSlider />
        </div>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">💼</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t('auth.resetPassword', 'Reset Password')}
            </h1>
            <p className="text-foreground-secondary text-sm">
              {isSubmitted 
                ? 'Check your email for reset instructions'
                : 'Enter your email to receive a password reset link'
              }
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6">
              <p className="text-green-700 dark:text-green-300 text-sm">{message}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {!isSubmitted ? (
            /* Email Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.email', 'Email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {isLoading ? t('common.loading', 'Loading...') : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-foreground-secondary text-sm">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-foreground-tertiary text-xs">
                Didn't receive the email? Check your spam folder or try again in a few minutes.
              </p>
            </div>
          )}

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              {t('auth.backToSignIn', 'Back to Sign In')}
            </Link>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-8 text-center">
            <p className="text-xs text-foreground-tertiary">
              {t('auth.termsAgree', 'By using our service, you agree to our')}{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                {t('auth.termsOfService', 'Terms of Service')}
              </Link>{' '}
              {t('common.and', 'and')}{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                {t('auth.privacyPolicy', 'Privacy Policy')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}