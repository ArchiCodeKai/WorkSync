'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GoogleIcon, LinkedInIcon, AppleIcon } from './icons'
import LoadingSpinner from './LoadingSpinner'
import { useTheme } from '@/lib/hooks/useTheme'

interface SocialLoginButtonProps {
  provider: 'google' | 'linkedin' | 'apple'
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

const providerConfig = {
  google: {
    icon: GoogleIcon,
    colors: {
      border: 'border-red-200 dark:border-red-800/30',
      hover: 'hover:bg-red-50 dark:hover:bg-black/80',
      focus: 'focus:ring-red-500/20',
      shadow: 'hover:shadow-red-500/10'
    }
  },
  linkedin: {
    icon: LinkedInIcon,
    colors: {
      border: 'border-blue-200 dark:border-blue-800/30',
      hover: 'hover:bg-blue-50 dark:hover:bg-black/80',
      focus: 'focus:ring-blue-500/20',
      shadow: 'hover:shadow-blue-500/10'
    }
  },
  apple: {
    icon: AppleIcon,
    colors: {
      border: 'border-gray-200 dark:border-gray-600',
      hover: 'hover:bg-gray-50 dark:hover:bg-black/80',
      focus: 'focus:ring-gray-500/20',
      shadow: 'hover:shadow-gray-500/10'
    }
  }
}

export default function SocialLoginButton({
  provider,
  onClick,
  disabled = false,
  children,
  className = '',
  'aria-label': ariaLabel
}: SocialLoginButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const config = providerConfig[provider]
  const IconComponent = config.icon
  
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || `Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
      aria-describedby={`${provider}-login-description`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={`
        w-full flex items-center justify-center px-4 py-3 relative
        border ${config.colors.border} rounded-lg 
        transition-all duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-blue-500 dark:focus:ring-blue-400
        hover:shadow-md active:scale-[0.98]
        group relative overflow-hidden
        motion-safe:transition-all motion-reduce:transition-none
        contrast-more:border-2 contrast-more:border-current
        sm:px-6 sm:py-3 xs:px-3 xs:py-2
        ${className}
      `}
      style={{
        backgroundColor: isHovered && isDark 
          ? 'rgba(0, 0, 0, 0.9)' 
          : isHovered && !isDark
          ? 'rgba(248, 250, 252, 0.8)'  // 淺色模式的淺灰背景
          : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 8px 25px -8px var(--tw-shadow-color, rgba(0, 0, 0, 0.1))`
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        // Respect reduced motion preference
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : undefined
      }}
    >
      {/* Background gradient effect on hover - respect reduced motion */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent motion-reduce:hidden"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: isHovered && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '100%' : '-100%',
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Icon fixed to left side */}
      <motion.div
        className="absolute left-4 sm:left-6 xs:left-3 flex items-center justify-center w-5 h-5"
        animate={{
          scale: isPressed ? 0.95 : 1,
          rotate: isPressed ? 1 : 0
        }}
        transition={{ duration: 0.1 }}
      >
        {disabled ? (
          <LoadingSpinner 
            size="sm" 
            variant="default" 
            className="relative z-10 [&>div]:w-5 [&>div]:h-5"
          />
        ) : (
          <IconComponent 
            size={20} 
            isHovered={isHovered}
            className="relative z-10 block"
          />
        )}
      </motion.div>
      
      {/* Button text centered */}
      <motion.span 
        className="text-foreground font-medium relative z-10 select-none"
        animate={{
          x: isHovered ? 1 : 0,
          color: isPressed ? undefined : undefined
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Ripple effect on click */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-current opacity-10 rounded-lg"
          initial={{ scale: 0, opacity: 0.2 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </motion.button>
  )
}