---
layout: page
title: Palette Preview
description: >
  Sidebar color sandbox — click "Apply" to preview live, copy the YAML snippet,
  or tell me a number to commit it.
permalink: /palette/
sitemap: false
---

# Sidebar Palette Sandbox

- Click **▶ Apply** on any card → sidebar gradient updates instantly (this browser only, remembered via localStorage).
- Open the **YAML snippet** drawer in the toolbar → copy 4 lines into `_config.yml`.
- Or just tell me a code (e.g., `A2`, `C1`, `F2`) and I'll commit it.

<div id="palette-toolbar" style="position:sticky;top:0;z-index:10;background:#fff;border:1px solid #ddd;border-radius:8px;padding:0.8em 1em;margin:1em 0;box-shadow:0 2px 6px rgba(0,0,0,0.05);">
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5em;">
    <div>
      <strong>Current preview:</strong> <span id="preview-name" style="color:#36649B;">(none — click Apply)</span>
    </div>
    <div>
      <button id="reset-btn" style="padding:0.3em 0.8em;border:1px solid #ccc;border-radius:4px;background:#fff;cursor:pointer;">↺ Reset</button>
    </div>
  </div>
  <details style="margin-top:0.6em;">
    <summary style="cursor:pointer;color:#555;font-size:0.9em;">YAML snippet (paste into <code>_config.yml</code>)</summary>
    <pre id="yaml-snippet" style="background:#f4f4f4;padding:0.8em;border-radius:4px;font-size:0.85em;margin:0.5em 0 0 0;overflow-x:auto;white-space:pre-wrap;">— Apply a palette to see the snippet —</pre>
  </details>
</div>

