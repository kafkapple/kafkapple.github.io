---
layout: page
title: Lab
description: >
  Experimental interactive media — generative art, creative coding, and visual experiments.
permalink: /lab/
sitemap: true
redirect_from:
  - /interests/lab/
---

<style>
.interest-item { margin: 0 0 1.6em 0; padding: 0.7em 1em 1em; border-left: 3px solid #ccd5db; line-height: 1.55; }
.interest-item:hover { border-color: rgb(46,85,56); }
.interest-title { font-weight: 600; margin: 0 0 0.3em 0; font-size: 1.0em; }
.interest-desc { font-size: 0.88em; color: #666; margin: 0.4em 0 0; }
.interest-tag { display: inline-block; font-size: 0.72em; padding: 0.08em 0.4em; border-radius: 2px; background: #e8eef6; color: #2a4a6a; margin-right: 0.3em; }
.lab-canvas { display: block; width: 100%; cursor: crosshair; margin: 0.6em 0 0.3em; border-radius: 4px; background: #161c20; }
</style>

Experiments in creative coding, generative systems, and browser-native interaction. Click or hover on each to interact.

**Demos** — [Pixel Art](#pixel-art-canvas) · [Flow Field](#flow-field) · [Cursor Blob](#cursor-blob) · [Glitch Text](#glitch-text) · [CRT Scanlines](#crt-scanlines) · [Color Cycle](#color-cycle) · [Grid Ripple](#grid-dot-spring-ripple) · [Matrix Rain](#matrix-rain) · [Particle Text](#particle-text) · [Game of Life](#game-of-life) · [Neural Spike](#neural-spike-propagation) · [Reaction-Diffusion](#reaction-diffusion-gray-scott)

---

<div class="interest-item" id="pixel-art-canvas">
<p class="interest-title">Pixel Art Canvas <span class="interest-tag">draw</span></p>
<canvas id="pixel-canvas" class="lab-canvas" width="640" height="200" style="background:#1a1e22;"></canvas>
<p class="interest-desc">Click/drag to paint pixels. Scroll over canvas to change brush color.</p>
</div>

<div class="interest-item" id="flow-field">
<p class="interest-title">Flow Field <span class="interest-tag">generative</span></p>
<canvas id="flow-canvas" class="lab-canvas" width="640" height="200" style="background:#0d1510;"></canvas>
<p class="interest-desc">Perlin-noise vector field with particle trails. Click to respawn particles.</p>
</div>

<div class="interest-item" id="cursor-blob">
<p class="interest-title">Cursor Blob <span class="interest-tag">interaction</span></p>
<canvas id="blob-canvas" class="lab-canvas" width="640" height="200" style="background:#0d0d1a;"></canvas>
<p class="interest-desc">Move mouse over canvas. Metaball fluid simulation attracted to cursor.</p>
</div>

<div class="interest-item" id="glitch-text">
<p class="interest-title">Glitch Text <span class="interest-tag">typography</span></p>
<div id="glitch-box" style="height:140px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:4px;overflow:hidden;cursor:pointer;margin:0.6em 0 0.3em;">
<div id="glitch-text" style="font-family:monospace;font-size:2.4em;color:#fff;font-weight:700;position:relative;user-select:none;">NEURAL</div>
</div>
<p class="interest-desc">Click to trigger glitch and cycle words. Hover for continuous distortion.</p>
</div>

<div class="interest-item" id="crt-scanlines">
<p class="interest-title">CRT Scanlines <span class="interest-tag">retro</span></p>
<canvas id="crt-canvas" class="lab-canvas" width="640" height="200" style="background:#0a1a0a;"></canvas>
<p class="interest-desc">Animated CRT phosphor simulation with scanline overlay and typewriter text.</p>
</div>

<div class="interest-item" id="color-cycle">
<p class="interest-title">Color Cycle <span class="interest-tag">generative</span></p>
<canvas id="lava-canvas" class="lab-canvas" width="640" height="200" style="background:#10101a;"></canvas>
<p class="interest-desc">Metaball blobs with HSL cycle. Click to add a new blob.</p>
</div>

<div class="interest-item" id="grid-dot-spring-ripple">
<p class="interest-title">Grid Dot Spring Ripple <span class="interest-tag">physics</span><span class="interest-tag">interaction</span></p>
<canvas id="grid-ripple-canvas" class="lab-canvas" style="background:#0d1510;"></canvas>
<p class="interest-desc">N×M dot grid with spring physics. Mouse repels dots; click to send a ripple propagating outward.</p>
</div>

<div class="interest-item" id="matrix-rain">
<p class="interest-title">Matrix Rain <span class="interest-tag">generative</span><span class="interest-tag">NeuroAI</span></p>
<canvas id="matrix-rain-canvas" class="lab-canvas" style="background:#0a100c;"></canvas>
<p class="interest-desc">Column-based character rain using Greek letters, math symbols, and nucleotide codes. Research terms (STDP, LTP, ReLU, axon) surface in white.</p>
</div>

<div class="interest-item" id="particle-text">
<p class="interest-title">Particle Text <span class="interest-tag">particles</span><span class="interest-tag">typography</span></p>
<canvas id="particle-text-canvas" class="lab-canvas" style="background:#0d1510;"></canvas>
<p class="interest-desc">Particles spring toward letter forms sampled from canvas text. Mouse repels; click or wait to cycle words — NeuroAI → Plasticity → Emergence → Spike.</p>
</div>

<div class="interest-item" id="game-of-life">
<p class="interest-title">Game of Life <span class="interest-tag">cellular automaton</span></p>
<canvas id="gol-canvas" class="lab-canvas" style="background:#0a0f0c;cursor:crosshair;"></canvas>
<div style="margin:0.3em 0 0.5em;display:flex;gap:0.5em;flex-wrap:wrap;">
  <button id="gol-btn-gun" style="font-size:0.8em;padding:0.2em 0.7em;background:rgba(46,85,56,0.7);color:#d4ddd6;border:1px solid rgba(100,160,110,0.4);border-radius:3px;cursor:pointer;">Gosper Gun</button>
  <button id="gol-btn-pulsar" style="font-size:0.8em;padding:0.2em 0.7em;background:rgba(46,85,56,0.7);color:#d4ddd6;border:1px solid rgba(100,160,110,0.4);border-radius:3px;cursor:pointer;">Pulsar</button>
  <button id="gol-btn-random" style="font-size:0.8em;padding:0.2em 0.7em;background:rgba(46,85,56,0.7);color:#d4ddd6;border:1px solid rgba(100,160,110,0.4);border-radius:3px;cursor:pointer;">Random</button>
</div>
<p class="interest-desc">Conway's Game of Life with age-coded color (bright → teal → grey). Draw cells with mouse; load preset patterns above.</p>
</div>

<div class="interest-item" id="neural-spike-propagation">
<p class="interest-title">Neural Spike Propagation <span class="interest-tag">LIF model</span><span class="interest-tag">NeuroAI</span></p>
<canvas id="neural-spike-canvas" class="lab-canvas" style="background:#080e0a;"></canvas>
<p class="interest-desc">Leaky Integrate-and-Fire neurons on a small-world graph. Color encodes membrane potential (cool → hot). Click a node to inject current; watch action potentials propagate.</p>
</div>

<div class="interest-item" id="reaction-diffusion-gray-scott">
<p class="interest-title">Reaction-Diffusion (Gray-Scott) <span class="interest-tag">emergent patterns</span></p>
<canvas id="rd-canvas" class="lab-canvas" style="background:#0a3c28;"></canvas>
<div style="margin:0.3em 0 0.5em;display:flex;gap:0.5em;flex-wrap:wrap;">
  <button id="rd-btn-0" style="font-size:0.8em;padding:0.2em 0.7em;background:rgba(46,85,56,0.7);color:#d4ddd6;border:1px solid rgba(100,160,110,0.4);border-radius:3px;cursor:pointer;">Spots</button>
  <button id="rd-btn-1" style="font-size:0.8em;padding:0.2em 0.7em;background:rgba(46,85,56,0.7);color:#d4ddd6;border:1px solid rgba(100,160,110,0.4);border-radius:3px;cursor:pointer;">Labyrinths</button>
  <button id="rd-btn-2" style="font-size:0.8em;padding:0.2em 0.7em;background:rgba(46,85,56,0.7);color:#d4ddd6;border:1px solid rgba(100,160,110,0.4);border-radius:3px;cursor:pointer;">Stripes</button>
</div>
<p class="interest-desc">Gray-Scott reaction-diffusion system. Self-organizing Turing patterns emerge from two virtual chemicals. Click preset to reset; drag mouse to deposit chemical V.</p>
</div>

---

## Site Experiments

<div class="interest-item">
<p class="interest-title">Next.js Blog Template <span class="interest-tag">Next.js</span><span class="interest-tag">test build</span></p>
<p class="interest-desc">Static-export Next.js blog deployed via GitHub Actions. Evaluating Next.js + MDX as an alternative to the current Jekyll/Hydejack stack.<br>→ <a href="https://kafkapple.github.io/nextjs-blog/" target="_blank" rel="noopener">View live</a> · <a href="https://github.com/kafkapple/nextjs-blog" target="_blank" rel="noopener">Source</a></p>
</div>

---

*Source: vanilla Canvas API, no dependencies. Design references: [Design →](/interests/design/)*

<!-- canvas JS loaded via /assets/js/lab-canvas.js (defer in my-head.html) -->
