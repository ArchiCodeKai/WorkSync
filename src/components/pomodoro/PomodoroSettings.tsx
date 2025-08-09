'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

interface PomodoroSettingsProps {
  settings: {
    workDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    sessionsUntilLongBreak: number
    soundEnabled: boolean
    notificationsEnabled: boolean
  }
  onSettingsChange: (settings: any) => void
}

export function PomodoroSettings({ settings, onSettingsChange }: PomodoroSettingsProps) {
  const { t, locale } = useLanguage()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">⚙️</span>
          {t('pomodoro.settings', 'Settings')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('pomodoro.workDuration', 'Work Duration')} (min)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.workDuration}
              onChange={(e) => onSettingsChange({...settings, workDuration: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('pomodoro.shortBreak', 'Short Break')} (min)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={settings.shortBreakDuration}
              onChange={(e) => onSettingsChange({...settings, shortBreakDuration: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('pomodoro.longBreak', 'Long Break')} (min)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.longBreakDuration}
              onChange={(e) => onSettingsChange({...settings, longBreakDuration: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {t('pomodoro.soundEnabled', 'Sound Notifications')}
            </label>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => onSettingsChange({...settings, soundEnabled: e.target.checked})}
              className="w-4 h-4"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}