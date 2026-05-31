# 🚀 Quick Start: Deploy Your Portfolio in 30 Minutes

This guide walks you through deploying your portfolio app using GitHub and Render.com.

## Prerequisites ✓
- GitHub account (free)
- Render.com account (free tier available)
- Git installed
- Terminal access

---

## 🔷 Part 1: Prepare & Push to GitHub (10 min)

### Step 1: Initialize Git & Push Code
```bash
cd ~/Desktop/portfolio-v2

# Initialize git (skip if already initialized)
git init
git add .
git commit -m "Initial commit: Portfolio app"
git branch -M main

# Create repository on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio-v2.git
git push -u origin main
```

### Step 2: Generate & Save Secrets
```bash
# Generate JWT secret (save this!)
openssl rand -hex 32
# Example output: a3f2b8c1d9e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e

# Copy to clipboard, you'll need it for Render
```

---

## 🟢 Part 2: Create PostgreSQL Database (3 min)

1. Go to **https://render.com** → Sign in
2. Dashboard → **New+** → **PostgreSQL**
3. Fill in:
   - **Name**: `portfolio-db`
   - **Database**: `portfolio`
   - **User**: `portfolio`
   - **Region**: Closest to you
   - **Plan**: Free
4. Click **Create**
5. **⏱️ Wait 10 minutes** for database initialization
6. Copy the **External Database URL** (you'll need this!)

---

## 🔵 Part 3: Deploy Backend Service (5 min)

1. Go to **Render Dashboard** → **New+** → **Web Service**
2. **Connect GitHub**
   - Click "Connect account" → Authorize GitHub
   - Select `portfolio-v2` repo
3. Configure service:
   - **Name**: `portfolio-backend`
   - **Region**: Same as database
   - **Runtime**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
4. Click **Create Web Service**
5. Go to **Environment** tab and add these variables:

```env
APP_ENV=production
DATABASE_URL=<paste-your-database-url-here>
FRONTEND_ORIGIN=https://portfolio-frontend.onrender.com
JWT_SECRET=<paste-your-generated-secret>
OPENAI_API_KEY=<optional-if-you-have-openai-key>
CONTACT_TO_EMAIL=your-email@example.com
REDIS_URL=redis://localhost:6379/0
```

6. Click **Save**
7. **⏱️ Wait for deployment** (2-5 minutes)
8. Your backend URL will be like: `https://portfolio-backend.onrender.com`

---

## 🟡 Part 4: Initialize Database Schema (2 min)

1. After backend deploys, go to the service
2. Click **Shell** tab
3. Run this command:
```bash
psql $DATABASE_URL < backend/app/db/schema.sql
```

4. Verify:
```bash
curl https://portfolio-backend.onrender.com/api/health
```
Should return: `{"status":"ok"}`

---

## 🟣 Part 5: Update & Deploy Frontend (5 min)

1. Update API URL in your frontend code
   - Edit: `frontend/src/environment.ts` (or find your environment config)
   - Set: `apiUrl: 'https://portfolio-backend.onrender.com'`

2. Commit changes:
```bash
git add frontend/src/environment.ts
git commit -m "Update API URL for production"
git push
```

3. Create frontend service on Render:
   - **Dashboard** → **New+** → **Web Service**
   - Select your repo again
   - **Name**: `portfolio-frontend`
   - **Region**: Same as backend
   - **Runtime**: Node
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: Use Dockerfile option or `npm run serve`
   - **Publish Directory**: `frontend/dist/mk-ai-command-center/browser`
   - **Plan**: Free

4. Click **Create Web Service**
5. **⏱️ Wait for deployment** (3-5 minutes)
6. Your frontend will be at: `https://portfolio-frontend.onrender.com`

---

## ✅ Verify Everything Works

1. **Test backend API**:
```bash
curl https://portfolio-backend.onrender.com/api/health
# Should return: {"status":"ok"}
```

2. **Test frontend loads**:
   - Open: https://portfolio-frontend.onrender.com
   - Check browser console (F12) for any errors
   - Try a few features (contact form, etc.)

3. **Check logs for errors**:
   - Backend: Dashboard → portfolio-backend → **Logs**
   - Frontend: Dashboard → portfolio-frontend → **Logs**

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| **502 Bad Gateway** | Backend crashed. Check Logs tab. Usually DATABASE_URL issue. |
| **Frontend loads but can't call API** | Update `apiUrl` and redeploy. Check CORS in backend logs. |
| **Database won't initialize** | Run schema migration in Shell again: `psql $DATABASE_URL < backend/app/db/schema.sql` |
| **"Connection refused"** | Wait 5 more minutes, backend might still be starting. Check Logs. |
| **Service keeps spinning down** | Free tier spins down after 15 min idle. Set up cron job or upgrade plan. |

---

## 📊 Optional: Keep Service Alive (Free Tier)

To prevent free tier from spinning down:

1. **Backend service** → **Cron**
2. Add job:
   - **Path**: `/api/health`
   - **Schedule**: Every 14 minutes
   - **Notifications**: On failure

---

## 🎁 Optional: Set Up CI/CD (Automatic Deployment)

Now any push to `main` branch auto-deploys!

1. Backend service → **Settings** → **Deploy Hook**
   - Copy the hook URL
   
2. Frontend service → **Settings** → **Deploy Hook**
   - Copy the hook URL

3. Go to GitHub → Your repo → **Settings** → **Secrets and variables** → **Actions**

4. Create new secrets:
   - **RENDER_BACKEND_DEPLOY_HOOK**: Paste backend hook
   - **RENDER_FRONTEND_DEPLOY_HOOK**: Paste frontend hook

5. GitHub Actions will now auto-deploy on every push to `main`! 🎉

---

## 📚 Need More Help?

- **Full Documentation**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Render Docs**: https://render.com/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com/deployment/
- **Angular Docs**: https://angular.io/guide/build

---

## Summary

| Step | Service | Time | Status |
|------|---------|------|--------|
| 1 | GitHub | 2 min | Push code ✓ |
| 2 | Render PostgreSQL | 10 min | Create database ⏳ |
| 3 | Render Backend | 5 min | Deploy & add secrets ✓ |
| 4 | Backend | 2 min | Initialize schema ✓ |
| 5 | Frontend | 5 min | Update URL & deploy ✓ |
| 6 | Test | 5 min | Verify endpoints ✓ |
| **Total** | | **~30 min** | 🚀 Live! |

---

**You're all set! Your portfolio is now live on the web!** 🎉

Visit:
- **Frontend**: https://portfolio-frontend.onrender.com
- **Backend API Docs**: https://portfolio-backend.onrender.com/api/docs
