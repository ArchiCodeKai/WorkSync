'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import type { PomodoroSession } from '@/app/dashboard/pomodoro/page'

interface PomodoroHistoryProps {
  sessions: PomodoroSession[]
}

export function PomodoroHistory({ sessions }: PomodoroHistoryProps) {
  const { t, locale } = useLanguage()

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'work': return '🍅'
      case 'shortBreak': return '☕'
      case 'longBreak': return '🌿'
      default: return '🍅'
    }
  }

  const getTypeText = (type: string) => {
    const types = {
      work: locale === 'zh-TW' ? '工作' : 'Work',
      shortBreak: locale === 'zh-TW' ? '短休息' : 'Short Break',
      longBreak: locale === 'zh-TW' ? '長休息' : 'Long Break'
    }
    return types[type as keyof typeof types] || type
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(locale === 'zh-TW' ? 'zh-TW' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          {t('pomodoro.todayHistory', 'Today\'s Sessions')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-6 text-foreground-secondary">
            <div className="text-2xl mb-2">🍅</div>
            <p className="text-sm">{t('pomodoro.noSessions', 'No sessions completed today')}</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center gap-3 p-2 rounded-lg bg-hover">
                <span className="text-lg">{getTypeEmoji(session.type)}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {getTypeText(session.type)}
                  </div>
                  <div className="text-xs text-foreground-secondary">
                    {session.duration} min • {formatTime(session.completedAt)}
                  </div>
                </div>
                {session.interrupted && (
                  <span className="text-xs text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">
                    {locale === 'zh-TW' ? '中斷' : 'Interrupted'}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}