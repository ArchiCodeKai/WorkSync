'use client'

import { ReactNode } from 'react'
import { Navigation, MobileNavigation } from './Navigation'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:h-screen">
        {/* Sidebar */}
        <div className="flex w-64 flex-col">
          <div className="flex flex-col overflow-y-auto border-r border-border bg-surface pt-6 pb-4">
            <div className="flex flex-shrink-0 items-center px-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💼</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">
                  WorkSync
                </h1>
              </div>
            </div>
            <div className="mt-5 flex flex-1 flex-col px-4">
              <Navigation />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Header />
        <main className="p-4 pb-20">
          {children}
        </main>
        <MobileNavigation />
      </div>
    </div>
  )
}