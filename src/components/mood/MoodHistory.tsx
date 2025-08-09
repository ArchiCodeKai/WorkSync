'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

// Mock data for mood history - 將來會從 API 獲取
const moodHistory = [
  { date: '2024-01-15', mood: 'motivated', value: 4 },
  { date: '2024-01-14', mood: 'happy', value: 4 },
  { date: '2024-01-13', mood: 'very_happy', value: 5 },
  { date: '2024-01-12', mood: 'neutral', value: 3 },
  { date: '2024-01-11', mood: 'stressed', value: 2 },
  { date: '2024-01-10', mood: 'sad', value: 2 },
  { date: '2024-01-09', mood: 'neutral', value: 3 },
  { date: '2024-01-08', mood: 'happy', value: 4 },
  { date: '2024-01-07', mood: 'motivated', value: 4 },
  { date: '2024-01-06', mood: 'very_happy', value: 5 },
  { date: '2024-01-05', mood: 'happy', value: 4 },
  { date: '2024-01-04', mood: 'neutral', value: 3 },
  { date: '2024-01-03', mood: 'stressed', value: 2 },
  { date: '2024-01-02', mood: 'happy', value: 4 }
]

const moodEmojis: Record<string, string> = {
  very_happy: '😄',
  happy: '😊',
  motivated: '💪',
  neutral: '😐',
  sad: '😞',
  stressed: '😫',
  tired: '😴',
  confused: '🤔'
}

export function MoodHistory() {
  const { t, locale } = useLanguage()

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'very_happy':
      case 'happy':
        return 'bg-green-500'
      case 'motivated':
        return 'bg-blue-500'
      case 'neutral':
        return 'bg-gray-400'
      case 'sad':
      case 'stressed':
        return 'bg-red-500'
      case 'tired':
        return 'bg-orange-500'
      case 'confused':
        return 'bg-purple-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getBarHeight = (value: number) => {
    return `${(value / 5) * 100}%`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          {t('mood.history', 'Mood History')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="h-32 flex items-end justify-between gap-1">
            {moodHistory.slice(0, 14).map((entry, index) => (
              <div key={entry.date} className="flex flex-col items-center gap-1 flex-1">
                <div className="relative w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-t">
                  <div
                    className={`absolute bottom-0 w-full rounded-t transition-all duration-300 ${getMoodColor(entry.mood)}`}
                    style={{ height: getBarHeight(entry.value) }}
                  />
                </div>
                <div className="text-xs text-foreground-tertiary">
                  {new Date(entry.date).getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-foreground-secondary">
                {locale === 'zh-TW' ? '開心' : 'Happy'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-foreground-secondary">
                {locale === 'zh-TW' ? '有動力' : 'Motivated'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className="text-foreground-secondary">
                {locale === 'zh-TW' ? '普通' : 'Neutral'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-foreground-secondary">
                {locale === 'zh-TW' ? '低落' : 'Low'}
              </span>
            </div>
          </div>

          {/* Average Mood */}
          <div className="mt-4 p-3 bg-hover rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {t('mood.weekAverage', 'This week average')}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg">😊</span>
                <span className="text-sm font-semibold text-foreground">3.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}