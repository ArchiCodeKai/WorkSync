'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

interface Course {
  id: string
  title: string
  provider: string
  progress: number
  status: 'in-progress' | 'completed' | 'not-started'
  thumbnail: string
  lastAccessed: string
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    provider: 'React Academy',
    progress: 75,
    status: 'in-progress',
    thumbnail: '⚛️',
    lastAccessed: '2024-01-15'
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    provider: 'TypeScript Pro',
    progress: 100,
    status: 'completed',
    thumbnail: '📘',
    lastAccessed: '2024-01-14'
  },
  {
    id: '3',
    title: 'Next.js 14 Complete Guide',
    provider: 'Next Academy',
    progress: 45,
    status: 'in-progress',
    thumbnail: '🚀',
    lastAccessed: '2024-01-13'
  },
  {
    id: '4',
    title: 'Python for Beginners',
    provider: 'Code Academy',
    progress: 0,
    status: 'not-started',
    thumbnail: '🐍',
    lastAccessed: '2024-01-10'
  }
]

export function RecentCourses() {
  const { t, locale } = useLanguage()

  const getStatusText = (status: Course['status']) => {
    const statusMap = {
      'in-progress': locale === 'zh-TW' ? '進行中' : 'In Progress',
      'completed': locale === 'zh-TW' ? '已完成' : 'Completed',
      'not-started': locale === 'zh-TW' ? '未開始' : 'Not Started'
    }
    return statusMap[status]
  }

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
      case 'not-started':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return locale === 'zh-TW' ? '今天' : 'Today'
    } else if (diffDays === 1) {
      return locale === 'zh-TW' ? '昨天' : 'Yesterday'
    } else if (diffDays < 7) {
      return locale === 'zh-TW' ? `${diffDays} 天前` : `${diffDays} days ago`
    } else {
      return date.toLocaleDateString(locale === 'zh-TW' ? 'zh-TW' : 'en-US')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📖</span>
          {t('learning.recentCourses', 'Recent Courses')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="p-3 border border-border rounded-lg hover:bg-hover transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{course.thumbnail}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-xs text-foreground-secondary mb-2">
                    {course.provider}
                  </p>
                  
                  {course.status === 'in-progress' && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-foreground-secondary">Progress</span>
                        <span className="font-medium text-foreground">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div 
                          className="h-1 bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {getStatusText(course.status)}
                    </span>
                    <span className="text-xs text-foreground-tertiary">
                      {formatDate(course.lastAccessed)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button className="w-full text-center py-3 text-sm text-blue-600 hover:text-blue-700 font-medium border border-border rounded-lg hover:bg-hover transition-colors">
            {t('learning.browseCourses', 'Browse All Courses')} →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}