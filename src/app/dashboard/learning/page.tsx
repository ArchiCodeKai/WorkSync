'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { SkillProgress } from '@/components/learning/SkillProgress'
import { StudyHours } from '@/components/learning/StudyHours'
import { LearningGoals } from '@/components/learning/LearningGoals'
import { RecentCourses } from '@/components/learning/RecentCourses'

export default function LearningPage() {
  const { t, locale } = useLanguage()
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">{t('learning.title', 'Learning Progress')}</h1>
        <p className="text-foreground-secondary mt-2">
          {t('learning.subtitle', 'Track your skill development and learning journey')} 📚
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-foreground-secondary">{t('learning.skillsLearning', 'Skills Learning')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">⏰</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">47.5</p>
                <p className="text-sm text-foreground-secondary">{t('learning.hoursThisWeek', 'Hours This Week')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-foreground-secondary">{t('learning.completedCourses', 'Completed Courses')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Progress */}
          <SkillProgress />
          
          {/* Study Hours Chart */}
          <StudyHours />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Learning Goals */}
          <LearningGoals />
          
          {/* Recent Courses */}
          <RecentCourses />
        </div>
      </div>
    </div>
  )
}