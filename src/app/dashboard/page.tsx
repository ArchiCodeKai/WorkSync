'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { DailyMotivationCard } from '@/components/dashboard/DailyMotivationCard'
import { JobSearchGoal } from '@/components/dashboard/JobSearchGoal'
import { AIRecommendations } from '@/components/dashboard/AIRecommendations'

export default function DashboardPage() {
  const { t, locale } = useLanguage()
  
  // Mock data - 這些數據將來會從 API 獲取
  const stats = {
    applications: { value: 12, subtitle: locale === 'zh-TW' ? '+3 本週新增' : '+3 this week' },
    interviews: { value: 4, subtitle: locale === 'zh-TW' ? '+1 本週新增' : '+1 this week' },
    offers: { value: 1, subtitle: locale === 'zh-TW' ? '本週新增！' : 'New this week!' },
    rejections: { value: 7, subtitle: locale === 'zh-TW' ? '30% 回覆率' : '30% response rate' }
  }
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.welcome')}</h1>
        <p className="text-foreground-secondary mt-2">
          {t('dashboard.subtitle')} 📊✨
        </p>
      </div>

      {/* Stats Grid - 與 Figma 設計一致 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Applications"
          value={stats.applications.value}
          subtitle={stats.applications.subtitle}
          icon="📝"
          color="blue"
          trend="up"
        />
        <StatsCard
          title="Interviews" 
          value={stats.interviews.value}
          subtitle={stats.interviews.subtitle}
          icon="🗣️"
          color="purple"
          trend="up"
        />
        <StatsCard
          title="Offers"
          value={stats.offers.value}
          subtitle={stats.offers.subtitle}
          icon="🎉"
          color="green"
          trend="neutral"
        />
        <StatsCard
          title="Rejections"
          value={stats.rejections.value}
          subtitle={stats.rejections.subtitle}
          icon="📊"
          color="red"
          trend="neutral"
        />
      </div>

      {/* Daily Motivation - 漸層卡片 */}
      <DailyMotivationCard />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions & Goal */}
        <div className="space-y-6">
          {/* Job Search Goal */}
          <JobSearchGoal
            target={5}
            current={3}
            timeframe={locale === 'zh-TW' ? '本週' : 'this week'}
          />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-hover transition-colors flex items-center gap-3">
                <span className="text-blue-500">➕</span>
                <div>
                  <div className="font-medium text-foreground text-sm">Add Job</div>
                  <div className="text-xs text-foreground-secondary">Record new application</div>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-hover transition-colors flex items-center gap-3">
                <span className="text-purple-500">📅</span>
                <div>
                  <div className="font-medium text-foreground text-sm">Track Interview</div>
                  <div className="text-xs text-foreground-secondary">Schedule or update interview</div>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-hover transition-colors flex items-center gap-3">
                <span className="text-green-500">📊</span>
                <div>
                  <div className="font-medium text-foreground text-sm">Update Skills</div>
                  <div className="text-xs text-foreground-secondary">Add new skills to profile</div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - AI Recommendations */}
        <div className="lg:col-span-2">
          <AIRecommendations />
        </div>
      </div>

      {/* Recent Applications Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>Recent Applications</CardTitle>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all →
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-foreground-secondary border-b border-border">
                  <th className="pb-3 font-medium">JOB TITLE</th>
                  <th className="pb-3 font-medium">COMPANY</th>
                  <th className="pb-3 font-medium">STATUS</th>
                  <th className="pb-3 font-medium">DATE</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">Senior Frontend Developer</td>
                  <td className="py-3 text-foreground-secondary">TechCorp</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                      Applied
                    </span>
                  </td>
                  <td className="py-3 text-foreground-secondary">2023-06-15</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">React Developer</td>
                  <td className="py-3 text-foreground-secondary">StartupXYZ</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium">
                      Interview
                    </span>
                  </td>
                  <td className="py-3 text-foreground-secondary">2023-06-12</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-foreground">Full Stack Developer</td>
                  <td className="py-3 text-foreground-secondary">WebCorp</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                      Offer
                    </span>
                  </td>
                  <td className="py-3 text-foreground-secondary">2023-06-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}