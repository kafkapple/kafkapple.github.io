---
layout: page
title: Projects
description: >
  Engineering and research projects outside peer-reviewed publications.
permalink: /projects/
sitemap: true
---

<style>
.proj { margin: 0.25em 0 1.2em 0; padding: 0.6em 0.9em; border-left: 3px solid #aaa; line-height: 1.55; }
.proj-title { font-weight: 600; margin: 0 0 0.15em 0; }
.proj-meta { font-size: 0.88em; color: #666; margin: 0 0 0.1em 0; }
.proj-desc { font-size: 0.93em; margin: 0; }
.badge { display: inline-block; font-size: 0.78em; font-weight: 700; padding: 0.1em 0.5em; border-radius: 3px; margin-right: 0.4em; vertical-align: middle; }
.badge-1st  { background: #f0c040; color: #5a3a00; }
.badge-2nd  { background: #d0d8e0; color: #2a3a4a; }
.badge-3rd  { background: #d4a96a; color: #4a2800; }
.badge-finalist { background: #e0e8f0; color: #2a4060; }
</style>

A complete record of engineering and research projects outside publications. Selected works appear on the [home page](/#selected-projects).

---

## 2024–2025 — AI/ML Engineering (Upstage AI Lab)

<div class="proj">
<p class="proj-title">Upstage AI Lab — AI/ML Engineering Competitions (5 tracks)</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">Completed 5 ML engineering competitions across diverse domains:</p>
<ul style="font-size:0.93em;margin:0.4em 0 0.3em 1.2em;">
  <li><strong>🥇 1st / 39</strong> Chemical-Process Anomaly Detection — Unsupervised fault detection on 52-dimensional industrial sensor data (IsolationForest, PCA+K-Means, Transformer Autoencoder). F1 0.9000 / Acc 0.9405</li>
  <li><strong>2nd / 24</strong> Text-Based Sentiment Analysis — Aspect-based sentiment on Korean social media (KLUE-RoBERTa, XLM-R). F1 0.7224</li>
  <li><strong>🥉 3rd / 53</strong> Scientific RAG QA — Science retrieval & QA (SBERT, BGE-M3, BM25, FAISS, LangChain). mAP 0.8394</li>
  <li><strong>🥉 3rd / 48</strong> Document-Type Classification — 17-class doc image classification (Hydra, W&B, Focal Loss). Macro-F1 0.9213</li>
  <li><strong>🥉 3rd / 19</strong> Tabular Prediction: Used Car Price — (LightGBM, XGBoost, CatBoost, Optuna, SHAP). RMSE 13,760</li>
</ul>
<p class="proj-desc" style="font-size:0.88em;color:#777;">Common stack: PyTorch · HuggingFace · Hydra · W&amp;B · Optuna · FAISS · LangChain</p>
</div>

---

## 2025 — External Company Project (Upstage AI Lab × ConnectsLab)

<div class="proj">
<p class="proj-title">LLM-Based Parenting Coach — Dialogue Quality Assessment &amp; Plan Recommendation</p>
<p class="proj-meta">Upstage AI Lab × ConnectsLab · Spring 2025</p>
<p class="proj-desc">Built a multi-step LLM pipeline for parent-child dialogue analysis and personalized parenting plan recommendation. Pipeline: survey-based family persona generation → dialogue simulation → 4-dimensional quality scoring (emotional relationship, active listening, communication clarity, conflict resolution) → personalized plan recommendation via ensemble of dialogue- and survey-based signals. Multi-LLM backend (GPT-4o, Claude, Gemini, Llama) with Levenshtein key correction and retry mechanisms.</p>
<p class="proj-desc" style="margin-top:0.3em;font-size:0.88em;color:#777;">Stack: LangChain · Hydra · W&amp;B · OpenAI · Anthropic · Google AI · Ollama</p>
</div>

<div class="proj">
<p class="proj-title">Walk-into-AI — MLOps Pipeline Template</p>
<p class="proj-meta">Independent · 2025</p>
<p class="proj-desc">Production-ready MLOps template with Hydra + W&B + DVC integration. Covers experiment tracking, model versioning, and CI/CD deployment for research-to-production handoff. <a href="https://github.com/kafkapple">GitHub</a></p>
</div>

---

## 2022–2024 — Startup & Industry (ACTNOVA)

<div class="proj">
<p class="proj-title">ACTNOVA — AI Behaviour Analytics Platform</p>
<p class="proj-meta">Co-Founder & R&D Lead · 2022–2024</p>
<p class="proj-desc">Built and deployed YOLOv8 + XGBoost pipeline for automated behavioral phenotyping of freely-moving rodents; reduced expert analysis time by 70%. Cross-lab collaboration with MIT, KAIST, and Broad Institute. Raised ₩4.3B pre-Series A funding.</p>
</div>

<div class="proj">
<p class="proj-title">Multi-Lab Behavioral Data Platform</p>
<p class="proj-meta">ACTNOVA · 2022–2024</p>
<p class="proj-desc">Standardized data pipeline and annotation platform enabling behavioral data exchange across heterogeneous experimental setups at three institutions. Implemented inter-rater reliability metrics and automated QC pipeline.</p>
</div>

<div class="proj">
<p class="proj-title">3D Behavioral Reconstruction System (v1)</p>
<p class="proj-meta">ACTNOVA · 2022–2023</p>
<p class="proj-desc">Multi-camera markerless 3D pose estimation for group-housed rodents. Extended DeepLabCut with triangulation and temporal smoothing; engineering foundation for the AVATAR publication (CVPR 2022 Workshop).</p>
</div>

---

## 2022 — Neuroscience × AI

<div class="proj">
<p class="proj-title">AVATAR: AI Vision Analysis for Three-Dimensional Action in Real-Time</p>
<p class="proj-meta">KAIST × ACTNOVA · CV4Animals Workshop @ CVPR 2022, New Orleans</p>
<p class="proj-desc">Real-time 3D behavioral analysis system combining multi-camera pose estimation with multi-modal clustering of cognitive-control behavioral sequences. Poster presentation (Track I, Poster ID 8). <a href="https://www.cv4animals.com/2022-accepted-papers">Workshop page</a> · <a href="https://doi.org/10.1101/2021.12.31.474634">bioRxiv</a></p>
</div>

---

## 2018 — Hardware × AI

<div class="proj">
<p class="proj-title"><span class="badge badge-1st">Grand Prize (DDSA)</span> NAS-Optimized CNN for Driver Monitoring with XAI</p>
<p class="proj-meta">Hyundai-KIA / ETRI Challenge · 2018</p>
<p class="proj-desc">Neural Architecture Search for real-time driver drowsiness detection on embedded hardware. Integrated Grad-CAM explainability to surface attention regions for regulatory compliance. Won Grand Prize (DDSA) + Encouragement Prize (ETRI).</p>
</div>
