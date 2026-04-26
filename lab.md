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

---

<div class="interest-item">
<p class="interest-title">Pixel Art Canvas <span class="interest-tag">draw</span></p>
<canvas id="pixel-canvas" class="lab-canvas" width="640" height="200" style="background:#1a1e22;"></canvas>
<p class="interest-desc">Click/drag to paint pixels. Scroll over canvas to change brush color.</p>
</div>

<div class="interest-item">
<p class="interest-title">Flow Field <span class="interest-tag">generative</span></p>
<canvas id="flow-canvas" class="lab-canvas" width="640" height="200" style="background:#0d1510;"></canvas>
<p class="interest-desc">Perlin-noise vector field with particle trails. Click to respawn particles.</p>
</div>

<div class="interest-item">
<p class="interest-title">Cursor Blob <span class="interest-tag">interaction</span></p>
<canvas id="blob-canvas" class="lab-canvas" width="640" height="200" style="background:#0d0d1a;"></canvas>
<p class="interest-desc">Move mouse over canvas. Metaball fluid simulation attracted to cursor.</p>
</div>

<div class="interest-item">
<p class="interest-title">Glitch Text <span class="interest-tag">typography</span></p>
<div id="glitch-box" style="height:140px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:4px;overflow:hidden;cursor:pointer;margin:0.6em 0 0.3em;">
<div id="glitch-text" style="font-family:monospace;font-size:2.4em;color:#fff;font-weight:700;position:relative;user-select:none;">NEURAL</div>
</div>
<p class="interest-desc">Click to trigger glitch and cycle words. Hover for continuous distortion.</p>
</div>

<div class="interest-item">
<p class="interest-title">CRT Scanlines <span class="interest-tag">retro</span></p>
<canvas id="crt-canvas" class="lab-canvas" width="640" height="200" style="background:#0a1a0a;"></canvas>
<p class="interest-desc">Animated CRT phosphor simulation with scanline overlay and typewriter text.</p>
</div>

<div class="interest-item">
<p class="interest-title">Color Cycle <span class="interest-tag">generative</span></p>
<canvas id="lava-canvas" class="lab-canvas" width="640" height="200" style="background:#10101a;"></canvas>
<p class="interest-desc">Metaball blobs with HSL cycle. Click to add a new blob.</p>
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
