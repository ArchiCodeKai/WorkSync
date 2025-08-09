'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import type { JobApplication } from '@/app/dashboard/jobs/page'

interface JobTableProps {
  jobs: JobApplication[]
  onJobUpdate: (id: string, updates: Partial<JobApplication>) => void
}

export function JobTable({ jobs, onJobUpdate }: JobTableProps) {
  const { t, locale } = useLanguage()
  const [sortBy, setSortBy] = useState<'date' | 'company' | 'status'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const getStatusText = (status: JobApplication['status']) => {
    const statusMap = {
      applied: locale === 'zh-TW' ? '已投遞' : 'Applied',
      interview: locale === 'zh-TW' ? '面試中' : 'Interview',
      offer: locale === 'zh-TW' ? '已錄取' : 'Offer',
      rejected: locale === 'zh-TW' ? '已拒絕' : 'Rejected',
      withdrawn: locale === 'zh-TW' ? '已撤回' : 'Withdrawn'
    }
    return statusMap[status]
  }

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
      case 'interview':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
      case 'offer':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
      case 'withdrawn':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
    }
  }

  const getRiskColor = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
    }
  }

  const getRiskText = (riskLevel?: string) => {
    const riskMap = {
      low: locale === 'zh-TW' ? '低風險' : 'Low',
      medium: locale === 'zh-TW' ? '中風險' : 'Medium',
      high: locale === 'zh-TW' ? '高風險' : 'High'
    }
    return riskLevel ? riskMap[riskLevel as keyof typeof riskMap] || riskLevel : '-'
  }

  const sortedJobs = [...jobs].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
        break
      case 'company':
        comparison = a.company.localeCompare(b.company)
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'zh-TW' ? 'zh-TW' : 'en-US')
  }

  const handleSort = (field: 'date' | 'company' | 'status') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-12 text-foreground-secondary">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2 text-foreground">{t('jobs.noResults', 'No jobs found')}</h3>
            <p className="text-sm">{t('jobs.noResultsDesc', 'Try adjusting your search or filters')}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{t('jobs.applicationList', 'Job Applications')}</CardTitle>
          <span className="text-sm text-foreground-secondary">
            {jobs.length} {t('jobs.results', 'results')}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-foreground-secondary border-b border-border">
                <th className="pb-3 font-medium">
                  <button 
                    onClick={() => handleSort('company')}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    {t('jobs.table.job', 'JOB')}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </th>
                <th className="pb-3 font-medium">
                  <button 
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    {t('jobs.table.status', 'STATUS')}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </th>
                <th className="pb-3 font-medium">{t('jobs.table.risk', 'RISK')}</th>
                <th className="pb-3 font-medium">{t('jobs.table.platform', 'PLATFORM')}</th>
                <th className="pb-3 font-medium">{t('jobs.table.salary', 'SALARY')}</th>
                <th className="pb-3 font-medium">
                  <button 
                    onClick={() => handleSort('date')}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    {t('jobs.table.date', 'DATE')}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </th>
                <th className="pb-3 font-medium">{t('jobs.table.actions', 'ACTIONS')}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sortedJobs.map((job) => (
                <tr key={job.id} className="border-b border-border/50 hover:bg-hover">
                  <td className="py-4">
                    <div>
                      <div className="font-medium text-foreground">{job.jobTitle}</div>
                      <div className="text-foreground-secondary text-xs">{job.company} • {job.location}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {getStatusText(job.status)}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(job.riskLevel)}`}>
                      {getRiskText(job.riskLevel)}
                    </span>
                  </td>
                  <td className="py-4 text-foreground-secondary">{job.platform}</td>
                  <td className="py-4 text-foreground-secondary">{job.salary || '-'}</td>
                  <td className="py-4 text-foreground-secondary">{formatDate(job.appliedDate)}</td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                      {t('jobs.table.edit', 'Edit')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}