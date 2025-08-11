'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/hooks/useTheme'

interface WorkSyncLogoProps {
  size?: number
  showText?: boolean
  animationSpeed?: number
  rotationSpeed?: number
  variant?: 'default' | 'premium' | 'minimal'
  'aria-label'?: string
  role?: string
}

export default function WorkSyncLogo({
  size = 200,
  showText = true,
  animationSpeed = 2,
  rotationSpeed = 10,
  variant = 'premium',
  'aria-label': ariaLabel = 'WorkSync Logo',
  role = 'img'
}: WorkSyncLogoProps) {
  const { theme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  
  // Optimized theme colors with black/white system like Figma version
  const colors = useMemo(() => {
    const isDark = theme === 'dark'
    return {
      // Simple black/white primary color system
      primary: isDark ? '#ffffff' : '#000000',
      // Ring/pulse colors
      ring: {
        stroke: isDark ? '#ffffff' : '#000000',
        pulseStroke: isDark ? '#ffffff' : '#000000',
        shadow: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'
      },
      glow: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'
    }
  }, [theme])


  // Check if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div
      className="flex items-center justify-center cursor-pointer group focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg"
      style={{ width: size, height: size / (showText ? 3 : 1) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
      role={role}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-500 ease-out motion-reduce:transition-none"
          style={{
            width: showText ? size / 3 : size,
            height: showText ? size / 3 : size,
            filter: isHovered && !prefersReducedMotion ? `drop-shadow(0 0 20px ${colors.glow})` : 'none'
          }}
          role="presentation"
          aria-hidden="true"
        >
          {/* Gradient definitions */}
          <defs>
            {/* No sweep effects needed */}
          </defs>

          {/* Main infinity-like twisted loop - rotates by default, stops on hover */}
          <motion.g
            animate={{
              rotate: prefersReducedMotion ? 0 : (isHovered ? 0 : 360)
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : rotationSpeed,
              repeat: prefersReducedMotion ? 0 : (isHovered ? 0 : Infinity),
              ease: "linear"
            }}
            style={{ transformOrigin: "center" }}
          >
            {/* Continuous infinity-like twisted loop */}
            <path
              d="M100,55 
                 C130,55 145,75 145,100 
                 C145,125 130,145 100,145 
                 C70,145 55,125 55,100 
                 C55,75 70,55 100,55 
                 Z
                 M100,70 
                 C75,70 70,85 70,100 
                 C70,115 75,130 100,130 
                 C125,130 130,115 130,100 
                 C130,85 125,70 100,70 
                 Z"
              fill={colors.primary}
            />
          </motion.g>
          
          {/* Figma-style pulsing ring indicator */}
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            stroke={colors.ring.pulseStroke}
            strokeWidth="1"
            fill="transparent"
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={
              isHovered && !prefersReducedMotion
                ? {
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.9, 1, 0.9],
                  }
                : { opacity: 0.2, scale: 0.9 }
            }
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />

          {/* Extra bold W with subtle handwritten feel - perfectly centered */}
          <motion.text
            x="100"
            y="106"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontFamily: 'var(--font-kalam), var(--font-fredoka), var(--font-caveat), var(--font-comfortaa), "Cooper Black", "Nunito", "Poppins", "SF Pro Rounded", sans-serif',
              fontSize: '46px',
              fontWeight: '700',
              letterSpacing: '-0.015em',
              filter: `drop-shadow(0.5px 0.5px 1px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'})`,
              textShadow: `0.5px 0.5px 0px ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
            }}
            fill={colors.primary}
            className="select-none transition-all duration-300"
            animate={{
              scale: isHovered ? 1.02 : 1
            }}
            transition={{
              scale: { duration: 0.3 }
            }}
          >
            W
          </motion.text>



        </svg>
      </div>

      {showText && (
        <motion.div
          className="ml-5"
          style={{ 
            fontSize: size / 7,
            color: colors.primary
          }}
          animate={{
            opacity: isHovered ? 1 : 0.9,
            x: isHovered ? 2 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-sans font-normal transition-colors duration-300">
            Work
          </span>
          <span className="font-sans font-bold transition-colors duration-300">
            Sync
          </span>
        </motion.div>
      )}
    </div>
  )
}