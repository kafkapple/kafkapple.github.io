// Lab: Vector Field visualization — divergence / curl demo
// Guard: #vector-field-canvas (unique to lab page)
(function () {
  var canvas = document.getElementById('vector-field-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H;
  var mode = 'rotation';
  var t = 0, paused = false, running = true;
  var GRID = 26;

  function resize() {
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    draw();
  }

  function fieldAt(x, y) {
    var cx = W / 2, cy = H / 2, dx = x - cx, dy = y - cy;
    var d = Math.sqrt(dx * dx + dy * dy) + 0.01;
    if (mode === 'rotation') return [-dy * 0.015, dx * 0.015];
    if (mode === 'sink')     return [-dx / d, -dy / d];
    if (mode === 'source')   return [ dx / d,  dy / d];
    if (mode === 'saddle')   return [ dx * 0.015, -dy * 0.015];
    if (mode === 'wave')     return [Math.sin(y / 32 + t), Math.cos(x / 40 + t * 0.7)];
    return [0, 0];
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0e0c'; ctx.fillRect(0, 0, W, H);

    for (var x = GRID / 2; x < W; x += GRID) {
      for (var y = GRID / 2; y < H; y += GRID) {
        var v = fieldAt(x, y);
        var mag = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
        var norm = mag > 0.001 ? mag : 1;
        var nx = v[0] / norm, ny = v[1] / norm;
        var len = Math.min(GRID * 0.44, mag * GRID * 0.4);
        var hue = 120 - Math.min(1, mag * 0.8) * 90;
        var alpha = 0.45 + Math.min(0.45, mag * 0.3);

        ctx.strokeStyle = 'hsla(' + hue + ',72%,58%,' + alpha + ')';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        var x0 = x - nx * len / 2, y0 = y - ny * len / 2;
        var x1 = x + nx * len / 2, y1 = y + ny * len / 2;
        ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();

        // Arrowhead
        var px = -ny * 3, py = nx * 3;
        ctx.fillStyle = 'hsla(' + hue + ',72%,58%,' + alpha + ')';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 - nx * 4 + px, y1 - ny * 4 + py);
        ctx.lineTo(x1 - nx * 4 - px, y1 - ny * 4 - py);
        ctx.closePath(); ctx.fill();
      }
    }

    // Fixed-point marker
    if (mode !== 'wave') {
      ctx.beginPath(); ctx.arc(W / 2, H / 2, 5, 0, Math.PI * 2);
      var colors = { rotation: '#f7c948', sink: '#7ec8e3', source: '#f26b5b', saddle: '#c8a0f7' };
      ctx.fillStyle = colors[mode] || '#fff'; ctx.fill();
    }

    // Mode label
    ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.font = '10px monospace';
    ctx.fillText(mode, 8, H - 8);
  }

  function loop() {
    if (!running) return;
    if (!paused && mode === 'wave') { t += 0.025; draw(); }
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  loop();

  // Controls
  var modeIds = ['rotation', 'sink', 'source', 'saddle', 'wave'];
  modeIds.forEach(function (m) {
    var btn = document.getElementById('vf-' + m);
    if (!btn) return;
    btn.onclick = function () {
      mode = m; t = 0; draw();
      document.querySelectorAll('#vf-controls button').forEach(function (b) {
        b.className = b === btn ? 'lab-btn active' : 'lab-btn';
      });
    };
  });
  var pauseBtn = document.getElementById('vf-pause');
  if (pauseBtn) pauseBtn.onclick = function () {
    paused = !paused; this.textContent = paused ? 'Resume' : 'Pause';
  };

  // SPA wiring
  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () { running = false; });
    _ps.addEventListener('hy-push-state-after', function () {
      var c2 = document.getElementById('vector-field-canvas');
      if (c2) {
        canvas = c2; ctx = canvas.getContext('2d');
        running = true; t = 0; paused = false;
        resize(); loop();
      }
    });
  }
})();
