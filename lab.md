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
/* ── Base card with stronger Forest Green animation ── */
.interest-item {
  margin: 0 0 1.6em 0;
  padding: 0.8em 1em 1.05em;
  border-left: 3px solid rgba(46,85,56,0.35);
  background: linear-gradient(90deg, rgba(46,85,56,0.05) 0%, rgba(46,85,56,0) 35%);
  line-height: 1.55;
  border-radius: 0 5px 5px 0;
  transition: border-color 0.25s ease, background 0.3s ease, transform 0.18s ease, box-shadow 0.25s ease;
  position: relative;
}
.interest-item::before {
  content: ''; position: absolute; left: -3px; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(180deg, rgba(100,180,130,0.0), rgba(100,180,130,0.85), rgba(100,180,130,0.0));
  opacity: 0; transition: opacity 0.3s ease;
}
.interest-item:hover {
  border-left-color: rgb(46,85,56);
  background: linear-gradient(90deg, rgba(46,85,56,0.13) 0%, rgba(46,85,56,0.02) 45%);
  transform: translateX(3px);
  box-shadow: 0 4px 18px rgba(46,85,56,0.18);
}
.interest-item:hover::before { opacity: 1; }
.interest-title { font-weight: 600; margin: 0 0 0.3em 0; font-size: 1.0em; }
.interest-desc { font-size: 0.88em; color: #666; margin: 0.4em 0 0; }
.interest-tag {
  display: inline-block; font-size: 0.72em; padding: 0.1em 0.5em; border-radius: 2px;
  background: rgba(46,85,56,0.12); color: rgb(46,85,56); margin-right: 0.3em;
  border: 1px solid rgba(46,85,56,0.18);
}

/* ── Canvas ── */
.lab-canvas { display: block; width: 100%; cursor: crosshair; border-radius: 4px; background: #161c20; }

/* ── Section header (stronger accent + animation) ── */
.lab-section {
  margin: 2.4em 0 0.6em; padding: 0.4em 0 0.5em;
  border-bottom: 1px solid rgba(46,85,56,0.22);
  position: relative;
}
.lab-section::after {
  content: ''; position: absolute; left: 0; bottom: -1px; height: 2px; width: 28%;
  background: linear-gradient(90deg, rgb(46,85,56), rgba(46,85,56,0.0));
  animation: lab-bar-glow 4.5s ease-in-out infinite;
}
@keyframes lab-bar-glow {
  0%,100% { width: 28%; opacity: 0.65; }
  50%     { width: 65%; opacity: 1.0; }
}
.lab-section h2 {
  font-size: 0.95em; font-weight: 700; color: rgb(46,85,56);
  letter-spacing: 0.08em; text-transform: uppercase; margin: 0;
}

/* ── Experimental section: sparkle + shimmer ── */
.lab-section.lab-experimental h2 {
  background: linear-gradient(90deg, rgb(46,85,56) 0%, rgb(120,200,150) 35%, rgb(46,85,56) 70%, rgb(180,235,200) 100%);
  background-size: 220% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: lab-shimmer 3.6s linear infinite;
}
.lab-section.lab-experimental::after {
  background: linear-gradient(90deg, rgb(120,200,150), rgb(46,85,56), rgb(180,235,200), rgb(46,85,56));
  background-size: 300% 100%;
  animation: lab-bar-glow 4.5s ease-in-out infinite, lab-shimmer 3.6s linear infinite;
  width: 100%;
}
@keyframes lab-shimmer {
  0%   { background-position: 0% 50%; }
  100% { background-position: 220% 50%; }
}
.lab-section.lab-experimental h2::before {
  content: '✨ '; font-size: 0.9em;
  -webkit-text-fill-color: initial;
}
.lab-section.lab-experimental h2::after {
  content: ' ✨'; font-size: 0.9em;
  -webkit-text-fill-color: initial;
}
.lab-experimental + .interest-item, .lab-experimental ~ .interest-item.lab-exp-item {
  position: relative;
}
.interest-item.lab-exp-item::after {
  content: ''; position: absolute; right: 6px; top: 6px; width: 6px; height: 6px;
  border-radius: 50%; background: rgb(120,200,150);
  box-shadow: 0 0 8px rgb(120,200,150);
  animation: lab-pulse 2.4s ease-in-out infinite;
}
@keyframes lab-pulse {
  0%,100% { opacity: 0.35; transform: scale(0.85); }
  50%     { opacity: 1.0;  transform: scale(1.25); }
}

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

/* ── Inline button row ── */
.lab-inline-btns { display: flex; gap: 0.3em; flex-wrap: wrap; margin: 0.4em 0 0.3em; }
.lab-slider { width: 100%; accent-color: rgb(46,85,56); }

/* ── Controls ── */
.lab-ctrl-group { display: flex; flex-direction: column; gap: 0.28em; }
.lab-label { font-size: 0.68em; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: rgba(110,190,135,0.7); }
.lab-text-input {
  background: rgba(0,0,0,0.5); border: 1px solid rgba(46,85,56,0.28); border-radius: 4px;
  padding: 0.32em 0.5em; color: #8dcc9d; font-family: monospace; font-size: 0.8em; width: 100%; box-sizing: border-box; outline: none;
}
.lab-btn {
  font-size: 0.74em; padding: 0.22em 0.6em; background: rgba(46,85,56,0.12); color: rgb(100,170,120);
  border: 1px solid rgba(46,85,56,0.22); border-radius: 3px; cursor: pointer; font-family: monospace;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
}
.lab-btn:hover { background: rgba(46,85,56,0.32); color: #b0dcb8; transform: translateY(-1px); }
.lab-btn:active { transform: translateY(0); }
.lab-btn.active { background: rgba(46,85,56,0.55); color: #d4edda; }

/* ── Retro Dial (Lab Studio) ── */
.lab-dial {
  display: flex; align-items: center; gap: 0.5em;
  padding: 0.32em 0.4em; background: rgba(0,0,0,0.35);
  border: 1px solid rgba(46,85,56,0.22); border-radius: 4px;
}
.lab-dial input[type="color"] {
  width: 28px; height: 22px; border: 1px solid rgba(46,85,56,0.28); border-radius: 3px;
  background: transparent; padding: 0; cursor: pointer;
}
.lab-dial-val { font-family: monospace; font-size: 0.7em; color: rgba(110,190,135,0.85); min-width: 28px; text-align: right; }

/* ── Lab Studio ── */
#lab-studio {
  position: fixed; right: 16px; top: 68px; z-index: 900;
  width: 180px; min-width: 150px; max-width: 320px;
  background: rgba(6,14,8,0.94); border: 1px solid rgba(46,85,56,0.38); border-radius: 6px;
  backdrop-filter: blur(10px); box-shadow: 0 4px 22px rgba(0,0,0,0.65);
  overflow: auto; resize: horizontal;
}
#lab-studio.collapsed #lab-studio-body { display: none; }
#lab-studio-header { padding: 0.44em 0.7em; cursor: grab; border-bottom: 1px solid rgba(46,85,56,0.18); font-family: monospace; font-size: 0.7em; font-weight: 700; color: rgba(100,185,125,0.85); user-select: none; display: flex; justify-content: space-between; align-items: center; }
#lab-studio-body { padding: 0.55em 0.7em 0.7em; display: flex; flex-direction: column; gap: 0.55em; }
#lab-studio-hint { font-family: monospace; font-size: 0.62em; color: rgba(120,180,140,0.55); margin-top: 0.15em; line-height: 1.4; }

/* ── Style Hybrid Demo ── */
#neobru-demo { position: relative; height: 200px; background: #f5f5f5; border-radius: 4px; overflow: hidden; margin: 0.6em 0 0.3em; }
#neo-card {
  position: absolute; width: 160px; padding: 1em 1.1em; background: #fff; border: 2.5px solid #111;
  box-shadow: 6px 6px 0 #111; border-radius: 2px; cursor: grab; user-select: none; font-size: 0.85em; font-weight: 700;
  left: 20px; top: 20px;
  transition: transform 0.12s ease, box-shadow 0.18s ease, background 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease, color 0.3s ease;
}
#neo-card:hover { transform: translate(-1px,-1px); box-shadow: 8px 8px 0 #111; }
#neo-card:active { cursor: grabbing; }
#neo-card.glass {
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 32px rgba(0,0,0,0.2); border-radius: 12px;
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); color: #fff;
}
#neo-card.glass:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
#neobru-demo.glass-bg { background: linear-gradient(135deg,#6a11cb,#2575fc,#f093fb); }
#neo-accent { position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: #f7c948; }

