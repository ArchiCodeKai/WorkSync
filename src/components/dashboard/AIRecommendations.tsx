'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

interface RecommendationItem {
  icon: string
  title: string
  description: string
  type: 'success' | 'info' | 'warning'
  matchPercentage?: number
}

const recommendations: Record<string, RecommendationItem[]> = {
  'zh-TW': [
    {
      icon: '🤖',
      title: '你的履歷匹配 85% 的 Senior Frontend Developer 職缺',
      description: '考慮增加 React Native 技能到你的技能清單',
      type: 'success',
      matchPercentage: 85
    },
    {
      icon: '📊',
      title: '你的申請回覆率高於平均水準',
      description: '繼續專注於品質申請而非數量',
      type: 'info'
    },
    {
      icon: '💡',
      title: '建議擴展技能組合',
      description: 'TypeScript 和 Next.js 是熱門需求技能',
      type: 'info'
    }
  ],
  'en': [
    {
      icon: '🤖',
      title: 'Your resume matches 85% of Senior Frontend Developer jobs',
      description: 'Consider adding React Native to your skills',
      type: 'success',
      matchPercentage: 85
    },
    {
      icon: '📊',
      title: 'Your application response rate is above average',
      description: 'Keep focusing on quality applications over quantity',
      type: 'info'
    },
    {
      icon: '💡',
      title: 'Skill expansion suggestions',
      description: 'TypeScript and Next.js are in high demand',
      type: 'info'
    }
  ]
}

export function AIRecommendations() {
  const { locale, t } = useLanguage()
  const items = recommendations[locale] || recommendations['en']

  const getTypeStyles = (type: RecommendationItem['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
      case 'warning':
        return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20'
      case 'info':
      default:
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
    }
  }

  return (
    <Card className="bg-surface shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`border-l-4 p-4 rounded-r-lg ${getTypeStyles(item.type)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-foreground text-sm leading-relaxed">
                    {item.title}
                  </h4>
                  {item.matchPercentage && (
                    <span className="text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full ml-2">
                      {item.matchPercentage}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* View More Button */}
        <button className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
          {t('common.viewAll')} →
        </button>
      </CardContent>
    </Card>
  )
}