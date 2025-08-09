'use client'

import { useTheme } from '@/lib/hooks/useTheme'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const getIcon = () => {
    return theme === 'light' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />
  }

  const getLabel = () => {
    return theme === 'light' ? t('theme.light') : t('theme.dark')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0"
      title={getLabel()}
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  )
}

export function ThemeToggleDropdown() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  const themes = [
    { value: 'light', label: t('theme.light'), icon: SunIcon },
    { value: 'dark', label: t('theme.dark'), icon: MoonIcon },
  ] as const

  return (
    <div className="relative">
      <div className="flex flex-col space-y-1 p-1">
        {themes.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant={theme === value ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTheme(value)}
            className="justify-start h-8"
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}