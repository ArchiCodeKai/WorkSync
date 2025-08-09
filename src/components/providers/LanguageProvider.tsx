'use client'

import { useEffect, useState } from 'react'
import { LanguageContext, type LanguageContextType } from '@/lib/hooks/useLanguage'
import { type Locale, defaultLocale, t as translate } from '@/lib/i18n'

interface LanguageProviderProps {
  children: React.ReactNode
  defaultLanguage?: Locale
  storageKey?: string
}

export function LanguageProvider({
  children,
  defaultLanguage = defaultLocale,
  storageKey = 'worksync-language',
}: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLanguage)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set client flag and load language from localStorage
    setIsClient(true)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(storageKey) as Locale
      if (savedLanguage && ['zh-TW', 'en', 'ja'].includes(savedLanguage)) {
        setLocale(savedLanguage)
      }
    }
  }, [storageKey])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newLocale)
    }
  }

  const t = (key: string, fallback?: string) => {
    try {
      const value = translate(key, locale, undefined, fallback)
      return value
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error)
      return fallback || key
    }
  }

  const value: LanguageContextType = {
    locale,
    setLocale: handleSetLocale,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}