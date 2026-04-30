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
  /* smooth return when mouse leaves */
  transition:
    background-image 0s,
    transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
    filter 0.35s ease,
    box-shadow 0.3s ease;
}
/* While JS is active, let rAF handle transform (no CSS delay) */
.nav-card--music.is-tilting,
.nav-card--writing.is-tilting,
.nav-card--perf.is-tilting,
.nav-card--lab.is-tilting {
  transition: background-image 0s, filter 0.1s ease, box-shadow 0.3s ease;
}

/* Music — forest green + horizontal shimmer */
.nav-card--music {
  --nc-accent: rgb(46,85,56);
  --nc-accent-lt: rgb(80,150,100);
  --nc-accent-muted: rgba(46,85,56,0.10);
  --nc-accent-hover: rgba(46,85,56,0.19);
}
.nav-card--music::before {
  top: 0 !important; left: 0 !important;
  width: 100% !important; height: 100% !important;
  background: linear-gradient(105deg,
    transparent 28%, rgba(80,150,100,0.10) 50%, transparent 72%
  ) !important;
  background-size: 300% 100% !important;
  animation: music-shimmer 6s linear infinite !important;
}
@keyframes music-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -100% 0; }
}
.nav-card--music:not(.wip):hover {
  box-shadow: 0 16px 36px rgba(46,85,56,0.24), 0 3px 10px rgba(46,85,56,0.12);
}

/* Writing — warm amber, literary */
.nav-card--writing {
  --nc-accent: rgb(155,100,28);
  --nc-accent-lt: rgb(200,148,60);
  --nc-accent-muted: rgba(155,100,28,0.07);
  --nc-accent-hover: rgba(155,100,28,0.13);
}
.nav-card--writing:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(155,100,28,0.22), 0 2px 8px rgba(155,100,28,0.10);
}
.nav-card--writing:hover .nav-card__title {
  transform: translateX(5px) skewX(-2deg);
}

/* Performance — indigo/violet, BCI & neuroscience art */
.nav-card--perf {
  --nc-accent: rgb(82,58,148);
  --nc-accent-lt: rgb(128,98,208);
  --nc-accent-muted: rgba(82,58,148,0.07);
  --nc-accent-hover: rgba(82,58,148,0.13);
}
.nav-card--perf:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(82,58,148,0.26), 0 2px 8px rgba(82,58,148,0.12);
}

/* Lab — electric cyan/teal, code & creativity */
.nav-card--lab {
  --nc-accent: rgb(22,130,140);
  --nc-accent-lt: rgb(50,190,200);
  --nc-accent-muted: rgba(22,130,140,0.08);
  --nc-accent-hover: rgba(22,130,140,0.15);
}
.nav-card--lab:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(22,130,140,0.26), 0 2px 8px rgba(22,130,140,0.12);
}
/* Lab: scanline pulse suggesting digital energy */
.nav-card--lab::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(50,190,200,0.03) 3px,
    rgba(50,190,200,0.03) 4px
  );
  pointer-events: none; z-index: 0;
  opacity: 0; transition: opacity 0.4s ease;
}
.nav-card--lab:hover::before { opacity: 1; }
</style>

<p class="nav-principles">Active practice</p>

<nav class="nav-cards-grid">

<a class="nav-card nav-card--featured nav-card--music" href="#music">
<span class="nav-card__principle">Performance</span>
<p class="nav-card__title">Music</p>
<p class="nav-card__desc">Three bands across screamo, metalcore, and experimental post-rock — bass, guitar, and guest performance spanning 2007 to present.</p>
<span class="nav-card__tags">49 Morphines · Noeazy · Jambinai</span>
<span class="nav-card__arrow">↓</span>
</a>

<a class="nav-card nav-card--writing" href="#writing">
<span class="nav-card__principle">Language</span>
<p class="nav-card__title">Writing</p>
<p class="nav-card__desc">Science translation and literary criticism — communicating neuroscience across registers.</p>
<span class="nav-card__tags">Translation · Essay · KAIST</span>
<span class="nav-card__arrow">↓</span>
</a>

<a class="nav-card nav-card--perf" href="#performance">
<span class="nav-card__principle">System</span>
<p class="nav-card__title">Performance</p>
<p class="nav-card__desc">Interdisciplinary work at the intersection of art, neuroscience, and embodied cognition.</p>
<span class="nav-card__tags">BCI · Museum · Neuroscience</span>
<span class="nav-card__arrow">↓</span>
</a>

<a class="nav-card nav-card--lab" href="/lab/">
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
