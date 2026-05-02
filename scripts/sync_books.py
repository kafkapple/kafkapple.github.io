#!/usr/bin/env python3
"""Sync Book Reading List.md → _data/book_list.json + assets/data/book_list.json.

Publish gate: ONLY items with explicit [publish:: yes] are exported.
Genre field in MD: comma-separated lowercase → capitalized array for JS.
"""

import re
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC  = ROOT / "_obsidian" / "book_list.md"
DEST = ROOT / "assets" / "data" / "book_list.json"
DEST2 = ROOT / "_data" / "book_list.json"

# Genre token normalization: lowercase token → display label
GENRE_LABELS = {
    "philosophy": "Philosophy",
    "psychology": "Psychology",
    "essay": "Essay",
    "ai": "AI",
    "alignment": "Alignment",
    "ethics": "Ethics",
    "machine-learning": "Machine Learning",
    "cognitive-science": "Cognitive Science",
    "evolutionary-psychology": "Evolutionary Psychology",
    "behavioral-economics": "Behavioral Economics",
    "decision-making": "Decision Making",
    "cognitive-bias": "Cognitive Bias",
    "neuroai": "NeuroAI",
    "neuroscience": "Neuroscience",
    "brain-evolution": "Brain Evolution",
    "popular-science": "Popular Science",
    "intelligence": "Intelligence",
    "language": "Language",
    "perception": "Perception",
}


def parse_inline(line: str, field: str, default: str = "") -> str:
    m = re.search(rf'\[{field}:: "([^"]*)"\]', line)
    if m:
        return m.group(1)
    m = re.search(rf'\[{field}:: ([^\s\]]+)\]', line)
    return m.group(1) if m else default


def parse_year(line: str) -> int:
    m = re.search(r'\[year:: (\d{4})\]', line)
    return int(m.group(1)) if m else 0


def parse_priority(line: str) -> int:
    m = re.search(r'\[priority:: (\d)\]', line)
    return int(m.group(1)) if m else 0


def parse_title(line: str) -> str:
    m = re.search(r'\*\*(.+?)\*\*', line)
    return m.group(1) if m else ""


def parse_done(line: str) -> bool:
    return bool(re.match(r'^- \[x\]', line.strip()))


def normalize_genre(raw: str) -> list:
    """'neuroai, brain-evolution, popular-science' → ['NeuroAI', 'Brain Evolution', 'Popular Science']"""
    tokens = [t.strip() for t in raw.split(",") if t.strip()]
    result = []
    for t in tokens:
        label = GENRE_LABELS.get(t)
        if label:
            result.append(label)
        else:
            # Fallback: title-case, replacing hyphens with spaces
            result.append(t.replace("-", " ").title())
    return result


def main():
    if not SRC.exists():
        print(f"ERROR: source not found: {SRC}")
        return

    raw = SRC.read_text(encoding="utf-8").splitlines()

    items = []
    cur_section = ""
    seen_genres = []

    for line in raw:
        stripped = line.strip()

        if stripped.startswith("### "):
            cur_section = stripped.lstrip("#").strip()

        if not re.match(r'^- \[[ x~]\]', stripped):
            continue
        if "**" not in stripped:
            continue

        publish_field = parse_inline(stripped, "publish", "")
        if publish_field != "yes":
            continue

        title = parse_title(stripped)
        if not title:
            continue

        genre_raw = parse_inline(stripped, "genre", "")
        genre = normalize_genre(genre_raw) if genre_raw else []

        # Track genre order for section grouping
        primary = genre[0] if genre else "Other"
        if primary not in seen_genres:
            seen_genres.append(primary)

        item = {
            "title":       title,
            "author":      parse_inline(stripped, "author"),
            "year":        parse_year(stripped),
            "genre":       genre,
            "isbn":        parse_inline(stripped, "isbn"),
            "url":         parse_inline(stripped, "url"),
            "status":      parse_inline(stripped, "status", "to-read"),
            "priority":    parse_priority(stripped),
            "description": parse_inline(stripped, "memo"),
            "done":        parse_done(stripped),
            "section":     cur_section,
        }
        items.append(item)

    total = len(items)
    done  = sum(1 for i in items if i["done"])
    meta = {
        "total":   total,
        "done":    done,
        "reading": sum(1 for i in items if i["status"] == "reading"),
        "to_read": sum(1 for i in items if i["status"] == "to-read"),
        "pct_done": round(done / total * 100) if total else 0,
    }

    output = {
        "meta":   meta,
        "genres": seen_genres,
        "items":  items,
    }

    serialized = json.dumps(output, ensure_ascii=False, indent=2)
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(serialized, encoding="utf-8")
    DEST2.parent.mkdir(parents=True, exist_ok=True)
    DEST2.write_text(serialized, encoding="utf-8")

    print(f"✅ Wrote {total} books ({done} done)")
    print(f"   → {DEST}")
    print(f"   → {DEST2}")
    print(f"   Genres: {seen_genres}")


if __name__ == "__main__":
    main()
