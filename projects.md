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
<p class="proj-title"><span class="badge badge-1st">🥇 1st / 39</span> Chemical-Process Anomaly Detection</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">Unsupervised fault detection on 52-dimensional multivariate industrial sensor time-series. Methods: IsolationForest, SGDOneClassSVM, PCA+K-Means clustering, Transformer Autoencoder. Metrics: F1 0.9000 / Accuracy 0.9405.</p>
</div>

<div class="proj">
<p class="proj-title"><span class="badge badge-3rd">🥉 3rd / 53</span> Scientific RAG QA</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">Retrieval-augmented question answering on scientific documents. Stack: SBERT, BGE-M3, BM25 hybrid retrieval, FAISS vector index, LangChain pipeline. Metric: mAP 0.8394.</p>
</div>

<div class="proj">
<p class="proj-title"><span class="badge badge-3rd">🥉 3rd / 48</span> Document-Type Classification</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">17-class document image classification under severe class imbalance. Stack: Hydra config management, W&B experiment tracking, Focal Loss, ensemble of vision backbones. Macro-F1 0.9213.</p>
</div>

<div class="proj">
<p class="proj-title"><span class="badge badge-2nd">2nd / 24</span> Text-Based Sentiment Analysis</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">Aspect-based sentiment classification on Korean social media text. Fine-tuned multilingual PLMs (KLUE-RoBERTa, XLM-R) with data augmentation. F1 0.7224.</p>
</div>

<div class="proj">
<p class="proj-title"><span class="badge badge-3rd">🥉 3rd / 19</span> Tabular Prediction — Used Car Price</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">Regression on structured automotive data. Stack: LightGBM, XGBoost, CatBoost ensemble with Optuna hyperparameter tuning, SHAP feature importance analysis. RMSE 13,760.</p>
</div>

---

## 2024 — Government R&D

<div class="proj">
<p class="proj-title"><span class="badge badge-finalist">Finalist</span> Cognitive-Control Circuit Phenotyping</p>
<p class="proj-meta">Bio-Medical Technology Development Program (Brain Science Convergence) · 2024</p>
<p class="proj-desc">Advanced behavioral phenotyping of cognitive-control circuits in ASD mouse models. Proposed deep-learning pipeline for behavioral-sequence embedding using autoregressive modeling in hyperbolic space. Short-listed to final presentation round from national competitive pool.</p>
</div>

---

## 2022–2024 — Startup & Industry (ACTNOVA)

<div class="proj">
<p class="proj-title">ACTNOVA — AI Behaviour Analytics Platform</p>
<p class="proj-meta">Co-founder & R&D Lead · 2022–2024</p>
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
<p class="proj-desc">Multi-camera markerless 3D pose estimation for group-housed rodents. Extended DeepLabCut with triangulation and temporal smoothing; served as the engineering foundation for the AVATAR publication (CVPR 2022 Workshop).</p>
</div>

---

## 2022 — Neuroscience × AI

<div class="proj">
<p class="proj-title">AVATAR: AI Vision Analysis for Three-Dimensional Action in Real-Time</p>
<p class="proj-meta">KAIST × ACTNOVA · CV4Animals Workshop @ CVPR 2022, New Orleans</p>
<p class="proj-desc">Real-time 3D behavioral analysis system combining multi-camera pose estimation with multi-modal clustering of cognitive-control behavioral sequences. Poster presentation (Track I, Poster ID 8). <a href="https://www.cv4animals.com/2022-accepted-papers">Workshop page</a> · <a href="https://doi.org/10.1101/2021.12.31.474634">bioRxiv</a></p>
</div>

---

## 2025 — Applied AI

<div class="proj">
<p class="proj-title">LLM-Based Personalized Coaching System</p>
<p class="proj-meta">Independent · 2025</p>
<p class="proj-desc">Parenting support agent built on GPT-4o with RAG over curated developmental psychology literature. Multi-turn dialogue management with context-window compression; deployed as a prototype web app.</p>
</div>

<div class="proj">
<p class="proj-title">Walk-into-AI — MLOps Pipeline Template</p>
<p class="proj-meta">Independent · 2025</p>
<p class="proj-desc">Production-ready MLOps template with Hydra + W&B + DVC integration. Covers experiment tracking, model versioning, and CI/CD deployment for research-to-production handoff. <a href="https://github.com/kafkapple">GitHub</a></p>
</div>

---

## 2018 — Hardware × AI

<div class="proj">
<p class="proj-title"><span class="badge badge-1st">Grand Prize (DDSA)</span> NAS-Optimized CNN for Driver Monitoring with XAI</p>
<p class="proj-meta">Hyundai-KIA / ETRI Challenge · 2018</p>
<p class="proj-desc">Neural Architecture Search for real-time driver drowsiness detection on embedded hardware. Integrated Grad-CAM explainability to surface attention regions for regulatory compliance. Won Grand Prize (DDSA) + Encouragement Prize (ETRI).</p>
</div>
