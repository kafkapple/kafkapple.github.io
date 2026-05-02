#!/bin/bash
# One-click deploy: sync RIL → JSON → commit → push.
# Safety: main branch only, allowlisted file staging, no --force, no --no-verify.
set -e

cd /Users/joon/dev/kafkapple.github.io

# Branch safety — only operate on main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Not on main (current: $BRANCH). Aborting."
    exit 1
fi

# Step 1: regenerate JSON from RIL
python3 scripts/sync_reading_list.py

# Step 2: detect changes in allowlisted files only
ALLOWLIST="_data/reading_list.json assets/data/reading_list.json _data/publish_settings.json scripts/sync_reading_list.py scripts/deploy.sh reading-list.md assets/js/reading-list.js"
CHANGED=$(git diff --name-only $ALLOWLIST 2>/dev/null)

if [ -z "$CHANGED" ]; then
    echo "✓ No allowlisted changes — nothing to deploy"
    exit 0
fi

# Step 3: stage allowlisted files only (refuse blanket git add)
for f in $ALLOWLIST; do
    if [ -f "$f" ]; then git add "$f"; fi
done

# Step 4: commit message includes count
COUNT=$(python3 -c "import json; print(json.load(open('_data/reading_list.json'))['meta']['total'])" 2>/dev/null || echo "?")

# Step 5: commit + push (no --force, no --no-verify)
git commit -m "deploy: reading list — ${COUNT} items ($(date +%Y-%m-%d))"
git push origin main

echo "✅ Deployed ${COUNT} items"
