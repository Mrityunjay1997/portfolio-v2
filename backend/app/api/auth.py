from __future__ import annotations

from fastapi import APIRouter

from app.core.security import create_access_token
from app.schemas import TokenRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/token", response_model=TokenResponse)
async def issue_token(payload: TokenRequest) -> TokenResponse:
    return TokenResponse(access_token=create_access_token(payload.subject))

