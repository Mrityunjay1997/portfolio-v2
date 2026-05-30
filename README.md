# MK AI Command Center Portfolio

Production-ready portfolio scaffold for **Mrityunjay Kumar**, Senior Python Backend Engineer, Full Stack Developer, and AI Solutions Architect.

## What Is Included

- Angular 19 standalone frontend with Three.js, GSAP, Angular animations, TailwindCSS, PWA metadata, SEO tags, responsive layouts, project modals, assistant UI, skills galaxy, code visualization, and Easter eggs.
- FastAPI backend with modules for chat, resume, contact, analytics, projects, blog, JWT, OpenAI/LangChain-ready AI service, PostgreSQL models, Redis-ready architecture, Server-Sent Events, and WebSockets.
- PostgreSQL schema, Docker Compose, frontend Nginx reverse proxy, GitHub Actions CI/CD, and AWS EC2/S3/CloudFront deployment notes.

## Local Development

This project uses Angular 19 so it works with Node 18.19+; your current Node 18.20.x is supported.

```bash
cp .env.example .env
npm --prefix frontend install
pip install -r backend/requirements.txt
docker compose up postgres redis -d
npm --prefix frontend run start
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --app-dir backend
```

Frontend: `http://localhost:4200`

Backend docs: `http://localhost:8000/api/docs`

## Full Docker Stack

```bash
cp .env.example .env
docker compose up --build
```

Open `http://localhost:4200`.

## AI Configuration

The assistant works locally with deterministic fallback responses. Add `OPENAI_API_KEY` to `.env` to enable live OpenAI-backed responses through `backend/app/services/ai_service.py`.

The RAG boundary is intentionally isolated in `PortfolioAIService.retrieve_context()` so Chroma, Pinecone, or a managed vector database can be introduced without changing route contracts.

## Easter Eggs

- Type `sudo hire mrityunjay` in the hero command bar.
- Type `show achievements`.
- Enter the Konami code to reveal the hiring recommendation report.

## API Overview

- `GET /health`
- `POST /api/auth/token`
- `POST /api/chat`
- `GET /api/chat/stream?message=...`
- `WS /ws/chat`
- `GET /api/projects`
- `GET /api/projects/{project_id}`
- `GET /api/blog`
- `GET /api/resume`
- `POST /api/contact`
- `POST /api/analytics/events`

## Deployment

Use `docker-compose.yml` for a single-host deployment on EC2, or build the Angular app for S3/CloudFront and run FastAPI behind an EC2/Nginx or load balancer origin.

`infrastructure/aws/deploy-ec2.sh` is a repeatable EC2 deployment helper. Set `REPOSITORY_URL` and run it on the instance.
