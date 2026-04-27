// Lab: Lorenz Attractor — strange attractor / chaos theory
// Guard: #lorenz-canvas (unique to lab page)
(function () {
  var canvas = document.getElementById('lorenz-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, SCALE, CX, CY;
  var running = true, paused = false;

  // Classic Lorenz parameters
  var sigma = 10, rho = 28, beta = 8 / 3;
  var x = 0.1, y = 0, z = 0;
  var trail = [], MAX_TRAIL = 4000;

  function resize() {
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
    var dx = sigma * (y - x);
    var dy = x * (rho - z) - y;
    var dz = x * y - beta * z;
    x += dx * dt; y += dy * dt; z += dz * dt;
    var p = project(x, y, z);
    trail.push([p[0], p[1], z]);
    if (trail.length > MAX_TRAIL) trail.shift();
  }

  function redraw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#060d08'; ctx.fillRect(0, 0, W, H);
    if (trail.length < 2) return;
    for (var i = 1; i < trail.length; i++) {
      var prog = i / trail.length;
      var zv = Math.max(0, Math.min(1, (trail[i][2] - 0) / 55));
      var hue = 120 + zv * 140;
      ctx.strokeStyle = 'hsla(' + hue + ',75%,60%,' + (prog * 0.8) + ')';
      ctx.lineWidth = prog > 0.85 ? 1.6 : 0.8;
      ctx.beginPath();
      ctx.moveTo(trail[i - 1][0], trail[i - 1][1]);
      ctx.lineTo(trail[i][0], trail[i][1]);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.font = '10px monospace';
    ctx.fillText('σ=' + sigma.toFixed(1) + '  ρ=' + rho.toFixed(1) + '  β=' + beta.toFixed(2), 8, H - 8);
  }

  var STEPS = 14;
  function loop() {
    if (!running) return;
    if (!paused) { for (var i = 0; i < STEPS; i++) step(); redraw(); }
    requestAnimationFrame(loop);
  }

  function reset(keepParams) {
    x = 0.1 + (Math.random() - 0.5) * 0.04;
    y = (Math.random() - 0.5) * 0.04;
    z = (Math.random() - 0.5) * 0.04;
    trail = [];
  }

  resize();
  window.addEventListener('resize', resize);
  loop();

  // Parameter sliders
  function wireSlider(id, setter, digits) {
    var el = document.getElementById(id);
    var lbl = document.getElementById(id + '-v');
    if (!el) return;
    el.oninput = function () {
      setter(parseFloat(this.value));
      if (lbl) lbl.textContent = parseFloat(this.value).toFixed(digits);
      reset();
    };
  }
  wireSlider('lorenz-sigma', function (v) { sigma = v; }, 1);
  wireSlider('lorenz-rho',   function (v) { rho = v; }, 1);
  wireSlider('lorenz-beta',  function (v) { beta = v; }, 2);

  var pauseBtn = document.getElementById('lorenz-pause');
  var resetBtn = document.getElementById('lorenz-reset');
  if (pauseBtn) pauseBtn.onclick = function () {
    paused = !paused; this.textContent = paused ? 'Resume' : 'Pause';
  };
  if (resetBtn) resetBtn.onclick = function () { reset(); };

  // SPA wiring
  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () { running = false; });
    _ps.addEventListener('hy-push-state-after', function () {
      var c2 = document.getElementById('lorenz-canvas');
      if (c2) {
        canvas = c2; ctx = canvas.getContext('2d');
        running = true; paused = false;
        reset(); resize(); loop();
      }
    });
  }
})();
