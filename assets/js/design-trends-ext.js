// Design Trends Extension — Demo 6: Cyberpunk/Matrix Rain · Demo 7: 8-bit/Pixel Art
// Guard: #matrix-design-canvas (unique to trends page; avoids collision with #matrix-rain-canvas in lab)
// SPA-safe: independent IIFE with own RAF tracking and hy-push-state-* listeners.
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

  /* ═══════════════════════════════════════════════════════════
     6. CYBERPUNK / MATRIX RAIN
  ═══════════════════════════════════════════════════════════ */
  function initMatrixDesign() {
    var canvas = document.getElementById('matrix-design-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.offsetWidth || 600, H = 240;
    canvas.width = W; canvas.height = H;

    var FS = 15;
    var cols = Math.floor(W / FS);
    var drops = new Float32Array(cols);
    var chars = 'ウエオカキクケコサシスタチツテナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン012345689ABCDEF<>{}[]';
    var speed = 1, paused = false;

    for (var i = 0; i < cols; i++) drops[i] = -Math.random() * (H / FS);

    function frame() {
      if (!paused) {
        ctx.fillStyle = 'rgba(0,0,0,0.055)'; ctx.fillRect(0, 0, W, H);
        for (var i = 0; i < cols; i++) {
          var bright = Math.random() > 0.96;
          ctx.font = FS + 'px monospace';
          ctx.fillStyle = bright ? '#ccffcc' : '#00c853';
          ctx.shadowColor = bright ? '#00ff41' : 'transparent';
          ctx.shadowBlur = bright ? 8 : 0;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * FS, drops[i] * FS);
          ctx.shadowBlur = 0;
          if (drops[i] * FS > H && Math.random() > 0.972) drops[i] = 0;
          drops[i] += speed * 0.45;
        }
      }
      raf(frame);
    }
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    raf(frame);

    var pauseBtn = document.getElementById('mxd-pause');
    var spdRng = document.getElementById('mxd-speed');
    var spdV = document.getElementById('mxd-speed-v');
    if (pauseBtn) pauseBtn.onclick = function () {
      paused = !paused; this.textContent = paused ? 'Resume' : 'Pause';
    };
    if (spdRng) spdRng.oninput = function () {
      speed = +this.value; if (spdV) spdV.textContent = this.value;
    };
  }

  /* ═══════════════════════════════════════════════════════════
     7. 8-BIT / PIXEL ART ERA
  ═══════════════════════════════════════════════════════════ */
  function initPixelDesign() {
    var canvas = document.getElementById('pixel-design-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.offsetWidth || 600, H = 240;
    canvas.width = W; canvas.height = H;

    // NES-inspired 16-colour palette
    var palette = ['#0f380f','#306230','#8bac0f','#9bbc0f','#fff9e0','#cccccc','#7a7a7a','#111111',
                   '#e4000f','#f87820','#f8b820','#0058f8','#3cbcfc','#00a844','#58d854','#c84800'];
    var colorIdx = 2;
    var SZ = 14;
    var cols = Math.floor(W / SZ), rows = Math.floor(H / SZ);
    var grid = new Uint8Array(cols * rows);
    var painting = false, lastIdx = -1;

    function cityscape() {
      grid.fill(0);
      for (var cx = 0; cx < cols; cx++) {
        var bh = 2 + Math.floor(Math.random() * Math.min(rows - 4, 9));
        var base = rows - bh;
        var bc = [1, 6, 7][Math.floor(Math.random() * 3)];
        for (var cy = base; cy < rows; cy++) {
          grid[cy * cols + cx] = bc;
          if (cy > base && cy < rows - 1 && Math.random() > 0.62)
            grid[cy * cols + cx] = Math.random() > 0.55 ? 2 : 13;
        }
      }
    }
    cityscape();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0a0a12'; ctx.fillRect(0, 0, W, H);
      for (var i = 0; i < cols * rows; i++) {
        if (grid[i]) {
          ctx.fillStyle = palette[grid[i]];
          ctx.fillRect((i % cols) * SZ, Math.floor(i / cols) * SZ, SZ - 1, SZ - 1);
        }
      }
    }

    function cellAt(e) {
      var r = canvas.getBoundingClientRect();
      return {
        c: Math.floor((e.clientX - r.left) * W / r.width / SZ),
        r: Math.floor((e.clientY - r.top) * H / r.height / SZ)
      };
    }

    canvas.addEventListener('mousedown', function (e) {
      painting = true;
      var p = cellAt(e);
      if (p.c >= 0 && p.c < cols && p.r >= 0 && p.r < rows) {
        var idx = p.r * cols + p.c;
        grid[idx] = colorIdx; lastIdx = idx; draw();
      }
      e.preventDefault();
    });
    canvas.addEventListener('mousemove', function (e) {
      if (!painting) return;
      var p = cellAt(e);
      if (p.c >= 0 && p.c < cols && p.r >= 0 && p.r < rows) {
        var idx = p.r * cols + p.c;
        if (idx !== lastIdx) { grid[idx] = colorIdx; lastIdx = idx; draw(); }
      }
    });
    document.addEventListener('mouseup', function () { painting = false; });

    // Build palette swatches
    var palDiv = document.getElementById('pixel-d-palette');
    if (palDiv) {
      palette.forEach(function (c, i) {
        var b = document.createElement('button');
        b.style.cssText = 'width:18px;height:18px;background:' + c +
          ';border:2px solid ' + (i === colorIdx ? '#fff' : 'rgba(255,255,255,0.15)') +
          ';border-radius:2px;cursor:pointer;padding:0;flex-shrink:0;';
        b.onclick = function () {
          colorIdx = i;
          palDiv.querySelectorAll('button').forEach(function (x, xi) {
            x.style.borderColor = xi === i ? '#fff' : 'rgba(255,255,255,0.15)';
          });
        };
        palDiv.appendChild(b);
      });
    }

    var clearBtn = document.getElementById('pixel-d-clear');
    var resetBtn = document.getElementById('pixel-d-reset');
    if (clearBtn) clearBtn.onclick = function () { grid.fill(0); draw(); };
    if (resetBtn) resetBtn.onclick = function () { cityscape(); draw(); };

    draw();
  }

  /* ═══════════════════════════════════════════════════════════
     BOOT + SPA WIRING
  ═══════════════════════════════════════════════════════════ */
  function initAll() {
    if (!document.getElementById('matrix-design-canvas')) return;
    cancelAll();
    initMatrixDesign();
    initPixelDesign();
  }

  var ps = document.getElementById('_pushState');
  if (ps) {
    ps.addEventListener('hy-push-state-start', cancelAll);
    ps.addEventListener('hy-push-state-after', function () {
      requestAnimationFrame(function () {
        if (document.getElementById('matrix-design-canvas')) initAll();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { requestAnimationFrame(initAll); });
  } else {
    requestAnimationFrame(initAll);
  }
})();
