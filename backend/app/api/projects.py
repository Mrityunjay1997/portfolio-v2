from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.schemas import ProjectResponse
from app.services.portfolio_data import PROJECTS

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[ProjectResponse])
async def list_projects(category: str | None = None) -> list[dict[str, object]]:
    if category:
        return [project for project in PROJECTS if project["category"].lower() == category.lower()]
    return PROJECTS


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int) -> dict[str, object]:
    for project in PROJECTS:
        if project["id"] == project_id:
            return project
    raise HTTPException(status_code=404, detail="Project not found")

