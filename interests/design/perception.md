---
layout: page
title: Perception Lab
description: >
  Five interactive demos at the intersection of neuroscience and design —
  visual illusions, contrast sensitivity, and temporal perception.
permalink: /interests/design/perception/
redirect_from:
  - /design/perception/
sitemap: true
---

<style>
/* ── Layout ────────────────────────────────────────────────────── */
.demo-nav { display:flex; flex-wrap:wrap; gap:0.5em; margin:1.2em 0 2em; }
.demo-nav button {
  padding:0.4em 0.9em; border:1px solid #ccc; border-radius:20px;
  background:#f5f5f5; cursor:pointer; font-size:0.85em;
  transition:background 0.15s, border-color 0.15s;
}
.demo-nav button.active, .demo-nav button:hover {
  background: rgb(46,85,56); color:#fff; border-color: rgb(46,85,56);
}
.demo-panel { display:none; }
.demo-panel.active { display:block; }
.demo-stage {
  background:#111; border-radius:8px; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
  margin:1em 0; min-height:300px; position:relative;
}
.demo-stage canvas { display:block; max-width:100%; }
.demo-controls { display:flex; flex-wrap:wrap; gap:0.8em 1.5em; margin:0.8em 0; align-items:center; font-size:0.9em; }
.demo-controls label { display:flex; align-items:center; gap:0.5em; }
.demo-controls input[type=range] { width:140px; }
.demo-btn {
  padding:0.35em 1em; background: rgb(46,85,56); color:#fff;
  border:none; border-radius:4px; cursor:pointer; font-size:0.9em;
}
.demo-btn:hover { background: rgb(26,56,40); }
.demo-info { font-size:0.88em; color:#555; line-height:1.6; border-left:3px solid #ddd; padding-left:0.8em; margin:0.8em 0; }
.sdt-result { font-family:monospace; font-size:0.85em; background:#f5f5f5; padding:0.5em 0.8em; border-radius:4px; margin:0.5em 0; }
</style>

Five interactive perceptual demos — each reveals something non-obvious about how the brain constructs visual experience.

<div class="demo-nav" id="demo-nav">
  <button class="active" data-demo="afterimage">① Color Afterimage</button>
  <button data-demo="grating">② Contrast Grating</button>
  <button data-demo="mib">③ Motion Blindness</button>
  <button data-demo="nnet">④ Neural Net</button>
  <button data-demo="tbw">⑤ Temporal Binding</button>
</div>

<!-- ① Color Afterimage ─────────────────────────────────────── -->
<div class="demo-panel active" id="panel-afterimage">
<h3 style="margin-top:0;">① Color Afterimage</h3>
<p class="demo-info">
  Stare at the center dot for 30 seconds without blinking, then click <strong>Switch</strong>. You'll see a cyan ghost where the red circle was — the opponent channel (red/green) fatigues and inverts.
</p>
<div class="demo-stage" id="stage-afterimage" style="background:#fff; min-height:260px;">
  <canvas id="cv-afterimage" width="400" height="260"></canvas>
</div>
<div class="demo-controls">
  <button class="demo-btn" id="btn-afterimage-switch">Switch</button>
  <button class="demo-btn" id="btn-afterimage-reset">Reset</button>
  <span id="afterimage-timer" style="color:#666;">Stare: 0s</span>
</div>
</div>

<!-- ② Contrast Sensitivity Grating ────────────────────────── -->
<div class="demo-panel" id="panel-grating">
<h3 style="margin-top:0;">② Contrast Sensitivity Function</h3>
<p class="demo-info">
  Adjust spatial frequency and contrast. Human sensitivity peaks ~4 cycles/degree and falls at both extremes — the CSF. Fine gratings (high SF) require higher contrast to be visible.
</p>
<div class="demo-stage" style="background:#888;">
  <canvas id="cv-grating" width="500" height="260"></canvas>
</div>
<div class="demo-controls">
  <label>Spatial freq <strong id="sf-val">4</strong> c/°
    <input type="range" id="sf-slider" min="1" max="20" value="4"></label>
  <label>Contrast <strong id="con-val">80</strong>%
    <input type="range" id="con-slider" min="1" max="100" value="80"></label>
</div>
</div>

<!-- ③ Motion-Induced Blindness ─────────────────────────────── -->
<div class="demo-panel" id="panel-mib">
<h3 style="margin-top:0;">③ Motion-Induced Blindness</h3>
<p class="demo-info">
  Fix your gaze on the center cross. The three yellow dots periodically disappear — not because they move, but because the rotating background suppresses them. Awareness ≠ retinal signal.
</p>
<div class="demo-stage">
  <canvas id="cv-mib" width="500" height="300"></canvas>
</div>
<div class="demo-controls">
  <button class="demo-btn" id="btn-mib-toggle">Pause</button>
</div>
</div>

<!-- ④ Simple Neural Net ─────────────────────────────────────── -->
<div class="demo-panel" id="panel-nnet">
<h3 style="margin-top:0;">④ Neural Network — Live Weights</h3>
<p class="demo-info">
  A 2-input → 3-hidden → 1-output network. Click <strong>Train step</strong> to run one backprop pass on the XOR problem. Watch weights update in real time — edge thickness = weight magnitude, color = sign.
</p>
<div class="demo-stage" style="background:#1a1a2e; min-height:320px;">
  <canvas id="cv-nnet" width="500" height="320"></canvas>
</div>
<div class="demo-controls">
  <button class="demo-btn" id="btn-nnet-step">Train step</button>
  <button class="demo-btn" id="btn-nnet-auto">Auto train</button>
  <button class="demo-btn" id="btn-nnet-reset">Reset</button>
  <span id="nnet-loss" style="font-family:monospace;font-size:0.85em;">Loss: —</span>
</div>
</div>

<!-- ⑤ Temporal Binding Window ──────────────────────────────── -->
<div class="demo-panel" id="panel-tbw">
<h3 style="margin-top:0;">⑤ Temporal Binding Window</h3>
<p class="demo-info">
  You'll see a flash and hear (or imagine) a beep with a variable delay. Click <strong>Simultaneous</strong> or <strong>Sequential</strong>. After 10 trials your personal TBW is estimated — the window within which your brain fuses audiovisual events.
</p>
<div class="demo-stage" style="background:#0d0d0d; min-height:240px; flex-direction:column; gap:1em;">
  <div id="tbw-flash" style="width:80px;height:80px;border-radius:50%;background:#333;transition:background 0.05s;"></div>
  <div id="tbw-cue" style="color:#888;font-size:0.9em;letter-spacing:0.05em;">Press Start</div>
</div>
<div class="demo-controls">
  <button class="demo-btn" id="btn-tbw-start">Start</button>
  <button class="demo-btn" id="btn-tbw-sim" disabled>Simultaneous</button>
  <button class="demo-btn" id="btn-tbw-seq" disabled>Sequential</button>
</div>
<div id="tbw-results" class="sdt-result" style="display:none;"></div>
</div>

<!-- Perception Lab JS loaded via /assets/js/perception.js (defer in my-head.html) -->
