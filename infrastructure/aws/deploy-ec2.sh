#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/mk-ai-command-center}"
BRANCH="${BRANCH:-main}"

if ! command -v docker >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y docker.io docker-compose-plugin
  sudo usermod -aG docker "$USER"
fi

sudo mkdir -p "$APP_DIR"
sudo chown "$USER":"$USER" "$APP_DIR"

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "${REPOSITORY_URL:?Set REPOSITORY_URL}" "$APP_DIR"
fi

cd "$APP_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

docker compose pull || true
docker compose build
docker compose up -d
docker image prune -f

