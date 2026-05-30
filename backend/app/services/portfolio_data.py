from __future__ import annotations

RESUME = {
    "name": "Mrityunjay Kumar",
    "title": "Senior Python Backend Engineer | Full Stack Developer | AI Solutions Architect",
    "location": "India",
    "email": "krmrityunjay13@gmail.com",
    "phone": "+91 7562028303",
    "summary": "Senior Python full stack developer with 4+ years building APIs, AI systems, data pipelines, dashboards, and cloud deployments.",
    "skills": [
        "Python",
        "Django",
        "FastAPI",
        "Angular",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "Docker",
        "AWS",
        "OpenAI",
        "LangChain",
        "RAG",
        "WebSockets",
        "CI/CD"
    ],
    "achievements": [
        "Reduced development effort by 50%",
        "Improved team efficiency by 40%",
        "Top 5% performer",
        "Improved response times by 40%",
        "Reduced manual work by 200+ hours/month",
        "Built systems serving 500K+ users"
    ]
}

PROJECTS = [
    {"id": 1, "title": "AI Resume Screener", "category": "AI Projects", "summary": "RAG-backed resume ranking and explainable scorecards.", "stack": ["FastAPI", "OpenAI", "LangChain", "PostgreSQL"], "impact": "Cut review time by 60%", "architecture": ["Upload", "Parser", "Embeddings", "Retriever", "Scorer"]},
    {"id": 2, "title": "AI Interview Assistant", "category": "AI Projects", "summary": "Adaptive interview prompts, transcripts, and hiring summaries.", "stack": ["Python", "WebSockets", "OpenAI", "Redis"], "impact": "Standardized interview feedback", "architecture": ["Prompt", "Realtime Socket", "LLM", "Transcript", "Summary"]},
    {"id": 3, "title": "AI Document Chat", "category": "AI Projects", "summary": "Document intelligence over PDFs and knowledge bases.", "stack": ["FastAPI", "Chroma", "RAG", "Angular"], "impact": "Saved 200+ hours/month", "architecture": ["Docs", "Chunks", "Vectors", "Retriever", "Answer"]},
    {"id": 4, "title": "AI Meeting Summarizer", "category": "AI Projects", "summary": "Meetings to actions, owners, and searchable notes.", "stack": ["Python", "OpenAI", "Celery", "S3"], "impact": "Improved follow-through", "architecture": ["Audio", "Transcribe", "Summarize", "Tasks", "Notify"]},
    {"id": 5, "title": "AI Customer Support Bot", "category": "AI Projects", "summary": "Tier-one support automation with escalation and quality analytics.", "stack": ["LangChain", "FastAPI", "Redis", "PostgreSQL"], "impact": "Faster first responses", "architecture": ["Intent", "Knowledge", "Tool Call", "Escalate", "Analyze"]},
    {"id": 6, "title": "ERP System", "category": "Backend Projects", "summary": "Finance, inventory, approvals, and reporting modules.", "stack": ["Django", "PostgreSQL", "Celery", "Docker"], "impact": "Unified operations", "architecture": ["Modules", "RBAC", "Jobs", "Reports", "Audit"]},
    {"id": 7, "title": "CRM Platform", "category": "Backend Projects", "summary": "Lead lifecycle, pipeline forecasting, and activity timelines.", "stack": ["Django REST", "Redis", "Angular", "AWS"], "impact": "Improved sales visibility", "architecture": ["Leads", "Pipeline", "Tasks", "Forecast", "Reports"]},
    {"id": 8, "title": "Inventory Management", "category": "Backend Projects", "summary": "Stock, purchase, vendor, warehouse, and barcode workflows.", "stack": ["FastAPI", "PostgreSQL", "Redis", "Docker"], "impact": "Reduced stock mismatch", "architecture": ["Stock", "Vendors", "Warehouses", "Alerts", "Audit"]},
    {"id": 9, "title": "Order Management", "category": "Backend Projects", "summary": "Distributed order lifecycle with dispatch automation.", "stack": ["Python", "RabbitMQ", "PostgreSQL", "Nginx"], "impact": "Handled high-volume ordering", "architecture": ["Order", "Payment", "Queue", "Dispatch", "Status"]},
    {"id": 10, "title": "Payment Gateway System", "category": "Backend Projects", "summary": "Payments, webhooks, reconciliation, and retries.", "stack": ["FastAPI", "PostgreSQL", "JWT", "AWS"], "impact": "Improved reliability", "architecture": ["Checkout", "Webhook", "Reconcile", "Retry", "Ledger"]},
    {"id": 11, "title": "Subscription Platform", "category": "SaaS Projects", "summary": "Plans, trials, billing events, invoices, and entitlements.", "stack": ["Django", "Stripe", "Celery", "PostgreSQL"], "impact": "Enabled recurring revenue", "architecture": ["Plans", "Billing", "Entitlements", "Invoices", "Events"]},
    {"id": 12, "title": "Analytics Dashboard", "category": "SaaS Projects", "summary": "Executive metrics, funnels, and drill-down dashboards.", "stack": ["Angular", "FastAPI", "Redis", "Charts"], "impact": "Improved decision speed", "architecture": ["Events", "Aggregates", "Cache", "Charts", "Exports"]},
    {"id": 13, "title": "Multi-Tenant SaaS", "category": "SaaS Projects", "summary": "Tenant isolation, RBAC, billing, audit logs, and configuration.", "stack": ["FastAPI", "PostgreSQL", "Docker", "AWS"], "impact": "Scaled across clients", "architecture": ["Tenant", "RBAC", "Config", "Billing", "Audit"]},
    {"id": 14, "title": "Chat Application", "category": "Real-Time Systems", "summary": "Rooms, typing states, receipts, moderation, and presence.", "stack": ["WebSockets", "Redis", "FastAPI", "Angular"], "impact": "Low-latency messaging", "architecture": ["Socket", "Presence", "Rooms", "Receipts", "Moderation"]},
    {"id": 15, "title": "Notification Engine", "category": "Real-Time Systems", "summary": "Email, SMS, push, and in-app notification orchestration.", "stack": ["Celery", "Redis", "Python", "PostgreSQL"], "impact": "Centralized delivery", "architecture": ["Rule", "Queue", "Provider", "Retry", "Audit"]},
    {"id": 16, "title": "Live Tracking Platform", "category": "Real-Time Systems", "summary": "Location ingestion, route updates, and geofencing.", "stack": ["FastAPI", "WebSockets", "PostGIS", "Angular"], "impact": "Improved field visibility", "architecture": ["GPS", "Ingest", "Geofence", "Socket", "Dashboard"]},
    {"id": 17, "title": "Product Analytics Pipeline", "category": "Data Engineering", "summary": "Event ingestion, transformations, cohorts, and reporting.", "stack": ["Python", "PostgreSQL", "S3", "Airflow"], "impact": "Reliable telemetry", "architecture": ["Events", "Raw", "Transform", "Cohorts", "Reports"]},
    {"id": 18, "title": "ETL Framework", "category": "Data Engineering", "summary": "Reusable extraction, validation, retry, and quality checks.", "stack": ["Python", "Pandas", "Celery", "Docker"], "impact": "Reduced data repair", "architecture": ["Extract", "Validate", "Transform", "Retry", "Load"]},
    {"id": 19, "title": "Web Scraping Engine", "category": "Data Engineering", "summary": "Scheduler-driven crawling, parsing, dedupe, and monitoring.", "stack": ["Python", "Playwright", "Redis", "PostgreSQL"], "impact": "Automated intelligence", "architecture": ["Schedule", "Crawl", "Parse", "Dedupe", "Monitor"]},
    {"id": 20, "title": "HR Management", "category": "Enterprise Applications", "summary": "Employees, leave, attendance, payroll, and approvals.", "stack": ["Django", "PostgreSQL", "Angular", "JWT"], "impact": "Streamlined HR", "architecture": ["Employees", "Leave", "Payroll", "Approvals", "Reports"]},
    {"id": 21, "title": "Learning Management System", "category": "Enterprise Applications", "summary": "Courses, assessments, progress, certificates, and analytics.", "stack": ["Django REST", "Angular", "Redis", "AWS"], "impact": "Improved training delivery", "architecture": ["Courses", "Assessments", "Progress", "Certificates", "Analytics"]},
    {"id": 22, "title": "Healthcare Management Portal", "category": "Enterprise Applications", "summary": "Patients, appointments, reports, access, and audit workflows.", "stack": ["FastAPI", "PostgreSQL", "Docker", "CloudFront"], "impact": "Better care coordination", "architecture": ["Patients", "Appointments", "Reports", "RBAC", "Audit"]}
]

BLOG_POSTS = [
    {"title": "Python Best Practices for Production APIs", "tag": "Python", "read_time": "7 min", "summary": "Typing, validation, observability, and deployments for durable backend systems."},
    {"title": "FastAPI Performance Playbook", "tag": "FastAPI", "read_time": "6 min", "summary": "Async boundaries, caching, connection pooling, and background workloads."},
    {"title": "Django Architecture That Scales", "tag": "Django", "read_time": "8 min", "summary": "Modular apps, services, selectors, tasks, and query tuning."},
    {"title": "AI Engineering Beyond Prompting", "tag": "AI", "read_time": "9 min", "summary": "RAG evaluation, tool calls, memory, streaming, and safety rails."},
    {"title": "System Design for Product Teams", "tag": "Architecture", "read_time": "10 min", "summary": "Tradeoffs for event systems, queues, caches, APIs, and deployment patterns."}
]

