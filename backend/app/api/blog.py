from __future__ import annotations

from fastapi import APIRouter

from app.schemas import BlogPostResponse
from app.services.portfolio_data import BLOG_POSTS

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("", response_model=list[BlogPostResponse])
async def list_blog_posts(search: str | None = None) -> list[dict[str, str]]:
    if not search:
        return BLOG_POSTS
    needle = search.lower()
    return [post for post in BLOG_POSTS if needle in post["title"].lower() or needle in post["summary"].lower() or needle in post["tag"].lower()]

