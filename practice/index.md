---
layout: page
title: Creative
description: >
  Active creative practice — music performance, interdisciplinary collaborations,
  writing, and translation.
permalink: /practice/
redirect_from:
  - /culture/
sitemap: true
---

<style>
/* ── Creative cards: Interactive Perspective Card Grid ── */

/* Shared: mouse-tracking spotlight via background-image */
.nav-card--music,
.nav-card--writing,
.nav-card--perf,
.nav-card--lab {
  --mouse-x: -200px;
  --mouse-y: -200px;
  --dr: 0;
  background-image: radial-gradient(
    circle 180px at var(--mouse-x) var(--mouse-y),
    rgba(255,255,255,0.11) 0%,
    transparent 100%
  );
  transition:
    background-image 0s,
    transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
    filter 0.35s ease,
    box-shadow 0.3s ease;
}
.nav-card--music.is-tilting,
.nav-card--writing.is-tilting,
.nav-card--perf.is-tilting,
.nav-card--lab.is-tilting {
  transition: background-image 0s, filter 0.1s ease, box-shadow 0.3s ease;
}

/* Music — featured, forest green shimmer */
.nav-card--music {
  --nc-accent-muted: rgba(46,85,56,0.07);
  --nc-accent-hover: rgba(46,85,56,0.13);
  background: var(--nc-accent-muted);
}
.nav-card--music::before {
  top: 0 !important; left: 0 !important;
  width: 100% !important; height: 100% !important;
  background: linear-gradient(105deg,
    transparent 28%, rgba(80,150,100,0.08) 50%, transparent 72%
  ) !important;
  background-size: 300% 100% !important;
  animation: music-shimmer 6s linear infinite !important;
}
@keyframes music-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -100% 0; }
}
.nav-card--music:not(.wip):hover {
  box-shadow: 0 16px 36px rgba(46,85,56,0.20), 0 3px 10px rgba(46,85,56,0.10);
}

/* Writing — very faint warm tint */
.nav-card--writing {
  --nc-accent-muted: rgba(90,60,15,0.04);
  --nc-accent-hover: rgba(90,60,15,0.08);
  background: var(--nc-accent-muted);
}
.nav-card--writing:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(46,85,56,0.18), 0 2px 8px rgba(46,85,56,0.08);
}

/* Performance — very faint cool tint */
.nav-card--perf {
  --nc-accent-muted: rgba(50,40,80,0.04);
  --nc-accent-hover: rgba(50,40,80,0.08);
  background: var(--nc-accent-muted);
}
.nav-card--perf:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(46,85,56,0.18), 0 2px 8px rgba(46,85,56,0.08);
}

/* Lab — very faint teal tint */
.nav-card--lab {
  --nc-accent-muted: rgba(15,80,90,0.05);
  --nc-accent-hover: rgba(15,80,90,0.10);
  background: var(--nc-accent-muted);
}
.nav-card--lab:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(46,85,56,0.18), 0 2px 8px rgba(46,85,56,0.08);
}
/* Lab: subtle scanline texture on hover */
.nav-card--lab::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(46,85,56,0.025) 3px,
    rgba(46,85,56,0.025) 4px
  );
  pointer-events: none; z-index: 0;
  opacity: 0; transition: opacity 0.4s ease;
}
.nav-card--lab:hover::before { opacity: 1; }

/* ── Expand icon (top-right of each card) ── */
.nc-expand {
  position: absolute; top: 0.65rem; right: 0.65rem;
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 4px;
  color: var(--nc-accent-lt);
  cursor: pointer; padding: 0;
  opacity: 0;
  transition: opacity 0.2s ease, background 0.18s ease, transform 0.2s ease, border-color 0.2s ease;
  z-index: 5;
}
.nav-card:hover .nc-expand { opacity: 1; }
.nc-expand:hover { background: var(--nc-accent-muted); border-color: var(--nc-accent-lt); transform: scale(1.1); }
.nc-expand--pulse { animation: nc-expand-pulse 0.55s cubic-bezier(0.34,1.56,0.64,1); }
@keyframes nc-expand-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
}

