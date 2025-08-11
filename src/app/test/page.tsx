'use client'

import { useTheme } from '@/lib/hooks/useTheme'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { Button } from '@/components/ui/Button'

export default function TestPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { locale, setLocale, t } = useLanguage()

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Test Page</h1>
      
      {/* Theme Testing */}
      <div className="p-4 border border-border rounded-lg bg-surface">
        <h2 className="text-lg font-semibold mb-4">Theme Testing</h2>
        <p>Current theme: <strong>{theme}</strong></p>
        <p>Resolved theme: <strong>{resolvedTheme}</strong></p>
        <div className="flex gap-2 mt-2">
          <Button onClick={() => setTheme('light')}>Light</Button>
          <Button onClick={() => setTheme('dark')}>Dark</Button>
          <Button onClick={() => setTheme('light')}>System (Light)</Button>
        </div>
      </div>

      {/* Language Testing */}
      <div className="p-4 border border-border rounded-lg bg-surface">
        <h2 className="text-lg font-semibold mb-4">Language Testing</h2>
        <p>Current locale: <strong>{locale}</strong></p>
        <p>Test translation: <strong>{t('dashboard.welcome')}</strong></p>
        <div className="flex gap-2 mt-2">
          <Button onClick={() => setLocale('zh-TW')}>中文</Button>
          <Button onClick={() => setLocale('en')}>English</Button>
        </div>
      </div>

      {/* Visual Testing */}
      <div className="p-4 border border-border rounded-lg bg-surface">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Visual Testing</h2>
        <p className="text-foreground-secondary">Secondary text color</p>
        <p className="text-foreground-tertiary">Tertiary text color</p>
        <div className="mt-4 p-3 bg-primary text-primary-foreground rounded">
          Primary background with text
        </div>
        <div className="mt-2 p-3 bg-surface-secondary text-foreground rounded">
          Secondary surface with text  
        </div>
      </div>
    </div>
  )
}