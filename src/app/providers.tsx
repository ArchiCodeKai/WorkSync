'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { useState } from 'react'

// ✅ 自定義 Type Guard 檢查 error 是否具有 status 屬性
function hasStatus(error: unknown): error is { status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 分鐘
            gcTime: 10 * 60 * 1000,   // 10 分鐘
            retry: (failureCount, error: unknown) => {
              if (hasStatus(error)) {
                const status = error.status
                if (status >= 400 && status < 500) {
                  return false
                }
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
  )

  return (
    <SessionProvider>
      <LanguageProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </LanguageProvider>
    </SessionProvider>
  )
}