/* ── Click ripple ── */
.nc-ripple {
  position: absolute;
  width: 8px; height: 8px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
  transform: translate(-50%,-50%) scale(0);
  pointer-events: none;
  animation: nc-ripple-expand 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
  z-index: 10;
}
@keyframes nc-ripple-expand {
  to { transform: translate(-50%,-50%) scale(60); opacity: 0; }
}

/* ── Fullscreen overlay ── */
.nc-overlay {
  position: fixed; inset: 0; z-index: 99999;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0);
  backdrop-filter: blur(0px) saturate(1);
  -webkit-backdrop-filter: blur(0px) saturate(1);
  transition: background 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease;
  pointer-events: none;
}
.nc-overlay--active {
  background: var(--nc-overlay-bg, rgba(20,40,24,0.93));
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  pointer-events: all;
}
.nc-overlay--closing {
  background: rgba(0,0,0,0) !important;
  backdrop-filter: blur(0px) !important;
  -webkit-backdrop-filter: blur(0px) !important;
}
/* Per-theme deep overlay backgrounds */
.nc-overlay[data-theme="music"]   { --nc-overlay-bg: rgba(18,48,26,0.94); }
.nc-overlay[data-theme="writing"] { --nc-overlay-bg: rgba(85,48,6,0.94); }
.nc-overlay[data-theme="perf"]    { --nc-overlay-bg: rgba(30,18,70,0.94); }
.nc-overlay[data-theme="lab"]     { --nc-overlay-bg: rgba(6,60,68,0.94); }

.nc-overlay__inner {
  position: relative; max-width: 580px; width: 90%;
  padding: clamp(2rem,5vw,3.5rem) clamp(1.5rem,4vw,2.8rem);
  color: rgba(255,255,255,0.95);
  transform: translateY(32px) scale(0.96);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.38s ease;
}
.nc-overlay--active .nc-overlay__inner { transform: translateY(0) scale(1); opacity: 1; }
.nc-overlay__close {
  position: absolute; top: 0; right: 0;
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.18);
  border-radius: 50%; color: rgba(255,255,255,0.65); cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.nc-overlay__close:hover { background: rgba(255,255,255,0.16); color: #fff; }
.nc-overlay__label {
  font-size: 0.63rem; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: rgba(255,255,255,0.45); margin: 0 0 0.5rem;
}
.nc-overlay__title {
  font-size: clamp(2.4rem,8vw,4.2rem); font-weight: 800; line-height: 1.04;
  letter-spacing: -0.03em; margin: 0 0 1rem; color: #fff;
}
.nc-overlay__desc {
  font-size: clamp(0.92rem,2vw,1.08rem); line-height: 1.65;
  color: rgba(255,255,255,0.68); margin: 0 0 2rem;
}
.nc-overlay__cta {
  display: inline-block; padding: 0.58em 1.35em;
  background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.24);
  border-radius: 4px; color: rgba(255,255,255,0.88);
  text-decoration: none; font-weight: 600; font-size: 0.88em;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.nc-overlay__cta:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.5); color: #fff; text-decoration: none; }

