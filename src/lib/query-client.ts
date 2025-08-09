import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 分鐘
      gcTime: 10 * 60 * 1000,   // 10 分鐘
      retry: (failureCount, error: any) => {
        // 4xx 錯誤不重試
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

// 查詢鍵常數
export const queryKeys = {
  // 求職申請相關
  jobs: ['jobs'] as const,
  jobsList: (filters?: any) => [...queryKeys.jobs, 'list', filters] as const,
  jobDetail: (id: string) => [...queryKeys.jobs, 'detail', id] as const,
  jobStats: (period?: string) => [...queryKeys.jobs, 'stats', period] as const,
  
  // 心情記錄相關
  mood: ['mood'] as const,
  moodList: (filters?: any) => [...queryKeys.mood, 'list', filters] as const,
  moodStats: (period?: string) => [...queryKeys.mood, 'stats', period] as const,
  moodTrends: (period?: string) => [...queryKeys.mood, 'trends', period] as const,
  
  // 番茄鐘相關
  pomodoro: ['pomodoro'] as const,
  pomodoroHistory: (date?: string) => [...queryKeys.pomodoro, 'history', date] as const,
  pomodoroStats: (period?: string) => [...queryKeys.pomodoro, 'stats', period] as const,
  
  // 學習記錄相關
  learning: ['learning'] as const,
  learningList: (filters?: any) => [...queryKeys.learning, 'list', filters] as const,
  learningStats: (period?: string) => [...queryKeys.learning, 'stats', period] as const,
  
  // Dashboard 相關
  dashboard: ['dashboard'] as const,
  dashboardStats: (period?: string) => [...queryKeys.dashboard, 'stats', period] as const,
  dashboardOverview: ['dashboard', 'overview'] as const,
  
  // 使用者相關
  user: ['user'] as const,
  userProfile: ['user', 'profile'] as const,
} as const

// 查詢鍵工具函數
export const invalidateQueries = {
  // 使所有求職相關查詢失效
  jobs: () => queryClient.invalidateQueries({ queryKey: queryKeys.jobs }),
  
  // 使所有心情相關查詢失效
  mood: () => queryClient.invalidateQueries({ queryKey: queryKeys.mood }),
  
  // 使所有番茄鐘相關查詢失效
  pomodoro: () => queryClient.invalidateQueries({ queryKey: queryKeys.pomodoro }),
  
  // 使所有學習相關查詢失效
  learning: () => queryClient.invalidateQueries({ queryKey: queryKeys.learning }),
  
  // 使 Dashboard 相關查詢失效
  dashboard: () => queryClient.invalidateQueries({ queryKey: queryKeys.dashboard }),
  
  // 使所有統計相關查詢失效
  allStats: () => {
    queryClient.invalidateQueries({ 
      predicate: (query) => 
        query.queryKey.some(key => typeof key === 'string' && key.includes('stats'))
    })
  },
}

// 預載入工具函數
export const prefetchQueries = {
  jobDetail: async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.jobDetail(id),
      queryFn: () => fetch(`/api/jobs/${id}`).then(res => res.json()),
      staleTime: 30 * 1000, // 30 秒
    })
  },
  
  dashboardStats: async (period?: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboardStats(period),
      queryFn: () => fetch(`/api/dashboard/stats?period=${period || 'month'}`).then(res => res.json()),
      staleTime: 2 * 60 * 1000, // 2 分鐘
    })
  },
}