// Local Storage utilities for data persistence

export interface StorageData {
  jobs: any[]
  moodEntries: any[]
  pomodoroSessions: any[]
  learningProgress: any[]
  settings: any
}

class LocalStorageManager {
  private prefix = 'worksync-'

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  // Generic methods
  save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(data))
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error)
    }
  }

  load<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key))
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Failed to load ${key} from localStorage:`, error)
      return null
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error)
    }
  }

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }

  // Specific data methods
  saveJobs(jobs: any[]): void {
    this.save('jobs', jobs)
  }

  loadJobs(): any[] {
    return this.load<any[]>('jobs') || []
  }

  saveMoodEntries(entries: any[]): void {
    this.save('mood-entries', entries)
  }

  loadMoodEntries(): any[] {
    return this.load<any[]>('mood-entries') || []
  }

  savePomodoroSessions(sessions: any[]): void {
    this.save('pomodoro-sessions', sessions)
  }

  loadPomodoroSessions(): any[] {
    return this.load<any[]>('pomodoro-sessions') || []
  }

  saveLearningProgress(progress: any): void {
    this.save('learning-progress', progress)
  }

  loadLearningProgress(): any {
    return this.load('learning-progress') || {
      skills: [],
      courses: [],
      goals: [],
      studyHours: []
    }
  }

  saveSettings(settings: any): void {
    this.save('settings', settings)
  }

  loadSettings(): any {
    return this.load('settings') || {
      pomodoroSettings: {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
        soundEnabled: true,
        notificationsEnabled: true
      }
    }
  }

  // Export data for backup
  exportAllData(): StorageData {
    return {
      jobs: this.loadJobs(),
      moodEntries: this.loadMoodEntries(),
      pomodoroSessions: this.loadPomodoroSessions(),
      learningProgress: this.loadLearningProgress(),
      settings: this.loadSettings()
    }
  }

  // Import data from backup
  importAllData(data: Partial<StorageData>): void {
    if (data.jobs) this.saveJobs(data.jobs)
    if (data.moodEntries) this.saveMoodEntries(data.moodEntries)
    if (data.pomodoroSessions) this.savePomodoroSessions(data.pomodoroSessions)
    if (data.learningProgress) this.saveLearningProgress(data.learningProgress)
    if (data.settings) this.saveSettings(data.settings)
  }

  // Get storage usage info
  getStorageInfo() {
    const total = Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .reduce((acc, key) => acc + localStorage.getItem(key)!.length, 0)
    
    return {
      totalSize: total,
      formattedSize: this.formatBytes(total),
      itemCount: Object.keys(localStorage).filter(key => key.startsWith(this.prefix)).length
    }
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}

export const storage = new LocalStorageManager()

// React hook for using localStorage with state
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const item = storage.load<T>(key)
      if (item !== null) {
        setValue(item)
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    } finally {
      setIsLoaded(true)
    }
  }, [key])

  const saveValue = (newValue: T) => {
    try {
      setValue(newValue)
      storage.save(key, newValue)
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return [value, saveValue, isLoaded] as const
}