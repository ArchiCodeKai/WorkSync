'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/hooks/useLanguage'
import type { JobApplication } from '@/app/dashboard/jobs/page'

interface AddJobModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (job: Omit<JobApplication, 'id'>) => void
}

export function AddJobModal({ isOpen, onClose, onSubmit }: AddJobModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    status: 'applied' as JobApplication['status'],
    salary: '',
    location: '',
    platform: '',
    notes: '',
    riskLevel: 'low' as JobApplication['riskLevel']
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.jobTitle || !formData.company) {
      return
    }
    
    onSubmit({
      ...formData,
      appliedDate: new Date().toISOString().split('T')[0]
    })
    
    // Reset form
    setFormData({
      jobTitle: '',
      company: '',
      status: 'applied',
      salary: '',
      location: '',
      platform: '',
      notes: '',
      riskLevel: 'low'
    })
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {t('jobs.addNewJob', 'Add New Job Application')}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground-secondary hover:text-foreground"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('jobs.jobTitle', 'Job Title')} *
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('jobs.company', 'Company')} *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('jobs.status', 'Status')}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as JobApplication['status']})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('jobs.riskLevel', 'Risk Level')}
              </label>
              <select
                value={formData.riskLevel}
                onChange={(e) => setFormData({...formData, riskLevel: e.target.value as JobApplication['riskLevel']})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('jobs.platform', 'Platform')}
            </label>
            <input
              type="text"
              value={formData.platform}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
              placeholder="LinkedIn, 104, CakeResume..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('jobs.location', 'Location')}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
                placeholder="Taipei, Remote..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('jobs.salary', 'Salary')}
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
                placeholder="$60,000 - $80,000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('jobs.notes', 'Notes')}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground h-20 resize-none"
              placeholder="Interview notes, company insights..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-hover transition-colors"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('common.add', 'Add Job')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}