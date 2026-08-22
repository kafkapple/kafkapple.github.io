---
layout: page
title: Stats
description: >
  Visitor statistics for this site — all-time totals, recent windows, per-section counts,
  and the full timeline.
permalink: /stats/
sitemap: false
---

{%- assign gc = site.goatcounter -%}
{%- if gc.code == nil or gc.code == '' %}

Analytics are not configured yet.

Register the site at [goatcounter.com](https://www.goatcounter.com), then set
`goatcounter.code` in `_config.yml` to the site code. Tracking and this dashboard
switch on together.

{%- else %}

<style>
/* ── Stats dashboard ──────────────────────────────────────────────────────────
   Reuses the nav-card tokens defined in _includes/my-head.html (--nc-accent,
   --nc-bg, --nc-sub, --nc-radius …), so light/dark mode follows the site palette
   with no second source of truth. */
.stats { margin: 1.5em 0 2em; }

.stat-hero {
  display: flex; flex-direction: column; gap: 0.3rem;
  padding: clamp(1.3rem, 3.5vw, 2.1rem);
  background: var(--nc-accent-muted);
  border: 1px solid var(--nc-accent);
  border-bottom: 0;
  border-radius: var(--nc-radius) var(--nc-radius) 0 0;
}
.stat-hero__label {
  font-size: 0.67rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--nc-accent-lt);
}
.stat-hero__value {
  font-size: clamp(2.6rem, 8vw, 3.9rem); font-weight: 800; line-height: 1;
  letter-spacing: -0.03em;
}
.stat-hero__note { font-size: 0.8rem; color: var(--nc-sub); }

/* Hairline grid, same idiom as .nav-cards-grid */
.stat-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: var(--nc-gap);
  background: var(--nc-accent);
  border: var(--nc-gap) solid var(--nc-accent);
  border-radius: 0 0 var(--nc-radius) var(--nc-radius);
  overflow: hidden;
}
.stat-tile {
  display: flex; flex-direction: column; gap: 0.35rem;
  padding: clamp(0.95rem, 2.5vw, 1.4rem);
  background-color: var(--nc-bg);
}
.stat-tile__label {
  font-size: 0.62rem; font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase;
  color: var(--nc-accent-lt);
}
.stat-tile__value { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 700; line-height: 1; }

/* Per-section magnitudes: one series, so the number carries identity and the bar
   only ranks it. No legend, no colour coding. */
.stat-rows { margin-top: 1.6em; }
.stat-row {
  display: grid; grid-template-columns: 1fr auto;
  align-items: baseline; gap: 0.5rem 1rem;
  padding: 0.55rem 0; border-bottom: 1px solid var(--nc-accent-muted);
}
.stat-row__name { font-size: 0.94rem; }
.stat-row__name a { color: inherit; }
.stat-row__value {
  font-size: 0.94rem; font-weight: 700;
  font-variant-numeric: tabular-nums;   /* a column of numbers, so align the digits */
}
.stat-row__track {
  display: block; grid-column: 1 / -1; height: 6px; margin-top: 0.15rem;
  background: var(--nc-accent-muted); border-radius: 3px;
}
.stat-row__bar {
  display: block; height: 100%; width: 0; background: var(--nc-accent-lt);
  border-radius: 0 3px 3px 0;
  transition: width var(--dur-base, 360ms) var(--ease-smooth, ease);
}

.stat-frame {
  margin-top: 0.8em;
  border: 1px solid var(--nc-accent); border-radius: var(--nc-radius);
  overflow: hidden; background: var(--nc-bg);
}
.stat-frame iframe { display: block; width: 100%; height: 620px; border: 0; }

.stat-note { font-size: 0.8rem; color: var(--nc-sub); margin-top: 0.7em; }
.stat-note[hidden] { display: none; }

@media (max-width: 540px) {
  .stat-grid { grid-template-columns: 1fr; }
}
</style>

