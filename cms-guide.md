---
layout: page
title: Pages CMS Guide
description: >
  How to edit this site through the Pages CMS web UI — what's editable,
  what's not, and the recommended workflow.
permalink: /cms-guide/
sitemap: false
---

This site is editable through [**Pages CMS**](https://pagescms.org) — a free, open-source web UI for editing Jekyll/Hugo sites stored in GitHub. Open [app.pagescms.org](https://app.pagescms.org), authorize with your GitHub account, and select this repository. Commits flow back to `main` automatically.

The CMS schema is defined in `.pages.yml` at the repo root.

---

## ✅ Editable via Pages CMS

| Section | Path | What you can change |
|---|---|---|
| **Blog posts** | `blog/_posts/{date}-{slug}.md` | Create / edit / delete posts. Title, slug, date, description, tags, cover image, body (rich text). |
| **Home page** | `index.md` | About bio, News, Research Interests, Publications block, Experience, Teaching, Awards. Full body in rich-text editor. |
| **Practice page** | `practice/index.md` | Top-level Practice section overview. Title, description, body. |
| **Interests Hub** | `interests/index.md` | Top-level Interests section overview. Title, description, body. |

**Media uploads**: drag-drop images directly in the editor — they go into `assets/img/` and are referenced automatically.

---

## ⚠️ Editable in CMS but with caution

These work in the CMS but the rich-text editor may strip or mangle non-markdown content. Edit raw markdown if any of these are present:

- Pages with embedded `<style>` blocks (e.g., `lab.md`, `practice/*.md`, `interests/design/*.md`)
- Pages with custom HTML widgets (e.g., `<canvas>` tags, custom `<div class="...">` grids)
- Pages with Liquid template tags (e.g., {% raw %}`{% include %}`, `{% for %}`{% endraw %})

→ For these, **prefer GitHub web editor** (the `.` shortcut on the repo page) or local clone + push.

---

## ❌ Not editable via Pages CMS

| Item | Reason | Where to edit |
|---|---|---|
| `_config.yml` | Site-wide config; CMS does not expose YAML schema for it | Local clone or GitHub web editor |
| `_sass/*.scss` | Stylesheets compile via Jekyll | Local clone (need `bundle exec` to verify) |
| `_includes/*.html` | Template fragments; rich-text editor breaks Liquid syntax | Local clone or GitHub web editor |
| `_data/*.yml` | Structured data (publications, authors). CMS could expose these as collections — currently not configured | Local clone or GitHub web editor |
| `til/_posts/*` | Auto-synced from `kafkapple/TIL` repo by `scripts/sync_til.py`. CMS edits would be overwritten. | Edit source in `~/dev/TIL/` |
| Individual band pages | `practice/{noeazy,49-morphines,jambinai}.md` not exposed yet | Local clone or GitHub web editor (or expose them in `.pages.yml`) |
| Individual interest pages | `interests/{design,literature,film,music,comics}/*` not exposed yet | Same as above |

---

## Recommended Workflow

1. **Quick text edits + new blog posts** → Pages CMS web UI ([app.pagescms.org](https://app.pagescms.org))
2. **Theme / layout / SCSS / structural changes** → local clone, `bundle exec jekyll serve`, push
3. **TIL posts** → edit in Obsidian / TIL repo source, let `sync_til.py` handle the rest
4. **Bulk operations / restructure** → local clone (CMS has no batch operations)

---

## Adding a Page to the CMS

To expose a new page in the CMS, edit `.pages.yml` and add an entry:

```yaml
content:
  - name: my-new-page
    label: My New Page
    type: file
    path: path/to/page.md
    fields:
      - name: title
        type: string
      - name: description
        type: string
      - name: body
        type: rich-text
```

For collections (multi-file folders, like blog posts), use `type: collection` with a `path` and `filename` pattern. See the existing `blog` entry in `.pages.yml` for reference.

---

## Service Worker Cache Note

This site uses Hydejack's Service Worker for SPA navigation. Major content/structure changes should bump `cache_version` in `_config.yml` so existing visitors see your update. Pages CMS does **not** auto-bump this — remember to do it manually for major edits.

---

*Last updated: 2026-04-26. CMS schema source: [`/.pages.yml`](https://github.com/kafkapple/kafkapple.github.io/blob/main/.pages.yml).*
