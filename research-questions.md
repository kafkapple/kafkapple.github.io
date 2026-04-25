---
layout: page
title: Research Questions
description: >
  An evolving list of open questions I am genuinely pursuing — at the
  interface of neuroscience and AI.
permalink: /research-questions/
sitemap: true
---

A short, dated list of the questions I currently find most worth chasing.
Pinned not as polished claims but as **active threads** — what I am thinking about, where I would welcome collaboration, and what I might be wrong about. The list is updated as understanding shifts.

*Last updated: 2026-04-25.*

---

## Open questions

### 1. How does *context* reshape perception and decision under similar inputs?
- **Why it matters**: Across rodent empathy, LLM emotion reasoning, and conditional visual similarity (CLAY), the *same* input is interpreted differently when relational/temporal/social context shifts. A general account of context-conditioning seems within reach but lacks a unified formalism.
- **Open**: Is "context" best modeled as a slow-moving prior, a separate routing variable, or a learned modulation gate? Do the same mechanisms appear across modalities?

### 2. Can neural-data-derived inductive biases meaningfully improve AI architectures — or is this just narrative?
- **Why it matters**: Brain-inspired AI is often invoked, rarely tested rigorously. I want to identify cases where neuroscience-derived constraints (sparsity, predictive coding, hippocampal indexing) yield a measurable, reproducible advantage versus matched non-bio-inspired baselines.
- **Open**: What is the smallest claim of "biologically informed" that is empirically defensible?

### 3. What does an honest evaluation of animal behavior look like with 3D + foundation models?
- **Why it matters**: 3D reconstruction (3DGS, MVG) + foundation-model features promise quantitative behavioral phenotyping. But replicability across labs, species, and lighting conditions is shaky. The field needs benchmarks, not benchmarks of benchmarks.
- **Open**: What set of held-out conditions would convince a skeptical neuroscientist that a behavior pipeline generalizes?

### 4. Where does emotion-aware LLM reasoning fail in ways that *matter* for downstream decisions?
- **Why it matters**: Recent prompting/few-shot/ensembling improvements (e.g., my Zenodo 2025 preprint) raise emotion-recognition scores. But many failures cluster at decision-relevant edge cases (sarcasm, cultural nuance, suppression). Score-level improvements may obscure the failure shape.
- **Open**: What is the right error analysis taxonomy when the downstream user is an applied agent, not a leaderboard?

### 5. Can the "Virtuous Cycle of NeuroAI" be operationalized with a concrete protocol, not a slogan?
- **Why it matters**: Bridging biological and artificial intelligence is broadly invoked. The actual loop — *data from brains → constraints on models → models → predictions about brains* — needs a worked-out instance with falsifiable steps.
- **Open**: Pick one cognitive function (e.g., context-dependent fear extinction, or perceptual similarity modulation) and build the closed loop end-to-end. What breaks?

### 6. What is the minimal setup for trustworthy cross-species behavioral comparison?
- **Why it matters**: Rodent → primate → human comparisons are foundational to neuroscience, but methodological asymmetries (recording resolution, behavioral repertoire, ecological validity) muddy translation. A minimal joint protocol could change what comparisons are even meaningful.
- **Open**: What is the smallest invariant we should require before claiming a behavioral phenotype "translates"?

---

## Updates

- *2026-04-25* — Initial registry posted.

---

## Notes for visitors

If any of these questions overlaps with what you are working on, I would love to hear from you. Reach: [biasdrive@gmail.com](mailto:biasdrive@gmail.com).

If a question is missing or seems poorly framed, that is genuinely useful feedback — I expect this list to change.
