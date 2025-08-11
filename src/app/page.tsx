'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { ThemeToggleSwitch } from '@/components/ui/ThemeToggleSwitch'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import WorkSyncLogo from '@/components/ui/WorkSyncLogo'
import SocialLoginButton from '@/components/ui/SocialLoginButton'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
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
      <div className="min-h-screen login-bg-animated flex items-center justify-center">
        <LoadingSpinner 
          variant="worksync" 
          text="Loading WorkSync..."
          className="text-center"
        />
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
                variant="premium"
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
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <LoadingSpinner 
                  size="sm" 
                  variant="default" 
                  className="text-white [&>div]:border-white [&>div]:border-t-transparent [&>div]:border-r-transparent"
                />
              )}
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

          {/* Enhanced OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <SocialLoginButton
              provider="google"
              onClick={() => handleOAuthSignIn('google')}
              disabled={isLoading}
            >
              {t('auth.continueWithGoogle', 'Continue with Google')}
            </SocialLoginButton>

            <SocialLoginButton
              provider="linkedin"
              onClick={() => handleOAuthSignIn('linkedin')}
              disabled={isLoading}
            >
              {t('auth.continueWithLinkedIn', 'Continue with LinkedIn')}
            </SocialLoginButton>

            <SocialLoginButton
              provider="apple"
              onClick={() => handleOAuthSignIn('apple')}
              disabled={isLoading}
            >
              {t('auth.continueWithApple', 'Continue with Apple')}
            </SocialLoginButton>
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