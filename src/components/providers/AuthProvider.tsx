'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext, type AuthContextType, type User } from '@/lib/hooks/useAuth'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = localStorage.getItem('worksync-authenticated') === 'true'
      const userData = localStorage.getItem('worksync-user')
      
      if (isAuthenticated && userData) {
        const user = JSON.parse(userData)
        setUser(user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (provider: string): Promise<void> => {
    // This is mock implementation - will be replaced with NextAuth
    try {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: '1',
        name: provider === 'google' ? 'John Doe' : provider === 'linkedin' ? 'Jane Smith' : 'Apple User',
        email: provider === 'google' ? 'john@gmail.com' : provider === 'linkedin' ? 'jane@linkedin.com' : 'user@icloud.com',
        image: provider === 'google' ? '/google-avatar.jpg' : provider === 'linkedin' ? '/linkedin-avatar.jpg' : '/apple-avatar.jpg',
        provider: provider as User['provider']
      }
      
      localStorage.setItem('worksync-user', JSON.stringify(mockUser))
      localStorage.setItem('worksync-authenticated', 'true')
      
      setUser(mockUser)
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      setIsLoading(true)
      
      // Clear localStorage
      localStorage.removeItem('worksync-user')
      localStorage.removeItem('worksync-authenticated')
      
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Sign out failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}