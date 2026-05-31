# Deployment Guide: GitHub + Render.com

This guide covers deploying your full-stack portfolio app (FastAPI backend + Angular frontend) using GitHub for source control and Render.com for hosting.

## Prerequisites

- GitHub account
- Render.com account (free tier available)
- Git installed locally
- Code pushed to GitHub repository

---

## Part 1: GitHub Repository Setup

### 1.1 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create new repository named `portfolio-v2` (or your preferred name)
3. **Do not** initialize with README (you already have one)
4. Click "Create repository"

### 1.2 Push Your Code to GitHub

```bash
# Navigate to your project directory
cd ~/Desktop/portfolio-v2

# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio app with FastAPI backend and Angular frontend"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/portfolio-v2.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 1.3 Create `.env.production` File

Add this file to your GitHub repository for production reference:

```env
# Production Environment Configuration
APP_ENV=production
FRONTEND_ORIGIN=https://your-frontend-domain.onrender.com
OPENAI_API_KEY=your_openai_key_here
JWT_SECRET=your-long-random-secret-key-generate-one
DATABASE_URL=postgresql+psycopg://user:password@your-db-host:5432/portfolio
REDIS_URL=redis://your-redis-host:6379/0
CHROMA_PERSIST_DIRECTORY=./data/chroma
CONTACT_TO_EMAIL=your-email@example.com
```

> ⚠️ **Important**: Do NOT commit `.env.production` with real secrets. Store secrets in Render.com dashboard instead.

---

## Part 2: Deploy Backend to Render.com

### 2.1 Create PostgreSQL Database (Render Free Tier)

1. Log into [Render.com](https://render.com)
2. Go to **Dashboard** → **New+** → **PostgreSQL**
3. Configure:
   - **Name**: `portfolio-db`
   - **Database**: `portfolio`
   - **User**: `portfolio`
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 16
   - **Plan**: Free tier
4. Click **Create Database**
5. Wait for database to initialize (~10 mins)
6. Copy the **External Database URL** (looks like `postgresql://user:pass@host:5432/db`)

### 2.2 Create Backend Web Service

1. Go to **Dashboard** → **New+** → **Web Service**
2. Connect your GitHub repository:
   - Click **Connect account** if needed
   - Select `portfolio-v2` repository
   - Authorize GitHub access
3. Configure service:
   - **Name**: `portfolio-backend`
   - **Region**: Same as database
   - **Runtime**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free tier

### 2.3 Add Environment Variables

In the Render backend service dashboard, go to **Environment** and add:

```env
APP_ENV=production
DATABASE_URL=postgresql+psycopg://user:password@your-database-host:5432/portfolio
REDIS_URL=redis://:@your-redis-host:6379/0
FRONTEND_ORIGIN=https://your-frontend-domain.onrender.com
JWT_SECRET=generate-a-long-random-string-with-openssl
OPENAI_API_KEY=sk-...your-key
CONTACT_TO_EMAIL=your-email@example.com
```

**To generate JWT_SECRET**:
```bash
openssl rand -hex 32
```

### 2.4 Deploy Backend

1. Render auto-deploys when you push to `main`
2. Monitor logs: **Logs** tab in service dashboard
3. Once deployed, note your backend URL: `https://portfolio-backend.onrender.com`

---

## Part 3: Deploy Frontend to Render.com

### 3.1 Update Frontend Environment Configuration

Edit [frontend/src/environment.ts](frontend/src/environment.ts):

```typescript
// For production
export const environment = {
  production: true,
  apiUrl: 'https://portfolio-backend.onrender.com'
};
```

Commit and push:
```bash
git add frontend/src/environment.ts
git commit -m "Update API URL for production"
git push
```

### 3.2 Create Frontend Web Service

1. Go to **Dashboard** → **New+** → **Web Service**
2. Select same GitHub repository
3. Configure service:
   - **Name**: `portfolio-frontend`
   - **Region**: Same as backend
   - **Runtime**: Node
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm run serve` or use the dockerfile
   - **Plan**: Free tier

### 3.3 Add Environment Variables (Optional)

```env
NODE_ENV=production
```

### 3.4 Configure Static File Serving (Important!)

In **Publish Directory** field, set:
```
frontend/dist/mk-ai-command-center/browser
```

Or let Render build using the Dockerfile.

---

## Part 4: Database Migration & Setup

### 4.1 Run Database Schema

After backend is deployed, you need to initialize the database schema.

**Option A: Using Render shell**
1. Go to backend service → **Shell** tab
2. Connect
3. Run:
```bash
psql $DATABASE_URL < backend/app/db/schema.sql
```

**Option B: Using local connection**
```bash
# Get your external database URL from Render dashboard
psql postgresql://user:password@host:5432/portfolio < backend/app/db/schema.sql
```

### 4.2 Verify Database Connection

Test from backend service shell:
```bash
python -c "from sqlalchemy import create_engine; engine = create_engine('$DATABASE_URL'); print(engine.execute('SELECT 1'))"
```

---

## Part 5: CORS & Frontend Configuration

### 5.1 Update Backend CORS Settings

Edit [backend/app/core/config.py](backend/app/core/config.py):

```python
@property
def cors_origins(self) -> list[str]:
    if self.app_env == "production":
        return [self.frontend_origin]
    return [self.frontend_origin, "http://localhost:4200", "http://127.0.0.1:4200"]
