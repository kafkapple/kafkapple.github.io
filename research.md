---
layout: page
title: Research
description: >
  Postdoc at KAIST AMILab. Designing brain-inspired cognitive architectures for systematic generalization and continual learning.
permalink: /research/
sitemap: true
---

<style>
.research-nav { display: flex; flex-wrap: wrap; gap: 0.55em; margin: 0.2em 0 1.8em 0; }
.research-nav a {
  display: inline-flex; align-items: center; gap: 0.35em;
  padding: 0.38em 0.85em;
  background: rgba(46,85,56,0.07); color: rgb(46,85,56);
  border: 1px solid rgba(46,85,56,0.22); border-radius: 4px;
  font-size: 0.86em; font-weight: 600; text-decoration: none;
  transition: background 0.18s, border-color 0.18s, transform 0.12s;
}
.research-nav a:hover {
  background: rgba(46,85,56,0.18); border-color: rgba(46,85,56,0.5);
  transform: translateY(-1px); text-decoration: none;
}
</style>

<nav class="research-nav">
  <a href="https://scholar.google.com/citations?user=D_rZCWYAAAAJ">📄 Google Scholar</a>
  <a href="/reading-list/">📚 Reading List</a>
  <a href="/talks/">🎤 Talks</a>
  <a href="/projects/">🔬 Projects</a>
  <a href="/markdown-cv/">📋 CV</a>
</nav>

My work sits at the intersection of cognitive neuroscience and AI. The central question driving everything: what computational principles does biological intelligence use to generalize so gracefully, and can we build AI systems around those same principles?

I approach this through a two-direction loop:

1. **AI for Neuroscience** — using computer vision and generative models as "practical microscopes" to decode neural and behavioral data that was previously too complex to quantify.
2. **Neuroscience for AI** — drawing on canonical neural computations (grid cells, cortical columns, complementary learning systems) to architect AI that generalizes more robustly.

## Core Principles

Three mechanistic ideas from neuroscience anchor everything I build:

1. **Universal Reference Frames** — Abstract knowledge anchored to stable spatial representations (inspired by hippocampal grid cells and the Thousand Brains theory).
2. **Predictive Modeling in Canonical Circuits** — World models learned through local prediction, mirroring cortical column computations.
3. **Structure / Content Factorization** — Separating reusable structure (the "grammar") from variable content (the "words") to enable *compositional generalization* and lifelong learning without catastrophic forgetting.

---

## 4-Stage Cognitive Architecture

These principles map onto a modular hierarchy:

| Stage | Name | Function |
|-------|------|----------|
| I | Object-Centric Perception | Grounded object representations via Slot Attention + grid-cell reference frames |
| II | Predictive Abstraction | JEPA-style prediction → discrete symbol conversion |
| III | Semantic Consolidation | Episodic → semantic knowledge integration (CLS theory) |
| IV | Metacognitive Control | MoE-PRM: dynamic routing between System 1 intuition and System 2 reasoning |

---

## Research Themes

These three pillars integrate the core principles above with my research trajectory.

### Structured Representation & Memory Consolidation
Compositional generalization through structure / content factorization; context-sensitive coordination of working and long-term memory; episodic-to-semantic integration via complementary learning systems (CLS); representational hierarchies inspired by cortical columns; sparse and disentangled coding for continual learning.

### Multi-modal Grounding via Reference Frames
Spatial anchoring through grid-cell-inspired coding; cross-modal binding of vision, language, and other sensory streams; world models learned through local prediction in canonical circuits; reference-frame–based generalization.

### Social & Context-Adaptive Cognition
Empathy and social inference grounded in *perception–action coupling* and *theory of mind*; context-conditioned representations that modulate behavior across situations; multi-agent interaction and active inference. This pillar grew out of rodent affective-empathy neuroscience and now informs human-aligned multi-modal AI.

---

*Publications and CV: [Google Scholar](https://scholar.google.com/citations?user=D_rZCWYAAAAJ) · [CV](/markdown-cv/)*
