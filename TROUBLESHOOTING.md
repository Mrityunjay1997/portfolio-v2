# Troubleshooting Guide: GitHub + Render.com Deployment

Common issues and solutions when deploying your portfolio app.

---

## Backend Issues

### 🔴 502 Bad Gateway / Service Unavailable

**Symptoms**: Getting 502 error when accessing backend URL

**Solutions**:
1. Wait 2-3 minutes (backend might still be starting)
2. Check logs: Dashboard → Backend Service → **Logs**
3. Look for specific errors:
   - **Database connection error**: DATABASE_URL is wrong or database isn't ready
   - **Module not found**: Missing package in requirements.txt
   - **Bind error**: Port already in use (shouldn't happen on Render)

**Fix DATABASE_URL issue**:
```bash
# Test connection locally first
psql "postgresql+psycopg://user:password@host:5432/portfolio"
```

### ❌ Database Connection Refused

**Error in logs**: 
```
psycopg2.OperationalError: could not connect to server: Connection refused
```

**Solutions**:
1. Verify DATABASE_URL environment variable is set correctly
2. Check database still exists: Dashboard → PostgreSQL → Check status
3. Wait for database to fully initialize (first 10 mins after creation)
4. Verify DATABASE_URL format:
   ```
   postgresql+psycopg://user:password@host:5432/database
   ```

### 🔌 Schema Not Initialized

**Symptoms**: Getting 500 errors from API, or "table doesn't exist"

**Fix**:
```bash
# In backend service Shell:
psql $DATABASE_URL < backend/app/db/schema.sql

# Verify:
psql $DATABASE_URL -c "\dt"  # List all tables
```

### ⏰ Service Keeps Spinning Down

**Problem**: Free tier stops after 15 minutes of inactivity

**Solution 1: Set up Cron Job** (Free)
- Backend service → **Cron** tab
- Add cron job:
  - **Path**: `/api/health`
  - **Schedule**: Every 14 minutes

**Solution 2: Upgrade Plan** (Paid)
- Service → **Settings** → **Plan**
- Select "Pro" or "Standard"

### 🐍 Python Version Mismatch

**Error**: `Python 3.12 required but 3.11 installed`

**Fix**: 
1. Edit backend/Dockerfile:
   ```dockerfile
   FROM python:3.11-slim  # Change this if needed
   ```
2. Or ensure requirements.txt matches Python version
3. Rebuild and redeploy

### 📦 Missing Python Package

**Error**: `ModuleNotFoundError: No module named 'xxx'`

**Fix**:
```bash
# Add to backend/requirements.txt
pip freeze > backend/requirements.txt

# Or manually add the package
echo "package-name==1.2.3" >> backend/requirements.txt

# Push changes
git add backend/requirements.txt
git commit -m "Add missing dependency"
git push
```

---

## Frontend Issues

### ⚠️ CORS Error in Browser Console

**Error**:
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions**:

1. **Check backend FRONTEND_ORIGIN**:
   ```bash
   # Verify in backend service environment:
   FRONTEND_ORIGIN=https://portfolio-frontend.onrender.com
   ```

2. **Verify in backend code** [backend/app/core/config.py](backend/app/core/config.py):
   ```python
   @property
   def cors_origins(self) -> list[str]:
       if self.app_env == "production":
           return [self.frontend_origin]
       return [self.frontend_origin, "http://localhost:4200"]
   ```

3. **Update frontend API URL**:
   ```typescript
   // frontend/src/environment.ts
   export const environment = {
     production: true,
     apiUrl: 'https://portfolio-backend.onrender.com'  // Exact domain
   };
   ```

4. **Rebuild and push**:
   ```bash
   git add frontend/src/environment.ts
   git commit -m "Fix API URL"
   git push
   ```

### 🌐 Frontend Blank Page / 404

**Symptoms**: Page loads but shows 404 or is blank

**Solutions**:
1. Check build directory in Logs
2. Verify **Publish Directory** is set correctly:
   - Should be: `frontend/dist/mk-ai-command-center/browser`
3. Check browser console (F12) for JavaScript errors
4. Rebuild frontend:
   ```bash
   cd frontend
   npm run build
   # Check if dist/ folder created
   ls dist/
   ```

### 🔴 Build Fails - "Cannot find module"

**Error in logs**: 
```
Cannot find module '@angular/...'
```

**Fix**:
```bash
cd frontend
npm install  # Install all dependencies
npm run build  # Rebuild

# Check dist folder exists:
ls dist/mk-ai-command-center/browser/index.html

# Push if successful
git add .
git commit -m "Rebuild with all dependencies"
git push
```

### ⚙️ Wrong API URL Hardcoded

**Problem**: API calls still going to localhost

**Solution**:
1. Find all hardcoded URLs:
   ```bash
   grep -r "localhost:8000" frontend/src/
   grep -r "127.0.0.1" frontend/src/
   ```

2. Replace with environment variable:
   ```typescript
   import { environment } from '../environments/environment';
   
   constructor() {
     this.apiUrl = environment.apiUrl;  // Use environment config
   }
   ```

3. Ensure environment.ts has correct URL
4. Rebuild and push

---

## Git & Deployment Issues

### 🔴 Nothing Deploying After Push

**Problem**: Code pushed but service not redeploying

**Solutions**:

1. **Check GitHub push succeeded**:
   ```bash
   git log --oneline -3  # See recent commits
   ```

2. **Verify CI/CD is running** (if set up):
   - GitHub → Your repo → **Actions**
   - Check for workflow runs
   - If failed, click to see error

3. **Manually trigger deploy**:
   - Service → **Settings** → **Deploy Hook** → Copy URL
   - Run: `curl -X POST <your-hook-url>`

4. **Force redeploy**:
   - Service → **Settings** → **General**
   - Click **Clear Build Cache** then **Trigger Deploy**

### 📝 Git Push Fails

**Error**: `fatal: 'origin' does not appear to be a git repository`

**Fix**:
```bash
git remote -v  # Check remotes
# If empty, add it:
git remote add origin https://github.com/USERNAME/portfolio-v2.git
git push -u origin main
```

### 🔑 GitHub Authentication Error

**Error**: `Permission denied (publickey)`

**Solutions**:
1. Use HTTPS instead of SSH:
   ```bash
   git remote set-url origin https://github.com/USERNAME/portfolio-v2.git
   ```

2. Or set up GitHub SSH key (more advanced)

---

## Environment Variable Issues

### ❌ Environment Variable Not Found

**Error**: `KeyError: 'SOME_VARIABLE'`

**Fix**:
1. Dashboard → Backend/Frontend Service → **Environment**
2. Verify variable is listed
3. Check exact spelling (case-sensitive!)
4. Click **Save**
5. Redeploy service

### 🔍 Wrong Value Being Used

**Problem**: Seems like old value is still being used

**Solution**:
1. Clear cache: Service → **Settings** → **Clear Build Cache**
2. Trigger deploy: **Trigger Deploy**
3. Check logs to verify new value loaded

---

## Performance Issues

### 🐢 Very Slow Response Times

**Causes on free tier**:
- Service spinning up (first request takes 30-60 seconds)
- Database initialization lag
- Too many requests at once

**Solutions**:
1. Wait for initial boot (can take 1-2 minutes)
2. Implement request queuing/rate limiting in backend
3. Upgrade to paid plan for instant response
4. Set up cron job to keep service warm

### 💾 Running Out of Storage

**Error**: `Disk space exceeded`

**Solutions**:
- Free tier has 100MB; check what's using it
- Remove old logs/temporary files
- Upgrade plan for more storage

---

## Database Issues

### 🔄 Schema Queries Timing Out

**Problem**: Database operations very slow

**Solutions**:
1. Check database size: 
   ```bash
   psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size('portfolio'));"
   ```

2. Add indexes to frequently queried columns
3. Consider upgrading database plan

### 🗑️ Need to Reset Database

**Careful!** This will delete all data:

```bash
# In backend service Shell:
psql $DATABASE_URL -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Reinitialize:
psql $DATABASE_URL < backend/app/db/schema.sql
```

---

## Monitoring & Debugging

### 📊 View Live Logs

```bash
# Backend logs
Service → Logs → Check for errors

# Frontend build output
Service → Logs → Look for "npm run build" output

# Database logs
PostgreSQL → Check startup messages
```

### 🔍 Test API Endpoints

```bash
# From your terminal:
curl https://portfolio-backend.onrender.com/api/health
curl https://portfolio-backend.onrender.com/api/docs  # OpenAPI docs

# Check response codes
curl -i https://portfolio-backend.onrender.com/api/health
```

### 📲 Enable Debug Logging

In backend service environment variables, add:
```env
DEBUG=True
LOG_LEVEL=DEBUG
```

### 🧪 Test Database Connection

```bash
# In backend Shell:
python -c "from sqlalchemy import create_engine; print(create_engine('$DATABASE_URL').execute('SELECT 1'))"
```

---

## Getting Help

### Useful Links

- **Render Status**: https://status.render.com
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Angular Docs**: https://angular.io/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

### Debug Checklist

Before asking for help, try:
- [ ] Check logs for specific error messages
- [ ] Test API directly with curl
- [ ] Verify all environment variables set
- [ ] Check database is initialized
- [ ] Clear cache and redeploy
- [ ] Verify git push succeeded to main
- [ ] Test locally with `docker compose up`

### Common Log Messages

| Message | Meaning | Fix |
|---------|---------|-----|
| `Connection refused` | Can't reach database | Check DATABASE_URL |
| `CORS error` | Frontend can't call backend | Update FRONTEND_ORIGIN |
| `ModuleNotFoundError` | Missing Python package | Add to requirements.txt |
| `Cannot find module` | Missing npm package | Run `npm install` |
| `Address already in use` | Port conflict | Shouldn't happen on Render |

---

## Still Stuck?

1. **Check the full deployment guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Search GitHub Issues**: https://github.com/YOUR_USERNAME/portfolio-v2/issues
3. **Render Support**: https://render.com/support
4. **FastAPI Community**: https://github.com/tiangolo/fastapi/discussions

---

**Good luck! Your portfolio will be live soon!** 🚀
