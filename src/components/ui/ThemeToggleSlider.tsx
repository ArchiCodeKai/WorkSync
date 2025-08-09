'use client'

import { useTheme } from '@/lib/hooks/useTheme'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggleSlider() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center gap-2">
      {/* Light Mode Icon */}
      <SunIcon className={`w-4 h-4 transition-all duration-300 ${
        theme === 'light' ? 'text-yellow-500 scale-110' : 'text-gray-400 scale-90'
      }`} />
      
      {/* Compact Slider Track */}
      <button
        onClick={toggleTheme}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:ring-offset-1 ${
          theme === 'dark' 
            ? 'bg-blue-500 shadow-inner' 
            : 'bg-gray-300 shadow-inner'
        }`}
        role="switch"
        aria-checked={theme === 'dark'}
      >
        {/* Slider Thumb */}
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-all duration-300 ${
            theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
      
      {/* Dark Mode Icon */}
      <MoonIcon className={`w-4 h-4 transition-all duration-300 ${
        theme === 'dark' ? 'text-blue-400 scale-110' : 'text-gray-400 scale-90'
      }`} />
    </div>
  )
}