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
  background-color: var(--nc-accent-muted);
}
.nav-card--music::before {
  content: '';
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  background: linear-gradient(105deg,
    transparent 28%, rgba(80,150,100,0.08) 50%, transparent 72%
  );
  background-size: 300% 100%;
  animation: music-shimmer 6s linear infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes music-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -100% 0; }
}
.nav-card--music:not(.wip):hover {
  box-shadow: 0 16px 36px rgba(46,85,56,0.20), 0 3px 10px rgba(46,85,56,0.10);
}

/* Writing — white default, warm tint on hover */
.nav-card--writing {
  --nc-accent-muted: rgba(90,60,15,0.14);
  --nc-accent-hover: rgba(90,60,15,0.20);
}
.nav-card--writing:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(46,85,56,0.18), 0 2px 8px rgba(46,85,56,0.08);
}

/* Performance — white default, cool tint on hover */
.nav-card--perf {
  --nc-accent-muted: rgba(50,40,80,0.13);
  --nc-accent-hover: rgba(50,40,80,0.18);
}
.nav-card--perf:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(46,85,56,0.18), 0 2px 8px rgba(46,85,56,0.08);
}

/* Lab — white default, teal tint on hover */
.nav-card--lab {
  --nc-accent-muted: rgba(15,80,90,0.14);
  --nc-accent-hover: rgba(15,80,90,0.20);
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

/* ── Content sections ── */
.cr-section {
  margin: 2.5em 0 3em;
}
.cr-section__header {
  font-size: 0.62em; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  opacity: 0.85; margin: 0 0 1.2em;
  padding-bottom: 0.55em;
}
.cr-section--music .cr-section__header  { color: rgb(46,85,56);  border-bottom: 2px solid rgba(46,85,56,0.25); }
.cr-section--writing .cr-section__header { color: rgb(90,60,15); border-bottom: 2px solid rgba(90,60,15,0.25); }
.cr-section--perf .cr-section__header   { color: rgb(50,40,80);  border-bottom: 2px solid rgba(50,40,80,0.25); }

.cr-entry {
  border-left: 3px solid;
  padding: 0.5em 0 0.5em 1.2em;
  margin-bottom: 2em;
}
.cr-section--music  .cr-entry { border-color: rgba(46,85,56,0.30); }
.cr-section--writing .cr-entry { border-color: rgba(90,60,15,0.30); }
.cr-section--perf   .cr-entry { border-color: rgba(50,40,80,0.30); }

.cr-entry__title { font-size: 1em; font-weight: 700; margin: 0 0 0.25em; }
.cr-entry__title a { color: inherit; text-decoration: none; }
.cr-entry__title a:hover { text-decoration: underline; }
.cr-entry__meta { font-size: 0.82em; opacity: 0.55; margin: 0 0 0.5em; font-style: italic; }
.cr-entry__desc { font-size: 0.88em; line-height: 1.6; margin: 0 0 0.5em; }
.cr-entry__video {
  position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;
  margin: 0.8em 0 0;
}
.cr-entry__video iframe {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 4px;
}
.cr-footer {
  font-size: 0.85em; opacity: 0.6; margin-top: 2em;
  padding-top: 1em; border-top: 1px solid rgba(46,85,56,0.15);
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

<section class="cr-section cr-section--music" id="music">
<p class="cr-section__header">Music — Bands</p>

<div class="cr-entry">
<p class="cr-entry__title"><a href="/practice/49-morphines/">49 Morphines</a></p>
<p class="cr-entry__meta">Bass · 2013–present · Screamo / Emotional Hardcore</p>
<p class="cr-entry__desc">Korean screamo / emotional hardcore band — intense, chaotic, and cathartic. Released internationally via Dog Knights Productions.</p>
<div class="cr-entry__video">
<iframe src="https://www.youtube.com/embed/VFlzVLBumpI" frameborder="0" allowfullscreen></iframe>
</div>
</div>

<div class="cr-entry">
<p class="cr-entry__title"><a href="/practice/noeazy/">Noeazy</a></p>
<p class="cr-entry__meta">Guitar · 2007–2019 · Metalcore</p>
<p class="cr-entry__desc">Korean metalcore band. 3rd place at the Emergenza Festival International Final (Taubertal, Germany, 2016). Nominated for Korean Popular Music Awards (2019).</p>
<div class="cr-entry__video">
<iframe src="https://www.youtube.com/embed/zYNiCLNHMHo" frameborder="0" allowfullscreen></iframe>
</div>
</div>

<div class="cr-entry">
<p class="cr-entry__title"><a href="/practice/jambinai/">Jambinai</a></p>
<p class="cr-entry__meta">Guitar (guest) · 2013–2014 · Post-rock / Experimental / Gugak</p>
<p class="cr-entry__desc">Korean post-rock band fusing traditional instruments with electric guitar and percussion. Featured in NPR, Pitchfork, and Vice.</p>
<div class="cr-entry__video">
<iframe src="https://www.youtube.com/embed/56dv3XHUISY" frameborder="0" allowfullscreen></iframe>
</div>
</div>

</section>

<section class="cr-section cr-section--writing" id="writing">
<p class="cr-section__header">Writing &amp; Translation</p>

<div class="cr-entry">
<p class="cr-entry__title"><a href="/practice/translation/">Translation Review (2022)</a></p>
<p class="cr-entry__meta">Translation · Science writing</p>
<p class="cr-entry__desc">Contributed as a science reviewer for the Korean edition of Jeff Hawkins' <em>A Thousand Brains: A New Theory of Intelligence</em> (천 개의 뇌, 이데아, 2022). Verified technical accuracy of neuroscience and memory hierarchy passages.</p>
</div>

<div class="cr-entry">
<p class="cr-entry__title"><a href="/practice/literary/">KAIST Literary Award (2019)</a></p>
<p class="cr-entry__meta">Essay · Honorable Mention</p>
<p class="cr-entry__desc">Honorable Mention, 22nd KAIST Literary Contest, Essay/Criticism category. The piece explored the phenomenology of memory from a neuroscience perspective.</p>
</div>

</section>

<section class="cr-section cr-section--perf" id="performance">
<p class="cr-section__header">Performance &amp; Interdisciplinary</p>

<div class="cr-entry">
<p class="cr-entry__title"><a href="/practice/crowd-walk/">Crowd Walk (2019)</a></p>
<p class="cr-entry__meta">Performance · BCI · Ilmin Museum</p>
<p class="cr-entry__desc">Performed with artist <strong>Lang Lee</strong> at <em>Ilmin Museum of Art</em>, Seoul. Real-time emotion recognition from facial expression and EEG drove a crowd-movement performance piece.</p>
</div>

</section>

<p class="cr-footer">Awards and honors: <a href="/#awards--honors">main page</a>. Talks: <a href="/talks/">Talks</a>.</p>
