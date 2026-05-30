from __future__ import annotations

from uuid import uuid4

from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.models import ContactLead
from app.db.session import get_db
from app.schemas import ContactRequest, ContactResponse

router = APIRouter(prefix="/contact", tags=["contact"])


def enqueue_contact_email(lead_id: str, payload: ContactRequest) -> None:
    # Replace this with SES, SendGrid, or a Celery task in production.
    print(f"Contact lead {lead_id} queued for {settings.contact_to_email}: {payload.email}")


@router.post("", response_model=ContactResponse, status_code=202)
async def create_contact_lead(payload: ContactRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)) -> ContactResponse:
    lead_id = str(uuid4())
    db.add(ContactLead(id=lead_id, name=payload.name, email=payload.email, message=payload.message, source=payload.source))
    db.commit()
    background_tasks.add_task(enqueue_contact_email, lead_id, payload)
    return ContactResponse(lead_id=lead_id, status="queued", next_step="Mrityunjay will reply from krmrityunjay13@gmail.com.")

