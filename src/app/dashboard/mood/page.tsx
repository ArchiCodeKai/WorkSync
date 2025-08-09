'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { MoodSelector } from '@/components/mood/MoodSelector'
import { MoodNote } from '@/components/mood/MoodNote'
import { RecentMoods } from '@/components/mood/RecentMoods'
import { MoodHistory } from '@/components/mood/MoodHistory'
import { storage } from '@/lib/storage'

export interface MoodEntry {
  id: string
  mood: string
  note?: string
  timestamp: string
}

export default function MoodPage() {
  const { t, locale } = useLanguage()
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [note, setNote] = useState('')
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load mood entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = storage.loadMoodEntries()
    setMoodEntries(savedEntries)
    setIsLoaded(true)
  }, [])

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      storage.saveMoodEntries(moodEntries)
    }
  }, [moodEntries, isLoaded])

  const handleMoodSubmit = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        mood: selectedMood,
        note: note || undefined,
        timestamp: new Date().toISOString()
      }
      
      setMoodEntries(prev => [newEntry, ...prev])
      setSelectedMood('')
      setNote('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">{t('mood.title', 'Mood Tracker')}</h1>
        <p className="text-foreground-secondary mt-2">
          {t('mood.subtitle', 'How are you feeling today?')} 😊
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Mood Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Mood */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">🌟</span>
                {t('mood.todayMood', 'How are you feeling right now?')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <MoodSelector 
                selectedMood={selectedMood}
                onMoodSelect={setSelectedMood}
              />
              
              <MoodNote 
                note={note}
                onNoteChange={setNote}
                placeholder={t('mood.notePlaceholder', 'What made you feel this way? (optional)')}
              />
              
              <button
                onClick={handleMoodSubmit}
                disabled={!selectedMood}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
              >
                {t('mood.submit', 'Record Mood')}
              </button>
            </CardContent>
          </Card>

          {/* Mood History Chart */}
          <MoodHistory />
        </div>

        {/* Right Column - Recent Moods */}
        <div>
          <RecentMoods entries={moodEntries} />
        </div>
      </div>
    </div>
  )
}