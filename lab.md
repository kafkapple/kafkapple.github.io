---
layout: page
title: Lab
description: >
  Interactive experiments — generative art, physics simulations, creative coding. All vanilla canvas, zero dependencies.
permalink: /lab/
sitemap: true
redirect_from:
  - /interests/lab/
---

<style>
/* ── Base card ── */
.interest-item { margin: 0 0 1.6em 0; padding: 0.7em 1em 1em; border-left: 3px solid #ccd5db; line-height: 1.55; }
.interest-item:hover { border-color: rgb(46,85,56); }
.interest-title { font-weight: 600; margin: 0 0 0.3em 0; font-size: 1.0em; }
.interest-desc { font-size: 0.88em; color: #666; margin: 0.4em 0 0; }
.interest-tag { display: inline-block; font-size: 0.72em; padding: 0.08em 0.4em; border-radius: 2px; background: #e8eef6; color: #2a4a6a; margin-right: 0.3em; }

/* ── Canvas ── */
.lab-canvas { display: block; width: 100%; cursor: crosshair; border-radius: 4px; background: #161c20; }

/* ── Section header ── */
.lab-section { margin: 2em 0 0.4em; padding-bottom: 0.35em; border-bottom: 1px solid rgba(46,85,56,0.2); }
.lab-section h2 { font-size: 0.95em; font-weight: 700; color: rgb(46,85,56); letter-spacing: 0.06em; text-transform: uppercase; margin: 0; }

/* ── Demo row: canvas + side panel ── */
.lab-demo-row { display: flex; gap: 0.75em; align-items: flex-start; margin: 0.6em 0 0.3em; }
.lab-demo-row .lab-canvas { flex: 1; min-width: 0; }
.lab-ctrl-panel {
  width: 156px; flex-shrink: 0;
  display: flex; flex-direction: column; gap: 0.7em;
  padding: 0.7em 0.85em;
  background: rgba(20,30,22,0.9);
  border-radius: 5px;
  border: 1px solid rgba(46,85,56,0.22);
}
@media (max-width: 580px) {
  .lab-demo-row { flex-direction: column; }
  .lab-ctrl-panel { width: 100%; }
}

/* ── Controls inside panel ── */
.lab-ctrl-group { display: flex; flex-direction: column; gap: 0.28em; }
.lab-label {
  font-size: 0.68em; font-weight: 700; letter-spacing: 0.07em;
  text-transform: uppercase; color: rgba(110,190,135,0.7);
}
.lab-text-input {
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(46,85,56,0.28);
  border-radius: 4px;
  padding: 0.32em 0.5em;
  color: #8dcc9d;
  font-family: monospace; font-size: 0.8em;
  width: 100%; box-sizing: border-box;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  caret-color: #4aee88;
}
.lab-text-input:focus {
  border-color: rgba(46,85,56,0.65);
  box-shadow: 0 0 0 2px rgba(46,85,56,0.12);
}
.lab-text-input::placeholder { color: rgba(100,160,110,0.4); }

/* ── Buttons ── */
.lab-btn-row { display: flex; gap: 0.3em; flex-wrap: wrap; }
.lab-btn {
  font-size: 0.74em; padding: 0.22em 0.6em;
  background: rgba(46,85,56,0.12);
  color: rgb(100,170,120);
  border: 1px solid rgba(46,85,56,0.22);
  border-radius: 3px; cursor: pointer;
  font-family: monospace;
  transition: background 150ms ease, border-color 150ms ease, color 150ms ease;
  user-select: none;
}
.lab-btn:hover { background: rgba(46,85,56,0.28); border-color: rgba(46,85,56,0.5); color: #b0dcb8; }
.lab-btn.active { background: rgba(46,85,56,0.55); border-color: rgba(46,85,56,0.7); color: #d4edda; }

/* ── Inline button row (below canvas) ── */
.lab-inline-btns { margin: 0.35em 0 0.5em; display: flex; gap: 0.4em; flex-wrap: wrap; align-items: center; }
.lab-inline-btns .lab-btn { font-size: 0.8em; padding: 0.22em 0.75em; }

/* ── Sliders ── */
.lab-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px;
  background: rgba(46,85,56,0.25); border-radius: 2px;
  outline: none; cursor: pointer; margin: 0;
}
.lab-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px; border-radius: 50%;
  background: rgb(70,150,90); border: 2px solid rgba(46,85,56,0.5); cursor: pointer;
}
.lab-slider::-moz-range-thumb {
  width: 14px; height: 14px; border-radius: 50%;
  background: rgb(70,150,90); border: 2px solid rgba(46,85,56,0.5); cursor: pointer;
  border: none;
}
.lab-val { font-size: 0.72em; color: rgba(130,210,155,0.9); font-family: monospace; }
.lab-inline-slider { display: flex; align-items: center; gap: 0.5em; }
.lab-inline-slider .lab-slider { width: 90px; flex-shrink: 0; }
.lab-inline-slider .lab-label { white-space: nowrap; }
</style>

Experiments in creative coding, generative systems, and browser-native interaction.

**Jump to:** [Retro & Type](#crt-scanlines) · [Drawing](#pixel-art-canvas) · [Physics](#flow-field) · [Generative](#matrix-rain) · [Neural](#game-of-life)

---

<div class="lab-section"><h2>Retro &amp; Typography</h2></div>

<div class="interest-item" id="crt-scanlines">
<p class="interest-title">CRT Scanlines <span class="interest-tag">retro</span><span class="interest-tag">text</span></p>
<div class="lab-demo-row">
  <canvas id="crt-canvas" class="lab-canvas" width="640" height="200" style="background:#0a1a0a;"></canvas>
  <div class="lab-ctrl-panel">
    <div class="lab-ctrl-group">
      <span class="lab-label">Display text</span>
      <input type="text" id="crt-input" class="lab-text-input" placeholder="Type here…" maxlength="60" autocomplete="off" spellcheck="false">
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Palette</span>
      <div class="lab-btn-row">
        <button class="lab-btn active" data-crt="phosphor">Phosphor</button>
        <button class="lab-btn" data-crt="amber">Amber</button>
      </div>
    </div>
  </div>
</div>
<p class="interest-desc">Phosphor CRT simulation with scanline overlay. Type text to display it; click <em>Amber</em> to switch palette.</p>
</div>

<div class="interest-item" id="glitch-text-card">
<p class="interest-title">Glitch Text <span class="interest-tag">typography</span></p>
<div id="glitch-box" style="height:140px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-radius:4px;overflow:hidden;cursor:pointer;margin:0.6em 0 0.3em;">
<div id="glitch-text" style="font-family:monospace;font-size:2.4em;color:#fff;font-weight:700;position:relative;user-select:none;">NEURAL</div>
</div>
<p class="interest-desc">Click to trigger glitch and cycle words. Hover for continuous distortion.</p>
</div>

---

<div class="lab-section"><h2>Drawing &amp; Color</h2></div>

<div class="interest-item" id="pixel-art-canvas">
<p class="interest-title">Pixel Art Canvas <span class="interest-tag">draw</span></p>
<div class="lab-demo-row">
  <canvas id="pixel-canvas" class="lab-canvas" width="640" height="200" style="background:#1a1e22;"></canvas>
  <div class="lab-ctrl-panel">
    <div class="lab-ctrl-group">
      <span class="lab-label">Stamp text</span>
      <input type="text" id="pixel-input" class="lab-text-input" placeholder="Type to stamp…" maxlength="12" autocomplete="off" spellcheck="false">
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Color</span>
      <div class="lab-btn-row" id="pixel-palette-btns">
        <button class="lab-btn active" data-pidx="0" style="border-color:#4aee88;">#1</button>
        <button class="lab-btn" data-pidx="1" style="border-color:#2e9955;">#2</button>
        <button class="lab-btn" data-pidx="2" style="border-color:#3a88c0;">#3</button>
        <button class="lab-btn" data-pidx="3" style="border-color:#9a6adc;">#4</button>
        <button class="lab-btn" data-pidx="4" style="border-color:#ee6060;">#5</button>
      </div>
    </div>
    <div class="lab-ctrl-group">
      <button class="lab-btn" id="pixel-clear-btn" style="width:100%;text-align:center;">Clear</button>
    </div>
  </div>
</div>
<p class="interest-desc">Click/drag to paint pixels. Pick a color above or scroll on canvas to cycle. Type and press Enter to stamp text.</p>
</div>

<div class="interest-item" id="color-cycle">
<p class="interest-title">Color Cycle <span class="interest-tag">generative</span></p>
<canvas id="lava-canvas" class="lab-canvas" width="640" height="200" style="background:#10101a;margin:0.6em 0 0.3em;"></canvas>
<p class="interest-desc">Metaball blobs with HSL cycle. Click to add a new blob.</p>
</div>

---

<div class="lab-section"><h2>Physics &amp; Motion</h2></div>

<div class="interest-item" id="flow-field">
<p class="interest-title">Flow Field <span class="interest-tag">generative</span></p>
<canvas id="flow-canvas" class="lab-canvas" width="640" height="200" style="background:#0d1510;margin:0.6em 0 0.3em;"></canvas>
<p class="interest-desc">Perlin-noise vector field with particle trails. Click to respawn particles.</p>
</div>

<div class="interest-item" id="cursor-blob">
<p class="interest-title">Cursor Blob <span class="interest-tag">interaction</span></p>
<canvas id="blob-canvas" class="lab-canvas" width="640" height="200" style="background:#0d0d1a;margin:0.6em 0 0.3em;"></canvas>
<p class="interest-desc">Move mouse over canvas. Metaball fluid simulation attracted to cursor.</p>
</div>

<div class="interest-item" id="grid-dot-spring-ripple">
<p class="interest-title">Grid Dot Spring Ripple <span class="interest-tag">physics</span><span class="interest-tag">interaction</span></p>
<div class="lab-demo-row">
  <canvas id="grid-ripple-canvas" class="lab-canvas" width="640" height="240" style="background:#0d1510;"></canvas>
  <div class="lab-ctrl-panel">
    <div class="lab-ctrl-group">
      <span class="lab-label">Spring <span class="lab-val" id="ripple-spring-val">0.12</span></span>
      <input type="range" id="ripple-spring" class="lab-slider" min="0.02" max="0.35" step="0.01" value="0.12">
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Repel radius <span class="lab-val" id="ripple-repel-val">60</span></span>
      <input type="range" id="ripple-repel" class="lab-slider" min="10" max="150" step="5" value="60">
    </div>
  </div>
</div>
<p class="interest-desc">N×M dot grid with spring physics. Mouse repels dots; click to send a ripple propagating outward. Adjust spring stiffness and repel radius above.</p>
</div>

---

<div class="lab-section"><h2>Generative Text</h2></div>

<div class="interest-item" id="matrix-rain">
<p class="interest-title">Matrix Rain <span class="interest-tag">generative</span><span class="interest-tag">NeuroAI</span></p>
<div class="lab-demo-row">
  <canvas id="matrix-rain-canvas" class="lab-canvas" width="640" height="240" style="background:#0a100c;"></canvas>
  <div class="lab-ctrl-panel">
    <div class="lab-ctrl-group">
      <span class="lab-label">Inject word</span>
      <input type="text" id="matrix-word-input" class="lab-text-input" placeholder="Type + Enter…" maxlength="14" autocomplete="off" spellcheck="false">
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Speed <span class="lab-val" id="matrix-speed-val">1.0x</span></span>
      <input type="range" id="matrix-speed" class="lab-slider" min="0.5" max="3" step="0.5" value="1">
    </div>
  </div>
</div>
<p class="interest-desc">Column-based character rain — Greek letters, math symbols, nucleotide codes. Research terms surface in white. Type a word and press Enter to burst it across the rain.</p>
</div>

<div class="interest-item" id="particle-text">
<p class="interest-title">Particle Text <span class="interest-tag">particles</span><span class="interest-tag">typography</span></p>
<div class="lab-demo-row">
  <canvas id="particle-text-canvas" class="lab-canvas" width="640" height="240" style="background:#0d1510;"></canvas>
  <div class="lab-ctrl-panel">
    <div class="lab-ctrl-group">
      <span class="lab-label">Your word</span>
      <input type="text" id="particle-text-input" class="lab-text-input" placeholder="Type a word…" maxlength="16" autocomplete="off" spellcheck="false">
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Speed <span class="lab-val" id="particle-speed-val">1.0x</span></span>
      <input type="range" id="particle-speed" class="lab-slider" min="0.5" max="3" step="0.5" value="1">
    </div>
  </div>
</div>
<p class="interest-desc">Particles spring toward letter forms sampled from canvas text. Type any word above to form it in real-time. Mouse repels; click canvas to cycle presets.</p>
</div>

---

<div class="lab-section"><h2>Cellular &amp; Neural</h2></div>

<div class="interest-item" id="game-of-life">
<p class="interest-title">Game of Life <span class="interest-tag">cellular automaton</span></p>
<canvas id="gol-canvas" class="lab-canvas" width="640" height="240" style="background:#0a0f0c;cursor:crosshair;margin:0.6em 0 0;"></canvas>
<div class="lab-inline-btns">
  <button id="gol-btn-gun" class="lab-btn">Gosper Gun</button>
  <button id="gol-btn-pulsar" class="lab-btn">Pulsar</button>
  <button id="gol-btn-random" class="lab-btn">Random</button>
  <span class="lab-inline-slider">
    <span class="lab-label" style="font-size:0.72em;">Speed</span>
    <input type="range" id="gol-speed" class="lab-slider" min="0.5" max="4" step="0.5" value="1">
    <span class="lab-val" id="gol-speed-val">1.0x</span>
  </span>
</div>
<p class="interest-desc">Conway's Game of Life with age-coded color (bright → teal → grey). Draw cells with mouse; load preset patterns above. Drag Speed to accelerate.</p>
</div>

<div class="interest-item" id="neural-spike-propagation">
<p class="interest-title">Neural Spike Propagation <span class="interest-tag">LIF model</span><span class="interest-tag">NeuroAI</span></p>
<canvas id="neural-spike-canvas" class="lab-canvas" width="640" height="240" style="background:#080e0a;margin:0.6em 0 0.3em;"></canvas>
<div class="lab-inline-btns">
  <span class="lab-inline-slider">
    <span class="lab-label" style="font-size:0.72em;">Noise</span>
    <input type="range" id="neural-noise" class="lab-slider" min="0.005" max="0.12" step="0.005" value="0.03">
    <span class="lab-val" id="neural-noise-val">0.03</span>
  </span>
</div>
<p class="interest-desc">Leaky Integrate-and-Fire neurons on a small-world graph. Color encodes membrane potential (cool → hot). Click a node to inject current; drag Noise to tune spontaneous activity.</p>
</div>

<div class="interest-item" id="reaction-diffusion-gray-scott">
<p class="interest-title">Reaction-Diffusion (Gray-Scott) <span class="interest-tag">emergent patterns</span></p>
<canvas id="rd-canvas" class="lab-canvas" width="640" height="240" style="background:#0a3c28;margin:0.6em 0 0;"></canvas>
<div class="lab-inline-btns">
  <button id="rd-btn-0" class="lab-btn active">Spots</button>
  <button id="rd-btn-1" class="lab-btn">Labyrinths</button>
  <button id="rd-btn-2" class="lab-btn">Stripes</button>
  <span class="lab-inline-slider">
    <span class="lab-label" style="font-size:0.72em;">Steps/frame</span>
    <input type="range" id="rd-steps" class="lab-slider" min="1" max="20" step="1" value="8">
    <span class="lab-val" id="rd-steps-val">8</span>
  </span>
</div>
<p class="interest-desc">Gray-Scott reaction-diffusion system. Self-organizing Turing patterns emerge from two virtual chemicals. Click preset to reset; drag mouse to deposit chemical V; drag Steps to speed up evolution.</p>
</div>

---

## Site Experiments

<div class="interest-item">
<p class="interest-title">Next.js Blog Template <span class="interest-tag">Next.js</span><span class="interest-tag">test build</span></p>
<p class="interest-desc">Static-export Next.js blog deployed via GitHub Actions. Evaluating Next.js + MDX as an alternative to the current Jekyll/Hydejack stack.<br>→ <a href="https://kafkapple.github.io/nextjs-blog/" target="_blank" rel="noopener">View live</a> · <a href="https://github.com/kafkapple/nextjs-blog" target="_blank" rel="noopener">Source</a></p>
</div>

---

*Source: vanilla Canvas API, no dependencies. Design: [Design Lab →](/lab/design-research/)*

<!-- Slider value display: update .lab-val spans on input -->
<script>
(function () {
  var pairs = [
    ['ripple-spring', 'ripple-spring-val', null],
    ['ripple-repel',  'ripple-repel-val',  null],
    ['matrix-speed',  'matrix-speed-val',  'x'],
    ['particle-speed','particle-speed-val','x'],
    ['gol-speed',     'gol-speed-val',     'x'],
    ['neural-noise',  'neural-noise-val',  null],
    ['rd-steps',      'rd-steps-val',      null]
  ];
  function wire() {
    pairs.forEach(function (p) {
      var sl = document.getElementById(p[0]);
      var sv = document.getElementById(p[1]);
      if (!sl || !sv) return;
      sl.addEventListener('input', function () {
        var v = parseFloat(sl.value);
        sv.textContent = (Number.isInteger(v) ? v : v.toFixed(p[0].indexOf('noise') >= 0 ? 2 : 1)) + (p[2] || '');
      });
    });
  }
  wire();
  var _ps = document.getElementById('_pushState');
  if (_ps) _ps.addEventListener('hy-push-state-after', wire);
})();
</script>
<!-- Canvas JS loaded via defer in _includes/my-head.html -->