/* ── Lab Fullscreen (fully opaque, isolated) ── */
.lab-fs-wrap { position: relative; display: block; }
.lab-fs-btn {
  position: absolute; top: 7px; right: 7px; z-index: 10;
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(6,14,8,0.72); border: 1px solid rgba(46,85,56,0.4);
  border-radius: 4px; color: rgba(100,190,125,0.75); cursor: pointer; padding: 0;
  opacity: 0; transition: opacity 0.2s ease, background 0.18s ease, transform 0.18s ease;
}
.lab-fs-wrap:hover .lab-fs-btn { opacity: 1; }
.lab-fs-btn:hover { background: rgba(46,85,56,0.55); color: #b0dcb8; transform: scale(1.08); }
#lab-fs-overlay {
  position: fixed; inset: 0; z-index: 99990;
  background: rgb(4,10,6);              /* fully opaque — no see-through to page */
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.28s ease;
}
#lab-fs-overlay.lab-fs-active { opacity: 1; }
.lab-fs-close {
  position: absolute; top: 14px; right: 18px;
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(46,85,56,0.22); border: 1px solid rgba(46,85,56,0.45);
  border-radius: 50%; color: rgba(130,210,155,0.85); cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
}
.lab-fs-close:hover { background: rgba(46,85,56,0.6); color: #d4edda; }
@media (prefers-reduced-motion: reduce) {
  #lab-fs-overlay { transition: none; }
  .lab-fs-btn { transition: none; }
  .interest-item, .interest-item:hover { transition: none; transform: none; }
  .lab-section::after,
  .lab-section.lab-experimental::after { animation: none; }
  .lab-section.lab-experimental h2 { animation: none; }
  .interest-item.lab-exp-item::after { animation: none; }
  #neo-card { transition: none; }
}
</style>

---

Experiments in creative coding, generative systems, and browser-native interaction. Sections grouped by theme — **Design** (visual systems), **Science** (mathematical/physical), **Misc** (motion field play), **Experimental** (in-flight prototypes ✨).

---

<div class="lab-section"><h2>Design</h2></div>

<div class="interest-item" id="bauhaus-palette">
<p class="interest-title">Bauhaus Colour System <span class="interest-tag">Itten · Wheel</span></p>
<div id="bauhaus-tabs" style="display:flex;margin:0.5em 0 0.6em;border-radius:4px;overflow:hidden;border:1px solid rgba(46,85,56,0.3);width:fit-content;">
  <button class="bauhaus-tab active" data-mode="wheel">Wheel</button>
  <button class="bauhaus-tab" data-mode="carousel">Carousel</button>
</div>
<div id="bauhaus-wheel-panel">
  <canvas id="bauhaus-wheel-canvas" width="280" height="280" style="display:block;border-radius:50%;cursor:crosshair;margin:0 auto;max-width:100%;"></canvas>
  <div id="bauhaus-wheel-sampled" style="height:30px;border-radius:4px;margin:0.5em 0 0.3em;background:rgba(46,85,56,0.2);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:0.74em;color:rgba(100,160,120,0.7);">click wheel to sample</div>
</div>
<div id="bauhaus-palette-strip" style="display:flex;height:34px;border-radius:4px;overflow:hidden;margin:0.3em 0 0.4em;background:rgba(14,20,16,0.8);"></div>
<p class="interest-desc">HSL disc with Itten's color harmonies (Complementary, Triadic, Analogous). Carousel mode explores Bauhaus theory palettes.</p>
</div>

<div class="interest-item" id="crt-scanlines">
<p class="interest-title">CRT Scanlines <span class="interest-tag">retro</span></p>
<canvas id="crt-canvas" class="lab-canvas" width="640" height="200"></canvas>
<p class="interest-desc">Phosphor CRT simulation with scanline overlay.</p>
</div>

<div class="interest-item" id="matrix-rain">
<p class="interest-title">Matrix Rain <span class="interest-tag">generative</span></p>
<canvas id="matrix-rain-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">Column-based character rain with word injection.</p>
</div>

---

<div class="lab-section"><h2>Science</h2></div>

<div class="interest-item" id="vector-field-demo">
<p class="interest-title">Vector Field — Divergence &amp; Curl <span class="interest-tag">topology</span></p>
<canvas id="vector-field-canvas" class="lab-canvas" width="640" height="240"></canvas>
<div class="lab-inline-btns" id="vf-controls">
  <button id="vf-rotation" class="lab-btn active">Rotation</button>
  <button id="vf-sink" class="lab-btn">Sink</button>
  <button id="vf-source" class="lab-btn">Source</button>
  <button id="vf-saddle" class="lab-btn">Saddle</button>
  <button id="vf-wave" class="lab-btn">Wave</button>
  <button id="vf-pause" class="lab-btn">Pause</button>
  <button id="vf-heatmap" class="lab-btn">Heatmap: OFF</button>
</div>
<p class="interest-desc">2D vector field with arrows and tracer particles. Drag on canvas to reposition the source point. Heatmap shows field magnitude.</p>
</div>

<div class="interest-item" id="lorenz-attractor-demo">
<p class="interest-title">Lorenz Attractor <span class="interest-tag">chaos</span></p>
<canvas id="lorenz-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">3D chaotic system projected onto 2D. Sensitive to initial conditions.</p>
</div>

<div class="interest-item" id="fractal-explorer">
<p class="interest-title">Fractal Dynamics <span class="interest-tag">math</span><span class="interest-tag">complex</span></p>
<canvas id="fractal-canvas" class="lab-canvas" width="640" height="240"></canvas>
<div class="lab-inline-btns">
  <button id="fractal-mode-btn" class="lab-btn">Julia</button>
  <button id="fractal-orbit-btn" class="lab-btn">Orbit: ON</button>
  <button id="fractal-reset-btn" class="lab-btn">Reset Zoom</button>
</div>
<p class="interest-desc">Julia/Mandelbrot explorer. Orbit animates <em>c</em> through parameter space (Lissajous path). Scroll to zoom. Disable Orbit to steer <em>c</em> with mouse.</p>
</div>

<div class="interest-item" id="fourier-nn-viz">
<p class="interest-title">Neural &amp; Frequency <span class="interest-tag">Fourier</span><span class="interest-tag">ANN</span></p>
<canvas id="fourier-nn-canvas" class="lab-canvas" width="640" height="320"></canvas>
<div id="fourier-nn-controls" class="lab-inline-btns">
  <button id="fourier-square" class="lab-btn active" data-preset="square">Square</button>
  <button id="fourier-sawtooth" class="lab-btn" data-preset="sawtooth">Sawtooth</button>
  <button id="fourier-triangle" class="lab-btn" data-preset="triangle">Triangle</button>
  <label for="fourier-n-slider" style="font-size:0.82em;opacity:0.7;margin-left:0.6em">n=<span id="fourier-n-label">5</span></label>
  <input id="fourier-n-slider" type="range" min="1" max="15" value="5" style="width:80px;vertical-align:middle">
</div>
<p class="interest-desc">Fourier series (left) → wave trail (center) → neural network (right). Preset selects harmonic series type; slider controls harmonic count. ANN activations are driven by live wave amplitude.</p>
</div>

<div class="interest-item" id="boids-flocking">
<p class="interest-title">Murmuration / Flocking <span class="interest-tag">emergence</span></p>
<canvas id="boids-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">Reynolds' Boids: local rules yielding global order.</p>
</div>

<div class="interest-item" id="game-of-life">
<p class="interest-title">Game of Life <span class="interest-tag">automata</span></p>
<canvas id="gol-canvas" class="lab-canvas" width="640" height="240"></canvas>
<div class="lab-inline-btns">
  <button id="gol-btn-gun" class="lab-btn">Gosper Gun</button>
  <button id="gol-btn-random" class="lab-btn">Random</button>
</div>
<p class="interest-desc">Conway's Game of Life with age-coded colors.</p>
</div>

---

<div class="lab-section"><h2>Misc</h2></div>

<div class="interest-item" id="flow-field">
<p class="interest-title">Flow Field <span class="interest-tag">noise</span></p>
<canvas id="flow-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">Perlin-noise vector field with particle trails.</p>
</div>

<div class="interest-item" id="grid-dot-spring-ripple">
<p class="interest-title">Grid Dot Spring Ripple <span class="interest-tag">physics</span></p>
<div class="lab-demo-row">
  <canvas id="grid-ripple-canvas" class="lab-canvas" width="640" height="240"></canvas>
  <div class="lab-ctrl-panel">
    <div class="lab-ctrl-group">
      <span class="lab-label">Spring</span>
      <input type="range" id="ripple-spring" class="lab-slider" min="0.02" max="0.35" step="0.01" value="0.12">
    </div>
  </div>
</div>
<p class="interest-desc">N×M dot grid with spring physics. Click to send a ripple.</p>
</div>

---

<div class="lab-section lab-experimental"><h2>Experimental</h2></div>

<div class="interest-item lab-exp-item" id="neobru-glass">
<p class="interest-title">Style Hybrid <span class="interest-tag">UX</span><span class="interest-tag">Brutalism</span></p>
<div id="neobru-demo">
  <div id="neo-card">
    <div id="neo-accent"></div>
    <div style="margin-bottom:0.5em;opacity:0.6;font-size:0.7em;letter-spacing:0.05em;">COMPONENT</div>
    <div>Interactive Card</div>
    <div style="margin-top:0.8em;font-weight:400;font-size:0.85em;color:#666;">Drag me around the area. Switch styles below.</div>
  </div>
</div>
<div class="lab-inline-btns">
  <button id="neo-mode-btn" class="lab-btn active">Toggle: Neo-Bru</button>
  <button id="neo-accent-btn" class="lab-btn">Next Accent</button>
</div>
<p class="interest-desc">Exploring the contrast between Neo-Brutalism (high contrast, hard shadows) and Glassmorphism (blur, transparency).</p>
</div>

<div class="interest-item lab-exp-item" id="pixel-art-canvas">
<p class="interest-title">Pixel Art Canvas <span class="interest-tag">draw</span></p>
<div class="lab-demo-row">
  <canvas id="pixel-canvas" class="lab-canvas" width="640" height="200"></canvas>
  <div class="lab-ctrl-panel">
    <div class="lab-ctrl-group">
      <span class="lab-label">Palette</span>
      <div id="pixel-palette-btns" style="display:flex;flex-wrap:wrap;gap:3px;">
        <button class="lab-btn active" data-color="#2e5538" style="background:#2e5538;width:22px;height:22px;padding:0;"></button>
        <button class="lab-btn" data-color="#f7c948" style="background:#f7c948;width:22px;height:22px;padding:0;"></button>
        <button class="lab-btn" data-color="#f26b5b" style="background:#f26b5b;width:22px;height:22px;padding:0;"></button>
        <button class="lab-btn" data-color="#7ec8e3" style="background:#7ec8e3;width:22px;height:22px;padding:0;"></button>
        <button class="lab-btn" data-color="#c8a0f7" style="background:#c8a0f7;width:22px;height:22px;padding:0;"></button>
        <button class="lab-btn" data-color="#161c20" style="background:#161c20;width:22px;height:22px;padding:0;"></button>
      </div>
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Stamp text</span>
      <input type="text" id="pixel-input" class="lab-text-input" placeholder="Type + Enter…">
    </div>
    <div class="lab-ctrl-group">
      <button class="lab-btn" id="pixel-clear-btn">Clear</button>
    </div>
  </div>
</div>
<p class="interest-desc">Paint pixels or stamp text. Click a swatch above or sample from the Bauhaus wheel.</p>
</div>

<div class="interest-item lab-exp-item" id="color-cycle">
<p class="interest-title">Color Cycle <span class="interest-tag">blobs</span></p>
<canvas id="lava-canvas" class="lab-canvas" width="640" height="200"></canvas>
<p class="interest-desc">Metaball blobs with HSL phase shifting.</p>
</div>

<div class="interest-item lab-exp-item" id="neural-spike-propagation">
<p class="interest-title">Neural Spike Propagation <span class="interest-tag">SNN</span></p>
<canvas id="neural-spike-canvas" class="lab-canvas" width="640" height="240"></canvas>
<canvas id="neural-raster-canvas" class="lab-canvas" width="640" height="80" data-fs-skip="1"></canvas>
<p class="interest-desc">LIF neurons in a ring topology. Population firing rate and raster plot.</p>
</div>

<div class="interest-item lab-exp-item" id="raindrop-ripple">
<p class="interest-title">Raindrop Ripple <span class="interest-tag">wave</span></p>
<canvas id="ripple2-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">2D wave equation simulation. Local perturbations propagate through the medium.</p>
</div>

<div class="interest-item lab-exp-item" id="fire-spreading">
<p class="interest-title">Fire — Spreading Activation <span class="interest-tag">cellular</span></p>
<canvas id="fire-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">Activation cascades — local burn rules with cooling and reignition.</p>
</div>

<!-- Lab Studio: fixed panel with retro dials -->
<div id="lab-studio">
  <div id="lab-studio-header">
    <span>Lab Studio</span>
    <span id="lab-studio-toggle">▾</span>
  </div>
  <div id="lab-studio-body">
    <div class="lab-ctrl-group">
      <span class="lab-label">Shared text</span>
      <input type="text" id="lab-studio-text" class="lab-text-input" placeholder="Broadcast to all…" maxlength="16">
      <button class="lab-btn" id="lab-studio-apply" style="width:100%;margin-top:0.25em;">Stamp Text</button>
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Accent</span>
      <div class="lab-dial">
        <input type="color" id="lab-studio-color" value="#2e5538">
        <span class="lab-dial-val" id="lab-studio-color-val">#2e5538</span>
      </div>
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Speed</span>
      <input type="range" id="lab-studio-speed" class="lab-slider" min="0.2" max="3.0" step="0.05" value="1.0">
      <span class="lab-dial-val" id="lab-studio-speed-val">1.00×</span>
    </div>
    <div class="lab-ctrl-group">
      <span class="lab-label">Chaos</span>
      <input type="range" id="lab-studio-chaos" class="lab-slider" min="0" max="1" step="0.01" value="0.3">
      <span class="lab-dial-val" id="lab-studio-chaos-val">0.30</span>
    </div>
    <div id="lab-studio-hint">Text → Matrix · CRT · Pixel Art<br>Color/Speed/Chaos broadcast to listeners (rolling out).</div>
  </div>
</div>

<script>
/* ── Generic draggable factory ── */
/* Avoids the all-mousemove-always-listening pattern that caused the
   Lab-Studio ↔ Style-Hybrid conflict (multiple closures polling the same
   document mousemove independently). Now each drag adds listeners only
   while held, removes on release.
   handle.dataset.labDragReady prevents duplicate mousedown listeners on
   SPA back-navigation (inline <script> re-execution by Hydejack). */
window.LabDrag = window.LabDrag || function (handle, target, opts) {
  if (handle.dataset.labDragReady) return;
  handle.dataset.labDragReady = '1';
  opts = opts || {};
  handle.addEventListener('mousedown', function (e) {
    if (opts.skipIf && opts.skipIf(e)) return;
    if (e.button !== 0) return;
    e.preventDefault();
    var startX = e.clientX, startY = e.clientY;
    var startLeft = target.offsetLeft, startTop = target.offsetTop;
    function onMove(ev) {
      var nx = startLeft + ev.clientX - startX;
      var ny = startTop  + ev.clientY - startY;
      if (opts.bounds) {
        var b = opts.bounds();
        nx = Math.max(b.minX, Math.min(b.maxX, nx));
        ny = Math.max(b.minY, Math.min(b.maxY, ny));
      }
      target.style.left  = nx + 'px';
      target.style.top   = ny + 'px';
      if (opts.cleanRight) target.style.right = 'auto';
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
};

/* ── Lab Studio: drag + broadcast text/color/speed/chaos ── */
/* Guard against SPA re-execution: Hydejack re-runs inline <script> on
   hy-push-state-after; without this guard, every nav adds another set
   of toggle/input/color/speed/chaos listeners (audit S1). */
(function () {
  if (window.__labStudioReady) return;
  window.__labStudioReady = true;
  var panel    = document.getElementById('lab-studio');
  var header   = document.getElementById('lab-studio-header');
  var toggle   = document.getElementById('lab-studio-toggle');
  var input    = document.getElementById('lab-studio-text');
  var applyBtn = document.getElementById('lab-studio-apply');
  var colorIn  = document.getElementById('lab-studio-color');
  var colorVal = document.getElementById('lab-studio-color-val');
  var speedIn  = document.getElementById('lab-studio-speed');
  var speedVal = document.getElementById('lab-studio-speed-val');
  var chaosIn  = document.getElementById('lab-studio-chaos');
  var chaosVal = document.getElementById('lab-studio-chaos-val');
  if (!panel) return;

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var collapsed = panel.classList.toggle('collapsed');
    toggle.textContent = collapsed ? '▸' : '▾';
  });

  window.LabDrag(header, panel, {
    skipIf: function (e) { return e.target === toggle; },
    cleanRight: true
  });

  function broadcast(detail) {
    document.dispatchEvent(new CustomEvent('lab:studio', { detail: detail }));
  }
  function broadcastText(text, action) {
    document.dispatchEvent(new CustomEvent('lab:text-change', { detail: { text: text, action: action || 'update' } }));
  }
  if (input) {
    input.addEventListener('input',   function () { var v = input.value.trim().slice(0,16); if (v) broadcastText(v, 'update'); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var v = input.value.trim().slice(0,16); if (v) broadcastText(v, 'apply'); } });
  }
  if (applyBtn) applyBtn.addEventListener('click', function () { var v = (input ? input.value.trim() : '').slice(0,16); if (v) broadcastText(v, 'apply'); });

  if (colorIn) colorIn.addEventListener('input', function () {
    colorVal.textContent = colorIn.value;
    broadcast({ kind: 'color', value: colorIn.value });
  });
  if (speedIn) speedIn.addEventListener('input', function () {
    speedVal.textContent = parseFloat(speedIn.value).toFixed(2) + '×';
    broadcast({ kind: 'speed', value: parseFloat(speedIn.value) });
  });
  if (chaosIn) chaosIn.addEventListener('input', function () {
    chaosVal.textContent = parseFloat(chaosIn.value).toFixed(2);
    broadcast({ kind: 'chaos', value: parseFloat(chaosIn.value) });
  });
})();
</script>

<script>
/* ── Style Hybrid (Neo-Brutalism / Glassmorphism) ── */
/* Outer IIFE guard: hy-push-state-after listener must not be re-registered
   on SPA navigation (audit S1). init() itself is idempotent via
   card.dataset.dragReady. */
(function () {
  if (window.__styleHybridReady) return;
  window.__styleHybridReady = true;
  var card, cont, accentEl, modeBtn, accBtn;
  var accents = ['#f7c948', '#f26b5b', '#60c8a0', '#7ec8e3', '#c8a0f7'], ai = 0;
  var neoMode = true;

  function init() {
    card     = document.getElementById('neo-card');
    cont     = document.getElementById('neobru-demo');
    accentEl = document.getElementById('neo-accent');
    modeBtn  = document.getElementById('neo-mode-btn');
    accBtn   = document.getElementById('neo-accent-btn');
    if (!card || !cont || !window.LabDrag) return;
    if (card.dataset.dragReady) return;
    card.dataset.dragReady = '1';

    window.LabDrag(card, card, {
      bounds: function () {
        return {
          minX: 0, minY: 0,
          maxX: cont.offsetWidth  - card.offsetWidth,
          maxY: cont.offsetHeight - card.offsetHeight
        };
      }
    });

    if (modeBtn && !modeBtn.dataset.ready) {
      modeBtn.dataset.ready = '1';
      modeBtn.onclick = function () {
        neoMode = !neoMode;
        card.classList.toggle('glass', !neoMode);
        cont.classList.toggle('glass-bg', !neoMode);
        if (accentEl) accentEl.style.display = neoMode ? 'block' : 'none';
        modeBtn.textContent = neoMode ? 'Toggle: Neo-Bru' : 'Toggle: Glassmorphism';
      };
    }
    if (accBtn && !accBtn.dataset.ready) {
      accBtn.dataset.ready = '1';
      accBtn.onclick = function () { ai = (ai + 1) % accents.length; if (accentEl) accentEl.style.background = accents[ai]; };
    }
  }
  init();
  document.addEventListener('hy-push-state-after', init);
})();
</script>