<style>
.swatch-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1em; margin: 1em 0; }
.swatch { border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: relative; }
.swatch-top { height: 110px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.05em; font-family: Georgia, serif; text-shadow: 0 1px 2px rgba(0,0,0,0.3); padding: 0 0.6em; text-align: center; }
.swatch-body { padding: 0.7em 1em 0.85em 1em; background: #fff; font-size: 0.85em; }
.swatch-body code { background: #f4f4f4; padding: 0.15em 0.4em; border-radius: 3px; font-size: 0.85em; }
.swatch-name { font-weight: 600; font-size: 0.95em; margin-bottom: 0.2em; }
.swatch-note { color: #666; margin: 0.35em 0 0.55em 0; font-size: 0.85em; }
.swatch-note ul { margin: 0; padding-left: 1.1em; }
.swatch-note li { margin: 0.1em 0; }
.apply-btn { display: inline-block; padding: 0.3em 0.9em; background: #36649B; color: white; border: 0; border-radius: 4px; cursor: pointer; font-size: 0.85em; font-weight: 600; }
.apply-btn:hover { background: #244162; }
.section-h { margin-top: 2em; padding-bottom: 0.3em; border-bottom: 2px solid #eee; }
</style>

<script>
(function () {
  function applyPalette(name, c1, c2) {
    var styleId = 'palette-override';
    var existing = document.getElementById(styleId);
    if (existing) existing.remove();
    var style = document.createElement('style');
    style.id = styleId;
    // Hydejack puts the gradient on .sidebar-bg via inline style; override it.
    style.textContent =
      '.sidebar-bg { background: linear-gradient(to bottom, ' + c1 + ', ' + c2 + ') !important; } ' +
      '#_sidebar, .sidebar { background: linear-gradient(to bottom, ' + c1 + ', ' + c2 + ') !important; } ' +
      ':root { --accent-color: ' + c2 + ' !important; }';
    document.head.appendChild(style);
    document.getElementById('preview-name').textContent = name + ' (' + c2 + ')';
    document.getElementById('yaml-snippet').textContent =
      'accent_image:\n' +
      '  background: linear-gradient(to bottom, ' + c1 + ', ' + c2 + ')\n' +
      '  overlay: false\n' +
      'accent_color: ' + c2 + '\n' +
      'theme_color: ' + c1;
    localStorage.setItem('palette-preview', JSON.stringify({ name: name, c1: c1, c2: c2 }));
  }
  function resetPalette() {
    var existing = document.getElementById('palette-override');
    if (existing) existing.remove();
    document.getElementById('preview-name').textContent = '(none — click Apply)';
    document.getElementById('yaml-snippet').textContent = '— Apply a palette to see the snippet —';
    localStorage.removeItem('palette-preview');
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.apply-btn');
    if (btn) { applyPalette(btn.dataset.name, btn.dataset.c1, btn.dataset.c2); return; }
    if (e.target.id === 'reset-btn') resetPalette();
  });
  // Restore last preview on page load
  function restore() {
    try {
      var saved = JSON.parse(localStorage.getItem('palette-preview') || 'null');
      if (saved) applyPalette(saved.name, saved.c1, saved.c2);
    } catch (e) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restore);
  } else {
    restore();
  }
  // Re-apply on Hydejack SPA navigation
  var ps = document.querySelector('hy-push-state');
  if (ps) ps.addEventListener('hy-push-state-after', restore);
})();
</script>

## A. Academic Standards
{:.section-h}

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(36,65,98), rgb(54,100,139));">A1. Slate Blue (current)</div>
  <div class="swatch-body">
    <div class="swatch-name">Slate Blue</div>
    <code>rgb(54,100,139)</code>
    <div class="swatch-note"><ul><li>Currently applied site-wide</li><li>Cool, restrained academic feel</li></ul></div>
    <button class="apply-btn" data-name="A1. Slate Blue (current)" data-c1="rgb(36,65,98)" data-c2="rgb(54,100,139)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(14,37,68), rgb(28,52,92));">A2. Oxford Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Oxford Blue</div>
    <code>rgb(28,52,92)</code>
    <div class="swatch-note"><ul><li>Deep navy, traditional</li><li>Oxford / Cambridge elite tone</li></ul></div>
    <button class="apply-btn" data-name="A2. Oxford Blue" data-c1="rgb(14,37,68)" data-c2="rgb(28,52,92)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(75,107,140), rgb(125,160,190));">A3. Cambridge Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Cambridge Blue</div>
    <code>rgb(125,160,190)</code>
    <div class="swatch-note"><ul><li>Lighter, softer than Oxford</li><li>Open / approachable</li></ul></div>
    <button class="apply-btn" data-name="A3. Cambridge Blue" data-c1="rgb(75,107,140)" data-c2="rgb(125,160,190)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(115,15,15), rgb(165,28,48));">A4. Harvard Crimson</div>
  <div class="swatch-body">
    <div class="swatch-name">Harvard Crimson</div>
    <code>rgb(165,28,48)</code>
    <div class="swatch-note"><ul><li>Classic Ivy red</li><li>Strong, traditional</li></ul></div>
    <button class="apply-btn" data-name="A4. Harvard Crimson" data-c1="rgb(115,15,15)" data-c2="rgb(165,28,48)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(105,16,16), rgb(140,21,21));">A5. Stanford Cardinal</div>
  <div class="swatch-body">
    <div class="swatch-name">Stanford Cardinal</div>
    <code>rgb(140,21,21)</code>
    <div class="swatch-note"><ul><li>West-coast academic red</li><li>Slightly darker than Harvard</li></ul></div>
    <button class="apply-btn" data-name="A5. Stanford Cardinal" data-c1="rgb(105,16,16)" data-c2="rgb(140,21,21)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(140,55,16), rgb(232,119,34));">A6. Princeton Orange</div>
  <div class="swatch-body">
    <div class="swatch-name">Princeton Orange</div>
    <code>rgb(232,119,34)</code>
    <div class="swatch-note"><ul><li>Vivid orange</li><li>High energy — use with restraint</li></ul></div>
    <button class="apply-btn" data-name="A6. Princeton Orange" data-c1="rgb(140,55,16)" data-c2="rgb(232,119,34)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(0,33,71), rgb(0,50,98));">A7. Yale Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Yale Blue</div>
    <code>rgb(0,50,98)</code>
    <div class="swatch-note"><ul><li>Near-black navy</li><li>Maximum gravitas</li></ul></div>
    <button class="apply-btn" data-name="A7. Yale Blue" data-c1="rgb(0,33,71)" data-c2="rgb(0,50,98)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(115,16,16), rgb(179,27,27));">A8. MIT Engineering Red</div>
  <div class="swatch-body">
    <div class="swatch-name">MIT Red</div>
    <code>rgb(179,27,27)</code>
    <div class="swatch-note"><ul><li>Engineering / tech-school flavor</li><li>Strong, clean</li></ul></div>
    <button class="apply-btn" data-name="A8. MIT Engineering Red" data-c1="rgb(115,16,16)" data-c2="rgb(179,27,27)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(0,42,75), rgb(0,55,118));">A9. Berkeley Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Berkeley Blue</div>
    <code>rgb(0,55,118)</code>
    <div class="swatch-note"><ul><li>Deep, neutral navy</li><li>UC Berkeley primary</li></ul></div>
    <button class="apply-btn" data-name="A9. Berkeley Blue" data-c1="rgb(0,42,75)" data-c2="rgb(0,55,118)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(102,8,8), rgb(179,27,29));">A10. Cornell Carnelian</div>
  <div class="swatch-body">
    <div class="swatch-name">Cornell Carnelian</div>
    <code>rgb(179,27,29)</code>
    <div class="swatch-note"><ul><li>Warmer than Stanford</li><li>Distinctive Ivy red</li></ul></div>
    <button class="apply-btn" data-name="A10. Cornell Carnelian" data-c1="rgb(102,8,8)" data-c2="rgb(179,27,29)">▶ Apply</button>
  </div>
</div>

</div>

## B. Greens & Earth
{:.section-h}

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(26,56,40), rgb(46,85,56));">B1. Forest Green</div>
  <div class="swatch-body">
    <div class="swatch-name">Forest Green</div>
    <code>rgb(46,85,56)</code>
    <div class="swatch-note"><ul><li>Deep, earthy</li><li>Bio / neuroscience tone</li></ul></div>
    <button class="apply-btn" data-name="B1. Forest Green" data-c1="rgb(26,56,40)" data-c2="rgb(46,85,56)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(60,78,68), rgb(82,105,90));">B2. Sagebrush (Pantone)</div>
  <div class="swatch-body">
    <div class="swatch-name">Sagebrush Green</div>
    <code>rgb(82,105,90)</code>
    <div class="swatch-note"><ul><li>Soft sage / muted</li><li>Organic, calm</li></ul></div>
    <button class="apply-btn" data-name="B2. Sagebrush (Pantone)" data-c1="rgb(60,78,68)" data-c2="rgb(82,105,90)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(56,62,40), rgb(91,99,71));">B3. Olive Drab</div>
  <div class="swatch-body">
    <div class="swatch-name">Olive Drab</div>
    <code>rgb(91,99,71)</code>
    <div class="swatch-note"><ul><li>Muted yellow-green</li><li>Field-notebook feel</li></ul></div>
    <button class="apply-btn" data-name="B3. Olive Drab" data-c1="rgb(56,62,40)" data-c2="rgb(91,99,71)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(20,55,55), rgb(40,82,82));">B4. Pine Green</div>
  <div class="swatch-body">
    <div class="swatch-name">Pine Green</div>
    <code>rgb(40,82,82)</code>
    <div class="swatch-note"><ul><li>Cool, dense forest</li><li>Quiet authority</li></ul></div>
    <button class="apply-btn" data-name="B4. Pine Green" data-c1="rgb(20,55,55)" data-c2="rgb(40,82,82)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(86,68,32), rgb(120,98,55));">B5. Tobacco Brown</div>
  <div class="swatch-body">
    <div class="swatch-name">Tobacco Brown</div>
    <code>rgb(120,98,55)</code>
    <div class="swatch-note"><ul><li>Warm earthy brown</li><li>Library / archive feel</li></ul></div>
    <button class="apply-btn" data-name="B5. Tobacco Brown" data-c1="rgb(86,68,32)" data-c2="rgb(120,98,55)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(112,52,30), rgb(155,84,52));">B6. Terracotta</div>
  <div class="swatch-body">
    <div class="swatch-name">Terracotta</div>
    <code>rgb(155,84,52)</code>
    <div class="swatch-note"><ul><li>Warm clay-orange</li><li>Mediterranean / craft</li></ul></div>
    <button class="apply-btn" data-name="B6. Terracotta" data-c1="rgb(112,52,30)" data-c2="rgb(155,84,52)">▶ Apply</button>
  </div>
</div>

</div>

## C. Blues & Teals
{:.section-h}

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(14,74,84), rgb(20,94,108));">C1. Deep Teal</div>
  <div class="swatch-body">
    <div class="swatch-name">Deep Teal</div>
    <code>rgb(20,94,108)</code>
    <div class="swatch-note"><ul><li>Modern, mineral</li><li>Bridges blue and green</li></ul></div>
    <button class="apply-btn" data-name="C1. Deep Teal" data-c1="rgb(14,74,84)" data-c2="rgb(20,94,108)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(8,52,94), rgb(15,76,129));">C2. Pantone Classic Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Classic Blue (2020)</div>
    <code>rgb(15,76,129)</code>
    <div class="swatch-note"><ul><li>Pantone Color of the Year 2020</li><li>Trustworthy academic default</li></ul></div>
    <button class="apply-btn" data-name="C2. Pantone Classic Blue" data-c1="rgb(8,52,94)" data-c2="rgb(15,76,129)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(38,62,98), rgb(60,93,140));">C3. Indigo</div>
  <div class="swatch-body">
    <div class="swatch-name">Indigo</div>
    <code>rgb(60,93,140)</code>
    <div class="swatch-note"><ul><li>Slight purple cast in deep blue</li><li>Calm + intellectual</li></ul></div>
    <button class="apply-btn" data-name="C3. Indigo" data-c1="rgb(38,62,98)" data-c2="rgb(60,93,140)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(28,72,98), rgb(50,110,140));">C4. Steel Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Steel Blue</div>
    <code>rgb(50,110,140)</code>
    <div class="swatch-note"><ul><li>Industrial, balanced</li><li>Slightly desaturated</li></ul></div>
    <button class="apply-btn" data-name="C4. Steel Blue" data-c1="rgb(28,72,98)" data-c2="rgb(50,110,140)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(20,40,80), rgb(28,52,110));">C5. Midnight Navy</div>
  <div class="swatch-body">
    <div class="swatch-name">Midnight Navy</div>
    <code>rgb(28,52,110)</code>
    <div class="swatch-note"><ul><li>Near-black blue</li><li>High formality</li></ul></div>
    <button class="apply-btn" data-name="C5. Midnight Navy" data-c1="rgb(20,40,80)" data-c2="rgb(28,52,110)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(20,80,110), rgb(40,130,170));">C6. Aegean Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Aegean Blue</div>
    <code>rgb(40,130,170)</code>
    <div class="swatch-note"><ul><li>Mediterranean sea-blue</li><li>Lighter, more open</li></ul></div>
    <button class="apply-btn" data-name="C6. Aegean Blue" data-c1="rgb(20,80,110)" data-c2="rgb(40,130,170)">▶ Apply</button>
  </div>
</div>

</div>

## D. Reds, Purples, Warm
{:.section-h}

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(70,18,18), rgb(111,29,27));">D1. Burgundy</div>
  <div class="swatch-body">
    <div class="swatch-name">Burgundy / Wine</div>
    <code>rgb(111,29,27)</code>
    <div class="swatch-note"><ul><li>Warm, deep red</li><li>Authoritative, classical</li></ul></div>
    <button class="apply-btn" data-name="D1. Burgundy" data-c1="rgb(70,18,18)" data-c2="rgb(111,29,27)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(73,30,69), rgb(108,46,103));">D2. Plum</div>
  <div class="swatch-body">
    <div class="swatch-name">Plum</div>
    <code>rgb(108,46,103)</code>
    <div class="swatch-note"><ul><li>Deep purple-red</li><li>Distinctive without screaming</li></ul></div>
    <button class="apply-btn" data-name="D2. Plum" data-c1="rgb(73,30,69)" data-c2="rgb(108,46,103)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(66,53,98), rgb(95,75,139));">D3. Pantone Ultra Violet</div>
  <div class="swatch-body">
    <div class="swatch-name">Ultra Violet (2018)</div>
    <code>rgb(95,75,139)</code>
    <div class="swatch-note"><ul><li>Pantone Color of the Year 2018</li><li>Mystic, creative</li></ul></div>
    <button class="apply-btn" data-name="D3. Pantone Ultra Violet" data-c1="rgb(66,53,98)" data-c2="rgb(95,75,139)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(77,78,128), rgb(102,103,171));">D4. Pantone Very Peri</div>
  <div class="swatch-body">
    <div class="swatch-name">Very Peri (2022)</div>
    <code>rgb(102,103,171)</code>
    <div class="swatch-note"><ul><li>Pantone Color of the Year 2022</li><li>Periwinkle — calm + curious</li></ul></div>
    <button class="apply-btn" data-name="D4. Pantone Very Peri" data-c1="rgb(77,78,128)" data-c2="rgb(102,103,171)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(140,27,54), rgb(187,38,73));">D5. Pantone Viva Magenta</div>
  <div class="swatch-body">
    <div class="swatch-name">Viva Magenta (2023)</div>
    <code>rgb(187,38,73)</code>
    <div class="swatch-note"><ul><li>Pantone Color of the Year 2023</li><li>⚠ High intensity — strong statement</li></ul></div>
    <button class="apply-btn" data-name="D5. Pantone Viva Magenta" data-c1="rgb(140,27,54)" data-c2="rgb(187,38,73)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(128,89,77), rgb(164,120,100));">D6. Pantone Mocha Mousse</div>
  <div class="swatch-body">
    <div class="swatch-name">Mocha Mousse (2025)</div>
    <code>rgb(164,120,100)</code>
    <div class="swatch-note"><ul><li>Pantone Color of the Year 2025</li><li>Warm latte / café tone</li></ul></div>
    <button class="apply-btn" data-name="D6. Pantone Mocha Mousse" data-c1="rgb(128,89,77)" data-c2="rgb(164,120,100)">▶ Apply</button>
  </div>
