'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { JobSearch } from '@/components/jobs/JobSearch'
import { JobFilters } from '@/components/jobs/JobFilters'
import { JobTable } from '@/components/jobs/JobTable'
import { JobStats } from '@/components/jobs/JobStats'
import { AddJobModal } from '@/components/jobs/AddJobModal'
import { storage } from '@/lib/storage'

export interface JobApplication {
  id: string
  jobTitle: string
  company: string
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  appliedDate: string
  salary?: string
  location: string
  platform: string
  notes?: string
  riskLevel?: 'low' | 'medium' | 'high'
}

// Mock data - 將來會從 API 獲取
const mockJobs: JobApplication[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    status: 'interview',
    appliedDate: '2024-01-15',
    salary: '$80,000 - $120,000',
    location: 'Taipei',
    platform: 'LinkedIn',
    notes: 'Technical interview scheduled for next week',
    riskLevel: 'low'
  },
  {
    id: '2',
    jobTitle: 'React Developer',
    company: 'StartupXYZ',
    status: 'applied',
    appliedDate: '2024-01-12',
    salary: '$60,000 - $90,000',
    location: 'Remote',
    platform: '104 人力銀行',
    riskLevel: 'medium'
  },
  {
    id: '3',
    jobTitle: 'Full Stack Engineer',
    company: 'WebCorp',
    status: 'offer',
    appliedDate: '2024-01-10',
    salary: '$100,000 - $150,000',
    location: 'Kaohsiung',
    platform: 'CakeResume',
    notes: 'Great company culture!',
    riskLevel: 'low'
  },
  {
    id: '4',
    jobTitle: 'Frontend Developer',
    company: 'SketchyTech',
    status: 'rejected',
    appliedDate: '2024-01-08',
    location: 'Taipei',
    platform: '1111 人力銀行',
    riskLevel: 'high'
  }
]

export default function JobsPage() {
  const { t } = useLanguage()
  const [jobs, setJobs] = useState<JobApplication[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    status: 'all',
    riskLevel: 'all',
    platform: 'all',
    location: 'all'
  })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Load jobs from localStorage on component mount
  useEffect(() => {
    const savedJobs = storage.loadJobs()
    if (savedJobs.length === 0) {
      // If no saved jobs, use mock data as initial data
      setJobs(mockJobs)
      storage.saveJobs(mockJobs)
    } else {
      setJobs(savedJobs)
    }
    setIsLoaded(true)
  }, [])

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    if (isLoaded) {
      storage.saveJobs(jobs)
    }
  }, [jobs, isLoaded])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filters.status === 'all' || job.status === filters.status
    const matchesRisk = filters.riskLevel === 'all' || job.riskLevel === filters.riskLevel
    const matchesPlatform = filters.platform === 'all' || job.platform === filters.platform
    const matchesLocation = filters.location === 'all' || job.location === filters.location

    return matchesSearch && matchesStatus && matchesRisk && matchesPlatform && matchesLocation
  })

  const handleAddJob = (newJobData: Omit<JobApplication, 'id'>) => {
    const newJob: JobApplication = {
      ...newJobData,
      id: Date.now().toString() // Simple ID generation
    }
    setJobs(prevJobs => [newJob, ...prevJobs])
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('jobs.title')}</h1>
          <p className="text-foreground-secondary">{t('jobs.subtitle')}</p>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          {t('jobs.newApplication')}
        </Button>
      </div>

      {/* Stats */}
      <JobStats jobs={jobs} />

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <JobSearch 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
        </div>
        <JobFilters 
          filters={filters}
          onFiltersChange={setFilters}
          jobs={jobs}
        />
      </div>

      {/* Job Table */}
      <JobTable 
        jobs={filteredJobs}
        onJobUpdate={(id, updates) => {
          setJobs(prevJobs => 
            prevJobs.map(job => 
              job.id === id ? { ...job, ...updates } : job
            )
          )
        }}
      />

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddJob}
      />
    </div>
  )
}