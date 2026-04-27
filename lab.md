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

/* ── Lab Studio sticky panel ── */
#lab-studio {
  position: fixed; right: 16px; top: 68px; z-index: 900;
  width: 172px; min-width: 158px; max-width: 300px;
  background: rgba(6,14,8,0.94);
  border: 1px solid rgba(46,85,56,0.38);
  border-radius: 6px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 22px rgba(0,0,0,0.65);
  overflow: hidden; resize: horizontal;
}
#lab-studio.collapsed #lab-studio-body { display: none; }
#lab-studio-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.44em 0.7em; cursor: move;
  border-bottom: 1px solid rgba(46,85,56,0.18);
  font-family: monospace; font-size: 0.7em; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase; color: rgba(100,185,125,0.85);
  user-select: none;
}
#lab-studio-toggle { opacity: 0.55; font-size: 1em; cursor: pointer; }
#lab-studio-body { padding: 0.55em 0.7em 0.7em; display: flex; flex-direction: column; gap: 0.5em; }
#lab-studio-hint { font-size: 0.62em; color: rgba(70,130,85,0.6); line-height: 1.4; }
@media (max-width: 767px) { #lab-studio { display: none; } }

/* ── Floating section nav (FAB) ── */
#lab-nav-wrap {
  position: fixed; bottom: 4.7em; right: 1.4em; z-index: 8800;
  display: flex; flex-direction: column; align-items: flex-end; gap: 0.35em;
}
#lab-nav-fab {
  width: 2.5em; height: 2.5em; border-radius: 50%;
  border: 1.5px solid rgba(46,85,56,0.5);
  background: rgba(46,85,56,0.88); color: #fff;
  font-size: 1.1em; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  flex-shrink: 0; transition: background 0.2s, transform 0.15s;
  font-family: serif;
}
#lab-nav-fab:hover { background: rgb(46,85,56); transform: scale(1.08); }
#lab-nav-menu {
  display: none; flex-direction: column; gap: 0.22em; align-items: flex-end;
}
.lab-nav-link {
  font-size: 0.7em; font-family: monospace; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 0.3em 0.65em;
  background: rgba(46,85,56,0.9); color: rgba(200,240,210,0.92);
  border: 1px solid rgba(46,85,56,0.4);
  border-radius: 3px; text-decoration: none !important;
  backdrop-filter: blur(8px);
  display: block; white-space: nowrap;
  transition: background 150ms ease;
  box-shadow: 0 1px 5px rgba(0,0,0,0.35);
}
.lab-nav-link:hover { background: rgba(46,85,56,1); color: #fff; }
@media (max-width: 767px) { #lab-nav-wrap { display: none; } }
</style>

<div id="lab-nav-wrap">
  <div id="lab-nav-menu">
    <a href="#crt-scanlines"      class="lab-nav-link">Retro</a>
    <a href="#pixel-art-canvas"   class="lab-nav-link">Drawing</a>
    <a href="#flow-field"         class="lab-nav-link">Physics</a>
    <a href="#matrix-rain"        class="lab-nav-link">Generative</a>
    <a href="#game-of-life"       class="lab-nav-link">Neural</a>
    <a href="#boids-flocking"     class="lab-nav-link">Nature</a>
    <a href="#vector-field-demo"  class="lab-nav-link">Dynamics</a>
    <a href="#bauhaus-palette"    class="lab-nav-link">Colour</a>
  </div>
  <button id="lab-nav-fab" aria-label="Jump to section" aria-expanded="false">§</button>
</div>

Experiments in creative coding, generative systems, and browser-native interaction.

**Jump to:** [Retro](#crt-scanlines) · [Drawing](#pixel-art-canvas) · [Physics](#flow-field) · [Generative](#matrix-rain) · [Neural](#game-of-life) · [Nature](#boids-flocking) · [Dynamics](#vector-field-demo) · [Colour](#bauhaus-palette)

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
      <span class="lab-label">Continuous rate <span class="lab-val" id="matrix-inject-rate-val">0.0</span></span>
      <input type="range" id="matrix-inject-rate" class="lab-slider" min="0" max="5" step="0.5" value="0">
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Word color</span>
      <div style="display:flex;align-items:center;gap:0.5em;">
        <input type="color" id="matrix-word-color" value="#ffffff" style="width:32px;height:22px;padding:0;border:1px solid rgba(46,85,56,0.3);border-radius:3px;background:transparent;cursor:pointer;">
        <span id="matrix-word-color-swatch" style="flex:1;height:18px;border-radius:3px;background:#ffffff;border:1px solid rgba(46,85,56,0.2);transition:background 150ms;"></span>
      </div>
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Speed <span class="lab-val" id="matrix-speed-val">1.0x</span></span>
      <input type="range" id="matrix-speed" class="lab-slider" min="0.5" max="3" step="0.5" value="1">
    </div>
  </div>
</div>
<p class="interest-desc">Column-based character rain — Greek letters, math symbols, nucleotide codes. Type a word + Enter to burst it; set <em>Continuous rate</em> &gt; 0 to keep injecting it. Pick any word color.</p>
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
<p class="interest-title">Neural Spike Propagation <span class="interest-tag">SNN · LIF</span><span class="interest-tag">NeuroAI</span></p>
<canvas id="neural-spike-canvas" class="lab-canvas" width="640" height="240" style="background:#080e0a;margin:0.6em 0 0.3em;"></canvas>
<canvas id="neural-raster-canvas" class="lab-canvas" width="640" height="80" style="background:#060c08;margin:0 0 0.3em;border-radius:4px;"></canvas>
<div class="lab-inline-btns">
  <button id="neural-reset-btn" class="lab-btn">Reset</button>
  <span class="lab-inline-slider">
    <span class="lab-label" style="font-size:0.72em;">Noise</span>
    <input type="range" id="neural-noise" class="lab-slider" min="0.005" max="0.15" step="0.005" value="0.04">
    <span class="lab-val" id="neural-noise-val">0.04</span>
  </span>
</div>
<p class="interest-desc">20 LIF neurons in a small-world ring. <strong>Top</strong>: network topology — node color = membrane potential (blue→green→red); pulse dots = propagating spikes. <strong>Bottom</strong>: spike raster — each row is a neuron, each green tick is a spike; bar = population rate. Click any node to inject current; raise Noise for denser firing.</p>
</div>

---

<div class="lab-section"><h2>Nature &amp; Emergence</h2></div>

<div class="interest-item" id="boids-flocking">
<p class="interest-title">Murmuration / Flocking <span class="interest-tag">emergence</span><span class="interest-tag">NeuroAI</span></p>
<canvas id="boids-canvas" class="lab-canvas" width="640" height="240" style="background:#080e0a;margin:0.6em 0 0;cursor:crosshair;"></canvas>
<div class="lab-inline-btns">
  <button id="boids-scatter" class="lab-btn">Scatter</button>
  <button id="boids-flock" class="lab-btn active">Flock</button>
  <span class="lab-inline-slider">
    <span class="lab-label" style="font-size:0.72em;">N</span>
    <input type="range" id="boids-n" class="lab-slider" min="20" max="120" step="10" value="80">
    <span class="lab-val" id="boids-n-val">80</span>
  </span>
</div>
<p class="interest-desc">Reynolds' Boids: separation, alignment, cohesion. Move mouse to repel the flock; drag N to scale the population. Analogous to neural population dynamics — local rules, global order.</p>
</div>

<div class="interest-item" id="raindrop-ripple">
<p class="interest-title">Raindrop Ripple <span class="interest-tag">wave · cortical</span><span class="interest-tag">NeuroAI</span></p>
<canvas id="ripple2-canvas" class="lab-canvas" width="640" height="240" style="background:#060c10;margin:0.6em 0 0;cursor:crosshair;"></canvas>
<p class="interest-desc">Finite-difference 2D wave equation. Click to drop a virtual raindrop; move mouse for a gentle wake. Analogy: cortical spreading waves — local perturbation propagates through a continuous medium.</p>
</div>

<div class="interest-item" id="fire-spreading">
<p class="interest-title">Fire — Spreading Activation <span class="interest-tag">cellular</span><span class="interest-tag">NeuroAI</span></p>
<canvas id="fire-canvas" class="lab-canvas" width="640" height="240" style="background:#060404;margin:0.6em 0 0;cursor:crosshair;"></canvas>
<p class="interest-desc">Cellular automaton fire. Move mouse or click to add heat; observe how activation spreads, rises, and cools. Inspired by spreading activation in neural networks — local ignition cascades through neighboring units.</p>
</div>

---

<div class="lab-section"><h2>Dynamical Systems</h2></div>

<div class="interest-item" id="vector-field-demo">
<p class="interest-title">Vector Field — Divergence &amp; Curl <span class="interest-tag">topology · physics</span></p>
<canvas id="vector-field-canvas" class="lab-canvas" width="640" height="240" style="background:#0a0e0c;margin:0.6em 0 0;"></canvas>
<div class="lab-inline-btns" id="vf-controls">
  <button id="vf-rotation" class="lab-btn active">Rotation</button>
  <button id="vf-sink" class="lab-btn">Sink</button>
  <button id="vf-source" class="lab-btn">Source</button>
  <button id="vf-saddle" class="lab-btn">Saddle</button>
  <button id="vf-wave" class="lab-btn">Wave</button>
  <button id="vf-pause" class="lab-btn">Pause</button>
</div>
<p class="interest-desc">A grid of arrows shows the direction and magnitude of a 2D vector field. Rotation = pure curl (zero divergence). Sink / Source = pure divergence. Saddle = hyperbolic fixed point (zero curl, zero divergence). Wave = time-varying field with no fixed point.</p>
</div>

<div class="interest-item" id="lorenz-attractor-demo">
<p class="interest-title">Lorenz Attractor <span class="interest-tag">chaos · strange attractor</span></p>
<canvas id="lorenz-canvas" class="lab-canvas" width="640" height="240" style="background:#060d08;margin:0.6em 0 0;"></canvas>
<div class="lab-inline-btns">
  <span class="lab-inline-slider">
    <span class="lab-label" style="font-size:0.72em;">σ</span>
    <input type="range" id="lorenz-sigma" class="lab-slider" min="2" max="20" step="0.5" value="10">
    <span class="lab-val" id="lorenz-sigma-v">10.0</span>
  </span>
  <span class="lab-inline-slider">
    <span class="lab-label" style="font-size:0.72em;">ρ</span>
    <input type="range" id="lorenz-rho" class="lab-slider" min="10" max="50" step="0.5" value="28">
    <span class="lab-val" id="lorenz-rho-v">28.0</span>
  </span>
  <span class="lab-inline-slider">
    <span class="lab-label" style="font-size:0.72em;">β</span>
    <input type="range" id="lorenz-beta" class="lab-slider" min="0.5" max="6" step="0.1" value="2.67">
    <span class="lab-val" id="lorenz-beta-v">2.67</span>
  </span>
  <button id="lorenz-pause" class="lab-btn">Pause</button>
  <button id="lorenz-reset" class="lab-btn">Reset</button>
</div>
<p class="interest-desc">The Lorenz attractor traces trajectories in a 3D chaotic system, projected onto 2D. Adjust σ (Prandtl), ρ (Rayleigh), β (geometric) to explore the butterfly's sensitivity to initial conditions — small changes diverge exponentially.</p>
</div>

---

<div class="lab-section"><h2>Colour System</h2></div>

<div class="interest-item fade-visible" id="bauhaus-palette" data-fade-init="1">
<p class="interest-title">Bauhaus Colour Wheel <span class="interest-tag">Itten · design</span></p>
<div id="bauhaus-wheel-container" style="position:relative;overflow:hidden;height:180px;background:#111;border-radius:6px;margin:0.6em 0 0.3em;cursor:grab;user-select:none;touch-action:pan-y;">
  <div id="bauhaus-track" style="display:flex;align-items:center;position:absolute;top:0;left:0;height:100%;will-change:transform;">
    <!-- Palette cards injected by JS -->
  </div>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;background:linear-gradient(to right,#111 0%,transparent 18%,transparent 82%,#111 100%);"></div>
  <div id="bauhaus-indicator" style="position:absolute;bottom:8px;left:0;right:0;display:flex;justify-content:center;gap:7px;pointer-events:none;"></div>
</div>
<p class="interest-desc">Itten's colour theory applied as four design palettes. <strong>Drag</strong> or <strong>scroll</strong> to rotate between Classic, Itten, Klee, and Night. Selected palette propagates to all listening canvases below.</p>
</div>

<!-- Bauhaus palette JS: /assets/js/lab-bauhaus.js (SPA-safe) -->

<!-- Lab Studio: fixed panel, persists while scrolling on this page -->
<div id="lab-studio">
  <div id="lab-studio-header">
    <span>Lab Studio</span>
    <span id="lab-studio-toggle">▾</span>
  </div>
  <div id="lab-studio-body">
    <div class="lab-ctrl-group">
      <span class="lab-label">Shared text</span>
      <input type="text" id="lab-studio-text" class="lab-text-input" placeholder="Broadcast to all…" maxlength="16" autocomplete="off" spellcheck="false">
    </div>
    <div class="lab-ctrl-group">
      <button class="lab-btn" id="lab-studio-apply" style="width:100%;text-align:center;">Stamp → Pixel Art</button>
    </div>
    <div class="lab-ctrl-group" id="ls-palette-group" style="display:none;">
      <span class="lab-label">Bauhaus palette</span>
      <div id="ls-palette-swatches" style="display:flex;gap:2px;flex-wrap:wrap;margin-top:3px;"></div>
    </div>
    <div id="lab-studio-hint">Text → Matrix Rain · CRT · Pixel Art<br>Bauhaus wheel → palette</div>
  </div>
</div>

<script>
(function () {
  var panel = document.getElementById('lab-studio');
  var header = document.getElementById('lab-studio-header');
  var toggle = document.getElementById('lab-studio-toggle');
  var input = document.getElementById('lab-studio-text');
  var applyBtn = document.getElementById('lab-studio-apply');
  if (!panel) return;

  // Collapse toggle
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var collapsed = panel.classList.toggle('collapsed');
    toggle.textContent = collapsed ? '▸' : '▾';
  });

  // Draggable — drag from header (not toggle button)
  var dragging = false, dragOffX = 0, dragOffY = 0;
  header.addEventListener('mousedown', function (e) {
    if (e.target === toggle) return;
    var rect = panel.getBoundingClientRect();
    panel.style.right = 'auto';
    panel.style.left = rect.left + 'px';
    panel.style.top  = rect.top  + 'px';
    dragOffX = e.clientX - rect.left;
    dragOffY = e.clientY - rect.top;
    dragging = true;
    e.preventDefault();
  });
  document.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    panel.style.left = Math.max(0, e.clientX - dragOffX) + 'px';
    panel.style.top  = Math.max(0, e.clientY - dragOffY) + 'px';
  });
  document.addEventListener('mouseup', function () { dragging = false; });

  function broadcast(text, action) {
    document.dispatchEvent(new CustomEvent('lab:text-change', { detail: { text: text, action: action || 'update' } }));
  }

  if (input) {
    input.addEventListener('input', function () {
      var v = input.value.trim().slice(0, 16);
      if (v) broadcast(v, 'update');
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var v = input.value.trim().slice(0, 16);
        if (v) broadcast(v, 'apply');
      }
    });
  }

  if (applyBtn) applyBtn.addEventListener('click', function () {
    var v = (input ? input.value.trim() : '').slice(0, 16);
    if (v) broadcast(v, 'apply');
  });

  // Bauhaus palette → panel swatches → color broadcast
  document.addEventListener('lab:palette-change', function (e) {
    var g = document.getElementById('ls-palette-group');
    var sw = document.getElementById('ls-palette-swatches');
    if (!g || !sw) return;
    g.style.display = '';
    sw.innerHTML = '';
    (e.detail.palette.swatches || []).forEach(function (hex) {
      var b = document.createElement('button');
      b.style.cssText = 'width:22px;height:22px;background:' + hex + ';border:2px solid transparent;border-radius:2px;cursor:pointer;padding:0;flex-shrink:0;';
      b.title = hex;
      b.addEventListener('click', function () {
        sw.querySelectorAll('button').forEach(function (x) { x.style.borderColor = 'transparent'; });
        b.style.borderColor = '#fff';
        document.dispatchEvent(new CustomEvent('lab:color-select', { detail: { hex: hex } }));
      });
      sw.appendChild(b);
    });
  });
})();
</script>

