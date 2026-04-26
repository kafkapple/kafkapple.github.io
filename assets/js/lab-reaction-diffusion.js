(function () {
  var canvas = document.getElementById('rd-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var SIM_W = 160, SIM_H = 80;
  var W, H;
  var uBuf, vBuf, uNext, vNext;
  var imgData, pixels;
  var off = document.createElement('canvas');
  off.width = SIM_W; off.height = SIM_H;
  var octx = off.getContext('2d');

  var presets = [
    { label: 'Spots', f: 0.035, k: 0.065 },
    { label: 'Labyrinths', f: 0.055, k: 0.062 },
    { label: 'Stripes', f: 0.026, k: 0.051 }
  ];
  var pIdx = 1;
  var F = presets[pIdx].f, K = presets[pIdx].k;
  var DA = 1.0, DB = 0.5, DT = 1.0;

  function getSteps() {
    var el = document.getElementById('rd-steps');
    return el ? parseInt(el.value) : 8;
  }

  function initSim() {
    uBuf = new Float32Array(SIM_W * SIM_H); vBuf = new Float32Array(SIM_W * SIM_H);
    uNext = new Float32Array(SIM_W * SIM_H); vNext = new Float32Array(SIM_W * SIM_H);
    uBuf.fill(1); vBuf.fill(0);
    var cx = Math.floor(SIM_W / 2), cy = Math.floor(SIM_H / 2);
    for (var dy = -5; dy <= 5; dy++) {
      for (var dx = -5; dx <= 5; dx++) {
        var i = (cy + dy) * SIM_W + (cx + dx);
        if (i >= 0 && i < uBuf.length) { uBuf[i] = 0.5; vBuf[i] = 0.25; }
      }
    }
    imgData = octx.createImageData(SIM_W, SIM_H);
    pixels = imgData.data;
  }

  function resize() {
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
  }

  function simStep() {
    for (var y = 0; y < SIM_H; y++) {
      for (var x = 0; x < SIM_W; x++) {
        var i = y * SIM_W + x;
        var u = uBuf[i], v = vBuf[i];
        var lapu = uBuf[((y-1+SIM_H)%SIM_H)*SIM_W+x] + uBuf[((y+1)%SIM_H)*SIM_W+x]
                 + uBuf[y*SIM_W+(x-1+SIM_W)%SIM_W] + uBuf[y*SIM_W+(x+1)%SIM_W] - 4*u;
        var lapv = vBuf[((y-1+SIM_H)%SIM_H)*SIM_W+x] + vBuf[((y+1)%SIM_H)*SIM_W+x]
                 + vBuf[y*SIM_W+(x-1+SIM_W)%SIM_W] + vBuf[y*SIM_W+(x+1)%SIM_W] - 4*v;
        var uvv = u * v * v;
        uNext[i] = Math.max(0, Math.min(1, u + DT * (DA * lapu - uvv + F * (1 - u))));
        vNext[i] = Math.max(0, Math.min(1, v + DT * (DB * lapv + uvv - (K + F) * v)));
      }
    }
    var tmp = uBuf; uBuf = uNext; uNext = tmp;
    tmp = vBuf; vBuf = vNext; vNext = tmp;
  }

  function renderSim() {
    for (var i = 0; i < SIM_W * SIM_H; i++) {
      var t = Math.max(0, Math.min(1, uBuf[i] - vBuf[i]));
      var p = i * 4;
      pixels[p] = Math.round(10 + t * 230);
      pixels[p+1] = Math.round(60 + t * 185);
      pixels[p+2] = Math.round(50 + t * 160);
      pixels[p+3] = 255;
    }
    octx.putImageData(imgData, 0, 0);
    ctx.drawImage(off, 0, 0, W, H);
  }

  var mouseDown = false;
  canvas.addEventListener('mousedown', function () { mouseDown = true; });
  canvas.addEventListener('mouseup', function () { mouseDown = false; });
  canvas.addEventListener('mouseleave', function () { mouseDown = false; });
  canvas.addEventListener('mousemove', function (e) {
    if (!mouseDown) return;
    var rect = canvas.getBoundingClientRect();
    var sx = Math.floor((e.clientX - rect.left) / rect.width * SIM_W);
    var sy = Math.floor((e.clientY - rect.top) / rect.height * SIM_H);
    for (var dy = -3; dy <= 3; dy++) {
      for (var dx = -3; dx <= 3; dx++) {
        var nx = sx + dx, ny = sy + dy;
        if (nx < 0 || nx >= SIM_W || ny < 0 || ny >= SIM_H) continue;
        var i = ny * SIM_W + nx;
        vBuf[i] = Math.min(1, vBuf[i] + 0.5);
        uBuf[i] = Math.max(0, uBuf[i] - 0.3);
      }
    }
  });

  function wireControls() {
    ['rd-btn-0', 'rd-btn-1', 'rd-btn-2'].forEach(function (id, pi) {
      var btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', function () {
        document.querySelectorAll('[id^="rd-btn-"]').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        pIdx = pi; F = presets[pi].f; K = presets[pi].k; initSim();
      });
    });
    var sl = document.getElementById('rd-steps');
    var sv = document.getElementById('rd-steps-val');
    if (sl && sv) sl.addEventListener('input', function () { sv.textContent = sl.value; });
  }

  wireControls();

  function loop() {
    if (!canvas.isConnected) return;
    var s = getSteps();
    for (var i = 0; i < s; i++) simStep();
    renderSim();
    requestAnimationFrame(loop);
  }

  var running = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !running) { running = true; resize(); initSim(); loop(); }
      else if (!e.isIntersecting) { running = false; }
    });
  }, { threshold: 0.1 });

  resize();
  window.addEventListener('resize', resize);
  io.observe(canvas);

  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () { io.disconnect(); running = false; });
    _ps.addEventListener('hy-push-state-after', function () {
      var c2 = document.getElementById('rd-canvas');
      if (c2) { canvas = c2; ctx = canvas.getContext('2d'); resize(); initSim(); io.observe(canvas); wireControls(); }
    });
  }
})();
