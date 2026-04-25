---
layout: about
title: Jungjoon Park
description: >
  Postdoctoral Fellow at KAIST AMILab. NeuroAI research at the interface of neuroscience and AI.
hide_description: true
permalink: /
---

<style>
.pub { margin: 0.25em 0 1.4em 0; line-height: 1.5; }
.pub-title { font-weight: 600; margin: 0 0 0.2em 0; }
.pub-authors { font-size: 0.95em; margin: 0 0 0.1em 0; }
.pub-venue { font-size: 0.92em; color: #555; margin: 0 0 0.15em 0; }
.pub-links { font-size: 0.9em; margin: 0; }
.pub-footnote { margin-top: 0.3em; color: #777; font-size: 0.85em; }
.proj { margin: 0.25em 0 1em 0; padding: 0.6em 0.8em; border-left: 3px solid #aaa; }
.proj-title { font-weight: 600; margin: 0 0 0.15em 0; }
.proj-meta { font-size: 0.88em; color: #666; margin: 0 0 0.1em 0; }
.proj-desc { font-size: 0.93em; margin: 0; }
</style>

<!--author-->

*I work at the interface of neuroscience and AI — using AI to study neural and behavioral data, and drawing on neuroscience to inform AI systems. Prior work has examined context-dependent perception and cognition in rodent empathy, emotion-aware LLM reasoning, and conditional similarity in vision-language models. At KAIST [AMILab](https://ami.kaist.ac.kr/), I am working on computational methods for animal behavior analysis.*
{:.lead}

[CV](/markdown-cv/){:.button} · [Google Scholar](https://scholar.google.com/citations?user=D_rZCWYAAAAJ){:.button} · [ORCID](https://orcid.org/0000-0002-2944-0697){:.button} · [GitHub](https://github.com/kafkapple){:.button}

## News

- **Mar 2026** — **CLAY** accepted to **CVPR 2026** (first author: Sohwi Lim). Conditional visual similarity modulation in VLM embedding space. [Project page](https://sohwi-lim.github.io/CLAY/)
- **Feb 2026** — Gave lab seminar *The Virtuous Cycle of NeuroAI: Bridging Biological and Artificial Intelligence* at KAIST AMILab.
- **Aug 2025** — Started as **Postdoctoral Fellow** at KAIST AMILab (PI: Prof. Tae-Hyun Oh) under the **InnoCore Postdoctoral Program**. Working on 3D Gaussian Splatting for animal behavior analysis.
- **Jun 2025** — Led workshop *Neuro-AI Convergence — Foundation Model Workflows for Neuroscience* at DBDL, Dept. of BCS, KAIST.
- **Apr 2025** — Preprint released: *Toward Advancing Emotion Recognition in LLMs* (Zenodo, Impact Scholars Program, Neuromatch Academy).

## Research Interests

- **Context-dependent perception and cognition** — how social, temporal, and relational context reshapes perception and decision-making, studied through rodent empathy circuits, LLM emotion reasoning, and vision-language models.
- **Virtuous Cycle of NeuroAI** — applying AI to neural and behavioral data, and drawing on neuroscience to inform AI architectures for adaptive, generalizable intelligence.
- **Computational behavior analysis** — 3D reconstruction and embodied modeling of freely-moving animals to produce quantitative, interpretable behavioral descriptors.

## Selected Publications

<!-- Featured publications: to add/remove from homepage, set `featured: true/false` in _data/publications.yml -->
All current publications shown. [**View full list →**](/publications/)

{% assign featured = site.data.publications | where: "featured", true %}
{% assign featured_years = featured | map: "year" | uniq | sort | reverse %}
{% for year in featured_years %}
### {{ year }}

{% assign year_pubs = featured | where: "year", year %}
{% for pub in year_pubs %}
{% include pub_card.html pub=pub show_thumbnail=true %}
{% endfor %}
{% endfor %}

<p class="pub-footnote"><small>* denotes equal contribution; <strong>bold</strong> denotes the author. <a href="/publications/">View full list →</a></small></p>

## Selected Projects

A selection of engineering and research projects outside publications. [**View all projects →**](/projects/)

### 2025 — AI/ML Engineering

<div class="proj">
<p class="proj-title">Chemical-Process Anomaly Detection — <strong>1st Place</strong> (39 submissions)</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">Unsupervised fault detection on 52-dimensional industrial sensor data. Methods: IsolationForest, SGDOneClassSVM, PCA+K-Means, Transformer Autoencoder. F1 0.9000 / Accuracy 0.9405.</p>
</div>

<div class="proj">
<p class="proj-title">Scientific RAG QA — <strong>3rd Place</strong> (53 submissions)</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">Science knowledge retrieval & QA. Stack: SBERT, BGE-M3, BM25, FAISS, LangChain. mAP 0.8394.</p>
</div>

<div class="proj">
<p class="proj-title">Document-Type Classification — <strong>3rd Place</strong> (48 submissions)</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">17-class document image classification. Stack: Hydra, W&B, Focal Loss. Macro-F1 0.9213.</p>
</div>

### 2023–2024 — Startup & Industry

<div class="proj">
<p class="proj-title">ACTNOVA — AI Behaviour Analytics Platform</p>
<p class="proj-meta">Co-founder & R&D Lead · 2022–2024</p>
<p class="proj-desc">Built YOLOv8 + XGBoost pipeline for automated behavioral phenotyping; reduced analysis time by 70%. Cross-lab collaboration (MIT, KAIST, Broad Institute). Raised ₩4.3B pre-Series A.</p>
</div>

<div class="proj">
<p class="proj-title">Cognitive-Control Circuit Phenotyping — R&D Grant Finalist</p>
<p class="proj-meta">Bio-Medical Technology Development Program (Brain Science Convergence) · 2024</p>
<p class="proj-desc">Advanced phenotyping of cognitive-control circuits in ASD. Designed deep-learning pipeline for behavioral-sequence embedding (autoregressive + hyperbolic space). Short-listed to final presentation round.</p>
</div>

### 2022 — Neuroscience × AI

<div class="proj">
<p class="proj-title">AVATAR: 3D Real-Time Behavioral Analysis System</p>
<p class="proj-meta">KAIST × ACTNOVA · CVPR 2022 Workshop</p>
<p class="proj-desc">AI Vision Analysis for Three-Dimensional Action in Real-Time. Poster presentation at CV4Animals Workshop, CVPR 2022. Deployed for multi-modal clustering of cognitive-control behavioral sequences.</p>
</div>

## Teaching & Mentorship

`Jun 2025` **Workshop Instructor** — *Neuro-AI Convergence: Foundation Model Workflows for Neuroscience*, DBDL, Dept. of BCS, KAIST. 3-hour seminar + hands-on workshop applying foundation models to brain and behavior data.

`Spring 2022` **Instructor** — *Neuroscience 101: What on Earth Is Neuroscience?*, KAIST Global Leadership Center, Humanities/Leadership Program III.

`Dec 2020 – Aug 2022` **Instructor** — *Python for Neuroscientists*, CCS, IBS. Hands-on course covering data handling, analysis, and visualization for neuroscience research.

`Fall 2019 – Fall 2021` **Instructor** — *A Small, Good Thing: Stories of Mind and Life*, KAIST Global Leadership Center, Humanities/Leadership Program III. Discussion-based seminars on cognitive neuroscience, psychology, and self-development.

`Feb 2012 – Oct 2013` **Supervisor** — Tip-of-the-Tongue Phenomenon in Korean-English Bilinguals (high-school mentee: Jiyoon Park). Literature review, experimental design, analysis, and manuscript preparation.

## Experience

`Aug 2025 – Aug 2026` **Postdoctoral Fellow** — [AMILab](https://ami.kaist.ac.kr/), KAIST School of Computing. Host: Prof. Tae-Hyun Oh. Supported by the **InnoCore Postdoctoral Program**. Vision-Language Models (CLAY, CVPR 2026); 3D Gaussian Splatting for freely-moving animal reconstruction (ongoing).

`Oct 2024 – May 2025` **Impact Scholar** — Impact Scholars Program (ISP), Neuromatch Academy. Mentored research on LLM-based emotion recognition.

`Sep 2022 – May 2024` **Chief Operating Officer & Research Director** — ACTNOVA. Co-founded and scaled a neuroscience-AI startup, raising ₩4.3B in pre-Series A.

`Mar 2018 – Aug 2022` **Graduate Researcher** — Brain Dynamics Laboratory, KAIST. NHP behavioral datasets, human fMRI — neural correlates of empathy. Ph.D. completed Aug 2022.

`Nov 2014 – Feb 2018` **Researcher** (Trainee from Jan 2012) — Center for Cognition and Sociality (CCS), Institute for Basic Science (IBS). Chemogenetics, in-vivo electrophysiology, and behavioral assays on affective empathy and social memory.

`Mar 2011 – Dec 2012` **Trainee** — Brain Science Institute (BSI), KIST. Rodent social behavior and system consolidation mechanisms.

`Mar 2006 – Aug 2010` **Undergraduate Researcher** — Brain Dynamics Laboratory, KAIST. Comparative and computational cognitive neuroscience — NHP and human fMRI datasets.

## Awards & Honors

- **2022** Committee Member, Convergence Division, 2022 Science-Belt Research Society Idea Concert (INNOPOLIS).
- **2022** Excellence Prize (Instructor & Course Designer), Neuroscience 101, KAIST.
- **2019** Excellence Prize, Ultimate Question Competition, KAIST.
- **2018** Grand Prize (DDSA) + Encouragement Prize (ETRI), NAS-Optimized CNN for Driver Monitoring with XAI.
- **2012** Grand Prize, Computational Neuroscience Winter School, Korean Society for Computational Neuroscience.
- **2007** Encouragement Prize, Undergraduate Research Program (URP), KAIST.
- **2006** Scholarship, Department of Bio & Brain Engineering, KAIST.

## Academic Service & Community

- **Co-Founder & Organizer**, Neureka & KAIST NeuroAI Communities (2020–Present) — interdisciplinary seminar series featuring speakers including Prof. Peter Dayan.

## Contact

Email: [biasdrive@gmail.com](mailto:biasdrive@gmail.com)
Daejeon, Republic of Korea.
