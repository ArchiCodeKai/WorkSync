'use client'

import { Card } from '@/components/ui'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: string
  trend?: 'up' | 'down' | 'neutral'
  color?: 'blue' | 'purple' | 'green' | 'red' | 'orange'
  className?: string
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend = 'neutral',
  color = 'blue',
  className
}: StatsCardProps) {
  const colorVariants = {
    blue: {
      value: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-500'
    },
    purple: {
      value: 'text-purple-600 dark:text-purple-400', 
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      icon: 'text-purple-500'
    },
    green: {
      value: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20', 
      icon: 'text-green-500'
    },
    red: {
      value: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'text-red-500'
    },
    orange: {
      value: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      icon: 'text-orange-500'
    }
  }

  const trendIcons = {
    up: '↗️',
    down: '↘️',
    neutral: ''
  }

  return (
    <Card className={cn(
      'p-6 hover:shadow-lg transition-all duration-200 border-0 shadow-sm',
      colorVariants[color].bg,
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn('text-2xl', colorVariants[color].icon)}>{icon}</span>
            <p className="text-sm font-medium text-foreground-secondary">{title}</p>
          </div>
          <div className="space-y-1">
            <p className={cn('text-3xl font-bold', colorVariants[color].value)}>
              {value}
            </p>
            <div className="flex items-center gap-1">
              {trend !== 'neutral' && (
                <span className="text-sm">{trendIcons[trend]}</span>
              )}
              <p className="text-sm text-foreground-tertiary">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}