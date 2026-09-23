#!/usr/bin/env bash
# Build production, serve it on :3001, then run Lighthouse against that —
# never against `next dev`, which scores in the 40s from compile-on-request.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PORT="${PORT:-3001}"
URL="http://127.0.0.1:${PORT}"
REPORT="$ROOT/lighthouse.report.html"

if curl -sf "$URL" >/dev/null 2>&1; then
  echo "Port ${PORT} is already in use. Stop that process or set PORT=…" >&2
  exit 1
fi

npm run build

npx next start -p "$PORT" &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
  wait "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT

ready=0
for _ in $(seq 1 60); do
  if curl -sf "$URL" >/dev/null 2>&1; then
    ready=1
    break
  fi
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "next start exited before it became ready." >&2
    exit 1
  fi
  sleep 0.5
done

if [ "$ready" -ne 1 ]; then
  echo "Timed out waiting for ${URL}" >&2
  exit 1
fi

npx --yes lighthouse "$URL" \
  --view \
  --chrome-flags="--headless=new" \
  --output=html \
  --output-path="$REPORT" \
  "$@"
