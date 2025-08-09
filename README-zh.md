# WorkSync - 求職焦慮緩解 Dashboard

一個讓使用者不好過的求職管理工具，用數據和幽默來對抗求職焦慮 📊✨

## 🚀 快速開始

### 環境需求
- Node.js 18.x 或更高版本
- npm 或 yarn

### 安裝步驟

1. **克隆專案**
   ```bash
   git clone <repository-url>
   cd worksync
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **設置資料庫**
   ```bash
   # 生成 Prisma 客戶端
   npx prisma generate
   
   # 推送資料庫 schema
   npx prisma db push
   
   # (可選) 查看資料庫內容
   npx prisma studio
   ```

4. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

5. **打開瀏覽器**
   前往 [http://localhost:3000](http://localhost:3000) 查看應用程式

### 其他指令

```bash
# 建置生產版本
npm run build

# 啟動生產伺服器
npm start

# 執行 ESLint 檢查
npm run lint

# TypeScript 類型檢查（如果有設置）
npm run type-check
```

## 🏗️ 專案架構

### 技術棧
- **Frontend**: Next.js 15.4.5, React 19.1.0, TypeScript
- **樣式**: Tailwind CSS 4.x
- **資料庫**: SQLite (透過 Prisma ORM)
- **狀態管理**: TanStack Query (React Query)
- **表單處理**: React Hook Form + Zod 驗證
- **UI 組件**: Headless UI, Heroicons, Lucide React
- **圖表**: Chart.js + React Chart.js 2
- **工具函數**: date-fns, clsx, tailwind-merge

### 專案結構

```
worksync/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   ├── dashboard/     # Dashboard API
│   │   │   ├── jobs/          # 求職申請 API
│   │   │   ├── learning/      # 學習記錄 API
│   │   │   ├── mood/          # 心情追蹤 API
│   │   │   └── pomodoro/      # 番茄鐘 API
│   │   ├── dashboard/         # Dashboard 頁面
│   │   │   ├── jobs/          # 求職管理頁面
│   │   │   ├── learning/      # 學習進度頁面
│   │   │   ├── mood/          # 心情追蹤頁面
│   │   │   └── pomodoro/      # 番茄鐘頁面
│   │   ├── globals.css        # 全域樣式
│   │   ├── layout.tsx         # 根佈局
│   │   ├── page.tsx           # 首頁（重導向至 dashboard）
│   │   └── providers.tsx      # React Providers
│   ├── components/            # React 組件
│   │   ├── charts/           # 圖表組件
│   │   ├── features/         # 功能特定組件
│   │   ├── layout/           # 佈局組件
│   │   │   ├── Header.tsx    # 頁頭組件
│   │   │   ├── Layout.tsx    # 主佈局
│   │   │   └── Navigation.tsx # 導航組件
│   │   └── ui/               # 基礎 UI 組件
│   │       ├── Badge.tsx     # 徽章組件
│   │       ├── Button.tsx    # 按鈕組件
│   │       ├── Card.tsx      # 卡片組件
│   │       ├── Input.tsx     # 輸入框組件
│   │       └── index.ts      # 組件導出
│   ├── lib/                  # 工具函數和配置
│   │   ├── api/              # API 相關工具
│   │   ├── hooks/            # 自定義 React Hooks
│   │   ├── utils/            # 工具函數
│   │   ├── validations/      # Zod 驗證 schemas
│   │   ├── api.ts            # API 客戶端
│   │   ├── prisma.ts         # Prisma 客戶端配置
│   │   ├── query-client.ts   # React Query 配置
│   │   ├── utils.ts          # 通用工具函數
│   │   └── validations.ts    # 驗證 schemas
│   ├── styles/               # 額外樣式文件
│   └── types/                # TypeScript 類型定義
│       └── index.ts          # 類型導出
├── prisma/                   # Prisma 配置
│   ├── schema.prisma         # 資料庫 schema
│   └── dev.db                # SQLite 資料庫文件
├── public/                   # 靜態資源
├── package.json              # 專案配置
├── tsconfig.json             # TypeScript 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── next.config.ts            # Next.js 配置
└── README.md                 # 專案說明文件
```

## 📊 核心功能模組

### 1. 求職管理 (Jobs)
- 追蹤求職申請狀態
- 面試安排和記錄
- 公司和職位資訊管理
- 申請進度統計

### 2. 心情追蹤 (Mood)
- 每日心情評分 (1-10)
- 情緒標籤和筆記
- 心情趨勢圖表
- 焦慮程度監控

### 3. 番茄鐘 (Pomodoro)
- 專注時間管理
- 任務分類追蹤
- 生產力統計
- 工作效率分析

### 4. 學習記錄 (Learning)
- GitHub 活動追蹤
- LeetCode 解題記錄
- 技能標籤管理
- 學習時間統計

## 🗃️ 資料庫 Schema

### 主要模型
- **User**: 使用者基本資訊
- **JobApplication**: 求職申請記錄
- **MoodEntry**: 心情記錄
- **PomodoroSession**: 番茄鐘工作階段
- **LearningEntry**: 學習活動記錄

### 關鍵 Enums
- **JobApplicationStatus**: 申請狀態 (已投遞、篩選中、面試等)
- **JobPriority**: 優先級 (低、中、高、緊急)
- **PomodoroCategory**: 番茄鐘分類 (工作、學習、求職等)

## 🛠️ 開發指南

### 代碼規範
- 使用 TypeScript 進行類型安全
- 遵循 ESLint 規則
- 使用 Prettier 格式化代碼
- 組件採用函數式組件和 Hooks

### 目錄命名規則
- `components/`: React 組件，按功能分組
- `lib/`: 工具函數、API 客戶端、配置
- `types/`: TypeScript 類型定義
- `app/`: Next.js App Router 頁面和 API

### API 設計
- 使用 Next.js API Routes
- RESTful API 設計原則
- 統一錯誤處理
- 使用 Zod 進行請求驗證

## 🔧 配置說明

### 環境變數
專案使用 SQLite 作為預設資料庫，無需額外環境變數配置。如需使用其他資料庫：

```env
DATABASE_URL="your-database-connection-string"
```

### Tailwind CSS
- 使用 Tailwind CSS v4
- 自定義色彩配置
- 響應式設計原則
- 使用 `clsx` 和 `tailwind-merge` 進行條件樣式

### React Query
- 全域配置在 `lib/query-client.ts`
- 自動重新獲取和錯誤處理
- 開發工具整合

## 🚀 部署

### Vercel 部署
1. 連接 GitHub 儲存庫
2. 設置環境變數
3. 自動部署

### 自主部署
```bash
# 建置專案
npm run build

# 啟動生產伺服器
npm start
```

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📝 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 文件

## 🆘 疑難排解

### 常見問題

**TypeScript 錯誤**
```bash
# 重新啟動 TypeScript 服務器
# VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

**Prisma 相關問題**
```bash
# 重新生成客戶端
npx prisma generate

# 檢查資料庫狀態
npx prisma studio
```

**建置失敗**
```bash
# 清除 Next.js 快取
rm -rf .next

# 重新安裝依賴
rm -rf node_modules package-lock.json
npm install
```

---

*讓求職過程更有趣，用數據對抗焦慮！* 🎯📈