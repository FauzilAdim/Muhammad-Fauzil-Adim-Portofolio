# 🔗 Update Railway URL - Instructions

## After Railway Deployment

Setelah backend berhasil deploy di Railway, kamu perlu update frontend untuk connect ke Railway backend.

---

## 📝 Steps:

### **1. Get Railway URL**

Dari Railway dashboard:
1. Go to Backend service
2. Settings tab → Domains section
3. Copy URL (contoh: `https://your-app.up.railway.app`)

---

### **2. Update Frontend Code**

**File: `fe/src/services/ProjectService.ts`**

Find this line:
```typescript
private static baseUrl = import.meta.env.PROD 
  ? 'https://YOUR_RAILWAY_URL_HERE.up.railway.app/api'  // Production
  : 'http://localhost:8080/api';  // Development
```

**Replace `YOUR_RAILWAY_URL_HERE` dengan Railway URL kamu:**

**Example:**
```typescript
private static baseUrl = import.meta.env.PROD 
  ? 'https://muhammad-fauzil-adim-be.up.railway.app/api'  // Production
  : 'http://localhost:8080/api';  // Development
```

**Important:** 
- ✅ Keep `/api` at the end
- ✅ Use `https://` (not `http://`)
- ✅ No trailing slash before `/api`

---

### **3. Commit & Push**

```bash
cd fe
git add .
git commit -m "feat: Connect to Railway backend"
git push
```

Vercel akan auto-deploy dengan Railway URL baru!

---

### **4. Test**

1. Open Vercel deployment
2. Try upload a project
3. Verify images display correctly
4. Check modal slider works

---

## ✅ Verification

**Test API connection:**
```bash
# Replace with your Railway URL
curl https://your-app.up.railway.app/api/projects
```

**Expected response:**
```json
{
  "status": "success",
  "message": "Projects retrieved successfully",
  "data": []
}
```

---

## 🐛 Troubleshooting

### **CORS Error?**
- Verify Railway URL is correct
- Check CORS config in `be/src/main.rs`
- Redeploy backend if needed

### **404 Not Found?**
- Check `/api` is included in URL
- Verify backend is deployed and running
- Check Railway logs

### **Connection Refused?**
- Verify Railway service is active
- Check Railway domain is generated
- Wait for deployment to complete

---

## 💡 Tips

- Use environment variable for different environments
- Test locally first before pushing
- Check Railway logs if issues occur
- Monitor Railway metrics for performance

---

**Need help?** Check Railway logs or create GitHub issue.
