// Database types
import type {
  User,
  JobApplication,
  MoodEntry,
  PomodoroSession,
  LearningEntry,
  JobApplicationStatus,
  JobPriority,
  PomodoroCategory,
} from '@prisma/client'

export type {
  User,
  JobApplication,
  MoodEntry,
  PomodoroSession,
  LearningEntry,
  JobApplicationStatus,
  JobPriority,
  PomodoroCategory,
}

// Extended types
export interface JobApplicationWithStats extends JobApplication {
  daysSinceApplied: number
  isOverdue: boolean
}

export interface MoodEntryWithTrend extends MoodEntry {
  trend: 'up' | 'down' | 'stable'
  previousScore?: number
}

export interface DashboardStats {
  totalApplications: number
  responseRate: number
  interviewRate: number
  averageMoodScore: number
  totalPomodoroSessions: number
  totalLearningHours: number
  weeklyTrends: {
    applications: number[]
    mood: number[]
    productivity: number[]
  }
}

// Form types
export interface JobApplicationForm {
  company: string
  position: string
  location?: string
  salary?: string
  description?: string
  status: JobApplicationStatus
  priority: JobPriority
  interviewDate?: Date
  source?: string
  contactPerson?: string
}

export interface MoodEntryForm {
  moodScore: number
  note?: string
  tags: string[]
}

export interface PomodoroForm {
  duration: number
  taskName?: string
  category: PomodoroCategory
}

// Filter types
export interface JobApplicationFilters {
  status?: JobApplicationStatus[]
  priority?: JobPriority[]
  company?: string
  dateRange?: {
    from: Date
    to: Date
  }
  sortBy?: 'appliedAt' | 'updatedAt' | 'company' | 'position'
  sortOrder?: 'asc' | 'desc'
}

// UI types
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}

export interface NotificationMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}