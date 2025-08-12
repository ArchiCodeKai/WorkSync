'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { ThemeToggleSlider } from '@/components/ui/ThemeToggleSlider'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { getOccupationOptions } from '@/lib/constants/occupations'

// Force dynamic for this page due to useSearchParams
export const dynamic = 'force-dynamic'

function SignUpDetailsContent() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    birthYear: new Date().getFullYear() - 25, // Default to 25 years old
    occupation: '',
    agreedToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const occupationOptions = getOccupationOptions(locale)

  useEffect(() => {
    // Redirect if no email in query params
    if (!email) {
      router.push('/auth/signup')
    }
  }, [email, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Validation
    if (!formData.name.trim()) {
      setError(t('auth.name', 'Name') + ' is required')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!formData.occupation) {
      setError(t('auth.occupation', 'Occupation') + ' is required')
      return
    }

    if (!formData.agreedToTerms) {
      setError('Please agree to the terms of service')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: formData.name.trim(),
          password: formData.password,
          birthYear: formData.birthYear,
          occupation: formData.occupation
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Registration successful, redirect to sign in
        router.push(`/?email=${encodeURIComponent(email)}&registered=true`)
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!email) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">💼</span>
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">
              {t('auth.createAccount', 'Create Account')}
            </h1>
            <p className="text-sm text-foreground-secondary">
              {email}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                {t('auth.name', 'Full Name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                placeholder="Your full name"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                {t('auth.password', 'Password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                placeholder="At least 6 characters"
                required
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                {t('auth.confirmPassword', 'Confirm Password')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                placeholder="Confirm your password"
                required
                disabled={isLoading}
              />
            </div>

            {/* Birth Year */}
            <div>
              <label htmlFor="birthYear" className="block text-sm font-medium text-foreground mb-1">
                {t('auth.birthYear', 'Birth Year')}
              </label>
              <select
                id="birthYear"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                required
                disabled={isLoading}
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const year = new Date().getFullYear() - i - 18
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-foreground mb-1">
                {t('auth.occupation', 'Occupation')}
              </label>
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                required
                disabled={isLoading}
              >
                <option value="">Select your occupation</option>
                {occupationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreedToTerms"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
                disabled={isLoading}
              />
              <label htmlFor="agreedToTerms" className="text-xs text-foreground-secondary leading-4">
                {t('auth.termsAgree', 'By creating an account, you agree to our')}{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  {t('auth.termsOfService', 'Terms of Service')}
                </Link>{' '}
                {t('common.and', 'and')}{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  {t('auth.privacyPolicy', 'Privacy Policy')}
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.agreedToTerms}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
            >
              {isLoading ? t('common.loading', 'Loading...') : t('auth.createAccount', 'Create Account')}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-4 text-center">
            <Link 
              href="/auth/signup" 
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              {t('auth.backToSignIn', 'Back to Email')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}

export default function SignUpDetailsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignUpDetailsContent />
    </Suspense>
  )
}