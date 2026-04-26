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

<script>
// Expose initLab globally so my-body.html SPA watcher can call it on navigation
(function () {
  var rafIds = [];

  function raf(fn) {
    var id = requestAnimationFrame(function(ts) {
      var i = rafIds.indexOf(id); if (i > -1) rafIds.splice(i, 1);
      fn(ts);
    });
    rafIds.push(id); return id;
  }

  function cancelAll() {
    rafIds.forEach(function (id) { cancelAnimationFrame(id); });
    rafIds = [];
  }

  function initLab() {
    cancelAll();

    // ─── 1. Pixel Art Canvas ──────────────────────────────
    (function () {
      var c = document.getElementById('pixel-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var SZ = 10;
      var cols = c.width / SZ, rows = c.height / SZ;
      var grid = new Uint32Array(cols * rows);
      var painting = false;
      var palette = ['#4aee88','#2e9955','#60c8a0','#3a88c0','#9a6adc','#ee6060','#f0c040','#88ddff','#ffffff'];
      var colorIdx = 0;

      function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        for (var i = 0; i < cols * rows; i++) {
          if (grid[i]) {
            ctx.fillStyle = '#' + grid[i].toString(16).padStart(6, '0');
            ctx.fillRect((i % cols) * SZ, Math.floor(i / cols) * SZ, SZ - 1, SZ - 1);
          }
        }
        ctx.strokeStyle = 'rgba(100,130,110,0.25)'; ctx.lineWidth = 0.5;
        for (var x = 0; x <= cols; x++) { ctx.beginPath(); ctx.moveTo(x * SZ, 0); ctx.lineTo(x * SZ, c.height); ctx.stroke(); }
        for (var y = 0; y <= rows; y++) { ctx.beginPath(); ctx.moveTo(0, y * SZ); ctx.lineTo(c.width, y * SZ); ctx.stroke(); }
      }
      function paint(e) {
        var r = c.getBoundingClientRect();
        var x = Math.floor((e.clientX - r.left) / SZ * (c.width / c.offsetWidth));
        var y = Math.floor((e.clientY - r.top) / SZ * (c.height / c.offsetHeight));
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          grid[y * cols + x] = parseInt(palette[colorIdx].slice(1), 16);
          draw();
        }
      }
      c.addEventListener('mousedown', function (e) { painting = true; paint(e); });
      c.addEventListener('mousemove', function (e) { if (painting) paint(e); });
      c.addEventListener('mouseup', function () { painting = false; });
      document.addEventListener('mouseup', function () { painting = false; });
      c.addEventListener('wheel', function (e) {
        colorIdx = (colorIdx + (e.deltaY > 0 ? 1 : -1) + palette.length) % palette.length;
        e.preventDefault();
      }, { passive: false });
      draw();
    })();

    // ─── 2. Flow Field ──────────────────────────────────────
    (function () {
      var c = document.getElementById('flow-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = c.width, H = c.height;
      var N = 200, particles = [], t = 0;
      function noise(x, y, z) { var s = x + y * 79.3 + z * 197.7; return Math.sin(s * 0.1 + Math.cos(s * 0.07)) * 0.5 + 0.5; }
      function reset(p) { p.x = Math.random() * W; p.y = Math.random() * H; p.life = Math.random() * 80 + 40; p.age = 0; }
      for (var i = 0; i < N; i++) { var p = {}; reset(p); particles.push(p); }
      ctx.fillStyle = '#0d1510'; ctx.fillRect(0, 0, W, H);
      function frame() {
        ctx.fillStyle = 'rgba(13,21,16,0.12)'; ctx.fillRect(0, 0, W, H);
        for (var j = 0; j < particles.length; j++) {
          var pp = particles[j];
          var angle = noise(pp.x / 60, pp.y / 60, t) * Math.PI * 4;
          var nx = pp.x + Math.cos(angle) * 1.2, ny = pp.y + Math.sin(angle) * 1.2;
          var hue = 120 + noise(pp.x / 80, pp.y / 80, t + 10) * 80;
          var alpha = Math.sin(pp.age / pp.life * Math.PI) * 0.85;
          ctx.strokeStyle = 'hsla(' + hue + ',70%,60%,' + alpha + ')'; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(pp.x, pp.y); ctx.lineTo(nx, ny); ctx.stroke();
          pp.x = nx; pp.y = ny; pp.age++;
          if (pp.age > pp.life || pp.x < 0 || pp.x > W || pp.y < 0 || pp.y > H) reset(pp);
        }
        t += 0.005;
        rafIds.push(requestAnimationFrame(frame));
      }
      c.addEventListener('click', function () { ctx.fillStyle = '#0d1510'; ctx.fillRect(0, 0, W, H); particles.forEach(reset); });
      rafIds.push(requestAnimationFrame(frame));
    })();

    // ─── 3. Cursor Blob ─────────────────────────────────────
    (function () {
      var c = document.getElementById('blob-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = c.width, H = c.height;
      var blobs = [
        { x: W / 2, y: H / 2, vx: 0.8, vy: 0.5, r: 55, hue: 260 },
        { x: W * 0.3, y: H * 0.4, vx: -0.5, vy: 0.7, r: 40, hue: 200 },
        { x: W * 0.7, y: H * 0.6, vx: 0.3, vy: -0.6, r: 45, hue: 300 }
      ];
      var mx = -999, my = -999;
      c.addEventListener('mousemove', function (e) { var r = c.getBoundingClientRect(); mx = (e.clientX - r.left) * (W / c.offsetWidth); my = (e.clientY - r.top) * (H / c.offsetHeight); });
      c.addEventListener('mouseleave', function () { mx = -999; my = -999; });
      function frame() {
        ctx.fillStyle = '#0d0d1a'; ctx.fillRect(0, 0, W, H);
        blobs.forEach(function (b) {
          b.x += b.vx; b.y += b.vy;
          if (b.x < b.r || b.x > W - b.r) b.vx *= -1;
          if (b.y < b.r || b.y > H - b.r) b.vy *= -1;
          if (mx > 0) { var dx = mx - b.x, dy = my - b.y, d = Math.sqrt(dx * dx + dy * dy); if (d < 150) { b.vx += dx / d * 0.05; b.vy += dy / d * 0.05; } }
          var spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy); if (spd > 2) { b.vx = b.vx / spd * 2; b.vy = b.vy / spd * 2; }
          var g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0, 'hsla(' + b.hue + ',80%,70%,0.9)'); g.addColorStop(1, 'hsla(' + b.hue + ',80%,50%,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
          b.hue += 0.3;
        });
        rafIds.push(requestAnimationFrame(frame));
      }
      rafIds.push(requestAnimationFrame(frame));
    })();

    // ─── 4. Glitch Text ─────────────────────────────────────
    (function () {
      var box = document.getElementById('glitch-box');
      var el = document.getElementById('glitch-text');
      if (!box || !el) return;
      var words = ['NEURAL', 'SIGNAL', 'CORTEX', 'SYNAPSE', 'LATENT', 'DIFFUSE', 'EMBED'];
      var wordIdx = 0, glitching = false;
      var chars = '!@#$%^&*<>?/|\\~`';
      function glitch(duration) {
        if (glitching) return; glitching = true;
        var orig = el.textContent; var frames = 0;
        var id = setInterval(function () {
          if (frames++ > duration * 3) { clearInterval(id); el.textContent = orig; el.style.color = '#fff'; el.style.transform = ''; glitching = false; return; }
          var s = ''; for (var i = 0; i < orig.length; i++) s += Math.random() < 0.3 ? chars[Math.floor(Math.random() * chars.length)] : orig[i];
          el.textContent = s; el.style.color = 'hsl(' + (Math.random() * 60 + 160) + ',90%,70%)';
          el.style.transform = 'translateX(' + ((Math.random() - 0.5) * 8) + 'px) skewX(' + ((Math.random() - 0.5) * 5) + 'deg)';
        }, 50);
      }
      box.addEventListener('click', function () { wordIdx = (wordIdx + 1) % words.length; el.textContent = words[wordIdx]; glitch(15); });
      box.addEventListener('mouseenter', function () { glitch(8); });
    })();

    // ─── 5. CRT Scanlines ───────────────────────────────────
    (function () {
      var c = document.getElementById('crt-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = c.width, H = c.height;
      var text = ['> INIT SYSTEM', '> LOADING...', '> NEURAL NET ACTIVE', '> PATTERN FOUND', '> OUTPUT READY'];
      var lineIdx = 0, charIdx = 0, scanY = 0, last = 0;
      function drawText() {
        ctx.fillStyle = '#0a1a0a'; ctx.fillRect(0, 0, W, H);
        ctx.font = '13px monospace'; ctx.fillStyle = '#00ff66';
        text.slice(0, lineIdx + 1).forEach(function (l, i) {
          ctx.fillText(i < lineIdx ? l : l.slice(0, charIdx), 14, 30 + i * 22);
        });
        ctx.fillStyle = 'rgba(0,0,0,0.22)';
        for (var y = 0; y < H; y += 2) ctx.fillRect(0, y, W, 1);
        var g = ctx.createLinearGradient(0, scanY - 6, 0, scanY + 6);
        g.addColorStop(0, 'rgba(0,255,102,0)'); g.addColorStop(0.5, 'rgba(0,255,102,0.08)'); g.addColorStop(1, 'rgba(0,255,102,0)');
        ctx.fillStyle = g; ctx.fillRect(0, scanY - 6, W, 12);
        var v = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.8);
        v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)');
        ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
      }
      function frame(ts) {
        scanY = (scanY + 1.5) % H;
        if (ts - last > 80) {
          last = ts;
          if (lineIdx < text.length) { charIdx++; if (charIdx > text[lineIdx].length) { charIdx = 0; lineIdx = Math.min(lineIdx + 1, text.length - 1); } }
        }
        drawText();
        rafIds.push(requestAnimationFrame(frame));
      }
      rafIds.push(requestAnimationFrame(frame));
    })();

    // ─── 6. Color Cycle ─────────────────────────────────────
    (function () {
      var c = document.getElementById('lava-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = c.width, H = c.height;
      var blobs = [
        { x: W * 0.3, y: H * 0.5, vx: 0.6, vy: -0.4, r: 50, h: 0 },
        { x: W * 0.7, y: H * 0.4, vx: -0.4, vy: 0.7, r: 40, h: 120 },
        { x: W * 0.5, y: H * 0.7, vx: 0.3, vy: -0.5, r: 45, h: 240 }
      ];
      var t = 0;
      c.addEventListener('click', function (e) {
        var r = c.getBoundingClientRect();
        blobs.push({ x: (e.clientX - r.left) * (W / c.offsetWidth), y: (e.clientY - r.top) * (H / c.offsetHeight), vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5, r: 30 + Math.random() * 25, h: Math.random() * 360 });
      });
      function frame() {
        ctx.fillStyle = '#10101a'; ctx.fillRect(0, 0, W, H);
        blobs.forEach(function (b) {
          b.x += b.vx; b.y += b.vy;
          if (b.x < b.r || b.x > W - b.r) b.vx *= -1;
          if (b.y < b.r || b.y > H - b.r) b.vy *= -1;
          b.h = (b.h + 0.4) % 360;
          var squeeze = 1 + Math.sin(t * 2 + b.h) * 0.12;
          ctx.save(); ctx.translate(b.x, b.y); ctx.scale(squeeze, 1 / squeeze);
          var g = ctx.createRadialGradient(0, 0, 0, 0, 0, b.r);
          g.addColorStop(0, 'hsla(' + b.h + ',90%,75%,0.95)');
          g.addColorStop(0.6, 'hsla(' + b.h + ',80%,55%,0.7)');
          g.addColorStop(1, 'hsla(' + b.h + ',70%,35%,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, b.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        });
        t += 0.016;
        rafIds.push(requestAnimationFrame(frame));
      }
      rafIds.push(requestAnimationFrame(frame));
    })();
  } // end initLab()

  // Expose globally for my-body.html SPA watcher
  window._initLab = initLab;

  // Cancel RAF loops when navigating away (SPA)
  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', cancelAll);
    _ps.addEventListener('hy-push-state-after', function () {
      if (document.getElementById('pixel-canvas')) initLab();
    });
  }

  // Initial page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLab);
  } else {
    initLab();
  }
})();
</script>
