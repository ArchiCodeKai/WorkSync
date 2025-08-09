'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { LanguageIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'
import { type Locale } from '@/lib/i18n'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { value: 'zh-TW' as const, label: '繁體中文', short: '中' },
    { value: 'en' as const, label: 'English', short: 'EN' },
    { value: 'ja' as const, label: '日本語', short: '日' },
  ]

  const currentLanguage = languages.find(lang => lang.value === locale)

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-7 px-2 py-0 min-w-[50px] flex items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 border-0 rounded-full transition-all duration-200"
      >
        <LanguageIcon className="h-4 w-4" />
        <span className="text-xs font-medium">
          {currentLanguage?.short || '中'}
        </span>
        <ChevronDownIcon className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute top-full right-0 mt-2 w-36 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg z-20 py-2">
            {languages.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleLanguageChange(value)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-all duration-200 flex items-center gap-2 rounded-lg mx-1 ${
                  locale === value 
                    ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <LanguageIcon className="h-4 w-4" />
                {label}
                {locale === value && (
                  <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Legacy component for backward compatibility
export function LanguageToggleDropdown() {
  return <LanguageToggle />
}