#!/bin/bash
# PropAutopilot Twitter Agent Runner
# Runs a Claude session to produce daily Twitter content, reply drafts, and outreach research.
# Output goes to scripts/twitter-output/ with dated filenames.
#
# Usage: ./scripts/run-twitter-agent.sh
#        ./scripts/run-twitter-agent.sh --research   (weekly target account research)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/twitter-output"
DATE=$(date +%Y-%m-%d)
PROMPT_FILE="$SCRIPT_DIR/twitter-agent.md"

mkdir -p "$OUTPUT_DIR"

if [[ ! -f "$PROMPT_FILE" ]]; then
  echo "Error: twitter-agent.md not found at $PROMPT_FILE"
  exit 1
fi

PROMPT=$(cat "$PROMPT_FILE")

if [[ "${1:-}" == "--research" ]]; then
  TASK="Run the weekly target account research (section 4). Find 50-60 Australian property accounts on Twitter with 1k-30k followers. Output the full list with handles, follower counts, focus areas, and recent hot topics."
  OUTPUT_FILE="$OUTPUT_DIR/$DATE-research.md"
else
  TASK="Run a daily content session. Produce: (1) 5-8 reply opportunities with draft replies, (2) today's content queue (1 thread + 2-3 singles + 1 promo), (3) any DM drafts for accounts we haven't contacted yet."
  OUTPUT_FILE="$OUTPUT_DIR/$DATE-daily.md"
fi

echo "Running Twitter agent session..."
echo "Output: $OUTPUT_FILE"
echo ""

# Run via Claude CLI with web search for finding real tweets
claude --print "$PROMPT

---

TODAY'S TASK: $TASK

Search Twitter/X for the keywords listed above. Find real, recent tweets from Australian property investors and commentators. Draft replies and content based on what's actually being discussed today.

Output everything in markdown format, ready for human review." > "$OUTPUT_FILE" 2>/dev/null

if [[ -f "$OUTPUT_FILE" && -s "$OUTPUT_FILE" ]]; then
  echo "Done. Output saved to: $OUTPUT_FILE"
  echo "Word count: $(wc -w < "$OUTPUT_FILE")"
else
  echo "Warning: Output file is empty or missing. Check Claude CLI access."
  exit 1
fi
