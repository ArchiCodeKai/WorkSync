'use client'

import { Card, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import type { JobApplication } from '@/app/dashboard/jobs/page'

interface JobStatsProps {
  jobs: JobApplication[]
}

export function JobStats({ jobs }: JobStatsProps) {
  const { t } = useLanguage()

  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === 'applied').length,
    interview: jobs.filter(job => job.status === 'interview').length,
    offers: jobs.filter(job => job.status === 'offer').length,
    rejected: jobs.filter(job => job.status === 'rejected').length,
    responseRate: jobs.length > 0 ? Math.round((jobs.filter(job => job.status !== 'applied').length / jobs.length) * 100) : 0,
    highRisk: jobs.filter(job => job.riskLevel === 'high').length
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-foreground-secondary">{t('jobs.stats.total', 'Total Applications')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
            <p className="text-xs text-foreground-secondary">{t('jobs.stats.applied', 'Applied')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.interview}</p>
            <p className="text-xs text-foreground-secondary">{t('jobs.stats.interviews', 'Interviews')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.offers}</p>
            <p className="text-xs text-foreground-secondary">{t('jobs.stats.offers', 'Offers')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-xs text-foreground-secondary">{t('jobs.stats.rejected', 'Rejected')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.responseRate}%</p>
            <p className="text-xs text-foreground-secondary">{t('jobs.stats.responseRate', 'Response Rate')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.highRisk}</p>
            <p className="text-xs text-foreground-secondary">{t('jobs.stats.highRisk', 'High Risk')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}