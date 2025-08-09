'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { ThemeToggleSwitch } from '@/components/ui/ThemeToggleSwitch'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import WorkSyncLogo from '@/components/ui/WorkSyncLogo'
import { useLanguage } from '@/lib/hooks/useLanguage'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t, locale } = useLanguage()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Pre-fill email from URL params and show messages
  useEffect(() => {
    const emailParam = searchParams.get('email')
    const registeredParam = searchParams.get('registered')
    
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }))
    }
    
    if (registeredParam === 'true') {
      setMessage('Registration successful! Please sign in with your credentials.')
    }
  }, [searchParams])

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (error) setError('')
  }

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Force session refresh and redirect
        router.refresh()
        router.push('/dashboard')
      } else {
        setError(result.error || t('auth.invalidCredentials', '帳號或密碼錯誤'))
      }
    } catch (err) {
      setError(t('auth.signInError', '登入失敗，請稍後再試'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true)
    setError('')
    
    try {
      if (provider === 'google') {
        await signIn('google', { callbackUrl: '/dashboard' })
      } else {
        // Mock authentication for LinkedIn and Apple
        await handleMockSignIn(provider)
      }
    } catch (err) {
      setError(t('auth.signInError', '登入失敗，請稍後再試'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleMockSignIn = async (provider: string) => {
    // Mock login for development
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser = {
      id: '1',
      name: provider === 'linkedin' ? 'Jane Smith' : 'Apple User',
      email: provider === 'linkedin' ? 'jane@linkedin.com' : 'user@icloud.com',
      provider
    }
    
    localStorage.setItem('worksync-user', JSON.stringify(mockUser))
    localStorage.setItem('worksync-authenticated', 'true')
    router.push('/dashboard')
  }

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">💼</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-foreground-secondary">Loading WorkSync...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen login-bg-animated flex items-center justify-center p-4">
      {/* Simple Debug - Final Test */}
      <div className="fixed top-6 left-6 z-20 bg-green-100 p-2 rounded text-sm border border-green-500">
        <div>語言: {locale} | 標題: {t('auth.welcomeBack')}</div>
      </div>

      {/* Language and Theme Toggle - Redesigned */}
      <div className="fixed top-4 right-4 z-10 flex items-center space-x-2">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full px-3 py-2 border border-gray-200/30 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-all duration-300">
          <LanguageToggle />
        </div>
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full p-1 border border-gray-200/30 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-all duration-300">
          <ThemeToggleSwitch />
        </div>
      </div>
      

      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <WorkSyncLogo 
                size={150} 
                showText={false} 
                animationSpeed={2} 
                rotationSpeed={8} 
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t('auth.welcomeBack', 'Welcome to WorkSync')}
            </h1>
            <p className="text-foreground-secondary">
              {t('auth.signInDescription', 'Sign in to track your job search journey')}
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

          {/* Email + Password Form */}
          <form onSubmit={handleEmailPasswordSignIn} className="space-y-4 mb-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {t('auth.email', 'Email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                {t('auth.password', 'Password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                {t('auth.forgotPassword', 'Forgot password?')}
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? t('auth.signingIn', 'Signing in...') : t('auth.signIn', 'Sign In')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface text-foreground-secondary">or</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            {/* Google Sign In */}
            <button
              onClick={() => handleOAuthSignIn('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-foreground font-medium">
                {t('auth.continueWithGoogle', 'Continue with Google')}
              </span>
            </button>

            {/* LinkedIn Sign In */}
            <button
              onClick={() => handleOAuthSignIn('linkedin')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-foreground font-medium">
                {t('auth.continueWithLinkedIn', 'Continue with LinkedIn')}
              </span>
            </button>

            {/* Apple Sign In */}
            <button
              onClick={() => handleOAuthSignIn('apple')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.017 5.078c-.503.557-1.342.967-2.157.914-.09-1.002.326-2.073.835-2.689.509-.611 1.359-1.009 2.095-1.087.085 1.004-.318 2.037-.773 2.862zm.663 1.067c-1.174-.07-2.186.667-2.748.667-.571 0-1.428-.641-2.351-.622-.762.02-1.467.445-1.856 1.114-.792 1.378-.201 3.404.561 4.516.377.545.823 1.158 1.412 1.136.561-.024.774-.365 1.455-.365.682 0 .871.365 1.457.352.606-.024.994-.561 1.371-1.111.433-.633.612-1.241.62-1.274-.014-.005-1.189-.458-1.204-1.812-.015-1.132.928-1.674.967-1.704-.54-.792-1.379-.884-1.684-.894z"/>
              </svg>
              <span className="text-foreground font-medium">
                {t('auth.continueWithApple', 'Continue with Apple')}
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-foreground-secondary">
              {t('auth.dontHaveAccount', "Don't have an account?")}{' '}
              <Link 
                href="/auth/signup" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                {t('auth.signUp', 'Sign Up')}
              </Link>
            </p>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-6 text-center">
            <p className="text-xs text-foreground-tertiary">
              {t('auth.termsAgree', 'By signing in, you agree to our')}{' '}
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