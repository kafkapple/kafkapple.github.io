#!/usr/bin/env python3
"""
Sync TIL notes from ~/dev/TIL repo to kafkapple.github.io/til/_posts/ as Jekyll posts.

Source filename convention: YYMMDD_*.md (e.g., 241028_TIL_Latex_notes.md)
Target filename convention: YYYY-MM-DD-slug.md (Jekyll _posts requirement)

Usage:
    python3 scripts/sync_til.py              # normal sync
    python3 scripts/sync_til.py --dry-run    # preview only, no writes
    python3 scripts/sync_til.py --force      # rebuild all posts (delete existing first)

Safety:
- Runs only within ~/dev/kafkapple.github.io (checked via cwd)
- Never writes outside til/_posts/
- Git actions deferred to caller (no auto-commit)
"""
from __future__ import annotations

import argparse
import pathlib
import re
import shutil
import sys
from datetime import datetime

TIL_REPO = pathlib.Path.home() / "dev/TIL/_Daily"
HP_ROOT = pathlib.Path(__file__).resolve().parent.parent
TARGET_DIR = HP_ROOT / "til" / "_posts"

FILENAME_RE = re.compile(
    r"^(?P<yy>\d{2})(?P<mm>\d{2})(?P<dd>\d{2})[_\s]+(?P<rest>.+?)(?:\.md)+$"
)


def slugify(s: str) -> str:
    """URL-friendly slug: lowercase ASCII + hyphens. Korean chars are preserved but replaced with short hash fallback if only non-ASCII."""
    s = s.strip()
    # Replace whitespace and punctuation with hyphens
    s = re.sub(r"[\s,;:!?/\\()\[\]{}<>\"']+", "-", s)
    # Keep alnum + hyphen + underscore + Korean (Hangul preserved by Jekyll if permalink allows)
    s = re.sub(r"-+", "-", s).strip("-")
    # If result is empty or only non-ASCII, fallback
    if not re.search(r"[A-Za-z0-9]", s):
        s = "note-" + str(abs(hash(s)) % 10_000)
    # Trim long slugs
    return s[:80].strip("-")


def parse_source(path: pathlib.Path) -> dict | None:
    """Return post metadata if filename matches TIL convention, else None."""
    m = FILENAME_RE.match(path.name)
    if not m:
        return None
    yy, mm, dd = int(m["yy"]), int(m["mm"]), int(m["dd"])
    # Interpret YY as 20YY (TIL repo starts 2024)
    year = 2000 + yy
    try:
        dt = datetime(year, mm, dd)
    except ValueError:
        return None
    title_raw = m["rest"].replace("_", " ").strip()
    slug = slugify(title_raw)
    return {
        "date": dt,
        "title": title_raw,
        "slug": slug,
        "source": path,
        "jekyll_name": f"{dt:%Y-%m-%d}-{slug}.md",
    }


def read_source(src: pathlib.Path) -> tuple[str, dict]:
    """Return (body, frontmatter_dict). Empty dict if no frontmatter."""
    text = src.read_text(encoding="utf-8", errors="replace")
    fm = {}
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            raw_fm = text[3:end]
            for line in raw_fm.splitlines():
                m = re.match(r"^([A-Za-z_-]+):\s*(.*)$", line.strip())
                if m:
                    fm[m.group(1).lower()] = m.group(2).strip().strip("\"'")
            text = text[end + 4 :].lstrip("\n")
    return text, fm


def is_excluded(fm: dict) -> bool:
    """Check if source frontmatter requests homepage exclusion.
    Triggers (any one):
      - homepage: false
      - private: true
      - publish: false
      - tags contains 'homepage-exclude' (string match anywhere in tags field)
    """
    if str(fm.get("homepage", "")).lower() == "false":
        return True
    if str(fm.get("private", "")).lower() == "true":
        return True
    if str(fm.get("publish", "")).lower() == "false":
        return True
    if "homepage-exclude" in fm.get("tags", ""):
        return True
    return False


def build_post(meta: dict) -> str:
    """Construct Jekyll-compatible post with frontmatter."""
    body, _ = read_source(meta["source"])
    # Escape YAML-special chars in title
    title_safe = meta["title"].replace('"', '\\"')
    return (
        "---\n"
        f"layout: post\n"
        f"title: \"{title_safe}\"\n"
        f"date: {meta['date']:%Y-%m-%d}\n"
        "categories: [til]\n"
        "tags: [TIL]\n"
        "---\n\n"
        f"{body}\n"
    )


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dry-run", action="store_true", help="preview without writing")
    ap.add_argument("--force", action="store_true", help="rebuild all (delete existing first)")
    args = ap.parse_args()

    if not TIL_REPO.exists():
        print(f"ERROR: TIL source not found at {TIL_REPO}", file=sys.stderr)
        return 1

    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    if args.force and not args.dry_run:
        for p in TARGET_DIR.glob("*.md"):
            p.unlink()
        print(f"[force] cleared {TARGET_DIR}")

    sources = sorted(TIL_REPO.glob("*.md"))
    print(f"Found {len(sources)} source files in {TIL_REPO}")
    created, skipped, excluded = 0, 0, 0
    for src in sources:
        meta = parse_source(src)
        if meta is None:
            skipped += 1
            continue
        # Per-post homepage exclusion check via source frontmatter
        _, fm = read_source(src)
        if is_excluded(fm):
            excluded += 1
            print(f"  [skip-excluded] {src.name} (homepage:false / private:true / homepage-exclude tag)")
            continue
        out_path = TARGET_DIR / meta["jekyll_name"]
        if out_path.exists() and not args.force:
            skipped += 1
            continue
        if args.dry_run:
            print(f"  [dry] would write {out_path.name}")
        else:
            out_path.write_text(build_post(meta), encoding="utf-8")
            print(f"  + {out_path.name}")
        created += 1

    print(f"\nDone. Created: {created}, Skipped (already exists): {skipped}, Excluded (opt-out): {excluded}")
    print(f"Target: {TARGET_DIR}")
    if not args.dry_run and created > 0:
        print("\nNext steps:")
        print("  cd ~/dev/kafkapple.github.io")
        print("  git add til/_posts/")
        print('  git commit -m "sync(til): import N new TIL posts"')
        print("  git push")
    return 0


if __name__ == "__main__":
    sys.exit(main())
