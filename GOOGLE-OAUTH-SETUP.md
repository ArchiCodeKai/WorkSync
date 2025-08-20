# Google OAuth 設定指南

## ✅ 已完成的配置

### 1. 環境變數已更新（網頁應用程式版本）
```bash
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_URL="http://localhost:3000"
# 生產環境：NEXTAUTH_URL="https://your-vercel-url.vercel.app"
```

### 2. NextAuth.js 配置已就緒
- Google Provider 已配置在 `/src/lib/auth.ts`
- API 路由已設定在 `/src/app/api/auth/[...nextauth]/route.ts`
- SessionProvider 已包裝整個應用程式

## 🔧 Google Cloud Console 設定

你需要在 Google Cloud Console 中進行以下設定：

### 1. 前往 Google Cloud Console
- 網址：https://console.cloud.google.com/
- 選擇專案：`firm-hybrid-398613`

### 2. 設定 OAuth 2.0 客戶端（網頁應用程式類型）
1. 前往 **APIs & Services** → **Credentials**
2. 建立 **OAuth 客戶端 ID** → 選擇 **「網頁應用程式」**
3. 在 **「已授權的重新導向 URI」** 區段中添加：
   ```
   http://localhost:3000/api/auth/callback/google
   https://work-sync-gamma.vercel.app/api/auth/callback/google
   ```
4. 在 **「已授權的 JavaScript 來源」** 區段中添加：
   ```
   http://localhost:3000
   https://work-sync-gamma.vercel.app
   ```
5. 點擊 **「儲存」**

## 🧪 測試步驟

### 1. 確認伺服器運行
- 開發伺服器：http://localhost:3000
- 登入頁面：http://localhost:3000/auth/signin

### 2. 測試 Google 登入
1. 開啟瀏覽器前往 http://localhost:3000/auth/signin
2. 點擊 **「Continue with Google」** 按鈕
3. 應該會重定向到 Google 的登入頁面
4. 使用你的 Google 帳戶登入
5. 授權應用程式存取
6. 應該會重定向回到 `/dashboard`

### 3. 預期行為
✅ **成功**：重定向到 Google → 登入 → 重定向到 dashboard  
❌ **失敗**：顯示錯誤訊息（通常是重定向 URI 不匹配）

## 🐛 常見問題排除

### 錯誤：redirect_uri_mismatch
**原因**：Google Cloud Console 中的重定向 URI 設定不正確  
**解決**：確保添加了 `http://localhost:3000/api/auth/callback/google`

### 錯誤：unauthorized_client
**原因**：客戶端 ID 或密鑰不正確  
**解決**：重新檢查 `.env.local` 中的 Google 憑證

### 錯誤：invalid_request
**原因**：NEXTAUTH_URL 設定不正確  
**解決**：確保 `NEXTAUTH_URL="http://localhost:3000"`

## 📋 目前狀態

✅ **已完成**：
- [x] Google OAuth 憑證設定
- [x] NextAuth.js 配置
- [x] 環境變數更新
- [x] 開發伺服器重新啟動

🔄 **待完成**：
- [ ] Google Cloud Console 重定向 URI 更新
- [ ] 實際登入測試
- [ ] 使用者資料持久化驗證

## 🎯 下一步

1. **在 Google Cloud Console 中更新重定向 URI**
2. **測試登入流程**
3. **確認使用者資料正確儲存到資料庫**

---

**注意**：目前使用本地 SQLite 資料庫是完全可以的！不需要立即部署到網路資料庫。當你準備部署到生產環境時，才需要考慮使用 PostgreSQL 等雲端資料庫。