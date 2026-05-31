#!/bin/bash
# Deployment Helper Script for GitHub + Render.com
# This script helps prepare your project for deployment

set -e

echo "🚀 Portfolio Deployment Setup Script"
echo "===================================="
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git is not installed${NC}"
    exit 1
fi

# Check if we're in the project root
if [ ! -f "docker-compose.yml" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Step 1: Initialize Git if needed
echo -e "${BLUE}Step 1: Git Repository Setup${NC}"
if [ -d ".git" ]; then
    echo "✓ Git repository already initialized"
else
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Portfolio app with FastAPI backend and Angular frontend"
    echo -e "${GREEN}✓ Git repository initialized${NC}"
fi

# Step 2: Create .env.production template
echo ""
echo -e "${BLUE}Step 2: Creating .env.production Template${NC}"
if [ ! -f ".env.production" ]; then
    cat > .env.production << 'EOF'
# Production Environment Configuration
APP_ENV=production
FRONTEND_ORIGIN=https://your-frontend-domain.onrender.com
OPENAI_API_KEY=your_openai_key_here
JWT_SECRET=generate-with-openssl-rand-hex-32
DATABASE_URL=postgresql+psycopg://user:password@host:5432/portfolio
REDIS_URL=redis://your-redis-host:6379/0
CHROMA_PERSIST_DIRECTORY=./data/chroma
CONTACT_TO_EMAIL=your-email@example.com
EOF
    echo -e "${GREEN}✓ Created .env.production template${NC}"
    echo "  ⚠️  Remember: Don't commit real secrets to this file!"
else
    echo "✓ .env.production already exists"
fi

# Step 3: Generate JWT Secret
echo ""
echo -e "${BLUE}Step 3: Generate JWT Secret${NC}"
if command -v openssl &> /dev/null; then
    JWT_SECRET=$(openssl rand -hex 32)
    echo -e "${GREEN}✓ Generated JWT_SECRET:${NC}"
    echo "  $JWT_SECRET"
    echo ""
    echo "  Add this to your Render.com backend environment variables as JWT_SECRET"
else
    echo -e "${YELLOW}⚠️  OpenSSL not found. Generate JWT_SECRET manually:${NC}"
    echo "  - Use an online tool: https://www.uuidgenerator.net/"
    echo "  - Or use Python: python -c \"import secrets; print(secrets.token_hex(32))\""
fi

# Step 4: Verify project structure
echo ""
echo -e "${BLUE}Step 4: Verifying Project Structure${NC}"
declare -a FILES=("backend/Dockerfile" "backend/requirements.txt" "backend/app/main.py" \
                   "frontend/Dockerfile" "frontend/package.json" "docker-compose.yml")

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo -e "${RED}✗ $file NOT FOUND${NC}"
    fi
done

# Step 5: Verify backend configuration
echo ""
echo -e "${BLUE}Step 5: Checking Backend Configuration${NC}"
if grep -q "FRONTEND_ORIGIN" backend/app/core/config.py; then
    echo "✓ Frontend origin configuration found"
else
    echo -e "${RED}✗ Frontend origin not configured in config.py${NC}"
fi

if grep -q "cors_origins" backend/app/core/config.py; then
    echo "✓ CORS configuration found"
else
    echo -e "${RED}✗ CORS configuration not found${NC}"
fi

# Step 6: Verify frontend environment
echo ""
echo -e "${BLUE}Step 6: Checking Frontend Configuration${NC}"
if [ -f "frontend/src/environments/environment.ts" ] || [ -f "frontend/src/environment.ts" ]; then
    echo "✓ Environment configuration file found"
    echo "  ⚠️  Update apiUrl to your Render backend URL before deploying"
else
    echo -e "${YELLOW}⚠️  Environment file not found at expected location${NC}"
    echo "  Update the API URL in your Angular app to point to Render backend"
fi

# Step 7: Git status
echo ""
echo -e "${BLUE}Step 7: Git Status${NC}"
echo "Current branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
echo "Commits: $(git rev-list --count HEAD 2>/dev/null || echo 'unknown')"

# Step 8: Summary and Next Steps
echo ""
echo -e "${GREEN}═════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Deployment Preparation Complete!${NC}"
echo -e "${GREEN}═════════════════════════════════════════════════════════════${NC}"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. CREATE GITHUB REPOSITORY"
echo "   - Go to https://github.com/new"
echo "   - Create a new repository (e.g., 'portfolio-v2')"
echo "   - Run: git remote add origin https://github.com/YOUR_USERNAME/portfolio-v2.git"
echo "   - Run: git branch -M main && git push -u origin main"
echo ""
echo "2. CREATE RENDER.COM DATABASE"
echo "   - Go to https://render.com/dashboard"
echo "   - New → PostgreSQL"
echo "   - Copy the External Database URL"
echo ""
echo "3. CREATE RENDER.COM BACKEND SERVICE"
echo "   - New → Web Service → Connect GitHub"
echo "   - Build Command: pip install -r requirements.txt"
echo "   - Start Command: cd backend && uvicorn app.main:app --host 0.0.0.0 --port \$PORT"
echo "   - Add environment variables from .env.production"
echo ""
echo "4. INITIALIZE DATABASE SCHEMA"
echo "   - Use Render Shell to run: psql \$DATABASE_URL < backend/app/db/schema.sql"
echo ""
echo "5. CREATE RENDER.COM FRONTEND SERVICE"
echo "   - New → Web Service → Connect GitHub"
echo "   - Build Command: cd frontend && npm install && npm run build"
echo "   - Publish Directory: frontend/dist/mk-ai-command-center/browser"
echo ""
echo "6. UPDATE & TEST"
echo "   - Update frontend environment.ts with your backend URL"
echo "   - Test API connectivity: curl https://your-backend.onrender.com/api/health"
echo ""
echo "📚 Full guide: DEPLOYMENT.md"
echo ""
echo "💡 Need help? Check:"
echo "   - Backend logs in Render Dashboard → Backend Service → Logs"
echo "   - GitHub: https://github.com/YOUR_USERNAME/portfolio-v2"
echo "   - Render: https://render.com/dashboard"
echo ""
