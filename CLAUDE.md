# WorkSync – Guarded Coding Brief

## 目標
在不浪費 token 的前提下，完成指定前端改動並通過基本檢查與建置。
（技術棧：Next.js + React + TypeScript + Tailwind）

## 可修改範圍
- ✅ `app/**`、`src/**`、`components/**`、`lib/**`、`styles/**`
- ⚠️ `prisma/schema.prisma`、`package.json`、`tsconfig.json` 僅在任務明確要求時變更
- ❌ 不得提交大型二進位資產或不必要的相依

## 執行準則（必須先測試、全綠才可回覆）
- 一律先執行：`./scripts/ci.sh`
- 如本次更動包含 Prisma schema，回覆前需完成 `npm run db:generate`
  （必要時再 `npm run db:push`，除非任務要求，避免異動實體資料庫）

## 成功條件
- `typecheck`、`lint`、`build` 全數通過
- 變更最小化、不引入不必要相依
- 無瀏覽器/Node 警告（避免多餘 console 噪音）
- 動效/互動若有指定，需提供最小測試步驟（見回覆格式）

## 回覆格式（嚴格限制）
1. **統一 diff（Git patch）**：僅含必要檔案變更  
2. **變更摘要**：≤ 120 tokens，條列最多 3 點  
3. **手動驗證步驟（如有 UI/動效）**：≤ 3 行  
> 禁止貼上長篇 build/log 內容；禁止自動生成冗長文件。

## Token 節制
- 推理上限：≤ 4000 tokens
- 最終回覆：≤ 800 tokens
- 僅在需要時讀取檔案；避免全文掃描

## 失敗處理
- 任何一步失敗：修正 → 重跑 `./scripts/ci.sh` → **全綠才可回覆**
- 最多嘗試 3 輪；仍卡關請以 ≤ 80 tokens 回報阻塞點與下一步假設
