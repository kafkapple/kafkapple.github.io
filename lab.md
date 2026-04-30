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

/* ── Inline button row ── */
.lab-inline-btns { display: flex; gap: 0.3em; flex-wrap: wrap; margin: 0.4em 0 0.3em; }
/* ── Range slider ── */
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
}
.lab-btn:hover { background: rgba(46,85,56,0.28); color: #b0dcb8; }
.lab-btn.active { background: rgba(46,85,56,0.55); color: #d4edda; }

/* ── Lab Studio ── */
#lab-studio {
  position: fixed; right: 16px; top: 68px; z-index: 900;
  width: 172px; min-width: 140px; max-width: 320px;
  background: rgba(6,14,8,0.94); border: 1px solid rgba(46,85,56,0.38); border-radius: 6px;
  backdrop-filter: blur(10px); box-shadow: 0 4px 22px rgba(0,0,0,0.65);
  overflow: auto; resize: horizontal;
}
#lab-studio.collapsed #lab-studio-body { display: none; }
#lab-studio-header { padding: 0.44em 0.7em; cursor: grab; border-bottom: 1px solid rgba(46,85,56,0.18); font-family: monospace; font-size: 0.7em; font-weight: 700; color: rgba(100,185,125,0.85); user-select: none; }

/* ── Neo-Brutalism Demo ── */
#neobru-demo { position: relative; height: 200px; background: #f5f5f5; border-radius: 4px; overflow: hidden; margin: 0.6em 0 0.3em; }
#neo-card {
  position: absolute; width: 160px; padding: 1em 1.1em; background: #fff; border: 2.5px solid #111;
  box-shadow: 6px 6px 0 #111; border-radius: 2px; cursor: grab; user-select: none; font-size: 0.85em; font-weight: 700;
  left: 20px; top: 20px;
}
#neo-card:active { cursor: grabbing; }
#neo-accent { position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: #f7c948; }

/* ── Lab Fullscreen ── */
.lab-fs-wrap {
  position: relative;
  display: block;
}
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
  background: rgba(4,10,6,0.97);
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
}
</style>

---

Experiments in creative coding, generative systems, and browser-native interaction.

---

<div class="lab-section"><h2>Colour System</h2></div>

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
<p class="interest-desc">HSL disc with Itten's color harmonies. Carousel mode explores Bauhaus theory palettes.</p>
</div>

---

<div class="lab-section"><h2>Dynamical Systems</h2></div>

<div class="interest-item" id="vector-field-demo">
<p class="interest-title">Vector Field — Divergence &amp; Curl <span class="interest-tag">topology</span></p>
<canvas id="vector-field-canvas" class="lab-canvas" width="640" height="240"></canvas>
<div class="lab-inline-btns" id="vf-controls">
  <button id="vf-rotation" class="lab-btn active">Rotation</button>
  <button id="vf-sink" class="lab-btn">Sink</button>
  <button id="vf-source" class="lab-btn">Source</button>
  <button id="vf-saddle" class="lab-btn">Saddle</button>
</div>
<p class="interest-desc">Grid of arrows showing 2D vector field dynamics.</p>
</div>

<div class="interest-item" id="lorenz-attractor-demo">
<p class="interest-title">Lorenz Attractor <span class="interest-tag">chaos</span></p>
<canvas id="lorenz-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">3D chaotic system projected onto 2D. Sensitive to initial conditions.</p>
</div>

---

<div class="lab-section"><h2>Scientific Visualization</h2></div>

<div class="interest-item" id="fractal-explorer">
<p class="interest-title">Fractal Dynamics <span class="interest-tag">math</span><span class="interest-tag">complex</span></p>
<canvas id="fractal-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">Interactive Julia Set explorer. Move mouse to shift the complex constant <em>c</em>.</p>
</div>

<div class="interest-item" id="fourier-nn-viz">
<p class="interest-title">Neural &amp; Frequency <span class="interest-tag">Fourier</span><span class="interest-tag">ANN</span></p>
<canvas id="fourier-nn-canvas" class="lab-canvas" width="640" height="320"></canvas>
<p class="interest-desc">Combined visualization of Fourier series approximation (left) and neural network activation patterns (right).</p>
</div>

