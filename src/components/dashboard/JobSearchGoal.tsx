'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { cn } from '@/lib/utils'

interface JobSearchGoalProps {
  target: number
  current: number
  timeframe: string
}

export function JobSearchGoal({ 
  target = 5, 
  current = 3, 
  timeframe = 'this week' 
}: JobSearchGoalProps) {
  const { t } = useLanguage()
  const percentage = Math.min((current / target) * 100, 100)
  const isCompleted = current >= target
  
  return (
    <Card className="border-l-4 border-l-red-500 bg-surface">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🎯</span>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Job Search Goal</h3>
            <p className="text-sm text-foreground-secondary">
              {current} applications {timeframe}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground-secondary">Progress</span>
            <span className={cn(
              'font-medium',
              isCompleted ? 'text-green-600' : 'text-blue-600'
            )}>
              {current}/{target}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={cn(
                'h-2 rounded-full transition-all duration-500',
                isCompleted 
                  ? 'bg-green-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              )}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-foreground-tertiary">
              {Math.round(percentage)}% complete
            </span>
            {isCompleted && (
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                ✅ Goal achieved!
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}