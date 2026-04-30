---
layout: page
title: Research
description: >
  Postdoc at KAIST AMILab. Designing brain-inspired cognitive architectures for systematic generalization and continual learning.
permalink: /research/
sitemap: true
---

My work sits at the intersection of cognitive neuroscience and AI. The central question driving everything: what computational principles does biological intelligence use to generalize so gracefully, and can we build AI systems around those same principles?

I approach this through a two-direction loop:

1. **AI for Neuroscience** — using computer vision and generative models as "practical microscopes" to decode neural and behavioral data that was previously too complex to quantify.
2. **Neuroscience for AI** — drawing on canonical neural computations (grid cells, cortical columns, complementary learning systems) to architect AI that generalizes more robustly.

## Core Principles

Three ideas from neuroscience anchor everything I build:

1. **Universal Reference Frames** — Abstract knowledge anchored to stable spatial representations (inspired by hippocampal grid cells). See [CLAY, CVPR 2026](https://sohwi-lim.github.io/CLAY/).
2. **Predictive Modeling in Canonical Circuits** — World models learned through local prediction, mirroring cortical column computations.
3. **Structure / Content Factorization** — Separating reusable structure (the "grammar") from variable content (the "words") to enable lifelong learning without catastrophic forgetting.

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

### Brain-Based Learning & Architecture
Continual learning, representational hierarchies (cortical columns, CapsuleNet), world models and reference frames (Thousand Brains Theory), predictive coding.

### Computational Cognition & Decision-Making
Dual-process theory (System 1/2), heuristics and cognitive bias, reward systems, atypical cognition modeling, AI safety intersections.

### Embodied Social Intelligence
Social learning via inverse RL, multi-agent systems and theory of mind, sensorimotor integration, active inference.

---

## Current Work (2025–2026)

**Postdoctoral Fellow, [AMILab](https://ami.kaist.ac.kr/), KAIST** — PI: Prof. Tae-Hyun Oh

- **3D Behavioral Reconstruction**: Freely-moving animal pose estimation using multi-view geometry and 3D Gaussian Splatting. Scaling single-subject behavioral phenotyping to group-level analysis.
- **Conditional Visual Similarity (CLAY)**: Modulating semantic similarity in VLM embedding space via conditioning signals. Accepted at **CVPR 2026**.
- **MoE-PRM**: Mixture-of-Experts process reward models for metacognitive control — dynamic switching between fast and deliberate reasoning.

---

## Featured Reading

Papers I return to across my core themes. Full annotated list: [**Reading List →**](/reading-list/)

- **World Models**: Hawkins et al., *A Thousand Brains*; LeCun, *A Path Towards Autonomous Machine Intelligence*
- **Continual Learning**: McClelland et al., *CLS Theory*; Kirkpatrick et al., *EWC*
- **Social Intelligence**: Dunbar, *The Social Brain Hypothesis*; Ziebart et al., *Maximum Entropy IRL*
- **Object-Centric**: Locatello et al., *Slot Attention*; Greff et al., *Binding Problem*

---

*Publications and CV: [Google Scholar](https://scholar.google.com/citations?user=D_rZCWYAAAAJ) · [markdown-cv](/markdown-cv/)*
