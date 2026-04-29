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
.rl-status { font-size: 0.78em; font-weight: 600; }
.rl-card__title { font-weight: 600; margin-bottom: 3px; }
.rl-card__title a { color: inherit; text-decoration: none; }
.rl-card__title a:hover { text-decoration: underline; }
.rl-card__venue { font-size: 0.8em; opacity: 0.6; margin-bottom: 5px; }
.rl-card__tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 5px; }
.rl-card__memo { font-size: 0.8em; opacity: 0.65; line-height: 1.4; border-top: 1px dotted #ccc; padding-top: 5px; margin-top: 4px; }

.rl-tag {
  background: var(--accent-color, #4c8bf5);
  color: #fff;
  border-radius: 3px;
  padding: 1px 6px;
  font-size: 0.75em;
  opacity: 0.8;
}
.rl-tag--sm { font-size: 0.72em; padding: 1px 5px; }

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
.rl-table-memo { font-size: 0.78em; opacity: 0.6; margin-top: 2px; line-height: 1.3; }
.rl-status-badge { font-weight: 600; font-size: 0.82em; }
</style>

<div id="rl-stats">로딩 중...</div>

<div class="rl-toolbar">
  <button class="rl-view-btn" data-view="card">🃏 카드</button>
  <button class="rl-view-btn" data-view="table">📊 테이블</button>

  <select id="rl-filter-theme">
    <option value="all">모든 테마</option>
  </select>

  <select id="rl-filter-status">
    <option value="all">모든 상태</option>
    <option value="to-read">읽을 예정</option>
    <option value="reading">읽는 중</option>
    <option value="done">완독</option>
  </select>

  <select id="rl-filter-stars">
    <option value="0">모든 별점</option>
    <option value="5">★★★★★ 만</option>
    <option value="4">★★★★ 이상</option>
    <option value="3">★★★ 이상</option>
  </select>

  <select id="rl-filter-year">
    <option value="all">모든 연도</option>
  </select>

  <div id="rl-sort-wrap">
    <select id="rl-sort">
      <option value="priority-desc">별점 높은순</option>
      <option value="priority-asc">별점 낮은순</option>
      <option value="year-desc">연도 최신순</option>
      <option value="year-asc">연도 오래된순</option>
      <option value="title-asc">제목 가나다순</option>
      <option value="author-asc">저자 가나다순</option>
      <option value="status-asc">상태순</option>
    </select>
  </div>

  <input type="text" id="rl-search" placeholder="제목 · 저자 · 태그 검색…">

  <span class="rl-count" id="rl-count"></span>
</div>

<div id="rl-container">
  <p style="opacity:0.5;text-align:center;padding:2em">데이터를 불러오는 중...</p>
</div>

<script src="/assets/js/reading-list.js"></script>
