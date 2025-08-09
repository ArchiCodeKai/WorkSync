import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isToday, isYesterday, startOfWeek, endOfWeek } from 'date-fns'
import { zhTW } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 日期格式化工具
export const dateUtils = {
  format: (date: Date | string, pattern = 'yyyy/MM/dd') => {
    const d = typeof date === 'string' ? new Date(date) : date
    return format(d, pattern, { locale: zhTW })
  },
  
  formatRelative: (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    if (isToday(d)) return '今天'
    if (isYesterday(d)) return '昨天'
    return formatDistanceToNow(d, { addSuffix: true, locale: zhTW })
  },
  
  formatDateTime: (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return format(d, 'yyyy/MM/dd HH:mm', { locale: zhTW })
  },
  
  daysSince: (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - d.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  },
  
  isOverdue: (date: Date | string, days = 14) => {
    return dateUtils.daysSince(date) > days
  },
  
  getWeekRange: (date = new Date()) => ({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 })
  })
}

// 統計計算工具
export const statsUtils = {
  calculateResponseRate: (total: number, responses: number) => {
    if (total === 0) return 0
    return Math.round((responses / total) * 100)
  },
  
  calculateTrend: (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 'up' : 'stable'
    const change = ((current - previous) / previous) * 100
    if (change > 5) return 'up'
    if (change < -5) return 'down'
    return 'stable'
  },
  
  getAverageScore: (scores: number[]) => {
    if (scores.length === 0) return 0
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length * 10) / 10
  }
}

// 顏色主題工具
export const colorUtils = {
  getMoodColor: (score: number) => {
    const colors = {
      1: '#ef4444', // 紅色 - 很糟
      2: '#f97316', // 橙色 - 糟糕  
      3: '#f59e0b', // 黃色 - 不佳
      4: '#eab308', // 黃綠 - 還可以
      5: '#84cc16', // 綠黃 - 普通
      6: '#22c55e', // 綠色 - 不錯
      7: '#10b981', // 翠綠 - 好
      8: '#06b6d4', // 青色 - 很好
      9: '#3b82f6', // 藍色 - 很棒
      10: '#8b5cf6', // 紫色 - 極棒
    }
    return colors[score as keyof typeof colors] || '#6b7280'
  },
  
  getJobStatusColor: (status: string) => {
    const colors = {
      APPLIED: '#8b5cf6',
      SCREENING: '#f59e0b', 
      INTERVIEW_SCHEDULED: '#3b82f6',
      INTERVIEW_COMPLETED: '#06b6d4',
      OFFER_RECEIVED: '#10b981',
      REJECTED: '#ef4444',
      WITHDRAWN: '#6b7280',
    }
    return colors[status as keyof typeof colors] || '#6b7280'
  },
  
  getPriorityColor: (priority: string) => {
    const colors = {
      LOW: '#6b7280',
      MEDIUM: '#f59e0b',
      HIGH: '#ef4444',
      URGENT: '#dc2626',
    }
    return colors[priority as keyof typeof colors] || '#6b7280'
  }
}

// 勵志語錄
export const motivationalQuotes = [
  '每一次被拒絕，都讓你更接近那個會要你的公司。',
  '求職就像約會，你只需要找到一個對的就夠了。',
  '今天的拒絕是為了明天更好的機會讓路。',
  '你的價值不會因為一封拒絕信而減少。',
  '最好的工作機會往往在最不期待的時候出現。',
  '保持初心，機會總會來的。',
  '每個大師都曾經是初學者。',
]

export const getRandomQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
}

// 格式化工具
export const formatUtils = {
  currency: (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    }).format(num)
  },
  
  duration: (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}時${mins}分`
    }
    return `${mins}分鐘`
  },
  
  percentage: (value: number, total: number) => {
    if (total === 0) return '0%'
    return `${Math.round((value / total) * 100)}%`
  }
}