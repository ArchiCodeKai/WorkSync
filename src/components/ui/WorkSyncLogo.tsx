'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/hooks/useTheme'

interface WorkSyncLogoProps {
  size?: number
  showText?: boolean
  animationSpeed?: number
  rotationSpeed?: number
}

export default function WorkSyncLogo({
  size = 200,
  showText = true,
  animationSpeed = 2,
  rotationSpeed = 10,
}: WorkSyncLogoProps) {
  const { theme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [sweepPosition, setSweepPosition] = useState(-100)
  const containerRef = useRef<HTMLDivElement | null>(null)
  
  // Determine colors based on theme
  const logoColor = theme === 'dark' ? '#ffffff' : '#000000'

  useEffect(() => {
    if (isHovered) {
      setSweepPosition(100)
    } else {
      setSweepPosition(-100)
    }
  }, [isHovered])

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size / (showText ? 3 : 1) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
    >
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
          style={{
            width: showText ? size / 3 : size,
            height: showText ? size / 3 : size,
          }}
        >
          {/* Main twisted ring shape - Framer Motion rotation */}
          <motion.g
            animate={
              isHovered ? { rotate: 0 } : { rotate: 360 }
            }
            transition={{
              duration: rotationSpeed,
              repeat: isHovered ? 0 : Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "center" }}
          >
            {/* Single ring with pulsing stroke */}
            <circle
              cx="100"
              cy="100"
              r="32"
              fill="none"
              stroke={logoColor}
              strokeWidth="9"
              className="logo-ring-pulse"
            />
          </motion.g>

          {/* Central W letter - Rounded modern sans-serif */}
          <text
            x="100"
            y="108"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontFamily: '"Nunito", "Poppins", "Inter", "SF Pro Rounded", "Comfortaa", "Ubuntu", sans-serif',
              fontSize: '50px',
              fontWeight: '600',
              letterSpacing: '-0.02em'
            }}
            fill={logoColor}
            className="select-none"
          >
            W
          </text>

          {/* Light sweep effect definitions */}
          <defs>
            <linearGradient
              id={`sweepGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="rgba(255,255,255,0)"
              />
              <stop
                offset="50%"
                stopColor="rgba(255,255,255,0.8)"
              />
              <stop
                offset="100%"
                stopColor="rgba(255,255,255,0)"
              />
            </linearGradient>
            <mask id={`sweepMask-${size}`}>
              <motion.rect
                x="-50"
                y="0"
                width="300"
                height="200"
                fill={`url(#sweepGradient-${size})`}
                initial={{ x: -300 }}
                animate={{ x: sweepPosition * 3 }}
                transition={{
                  duration: animationSpeed,
                  ease: "easeInOut",
                }}
              />
            </mask>
          </defs>

          {/* Shine overlay */}
          <rect
            x="0"
            y="0"
            width="200"
            height="200"
            fill="white"
            fillOpacity="0.3"
            mask={`url(#sweepMask-${size})`}
          />


        </svg>
      </div>

      {showText && (
        <div
          className="ml-5 text-foreground"
          style={{ fontSize: size / 7 }}
        >
          <span className="font-sans font-normal">Work</span>
          <span className="font-sans font-bold">Sync</span>
        </div>
      )}
    </div>
  )
}