/* Book List Dashboard — vanilla JS, read-only
 * Data source: /assets/data/book_list.json
 */

(function () {
  "use strict";

  const DATA_URL = "/assets/data/book_list.json";
  const LS_PREFIX = "bl_";

  let allItems = [];
  let allGenres = [];

  let state = {
    view:   lsGet("view",   "card"),
    genre:  lsGet("genre",  "all"),
    status: lsGet("status", "all"),
    priority: lsGet("priority", "0"),
    sort:   lsGet("sort",   "priority-desc"),
    query:  "",
  };

  function lsGet(k, def) {
    try { return localStorage.getItem(LS_PREFIX + k) || def; } catch { return def; }
  }
  function lsSet(k, v) {
    try { localStorage.setItem(LS_PREFIX + k, v); } catch {}
  }
  function setState(key, val) {
    state[key] = val;
    lsSet(key, val);
    render();
  }

  function stars(n) { return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n)); }

  const STATUS_LABEL = { "to-read": "To read", reading: "Reading", done: "Done" };
  const STATUS_COLOR = { "to-read": "#888", reading: "#FFD700", done: "#4CAF50" };

  function applyFilters(items) {
    return items.filter(it => {
      if (state.genre !== "all" && !it.genre.includes(state.genre)) return false;
      if (state.status !== "all" && it.status !== state.status) return false;
      if (state.priority !== "0" && it.priority < parseInt(state.priority)) return false;
      if (state.query) {
        const q = state.query.toLowerCase();
        if (!it.title.toLowerCase().includes(q) &&
            !it.author.toLowerCase().includes(q) &&
            !(it.genre || []).join(" ").toLowerCase().includes(q) &&
            !(it.description || "").toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }

  function applySortKey(arr) {
    const m = state.sort.match(/^(.+)-(asc|desc)$/);
    const [key, dir] = m ? [m[1], m[2]] : ["priority", "desc"];
    const sign = dir === "asc" ? 1 : -1;
    return [...arr].sort((a, b) => {
      if (key === "year")     return sign * ((a.year || 0) - (b.year || 0)) || b.priority - a.priority;
      if (key === "author")   return sign * a.author.localeCompare(b.author) || b.priority - a.priority;
      if (key === "title")    return sign * a.title.localeCompare(b.title);
      if (key === "pages")    return sign * ((a.pages || 0) - (b.pages || 0));
      if (key === "status")   return sign * (a.status || "").localeCompare(b.status || "") || b.priority - a.priority;
      return sign * (a.priority - b.priority) || a.title.localeCompare(b.title);
    });
  }

  function render() {
    renderStats();
    renderToolbar();
    const filtered = applySortKey(applyFilters(allItems));
    document.getElementById("bl-count").textContent = `${filtered.length} / ${allItems.length} books`;
    if (state.view === "table") renderTable(filtered);
    else renderCards(filtered);
  }

  function renderStats() {
    const el = document.getElementById("bl-stats");
    if (!el) return;
    const done    = allItems.filter(i => i.status === "done").length;
    const reading = allItems.filter(i => i.status === "reading").length;
    const total   = allItems.length;
    const pct     = total ? Math.round(done / total * 100) : 0;
    const bar = `<div style="background:#e0e0e0;border-radius:4px;height:6px;width:120px;display:inline-block;vertical-align:middle">
      <div style="width:${pct}%;background:#4CAF50;height:100%;border-radius:4px"></div></div>`;
    el.innerHTML = `
      <span class="bl-stat">Total <strong>${total}</strong></span>
      <span class="bl-stat">Done <strong style="color:#4CAF50">${done}</strong></span>
      <span class="bl-stat">Reading <strong style="color:#FFD700">${reading}</strong></span>
      <span class="bl-stat">Progress ${bar} <strong>${pct}%</strong></span>`;
  }

  function renderToolbar() {
    const genreEl = document.getElementById("bl-filter-genre");
    if (genreEl && genreEl.options.length <= 1) {
      allGenres.forEach(g => {
        const o = document.createElement("option");
        o.value = g; o.textContent = g;
        genreEl.appendChild(o);
      });
    }
    if (genreEl) genreEl.value = state.genre;

    const statusEl = document.getElementById("bl-filter-status");
    if (statusEl) statusEl.value = state.status;

    const prioEl = document.getElementById("bl-filter-priority");
    if (prioEl) prioEl.value = state.priority;

    const sortEl = document.getElementById("bl-sort");
    if (sortEl) sortEl.value = state.sort;

    document.querySelectorAll(".bl-view-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === state.view);
    });

    const sortWrap = document.getElementById("bl-sort-wrap");
    if (sortWrap) sortWrap.style.display = state.view === "table" ? "none" : "";
  }

  function renderCards(items) {
    const container = document.getElementById("bl-container");
    container.innerHTML = "";
    container.style.display = "";

    const tableEl = document.getElementById("bl-table-wrap");
    if (tableEl) tableEl.style.display = "none";

    if (!items.length) {
      container.innerHTML = '<p style="opacity:0.5;text-align:center;padding:2em">No results</p>';
      return;
    }

    // Group by primary genre
    const byGenre = new Map();
    items.forEach(it => {
      const key = (it.genre && it.genre[0]) || "Other";
      if (!byGenre.has(key)) byGenre.set(key, []);
      byGenre.get(key).push(it);
    });

    const sectionOrder = [...allGenres.filter(g => byGenre.has(g)),
                          ...[...byGenre.keys()].filter(g => !allGenres.includes(g))];

    sectionOrder.forEach(genre => {
      const group = byGenre.get(genre);
      if (!group || !group.length) return;

      const section = document.createElement("div");
      section.className = "bl-section";

      const h = document.createElement("h3");
      h.className = "bl-genre-heading";
      h.textContent = genre;
      section.appendChild(h);

      const grid = document.createElement("div");
      grid.className = "bl-grid";

      group.forEach(it => {
        const card = document.createElement("div");
        card.className = "bl-card";
        if (it.status === "done") card.classList.add("bl-card--done");

        const stColor = STATUS_COLOR[it.status] || "#888";
        const genreTags = (it.genre || []).slice(0, 3).map(g =>
          `<span class="bl-tag">${g}</span>`).join("");
        const pagesInfo = it.pages ? `<span style="opacity:0.5;font-size:0.78em">${it.pages}p</span>` : "";

        card.innerHTML = `
          <div class="bl-card__top">
            <span class="bl-stars" title="${it.priority}★">${stars(it.priority || 0)}</span>
            <span class="bl-status" style="color:${stColor}">${STATUS_LABEL[it.status] || it.status}</span>
          </div>
          <div class="bl-card__title">${it.url
            ? `<a href="${it.url}" target="_blank" rel="noopener">${it.title}</a>`
            : it.title}</div>
          <div class="bl-card__meta">${[it.author, it.year, it.publisher].filter(Boolean).join(" · ")} ${pagesInfo}</div>
          ${genreTags ? `<div class="bl-card__tags">${genreTags}</div>` : ""}
          ${it.description ? `<div class="bl-card__desc">${it.description}</div>` : ""}`;

        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function resetState() {
    state = { view: "card", genre: "all", status: "all", priority: "0", sort: "priority-desc", query: "" };
    Object.entries(state).forEach(([k, v]) => { if (k !== "query") lsSet(k, v); });
    const searchEl = document.getElementById("bl-search");
    if (searchEl) searchEl.value = "";
    tableSort = { key: "priority", dir: "desc" };
    render();
  }

  let tableSort = { key: "priority", dir: "desc" };

  const TABLE_COLS = [
    { label: "⭐", key: "priority", width: "50px"  },
    { label: "Title",     key: "title",    width: null    },
    { label: "Author",    key: "author",   width: "130px" },
    { label: "Year",      key: "year",     width: "58px"  },
    { label: "Pages",     key: "pages",    width: "60px"  },
    { label: "Genre",     key: null,       width: "110px" },
    { label: "Status",    key: "status",   width: "80px"  },
  ];

  function renderTable(items) {
    const container = document.getElementById("bl-container");
    container.style.display = "none";

    let wrap = document.getElementById("bl-table-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "bl-table-wrap";
      container.parentNode.insertBefore(wrap, container.nextSibling);
    }
    wrap.style.display = "";
    wrap.innerHTML = "";

    const table = document.createElement("table");
    table.className = "bl-table";

    const thead = table.createTHead();
    const hrow = thead.insertRow();
    TABLE_COLS.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col.label;
      if (col.width) th.style.width = col.width;
      if (col.key) {
        th.style.cursor = "pointer";
        th.title = "Click to sort";
        const isActive = tableSort.key === col.key;
        if (isActive) th.textContent += tableSort.dir === "asc" ? " ↑" : " ↓";
        else th.textContent += " ↕";
        th.addEventListener("click", () => {
          if (tableSort.key === col.key) {
            tableSort.dir = tableSort.dir === "asc" ? "desc" : "asc";
          } else {
            tableSort.key = col.key;
            tableSort.dir = col.key === "title" || col.key === "author" ? "asc" : "desc";
          }
          state.sort = tableSort.key + "-" + tableSort.dir;
          lsSet("sort", state.sort);
          render();
        });
      }
      hrow.appendChild(th);
    });

    const tbody = table.createTBody();
    if (!items.length) {
      const row = tbody.insertRow();
      const cell = row.insertCell();
      cell.colSpan = TABLE_COLS.length;
      cell.textContent = "No results";
      cell.style.textAlign = "center";
      cell.style.padding = "2em";
    } else {
      items.forEach(it => {
        const row = tbody.insertRow();
        if (it.status === "done") row.classList.add("bl-row--done");

        const tdStar = row.insertCell(); tdStar.className = "bl-td-center";
        tdStar.textContent = it.priority ? "★".repeat(it.priority) : "";

        const tdTitle = row.insertCell();
        tdTitle.innerHTML = it.url
          ? `<a href="${it.url}" target="_blank" rel="noopener">${it.title}</a>`
          : it.title;
        if (it.description) {
          const d = document.createElement("div");
          d.className = "bl-table-desc";
          d.textContent = it.description;
          tdTitle.appendChild(d);
        }

        const tdAuthor = row.insertCell(); tdAuthor.textContent = it.author || "";

        const tdYear = row.insertCell(); tdYear.className = "bl-td-center";
        tdYear.textContent = it.year || "";

        const tdPages = row.insertCell(); tdPages.className = "bl-td-center";
        tdPages.textContent = it.pages ? it.pages + "p" : "";

        const tdGenre = row.insertCell();
        (it.genre || []).slice(0, 2).forEach(g => {
          const s = document.createElement("span");
          s.className = "bl-tag bl-tag--sm";
          s.textContent = g;
          tdGenre.appendChild(s);
        });

        const tdSt = row.insertCell(); tdSt.className = "bl-td-center";
        const badge = document.createElement("span");
        badge.className = "bl-status-badge";
        badge.style.color = STATUS_COLOR[it.status] || "#888";
        badge.textContent = STATUS_LABEL[it.status] || it.status;
        tdSt.appendChild(badge);
      });
    }

    wrap.appendChild(table);
  }

  function bindEvents() {
    document.querySelectorAll(".bl-view-btn").forEach(btn => {
      btn.addEventListener("click", () => setState("view", btn.dataset.view));
    });

    const bind = (id, key) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", () => setState(key, el.value));
    };
    bind("bl-filter-genre",    "genre");
    bind("bl-filter-status",   "status");
    bind("bl-filter-priority", "priority");
    bind("bl-sort",            "sort");

    const searchEl = document.getElementById("bl-search");
    if (searchEl) {
      searchEl.addEventListener("input", () => {
        state.query = searchEl.value.trim();
        render();
      });
    }

    const resetEl = document.getElementById("bl-reset");
    if (resetEl) resetEl.addEventListener("click", resetState);
  }

  function boot() {
    const m = state.sort.match(/^(.+)-(asc|desc)$/);
    if (m) { tableSort.key = m[1]; tableSort.dir = m[2]; }

    fetch(DATA_URL)
      .then(r => r.json())
      .then(data => {
        // Support both flat array and wrapped {items, genres} format
        if (Array.isArray(data)) {
          allItems = data;
          // Collect unique genres in appearance order
          const seen = new Set();
          data.forEach(it => (it.genre || []).forEach(g => seen.add(g)));
          allGenres = [...seen];
        } else {
          allItems  = data.items  || [];
          allGenres = data.genres || [];
        }
        bindEvents();
        render();
      })
      .catch(err => {
        const el = document.getElementById("bl-container");
        if (el) el.innerHTML = `<p style="color:red">Data load failed: ${err.message}</p>`;
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
