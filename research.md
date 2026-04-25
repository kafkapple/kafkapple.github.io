---
layout: page
title: Research
description: >
  My research, in plain language — what I work on, why, and how the
  pieces connect.
permalink: /research/
sitemap: true
---

This page is for visitors who want a clear picture of my work without
academic jargon. The technical version lives on the [main page](/) and in
my [CV](/markdown-cv/).

---

## In one sentence

I study how *context* changes what we perceive and decide — both in
biological brains and in modern AI systems — and use each side to inform
the other.

## The Virtuous Cycle of NeuroAI

I think of my work as a loop with two directions:

**(1) AI used to study brains and behavior.**
Modern AI (computer vision, vision-language models, LLMs) has become a
practical microscope. I use it to read structure out of data that was
previously too messy to handle — animal behavior video, neural recordings,
human emotion expression — so we can ask sharper questions about how the
brain works.

**(2) Neuroscience used to inform AI.**
Brains do something AI mostly doesn't: they generalize gracefully across
context, recover quickly from sparse data, and integrate signals over
many timescales. I look for places where principles from how brains
actually work could shape better AI architectures — not as decoration, but
as testable design choices.

The interesting projects sit on the **boundary** where each direction
informs the other.

---

## Three current threads

### 1. Context shapes everything (perception → cognition)

Most of my published work converges on a single observation: **identical
inputs are interpreted differently when the surrounding context shifts.**

- *In rodent empathy*: a mouse's fear response to a partner's distress
  depends on the social hierarchy between them.
- *In LLM emotion reasoning*: prompting strategy and few-shot examples
  shift how a model resolves ambiguous emotional content.
- *In vision-language models* (CLAY, CVPR 2026): visual similarity
  itself can be modulated by a text condition, without retraining.

I want a unified account of this — what is "context" doing computationally,
and is the same mechanism showing up across biology and AI?

### 2. 3D reconstruction for animal behavior

At KAIST AMILab, I am building pipelines that reconstruct freely-moving
animals in 3D using **multi-view geometry + neural representations
(3D Gaussian Splatting)**. The goal is to extract behavioral descriptors
that are *quantitative and reproducible* — not the bottleneck of human
annotation that current behavioral neuroscience often relies on.

This connects to thread (1): once we can measure behavior precisely,
we can ask how context changes it.

### 3. Brain-inspired architectures, rigorously tested

"Brain-inspired" is often a slogan. I am interested in cases where a
specific principle from neuroscience (e.g., predictive coding, sparse
representations, hippocampal indexing) yields a *measurable* improvement
on a real AI task, against properly-matched baselines. Without that
discipline, NeuroAI risks becoming aesthetic rather than scientific.

---

## Background

I started in **experimental neuroscience** — chemogenetics, in-vivo
electrophysiology, behavioral assays of empathy and social memory at IBS,
KAIST, and KIST. I co-founded **ACTNOVA**, a neuroscience-AI startup, where
I led behavior-analysis research for partners including UCSD, Broad
Institute, and KAIST. Now at **KAIST AMILab** as a postdoc, I am applying
modern computer vision and VLM methods to questions I first encountered
as a neuroscientist.

---

## Get in touch

Open to collaboration on:
- Cross-species behavioral comparison
- Context-conditioning in vision-language models
- Brain-inspired AI evaluation methodology

Email: [biasdrive@gmail.com](mailto:biasdrive@gmail.com)

For specific open questions I'm pursuing, see the
[Research Questions Registry](/research-questions/).
