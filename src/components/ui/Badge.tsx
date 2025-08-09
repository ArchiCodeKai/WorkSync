import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-full font-medium'
    
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800', 
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      secondary: 'bg-purple-100 text-purple-800',
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

// 專用的狀態徽章組件
interface StatusBadgeProps {
  status: string
  className?: string
}

export const JobStatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    APPLIED: { variant: 'info' as const, label: '已投遞' },
    SCREENING: { variant: 'warning' as const, label: '篩選中' },
    INTERVIEW_SCHEDULED: { variant: 'secondary' as const, label: '面試安排' },
    INTERVIEW_COMPLETED: { variant: 'info' as const, label: '面試完成' },
    OFFER_RECEIVED: { variant: 'success' as const, label: '收到 Offer' },
    REJECTED: { variant: 'error' as const, label: '被拒絕' },
    WITHDRAWN: { variant: 'default' as const, label: '已撤回' },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'default' as const, label: status }

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  )
}

export const PriorityBadge = ({ priority, className }: { priority: string; className?: string }) => {
  const priorityConfig = {
    LOW: { variant: 'default' as const, label: '低' },
    MEDIUM: { variant: 'warning' as const, label: '中' },
    HIGH: { variant: 'error' as const, label: '高' },
    URGENT: { variant: 'error' as const, label: '緊急' },
  }

  const config = priorityConfig[priority as keyof typeof priorityConfig] || { variant: 'default' as const, label: priority }

  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {config.label}
    </Badge>
  )
}