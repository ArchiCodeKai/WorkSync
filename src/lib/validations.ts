import { z } from 'zod'

// 基礎驗證工具
const sanitizedString = (options?: { minLength?: number; maxLength?: number }) => {
  let schema = z.string().trim()
  
  if (options?.minLength) {
    schema = schema.min(options.minLength, 
      `字串長度不能少於 ${options.minLength} 個字元`
    )
  }
  
  if (options?.maxLength) {
    schema = schema.max(options.maxLength,
      `字串長度不能超過 ${options.maxLength} 個字元`
    )
  }
  
  return schema.transform((val) => val.replace(/[<>\"'&]/g, ''))
}

// 求職申請驗證 schema
export const JobApplicationSchema = z.object({
  company: sanitizedString({ maxLength: 100 }),
  position: sanitizedString({ maxLength: 200 }),
  location: sanitizedString({ maxLength: 100 }).optional(),
  salary: sanitizedString({ maxLength: 50 }).optional(),
  description: sanitizedString({ maxLength: 1000 }).optional(),
  status: z.enum([
    'APPLIED',
    'SCREENING', 
    'INTERVIEW_SCHEDULED',
    'INTERVIEW_COMPLETED',
    'OFFER_RECEIVED',
    'REJECTED',
    'WITHDRAWN'
  ]),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  interviewDate: z.coerce.date().optional(),
  interviewType: sanitizedString({ maxLength: 50 }).optional(),
  interviewNotes: sanitizedString({ maxLength: 500 }).optional(),
  source: sanitizedString({ maxLength: 100 }).optional(),
  contactPerson: sanitizedString({ maxLength: 100 }).optional(),
  referral: sanitizedString({ maxLength: 100 }).optional(),
})

export type JobApplicationInput = z.infer<typeof JobApplicationSchema>

// 更新求職申請驗證 schema (所有欄位可選)
export const UpdateJobApplicationSchema = JobApplicationSchema.partial()
export type UpdateJobApplicationInput = z.infer<typeof UpdateJobApplicationSchema>

// 心情記錄驗證 schema
export const MoodEntrySchema = z.object({
  moodScore: z.number().min(1, '心情評分最低為 1').max(10, '心情評分最高為 10'),
  note: sanitizedString({ maxLength: 500 }).optional(),
  tags: z.array(z.string().trim().max(20)).max(10, '標籤數量不能超過 10 個'),
})

export type MoodEntryInput = z.infer<typeof MoodEntrySchema>

// 番茄鐘驗證 schema
export const PomodoroSessionSchema = z.object({
  duration: z.number().min(1, '時間不能少於 1 分鐘').max(180, '時間不能超過 3 小時'),
  taskName: sanitizedString({ maxLength: 200 }).optional(),
  category: z.enum(['WORK', 'STUDY', 'JOB_SEARCH', 'INTERVIEW_PREP', 'BREAK']),
  completed: z.boolean().default(false),
})

export type PomodoroSessionInput = z.infer<typeof PomodoroSessionSchema>

// 學習記錄驗證 schema
export const LearningEntrySchema = z.object({
  platform: sanitizedString({ maxLength: 50 }),
  activity: sanitizedString({ maxLength: 200 }),
  description: sanitizedString({ maxLength: 500 }).optional(),
  duration: z.number().min(1).max(480).optional(), // 最多 8 小時
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']).optional(),
  tags: z.array(z.string().trim().max(30)).max(10),
})

export type LearningEntryInput = z.infer<typeof LearningEntrySchema>

// 使用者資料驗證 schema
export const UserProfileSchema = z.object({
  name: sanitizedString({ minLength: 1, maxLength: 100 }),
  email: z.string().email('請輸入有效的電子信箱'),
})

export type UserProfileInput = z.infer<typeof UserProfileSchema>

// API 查詢參數驗證
export const JobApplicationFiltersSchema = z.object({
  status: z.array(z.enum([
    'APPLIED',
    'SCREENING',
    'INTERVIEW_SCHEDULED', 
    'INTERVIEW_COMPLETED',
    'OFFER_RECEIVED',
    'REJECTED',
    'WITHDRAWN'
  ])).optional(),
  priority: z.array(z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])).optional(),
  company: sanitizedString({ maxLength: 100 }).optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
  sortBy: z.enum(['appliedAt', 'updatedAt', 'company', 'position']).default('appliedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
})

export type JobApplicationFiltersInput = z.infer<typeof JobApplicationFiltersSchema>

// 統計查詢參數
export const StatsQuerySchema = z.object({
  period: z.enum(['week', 'month', 'quarter', 'year']).default('month'),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
})

export type StatsQueryInput = z.infer<typeof StatsQuerySchema>

// ID 參數驗證
export const IdParamSchema = z.object({
  id: z.string().cuid('無效的 ID 格式'),
})

export type IdParamInput = z.infer<typeof IdParamSchema>

// 批次操作驗證
export const BatchOperationSchema = z.object({
  ids: z.array(z.string().cuid()).min(1, '至少選擇一個項目').max(50, '一次最多操作 50 個項目'),
  action: z.enum(['delete', 'update_status', 'archive']),
  data: z.record(z.string(), z.any()).optional(),
})

export type BatchOperationInput = z.infer<typeof BatchOperationSchema>