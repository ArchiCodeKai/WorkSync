'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { PomodoroTimer } from '@/components/pomodoro/PomodoroTimer'
import { PomodoroStats } from '@/components/pomodoro/PomodoroStats'
import { PomodoroHistory } from '@/components/pomodoro/PomodoroHistory'
import { PomodoroSettings } from '@/components/pomodoro/PomodoroSettings'

export interface PomodoroSession {
  id: string
  type: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  completedAt: string
  interrupted: boolean
}

export default function PomodoroPage() {
  const { t, locale } = useLanguage()
  const [sessions, setSessions] = useState<PomodoroSession[]>([])
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
    soundEnabled: true,
    notificationsEnabled: true
  })

  const handleSessionComplete = (session: PomodoroSession) => {
    setSessions(prev => [session, ...prev])
  }

  const todaysSessions = sessions.filter(session => {
    const today = new Date().toDateString()
    const sessionDate = new Date(session.completedAt).toDateString()
    return today === sessionDate
  })

  const completedWorkSessions = todaysSessions.filter(
    session => session.type === 'work' && !session.interrupted
  ).length

  const totalFocusTime = todaysSessions
    .filter(session => session.type === 'work' && !session.interrupted)
    .reduce((total, session) => total + session.duration, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">{t('pomodoro.title', 'Pomodoro Timer')}</h1>
        <p className="text-foreground-secondary mt-2">
          {t('pomodoro.subtitle', 'Focus timer to boost your productivity')} 🍅
        </p>
      </div>

      {/* Stats Overview */}
      <PomodoroStats 
        completedSessions={completedWorkSessions}
        totalFocusTime={totalFocusTime}
        todayGoal={8}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Timer */}
        <div className="lg:col-span-2">
          <PomodoroTimer 
            settings={settings}
            onSessionComplete={handleSessionComplete}
            completedSessions={completedWorkSessions}
          />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Settings */}
          <PomodoroSettings 
            settings={settings}
            onSettingsChange={setSettings}
          />
          
          {/* History */}
          <PomodoroHistory sessions={todaysSessions} />
        </div>
      </div>
    </div>
  )
}