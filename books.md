---
layout: page
title: Books
description: >
  Books I'm reading, have read, or plan to read —
  organized by genre.
permalink: /books/
sitemap: true
---

<style>
/* ── Layout ─────────────────────────────────────────────────── */
.bl-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
}
.bl-toolbar select,
.bl-toolbar input[type="text"] {
  padding: 5px 9px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  font-size: 0.85em;
  background: var(--background-color, #fff);
  color: var(--text-color, #333);
  cursor: pointer;
}
.bl-toolbar input[type="text"] { min-width: 160px; }
.bl-view-btn {
  padding: 5px 12px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  background: transparent;
  font-size: 0.85em;
  cursor: pointer;
  color: inherit;
}
.bl-view-btn.active {
  background: var(--accent-color, #4c8bf5);
  color: #fff;
  border-color: transparent;
}
.bl-count {
  margin-left: auto;
  font-size: 0.82em;
  opacity: 0.55;
  white-space: nowrap;
}

/* ── Stats bar ─────────────────────────────────────────────── */
#bl-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 14px;
  font-size: 0.86em;
}
.bl-stat { opacity: 0.75; }

/* ── Card grid ─────────────────────────────────────────────── */
.bl-section { margin-bottom: 2em; }
.bl-genre-heading {
  font-size: 1em;
  font-weight: 700;
  border-bottom: 2px solid var(--accent-color, #4c8bf5);
  padding-bottom: 4px;
  margin-bottom: 10px;
  opacity: 0.85;
}
.bl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
}
.bl-card {
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.85em;
  line-height: 1.45;
}
.bl-card--done { opacity: 0.6; }
.bl-card__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.bl-stars { color: #FFA000; font-size: 0.8em; letter-spacing: 1px; }
.bl-status { font-size: 0.78em; font-weight: 600; }
.bl-card__title { font-weight: 600; margin-bottom: 3px; }
.bl-card__title a { color: inherit; text-decoration: none; }
.bl-card__title a:hover { text-decoration: underline; }
.bl-card__meta { font-size: 0.8em; opacity: 0.6; margin-bottom: 5px; }
.bl-card__tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 5px; }
.bl-card__desc { font-size: 0.8em; opacity: 0.65; line-height: 1.4; border-top: 1px dotted #ccc; padding-top: 5px; margin-top: 4px; }

.bl-tag {
  background: var(--accent-color, #4c8bf5);
  color: #fff;
  border-radius: 3px;
  padding: 1px 6px;
  font-size: 0.75em;
  opacity: 0.8;
}
.bl-tag--sm { font-size: 0.72em; padding: 1px 5px; }

/* ── Table ──────────────────────────────────────────────────── */
.bl-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84em;
}
.bl-table thead th {
  position: sticky;
  top: 0;
  background: var(--background-color, #fff);
  border-bottom: 2px solid var(--border-color, #ddd);
  padding: 6px 8px;
  text-align: left;
  font-weight: 700;
  white-space: nowrap;
  z-index: 1;
}
.bl-table tbody tr {
  border-bottom: 1px dotted var(--border-color, #eee);
}
.bl-table tbody tr:hover { background: var(--hover-bg, #f5f5f5); }
.bl-table td { padding: 5px 8px; vertical-align: top; }
.bl-row--done td { opacity: 0.55; }
.bl-td-center { text-align: center; }
.bl-table-desc { font-size: 0.78em; opacity: 0.6; margin-top: 2px; line-height: 1.3; }
.bl-status-badge { font-weight: 600; font-size: 0.82em; }
</style>

<div id="bl-stats">Loading...</div>

<div class="bl-toolbar">
  <button class="bl-view-btn" data-view="card">🃏 Cards</button>
  <button class="bl-view-btn" data-view="table">📊 Table</button>

  <select id="bl-filter-genre">
    <option value="all">All genres</option>
  </select>

  <select id="bl-filter-status">
    <option value="all">All statuses</option>
    <option value="to-read">To read</option>
    <option value="reading">Reading</option>
    <option value="done">Done</option>
  </select>

  <select id="bl-filter-priority">
    <option value="0">All ratings</option>
    <option value="5">★★★★★ only</option>
    <option value="4">★★★★ and above</option>
    <option value="3">★★★ and above</option>
  </select>

  <div id="bl-sort-wrap">
    <select id="bl-sort">
      <option value="title-asc">Title (A-Z)</option>
      <option value="author-asc">Author (A-Z)</option>
      <option value="priority-desc">Rating (high-low)</option>
      <option value="priority-asc">Rating (low-high)</option>
      <option value="year-desc">Year (newest)</option>
      <option value="year-asc">Year (oldest)</option>
      <option value="pages-asc">Pages (short first)</option>
      <option value="pages-desc">Pages (long first)</option>
    </select>
  </div>

  <input type="text" id="bl-search" placeholder="Search title · author · genre…">

  <button class="bl-view-btn" id="bl-reset" title="Reset all filters and sort to defaults">↺ Reset</button>

  <span class="bl-count" id="bl-count"></span>
</div>

<div id="bl-container">
  <p style="opacity:0.5;text-align:center;padding:2em">Loading data...</p>
</div>

<script src="/assets/js/book-list.js"></script>
