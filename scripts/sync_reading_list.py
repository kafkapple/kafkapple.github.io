#!/usr/bin/env python3
"""Sync Research_Interests_Literature.md → _data/reading_list.json for GitHub Pages."""

import re
import json
from pathlib import Path

ROOT  = Path(__file__).parent.parent
SRC   = ROOT / "_obsidian" / "reading_list.md"
DEST  = ROOT / "assets" / "data" / "reading_list.json"
DEST2 = ROOT / "_data" / "reading_list.json"  # for Liquid templates


def parse_inline(line: str, field: str, default="") -> str:
    m = re.search(rf'\[{field}:: "([^"]*)"\]', line)
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


def main():
    if not SRC.exists():
        print(f"ERROR: source not found: {SRC}")
        return

    raw = SRC.read_text(encoding="utf-8").splitlines()

    items   = []
    themes  = []  # unique theme list in order
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
            if cur_theme not in themes:
                themes.append(cur_theme)
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

        # Site publish filter — explicit opt-in via [publish:: yes]
        # OR auto-publish for Selected (priority 5)
        publish_field = parse_inline(stripped, "publish", "")
        priority = parse_priority(stripped)
        is_published = publish_field == "yes" or priority >= 5
        if not is_published:
            continue

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
            "citation":     int(re.search(r'\[citation:: (\d+)\]', stripped).group(1)) if re.search(r'\[citation:: \d+\]', stripped) else 0,
            "venue_tier":   re.search(r'\[venue_tier:: (\S+)\]', stripped).group(1) if re.search(r'\[venue_tier:: \S+\]', stripped) else "",
            "publish":      publish_field or ("auto" if priority >= 5 else ""),
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

    output = {
        "meta":   stats,
        "themes": sorted(themes),  # alphabetical Theme order
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
    print(f"   Themes: {len(themes)}")


if __name__ == "__main__":
    main()
