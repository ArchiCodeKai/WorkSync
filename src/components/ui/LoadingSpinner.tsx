'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/hooks/useTheme'
import WorkSyncLogo from './WorkSyncLogo'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'wave' | 'worksync'
  className?: string
  text?: string
  showIcon?: boolean
  showProgress?: boolean
  progressDuration?: number
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
  showProgress = true,
  progressDuration = 3000,
  'aria-label': ariaLabel = 'Loading',
  'aria-live': ariaLive = 'polite'
}: LoadingSpinnerProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const dimensions = sizeMap[size]
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Progress bar state
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (showProgress && variant === 'worksync') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const increment = 100 / (progressDuration / 100)
          const newProgress = prev + increment
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 100)
      
      return () => clearInterval(interval)
    }
  }, [showProgress, variant, progressDuration])

  if (variant === 'worksync') {
    return (
      <div 
        className={`flex flex-col items-center justify-center space-y-8 ${className}`}
        role="status"
        aria-label={ariaLabel}
        aria-live={ariaLive}
      >
        {showIcon && (
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <WorkSyncLogo 
              size={120} 
              showText={false} 
              variant="premium"
              animationSpeed={1.5}
              rotationSpeed={6}
            />
          </motion.div>
        )}
        
        {/* Loading Text */}
        {text && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.p 
              className="text-lg font-medium text-foreground mb-2"
              animate={prefersReducedMotion ? {} : { opacity: [0.8, 1, 0.8] }}
              transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
              aria-live={ariaLive}
            >
              {text}
            </motion.p>
            <p className="text-sm text-foreground-secondary">
              設定您的工作同步環境...
            </p>
          </motion.div>
        )}
        
        {/* Progress Bar */}
        {showProgress && (
          <motion.div
            className="w-64 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-between text-xs text-foreground-secondary">
              <span>載入中...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-300 to-white' 
                    : 'bg-gradient-to-r from-gray-700 to-black'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
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