<div class="interest-item" id="pca-demo">
<p class="interest-title">PCA — Dimensionality Reduction <span class="interest-tag">ML</span><span class="interest-tag">geometry</span></p>
<canvas id="pca-canvas" class="lab-canvas" width="640" height="320"></canvas>
<p class="interest-desc">Principal Component Analysis on 2D points. Drag points to see the principal axis update in real-time.</p>
</div>

---

<div class="lab-section"><h2>Nature &amp; Emergence</h2></div>

<div class="interest-item" id="boids-flocking">
<p class="interest-title">Murmuration / Flocking <span class="interest-tag">emergence</span></p>
<canvas id="boids-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">Reynolds' Boids: local rules yielding global order.</p>
</div>

<div class="interest-item" id="raindrop-ripple">
<p class="interest-title">Raindrop Ripple <span class="interest-tag">wave</span></p>
<canvas id="ripple2-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">2D wave equation simulation. Local perturbations propagate through the medium.</p>
</div>

<div class="interest-item" id="fire-spreading">
<p class="interest-title">Fire — Spreading Activation <span class="interest-tag">NeuroAI</span></p>
<canvas id="fire-canvas" class="lab-canvas" width="640" height="240"></canvas>
<p class="interest-desc">Activation cascades inspired by neural network signal propagation.</p>
</div>

---

<div class="lab-section"><h2>Cellular &amp; Neural</h2></div>

<div class="interest-item" id="game-of-life">
<p class="interest-title">Game of Life <span class="interest-tag">automata</span></p>
<canvas id="gol-canvas" class="lab-canvas" width="640" height="240"></canvas>
<div class="lab-inline-btns">
  <button id="gol-btn-gun" class="lab-btn">Gosper Gun</button>
  <button id="gol-btn-random" class="lab-btn">Random</button>
</div>
<p class="interest-desc">Conway's Game of Life with age-coded colors.</p>
</div>

<div class="interest-item" id="neural-spike-propagation">
<p class="interest-title">Neural Spike Propagation <span class="interest-tag">SNN</span></p>
<canvas id="neural-spike-canvas" class="lab-canvas" width="640" height="240"></canvas>
<canvas id="neural-raster-canvas" class="lab-canvas" width="640" height="80" data-fs-skip="1"></canvas>
<p class="interest-desc">LIF neurons in a ring topology. Population firing rate and raster plot.</p>
</div>

---

<div class="lab-section"><h2>Drawing &amp; Color</h2></div>

<div class="interest-item" id="pixel-art-canvas">
<p class="interest-title">Pixel Art Canvas <span class="interest-tag">draw</span></p>
<div class="lab-demo-row">
  <canvas id="pixel-canvas" class="lab-canvas" width="640" height="200"></canvas>
  <div class="lab-ctrl-panel">
    <div class="lab-ctrl-group">
      <span class="lab-label">Stamp text</span>
      <input type="text" id="pixel-input" class="lab-text-input" placeholder="Type + Enter…">
    </div>
    <div class="lab-ctrl-group">
      <button class="lab-btn" id="pixel-clear-btn">Clear</button>
    </div>
  </div>
</div>
<p class="interest-desc">Paint pixels or stamp text. Pick colors from the Bauhaus wheel above.</p>
</div>

<div class="interest-item" id="color-cycle">
<p class="interest-title">Color Cycle <span class="interest-tag">blobs</span></p>
<canvas id="lava-canvas" class="lab-canvas" width="640" height="200"></canvas>
<p class="interest-desc">Metaball blobs with HSL phase shifting.</p>
</div>

---

<div class="lab-section"><h2>Design Dynamics</h2></div>

<div class="interest-item" id="neobru-glass">
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

---

<div class="lab-section"><h2>Physics &amp; Motion</h2></div>

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

<div class="lab-section"><h2>Retro &amp; Typography</h2></div>

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