</div>

</div>

## E. Neutrals & Monochrome
{:.section-h}

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(35,40,48), rgb(55,65,71));">E1. Charcoal Slate</div>
  <div class="swatch-body">
    <div class="swatch-name">Charcoal Slate</div>
    <code>rgb(55,65,71)</code>
    <div class="swatch-note"><ul><li>Cool monochrome</li><li>Minimal / editorial</li></ul></div>
    <button class="apply-btn" data-name="E1. Charcoal Slate" data-c1="rgb(35,40,48)" data-c2="rgb(55,65,71)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(40,42,40), rgb(64,66,62));">E2. Ink Black</div>
  <div class="swatch-body">
    <div class="swatch-name">Ink Black</div>
    <code>rgb(64,66,62)</code>
    <div class="swatch-note"><ul><li>Soft black, slight warmth</li><li>Newspaper / typographic</li></ul></div>
    <button class="apply-btn" data-name="E2. Ink Black" data-c1="rgb(40,42,40)" data-c2="rgb(64,66,62)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(85,82,76), rgb(120,116,108));">E3. Stone Gray</div>
  <div class="swatch-body">
    <div class="swatch-name">Stone Gray</div>
    <code>rgb(120,116,108)</code>
    <div class="swatch-note"><ul><li>Warm neutral gray</li><li>Architectural feel</li></ul></div>
    <button class="apply-btn" data-name="E3. Stone Gray" data-c1="rgb(85,82,76)" data-c2="rgb(120,116,108)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(105,100,90), rgb(143,135,120));">E4. Taupe</div>
  <div class="swatch-body">
    <div class="swatch-name">Taupe</div>
    <code>rgb(143,135,120)</code>
    <div class="swatch-note"><ul><li>Soft brown-gray</li><li>Quiet, sophisticated</li></ul></div>
    <button class="apply-btn" data-name="E4. Taupe" data-c1="rgb(105,100,90)" data-c2="rgb(143,135,120)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(111,113,115), rgb(147,149,151));">E5. Pantone Ultimate Gray</div>
  <div class="swatch-body">
    <div class="swatch-name">Ultimate Gray (2021)</div>
    <code>rgb(147,149,151)</code>
    <div class="swatch-note"><ul><li>Pantone Color of the Year 2021</li><li>True neutral</li></ul></div>
    <button class="apply-btn" data-name="E5. Pantone Ultimate Gray" data-c1="rgb(111,113,115)" data-c2="rgb(147,149,151)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(50,55,60), rgb(85,90,95));">E6. Graphite</div>
  <div class="swatch-body">
    <div class="swatch-name">Graphite</div>
    <code>rgb(85,90,95)</code>
    <div class="swatch-note"><ul><li>Pencil-lead gray</li><li>Neutral but with depth</li></ul></div>
    <button class="apply-btn" data-name="E6. Graphite" data-c1="rgb(50,55,60)" data-c2="rgb(85,90,95)">▶ Apply</button>
  </div>
