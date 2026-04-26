---
layout: page
title: Design Research Lab
description: >
  Live POC demos of 2025 design system features — scroll fade-in, hover glow, spotlight cursor, reading progress, typography.
permalink: /lab/design-research/
sitemap: true
---

<style>
.dr-section { margin: 2em 0 1em; padding-bottom: 0.4em; border-bottom: 1px solid rgba(46,85,56,0.25); }
.dr-section h2 { font-size: 1.1em; font-weight: 600; color: rgb(46,85,56); margin: 0; }
.dr-badge { display: inline-block; font-size: 0.7em; padding: 0.1em 0.5em; border-radius: 2px; background: rgba(46,85,56,0.12); color: rgb(46,85,56); margin-left: 0.5em; vertical-align: middle; }
.dr-note { font-size: 0.82em; color: #888; margin: 0.3em 0 0.8em; }
.demo-card { margin: 0.8em 0 1.4em 0; padding: 0.9em 1.1em 1em; border-left: 3px solid #ccd5db; line-height: 1.55; }
.demo-card:hover { border-color: rgb(46,85,56); }
.demo-label { font-weight: 600; font-size: 0.95em; margin: 0 0 0.3em; }
.demo-desc { font-size: 0.85em; color: #666; margin: 0.3em 0 0; }
.config-table { font-size: 0.82em; border-collapse: collapse; width: 100%; margin: 0.6em 0; }
.config-table th, .config-table td { padding: 0.3em 0.7em; border: 1px solid rgba(46,85,56,0.2); text-align: left; }
.config-table th { background: rgba(46,85,56,0.07); font-weight: 600; }
code.flag-on  { background: rgba(46,85,56,0.12); color: rgb(30,70,40); padding: 0.1em 0.4em; border-radius: 2px; font-size: 0.9em; }
code.flag-off { background: rgba(180,60,60,0.1); color: #8b3030; padding: 0.1em 0.4em; border-radius: 2px; font-size: 0.9em; }
</style>

Live demos of the [2025 design system](/lab/) — every effect on this page is driven by `_data/design_config.yml`. Toggle any flag and push to apply.

---

<div class="dr-section"><h2>Feature Config <span class="dr-badge">_data/design_config.yml</span></h2></div>

<table class="config-table">
<thead><tr><th>Feature</th><th>Flag</th><th>Status</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Scroll Fade-in</td><td><code>scroll_fade_in</code></td><td><code class="flag-on">true</code></td><td>IntersectionObserver staggered fade on .interest-item</td></tr>
<tr><td>Lab Glow</td><td><code>lab_glow</code></td><td><code class="flag-on">true</code></td><td>::after radial-gradient on hover (compositor-only)</td></tr>
<tr><td>Sliding Underline</td><td><code>sliding_underline</code></td><td><code class="flag-on">true</code></td><td>scaleX(0→1) pseudo-element link animation</td></tr>
<tr><td>Spotlight Cursor</td><td><code>spotlight_cursor</code></td><td><code class="flag-on">true</code></td><td>Radial gradient tracks cursor (desktop only)</td></tr>
<tr><td>Reading Progress</td><td><code>reading_progress</code></td><td><code class="flag-on">true</code></td><td>2px Forest Green bar fixed top</td></tr>
<tr><td>Text Scramble</td><td><code>text_scramble</code></td><td><code class="flag-off">false</code></td><td>ASCII scramble on [data-scramble] — opt-in per element</td></tr>
</tbody>
</table>

---

<div class="dr-section"><h2>Scroll Fade-in <span class="dr-badge">IntersectionObserver</span></h2></div>
<p class="dr-note">Cards below fade in staggered as you scroll. IntersectionObserver + disconnect() on SPA nav.</p>

<div class="interest-item demo-card">
<p class="demo-label">Card A — first to appear</p>
<p class="demo-desc">Fades in with translateY(14px → 0) + opacity(0 → 1) at 360ms ease-smooth. Try refreshing and scrolling slowly.</p>
</div>

<div class="interest-item demo-card">
<p class="demo-label">Card B — staggered +80ms</p>
<p class="demo-desc">Each card delays 80ms × index. Configured via <code>fade_stagger_ms</code> in design_config.yml.</p>
</div>

<div class="interest-item demo-card">
<p class="demo-label">Card C — and hover glow</p>
<p class="demo-desc">Hover this card. The ::after pseudo-element transitions opacity from 0 → 1 with a radial-gradient glow. No box-shadow (compositor-only = no layout thrash).</p>
</div>

---

<div class="dr-section"><h2>Sliding Underline <span class="dr-badge">CSS only</span></h2></div>
<p class="dr-note">Hover links in the paragraph below. scaleX(0→1) from right→left appears, left→right disappears.</p>

Hover [this link to the Lab page](/lab/) and [this link to Design references](/interests/design/) to see the animation. Also works on [external links like this one](https://kafkapple.github.io). The underline uses Forest Green at 85% opacity (light mode) or the lighter tint (dark mode), driven by `--glow-rgb` CSS custom property.

---

<div class="dr-section"><h2>Spotlight Cursor <span class="dr-badge">~8 lines JS</span></h2></div>
<p class="dr-note">Move your mouse anywhere on this page (desktop). A 500px radial gradient follows the cursor at 7% Forest Green opacity — barely perceptible on light mode, slightly stronger on dark.</p>

The spotlight div (`#design-spotlight`) is injected by `design-features.js` into the body. Position updates via `--mouse-x` / `--mouse-y` CSS custom properties on `:root`, set on `mousemove`. Browser composites the radial gradient update efficiently without JS per-frame repaints.

**Toggle**: set `spotlight_cursor: false` in `_data/design_config.yml` to disable.

---

<div class="dr-section"><h2>Reading Progress <span class="dr-badge">scroll-driven</span></h2></div>
<p class="dr-note">The 2px bar at the top of this page tracks scroll position. Scroll down to see it advance.</p>

`#reading-progress-bar` is injected into body by `design-features.js`. Width updates on `scroll` event (passive listener). Resets to 0% on Hydejack SPA navigation.

---

<div class="dr-section"><h2>Text Scramble <span class="dr-badge">opt-in · currently off</span></h2></div>
<p class="dr-note">Hover the heading below. Since <code>text_scramble: false</code> in config, it won't fire. Set to <code>true</code> and push to enable globally.</p>

<p style="font-size:1.3em;font-weight:600;font-family:monospace;cursor:default;" data-scramble>NeuroAI → hover me when enabled</p>

ASCII chars cycle through `αβγδεζηθλμνξπρστφψω∫∇∂√∞≈±→↑` until the original resolves. ~40 lines of vanilla JS.

---

<div class="dr-section"><h2>Typography Enhancement <span class="dr-badge">CSS clamp()</span></h2></div>

The `<h1>` on this page uses `clamp(1.55rem, 1.2rem + 1.8vw, 2.5rem)` with `letter-spacing: -0.02em`. Resize your browser window to see fluid scaling between ~25px (mobile) and ~40px (desktop).

---

*All features are zero-dependency vanilla CSS/JS. Source: `_data/design_config.yml` → `design-init.js` → `design-features.js` + `_sass/my-inline.scss`.*

*→ [Back to Lab](/lab/) · [Design References](/interests/design/)*
