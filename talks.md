---
layout: page
title: Talks & Seminars
description: >
  Selected talks, seminars, and recorded presentations — chronological with video embeds.
permalink: /talks/
sitemap: true
---

<style>
.talk-stats { display:flex; gap:2em; flex-wrap:wrap; margin:0.8em 0 1.6em 0; font-size:0.9em; color:#555; }
.talk-stat { text-align:center; }
.talk-stat strong { display:block; font-size:1.6em; color:#224; line-height:1.1; }
.heatmap { display:flex; gap:0.35em; flex-wrap:wrap; align-items:flex-end; margin:1em 0 1.8em 0; }
.hm-col { display:flex; flex-direction:column; align-items:center; gap:0.2em; }
.hm-year { font-size:0.72em; color:#888; writing-mode:vertical-rl; transform:rotate(180deg); }
.hm-bar { width:1.2em; border-radius:2px; background:#3a6090; opacity:0.85; }
.talk-entry { margin:0.4em 0 1.2em 0; padding:0.5em 0.8em; border-left:3px solid #ccc; }
.talk-entry .venue { font-size:0.88em; color:#666; }
.talk-entry .role-badge { display:inline-block; font-size:0.76em; padding:0.05em 0.4em; border-radius:2px; margin-right:0.35em; font-weight:600; }
.badge-oral  { background:#dbeafe; color:#1e4080; }
.badge-poster { background:#fef3c7; color:#78350f; }
.badge-invited { background:#d1fae5; color:#065f46; }
.badge-workshop { background:#ede9fe; color:#4c1d95; }
.badge-seminar { background:#fce7f3; color:#831843; }
</style>

<div class="talk-stats">
  <div class="talk-stat"><strong>10</strong> talks / seminars</div>
  <div class="talk-stat"><strong>8</strong> years active<br><span style="font-size:0.85em">2013–2026</span></div>
  <div class="talk-stat"><strong>5</strong> countries<br><span style="font-size:0.85em">KR · US · NL · CN · Virtual</span></div>
  <div class="talk-stat"><strong>2</strong> with video</div>
</div>

**Activity by year**

<div class="heatmap">
  <div class="hm-col"><div class="hm-bar" style="height:1.0em;" title="2013: 1"></div><div class="hm-year">2013</div></div>
  <div class="hm-col"><div class="hm-bar" style="height:1.8em;" title="2018: 1"></div><div class="hm-year">2018</div></div>
  <div class="hm-col"><div class="hm-bar" style="height:1.0em;" title="2019: 1"></div><div class="hm-year">2019</div></div>
  <div class="hm-col"><div class="hm-bar" style="height:1.8em;" title="2022: 1"></div><div class="hm-year">2022</div></div>
  <div class="hm-col"><div class="hm-bar" style="height:1.8em;" title="2023: 1"></div><div class="hm-year">2023</div></div>
  <div class="hm-col"><div class="hm-bar" style="height:3.0em;" title="2024: 2"></div><div class="hm-year">2024</div></div>
  <div class="hm-col"><div class="hm-bar" style="height:6.0em;" title="2025: 3"></div><div class="hm-year">2025</div></div>
  <div class="hm-col"><div class="hm-bar" style="height:3.0em;" title="2026: 2"></div><div class="hm-year">2026</div></div>
</div>

---

## 2026

<div class="talk-entry">
<span class="role-badge badge-seminar">Lab Seminar</span>
<strong>The Virtuous Cycle of NeuroAI: Bridging Biological and Artificial Intelligence</strong><br>
<span class="venue">Feb 2026 · KAIST AMILab, Daejeon</span>

The talk frames NeuroAI as a two-direction loop — using AI to study brains and behavior, and drawing on neuroscience to inform AI architectures — and walks through three concrete projects (rodent empathy, emotion-aware LLMs, conditional visual similarity in VLMs) where this loop is operative.

> 🔒 Recording (`pNfBXntZh10`) is currently **Private** on YouTube. Contact me for access.
</div>

---

## 2025

<div class="talk-entry">
<span class="role-badge badge-poster">Poster</span>
<strong>Systematic Benchmarking of Prompt Engineering Strategies for LLM-based Emotion Recognition</strong><br>
<span class="venue">Dec 2025 · 2025 RCV Next-Generation Collaboration and Research Exchange Workshop (RCV 초세대 협력 워크샵), KAIST, Daejeon</span>

Systematic evaluation of modular prompt strategies (zero-shot, few-shot, RAG) and LLM ensemble architectures for text-based emotion recognition on ISEAR (7 categories, 7,328 samples). Proposer–Aggregator ensemble (GPT-4o + Claude-3.5 Sonnet as proposers, Qwen 2.5-14B as aggregator) achieves peak macro-F1 of 78.4%. Key finding: advanced prompting yields the largest gains for smaller models, while larger models (≥10B) show a scaling paradox — robust baselines with diminishing returns from complex prompts.

<a href="https://doi.org/10.5281/zenodo.15126322">Zenodo preprint</a>
</div>

<div class="talk-entry">
<span class="role-badge badge-workshop">Workshop</span>
<strong>Neuro-AI Convergence: Foundation Model Workflows for Neuroscience</strong><br>
<span class="venue">Jun 2025 · DBDL, Dept. of BCS, KAIST, Daejeon</span>

3-hour seminar + hands-on workshop applying foundation models (LLMs, vision transformers, diffusion models) to brain and behavioral data. Covered zero-shot neural decoding, behavior segmentation with SAM, and RAG-based literature synthesis.
</div>

<div class="talk-entry">
<span class="role-badge badge-seminar">Program Seminar</span>
<strong>Advancing Emotion Recognition in LLMs</strong><br>
<span class="venue">Mar 2025 · Impact Scholars Program (Neuromatch Academy), Virtual</span>

Co-presentation of findings from the ISP mentored research project: comparative study of prompt strategies (zero-shot, CoT, few-shot) and model ensembling for emotion recognition in LLMs across GoEmotions and SemEval benchmarks.
</div>

---

## 2024

<div class="talk-entry">
<span class="role-badge badge-invited">Invited</span>
<strong>Behavioral Video Analysis for Predicting Attraction towards Others</strong><br>
<span class="venue">Jan 2024 · BC & Behavior Workshop, DBDL @ KAIST, Daejeon</span>

Presentation on using pose estimation and behavioral trajectory analysis to predict social affiliation and attraction in rodent dyadic interactions. Covered cross-session temporal modeling and unsupervised behavioral state discovery.
</div>

---

## 2023

<div class="talk-entry">
<span class="role-badge badge-poster">Poster</span>
<strong>Mice Hierarchy and Empathy Study</strong><br>
<span class="venue">Aug 2023 · 50th European Brain & Behaviour Society Meeting (EBBS), Amsterdam, Netherlands</span>

Presented the hierarchy-empathy paper (Genes Brain Behav 2022): social hierarchy between mouse pairs specifically modulates affective empathy expression, and this effect is directional (dominant → subordinate asymmetry).
</div>

---

## 2022

<div class="talk-entry">
<span class="role-badge badge-poster">Poster</span>
<strong>AVATAR: AI Vision Analysis for Three-Dimensional Action in Real-Time</strong><br>
<span class="venue">Jun 2022 · CV4Animals Workshop @ CVPR 2022, New Orleans, USA · Poster ID 8, Track I</span>

<a href="https://www.cv4animals.com/2022-accepted-papers">Workshop page</a> · <a href="https://doi.org/10.1101/2021.12.31.474634">bioRxiv</a>
</div>

---

## 2019

<div class="talk-entry">
<span class="role-badge badge-poster">Poster</span>
<strong>Intrinsic and Social Factors of Empathic Response</strong><br>
<span class="venue">May 2019 · Francis Crick Symposium, Cold Spring Harbor Lab (Suzhou), China</span>

Poster on inbred strain differences in empathic fear (Genes Brain Behav 2016) and preliminary data on social hierarchy modulation of empathy expression.
</div>

---

## 2018 — Video {#ddsa-2018}

<div class="talk-entry">
<span class="role-badge badge-oral">Oral</span>
<strong>NAS-Optimized CNN for Driver Monitoring with XAI</strong><br>
<span class="venue">Oct 2018 · ETRI AI System Development Seminar, Pangyo · <strong>Grand Prize (DDSA) + Encouragement Prize (ETRI)</strong></span>

Neural Architecture Search for real-time driver drowsiness/emotion detection on embedded hardware. Grad-CAM explainability surfaces attention regions for regulatory compliance.

**Video**: *데이터 사이언스 프로젝트 6 — Prediction and Feedback System Based on Facial Emotion Recognition in Video*
</div>

{% include youtube.html id="SJyrKreEzos" title="Prediction and Feedback System — Facial Emotion Recognition (2018)" quality="maxresdefault" %}

---

## 2013

<div class="talk-entry">
<span class="role-badge badge-poster">Poster</span>
<strong>The Precision of Contextual Familiarity Memory Is Attenuated in Remote Retrieval</strong><br>
<span class="venue">Nov 2013 · Society for Neuroscience (SfN) Annual Meeting, San Diego, USA</span>
</div>
