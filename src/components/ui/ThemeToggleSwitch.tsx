'use client'

import { useTheme } from '@/lib/hooks/useTheme'

export function ThemeToggleSwitch() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="theme-switch flex justify-center items-center">
      <input 
        type="checkbox" 
        className="theme-checkbox opacity-0 absolute" 
        id="theme-checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <label 
        htmlFor="theme-checkbox" 
        className="theme-label flex items-center justify-between p-2.5 rounded-full relative h-10 w-20 cursor-pointer transition-all duration-300 ease-out shadow-inner-light dark:shadow-inner-dark"
      >
        {/* Moon SVG */}
        <svg 
          className="moon text-yellow-400 transition-all duration-500 ease-out transform-gpu hover:rotate-360" 
          width="20" 
          height="20" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Sun SVG */}
        <svg 
          className="sun text-orange-500 transition-all duration-500 ease-out transform-gpu hover:rotate-360" 
          width="20" 
          height="20" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M22 12L23 12" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 2V1" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 23V22" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M20 20L19 19" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M20 4L19 5" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M4 20L5 19" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M4 4L5 5" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M1 12L2 12" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Ball/Slider */}
        <div className="theme-ball absolute top-1.5 left-1.5 h-7 w-7 bg-gray-800 dark:bg-gray-100 rounded-full transition-all duration-300 ease-out transform dark:translate-x-10 translate-x-0 shadow-sm"></div>
      </label>
    </div>
  )
}