/* View Transitions: fade-in new state, instant-out old */
::view-transition-old(root) { animation: none; mix-blend-mode: normal; }
::view-transition-new(root) { animation: nc-vt-fadein 0.45s ease-out; }
@keyframes nc-vt-fadein { from { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .nc-overlay, .nc-overlay__inner, .nc-ripple { transition: none !important; animation: none !important; }
  .nc-expand--pulse { animation: none !important; }
}
</style>

<p class="nav-principles">Active practice</p>

<nav class="nav-cards-grid">

<a class="nav-card nav-card--featured nav-card--music" href="#music" data-card-theme="music">
<span class="nav-card__principle">Performance</span>
<p class="nav-card__title">Music</p>
<p class="nav-card__desc">Three bands across screamo, metalcore, and experimental post-rock — bass, guitar, and guest performance spanning 2007 to present.</p>
<span class="nav-card__tags">49 Morphines · Noeazy · Jambinai</span>
<span class="nav-card__arrow">↓</span>
</a>

<a class="nav-card nav-card--writing" href="#writing" data-card-theme="writing">
<span class="nav-card__principle">Language</span>
<p class="nav-card__title">Writing</p>
<p class="nav-card__desc">Science translation and literary criticism — communicating neuroscience across registers.</p>
<span class="nav-card__tags">Translation · Essay · KAIST</span>
<span class="nav-card__arrow">↓</span>
</a>

<a class="nav-card nav-card--perf" href="#performance" data-card-theme="perf">
<span class="nav-card__principle">System</span>
<p class="nav-card__title">Performance</p>
<p class="nav-card__desc">Interdisciplinary work at the intersection of art, neuroscience, and embodied cognition.</p>
<span class="nav-card__tags">BCI · Museum · Neuroscience</span>
<span class="nav-card__arrow">↓</span>
</a>

<a class="nav-card nav-card--lab" href="/lab/" data-card-theme="lab">
<span class="nav-card__principle">Code</span>
<p class="nav-card__title">Lab</p>
<p class="nav-card__desc">Interactive experiments — generative art, physics simulations, creative coding. All canvas, zero dependencies.</p>
<span class="nav-card__tags">Canvas · Boids · Neural · Generative</span>
<span class="nav-card__arrow">→</span>
</a>

</nav>

## Music — Bands {#music}

### [49 Morphines](/practice/49-morphines/)

Bass · 2013–present · *Screamo / Emotional Hardcore*

Korean screamo / emotional hardcore band — intense, chaotic, and cathartic. Released internationally via Dog Knights Productions.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1em 0 2em 0;">
<iframe src="https://www.youtube.com/embed/VFlzVLBumpI" frameborder="0" allowfullscreen
  style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:4px;"></iframe>
</div>

---

### [Noeazy](/practice/noeazy/)

Guitar · 2007–2019 · *Metalcore*

Korean metalcore band. 3rd place at the Emergenza Festival International Final (Taubertal, Germany, 2016). Nominated for Korean Popular Music Awards (2019).

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1em 0 2em 0;">
<iframe src="https://www.youtube.com/embed/zYNiCLNHMHo" frameborder="0" allowfullscreen
  style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:4px;"></iframe>
</div>

---

### [Jambinai](/practice/jambinai/)

Guitar (guest) · 2013–2014 · *Post-rock / Experimental / Gugak*

Korean post-rock band fusing traditional instruments with electric guitar and percussion. Featured in NPR, Pitchfork, and Vice.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1em 0 2em 0;">
<iframe src="https://www.youtube.com/embed/56dv3XHUISY" frameborder="0" allowfullscreen
  style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:4px;"></iframe>
</div>

---

## Writing & Translation {#writing}

### [Translation Review (2022)](/practice/translation/)

Contributed as a science reviewer for the Korean edition of Jeff Hawkins' ***A Thousand Brains: A New Theory of Intelligence*** (천 개의 뇌, 이데아, 2022). Verified technical accuracy of neuroscience and memory hierarchy passages.

`Translation · Science writing`

---

### [KAIST Literary Award (2019)](/practice/literary/)

Honorable Mention, 22nd KAIST Literary Contest, Essay/Criticism category. The piece explored the phenomenology of memory from a neuroscience perspective.

`Essay · Honorable Mention`

---

## Performance & Interdisciplinary {#performance}

### [Crowd Walk (2019)](/practice/crowd-walk/)

Performed with artist **Lang Lee** at *Ilmin Museum of Art*, Seoul. Real-time emotion recognition from facial expression and EEG drove a crowd-movement performance piece.

`Performance · BCI · Ilmin Museum`

---

Awards and honors: [main page](/#awards--honors). Talks: [Talks](/talks/).