---

## Site Experiments

<div class="interest-item">
<p class="interest-title">Next.js Blog Template <span class="interest-tag">Next.js</span><span class="interest-tag">test build</span></p>
<p class="interest-desc">Static-export Next.js blog deployed via GitHub Actions. Evaluating Next.js + MDX as an alternative to the current Jekyll/Hydejack stack.<br>→ <a href="https://kafkapple.github.io/nextjs-blog/" target="_blank" rel="noopener">View live</a> · <a href="https://github.com/kafkapple/nextjs-blog" target="_blank" rel="noopener">Source</a></p>
</div>

---

*Source: vanilla Canvas API, no dependencies. Design: [Design Trends →](/interests/design/trends/)*

<!-- Slider value display: update .lab-val spans on input -->
<script>
(function () {
  var pairs = [
    ['ripple-spring',      'ripple-spring-val',      null],
    ['ripple-repel',       'ripple-repel-val',       null],
    ['matrix-speed',       'matrix-speed-val',       'x'],
    ['matrix-inject-rate', 'matrix-inject-rate-val', null],
    ['particle-speed',     'particle-speed-val',     'x'],
    ['gol-speed',          'gol-speed-val',          'x'],
    ['neural-noise',       'neural-noise-val',       null],
    ['boids-n',            'boids-n-val',            null]
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
