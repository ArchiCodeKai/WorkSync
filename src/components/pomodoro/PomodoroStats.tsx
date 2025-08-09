'use client'

import { Card, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

interface PomodoroStatsProps {
  completedSessions: number
  totalFocusTime: number
  todayGoal: number
}

export function PomodoroStats({ completedSessions, totalFocusTime, todayGoal }: PomodoroStatsProps) {
  const { t } = useLanguage()

  const progressPercentage = Math.min((completedSessions / todayGoal) * 100, 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <span className="text-xl">🍅</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedSessions}</p>
              <p className="text-sm text-foreground-secondary">{t('pomodoro.completedSessions', 'Completed Sessions')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalFocusTime}</p>
              <p className="text-sm text-foreground-secondary">{t('pomodoro.focusMinutes', 'Focus Minutes')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-foreground-secondary">{t('pomodoro.dailyGoal', 'Daily Goal')}</p>
                <p className="text-sm font-semibold text-foreground">{completedSessions}/{todayGoal}</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}