---
layout: page
title: Learning
description: >
  Notes, reading, and writing — TIL, books, papers, and blog posts.
permalink: /learning/
sitemap: true
---

<style>
/* ── Learning cards: TIL featured (permanent tint), others white base + distinct hover ── */
.nav-card--til {
  --nc-accent-muted: rgba(20,85,65,0.08);
  --nc-accent-hover: rgba(20,85,65,0.15);
  /* featured rule in my-head.html supplies background-color */
}
.nav-card--til:not(.wip):hover {
  box-shadow: 0 14px 36px rgba(20,85,65,0.15), 0 3px 8px rgba(20,85,65,0.08);
}

.nav-card--books {
  --nc-accent-muted: rgba(68,82,20,0.11);
  --nc-accent-hover: rgba(68,82,20,0.19);
  /* white base — tint appears on hover only */
}
.nav-card--books:not(.wip):hover {
  background-color: var(--nc-accent-muted);
  box-shadow: 0 12px 30px rgba(68,82,20,0.14), 0 2px 8px rgba(68,82,20,0.07);
}

.nav-card--papers {
  --nc-accent-muted: rgba(14,72,62,0.11);
  --nc-accent-hover: rgba(14,72,62,0.19);
}
.nav-card--papers:not(.wip):hover {
  background-color: var(--nc-accent-muted);
  box-shadow: 0 12px 30px rgba(14,72,62,0.14), 0 2px 8px rgba(14,72,62,0.07);
}

.nav-card--blog {
  --nc-accent-muted: rgba(44,54,44,0.10);
  --nc-accent-hover: rgba(44,54,44,0.17);
}
.nav-card--blog:not(.wip):hover {
  background-color: var(--nc-accent-muted);
  box-shadow: 0 12px 30px rgba(44,54,44,0.12), 0 2px 8px rgba(44,54,44,0.06);
}
</style>

<p>Active learning — continuous notes, curated reading, and writing on NeuroAI, cognitive science, and the tools of research.</p>

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
