from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.models import AnalyticsEvent
from app.db.session import get_db
from app.schemas import AnalyticsEventRequest, AnalyticsEventResponse

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.post("/events", response_model=AnalyticsEventResponse, status_code=202)
async def record_event(payload: AnalyticsEventRequest, db: Session = Depends(get_db)) -> AnalyticsEventResponse:
    db.add(AnalyticsEvent(event_name=payload.event_name, session_id=payload.session_id, payload=payload.payload))
    db.commit()
    return AnalyticsEventResponse(accepted=True, event_name=payload.event_name)

