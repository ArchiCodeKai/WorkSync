'use client'

import { useLanguage } from '@/lib/hooks/useLanguage'

interface MoodOption {
  emoji: string
  value: string
  label: Record<string, string>
}

const moodOptions: MoodOption[] = [
  {
    emoji: '😄',
    value: 'very_happy',
    label: { 'zh-TW': '非常開心', 'en': 'Very Happy' }
  },
  {
    emoji: '😊',
    value: 'happy',
    label: { 'zh-TW': '開心', 'en': 'Happy' }
  },
  {
    emoji: '😐',
    value: 'neutral',
    label: { 'zh-TW': '普通', 'en': 'Neutral' }
  },
  {
    emoji: '😞',
    value: 'sad',
    label: { 'zh-TW': '難過', 'en': 'Sad' }
  },
  {
    emoji: '😫',
    value: 'stressed',
    label: { 'zh-TW': '壓力大', 'en': 'Stressed' }
  },
  {
    emoji: '💪',
    value: 'motivated',
    label: { 'zh-TW': '有動力', 'en': 'Motivated' }
  },
  {
    emoji: '😴',
    value: 'tired',
    label: { 'zh-TW': '疲憊', 'en': 'Tired' }
  },
  {
    emoji: '🤔',
    value: 'confused',
    label: { 'zh-TW': '困惑', 'en': 'Confused' }
  }
]

interface MoodSelectorProps {
  selectedMood: string
  onMoodSelect: (mood: string) => void
}

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  const { locale } = useLanguage()

  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-4">
        {locale === 'zh-TW' ? '選擇你的心情' : 'Choose your mood'}
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {moodOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onMoodSelect(option.value)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
              selectedMood === option.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-sm'
                : 'border-border hover:border-blue-300 hover:bg-hover'
            }`}
          >
            <div className="text-2xl mb-2">{option.emoji}</div>
            <div className="text-xs font-medium text-foreground">
              {option.label[locale] || option.label['en']}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}