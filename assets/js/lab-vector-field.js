(function () {
  var canvas, ctx, W, H, parts = [];
  var mode = 'rotation', t = 0, paused = false, running = false, io = null;
  var GRID = 26, NPART = 140;
  var heatmap = false;
  var srcX = 0, srcY = 0, dragging = false;

  function initParts() {
    parts = [];
    for (var i = 0; i < NPART; i++) {
      parts.push({ x: Math.random() * W, y: Math.random() * H,
                   age: Math.floor(Math.random() * 60), maxAge: 40 + Math.floor(Math.random() * 60) });
    }
  }

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    srcX = W / 2; srcY = H / 2;
    initParts();
  }

  function fieldAt(x, y) {
    var dx = x - srcX, dy = y - srcY;
    var d = Math.sqrt(dx * dx + dy * dy) + 0.01;
    var breathe = 1 + Math.sin(t * 0.6) * 0.35;
    var twist = Math.sin(t * 0.35) * 0.22;
    if (mode === 'rotation') return [(-dy + dx * twist) * 0.015 * breathe, (dx + dy * twist) * 0.015 * breathe];
    if (mode === 'sink')     return [-dx / d * breathe, -dy / d * breathe];
    if (mode === 'source')   return [ dx / d * breathe,  dy / d * breathe];
    if (mode === 'saddle') {
      var ct = Math.cos(t * 0.22), st = Math.sin(t * 0.22);
      var rx = dx * ct + dy * st, ry = -dx * st + dy * ct;
      return [rx * 0.015 * breathe, -ry * 0.015 * breathe];
    }
    if (mode === 'wave') return [Math.sin(y / 32 + t), Math.cos(x / 40 + t * 0.7)];
    return [0, 0];
  }

  function updateParticles() {
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.age++;
      if (p.age > p.maxAge) {
        p.x = Math.random() * W; p.y = Math.random() * H;
        p.age = 0; p.maxAge = 40 + Math.floor(Math.random() * 60);
        continue;
      }
      var v = fieldAt(p.x, p.y);
      var mag = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
      if (mag > 0.001) {
        var spd = Math.min(4.5, mag * 28 + 0.8) * _speedMul;
        var nx = v[0] / mag + (Math.random() - 0.5) * _chaosMul * 0.5;
        var ny = v[1] / mag + (Math.random() - 0.5) * _chaosMul * 0.5;
        p.x += nx * spd; p.y += ny * spd;
      }
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0e0c'; ctx.fillRect(0, 0, W, H);

    if (heatmap) {
      for (var hx = 0; hx < W; hx += GRID) {
        for (var hy = 0; hy < H; hy += GRID) {
          var hv = fieldAt(hx + GRID * 0.5, hy + GRID * 0.5);
          var hm = Math.sqrt(hv[0] * hv[0] + hv[1] * hv[1]);
          var ht = Math.min(1, hm * 0.7);
          ctx.fillStyle = 'rgba(' + Math.round(ht * 60) + ',' + Math.round(40 + ht * 100) + ',' + Math.round(80 - ht * 60) + ',0.28)';
          ctx.fillRect(hx, hy, GRID, GRID);
        }
      }
    }

    for (var x = GRID / 2; x < W; x += GRID) {
      for (var y = GRID / 2; y < H; y += GRID) {
        var v = fieldAt(x, y);
        var mag = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
        var norm = mag > 0.001 ? mag : 1;
        var nx2 = v[0] / norm, ny2 = v[1] / norm;
        var len = Math.min(GRID * 0.44, mag * GRID * 0.4);
        var hue = 120 - Math.min(1, mag * 0.8) * 90, alpha = 0.32 + Math.min(0.3, mag * 0.28);
        ctx.strokeStyle = 'hsla(' + hue + ',72%,58%,' + alpha + ')';
        ctx.lineWidth = 1.3; ctx.beginPath();
        var x0 = x - nx2 * len / 2, y0 = y - ny2 * len / 2;
        var x1 = x + nx2 * len / 2, y1 = y + ny2 * len / 2;
        ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        var px2 = -ny2 * 3, py2 = nx2 * 3;
        ctx.fillStyle = 'hsla(' + hue + ',72%,58%,' + alpha + ')';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - nx2 * 4 + px2, y1 - ny2 * 4 + py2); ctx.lineTo(x1 - nx2 * 4 - px2, y1 - ny2 * 4 - py2); ctx.closePath(); ctx.fill();
      }
    }
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i], lifeAlpha = Math.sin(p.age / p.maxAge * Math.PI);
      var v2 = fieldAt(p.x, p.y), mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]), hue2 = 120 - Math.min(1, mag2 * 0.8) * 90;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + hue2 + ',95%,82%,' + (lifeAlpha * 0.78) + ')'; ctx.fill();
    }
    if (mode !== 'wave') {
      ctx.beginPath(); ctx.arc(srcX, srcY, 5, 0, Math.PI * 2);
      var colors = { rotation: '#f7c948', sink: '#7ec8e3', source: '#f26b5b', saddle: '#c8a0f7' };
      ctx.fillStyle = colors[mode] || '#fff'; ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.font = '10px monospace';
    ctx.fillText(mode + (mode !== 'wave' ? '  drag to move source' : ''), 8, H - 8);
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    if (!paused) {
      t += (mode === 'wave' ? 0.025 : 0.018) * _speedMul;
      updateParticles(); draw();
    }
    requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('vector-field-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    canvas.addEventListener('mousedown', function (e) {
      if (mode === 'wave') return;
      dragging = true;
      var rect = canvas.getBoundingClientRect();
      srcX = (e.clientX - rect.left) * (W / rect.width);
      srcY = (e.clientY - rect.top) * (H / rect.height);
    });
    canvas.addEventListener('mousemove', function (e) {
      if (!dragging || mode === 'wave') return;
      var rect = canvas.getBoundingClientRect();
      srcX = (e.clientX - rect.left) * (W / rect.width);
      srcY = (e.clientY - rect.top) * (H / rect.height);
    });
    canvas.addEventListener('mouseup', function () { dragging = false; });
    canvas.addEventListener('mouseleave', function () { dragging = false; });

    var modeIds = ['rotation', 'sink', 'source', 'saddle', 'wave'];
    modeIds.forEach(function (m) {
      var btn = document.getElementById('vf-' + m);
      if (!btn) return;
      btn.onclick = function () {
        mode = m; t = 0; srcX = W / 2; srcY = H / 2; initParts();
        document.querySelectorAll('#vf-controls button').forEach(function (b) { b.className = b === btn ? 'lab-btn active' : 'lab-btn'; });
      };
    });

    var pauseBtn = document.getElementById('vf-pause');
    if (pauseBtn) {
      pauseBtn.textContent = paused ? 'Resume' : 'Pause';
      pauseBtn.onclick = function () { paused = !paused; this.textContent = paused ? 'Resume' : 'Pause'; };
    }

    var hmBtn = document.getElementById('vf-heatmap');
    if (hmBtn) {
      hmBtn.textContent = heatmap ? 'Heatmap: ON' : 'Heatmap: OFF';
      hmBtn.onclick = function () {
        heatmap = !heatmap;
        this.textContent = heatmap ? 'Heatmap: ON' : 'Heatmap: OFF';
      };
    }

    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; loop(); }
        else if (!e.isIntersecting) { running = false; }
      });
    }, { threshold: 0.1 });
    io.observe(canvas);
  }

  var _speedMul = 1.0, _chaosMul = 0.3, _accentColor = null;
  document.addEventListener('lab:studio', function (e) {
    if (e.detail.kind === 'speed') _speedMul = Math.max(0.1, e.detail.value);
    if (e.detail.kind === 'chaos') _chaosMul = e.detail.value;
    if (e.detail.kind === 'color') _accentColor = e.detail.value;
  });

  init();
  window.addEventListener('resize', resize);
  document.addEventListener('hy-push-state-start', function () { running = false; if (io) io.disconnect(); });
  document.addEventListener('hy-push-state-after', init);
})();
