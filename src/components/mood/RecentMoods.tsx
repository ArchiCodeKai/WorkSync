'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import type { MoodEntry } from '@/app/dashboard/mood/page'

interface RecentMoodsProps {
  entries: MoodEntry[]
}

const moodEmojis: Record<string, string> = {
  very_happy: '😄',
  happy: '😊',
  neutral: '😐',
  sad: '😞',
  stressed: '😫',
  motivated: '💪',
  tired: '😴',
  confused: '🤔'
}

export function RecentMoods({ entries }: RecentMoodsProps) {
  const { t, locale } = useLanguage()

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(locale === 'zh-TW' ? 'zh-TW' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return locale === 'zh-TW' ? '今天' : 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return locale === 'zh-TW' ? '昨天' : 'Yesterday'
    } else {
      return date.toLocaleDateString(locale === 'zh-TW' ? 'zh-TW' : 'en-US')
    }
  }

  // Show only the latest 5 entries
  const recentEntries = entries.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          {t('mood.recent', 'Recent Moods')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentEntries.length === 0 ? (
          <div className="text-center py-6 text-foreground-secondary">
            <div className="text-2xl mb-2">😊</div>
            <p className="text-sm">{t('mood.noEntries', 'No mood entries yet')}</p>
            <p className="text-xs mt-1">{t('mood.startTracking', 'Start tracking your mood!')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-hover border border-border"
              >
                <div className="text-2xl">{moodEmojis[entry.mood] || '😐'}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground capitalize">
                      {entry.mood.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-foreground-tertiary">
                      {formatTime(entry.timestamp)}
                    </span>
                  </div>
                  <div className="text-xs text-foreground-secondary mb-1">
                    {formatDate(entry.timestamp)}
                  </div>
                  {entry.note && (
                    <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-2">
                      {entry.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <button className="w-full text-center py-2 mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
          {t('mood.viewAll', 'View all moods')} →
        </button>
      </CardContent>
    </Card>
  )
}