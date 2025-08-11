'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/hooks/useTheme'

interface AppleIconProps {
  size?: number
  isHovered?: boolean
  className?: string
}

export default function AppleIcon({ 
  size = 20, 
  isHovered = false, 
  className = '' 
}: AppleIconProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`transition-all duration-300 ${isDark ? 'filter brightness-0 invert' : ''} ${className}`}
      animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? [0, 1, -1, 0] : 0
      }}
      transition={{
        scale: { duration: 0.2 },
        rotate: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      <motion.path
        d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
        fill="currentColor"
        animate={{
          opacity: isHovered ? 0.8 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Subtle glow effect on hover */}
      {isHovered && (
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.2"
          className="blur-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.svg>
  )
}