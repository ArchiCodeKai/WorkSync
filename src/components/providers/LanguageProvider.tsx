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

  // 檢測瀏覽器語言並映射到支持的語言
  const detectBrowserLanguage = (): Locale => {
    if (typeof window === 'undefined') return defaultLanguage
    
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en'
    
    if (browserLang.startsWith('zh')) return 'zh-TW'
    if (browserLang.startsWith('ja')) return 'ja'
    return 'en' // 默認英文
  }

  useEffect(() => {
    // Set client flag and load language from localStorage
    setIsClient(true)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(storageKey) as Locale
      
      if (savedLanguage && ['zh-TW', 'en', 'ja'].includes(savedLanguage)) {
        // 如果有保存的語言偏好，使用保存的語言
        setLocale(savedLanguage)
      } else {
        // 如果沒有保存的語言偏好，自動檢測瀏覽器語言
        const detectedLanguage = detectBrowserLanguage()
        setLocale(detectedLanguage)
        localStorage.setItem(storageKey, detectedLanguage)
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