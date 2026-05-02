---
layout: page
title: Learning
description: >
  Notes, reading, and writing — TIL, books, papers, and blog posts.
permalink: /learning/
sitemap: true
---

<style>
/* ── Learning cards: subtle hue variations of site base green rgb(46,85,56) ── */
.nav-card--til {
  --nc-accent-muted: rgba(20,85,65,0.07);
  --nc-accent-hover: rgba(20,85,65,0.13);
  background-color: var(--nc-accent-muted);
}
.nav-card--til:not(.wip):hover {
  box-shadow: 0 14px 36px rgba(20,85,65,0.15), 0 3px 8px rgba(20,85,65,0.08);
}

.nav-card--books {
  --nc-accent-muted: rgba(60,82,28,0.07);
  --nc-accent-hover: rgba(60,82,28,0.13);
  background-color: var(--nc-accent-muted);
}
.nav-card--books:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(60,82,28,0.15), 0 2px 8px rgba(60,82,28,0.08);
}

.nav-card--papers {
  --nc-accent-muted: rgba(46,85,56,0.07);
  --nc-accent-hover: rgba(46,85,56,0.13);
  background-color: var(--nc-accent-muted);
}
.nav-card--papers:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(46,85,56,0.15), 0 2px 8px rgba(46,85,56,0.08);
}

.nav-card--blog {
  --nc-accent-muted: rgba(46,70,52,0.06);
  --nc-accent-hover: rgba(46,70,52,0.11);
  background-color: var(--nc-accent-muted);
}
.nav-card--blog:not(.wip):hover {
  box-shadow: 0 12px 30px rgba(46,70,52,0.13), 0 2px 8px rgba(46,70,52,0.07);
}
</style>

<p class="nav-principles">Active learning</p>

<nav class="nav-cards-grid">

<a class="nav-card nav-card--featured nav-card--til" href="/til/">
<span class="nav-card__principle">Knowledge</span>
<p class="nav-card__title">TIL</p>
<p class="nav-card__desc">Today I Learned — short notes on research, tools, and techniques encountered day to day. NeuroAI, ML, and cognitive science.</p>
<span class="nav-card__tags">NeuroAI · ML · Neuroscience · Tools</span>
<span class="nav-card__arrow">→</span>
</a>

<a class="nav-card nav-card--books" href="/books/">
<span class="nav-card__principle">Reading</span>
<p class="nav-card__title">Books</p>
<p class="nav-card__desc">Books on philosophy, cognitive science, AI, and NeuroAI — reading list with notes.</p>
<span class="nav-card__tags">Philosophy · Cognitive Science · AI</span>
<span class="nav-card__arrow">→</span>
</a>

<a class="nav-card nav-card--papers" href="/reading-list/">
<span class="nav-card__principle">Research</span>
<p class="nav-card__title">Papers</p>
<p class="nav-card__desc">Curated reading list of papers in NeuroAI, vision, and computational neuroscience — with Tier ratings.</p>
<span class="nav-card__tags">NeuroAI · Vision · Computation</span>
<span class="nav-card__arrow">→</span>
</a>

<a class="nav-card nav-card--blog" href="/blog/">
<span class="nav-card__principle">Writing</span>
<p class="nav-card__title">Blog</p>
<p class="nav-card__desc">Longer essays on research directions, experiments, and ideas that need more room to breathe.</p>
<span class="nav-card__tags">Research · Essays · Ideas</span>
<span class="nav-card__arrow">→</span>
</a>

</nav>
