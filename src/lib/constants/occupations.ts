export const OCCUPATIONS = {
  'student': {
    'zh-TW': '學生',
    'en': 'Student',
    'ja': '学生'
  },
  'fresh_graduate': {
    'zh-TW': '應屆畢業生',
    'en': 'Fresh Graduate',
    'ja': '新卒'
  },
  'frontend_dev': {
    'zh-TW': '前端開發者',
    'en': 'Frontend Developer',
    'ja': 'フロントエンド開発者'
  },
  'backend_dev': {
    'zh-TW': '後端開發者',
    'en': 'Backend Developer',
    'ja': 'バックエンド開発者'
  },
  'fullstack_dev': {
    'zh-TW': '全端開發者',
    'en': 'Full Stack Developer',
    'ja': 'フルスタック開発者'
  },
  'ui_ux_designer': {
    'zh-TW': 'UI/UX 設計師',
    'en': 'UI/UX Designer',
    'ja': 'UI/UXデザイナー'
  },
  'product_manager': {
    'zh-TW': '產品經理',
    'en': 'Product Manager',
    'ja': 'プロダクトマネージャー'
  },
  'data_analyst': {
    'zh-TW': '數據分析師',
    'en': 'Data Analyst',
    'ja': 'データアナリスト'
  },
  'software_engineer': {
    'zh-TW': '軟體工程師',
    'en': 'Software Engineer',
    'ja': 'ソフトウェアエンジニア'
  },
  'teacher': {
    'zh-TW': '教師',
    'en': 'Teacher',
    'ja': '教師'
  },
  'researcher': {
    'zh-TW': '研究員',
    'en': 'Researcher',
    'ja': '研究員'
  },
  'consultant': {
    'zh-TW': '顧問',
    'en': 'Consultant',
    'ja': 'コンサルタント'
  },
  'marketing': {
    'zh-TW': '行銷專員',
    'en': 'Marketing Specialist',
    'ja': 'マーケティング担当者'
  },
  'sales': {
    'zh-TW': '業務代表',
    'en': 'Sales Representative',
    'ja': '営業担当者'
  },
  'entrepreneur': {
    'zh-TW': '創業家',
    'en': 'Entrepreneur',
    'ja': '起業家'
  },
  'freelancer': {
    'zh-TW': '自由工作者',
    'en': 'Freelancer',
    'ja': 'フリーランサー'
  },
  'other': {
    'zh-TW': '其他',
    'en': 'Other',
    'ja': 'その他'
  }
} as const

export type OccupationCode = keyof typeof OCCUPATIONS
export type Locale = keyof typeof OCCUPATIONS[OccupationCode]

// Helper function to get occupation display name
export function getOccupationName(code: OccupationCode, locale: Locale): string {
  return OCCUPATIONS[code]?.[locale] || OCCUPATIONS[code]?.['en'] || code
}

// Get all occupation options for a specific locale
export function getOccupationOptions(locale: Locale) {
  return Object.entries(OCCUPATIONS).map(([code, translations]) => ({
    value: code,
    label: translations[locale] || translations['en']
  }))
}