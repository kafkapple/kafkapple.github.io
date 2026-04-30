(function () {
  var canvas, ctx, W, H, SCALE, CX, CY;
  var running = false, paused = false, io = null, hoverIdx = -1;
  var sigma = 10, rho = 28, beta = 8 / 3;
  var x = 0.1, y = 0, z = 0;
  var trail = [], MAX_TRAIL = 4000;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    SCALE = H / 56; CX = W * 0.45; CY = H * 0.52;
    redraw();
  }

  function project(lx, ly, lz) {
    var px = CX + (lx - ly * 0.38) * SCALE;
    var py = CY - (lz - 25) * SCALE + ly * 0.08 * SCALE;
    return [px, py];
  }

  function step() {
    var dt = 0.005;
    var dx = sigma * (y - x), dy = x * (rho - z) - y, dz = x * y - beta * z;
    x += dx * dt; y += dy * dt; z += dz * dt;
    var p = project(x, y, z);
    trail.push([p[0], p[1], z]);
    if (trail.length > MAX_TRAIL) trail.shift();
  }

  function redraw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#060d08'; ctx.fillRect(0, 0, W, H);
    if (trail.length < 2) return;
    for (var i = 1; i < trail.length; i++) {
      var prog = i / trail.length, zv = Math.max(0, Math.min(1, (trail[i][2] - 0) / 55));
      var hue = 120 + zv * 140;
      ctx.strokeStyle = 'hsla(' + hue + ',75%,60%,' + (prog * 0.8) + ')';
      ctx.lineWidth = prog > 0.85 ? 1.6 : 0.8;
      ctx.beginPath(); ctx.moveTo(trail[i - 1][0], trail[i - 1][1]); ctx.lineTo(trail[i][0], trail[i][1]); ctx.stroke();
    }
    if (hoverIdx >= 0 && hoverIdx < trail.length) {
      var tp = trail[hoverIdx];
      ctx.beginPath(); ctx.arc(tp[0], tp[1], 5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,200,0.92)'; ctx.fill();
      ctx.beginPath(); ctx.arc(tp[0], tp[1], 9, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,200,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,200,0.75)'; ctx.font = '9px monospace'; ctx.fillText('z≈' + tp[2].toFixed(1), tp[0] + 10, tp[1] - 4);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.font = '10px monospace';
    ctx.fillText('σ=' + sigma.toFixed(1) + '  ρ=' + rho.toFixed(1) + '  β=' + beta.toFixed(2), 8, H - 8);
  }

  var STEPS = 14;
  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    if (!paused) { for (var i = 0; i < STEPS; i++) step(); redraw(); }
    requestAnimationFrame(loop);
  }

  function reset() {
    x = 0.1 + (Math.random() - 0.5) * 0.04; y = (Math.random() - 0.5) * 0.04; z = (Math.random() - 0.5) * 0.04;
    trail = [];
  }

  function init() {
    canvas = document.getElementById('lorenz-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    reset();
    resize();

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / canvas.offsetWidth), my = (e.clientY - rect.top) * (H / canvas.offsetHeight);
      var minD = 1e9, closest = -1;
      for (var i = 0; i < trail.length; i += 4) {
        var ddx = trail[i][0] - mx, ddy = trail[i][1] - my, dd = ddx * ddx + ddy * ddy;
        if (dd < minD) { minD = dd; closest = i; }
      }
      hoverIdx = (minD < 400) ? closest : -1;
    });
    canvas.addEventListener('mouseleave', function () { hoverIdx = -1; });
    canvas.addEventListener('click', function (e) {
      var rect = canvas.getBoundingClientRect();
      var nx = (e.clientX - rect.left) / canvas.offsetWidth;
      x = (nx - 0.5) * 0.6; y = ((e.clientY - rect.top) / canvas.offsetHeight - 0.5) * 0.3; z = 1 + nx * 12;
      trail = [];
    });

    function wireSlider(id, setter, digits) {
      var el = document.getElementById(id), lbl = document.getElementById(id + '-v');
      if (!el) return;
      el.oninput = function () { setter(parseFloat(this.value)); if (lbl) lbl.textContent = parseFloat(this.value).toFixed(digits); reset(); };
    }
    wireSlider('lorenz-sigma', function (v) { sigma = v; }, 1);
    wireSlider('lorenz-rho', function (v) { rho = v; }, 1);
    wireSlider('lorenz-beta', function (v) { beta = v; }, 2);

    var pauseBtn = document.getElementById('lorenz-pause'), resetBtn = document.getElementById('lorenz-reset');
    if (pauseBtn) { pauseBtn.textContent = paused ? 'Resume' : 'Pause'; pauseBtn.onclick = function () { paused = !paused; this.textContent = paused ? 'Resume' : 'Pause'; }; }
    if (resetBtn) resetBtn.onclick = function () { reset(); };

    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; loop(); }
        else if (!e.isIntersecting) { running = false; }
      });
    }, { threshold: 0.1 });
    io.observe(canvas);
  }

  init();
  window.addEventListener('resize', resize);
  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () { running = false; if (io) io.disconnect(); });
    _ps.addEventListener('hy-push-state-after', init);
  }
})();
