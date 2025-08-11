'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/hooks/useTheme'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'wave' | 'worksync'
  className?: string
  text?: string
  showIcon?: boolean
  'aria-label'?: string
  'aria-live'?: 'polite' | 'assertive' | 'off'
}

const sizeMap = {
  sm: { container: 32, spinner: 16 },
  md: { container: 48, spinner: 24 },
  lg: { container: 64, spinner: 32 },
  xl: { container: 80, spinner: 40 }
}

export default function LoadingSpinner({ 
  size = 'md',
  variant = 'default',
  className = '',
  text,
  showIcon = true,
  'aria-label': ariaLabel = 'Loading',
  'aria-live': ariaLive = 'polite'
}: LoadingSpinnerProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const dimensions = sizeMap[size]
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (variant === 'worksync') {
    return (
      <div 
        className={`flex flex-col items-center justify-center ${className}`}
        role="status"
        aria-label={ariaLabel}
        aria-live={ariaLive}
      >
        {showIcon && (
          <motion.div
            className="relative mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ${isDark ? 'shadow-blue-900/30' : 'shadow-blue-500/30'}`}
              animate={{ 
                boxShadow: isDark 
                  ? ['0 4px 20px rgba(59, 130, 246, 0.3)', '0 8px 32px rgba(147, 51, 234, 0.4)', '0 4px 20px rgba(59, 130, 246, 0.3)']
                  : ['0 4px 20px rgba(59, 130, 246, 0.2)', '0 8px 32px rgba(147, 51, 234, 0.3)', '0 4px 20px rgba(59, 130, 246, 0.2)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span 
                className="text-2xl font-bold text-white"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💼
              </motion.span>
            </motion.div>
            
            {/* Rotating ring around the icon */}
            <motion.div
              className="absolute inset-0 w-16 h-16 border-2 border-transparent rounded-full"
              style={{
                borderTopColor: isDark ? '#60a5fa' : '#3b82f6',
                borderRightColor: isDark ? '#a855f7' : '#8b5cf6'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
        
        {text && (
          <motion.p 
            className="text-foreground-secondary text-center sr-only sm:not-sr-only"
            animate={prefersReducedMotion ? {} : { opacity: [0.7, 1, 0.7] }}
            transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
            aria-live={ariaLive}
          >
            {text}
          </motion.p>
        )}
        
        {/* Screen reader only text */}
        <span className="sr-only">{ariaLabel}</span>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${isDark ? 'bg-white' : 'bg-gray-800'}`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
        {text && <span className="ml-4 text-foreground-secondary">{text}</span>}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <motion.div
          className={`w-${dimensions.container} h-${dimensions.container} rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {text && <span className="text-foreground-secondary">{text}</span>}
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div className={`flex items-end space-x-1 ${className}`}>
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className={`w-2 ${isDark ? 'bg-blue-400' : 'bg-blue-600'} rounded-t`}
            animate={{ height: ['8px', '24px', '8px'] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.1
            }}
          />
        ))}
        {text && <span className="ml-4 text-foreground-secondary">{text}</span>}
      </div>
    )
  }

  // Default spinner
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        className={`w-${dimensions.spinner} h-${dimensions.spinner} border-2 border-transparent rounded-full`}
        style={{
          borderTopColor: isDark ? '#60a5fa' : '#3b82f6',
          borderRightColor: isDark ? '#a855f7' : '#8b5cf6'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && <span className="text-foreground-secondary">{text}</span>}
    </div>
  )
}