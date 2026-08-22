/* Stats dashboard — reads GoatCounter's public visitor-counter endpoints.
 * Rendered by /stats/ (stats.md); the site code arrives as data-gc-code on .stats.
 *
 * This lives in its own file rather than inline in the page: the HTML is served
 * with newlines stripped, which turns any `//` comment in an inline <script> into
 * a comment swallowing the rest of the script.
 */

(function () {
  "use strict";

  const SECTIONS = [
    ["/",              "Home"],
    ["/research/",     "Research"],
    ["/learning/",     "Learning"],
    ["/practice/",     "Creative"],
    ["/publications/", "Publications"],
    ["/talks/",        "Talks"],
    ["/projects/",     "Projects"],
  ];

  let base = "";
  let attempted = 0;
  let failed = 0;

  /* Display string for the path, or null when GoatCounter has no pageviews for it
   * yet (it answers 404) or the counter endpoint is switched off. */
  function fetchCount(path, start) {
    attempted++;
    const url = base + encodeURIComponent(path) + ".json" + (start ? "?start=" + start : "");
    return fetch(url)
      .then(r => (r.ok ? r.json() : null))
      .then(j => (j ? j.count : null))
      .catch(() => { failed++; return null; });
  }

  function toNumber(s) {
    return s ? parseInt(s.replace(/[^0-9]/g, ""), 10) || 0 : 0;
  }

  function reportErrors() {
    if (attempted > 0 && failed >= attempted) {
      document.getElementById("stat-error").hidden = false;
    }
  }

  /* Headline figure and the three time windows. */
  function renderTotals() {
    const tiles = document.querySelectorAll("[data-gc]");
    return Promise.all(Array.from(tiles, el =>
      fetchCount(el.getAttribute("data-gc"), el.getAttribute("data-gc-start"))
        .then(c => { el.textContent = c === null ? "0" : c; })
    ));
  }

  /* Per-section magnitudes, ranked. One series, so the number carries identity
   * and the bar only shows the ranking. */
  function renderSections() {
    return Promise.all(SECTIONS.map(([path, name]) =>
      fetchCount(path).then(c => ({ path, name, n: toNumber(c), label: c || "0" }))
    )).then(rows => {
      rows.sort((a, b) => b.n - a.n);
      const max = rows.length ? rows[0].n : 0;
      const host = document.getElementById("stat-sections");
      rows.forEach(r => {
        const row = document.createElement("div");
        row.className = "stat-row";
        row.innerHTML =
          '<span class="stat-row__name"><a href="' + r.path + '">' + r.name + "</a></span>" +
          '<span class="stat-row__value">' + r.label + "</span>" +
          '<span class="stat-row__track"><span class="stat-row__bar"></span></span>';
        host.appendChild(row);
        /* Width is set after insertion so the CSS transition actually runs. */
        requestAnimationFrame(() => {
          row.querySelector(".stat-row__bar").style.width = (max ? (r.n / max) * 100 : 0) + "%";
        });
      });
    });
  }

  function boot() {
    const root = document.querySelector(".stats[data-gc-code]");
    if (!root) return;
    base = "https://" + root.getAttribute("data-gc-code") + ".goatcounter.com/counter/";
    Promise.all([renderTotals(), renderSections()]).then(reportErrors);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
