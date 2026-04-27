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
.badge { display:inline-block; font-size:0.78em; font-weight:700; padding:0.1em 0.5em; border-radius:3px; margin-right:0.4em; vertical-align:middle; }
.badge-1st { background:#f0c040; color:#5a3a00; }
</style>

<!--author-->

*One question drives my work: How does the mind work — and can those principles build AI that truly generalizes? I'm a NeuroAI researcher and Postdoctoral Fellow at [KAIST AMILab](https://ami.kaist.ac.kr/) (PI: Prof. Tae-Hyun Oh), with a background spanning experimental neuroscience, developmental and social psychology, and computer vision.*
{:.lead}

*My research runs in both directions: using AI to decode neural and behavioral data, and drawing on what we know about biological minds to architect better AI systems. Current focus: multi-modal learning and 3D animal behavior reconstruction. Long-term goal: cognitive architectures grounded in how minds develop and understand others.*
{:.lead}

[CV](/markdown-cv/){:.button} · [Google Scholar](https://scholar.google.com/citations?user=D_rZCWYAAAAJ){:.button} · [ORCID](https://orcid.org/0000-0002-2944-0697){:.button} · [GitHub](https://github.com/kafkapple){:.button}

## News

- **Apr 2026** — **CLAY** accepted to **CVPR 2026** (first author: Sohwi Lim). Conditional visual similarity modulation in VLM embedding space. [Project page](https://sohwi-lim.github.io/CLAY/)
- **Feb 2026** — Gave lab seminar *The Virtuous Cycle of NeuroAI: Bridging Biological and Artificial Intelligence* at KAIST AMILab.
- **Aug 2025** — Started as **Postdoctoral Fellow** at KAIST AMILab (PI: Prof. Tae-Hyun Oh) under the **InnoCore Postdoctoral Program**. Working on 3D Gaussian Splatting for animal behavior analysis.
- **Jun 2025** — Led workshop *Neuro-AI Convergence — Foundation Model Workflows for Neuroscience* at DBDL, Dept. of BCS, KAIST.
- **Apr 2025** — Preprint released: *Toward Advancing Emotion Recognition in LLMs* (Zenodo, Impact Scholars Program, Neuromatch Academy).

## Research Interests

> **NeuroAI** — decoding how biological minds perceive, learn, and understand one another, and using those principles to build AI systems that go beyond narrow tasks, toward intelligence shaped by development, context, and social experience.

- **Context-dependent cognition** — situational, relational, and social context modulates perception and decision-making across species and substrates; from rodent empathy and social hierarchy ([GBB 2022](https://doi.org/10.1111/gbb.12822), [NatComm 2019](https://doi.org/10.1038/s41467-019-09923-8)) to emotion in LLMs and conditional visual similarity in VLMs (CLAY, CVPR 2026).
- **Behavioral AI & 3D reconstruction** — quantitative, reproducible behavioral analysis for freely-moving animals via multi-view geometry and neural scene representations (3D Gaussian Splatting); bridging behavioral neuroscience with computer vision (AVATAR, CVPR CV4Animals 2022).
- **Brain-inspired learning architectures** — translating neuroscience principles (hierarchical representation, continual learning, predictive coding) into testable AI design choices, evaluated against biological benchmarks rather than used merely as inspiration.

## Experience

`Aug 2025 – Aug 2026` **Postdoctoral Fellow** — [AMILab](https://ami.kaist.ac.kr/), KAIST School of Computing.<br>
Host: Prof. Tae-Hyun Oh. Supported by the **InnoCore Postdoctoral Program**. Vision-Language Models (CLAY, CVPR 2026); 3D Gaussian Splatting for freely-moving animal reconstruction (ongoing).

`Oct 2024 – Jun 2025` **AI Engineer** — Upstage AI Lab (AI Lab Boot Camp).<br>
Completed 5 ML engineering competitions; led external company project: LLM-based parenting dialogue quality assessment system (ConnectsLab).

`Oct 2024 – May 2025` **Impact Scholar** — Impact Scholars Program (ISP), Neuromatch Academy.<br>
Mentored research on LLM-based emotion recognition.

`Sep 2022 – May 2024` **Co-Founder, COO & Research Director** — ACTNOVA.<br>
Co-founded and scaled a neuroscience-AI startup (₩4.3B pre-Series A). Built YOLOv8 + XGBoost pipeline for automated behavioral phenotyping (−70% analysis time); cross-lab collaboration with MIT, KAIST, and Broad Institute. Core project: [AVATAR](https://www.cv4animals.com/2022-accepted-papers) — 3D real-time behavioral analysis system (CV4Animals @ CVPR 2022).

`Mar 2018 – Aug 2022` **Graduate Researcher** — Brain Dynamics Laboratory, KAIST.<br>
Rodent behavioral genetics and empathy neuroscience. Ph.D. completed Aug 2022.

`Nov 2014 – Feb 2018` **Researcher** (Trainee from Jan 2012) — Center for Cognition and Sociality (CCS), Institute for Basic Science (IBS).<br>
Chemogenetics, in-vivo electrophysiology, and behavioral assays on affective empathy and social memory.

`Mar 2011 – Dec 2012` **Trainee** — Brain Science Institute (BSI), KIST.<br>
Rodent social behavior and system consolidation mechanisms.

`Mar 2006 – Aug 2010` **Undergraduate Researcher** — Brain Dynamics Laboratory, KAIST.<br>
URP project: behavioral data analysis in non-human primates. Graduation research: human fMRI study, cognitive neuroscience.

## Publications

{% assign featured = site.data.publications %}
{% assign featured_years = featured | map: "year" | uniq | sort | reverse %}
{% for year in featured_years %}
### {{ year }}

{% assign year_pubs = featured | where: "year", year %}
{% for pub in year_pubs %}
{% include pub_card.html pub=pub show_thumbnail=true %}
{% endfor %}
{% endfor %}

<p class="pub-footnote"><small>* denotes equal contribution; <strong>bold</strong> denotes the author. <a href="https://scholar.google.com/citations?user=D_rZCWYAAAAJ">Google Scholar</a></small></p>

## Selected Projects

A selection of engineering and research projects outside publications. [**View all →**](/projects/)

### 2025 — Applied AI

<div class="proj">
<p class="proj-title">Upstage AI Lab — AI/ML Engineering</p>
<p class="proj-meta">Upstage AI Lab · 2024–2025</p>
<p class="proj-desc">5 ML engineering competitions (Anomaly Detection, RAG QA, Document Classification, Sentiment Analysis, Tabular Prediction) + external company project: LLM-based parent-child dialogue quality assessment and parenting plan recommendation system for ConnectsLab (multi-step pipeline: persona generation → dialogue scoring → plan recommendation).</p>
<p class="proj-desc" style="margin-top:0.3em;font-size:0.88em;color:#777;">Stack: PyTorch · HuggingFace · LangChain · LightGBM · XGBoost · Hydra · W&amp;B · OpenAI · Anthropic · Gemini · Ollama · FAISS</p>
</div>

<div class="proj">
<p class="proj-title">LLM-Based Parenting Coach — Dialogue Quality Assessment &amp; Plan Recommendation</p>
<p class="proj-meta">Upstage AI Lab × ConnectsLab · Spring 2025</p>
<p class="proj-desc">Built a multi-step LLM pipeline for parent-child dialogue analysis and personalized parenting plan recommendation. Pipeline: survey-based family persona generation → dialogue simulation → 4-dimensional quality scoring (emotional relationship, active listening, communication clarity, conflict resolution) → personalized plan recommendation via ensemble of dialogue- and survey-based signals. Multi-LLM backend (GPT-4o, Claude, Gemini, Llama) with Levenshtein key correction and retry mechanisms.</p>
<p class="proj-desc" style="margin-top:0.3em;font-size:0.88em;color:#777;">Stack: LangChain · Hydra · W&amp;B · OpenAI · Anthropic · Google AI · Ollama</p>
</div>

### 2021 — Neuroscience × Art

<div class="proj">
<p class="proj-title">Project Doona Bae</p>
<p class="proj-meta">Neuroscience · Book chapter · 2021</p>
<p class="proj-desc">Behavioral and fMRI study of actress Doona Bae's empathic abilities, published as a chapter in the companion book <em>Actress Doona Bae</em>. Examined neural correlates of screen performance and empathic resonance using quantitative imaging methods.</p>
</div>

### 2019 — Performance

<div class="proj">
<p class="proj-title">Crowd Walk</p>
<p class="proj-meta">Performance · BCI · Ilmin Museum · 2019</p>
<p class="proj-desc">Performed with artist Lang Lee at Ilmin Museum of Art, Seoul. Real-time emotion recognition from facial expression and EEG drove a crowd-movement performance piece — the audience's collective affective state became a choreographic parameter.</p>
</div>

### 2018 — Hardware × AI

<div class="proj">
<p class="proj-title"><span class="badge badge-1st">Grand Prize (DDSA)</span> NAS-Optimized CNN for Driver Monitoring with XAI</p>
<p class="proj-meta">Hyundai-KIA / ETRI Challenge · 2018</p>
<p class="proj-desc">Neural Architecture Search for real-time driver drowsiness detection on embedded hardware. Integrated Grad-CAM explainability for regulatory compliance. Won Grand Prize (DDSA) + Encouragement Prize (ETRI).</p>
</div>

## Teaching & Mentorship

`Nov 2025 – Feb 2026` **Research Mentor** — Seongyoon Park, KAIST AMILab (Individual Research Program).<br>
Co-mentor: Dr. Chenshuang Zhang. *Do Models See Like Humans? Landmark Identity under Perturbations in Foundation Models* — Triplet-based 2AFC comparing human vs. foundation-model (OpenCLIP, DINO, SigLIP) identity judgments on landmark images under controlled perturbations (color, background, weather). Three experiments: (1) human-model preference alignment (Kendall's τ), (2) which perturbation type dominates model decisions, (3) quantitative influence of background via center-crop ratio sweep. Key finding: DINO most robust; background dominates; OpenCLIP aligns with humans on color, DINO on background.

`Jun 2025` **Workshop Instructor** — *Neuro-AI Convergence: Foundation Model Workflows for Neuroscience*, DBDL, Dept. of BCS, KAIST.<br>
3-hour seminar + hands-on workshop applying foundation models to brain and behavior data.

`Spring 2022` **Instructor** — *Neuroscience 101: What on Earth Is Neuroscience?*, KAIST Global Leadership Center, Humanities/Leadership Program III.

`Dec 2020 – Aug 2022` **Instructor** — *Python for Neuroscientists*, CCS, IBS.<br>
Hands-on course covering data handling, analysis, and visualization for neuroscience research.

`Fall 2019 – Fall 2021` **Instructor** — *A Small, Good Thing: Stories of Mind and Life*, KAIST Global Leadership Center, Humanities/Leadership Program III.<br>
Discussion-based seminars on cognitive neuroscience, psychology, and self-development.

`Feb 2012 – Oct 2013` **Supervisor** — Tip-of-the-Tongue Phenomenon in Korean-English Bilinguals (high-school mentee: Jiyoon Park).<br>
Literature review, experimental design, analysis, and manuscript preparation.

## Awards & Honors

- **2022** Committee Member, Convergence Division, 2022 Science-Belt Research Society Idea Concert (INNOPOLIS).
- **2022** Excellence Prize (Instructor & Course Designer), Neuroscience 101, KAIST.
- **2019** Excellence Prize, Ultimate Question Competition, KAIST.
- **2018** Grand Prize (DDSA) + Encouragement Prize (ETRI), NAS-Optimized CNN for Driver Monitoring with XAI.
- **2012** Grand Prize, Computational Neuroscience Winter School, Korean Society for Computational Neuroscience.
- **2007** Encouragement Prize, Undergraduate Research Program (URP), KAIST.
- **2006** Scholarship, Department of Bio & Brain Engineering, KAIST.

## Academic Service & Community

- **Co-Founder & Organizer**, [KAIST NeuroAI Seminar Series](https://kaistneuroaimedia.wixsite.com/mysite) (Oct 2020–Present) — interdisciplinary neuroscience × AI seminar series. Featured speakers include Prof. Peter Dayan (MPI Tübingen).
- **Co-Founder**, Neureka (Jan 2023–Present) — interdisciplinary community for AI-enabled behavioral neuroscience research; founded jointly with colleagues from multiple KAIST labs.

## Contact

Email: [biasdrive@gmail.com](mailto:biasdrive@gmail.com)
Daejeon, Republic of Korea.
