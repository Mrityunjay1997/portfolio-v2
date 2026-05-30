from __future__ import annotations

import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse

from app.schemas import ChatRequest, ChatResponse
from app.services.ai_service import portfolio_ai

router = APIRouter(prefix="/chat", tags=["chat"])
websocket_router = APIRouter(tags=["websocket"])


@router.post("", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    context = await portfolio_ai.retrieve_context(payload.message)
    answer = await portfolio_ai.answer(payload.message, payload.history)
    return ChatResponse(
        answer=answer,
        sources=context.sources,
        recommended_prompts=[
            "Why hire Mrityunjay?",
            "Explain his AI Document Chat architecture.",
            "What are his strongest backend skills?"
        ]
    )


@router.get("/stream")
async def stream_chat(message: str) -> StreamingResponse:
    async def event_stream():
        async for token in portfolio_ai.stream_answer(message):
            yield f"data: {json.dumps({'token': token})}\n\n"
        yield "event: done\ndata: {}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@websocket_router.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket) -> None:
    await websocket.accept()
    try:
        while True:
            payload = await websocket.receive_json()
            message = str(payload.get("message", ""))
            history = payload.get("history", [])
            async for token in portfolio_ai.stream_answer(message, history if isinstance(history, list) else []):
                await websocket.send_json({"type": "token", "token": token})
            await websocket.send_json({"type": "done"})
    except WebSocketDisconnect:
        return

