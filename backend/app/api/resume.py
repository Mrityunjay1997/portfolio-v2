from __future__ import annotations

from fastapi import APIRouter

from app.schemas import ResumeResponse
from app.services.portfolio_data import RESUME

router = APIRouter(prefix="/resume", tags=["resume"])


@router.get("", response_model=ResumeResponse)
async def get_resume() -> dict[str, object]:
    return RESUME