```

### 5.2 Update Frontend API Configuration

Ensure [frontend/src/app/services](frontend/src/app/services) uses the `environment.apiUrl`:

```typescript
constructor(private http: HttpClient) {
  this.apiUrl = environment.apiUrl;
}
```

---

## Part 6: Enable Redis Cache (Optional)

For the free tier, you can skip Redis or use Render's managed Redis:

1. Go to **Dashboard** → **New+** → **Redis**
2. Configure:
   - **Name**: `portfolio-redis`
   - **Region**: Same as backend
   - **Plan**: Free tier
3. Copy connection URL
4. Add to backend environment variables:
   ```env
   REDIS_URL=redis://:password@host:6379/0
   ```

---

## Part 7: Monitoring & Troubleshooting

### Check Backend Status
```bash
curl https://portfolio-backend.onrender.com/api/health
```

### View Logs
- Render Dashboard → Service → **Logs** tab
- Check for database connection errors
- Monitor startup time (free tier may be slow)

### Common Issues

| Issue | Solution |
|-------|----------|
| **502 Bad Gateway** | Check backend logs, verify DATABASE_URL, ensure schema is initialized |
| **CORS errors in frontend** | Update `FRONTEND_ORIGIN` in backend environment variables |
| **Slow startup on free tier** | Free tier services spin down after 15 mins of inactivity; upgrade to paid or use cron jobs |
| **Database connection failed** | Verify DATABASE_URL format, check Render firewall/IP allowlist |
| **Build fails** | Check build command, ensure requirements.txt exists, verify Node/Python versions |

### Enable Render Cron Job (Keep Backend Alive)

Prevent free tier from spinning down:

1. Go to backend service → **Cron**
2. Add new cron job:
   - **Path**: `/api/health`
   - **Schedule**: Every 14 minutes
   - **Notifications**: On failure

---

## Part 8: Custom Domain (Optional)

1. Go to service → **Settings** → **Custom Domain**
2. Enter your domain: `api.yourdomain.com`
3. Add DNS records as instructed by Render
4. Update frontend `environment.ts` with new domain

---

## Part 9: SSL Certificate

Render automatically provides free SSL certificates. HTTPS is enabled by default on `.onrender.com` domains.

---

## Part 10: CI/CD with GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Trigger Render Deploy
        env:
          RENDER_DEPLOY_HOOK: ${{ secrets.RENDER_DEPLOY_HOOK }}
        run: curl $RENDER_DEPLOY_HOOK
```

To set up:
1. Backend service → **Settings** → **Deploy Hook**
2. Copy webhook URL
3. Add as GitHub Secret: `Settings` → `Secrets` → `RENDER_DEPLOY_HOOK`

---

## Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] PostgreSQL database created on Render
- [ ] Backend service created with correct build/start commands
- [ ] Database schema initialized (`schema.sql` executed)
- [ ] Environment variables configured in Render (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Frontend service created with correct build command
- [ ] Frontend `environment.ts` updated with production API URL
- [ ] CORS configured correctly (FRONTEND_ORIGIN set)
- [ ] Backend health check endpoint working
- [ ] Frontend successfully loads and connects to backend
- [ ] Contact form sends emails to CONTACT_TO_EMAIL
- [ ] Custom domain set up (optional)
- [ ] Cron job configured to keep free tier alive (optional)

---

## Quick Reference: Environment Variables

| Variable | Value |
|----------|-------|
| `APP_ENV` | `production` |
| `DATABASE_URL` | From Render PostgreSQL dashboard |
| `REDIS_URL` | From Render Redis (or skip) |
| `FRONTEND_ORIGIN` | `https://your-frontend.onrender.com` |
| `JWT_SECRET` | Generate with `openssl rand -hex 32` |
| `OPENAI_API_KEY` | From OpenAI dashboard (optional) |
| `CONTACT_TO_EMAIL` | Your email address |

---

## Post-Deployment Monitoring

1. **Monitor uptime** on Render dashboard
2. **View logs** regularly for errors
3. **Update dependencies** monthly with `pip` and `npm`
4. **Backup database** weekly (Render provides automated backups)
5. **Monitor costs** on free tier; upgrade if needed

---

## Upgrading from Free to Paid Tier

When ready:
1. Go to service → **Settings** → **Plan**
2. Select **Pro** or **Standard** plan
3. Database always runs (no spin-down)
4. Better performance and reliability
5. Refer to Render pricing page for current rates

---

## Support

- [Render.com Documentation](https://render.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Angular Build Guide](https://angular.io/guide/build)

Happy deploying! 🚀
