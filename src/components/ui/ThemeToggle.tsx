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

  const getLabel = () => {
    return theme === 'light' ? t('theme.light') : t('theme.dark')
  }

  return (
    <label className="relative cursor-pointer">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        className="absolute opacity-0 cursor-pointer h-0 w-0"
        aria-label={getLabel()}
      />
      <div 
        className={`relative h-10 w-20 border-2 rounded-full ${
          theme === 'dark' 
            ? 'bg-gray-700 border-gray-600 shadow-lg shadow-gray-800' 
            : 'bg-white border-gray-100 shadow-sm shadow-gray-100'
        }`}
        style={{ 
          transition: 'background-color 250ms, border-color 250ms, box-shadow 250ms' 
        }}
      >
        {/* 滑動把手 */}
        <div 
          className={`absolute h-6 w-6 rounded-full ${
            theme === 'dark' ? 'bg-gray-600' : 'bg-orange-100'
          }`}
          style={{
            transform: theme === 'dark' 
              ? 'translate(0.375rem, 0.375rem)' 
              : 'translate(2.75rem, 0.375rem)',
            boxShadow: theme === 'dark' 
              ? 'inset 0px 0px 0px 0.1875rem white' 
              : 'inset 0px 0px 0px 0.1875rem #fb923c',
            transition: 'background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71)'
          }}
        />
        
        {/* 太陽圖示 */}
        <div 
          className="absolute h-6 w-6"
          style={{
            opacity: theme === 'light' ? 1 : 0,
            transform: theme === 'light' 
              ? 'translate(0.5rem, 0.5rem) rotate(15deg)' 
              : 'translate(0.75rem, 0.5rem) rotate(0deg)',
            transition: 'opacity 150ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71)',
            transformOrigin: '50% 50%'
          }}
        >
          <SunIcon className="h-6 w-6 text-orange-400" />
        </div>
        
        {/* 月亮圖示 */}
        <div 
          className="absolute h-6 w-6"
          style={{
            opacity: theme === 'dark' ? 1 : 0,
            transform: theme === 'dark' 
              ? 'translate(3rem, 0.5rem) rotate(-15deg)' 
              : 'translate(2.75rem, 0.5rem) rotate(0deg)',
            transition: 'opacity 150ms, transform 500ms cubic-bezier(0.26, 2.5, 0.46, 0.71)',
            transformOrigin: '50% 50%'
          }}
        >
          <MoonIcon className="h-6 w-6 text-white" />
        </div>
      </div>
      <span className="sr-only">{getLabel()}</span>
    </label>
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