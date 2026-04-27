---
layout: page
title: Design Trends — Interactive
description: >
  Interactive canvas demonstrations of visual design movements:
  generative art, kinetic typography, Neo-Brutalism, Swiss grid, and color theory.
permalink: /interests/design/trends/
sitemap: true
---

<style>
.trend-block {
  margin: 0 0 2.8em 0;
  padding: 1em 0 0 0;
  border-top: 2px solid rgb(46,85,56);
}
.trend-label { display: flex; align-items: baseline; gap: 0.7em; margin-bottom: 0.35em; flex-wrap: wrap; }
.trend-name  { font-size: 1.05em; font-weight: 700; margin: 0; }
.trend-era   { font-size: 0.73em; background: #e8ede9; color: rgb(26,56,40); padding: 0.1em 0.5em; border-radius: 3px; }
.trend-desc  { font-size: 0.88em; color: #666; margin: 0 0 0.8em 0; line-height: 1.5; }
.demo-wrap   { position: relative; border-radius: 4px; overflow: hidden; background: #111; }
canvas.demo  { display: block; width: 100%; cursor: crosshair; }
.controls    { display: flex; gap: 0.5em; margin-top: 0.6em; flex-wrap: wrap; align-items: center; }
.tbtn {
  font-size: 0.8em; padding: 0.3em 0.8em; border-radius: 3px;
  background: rgb(46,85,56); color: #fff; border: none; cursor: pointer;
  transition: opacity 0.15s;
}
.tbtn:hover { opacity: 0.82; }
.tbtn.sec { background: #e8ede9; color: rgb(26,56,40); }
.rng-wrap { display: flex; align-items: center; gap: 0.4em; font-size: 0.8em; color: #555; }
.rng-wrap input[type=range] { width: 80px; accent-color: rgb(46,85,56); }

/* kinetic type */
#ktype-demo {
  min-height: 110px; display: flex; align-items: center; justify-content: center;
  background: #111; border-radius: 4px; padding: 1.5em; user-select: none; cursor: crosshair;
}
.ktype-word { display: inline-block; margin-right: 0.4em; font-size: clamp(1.3em,4vw,2.1em); font-weight: 900; }
.ktype-char { display: inline-block; color: #fff; will-change: transform; }

/* neo-bru */
#neobru-demo {
  min-height: 200px; position: relative; background: #f5f5f5;
  border-radius: 4px; overflow: hidden; border: 1px solid #e0e0e0;
}
.neo-card {
  position: absolute; width: 160px; padding: 1em 1.1em; background: #fff;
  border: 2.5px solid #111; box-shadow: 6px 6px 0 #111; border-radius: 2px;
  cursor: grab; user-select: none; font-size: 0.85em; font-weight: 700;
  transition: box-shadow 0.1s;
}
.neo-card.dragging { cursor: grabbing; box-shadow: 3px 3px 0 #111; }
.neo-accent-bar { display: block; height: 8px; margin-bottom: 0.6em; border-radius: 1px; }

/* swiss */
#swiss-canvas { background: #fff; }
</style>

Seven interactive demos — one per design movement. Drag, click, and adjust parameters to understand the mechanics behind each aesthetic.

---

<!-- ═══════════════════════════════════════════════════
  1. GENERATIVE FLOW FIELD
═══════════════════════════════════════════════════ -->
<div class="trend-block">
<div class="trend-label">
  <p class="trend-name">Generative / Flow Field</p>
  <span class="trend-era">Creative Coding · Tyler Hobbs lineage · p5.js</span>
</div>
<p class="trend-desc">2 000 particles follow a noise-derived angle field — each step laid as a semi-transparent stroke. Trails accumulate then fade, producing emergent fiber texture. The algorithm behind most "algorithm art" on Art Blocks. Adjust trail opacity and speed; click <em>Regenerize</em> to reseed the field.</p>
<div class="demo-wrap">
  <canvas id="flow-canvas" class="demo" height="200"></canvas>
</div>
<div class="controls">
  <button class="tbtn" id="flow-pause">Pause</button>
  <button class="tbtn sec" id="flow-regen">Regenerize</button>
  <div class="rng-wrap">Trail <input type="range" id="flow-trail" min="1" max="30" value="8"><span id="flow-trail-v">8</span></div>
  <div class="rng-wrap">Speed <input type="range" id="flow-speed" min="1" max="10" value="4"><span id="flow-speed-v">4</span></div>
</div>
</div>

<!-- ═══════════════════════════════════════════════════
  2. KINETIC TYPOGRAPHY
═══════════════════════════════════════════════════ -->
<div class="trend-block">
<div class="trend-label">
  <p class="trend-name">Kinetic Typography</p>
  <span class="trend-era">Motion Design · 2010s– · GSAP / CSS</span>
</div>
<p class="trend-desc">Move the cursor over the text — each letter magnetically repels from the cursor position. Toggle to <em>Wave</em> mode for a continuous sine-wave animation. Click <em>Next</em> to cycle through design aphorisms. The repulsion mechanic is the core interaction in most creative-agency portfolio hover effects.</p>
<div id="ktype-demo"></div>
<div class="controls">
  <button class="tbtn" id="ktype-next">Next →</button>
  <button class="tbtn sec" id="ktype-mode">Mode: Repel</button>
</div>
</div>

<!-- ═══════════════════════════════════════════════════
  3. NEO-BRUTALISM  ↔  GLASSMORPHISM
═══════════════════════════════════════════════════ -->
<div class="trend-block">
<div class="trend-label">
  <p class="trend-name">Neo-Brutalism ↔ Glassmorphism</p>
  <span class="trend-era">2020s Web · direct reaction pair</span>
</div>
<p class="trend-desc">Drag the card around. Click <em>Accent</em> to rotate through colors. <em>Toggle</em> switches the same card between Neo-Brutalism (hard border, flat shadow, zero blur) and Glassmorphism (backdrop-filter blur, gradient tint) — the two aesthetic poles that defined early-2020s web design.</p>
<div id="neobru-demo">
  <div class="neo-card" id="neo-card" style="top:25px;left:25px">
    <span class="neo-accent-bar" id="neo-accent" style="background:#f7c948;"></span>
    <div>Card 001</div>
    <div style="font-weight:400;margin-top:0.3em;font-size:0.88em;color:#555;">Hard shadow. No blur. Raw structure.</div>
  </div>
</div>
<div class="controls">
  <button class="tbtn" id="neo-accent-btn">Accent →</button>
  <button class="tbtn sec" id="neo-mode-btn">Toggle: Neo-Bru</button>
</div>
</div>

<!-- ═══════════════════════════════════════════════════
  4. SWISS / INTERNATIONAL STYLE GRID
═══════════════════════════════════════════════════ -->
<div class="trend-block">
<div class="trend-label">
  <p class="trend-name">Swiss / International Style — Modular Grid</p>
  <span class="trend-era">1950s– · Müller-Brockmann · Helvetica</span>
</div>
<p class="trend-desc">Adjust columns and gutter width — see the invisible scaffold that structures Swiss design. Click anywhere on the canvas to place a text block that snaps to the grid column and baseline. The baseline grid (orange lines) keeps all text on a consistent vertical rhythm.</p>
<div class="demo-wrap" style="background:#fff;">
  <canvas id="swiss-canvas" class="demo" height="240"></canvas>
</div>
<div class="controls">
  <div class="rng-wrap">Cols <input type="range" id="swiss-cols" min="2" max="16" value="6"><span id="swiss-cols-v">6</span></div>
  <div class="rng-wrap">Gutter% <input type="range" id="swiss-gutter" min="2" max="20" value="8"><span id="swiss-gutter-v">8</span></div>
  <button class="tbtn sec" id="swiss-clear">Clear</button>
</div>
</div>

<!-- ═══════════════════════════════════════════════════
  5. BAUHAUS COLOR HARMONY
═══════════════════════════════════════════════════ -->
<div class="trend-block">
<div class="trend-label">
  <p class="trend-name">Bauhaus Color Theory</p>
  <span class="trend-era">1919–1933 · Itten · Albers</span>
</div>
<p class="trend-desc">Click the wheel to select a base hue. The dots and swatches show the computed harmony — the same relationships Johannes Itten taught at the Bauhaus color workshop. Switch between Complementary (opposite on wheel), Triadic (120° apart), Analogous (neighbors), and Split-Complementary.</p>
<div class="demo-wrap" style="background:#fafafa;">
  <canvas id="bauhaus-canvas" class="demo" height="240"></canvas>
</div>
<div class="controls">
  <button class="tbtn" id="bauhaus-comp">Complementary</button>
  <button class="tbtn sec" id="bauhaus-tri">Triadic</button>
  <button class="tbtn sec" id="bauhaus-ana">Analogous</button>
  <button class="tbtn sec" id="bauhaus-split">Split-Comp</button>
</div>
</div>

<!-- ═══════════════════════════════════════════════════
  6. CYBERPUNK / DIGITAL RAIN
═══════════════════════════════════════════════════ -->
<div class="trend-block">
<div class="trend-label">
  <p class="trend-name">Cyberpunk / Digital Rain</p>
  <span class="trend-era">1984– · Gibson · Ghost in the Shell · The Matrix</span>
</div>
<p class="trend-desc">William Gibson's <em>Neuromancer</em> (1984) crystallized the cyberpunk visual language — neon on black, cascading data, urban decay meets high technology. The "Matrix rain" aesthetic (<em>Ghost in the Shell</em>, 1995; <em>The Matrix</em>, 1999) became the era's defining motif: Japanese katakana and Latin glyphs cascading as digital snow. Contemporary lo-fi, vaporwave, and retro-terminal aesthetics descend directly from this moment.</p>
<div class="demo-wrap">
  <canvas id="matrix-design-canvas" class="demo" height="240"></canvas>
</div>
<div class="controls">
  <button class="tbtn" id="mxd-pause">Pause</button>
  <div class="rng-wrap">Speed <input type="range" id="mxd-speed" min="1" max="5" value="2"><span id="mxd-speed-v">2</span></div>
</div>
</div>

<!-- ═══════════════════════════════════════════════════
  7. 8-BIT / PIXEL ART ERA
═══════════════════════════════════════════════════ -->
<div class="trend-block">
<div class="trend-label">
  <p class="trend-name">8-bit / Pixel Art Era</p>
  <span class="trend-era">1977– · Atari · NES · Demoscene · Lo-fi Revival</span>
</div>
<p class="trend-desc">Hardware constraints became a design language. The Atari 2600, NES, and Game Boy imposed grid-based aesthetics that artists turned into richness — each pixel placed deliberately. The demoscene (1980s–90s) pushed these constraints as competitive art. Contemporary pixel art persists as a deliberate choice: <em>Celeste</em>, <em>Undertale</em>, lo-fi music visuals, and retro branding all employ the 8-bit vocabulary. Paint on the canvas — 16-colour NES-inspired palette.</p>
<div class="demo-wrap" style="background:#0a0a12;">
  <canvas id="pixel-design-canvas" class="demo" height="240"></canvas>
</div>
<div class="controls">
  <div id="pixel-d-palette" style="display:flex;gap:3px;flex-wrap:wrap;align-items:center;"></div>
  <button class="tbtn sec" id="pixel-d-reset">Reset</button>
  <button class="tbtn sec" id="pixel-d-clear">Clear</button>
</div>
</div>

---

*← [Design overview](/interests/design/) · [Perception Lab](/interests/design/perception/) · [Palette Sandbox](/interests/design/palette/)*

<!-- JS: design-trends.js + design-trends-ext.js (defer in my-head.html) -->
