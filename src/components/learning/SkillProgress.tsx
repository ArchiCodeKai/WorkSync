'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

interface Skill {
  name: string
  category: string
  progress: number
  level: string
  color: string
}

const skills: Skill[] = [
  {
    name: 'React',
    category: 'Frontend',
    progress: 85,
    level: 'Advanced',
    color: 'bg-blue-500'
  },
  {
    name: 'TypeScript',
    category: 'Programming',
    progress: 75,
    level: 'Intermediate',
    color: 'bg-purple-500'
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    progress: 70,
    level: 'Intermediate',
    color: 'bg-green-500'
  },
  {
    name: 'Node.js',
    category: 'Backend',
    progress: 60,
    level: 'Intermediate',
    color: 'bg-yellow-500'
  },
  {
    name: 'Python',
    category: 'Programming',
    progress: 55,
    level: 'Beginner',
    color: 'bg-red-500'
  },
  {
    name: 'Docker',
    category: 'DevOps',
    progress: 40,
    level: 'Beginner',
    color: 'bg-indigo-500'
  }
]

export function SkillProgress() {
  const { t, locale } = useLanguage()

  const getLevelText = (level: string) => {
    const levels = {
      'Beginner': locale === 'zh-TW' ? '初學者' : 'Beginner',
      'Intermediate': locale === 'zh-TW' ? '中級' : 'Intermediate', 
      'Advanced': locale === 'zh-TW' ? '進階' : 'Advanced'
    }
    return levels[level as keyof typeof levels] || level
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          {t('learning.skillProgress', 'Skill Progress')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{skill.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <span>{skill.category}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      skill.level === 'Advanced' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      skill.level === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                      'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                    }`}>
                      {getLevelText(skill.level)}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">{skill.progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${skill.color}`}
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
          
          <button className="w-full text-center py-3 text-sm text-blue-600 hover:text-blue-700 font-medium border border-border rounded-lg hover:bg-hover transition-colors">
            {t('learning.addSkill', 'Add New Skill')} +
          </button>
        </div>
      </CardContent>
    </Card>
  )
}