// Lab page interactive canvases — Pixel Art, Flow Field, Cursor Blob, Glitch, CRT, Color Cycle
// Loaded globally with defer; self-inits on the lab page, SPA-safe.
(function () {
  'use strict';
  var rafIds = [];

  function raf(fn) {
    var id = requestAnimationFrame(function (ts) {
      var i = rafIds.indexOf(id); if (i > -1) rafIds.splice(i, 1);
      fn(ts);
    });
    rafIds.push(id); return id;
  }

  function cancelAll() {
    rafIds.forEach(function (id) { cancelAnimationFrame(id); });
    rafIds = [];
  }

  // Module-level callbacks for Lab Studio global text/color panel
  var _studio = { crtUpdate: null, pixelApply: null, setColor: null };
  document.addEventListener('lab:text-change', function (e) {
    if (!e.detail || !e.detail.text) return;
    if (_studio.crtUpdate) _studio.crtUpdate(e.detail.text);
    if (e.detail.action === 'apply' && _studio.pixelApply) _studio.pixelApply(e.detail.text);
  });
  document.addEventListener('lab:color-select', function (e) {
    if (e.detail && e.detail.hex && _studio.setColor) _studio.setColor(e.detail.hex);
  });

  var _studioSpeed = 1.0, _studioChaos = 0.3, _studioColor = null;
  document.addEventListener('lab:studio', function (e) {
    if (e.detail.kind === 'speed') _studioSpeed = Math.max(0.1, e.detail.value);
    if (e.detail.kind === 'chaos') _studioChaos = e.detail.value;
    if (e.detail.kind === 'color') _studioColor = e.detail.value;
  });

  function initLab() {
    if (!document.getElementById('pixel-canvas')) return;
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
        updatePaletteBtns();
        e.preventDefault();
      }, { passive: false });

      function updatePaletteBtns() {
        var btns = document.querySelectorAll('#pixel-palette-btns .lab-btn');
        btns.forEach(function (b) {
          b.classList.toggle('active', parseInt(b.dataset.pidx, 10) === colorIdx);
        });
      }
      document.querySelectorAll('#pixel-palette-btns .lab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          colorIdx = parseInt(btn.dataset.pidx, 10);
          updatePaletteBtns();
        });
      });

      var clearBtn = document.getElementById('pixel-clear-btn');
      if (clearBtn) clearBtn.addEventListener('click', function () { grid.fill(0); draw(); });

      // Shared stamp function — used by Enter key and Lab Studio Apply button
      function stampText(word) {
        word = ('' + word).slice(0, 14);
        var off = document.createElement('canvas');
        off.width = cols; off.height = rows;
        var oc = off.getContext('2d');
        var fs = Math.floor(rows * 0.75);
        oc.font = 'bold ' + fs + 'px monospace';
        while (oc.measureText(word).width > cols - 2 && fs > 3) { fs--; oc.font = 'bold ' + fs + 'px monospace'; }
        oc.fillStyle = '#fff'; oc.textAlign = 'center'; oc.textBaseline = 'middle';
        oc.fillText(word, cols / 2, rows / 2);
        var imgd = oc.getImageData(0, 0, cols, rows).data;
        var hexCol = parseInt(palette[colorIdx].slice(1), 16);
        for (var ry = 0; ry < rows; ry++) {
          for (var rx = 0; rx < cols; rx++) {
            if (imgd[(ry * cols + rx) * 4 + 3] > 128) grid[ry * cols + rx] = hexCol;
          }
        }
        draw();
      }

      // Text stamp input
      var pixelInput = document.getElementById('pixel-input');
      if (pixelInput) {
        pixelInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && pixelInput.value.trim()) {
            stampText(pixelInput.value.trim()); pixelInput.value = '';
          }
        });
      }

      // Register global handlers for Lab Studio
      _studio.pixelApply = stampText;
      _studio.setColor = function (hex) {
        var idx = palette.indexOf(hex);
        if (idx > -1) { colorIdx = idx; }
        else { palette[colorIdx] = hex; }
        updatePaletteBtns();
        // Refresh border color on active button
        var btns = document.querySelectorAll('#pixel-palette-btns .lab-btn');
        if (btns[colorIdx]) btns[colorIdx].style.borderColor = hex;
      };

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
        t += 0.005 * _studioSpeed;
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

      // Lab Studio text broadcast
      document.addEventListener('lab:text-change', function (e) {
        if (!e.detail || !e.detail.text) return;
        el.textContent = ('' + e.detail.text).toUpperCase().slice(0, 16);
        glitch(10);
      });
    })();

    // ─── 5. CRT Scanlines ───────────────────────────────────
    (function () {
      var c = document.getElementById('crt-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = c.width, H = c.height;

      var palettes = {
        phosphor: { bg: '#0a1a0a', fg: '#00ff66', scan: 'rgba(0,0,0,0.22)', glow: 'rgba(0,255,102,0.08)' },
        amber:    { bg: '#1a0e00', fg: '#ffb000', scan: 'rgba(0,0,0,0.18)', glow: 'rgba(255,176,0,0.07)' }
      };
      var palKey = 'phosphor';

      var defaultLines = ['> INIT SYSTEM', '> LOADING NEURAL NET...', '> PATTERN FOUND', '> OUTPUT READY', '> STANDBY_'];
      var userText = '';
      var lineIdx = 0, charIdx = 0, scanY = 0, last = 0;
      var composing = false;

      var crtInput = document.getElementById('crt-input');
      if (crtInput) {
        crtInput.addEventListener('compositionstart', function () { composing = true; });
        crtInput.addEventListener('compositionend', function () { composing = false; userText = crtInput.value; lineIdx = 0; charIdx = 0; });
        crtInput.addEventListener('input', function () { if (!composing) { userText = crtInput.value; lineIdx = 0; charIdx = 0; } });
      }

      // Register global handler for Lab Studio text broadcast
      _studio.crtUpdate = function (text) {
        userText = text; lineIdx = 0; charIdx = 0;
        if (crtInput) crtInput.value = text;
      };

      document.querySelectorAll('[data-crt]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          palKey = btn.dataset.crt;
          document.querySelectorAll('[data-crt]').forEach(function (b) { b.classList.toggle('active', b === btn); });
        });
      });

      function getLines() {
        if (userText.trim()) {
          var words = userText.trim().match(/.{1,30}(\s|$)/g) || [userText.trim()];
          return words.map(function (w) { return '> ' + w.trim(); });
        }
        return defaultLines;
      }

      function drawCRT(ts) {
        var pal = palettes[palKey];
        scanY = (scanY + 1.5 * _studioSpeed) % H;

        if (ts - last > 80) {
          last = ts;
          var lines = getLines();
          if (lineIdx < lines.length) {
            charIdx++;
            if (charIdx > lines[lineIdx].length) { charIdx = 0; lineIdx = Math.min(lineIdx + 1, lines.length - 1); }
          }
        }

        var lines = getLines();
        ctx.fillStyle = pal.bg; ctx.fillRect(0, 0, W, H);
        ctx.font = '13px monospace'; ctx.fillStyle = pal.fg;
        lines.slice(0, lineIdx + 1).forEach(function (l, i) {
          ctx.fillText(i < lineIdx ? l : l.slice(0, charIdx), 14, 30 + i * 22);
        });

        ctx.fillStyle = pal.scan;
        for (var y = 0; y < H; y += 2) ctx.fillRect(0, y, W, 1);

        var g = ctx.createLinearGradient(0, scanY - 6, 0, scanY + 6);
        g.addColorStop(0, pal.glow.replace('0.08', '0')); g.addColorStop(0.5, pal.glow); g.addColorStop(1, pal.glow.replace('0.08', '0'));
        ctx.fillStyle = g; ctx.fillRect(0, scanY - 6, W, 12);

        var v = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.8);
        v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)');
        ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);

        rafIds.push(requestAnimationFrame(drawCRT));
      }
      rafIds.push(requestAnimationFrame(drawCRT));
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
          b.h = (b.h + 0.4 * _studioSpeed) % 360;
          var squeeze = 1 + Math.sin(t * 2 + b.h) * 0.12;
          ctx.save(); ctx.translate(b.x, b.y); ctx.scale(squeeze, 1 / squeeze);
          var g = ctx.createRadialGradient(0, 0, 0, 0, 0, b.r);
          g.addColorStop(0, 'hsla(' + b.h + ',90%,75%,0.95)');
          g.addColorStop(0.6, 'hsla(' + b.h + ',80%,55%,0.7)');
          g.addColorStop(1, 'hsla(' + b.h + ',70%,35%,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, b.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        });
        t += 0.016 * _studioSpeed;
        rafIds.push(requestAnimationFrame(frame));
      }
      rafIds.push(requestAnimationFrame(frame));
    })();
  }

  window._initLab = initLab;

  document.addEventListener('hy-push-state-start', cancelAll);
  document.addEventListener('hy-push-state-after', function () {
    requestAnimationFrame(function () {
      if (document.getElementById('pixel-canvas')) initLab();
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { requestAnimationFrame(initLab); });
  } else {
    requestAnimationFrame(initLab);
  }
})();
