'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { ThemeToggleSlider } from '@/components/ui/ThemeToggleSlider'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { prisma } from '@/lib/prisma'

export default function SignUpPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError('')

    try {
      // Check if email already exists
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.exists) {
        // Email exists, redirect to sign-in
        router.push(`/?email=${encodeURIComponent(email)}`)
      } else {
        // Email doesn't exist, continue to registration
        router.push(`/auth/signup/details?email=${encodeURIComponent(email)}`)
      }
    } catch (err) {
      setError(t('common.loading'))
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
              {t('auth.signUp', 'Sign Up')}
            </h1>
            <p className="text-foreground-secondary">
              {t('auth.signInDescription', 'Join WorkSync to track your job search journey')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
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
              {isLoading ? t('common.loading', 'Loading...') : t('common.next', 'Next')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface text-foreground-secondary">or</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            {/* Google Sign Up */}
            <button
              onClick={() => {/* Will implement OAuth signup later */}}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-foreground font-medium">
                {t('auth.continueWithGoogle', 'Continue with Google')}
              </span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground-secondary">
              {t('auth.alreadyHaveAccount', 'Already have an account?')}{' '}
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                {t('auth.signIn', 'Sign In')}
              </Link>
            </p>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-6 text-center">
            <p className="text-xs text-foreground-tertiary">
              {t('auth.termsAgree', 'By signing up, you agree to our')}{' '}
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