---
layout: page
title: Reading List
description: >
  Research papers I'm reading, have read, or plan to read —
  organized by cognitive function theme.
permalink: /reading-list/
sitemap: true
---

<style>
/* ── Layout ─────────────────────────────────────────────────── */
.rl-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
}
.rl-toolbar select,
.rl-toolbar input[type="text"] {
  padding: 5px 9px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  font-size: 0.85em;
  background: var(--background-color, #fff);
  color: var(--text-color, #333);
  cursor: pointer;
}
.rl-toolbar input[type="text"] { min-width: 160px; }
.rl-view-btn {
  padding: 5px 12px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  background: transparent;
  font-size: 0.85em;
  cursor: pointer;
  color: inherit;
}
.rl-view-btn.active {
  background: var(--accent-color, #4c8bf5);
  color: #fff;
  border-color: transparent;
}
.rl-count {
  margin-left: auto;
  font-size: 0.82em;
  opacity: 0.55;
  white-space: nowrap;
}

/* ── Stats bar ─────────────────────────────────────────────── */
#rl-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 14px;
  font-size: 0.86em;
}
.rl-stat { opacity: 0.75; }

/* ── Card grid ─────────────────────────────────────────────── */
.rl-section { margin-bottom: 2em; }
.rl-theme-heading {
  font-size: 1em;
  font-weight: 700;
  border-bottom: 2px solid var(--accent-color, #4c8bf5);
  padding-bottom: 4px;
  margin-bottom: 10px;
  opacity: 0.85;
}
.rl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
}
.rl-card {
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.85em;
  line-height: 1.45;
}
.rl-card--done { opacity: 0.6; }
.rl-card__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.rl-stars { color: #FFA000; font-size: 0.8em; letter-spacing: 1px; }
.rl-status { display: none; }
.rl-card__subtheme {
  font-size: 0.74em;
  opacity: 0.55;
  margin-bottom: 4px;
  font-style: italic;
}
.rl-card__title { font-weight: 600; margin-bottom: 3px; }
.rl-card__title a { color: inherit; text-decoration: none; }
.rl-card__title a:hover { text-decoration: underline; }
.rl-card__venue { font-size: 0.82em; opacity: 0.8; margin-bottom: 4px; font-weight: 500; }
.rl-card__tldr {
  font-size: 0.79em;
  opacity: 0.7;
  line-height: 1.4;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.rl-card__tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 5px; }
.rl-card__memo { font-size: 0.8em; opacity: 0.65; line-height: 1.4; border-top: 1px dotted #ccc; padding-top: 5px; margin-top: 4px; }

/* ── Type badge — distinct from content tags ────────────────── */
.rl-type-badge {
  display: inline-block;
  font-size: 0.72em;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 10px;
  border: 1px solid;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* ── Type section label (within theme) ──────────────────────── */
.rl-type-section-label {
  font-size: 0.75em;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.45;
  margin: 10px 0 6px;
}

/* ── Content tags ────────────────────────────────────────────── */
.rl-tag {
  background: var(--accent-color, #4c8bf5);
  color: #fff;
  border-radius: 3px;
  padding: 1px 6px;
  font-size: 0.75em;
  opacity: 0.8;
}
.rl-tag--sm { font-size: 0.72em; padding: 1px 5px; }

/* ── Hide Status and Stars filters ──────────────────────────── */
#rl-filter-status,
#rl-filter-stars { display: none; }

/* ── Table ──────────────────────────────────────────────────── */
.rl-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84em;
}
.rl-table thead th {
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
.rl-table tbody tr {
  border-bottom: 1px dotted var(--border-color, #eee);
}
.rl-table tbody tr:hover { background: var(--hover-bg, #f5f5f5); }
.rl-table td { padding: 5px 8px; vertical-align: top; }
.rl-row--done td { opacity: 0.55; }
.rl-td-center { text-align: center; }
.rl-td-theme { font-size: 0.8em; opacity: 0.75; }
.rl-td-subtheme { font-size: 0.78em; opacity: 0.65; font-style: italic; }
.rl-table-memo { font-size: 0.78em; opacity: 0.6; margin-top: 2px; line-height: 1.3; }
</style>

<div id="rl-stats">Loading...</div>

<div class="rl-toolbar">
  <button class="rl-view-btn" data-view="card">🃏 Cards</button>
  <button class="rl-view-btn" data-view="table">📊 Table</button>

  <select id="rl-filter-theme">
    <option value="all">All themes</option>
  </select>

  <select id="rl-filter-status">
    <option value="all">All statuses</option>
    <option value="to-read">To read</option>
    <option value="reading">Reading</option>
    <option value="done">Done</option>
  </select>

  <select id="rl-filter-stars">
    <option value="0">All ratings</option>
    <option value="5">★★★★★ only</option>
    <option value="4">★★★★ and above</option>
    <option value="3">★★★ and above</option>
  </select>

  <select id="rl-filter-year">
    <option value="all">All years</option>
  </select>

  <div id="rl-sort-wrap">
    <select id="rl-sort">
      <option value="title-asc">Title (A-Z)</option>
      <option value="author-asc">Author (A-Z)</option>
      <option value="priority-desc">Rating (high-low)</option>
      <option value="priority-asc">Rating (low-high)</option>
      <option value="year-desc" selected>Year (newest)</option>
      <option value="year-asc">Year (oldest)</option>
      <option value="status-asc">Status</option>
    </select>
  </div>

  <input type="text" id="rl-search" placeholder="Search title · author · tag…">

  <button class="rl-view-btn" id="rl-reset" title="Reset all filters and sort to defaults">↺ Reset</button>

  <span class="rl-count" id="rl-count"></span>
</div>

<div id="rl-container">
  <p style="opacity:0.5;text-align:center;padding:2em">Loading data...</p>
</div>

<script src="/assets/js/reading-list.js"></script>
