# WorkSync - Job Search Anxiety Relief Dashboard

A comprehensive job search management tool that uses data visualization and analytics to help combat job search anxiety with insights and productivity tracking 📊✨

> [中文版本 / Chinese Version](./README-zh.md)

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd worksync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # (Optional) View database contents
   npx prisma studio
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application

### Available Scripts

```bash
# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# TypeScript type checking (if configured)
npm run type-check
```

## 🏗️ Project Architecture

### Tech Stack
- **Frontend**: Next.js 15.4.5, React 19.1.0, TypeScript
- **Styling**: Tailwind CSS 4.x
- **Database**: SQLite (via Prisma ORM)
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Headless UI, Heroicons, Lucide React
- **Charts**: Chart.js + React Chart.js 2
- **Utilities**: date-fns, clsx, tailwind-merge

### Project Structure

```
worksync/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── dashboard/     # Dashboard API
│   │   │   ├── jobs/          # Job applications API
│   │   │   ├── learning/      # Learning records API
│   │   │   ├── mood/          # Mood tracking API
│   │   │   └── pomodoro/      # Pomodoro timer API
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── jobs/          # Job management page
│   │   │   ├── learning/      # Learning progress page
│   │   │   ├── mood/          # Mood tracking page
│   │   │   └── pomodoro/      # Pomodoro timer page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (redirects to dashboard)
│   │   └── providers.tsx      # React Providers
│   ├── components/            # React components
│   │   ├── charts/           # Chart components
│   │   ├── features/         # Feature-specific components
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx    # Header component
│   │   │   ├── Layout.tsx    # Main layout
│   │   │   └── Navigation.tsx # Navigation component
│   │   └── ui/               # Base UI components
│   │       ├── Badge.tsx     # Badge component
│   │       ├── Button.tsx    # Button component
│   │       ├── Card.tsx      # Card component
│   │       ├── Input.tsx     # Input component
│   │       └── index.ts      # Component exports
│   ├── lib/                  # Utilities and configurations
│   │   ├── api/              # API utilities
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── validations/      # Zod validation schemas
│   │   ├── api.ts            # API client
│   │   ├── prisma.ts         # Prisma client configuration
│   │   ├── query-client.ts   # React Query configuration
│   │   ├── utils.ts          # Common utilities
│   │   └── validations.ts    # Validation schemas
│   ├── styles/               # Additional style files
│   └── types/                # TypeScript type definitions
│       └── index.ts          # Type exports
├── prisma/                   # Prisma configuration
│   ├── schema.prisma         # Database schema
│   └── dev.db                # SQLite database file
├── public/                   # Static assets
├── package.json              # Project configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
└── README.md                 # Project documentation
```

## 📊 Core Feature Modules

### 1. Job Management
- Track job application status
- Interview scheduling and notes
- Company and position information management
- Application progress analytics

### 2. Mood Tracking
- Daily mood scoring (1-10 scale)
- Emotional tags and notes
- Mood trend visualization
- Anxiety level monitoring

### 3. Pomodoro Timer
- Focus time management
- Task categorization and tracking
- Productivity statistics
- Work efficiency analysis

### 4. Learning Progress
- GitHub activity tracking
- LeetCode problem solving records
- Skill tag management
- Learning time statistics

## 🗃️ Database Schema

### Core Models
- **User**: User basic information
- **JobApplication**: Job application records
- **MoodEntry**: Mood tracking records
- **PomodoroSession**: Pomodoro work sessions
- **LearningEntry**: Learning activity records

### Key Enums
- **JobApplicationStatus**: Application status (Applied, Screening, Interview, etc.)
- **JobPriority**: Priority levels (Low, Medium, High, Urgent)
- **PomodoroCategory**: Timer categories (Work, Study, Job Search, etc.)

## 🛠️ Development Guidelines

### Code Standards
- TypeScript for type safety
- ESLint rules compliance
- Prettier code formatting
- Functional components with React Hooks

### Directory Conventions
- `components/`: React components organized by functionality
- `lib/`: Utilities, API clients, and configurations
- `types/`: TypeScript type definitions
- `app/`: Next.js App Router pages and APIs

### API Design
- Next.js API Routes
- RESTful API principles
- Unified error handling
- Zod request validation

## 🔧 Configuration

### Environment Variables
The project uses SQLite as the default database with no additional environment variables required. For other databases:

```env
DATABASE_URL="your-database-connection-string"
```

### Tailwind CSS
- Tailwind CSS v4
- Custom color configuration
- Responsive design principles
- `clsx` and `tailwind-merge` for conditional styling

### React Query
- Global configuration in `lib/query-client.ts`
- Automatic refetching and error handling
- Development tools integration

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository
2. Configure environment variables (if needed)
3. Auto-deploy

### Self-hosted Deployment
```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🆘 Troubleshooting

### Common Issues

**TypeScript Errors**
```bash
# Restart TypeScript server
# VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

**Prisma Issues**
```bash
# Regenerate client
npx prisma generate

# Check database status
npx prisma studio
```

**Build Failures**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Features

- **📈 Analytics Dashboard**: Comprehensive job search metrics and trends
- **🎭 Mood Tracking**: Monitor emotional well-being during job search
- **⏰ Pomodoro Timer**: Boost productivity with time management
- **📚 Learning Tracker**: Record skill development and coding practice
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🔐 Type Safety**: Full TypeScript coverage for robust development

---

*Making job searching more insightful and less stressful through data-driven approaches!* 🎯📈