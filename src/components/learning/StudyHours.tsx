'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

// Mock data for study hours
const studyData = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 2.0 },
  { day: 'Wed', hours: 4.5 },
  { day: 'Thu', hours: 1.5 },
  { day: 'Fri', hours: 6.0 },
  { day: 'Sat', hours: 8.0 },
  { day: 'Sun', hours: 5.5 }
]

export function StudyHours() {
  const { t, locale } = useLanguage()
  
  const maxHours = Math.max(...studyData.map(d => d.hours))
  const totalHours = studyData.reduce((sum, d) => sum + d.hours, 0)

  const getDayName = (day: string) => {
    const days = {
      'Mon': locale === 'zh-TW' ? '週一' : 'Mon',
      'Tue': locale === 'zh-TW' ? '週二' : 'Tue',
      'Wed': locale === 'zh-TW' ? '週三' : 'Wed',
      'Thu': locale === 'zh-TW' ? '週四' : 'Thu',
      'Fri': locale === 'zh-TW' ? '週五' : 'Fri',
      'Sat': locale === 'zh-TW' ? '週六' : 'Sat',
      'Sun': locale === 'zh-TW' ? '週日' : 'Sun'
    }
    return days[day as keyof typeof days] || day
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            {t('learning.studyHours', 'Study Hours This Week')}
          </CardTitle>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{totalHours.toFixed(1)}</p>
            <p className="text-xs text-foreground-secondary">{t('learning.totalHours', 'Total Hours')}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Bar Chart */}
          <div className="h-40 flex items-end justify-between gap-2">
            {studyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-t">
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-500"
                    style={{ height: `${(data.hours / maxHours) * 100}%` }}
                  />
                  <div className="absolute top-1 left-0 right-0 text-center">
                    <span className="text-xs font-semibold text-white bg-black/20 px-1 rounded">
                      {data.hours}h
                    </span>
                  </div>
                </div>
                <span className="text-xs text-foreground-secondary font-medium">
                  {getDayName(data.day)}
                </span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{Math.max(...studyData.map(d => d.hours))}h</p>
              <p className="text-xs text-foreground-secondary">{t('learning.bestDay', 'Best Day')}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{(totalHours / 7).toFixed(1)}h</p>
              <p className="text-xs text-foreground-secondary">{t('learning.avgDaily', 'Avg Daily')}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-green-600">+12%</p>
              <p className="text-xs text-foreground-secondary">{t('learning.vsLastWeek', 'vs Last Week')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}