(function () {
  'use strict';
  var canvas, ctx, W, H;
  var running = false, io = null;
  var t = 0;
  var N = 5;
  var preset = 'square';
  var trail = [];
  var TRAIL_LEN = 84;

  var _speedMul = 1.0, _chaosMul = 0.3, _accentColor = null;

  // Zone layout (absolute x values, recomputed on resize)
  var CX = 108, CY = 160;
  var TRAIL_X0 = 224, TRAIL_X1 = 308;
  var NN_X0 = 316;
  var MAX_REACH = 90; // max combined radius so circles stay in left zone

  function recomputeLayout() {
    CX = Math.round(W * 0.169);
    CY = Math.round(H / 2);
    TRAIL_X0 = Math.round(W * 0.35);
    TRAIL_X1 = Math.round(W * 0.481);
    NN_X0    = Math.round(W * 0.494);
    MAX_REACH = Math.min(CX - 8, TRAIL_X0 - CX - 6, CY - 10, H - CY - 10);
  }

  function getHarmonics() {
    var h = [];
    for (var k = 1; k <= N; k++) {
      if (preset === 'square') {
        var n = 2 * k - 1;
        h.push({ freq: n, amp: 4 / (Math.PI * n) });
      } else if (preset === 'sawtooth') {
        var sign = (k % 2 === 1) ? 1 : -1;
        h.push({ freq: k, amp: sign * 2 / (Math.PI * k) });
      } else { // triangle
        var n3 = 2 * k - 1;
        var sign3 = (k % 2 === 1) ? 1 : -1;
        h.push({ freq: n3, amp: sign3 * 8 / (Math.PI * Math.PI * n3 * n3) });
      }
    }
    return h;
  }

  function drawFourier() {
    var h = getHarmonics();
    if (!h.length) return { x: CX, y: CY };
    // Scale so the sum of radii == MAX_REACH
    var totalAmp = 0;
    for (var i = 0; i < h.length; i++) totalAmp += Math.abs(h[i].amp);
    var scale = MAX_REACH / totalAmp;

    var x = CX, y = CY;
    for (var i = 0; i < h.length; i++) {
      var r = Math.abs(h[i].amp) * scale;
      var angle = h[i].freq * t + (h[i].amp < 0 ? Math.PI : 0);
      var px = x, py = y;
      x += r * Math.cos(angle);
      y += r * Math.sin(angle);

      // Orbit circle
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(46,139,87,0.3)'; ctx.lineWidth = 0.7;
      ctx.stroke();

      // Arm
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(120,255,160,0.75)'; ctx.lineWidth = 1.2;
      ctx.stroke();

      // Joint dot
      var isLast = (i === h.length - 1);
      ctx.beginPath(); ctx.arc(x, y, isLast ? 3 : 1.5, 0, Math.PI * 2);
      ctx.fillStyle = isLast ? '#78ffa0' : 'rgba(120,255,160,0.55)';
      ctx.fill();
    }
    return { x: x, y: y };
  }

  function drawTrail() {
    if (trail.length < 2) return;
    var dx = (TRAIL_X1 - TRAIL_X0) / TRAIL_LEN;
    ctx.beginPath();
    for (var i = 0; i < trail.length; i++) {
      var x = TRAIL_X1 - (trail.length - 1 - i) * dx;
      if (i === 0) ctx.moveTo(x, trail[i]);
      else ctx.lineTo(x, trail[i]);
    }
    ctx.strokeStyle = 'rgba(120,255,160,0.65)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }

  function drawNN() {
    var nnX0 = NN_X0 + 14;
    var nnW = W - NN_X0 - 22;
    var nnY0 = 18;
    var nnH = H - 36;
    var layers = [3, 5, 5, 2];
    var lxStep = nnW / (layers.length - 1);

    // Activation from trail (Fourier wave amplitude)
    var lastY = trail.length ? trail[trail.length - 1] : CY;
    var activation = 0.5 + (lastY - CY) / (MAX_REACH * 1.4);
    activation = Math.max(0, Math.min(1, activation));

    for (var l = 0; l < layers.length; l++) {
      for (var i = 0; i < layers[l]; i++) {
        var nx = nnX0 + l * lxStep;
        var ny = nnY0 + nnH * (i + 1) / (layers[l] + 1);

        // Connections to next layer
        if (l < layers.length - 1) {
          for (var j = 0; j < layers[l + 1]; j++) {
            var nnx = nnX0 + (l + 1) * lxStep;
            var nny = nnY0 + nnH * (j + 1) / (layers[l + 1] + 1);
            var w = 0.06 + 0.22 * Math.abs(Math.sin(t + l * 1.7 + i * 0.9 + j * 0.5));
            w += _chaosMul * 0.1 * Math.sin(t * 3.1 + i * j);
            ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nnx, nny);
            ctx.strokeStyle = 'rgba(80,200,120,' + Math.max(0.04, w) + ')';
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Node activation
        var act = activation + _chaosMul * 0.22 * Math.sin(t * 2.4 + l * 1.3 + i);
        act = Math.max(0, Math.min(1, act));
        ctx.beginPath(); ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(140,68%,' + (30 + act * 40) + '%)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(120,255,160,0.4)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0f0c'; ctx.fillRect(0, 0, W, H);

    var pt = drawFourier();

    // Dashed connector: tip → trail entry
    ctx.save();
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(120,255,160,0.2)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(TRAIL_X1, pt.y); ctx.stroke();
    ctx.restore();

    trail.push(pt.y);
    if (trail.length > TRAIL_LEN) trail.shift();
    drawTrail();

    // Dashed connector: trail end → NN input
    if (trail.length) {
      ctx.save();
      ctx.setLineDash([2, 5]);
      ctx.strokeStyle = 'rgba(120,255,160,0.15)'; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(TRAIL_X1, trail[trail.length - 1]);
      ctx.lineTo(NN_X0, CY);
      ctx.stroke();
      ctx.restore();
    }

    // Zone dividers
    ctx.save();
    ctx.strokeStyle = 'rgba(46,85,56,0.35)'; ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 4]);
    ctx.beginPath(); ctx.moveTo(TRAIL_X0, 6); ctx.lineTo(TRAIL_X0, H - 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(NN_X0, 6); ctx.lineTo(NN_X0, H - 6); ctx.stroke();
    ctx.restore();

    drawNN();

    // Labels
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.font = '9px monospace';
    ctx.fillText('Fourier', 4, H - 6);
    ctx.fillText('wave', TRAIL_X0 + 3, H - 6);
    ctx.fillText('ANN', NN_X0 + 3, H - 6);
    ctx.fillText(preset + '  n=' + N, W - 88, H - 6);
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    t += 0.025 * _speedMul;
    draw();
    requestAnimationFrame(loop);
  }

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 320;
    recomputeLayout();
    trail = [];
  }

  function setPreset(p) {
    preset = p;
    trail = [];
    document.querySelectorAll('#fourier-nn-controls button[data-preset]').forEach(function (b) {
      b.className = b.dataset.preset === p ? 'lab-btn active' : 'lab-btn';
    });
  }

  function init() {
    canvas = document.getElementById('fourier-nn-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    var slider = document.getElementById('fourier-n-slider');
    var nLabel = document.getElementById('fourier-n-label');
    if (slider) {
      slider.value = N;
      if (nLabel) nLabel.textContent = N;
      slider.oninput = function () {
        N = parseInt(this.value);
        if (nLabel) nLabel.textContent = N;
        trail = [];
      };
    }

    ['square', 'sawtooth', 'triangle'].forEach(function (p) {
      var btn = document.getElementById('fourier-' + p);
      if (btn) btn.onclick = function () { setPreset(p); };
    });
    // Restore active highlight on SPA re-init
    document.querySelectorAll('#fourier-nn-controls button[data-preset]').forEach(function (b) {
      b.className = b.dataset.preset === preset ? 'lab-btn active' : 'lab-btn';
    });
    var sl = document.getElementById('fourier-n-slider');
    if (sl) sl.value = N;
    var nl = document.getElementById('fourier-n-label');
    if (nl) nl.textContent = N;

    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; loop(); }
        else if (!e.isIntersecting) { running = false; }
      });
    }, { threshold: 0.1 });
    io.observe(canvas);
  }

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