<!-- Lab Studio: fixed panel -->
<div id="lab-studio">
  <div id="lab-studio-header">
    <span>Lab Studio</span>
    <span id="lab-studio-toggle">▾</span>
  </div>
  <div id="lab-studio-body">
    <div class="lab-ctrl-group">
      <span class="lab-label">Shared text</span>
      <input type="text" id="lab-studio-text" class="lab-text-input" placeholder="Broadcast to all…" maxlength="16">
    </div>
    <div class="lab-ctrl-group">
      <button class="lab-btn" id="lab-studio-apply" style="width:100%;">Stamp Text</button>
    </div>
    <div id="lab-studio-hint">Text → Matrix · CRT · Pixel Art</div>
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

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var collapsed = panel.classList.toggle('collapsed');
    toggle.textContent = collapsed ? '▸' : '▾';
  });

  var dragging = false, offsetLeft = 0, offsetTop = 0;
  header.addEventListener('mousedown', function (e) {
    if (e.target === toggle) return;
    dragging = true;
    offsetLeft = e.clientX - panel.offsetLeft;
    offsetTop = e.clientY - panel.offsetTop;
    header.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    panel.style.left = (e.clientX - offsetLeft) + 'px';
    panel.style.top = (e.clientY - offsetTop) + 'px';
    panel.style.right = 'auto';
  });
  document.addEventListener('mouseup', function () { dragging = false; header.style.cursor = 'grab'; });

  function broadcast(text, action) {
    document.dispatchEvent(new CustomEvent('lab:text-change', { detail: { text: text, action: action || 'update' } }));
  }
  if (input) {
    input.addEventListener('input', function () { var v = input.value.trim().slice(0, 16); if (v) broadcast(v, 'update'); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var v = input.value.trim().slice(0, 16); if (v) broadcast(v, 'apply'); } });
  }
  if (applyBtn) applyBtn.addEventListener('click', function () { var v = (input ? input.value.trim() : '').slice(0, 16); if (v) broadcast(v, 'apply'); });
})();
</script>

<script>
// Neo-Brutalism / Glassmorphism Interactive JS
(function () {
  var card, cont, accentEl, modeBtn, accBtn;
  var dragging = false, sx, sy, ox, oy;
  var accents = ['#f7c948', '#f26b5b', '#60c8a0', '#7ec8e3', '#c8a0f7'], ai = 0;
  var neoMode = true;

  function init() {
    card = document.getElementById('neo-card');
    cont = document.getElementById('neobru-demo');
    accentEl = document.getElementById('neo-accent');
    modeBtn = document.getElementById('neo-mode-btn');
    accBtn = document.getElementById('neo-accent-btn');
    if (!card || !cont) return;

    card.addEventListener('mousedown', function (e) {
      dragging = true; sx = e.clientX; sy = e.clientY; ox = card.offsetLeft; oy = card.offsetTop; e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      card.style.left = Math.max(0, Math.min(cont.offsetWidth - card.offsetWidth, ox + e.clientX - sx)) + 'px';
      card.style.top = Math.max(0, Math.min(cont.offsetHeight - card.offsetHeight, oy + e.clientY - sy)) + 'px';
    });
    document.addEventListener('mouseup', function () { dragging = false; });

    modeBtn.onclick = function () {
      neoMode = !neoMode;
      if (neoMode) {
        modeBtn.textContent = 'Toggle: Neo-Bru';
        cont.style.background = '#f5f5f5';
        card.style.cssText = 'position:absolute;width:160px;padding:1em 1.1em;background:#fff;border:2.5px solid #111;box-shadow:6px 6px 0 #111;border-radius:2px;cursor:grab;user-select:none;font-size:0.85em;font-weight:700;left:' + card.style.left + ';top:' + card.style.top;
        accentEl.style.display = 'block';
      } else {
        modeBtn.textContent = 'Toggle: Glassmorphism';
        cont.style.background = 'linear-gradient(135deg,#6a11cb,#2575fc,#f093fb)';
        card.style.cssText = 'position:absolute;width:160px;padding:1em 1.1em;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);box-shadow:0 8px 32px rgba(0,0,0,0.2);border-radius:12px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);cursor:grab;user-select:none;font-size:0.85em;font-weight:700;color:#fff;left:' + card.style.left + ';top:' + card.style.top;
        accentEl.style.display = 'none';
      }
    };
    accBtn.onclick = function () { ai = (ai + 1) % accents.length; accentEl.style.background = accents[ai]; };
  }
  init();
  document.addEventListener('hy-push-state-after', init);
})();
</script>
