from __future__ import annotations

import asyncio
from dataclasses import dataclass

from app.core.config import settings
from app.services.portfolio_data import PROJECTS, RESUME


@dataclass(frozen=True)
class RetrievedContext:
    text: str
    sources: list[str]


class PortfolioAIService:
    """AI service boundary for OpenAI/LangChain/RAG integration.

    The fallback path keeps local development useful without requiring an API key.
    """

    async def retrieve_context(self, message: str) -> RetrievedContext:
        query = message.lower()
        matched_projects = [project for project in PROJECTS if query in project["title"].lower() or project["category"].lower() in query]
        if not matched_projects:
            matched_projects = PROJECTS[:5]
        context_lines = [
            f"Candidate: {RESUME['name']} - {RESUME['title']}",
            f"Summary: {RESUME['summary']}",
            "Achievements: " + "; ".join(RESUME["achievements"]),
            "Projects: " + "; ".join(f"{project['title']} ({project['impact']})" for project in matched_projects[:5])
        ]
        return RetrievedContext(text="\n".join(context_lines), sources=[project["title"] for project in matched_projects[:5]])

    async def answer(self, message: str, history: list[dict[str, str]] | None = None) -> str:
        context = await self.retrieve_context(message)
        if settings.openai_api_key:
            try:
                return await self._answer_with_openai(message=message, context=context, history=history or [])
            except Exception:
                return self._fallback_answer(message, context)
        return self._fallback_answer(message, context)

    async def stream_answer(self, message: str, history: list[dict[str, str]] | None = None):
        answer = await self.answer(message, history)
        for token in answer.split(" "):
            yield token + " "
            await asyncio.sleep(0.025)

    async def _answer_with_openai(self, message: str, context: RetrievedContext, history: list[dict[str, str]]) -> str:
        from openai import AsyncOpenAI

        client = AsyncOpenAI(api_key=settings.openai_api_key)
        messages = [
            {
                "role": "system",
                "content": (
                    "You are MK-AI Assistant, a concise hiring and portfolio assistant for Mrityunjay Kumar. "
                    "Use the provided context, emphasize verified experience, and avoid inventing employers or credentials."
                )
            },
            {"role": "system", "content": context.text},
            *history[-8:],
            {"role": "user", "content": message}
        ]
        response = await client.chat.completions.create(model="gpt-4.1-mini", messages=messages, temperature=0.35)
        return response.choices[0].message.content or self._fallback_answer(message, context)

    def _fallback_answer(self, message: str, context: RetrievedContext) -> str:
        query = message.lower()
        if "hire" in query or "recommend" in query:
            return (
                "Hiring recommendation: Mrityunjay is a strong fit for senior Python backend, full stack, and AI engineering roles. "
                "He combines FastAPI/Django architecture, Angular delivery, PostgreSQL design, Docker/AWS deployment, and measurable production impact."
            )
        if "project" in query:
            return "Project portfolio includes " + ", ".join(context.sources) + ". Each emphasizes API design, database modeling, cloud deployment, and business impact."
        if "architecture" in query or "scale" in query:
            return (
                "Preferred architecture: Angular frontend, FastAPI or Django APIs, PostgreSQL source of truth, Redis cache and queues, "
                "Celery workers, WebSockets for realtime, Dockerized services, and AWS EC2/S3/CloudFront deployments."
            )
        if "resume" in query or "summary" in query:
            return f"{RESUME['name']} is a {RESUME['title']} based in {RESUME['location']}. {RESUME['summary']}"
        return (
            "Mrityunjay builds production Python backends, Angular interfaces, AI assistants, RAG pipelines, realtime systems, and cloud deployments. "
            "Ask about projects, architecture, hiring fit, or resume details."
        )


portfolio_ai = PortfolioAIService()

