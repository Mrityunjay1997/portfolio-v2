#!/bin/bash
# Quick deployment checklist script
# Run this to verify everything is ready for deployment

PASS="${GREEN}✓${NC}"
FAIL="${RED}✗${NC}"
INFO="${BLUE}ℹ${NC}"

echo "📋 Deployment Readiness Checklist"
echo "=================================="
echo ""

# Check 1: GitHub
echo "1. GitHub Repository"
if git remote -v | grep -q "origin"; then
    echo -e "$PASS Repository remote configured"
else
    echo -e "$FAIL No remote repository configured"
    echo "   Run: git remote add origin https://github.com/USERNAME/portfolio-v2.git"
fi

# Check 2: Environment file
echo ""
echo "2. Environment Configuration"
if [ -f ".env.production" ]; then
    echo -e "$PASS .env.production exists"
    if grep -q "FRONTEND_ORIGIN" .env.production; then
        echo -e "$PASS FRONTEND_ORIGIN configured"
    else
        echo -e "$INFO Need to set FRONTEND_ORIGIN in .env.production"
    fi
else
    echo -e "$FAIL .env.production not found"
fi

# Check 3: Backend files
echo ""
echo "3. Backend Setup"
if [ -f "backend/Dockerfile" ]; then
    echo -e "$PASS Dockerfile exists"
else
    echo -e "$FAIL backend/Dockerfile not found"
fi

if [ -f "backend/requirements.txt" ]; then
    echo -e "$PASS requirements.txt exists"
else
    echo -e "$FAIL backend/requirements.txt not found"
fi

if [ -f "backend/app/db/schema.sql" ]; then
    echo -e "$PASS Database schema exists"
else
    echo -e "$FAIL backend/app/db/schema.sql not found"
fi

# Check 4: Frontend files
echo ""
echo "4. Frontend Setup"
if [ -f "frontend/Dockerfile" ]; then
    echo -e "$PASS Dockerfile exists"
else
    echo -e "$FAIL frontend/Dockerfile not found"
fi

if [ -f "frontend/package.json" ]; then
    echo -e "$PASS package.json exists"
else
    echo -e "$FAIL frontend/package.json not found"
fi

if [ -f "frontend/angular.json" ]; then
    echo -e "$PASS Angular config exists"
else
    echo -e "$FAIL frontend/angular.json not found"
fi

# Check 5: Git status
echo ""
echo "5. Git Status"
if [ -d ".git" ]; then
    echo -e "$PASS Git repository initialized"
    BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    COMMITS=$(git rev-list --count HEAD 2>/dev/null)
    echo "   Branch: $BRANCH | Commits: $COMMITS"
else
    echo -e "$FAIL Git repository not initialized"
    echo "   Run: git init && git add . && git commit -m 'Initial commit'"
fi

echo ""
echo "=================================="
echo "Status check complete!"
echo ""
echo "When all checks pass, you're ready to:"
echo "1. Push to GitHub: git push -u origin main"
echo "2. Create services on Render.com"
echo "3. Configure environment variables"
echo "4. Run database migration"
echo ""
echo "See DEPLOYMENT.md for detailed instructions."
echo ""