</div>

</div>

## F. Asian-Inspired
{:.section-h}

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(20,52,82), rgb(35,82,116));">F1. Aizome (Japanese Indigo)</div>
  <div class="swatch-body">
    <div class="swatch-name">Aizome 藍染</div>
    <code>rgb(35,82,116)</code>
    <div class="swatch-note"><ul><li>Traditional Japanese indigo dye</li><li>Quiet, deep, time-tested</li></ul></div>
    <button class="apply-btn" data-name="F1. Aizome (Japanese Indigo)" data-c1="rgb(20,52,82)" data-c2="rgb(35,82,116)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(86,16,26), rgb(127,28,38));">F2. Korean Dancheong Red</div>
  <div class="swatch-body">
    <div class="swatch-name">Dancheong Red 단청</div>
    <code>rgb(127,28,38)</code>
    <div class="swatch-note"><ul><li>Traditional palace pillar red</li><li>Heritage, ceremonial</li></ul></div>
    <button class="apply-btn" data-name="F2. Korean Dancheong Red" data-c1="rgb(86,16,26)" data-c2="rgb(127,28,38)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(30,68,52), rgb(54,98,76));">F3. Cheong (Korean Blue-Green)</div>
  <div class="swatch-body">
    <div class="swatch-name">Cheong 청록</div>
    <code>rgb(54,98,76)</code>
    <div class="swatch-note"><ul><li>Korean palette blue-green hybrid</li><li>Calm, balanced</li></ul></div>
    <button class="apply-btn" data-name="F3. Cheong (Korean Blue-Green)" data-c1="rgb(30,68,52)" data-c2="rgb(54,98,76)">▶ Apply</button>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(76,40,36), rgb(120,68,60));">F4. Sumi Brown</div>
  <div class="swatch-body">
    <div class="swatch-name">Sumi Brown 墨</div>
    <code>rgb(120,68,60)</code>
    <div class="swatch-note"><ul><li>Asian-ink-on-paper brown</li><li>Calligraphic warmth</li></ul></div>
    <button class="apply-btn" data-name="F4. Sumi Brown" data-c1="rgb(76,40,36)" data-c2="rgb(120,68,60)">▶ Apply</button>
  </div>
</div>

</div>

---

### Notes

- **Currently applied**: A1. Slate Blue (`rgb(54,100,139)`) — change in `_config.yml` to commit a permanent switch.
- **Recommended for academic homepages**: A1, A2, A7, A9, C2, C5, B1, B4, E1, E6.
- **Strong / use sparingly**: A6 (Princeton Orange), D5 (Viva Magenta), B6 (Terracotta).
- **Pantone Color of the Year set**: B2 / C2 / D3 / D4 / D5 / D6 / E5 — all from official Pantone yearly palettes 2018–2025.

Tell me a code (e.g., **C2** or **F1**) and I'll commit it to `_config.yml`.
