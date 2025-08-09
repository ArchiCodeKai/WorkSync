'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { 
  HomeIcon, 
  BriefcaseIcon, 
  ChartBarIcon, 
  ClockIcon, 
  FaceSmileIcon 
} from '@heroicons/react/24/outline'

export function Navigation() {
  const pathname = usePathname()
  const { t } = useLanguage()
  
  const navigation = [
    { name: t('nav.dashboard', 'Dashboard'), href: '/dashboard', icon: HomeIcon },
    { name: t('nav.jobs', 'Jobs'), href: '/dashboard/jobs', icon: BriefcaseIcon },
    { name: t('nav.learning', 'Learning'), href: '/dashboard/learning', icon: ChartBarIcon },
    { name: t('nav.pomodoro', 'Pomodoro'), href: '/dashboard/pomodoro', icon: ClockIcon },
    { name: t('nav.mood', 'Mood'), href: '/dashboard/mood', icon: FaceSmileIcon },
  ]

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <item.icon
              className={cn(
                'mr-3 h-5 w-5 flex-shrink-0',
                isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()
  
  const navigation = [
    { name: t('nav.dashboard', 'Dashboard'), href: '/dashboard', icon: HomeIcon },
    { name: t('nav.jobs', 'Jobs'), href: '/dashboard/jobs', icon: BriefcaseIcon },
    { name: t('nav.learning', 'Learning'), href: '/dashboard/learning', icon: ChartBarIcon },
    { name: t('nav.pomodoro', 'Pomodoro'), href: '/dashboard/pomodoro', icon: ClockIcon },
    { name: t('nav.mood', 'Mood'), href: '/dashboard/mood', icon: FaceSmileIcon },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-1 text-xs',
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500'
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}