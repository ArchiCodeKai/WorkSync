#!/usr/bin/env bash
# Minimal local gate for Claude/Cursor/Vibe Coding
set -euo pipefail

echo "🔎 Type check..."
if npm run | grep -q "typecheck"; then
  npm run typecheck
else
  npx tsc --noEmit
fi

echo "🧹 Lint..."
if npm run | grep -q "lint"; then
  npm run lint
fi

# Prisma：只有在專案包含 prisma/ 時才處理，避免多餘操作
if [ -f "prisma/schema.prisma" ]; then
  # 若本次有修改 schema，先自動 generate（不強制 push）
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    if git diff --name-only | grep -q "prisma/schema.prisma"; then
      echo "🧩 Prisma schema changed → generate"
      npm run db:generate || npx prisma generate
    fi
  fi
fi

echo "🏗️ Build..."
if npm run | grep -q "build"; then
  npm run build
else
  npx next build
fi

echo "✅ ALL CHECKS PASSED"
