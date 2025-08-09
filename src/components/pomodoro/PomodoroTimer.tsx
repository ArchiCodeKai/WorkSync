'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import type { PomodoroSession } from '@/app/dashboard/pomodoro/page'

interface PomodoroTimerProps {
  settings: {
    workDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    sessionsUntilLongBreak: number
    soundEnabled: boolean
    notificationsEnabled: boolean
  }
  onSessionComplete: (session: PomodoroSession) => void
  completedSessions: number
}

type TimerPhase = 'work' | 'shortBreak' | 'longBreak'
type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

export function PomodoroTimer({ settings, onSessionComplete, completedSessions }: PomodoroTimerProps) {
  const { t, locale } = useLanguage()
  
  const [phase, setPhase] = useState<TimerPhase>('work')
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/notification.mp3')
      audioRef.current.volume = 0.5
    }
  }, [])

  const getCurrentPhaseDuration = useCallback(() => {
    switch (phase) {
      case 'work':
        return settings.workDuration * 60
      case 'shortBreak':
        return settings.shortBreakDuration * 60
      case 'longBreak':
        return settings.longBreakDuration * 60
      default:
        return settings.workDuration * 60
    }
  }, [phase, settings])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getPhaseLabel = () => {
    const labels = {
      work: locale === 'zh-TW' ? '工作時間' : 'Work Time',
      shortBreak: locale === 'zh-TW' ? '短休息' : 'Short Break',
      longBreak: locale === 'zh-TW' ? '長休息' : 'Long Break'
    }
    return labels[phase]
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'work':
        return 'from-red-400 to-red-600'
      case 'shortBreak':
        return 'from-green-400 to-green-600'
      case 'longBreak':
        return 'from-blue-400 to-blue-600'
      default:
        return 'from-red-400 to-red-600'
    }
  }

  const playNotification = useCallback(() => {
    if (settings.soundEnabled && audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
    
    if (settings.notificationsEnabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(`${getPhaseLabel()} ${locale === 'zh-TW' ? '結束！' : 'Complete!'}`, {
          body: locale === 'zh-TW' ? '時間到！' : 'Time is up!',
          icon: '/favicon.ico'
        })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(`${getPhaseLabel()} ${locale === 'zh-TW' ? '結束！' : 'Complete!'}`, {
              body: locale === 'zh-TW' ? '時間到！' : 'Time is up!',
              icon: '/favicon.ico'
            })
          }
        })
      }
    }
  }, [settings.soundEnabled, settings.notificationsEnabled, phase, locale])

  const startTimer = () => {
    setStatus('running')
    setSessionStartTime(new Date())
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          completeSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const pauseTimer = () => {
    setStatus('paused')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const resetTimer = () => {
    setStatus('idle')
    setTimeLeft(getCurrentPhaseDuration())
    setSessionStartTime(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const completeSession = () => {
    setStatus('completed')
    playNotification()
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Record completed session
    const session: PomodoroSession = {
      id: Date.now().toString(),
      type: phase,
      duration: getCurrentPhaseDuration() / 60, // in minutes
      completedAt: new Date().toISOString(),
      interrupted: false
    }
    
    onSessionComplete(session)

    // Auto-advance to next phase
    setTimeout(() => {
      if (phase === 'work') {
        const shouldTakeLongBreak = (completedSessions + 1) % settings.sessionsUntilLongBreak === 0
        setPhase(shouldTakeLongBreak ? 'longBreak' : 'shortBreak')
      } else {
        setPhase('work')
      }
      setStatus('idle')
    }, 2000)
  }

  // Update timer when phase changes
  useEffect(() => {
    setTimeLeft(getCurrentPhaseDuration())
  }, [phase, getCurrentPhaseDuration])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const progress = ((getCurrentPhaseDuration() - timeLeft) / getCurrentPhaseDuration()) * 100

  return (
    <Card className={`bg-gradient-to-br ${getPhaseColor()} text-white border-0 shadow-2xl`}>
      <CardContent className="p-8">
        <div className="text-center space-y-8">
          {/* Phase Indicator */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{getPhaseLabel()}</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-white/80 text-sm">
                {locale === 'zh-TW' ? '第' : 'Session'} {completedSessions + 1}
                {locale === 'zh-TW' ? '個番茄鐘' : ''}
              </span>
            </div>
          </div>

          {/* Circular Progress Timer */}
          <div className="relative w-80 h-80 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.2"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-mono font-bold mb-2">
                  {formatTime(timeLeft)}
                </div>
                {status === 'completed' && (
                  <div className="text-xl animate-bounce">
                    {locale === 'zh-TW' ? '完成！' : 'Complete!'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {status === 'idle' && (
              <button
                onClick={startTimer}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {t('pomodoro.start', 'Start')}
              </button>
            )}
            
            {status === 'running' && (
              <button
                onClick={pauseTimer}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
                {t('pomodoro.pause', 'Pause')}
              </button>
            )}
            
            {status === 'paused' && (
              <>
                <button
                  onClick={startTimer}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {t('pomodoro.resume', 'Resume')}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('pomodoro.reset', 'Reset')}
                </button>
              </>
            )}

            {(status === 'completed' || status === 'running' || status === 'paused') && (
              <button
                onClick={resetTimer}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('pomodoro.stop', 'Stop')}
              </button>
            )}
          </div>

          {/* Next Phase Preview */}
          {phase === 'work' && status !== 'completed' && (
            <div className="text-white/70 text-sm">
              {t('pomodoro.nextPhase', 'Next')}: {
                (completedSessions + 1) % settings.sessionsUntilLongBreak === 0
                  ? (locale === 'zh-TW' ? '長休息' : 'Long Break')
                  : (locale === 'zh-TW' ? '短休息' : 'Short Break')
              }
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}