'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

interface Goal {
  id: string
  title: string
  progress: number
  target: number
  unit: string
  emoji: string
  dueDate: string
}

const goals: Goal[] = [
  {
    id: '1',
    title: 'Complete React Course',
    progress: 8,
    target: 10,
    unit: 'modules',
    emoji: '⚛️',
    dueDate: '2024-01-20'
  },
  {
    id: '2', 
    title: 'Study 40 hours',
    progress: 31,
    target: 40,
    unit: 'hours',
    emoji: '📚',
    dueDate: '2024-01-31'
  },
  {
    id: '3',
    title: 'Build 3 Projects',
    progress: 1,
    target: 3,
    unit: 'projects',
    emoji: '🚀',
    dueDate: '2024-02-15'
  }
]

export function LearningGoals() {
  const { t, locale } = useLanguage()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'zh-TW' ? 'zh-TW' : 'en-US')
  }

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100
    if (percentage >= 100) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600' 
    if (percentage >= 50) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getProgressBg = (progress: number, target: number) => {
    const percentage = (progress / target) * 100
    if (percentage >= 100) return 'bg-green-500'
    if (percentage >= 80) return 'bg-blue-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          {t('learning.goals', 'Learning Goals')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = (goal.progress / goal.target) * 100
            return (
              <div key={goal.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{goal.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {goal.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className={`font-semibold ${getProgressColor(goal.progress, goal.target)}`}>
                        {goal.progress}/{goal.target} {goal.unit}
                      </span>
                      <span className="text-xs text-foreground-tertiary">
                        Due: {formatDate(goal.dueDate)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${getProgressBg(goal.progress, goal.target)}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="text-right mt-1">
                      <span className={`text-xs font-medium ${getProgressColor(goal.progress, goal.target)}`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          
          <button className="w-full text-center py-3 text-sm text-blue-600 hover:text-blue-700 font-medium border border-border rounded-lg hover:bg-hover transition-colors">
            {t('learning.addGoal', 'Add New Goal')} +
          </button>
        </div>
      </CardContent>
    </Card>
  )
}