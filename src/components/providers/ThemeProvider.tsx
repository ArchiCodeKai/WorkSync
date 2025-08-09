'use client'

import { useEffect, useState } from 'react'
import { ThemeContext, type Theme, type ThemeContextType } from '@/lib/hooks/useTheme'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'worksync-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    // Load theme from localStorage on client side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey) as Theme
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        setTheme(savedTheme)
      }
    }
  }, [storageKey])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const root = window.document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    root.removeAttribute('data-theme')
    
    // Apply theme using Tailwind CSS classes
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.add('light')
      root.setAttribute('data-theme', 'light')
    }
  }, [theme])

  const value: ThemeContextType = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
    resolvedTheme: theme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}