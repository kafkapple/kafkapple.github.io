// Design Trends interactive demos — Flow Field, Kinetic Type, Neo-Brutalism, Swiss Grid, Bauhaus
// Loaded globally with defer; self-inits on the trends page, SPA-safe.
// Guard: #ktype-demo (unique to trends page; avoids #flow-canvas collision with lab page)
(function () {
  'use strict';
  var _rafIds = [];
  function cancelAll() { _rafIds.forEach(function (id) { cancelAnimationFrame(id); }); _rafIds = []; }
  function raf(fn) {
    var id = requestAnimationFrame(function () {
      var i = _rafIds.indexOf(id); if (i > -1) _rafIds.splice(i, 1);
      fn();
    });
    _rafIds.push(id); return id;
  }

  /* ── util ─────────────────────────────────────── */
  function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    var a = s * Math.min(l, 1 - l);
    var f = function (n) { return l - a * Math.max(-1, Math.min(((n + h / 30) % 12) - 3, Math.min(9 - (n + h / 30) % 12, 1))); };
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  }

  /* ══════════════════════════════════════════════
     1. FLOW FIELD
  ══════════════════════════════════════════════ */
  function initFlow() {
    var canvas = document.getElementById('flow-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.offsetWidth || 600, H = 200;
    canvas.width = W; canvas.height = H;

    var paused = false;
    var t = Math.random() * 1000, seed = Math.random() * 500;
    var trailLen = 8, spd = 4;
    var N = Math.min(2000, Math.floor(W * H / 60));
    var px = new Float32Array(N), py = new Float32Array(N), age = new Float32Array(N);
    var maxAge = 120;
    var palette = [[46,120,80],[90,180,120],[180,220,160],[30,80,50],[120,200,150],[200,240,210]];

    function resetP(i) { px[i] = Math.random() * W; py[i] = Math.random() * H; age[i] = Math.random() * maxAge; }
    for (var i = 0; i < N; i++) resetP(i);

    function noiseAng(x, y, tt) {
      var nx = x / W * 4 + seed, ny = y / H * 4 + seed;
      return (Math.sin(nx * 1.7 + tt * 0.3) + Math.cos(ny * 1.3 - tt * 0.2) + Math.sin((nx + ny) * 0.8 + tt * 0.5)) * Math.PI;
    }

    function frame() {
      if (!paused) {
        t += 0.008 * spd;
        var alpha = 0.005 + 0.03 / trailLen;
        ctx.fillStyle = 'rgba(18,28,20,' + alpha + ')';
        ctx.fillRect(0, 0, W, H);
        ctx.lineWidth = 0.8;
        for (var i = 0; i < N; i++) {
          var ang = noiseAng(px[i], py[i], t);
          var vx = Math.cos(ang) * spd * 0.4, vy = Math.sin(ang) * spd * 0.4;
          var nx2 = px[i] + vx, ny2 = py[i] + vy;
          age[i]++;
          var lr = age[i] / maxAge;
          var c = palette[Math.floor(lr * palette.length) % palette.length];
          var a2 = Math.sin(lr * Math.PI) * 0.45;
          ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a2 + ')';
          ctx.beginPath(); ctx.moveTo(px[i], py[i]); ctx.lineTo(nx2, ny2); ctx.stroke();
          px[i] = nx2; py[i] = ny2;
          if (age[i] > maxAge || nx2 < 0 || nx2 > W || ny2 < 0 || ny2 > H) resetP(i);
        }
      }
      raf(frame);
    }
    ctx.fillStyle = '#121c14'; ctx.fillRect(0, 0, W, H);
    raf(frame);

    document.getElementById('flow-pause').onclick = function () {
      paused = !paused; this.textContent = paused ? 'Resume' : 'Pause';
    };
    document.getElementById('flow-regen').onclick = function () {
      seed = Math.random() * 500; t = Math.random() * 1000;
      ctx.fillStyle = '#121c14'; ctx.fillRect(0, 0, W, H);
      for (var i = 0; i < N; i++) resetP(i);
    };
    document.getElementById('flow-trail').oninput = function () {
      trailLen = +this.value; document.getElementById('flow-trail-v').textContent = this.value;
    };
    document.getElementById('flow-speed').oninput = function () {
      spd = +this.value; document.getElementById('flow-speed-v').textContent = this.value;
    };
  }

  /* ══════════════════════════════════════════════
     2. KINETIC TYPOGRAPHY
  ══════════════════════════════════════════════ */
  function initKtype() {
    var demo = document.getElementById('ktype-demo');
    if (!demo) return;
    var phrases = [
      ['Design', 'is', 'Thinking'],
      ['Form', 'Follows', 'Function'],
      ['Grid', 'Systems', 'Rule'],
      ['White', 'Space', 'Breathes'],
      ['Type', 'is', 'Voice']
    ];
    var colors = ['#f7c948', '#60c8a0', '#f26b5b', '#7ec8e3', '#c8a0f7'];
    var wi = 0, mode = 'repel', mx = -999, my = -999;

    function build() {
      demo.innerHTML = '';
      phrases[wi].forEach(function (word, wIdx) {
        var wEl = document.createElement('span');
        wEl.className = 'ktype-word';
        word.split('').forEach(function (ch) {
          var s = document.createElement('span');
          s.className = 'ktype-char';
          s.textContent = ch;
          s.style.color = colors[wIdx % colors.length];
          s.style.transition = 'transform 0.18s cubic-bezier(.34,1.56,.64,1)';
          wEl.appendChild(s);
        });
        demo.appendChild(wEl);
      });
    }
    build();

    function animFrame() {
      var chars = demo.querySelectorAll('.ktype-char');
      var demoRect = demo.getBoundingClientRect();
      chars.forEach(function (ch, idx) {
        var r = ch.getBoundingClientRect();
        var cx = r.left + r.width / 2 - demoRect.left;
        var cy = r.top + r.height / 2 - demoRect.top;
        var dx = cx - mx, dy = cy - my;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var tx = 0, ty = 0, sc = 1;
        if (mode === 'repel' && dist < 80 && dist > 0) {
          var f = (1 - dist / 80);
          tx = dx / dist * f * 32; ty = dy / dist * f * 32; sc = 1 + f * 0.3;
        } else if (mode === 'wave') {
          ty = Math.sin(Date.now() / 200 + idx * 0.45) * 9;
        }
        ch.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + sc + ')';
      });
      raf(animFrame);
    }
    raf(animFrame);

    demo.addEventListener('mousemove', function (e) {
      var r = demo.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
    });
    demo.addEventListener('mouseleave', function () { mx = -999; my = -999; });

    document.getElementById('ktype-next').onclick = function () { wi = (wi + 1) % phrases.length; build(); };
    document.getElementById('ktype-mode').onclick = function () {
      mode = mode === 'repel' ? 'wave' : 'repel';
      this.textContent = 'Mode: ' + (mode === 'repel' ? 'Repel' : 'Wave');
      mx = -999; my = -999;
    };
  }

  /* ══════════════════════════════════════════════
     3. NEO-BRUTALISM / GLASSMORPHISM
  ══════════════════════════════════════════════ */
  function initNeobru() {
    var card = document.getElementById('neo-card');
    var cont = document.getElementById('neobru-demo');
    var accentEl = document.getElementById('neo-accent');
    if (!card || !cont) return;

    var dragging = false, sx, sy, ox, oy;
    card.addEventListener('mousedown', function (e) {
      dragging = true; card.classList.add('dragging');
      sx = e.clientX; sy = e.clientY; ox = card.offsetLeft; oy = card.offsetTop; e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var mxL = Math.max(0, Math.min(cont.offsetWidth - card.offsetWidth - 10, ox + e.clientX - sx));
      var myL = Math.max(0, Math.min(cont.offsetHeight - card.offsetHeight - 10, oy + e.clientY - sy));
      card.style.left = mxL + 'px'; card.style.top = myL + 'px';
    });
    document.addEventListener('mouseup', function () { dragging = false; card.classList.remove('dragging'); });

    var accents = ['#f7c948', '#f26b5b', '#60c8a0', '#7ec8e3', '#c8a0f7', '#f0a06a'], ai = 0;
    var neoMode = true;

    document.getElementById('neo-accent-btn').onclick = function () {
      ai = (ai + 1) % accents.length; accentEl.style.background = accents[ai];
    };
    document.getElementById('neo-mode-btn').onclick = function () {
      neoMode = !neoMode;
      if (neoMode) {
        this.textContent = 'Toggle: Neo-Bru';
        cont.style.background = '#f5f5f5';
        card.style.cssText = 'position:absolute;width:160px;padding:1em 1.1em;background:#fff;border:2.5px solid #111;box-shadow:6px 6px 0 #111;border-radius:2px;cursor:grab;user-select:none;font-size:0.85em;font-weight:700;left:' + card.style.left + ';top:' + card.style.top;
        accentEl.style.display = 'block';
        card.querySelectorAll('div').forEach(function (d) { d.style.color = ''; });
      } else {
        this.textContent = 'Toggle: Glassmorphism';
        cont.style.background = 'linear-gradient(135deg,#6a11cb,#2575fc,#f093fb)';
        card.style.background = 'rgba(255,255,255,0.15)';
        card.style.border = '1px solid rgba(255,255,255,0.35)';
        card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
        card.style.borderRadius = '12px';
        card.style.backdropFilter = 'blur(14px)';
        card.style.webkitBackdropFilter = 'blur(14px)';
        accentEl.style.display = 'none';
        card.querySelectorAll('div').forEach(function (d) { d.style.color = 'rgba(255,255,255,0.9)'; });
      }
    };
  }

  /* ══════════════════════════════════════════════
     4. SWISS GRID
  ══════════════════════════════════════════════ */
  function initSwiss() {
    var canvas = document.getElementById('swiss-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.offsetWidth || 600, H = 240;
    canvas.width = W; canvas.height = H;

    var cols = 6, gutterPct = 8, blocks = [];
    var blockColors = ['#e8ede9', '#d0dbd1', '#b8cbb9', '#94b896', '#6aab6e', '#4a9050'];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      var gutter = W * gutterPct / 100;
      var colW = (W - gutter * (cols + 1)) / cols;

      blocks.forEach(function (b) {
        var x = gutter + b.col * (colW + gutter);
        var sw = b.span * colW + (b.span - 1) * gutter;
        ctx.fillStyle = b.color; ctx.fillRect(x, b.y, sw, b.h);
        ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText('Col ' + (b.col + 1), x + 4, b.y + 14);
      });

      for (var c = 0; c < cols; c++) {
        var x2 = gutter + c * (colW + gutter);
        ctx.fillStyle = 'rgba(46,85,56,0.07)'; ctx.fillRect(x2, 0, colW, H);
        ctx.strokeStyle = 'rgba(46,85,56,0.22)'; ctx.lineWidth = 0.5;
        ctx.strokeRect(x2, 0, colW, H);
      }
      var bl = 24;
      ctx.strokeStyle = 'rgba(200,150,60,0.2)'; ctx.lineWidth = 0.5; ctx.setLineDash([3, 5]);
      for (var y2 = bl; y2 < H; y2 += bl) {
        ctx.beginPath(); ctx.moveTo(0, y2); ctx.lineTo(W, y2); ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(46,85,56,0.55)'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
      for (var c2 = 0; c2 < cols; c2++) {
        ctx.fillText(c2 + 1, gutter + c2 * (colW + gutter) + colW / 2, H - 3);
      }
      ctx.textAlign = 'left';
    }

    canvas.addEventListener('click', function (e) {
      var r = canvas.getBoundingClientRect();
      var mx = (e.clientX - r.left) * W / r.width;
      var my = (e.clientY - r.top) * H / r.height;
      var gutter = W * gutterPct / 100, colW = (W - gutter * (cols + 1)) / cols;
      var col = Math.floor((mx - gutter) / (colW + gutter));
      if (col < 0 || col >= cols) return;
      var span = Math.min(2, cols - col);
      var h = 24 * (1 + Math.floor(Math.random() * 3));
      var baseY = Math.floor(my / 24) * 24;
      blocks.push({ col: col, y: baseY, span: span, h: h, color: blockColors[blocks.length % blockColors.length] });
      draw();
    });

    document.getElementById('swiss-cols').oninput = function () {
      cols = +this.value; document.getElementById('swiss-cols-v').textContent = cols; draw();
    };
    document.getElementById('swiss-gutter').oninput = function () {
      gutterPct = +this.value; document.getElementById('swiss-gutter-v').textContent = gutterPct; draw();
    };
    document.getElementById('swiss-clear').onclick = function () { blocks = []; draw(); };
    draw();
  }

  /* ══════════════════════════════════════════════
     5. BAUHAUS COLOR WHEEL
  ══════════════════════════════════════════════ */
  function initBauhaus() {
    var canvas = document.getElementById('bauhaus-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.offsetWidth || 600, H = 240;
    canvas.width = W; canvas.height = H;

    var CX = Math.min(W * 0.33, 100), CY = H / 2, R = Math.min(CX, CY) - 16;
    var selHue = 0, mode = 'complementary';

    var modeBtn = { comp: 'complementary', tri: 'triadic', ana: 'analogous', split: 'split' };
    function getHues(h) {
      if (mode === 'complementary') return [h, (h + 180) % 360];
      if (mode === 'triadic') return [h, (h + 120) % 360, (h + 240) % 360];
      if (mode === 'analogous') return [h, (h + 30) % 360, (h + 60) % 360, (h + 330) % 360];
      if (mode === 'split') return [h, (h + 150) % 360, (h + 210) % 360];
      return [h];
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, W, H);

      for (var i = 0; i < 360; i++) {
        var sa = (i - 90) * Math.PI / 180, ea = (i - 89) * Math.PI / 180 + 0.01;
        ctx.beginPath(); ctx.moveTo(CX, CY); ctx.arc(CX, CY, R, sa, ea); ctx.closePath();
        ctx.fillStyle = 'hsl(' + i + ',78%,55%)'; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(CX, CY, R * 0.33, 0, Math.PI * 2);
      ctx.fillStyle = '#fafafa'; ctx.fill();
      ctx.fillStyle = '#888'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('click', CX, CY); ctx.fillText('wheel', CX, CY + 11); ctx.textAlign = 'left';

      var hues = getHues(selHue), dotR = R * 0.72;
      var h0ang = (hues[0] - 90) * Math.PI / 180;
      var x0 = CX + Math.cos(h0ang) * dotR, y0 = CY + Math.sin(h0ang) * dotR;

      hues.forEach(function (h, idx) {
        var ang = (h - 90) * Math.PI / 180;
        var dx = CX + Math.cos(ang) * dotR, dy = CY + Math.sin(ang) * dotR;
        if (idx > 0) {
          ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(dx, dy);
          ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(dx, dy, idx === 0 ? 10 : 7, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#fff' : 'rgba(255,255,255,0.7)'; ctx.fill();
        ctx.strokeStyle = '#222'; ctx.lineWidth = idx === 0 ? 2 : 1.2; ctx.stroke();
      });

      var swX = CX * 2 + 24, swW = W - swX - 16;
      if (swW > 30) {
        var swH = Math.min(48, (H - 24) / hues.length);
        hues.forEach(function (h, idx) {
          var y = 12 + idx * (swH + 6);
          var rgb = hslToRgb(h, 75, 55);
          ctx.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
          ctx.fillRect(swX, y, swW, swH);
          ctx.strokeStyle = '#ddd'; ctx.lineWidth = 0.5; ctx.strokeRect(swX, y, swW, swH);
          ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.font = 'bold 11px monospace';
          ctx.fillText(h + '°', swX + 5, y + swH - 5);
        });
        ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
        ctx.fillText(mode, swX, H - 4);
      }
    }

    canvas.addEventListener('click', function (e) {
      var r = canvas.getBoundingClientRect();
      var mx = (e.clientX - r.left) * W / r.width - CX, my = (e.clientY - r.top) * H / r.height - CY;
      var dist = Math.sqrt(mx * mx + my * my);
      if (dist < R * 0.33 || dist > R) return;
      selHue = (Math.round(Math.atan2(my, mx) * 180 / Math.PI + 90 + 360)) % 360;
      draw();
    });

    Object.keys(modeBtn).forEach(function (id) {
      var btn = document.getElementById('bauhaus-' + id);
      if (!btn) return;
      btn.onclick = function () {
        mode = modeBtn[id];
        Object.keys(modeBtn).forEach(function (k) {
          var b = document.getElementById('bauhaus-' + k);
          if (b) b.className = (k === id) ? 'tbtn' : 'tbtn sec';
        });
        draw();
      };
    });
    draw();
  }

  /* ══════════════════════════════════════════════
     BOOT + SPA WIRING
     Guard: #ktype-demo is unique to the trends page
     (#flow-canvas also exists on lab page — do NOT use as guard)
  ══════════════════════════════════════════════ */
  function initAll() {
    if (!document.getElementById('ktype-demo')) return;
    cancelAll();
    initFlow();
    initKtype();
    initNeobru();
    initSwiss();
    initBauhaus();
  }

  // Expose globally
  window._initTrends = initAll;

  // SPA wiring
  var ps = document.getElementById('_pushState');
  if (ps) {
    ps.addEventListener('hy-push-state-start', cancelAll);
    ps.addEventListener('hy-push-state-after', function () {
      requestAnimationFrame(function () {
        if (document.getElementById('ktype-demo')) initAll();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
