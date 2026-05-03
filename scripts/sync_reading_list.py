#!/usr/bin/env python3
"""Sync Research_Interests_Literature.md → _data/reading_list.json for GitHub Pages.

Publish gate (2026-05-02 final):
  - ONLY explicit opt-in: [publish:: yes]
  - REMOVED: priority>=5 auto-publish (subjective + double-counted with tier)
  - REMOVED: tier S/A auto-publish (sync should not depend on internal scoring;
    user prefers manual curation only)

Tier is NEVER serialized — internal scoring artifact, not a fact.
Output JSON contains only verifiable fields (citation/venue/year/author).
"""

import re
import json
from pathlib import Path

ROOT  = Path(__file__).parent.parent
SRC   = ROOT / "_obsidian" / "reading_list.md"
DEST  = ROOT / "assets" / "data" / "reading_list.json"
DEST2 = ROOT / "_data" / "reading_list.json"  # for Liquid templates
SETTINGS = ROOT / "_data" / "publish_settings.json"  # field exposure toggles

# Always-exported core fields (cannot be toggled off — needed for any rendering)
REQUIRED_FIELDS = {"title", "url"}


def load_field_settings() -> dict:
    """Load field-exposure toggles. Default: all true if file missing."""
    if not SETTINGS.exists():
        return {}
    try:
        return json.loads(SETTINGS.read_text()).get("fields", {})
    except (json.JSONDecodeError, KeyError):
        return {}


def parse_inline(line: str, field: str, default="") -> str:
    # Match both [field:: "Quoted"] and [field:: Unquoted] formats.
    # Dashboard toggle writes unquoted (e.g. [publish:: yes]); S2 fetch writes
    # quoted strings (e.g. [memo:: "..."]). Fall through quoted → unquoted.
    m = re.search(rf'\[{field}:: "([^"]*)"\]', line)
    if m:
        return m.group(1)
    m = re.search(rf'\[{field}:: ([^\s\]]+)\]', line)
    return m.group(1) if m else default


def parse_priority(line: str) -> int:
    m = re.search(r'\[priority:: (\d)\]', line)
    return int(m.group(1)) if m else 0


def parse_year(line: str) -> int:
    m = re.search(r'\[year:: (\d{4})\]', line)
    return int(m.group(1)) if m else 0


def parse_stars(line: str) -> int:
    m = re.search(r'(★+)', line)
    return len(m.group(1)) if m else 0


def parse_done(line: str) -> bool:
    return bool(re.match(r'^- \[x\]', line.strip()))


def parse_title(line: str) -> str:
    m = re.search(r'\*\*(.+?)\*\*', line)
    return m.group(1) if m else ""


def parse_venue(line: str) -> str:
    # Matches "(Venue YEAR)" pattern after title bold
    m = re.search(r'\*\*\s*\(([^)]+)\)', line)
    if not m:
        m = re.search(r'\)\s*\[url', line)  # fallback: text before first [url
        # try (text) right after **title**
        m2 = re.search(r'\*\*[^*]+\*\*\s*\(([^)]+)\)', line)
        return m2.group(1) if m2 else ""
    return m.group(1)


def _theme_sort_key(t: str):
    """Sort 'Theme N: ...' by N first, then alphabetical fallback."""
    m = re.match(r'^Theme\s+(\d+):', t)
    return (0, int(m.group(1))) if m else (1, t.lower())


def main():
    if not SRC.exists():
        print(f"ERROR: source not found: {SRC}")
        return

    raw = SRC.read_text(encoding="utf-8").splitlines()

    items   = []
    cur_domain  = ""
    cur_theme   = ""
    cur_subtheme = ""

    for line in raw:
        stripped = line.strip()

        if stripped.startswith("#### "):
            cur_subtheme = stripped.lstrip("#").strip()
        elif stripped.startswith("### "):
            cur_theme = stripped.lstrip("#").strip()
            cur_subtheme = ""
        elif stripped.startswith("## "):
            cur_domain = stripped.lstrip("#").strip()
            cur_theme = ""
            cur_subtheme = ""

        if not re.match(r'^- \[[ x~]\]', stripped):
            continue
        if "**" not in stripped:
            continue

        title = parse_title(stripped)
        if not title:
            continue

        venue_m = re.search(r'\*\*[^*]+\*\*\s*\(([^)]+)\)', stripped)
        venue = venue_m.group(1) if venue_m else ""

        status = parse_inline(stripped, "status", "to-read")
        tags_raw = parse_inline(stripped, "tags", "")
        tags = [t.strip() for t in tags_raw.split(",") if t.strip()]

        # Site publish filter (2026-05-02 final):
        #   ONLY explicit [publish:: yes]. No automatic publish from any signal.
        publish_field = parse_inline(stripped, "publish", "")
        if publish_field != "yes":
            continue

        priority = parse_priority(stripped)
        citation = int(re.search(r'\[citation:: (\d+)\]', stripped).group(1)) if re.search(r'\[citation:: \d+\]', stripped) else 0
        venue_tier = re.search(r'\[venue_tier:: (\S+)\]', stripped).group(1) if re.search(r'\[venue_tier:: \S+\]', stripped) else "?"
        venue_tier = venue_tier.rstrip("]")  # safety
        article_type = parse_inline(stripped, "article_type", "")

        items.append({
            "title":        title,
            "venue":        venue,
            "url":          parse_inline(stripped, "url"),
            "tags":         tags,
            "status":       status,
            "priority":     priority,
            "stars":        parse_stars(stripped),
            "year":         parse_year(stripped),
            "first_author": parse_inline(stripped, "first_author"),
            "memo":         parse_inline(stripped, "memo"),
            "tldr":         parse_inline(stripped, "tldr"),
            "citation":     citation,
            "venue_tier":   venue_tier,  # raw venue ranking (T1/T2/T3/W) — fact about venue
            "article_type": article_type,
            "publish":      "yes",
            "done":         parse_done(stripped),
            "theme":        cur_theme,
            "subtheme":     cur_subtheme,
            "domain":       cur_domain,
        })

    total = len(items)
    done  = sum(1 for i in items if i["done"])
    stats = {
        "total":    total,
        "done":     done,
        "to_read":  sum(1 for i in items if i["status"] == "to-read"),
        "reading":  sum(1 for i in items if i["status"] in ("reading", "in-progress")),
        "skipped":  sum(1 for i in items if i["status"] == "skipped"),
        "pct_done": round(done / total * 100) if total else 0,
    }

    # Apply field-exposure settings (mask out fields toggled off in publish_settings.json)
    field_settings = load_field_settings()
    if field_settings:
        masked_items = []
        for it in items:
            masked_items.append({
                k: v for k, v in it.items()
                if k in REQUIRED_FIELDS or field_settings.get(k, True)
            })
        items = masked_items

    # Derive themes from items only (skip section headers without items, e.g. §상세 리뷰)
    # Sort by Theme number ("Theme 1" < "Theme 2"), with non-numeric themes last.
    themes_used = sorted(set(it["theme"] for it in items if it.get("theme")), key=_theme_sort_key)

    output = {
        "meta":   stats,
        "themes": themes_used,
        "items":  items,
    }

    serialized = json.dumps(output, ensure_ascii=False, indent=2)
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(serialized, encoding="utf-8")
    DEST2.parent.mkdir(parents=True, exist_ok=True)
    DEST2.write_text(serialized, encoding="utf-8")
    print(f"✅ Wrote {total} items ({done} done)")
    print(f"   → {DEST}")
    print(f"   → {DEST2}")
    print(f"   Themes: {len(themes_used)}")


if __name__ == "__main__":
    main()
