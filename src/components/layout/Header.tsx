'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { getRandomQuote } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { data: session } = useSession()
  const user = session?.user
  const [quote] = useState(() => getRandomQuote())
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  const pageTitle = {
    '/dashboard': t('nav.dashboard'),
    '/dashboard/jobs': t('nav.jobs'),
    '/dashboard/learning': t('nav.learning'), 
    '/dashboard/pomodoro': t('nav.pomodoro'),
    '/dashboard/mood': t('nav.mood'),
  }
  
  const currentTitle = pageTitle[pathname as keyof typeof pageTitle] || 'WorkSync'

  return (
    <header className="bg-surface border-b border-border shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side */}
          <div className="flex items-center">
            {/* Mobile menu button - could be added later */}
            <div className="lg:hidden">
              <h1 className="text-lg font-semibold text-foreground">WorkSync</h1>
            </div>
            
            {/* Desktop title */}
            <div className="hidden lg:block">
              <h1 className="text-xl font-semibold text-foreground">
                {currentTitle}
              </h1>
              {pathname === '/dashboard' && (
                <p className="text-sm text-foreground-secondary mt-1">
                  {t('dashboard.subtitle')}
                </p>
              )}
            </div>
          </div>

          {/* Center - Search Bar (Desktop only) */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-foreground-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-surface text-foreground placeholder-foreground-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Search..."
              />
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Notifications */}
            <button className="relative p-2 text-foreground-secondary hover:text-foreground rounded-md transition-colors">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-1 rounded-lg hover:bg-hover transition-colors"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
                  <p className="text-xs text-foreground-secondary">
                    {session ? 'Authenticated' : 'Guest'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <ChevronDownIcon className="w-4 h-4 text-foreground-secondary" />
                </div>
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-10">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-foreground-secondary">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-hover"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('auth.profile')}
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => {
                        signOut({ callbackUrl: '/' })
                        setIsUserMenuOpen(false)
                      }}
                    >
                      {t('auth.signOut')}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Overlay to close user menu */}
              {isUserMenuOpen && (
                <div 
                  className="fixed inset-0 z-0" 
                  onClick={() => setIsUserMenuOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}