<div class="stats">
  <div class="stat-hero">
    <span class="stat-hero__label">All-time pageviews</span>
    <span class="stat-hero__value" data-gc="TOTAL">&mdash;</span>
    <span class="stat-hero__note">Since tracking started. Counts refresh every four hours.</span>
  </div>

  <div class="stat-grid">
    <div class="stat-tile">
      <span class="stat-tile__label">Last 7 days</span>
      <span class="stat-tile__value" data-gc="TOTAL" data-gc-start="week">&mdash;</span>
    </div>
    <div class="stat-tile">
      <span class="stat-tile__label">Last 30 days</span>
      <span class="stat-tile__value" data-gc="TOTAL" data-gc-start="month">&mdash;</span>
    </div>
    <div class="stat-tile">
      <span class="stat-tile__label">Last 12 months</span>
      <span class="stat-tile__value" data-gc="TOTAL" data-gc-start="year">&mdash;</span>
    </div>
  </div>

  <h2>By section</h2>
  <div class="stat-rows" id="stat-sections"></div>

  <h2>Timeline</h2>
  {%- if gc.embed %}
  <div class="stat-frame">
    <iframe loading="lazy" title="GoatCounter dashboard"
            src="https://{{ gc.code }}.goatcounter.com/?hideui=1"></iframe>
  </div>
  {%- else %}
  <p>The full timeline — daily pageviews, referrers, browsers, locations — lives on the
     <a href="https://{{ gc.code }}.goatcounter.com">GoatCounter dashboard</a>.
     To embed it here instead, set <code>goatcounter.embed: true</code> in <code>_config.yml</code>
     after adding <code>kafkapple.github.io</code> to <em>Sites that can embed GoatCounter</em>
     in the GoatCounter site settings.</p>
  {%- endif %}

  <p class="stat-note" id="stat-error" hidden>
    Counts could not be loaded. Enable <em>Allow adding visitor counts on your website</em>
    in the GoatCounter site settings.
  </p>
  <p class="stat-note">
    No cookies, no personal data, no consent banner — counting is done by
    <a href="https://www.goatcounter.com">GoatCounter</a>.
  </p>
</div>

<script>
(function () {
  var BASE = 'https://{{ gc.code }}.goatcounter.com/counter/';
  var SECTIONS = [
    ['/',              'Home'],
    ['/research/',     'Research'],
    ['/learning/',     'Learning'],
    ['/practice/',     'Creative'],
    ['/publications/', 'Publications'],
    ['/talks/',        'Talks'],
    ['/projects/',     'Projects']
  ];

  var failed = 0, attempted = 0;

  // Returns the count as a display string, or null when the path has no pageviews
  // yet (GoatCounter answers 404) or the endpoint is switched off.
  function fetchCount(path, start) {
    attempted++;
    var url = BASE + encodeURIComponent(path) + '.json' + (start ? '?start=' + start : '');
    return fetch(url)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j ? j.count : null; })
      .catch(function () { failed++; return null; });
  }

  function toNumber(s) { return s ? parseInt(s.replace(/[^0-9]/g, ''), 10) || 0 : 0; }

  function reportErrors() {
    if (attempted > 0 && failed >= attempted) {
      document.getElementById('stat-error').hidden = false;
    }
  }

  // Headline figure + the three time windows.
  var tiles = document.querySelectorAll('[data-gc]');
  Promise.all(Array.prototype.map.call(tiles, function (el) {
    return fetchCount(el.getAttribute('data-gc'), el.getAttribute('data-gc-start')).then(function (c) {
      el.textContent = c === null ? '0' : c;
    });
  })).then(reportErrors);

  // Per-section magnitudes, ranked.
  Promise.all(SECTIONS.map(function (s) {
    return fetchCount(s[0]).then(function (c) { return { path: s[0], name: s[1], n: toNumber(c), label: c || '0' }; });
  })).then(function (rows) {
    rows.sort(function (a, b) { return b.n - a.n; });
    var max = rows.length ? rows[0].n : 0;
    var host = document.getElementById('stat-sections');
    rows.forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'stat-row';
      row.innerHTML =
        '<span class="stat-row__name"><a href="' + r.path + '">' + r.name + '</a></span>' +
        '<span class="stat-row__value">' + r.label + '</span>' +
        '<span class="stat-row__track"><span class="stat-row__bar"></span></span>';
      host.appendChild(row);
      // Set the width after insertion so the transition actually runs.
      requestAnimationFrame(function () {
        row.querySelector('.stat-row__bar').style.width = (max ? (r.n / max) * 100 : 0) + '%';
      });
    });
  });
})();
</script>

{%- endif %}
