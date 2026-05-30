from __future__ import annotations

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    service: str
    environment: str


class TokenRequest(BaseModel):
    subject: str = Field(min_length=2, max_length=120)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    session_id: str | None = None
    history: list[dict[str, str]] = Field(default_factory=list)


class ChatResponse(BaseModel):
    answer: str
    sources: list[str] = Field(default_factory=list)
    recommended_prompts: list[str] = Field(default_factory=list)


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=140)
    email: str = Field(min_length=5, max_length=220)
    message: str = Field(min_length=10, max_length=5000)
    source: str = "portfolio"


class ContactResponse(BaseModel):
    lead_id: str
    status: str
    next_step: str


class AnalyticsEventRequest(BaseModel):
    event_name: str = Field(min_length=2, max_length=120)
    session_id: str = Field(min_length=2, max_length=160)
    payload: dict[str, object] = Field(default_factory=dict)


class AnalyticsEventResponse(BaseModel):
    accepted: bool
    event_name: str


class ProjectResponse(BaseModel):
    id: int
    title: str
    category: str
    summary: str
    stack: list[str]
    impact: str
    architecture: list[str]


class BlogPostResponse(BaseModel):
    title: str
    tag: str
    read_time: str
    summary: str


class ResumeResponse(BaseModel):
    name: str
    title: str
    location: str
    email: str
    phone: str
    summary: str
    skills: list[str]
    achievements: list[str]

