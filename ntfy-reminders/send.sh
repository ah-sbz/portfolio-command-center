#!/usr/bin/env bash
# send.sh — publish a reminder to ntfy (and optionally Mattermost)
# Usage: ./send.sh <topic> <message> [--tags=tag1,tag2] [--priority=1-5] [--mattermost]
#
# Examples:
#   ./send.sh freedom-grid-bots "Check PnL" --tags=money_chart --priority=3
#   ./send.sh freedom-weekly-review "Weekly summary" --mattermost

set -euo pipefail

NTFY_URL="http://localhost:2586"
MATTERMOST_WEBHOOK="http://localhost:8065/hooks/oq5dbrom4tbc8e8kfzw4ami6bo"

TOPIC="${1:-}"
MESSAGE="${2:-}"
shift 2 || true

TAGS=""
PRIORITY=""
MATTERMOST=false

for arg in "$@"; do
  case "$arg" in
    --tags=*)
      TAGS="${arg#--tags=}"
      ;;
    --priority=*)
      PRIORITY="${arg#--priority=}"
      ;;
    --mattermost)
      MATTERMOST=true
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 1
      ;;
  esac
done

# Build ntfy headers
NTFY_HEADERS=()
if [[ -n "$TAGS" ]]; then
  NTFY_HEADERS+=( -H "Tags: $TAGS" )
fi
if [[ -n "$PRIORITY" ]]; then
  NTFY_HEADERS+=( -H "Priority: $PRIORITY" )
fi

# Publish to ntfy
RESPONSE=$(curl -s -w "\n%{http_code}" \
  "${NTFY_HEADERS[@]}" \
  -d "$MESSAGE" \
  "$NTFY_URL/$TOPIC")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [[ "$HTTP_CODE" -ne 200 ]]; then
  echo "ntfy publish failed (HTTP $HTTP_CODE): $BODY" >&2
  exit 1
fi

echo "ntfy → $TOPIC: $MESSAGE"

# Optionally mirror to Mattermost for richer context (weekly reviews, etc.)
if [[ "$MATTERMOST" == true ]]; then
  MM_PAYLOAD=$(jq -n \
    --arg text "$MESSAGE" \
    --arg topic "$TOPIC" \
    '{text: "**Freedom Portfolio Reminder**\n\n*Topic:* \($topic)\n\n\($text)"}')

  MM_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$MM_PAYLOAD" \
    "$MATTERMOST_WEBHOOK")

  MM_CODE=$(echo "$MM_RESPONSE" | tail -n1)
  if [[ "$MM_CODE" != "ok" && "$MM_CODE" -ne 200 ]]; then
    echo "Mattermost webhook failed (HTTP $MM_CODE)" >&2
    exit 1
  fi
  echo "mattermost → freedom-portfolio channel"
fi
