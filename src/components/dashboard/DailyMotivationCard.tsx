'use client'

import { Card } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'

const motivationalQuotes = {
  'zh-TW': [
    {
      quote: '唯一偉大工作的方式是喜愛你所做的事',
      author: 'Steve Jobs',
      icon: '💪'
    },
    {
      quote: '每一次被拒絕，都讓你更接近那個會要你的公司',
      author: 'WorkSync',
      icon: '🚀'
    },
    {
      quote: '成功是從失敗走向失敗而不失去熱忱',
      author: 'Winston Churchill',
      icon: '🔥'
    }
  ],
  'en': [
    {
      quote: 'The only way to do great work is to love what you do',
      author: 'Steve Jobs',
      icon: '💪'
    },
    {
      quote: 'Every rejection brings you closer to the company that will want you',
      author: 'WorkSync',
      icon: '🚀'
    },
    {
      quote: 'Success is going from failure to failure without losing enthusiasm',
      author: 'Winston Churchill',
      icon: '🔥'
    }
  ]
}

export function DailyMotivationCard() {
  const { locale } = useLanguage()
  
  // Get random quote based on current day to ensure consistency
  const today = new Date().getDate()
  const quotes = motivationalQuotes[locale as keyof typeof motivationalQuotes] || motivationalQuotes['zh-TW']
  const todayQuote = quotes[today % quotes.length]

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      {/* Content */}
      <div className="relative p-6 text-white">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">{todayQuote.icon}</span>
          <h3 className="text-lg font-semibold">Daily Motivation</h3>
        </div>
        
        <blockquote className="text-lg font-medium leading-relaxed mb-3">
          "{todayQuote.quote}"
        </blockquote>
        
        <p className="text-sm text-white/80">
          - {todayQuote.author}
        </p>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <div className="w-16 h-16 rounded-full bg-white/10"></div>
        </div>
        <div className="absolute bottom-4 right-8 opacity-10">
          <div className="w-8 h-8 rounded-full bg-white/20"></div>
        </div>
      </div>
    </Card>
  )
}