'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/hooks/useLanguage'
import type { JobApplication } from '@/app/dashboard/jobs/page'

interface JobFiltersProps {
  filters: {
    status: string
    riskLevel: string
    platform: string
    location: string
  }
  onFiltersChange: (filters: any) => void
  jobs: JobApplication[]
}

export function JobFilters({ filters, onFiltersChange, jobs }: JobFiltersProps) {
  const { t, locale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const statusOptions = [
    { value: 'all', label: locale === 'zh-TW' ? '全部' : 'All' },
    { value: 'applied', label: locale === 'zh-TW' ? '已投遞' : 'Applied' },
    { value: 'interview', label: locale === 'zh-TW' ? '面試中' : 'Interview' },
    { value: 'offer', label: locale === 'zh-TW' ? '已收到錄取' : 'Offer' },
    { value: 'rejected', label: locale === 'zh-TW' ? '已拒絕' : 'Rejected' },
    { value: 'withdrawn', label: locale === 'zh-TW' ? '已撤回' : 'Withdrawn' }
  ]

  const riskOptions = [
    { value: 'all', label: locale === 'zh-TW' ? '全部風險等級' : 'All Risk Levels' },
    { value: 'low', label: locale === 'zh-TW' ? '低風險' : 'Low Risk' },
    { value: 'medium', label: locale === 'zh-TW' ? '中風險' : 'Medium Risk' },
    { value: 'high', label: locale === 'zh-TW' ? '高風險' : 'High Risk' }
  ]

  // Extract unique platforms and locations from jobs
  const platforms = ['all', ...new Set(jobs.map(job => job.platform))]
  const locations = ['all', ...new Set(jobs.map(job => job.location))]

  const activeFiltersCount = Object.values(filters).filter(value => value !== 'all').length

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-surface hover:bg-hover transition-colors text-sm"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
        </svg>
        <span>{t('jobs.filters', 'Filters')}</span>
        {activeFiltersCount > 0 && (
          <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-10 p-4">
          <div className="space-y-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('jobs.status', 'Status')}
              </label>
              <select
                value={filters.status}
                onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground text-sm"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Risk Level Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('jobs.riskLevel', 'Risk Level')}
              </label>
              <select
                value={filters.riskLevel}
                onChange={(e) => onFiltersChange({ ...filters, riskLevel: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground text-sm"
              >
                {riskOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('jobs.platform', 'Platform')}
              </label>
              <select
                value={filters.platform}
                onChange={(e) => onFiltersChange({ ...filters, platform: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground text-sm"
              >
                <option value="all">{locale === 'zh-TW' ? '全部平台' : 'All Platforms'}</option>
                {platforms.slice(1).map(platform => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('jobs.location', 'Location')}
              </label>
              <select
                value={filters.location}
                onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground text-sm"
              >
                <option value="all">{locale === 'zh-TW' ? '全部地點' : 'All Locations'}</option>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={() => onFiltersChange({
                  status: 'all',
                  riskLevel: 'all', 
                  platform: 'all',
                  location: 'all'
                })}
                className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('jobs.clearFilters', 'Clear All Filters')}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Overlay to close filters */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}