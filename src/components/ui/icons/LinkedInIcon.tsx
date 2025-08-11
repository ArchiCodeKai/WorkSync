'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/hooks/useTheme'

interface LinkedInIconProps {
  size?: number
  isHovered?: boolean
  className?: string
}

export default function LinkedInIcon({ 
  size = 20, 
  isHovered = false, 
  className = '' 
}: LinkedInIconProps) {
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
        rotate: isHovered ? [0, -2, 1, 0] : 0
      }}
      transition={{
        scale: { duration: 0.2 },
        rotate: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      <motion.path
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        fill="currentColor"
        animate={{
          opacity: isHovered ? 0.8 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Subtle glow effect on hover */}
      {isHovered && (
        <motion.rect
          x="1"
          y="1"
          width="22"
          height="22"
          rx="4"
          ry="4"
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