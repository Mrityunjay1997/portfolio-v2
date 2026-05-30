from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import analytics, auth, blog, chat, contact, projects, resume
from app.core.config import settings
from app.schemas import HealthResponse

app = FastAPI(
    title="MK AI Command Center API",
    version="1.0.0",
    description="FastAPI backend for Mrityunjay Kumar's AI-powered portfolio.",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(chat.websocket_router)
app.include_router(projects.router, prefix="/api")
app.include_router(blog.router, prefix="/api")
app.include_router(resume.router, prefix="/api")
app.include_router(contact.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")


@app.get("/health", response_model=HealthResponse, tags=["health"])
async def health() -> HealthResponse:
    return HealthResponse(status="ok", service="mk-ai-command-center-api", environment=settings.app_env)

