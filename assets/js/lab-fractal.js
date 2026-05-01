(function () {
  var canvas, ctx, W, H;
  var running = false, io = null;
  var mode = 'julia';
  var maxIter = 80;
  var cx = -0.7, cy = 0.27015;
  var zoom = 1, offsetX = 0, offsetY = 0;
  var orbitActive = true;
  var orbitT = 0;
  var ORBIT_CX = -0.12, ORBIT_CY = 0.0;
  var dirty = true;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || 640;
    H = canvas.height = 240;
    dirty = true;
  }

  function draw() {
    if (!ctx) return;
    dirty = false;
    var iters = (orbitActive && mode === 'julia') ? 48 : maxIter;
    var imgData = ctx.createImageData(W, H);
    var data = imgData.data;
    var scaleX = 3.0 / (zoom * W), scaleY = 2.0 / (zoom * H);
    for (var i = 0; i < W; i++) {
      for (var j = 0; j < H; j++) {
        var px = scaleX * (i - W * 0.5) + offsetX;
        var py = scaleY * (j - H * 0.5) + offsetY;
        var zx, zy, cr, ci;
        if (mode === 'julia') {
          zx = px; zy = py; cr = cx; ci = cy;
        } else {
          zx = 0; zy = 0; cr = px; ci = py;
        }
        var iter = 0;
        while (zx * zx + zy * zy < 4 && iter < iters) {
          var tmp = zx * zx - zy * zy + cr;
          zy = 2 * zx * zy + ci;
          zx = tmp;
          iter++;
        }
        var pix = (i + j * W) * 4;
        if (iter === iters) {
          data[pix] = 8; data[pix + 1] = 16; data[pix + 2] = 10;
        } else {
          var t = iter / iters;
          data[pix]     = Math.round(20 + t * 100);
          data[pix + 1] = Math.round(40 + t * 180);
          data[pix + 2] = Math.round(30 + t * 120);
        }
        data[pix + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    ctx.fillStyle = 'rgba(120,220,140,0.7)';
    ctx.font = '10px monospace';
    if (mode === 'julia') {
      ctx.fillText('c = ' + cx.toFixed(3) + (cy >= 0 ? '+' : '') + cy.toFixed(3) + 'i', 6, H - 6);
    } else {
      ctx.fillText('Mandelbrot  zoom ' + zoom.toFixed(1) + '×', 6, H - 6);
    }
  }

  function stepOrbit() {
    var r = 0.38 * (1 + _chaosMul * 0.8);
    orbitT += 0.008 * _speedMul;
    cx = ORBIT_CX + r * Math.cos(orbitT);
    cy = ORBIT_CY + r * Math.sin(orbitT * 1.3);
    dirty = true;
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    if (orbitActive && mode === 'julia') stepOrbit();
    if (dirty) draw();
    requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('fractal-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    dirty = true;
    resize();

    canvas.addEventListener('mousemove', function (e) {
      if (mode !== 'julia' || orbitActive) return;
      var rect = canvas.getBoundingClientRect();
      cx = (e.clientX - rect.left) / rect.width * 2 - 1;
      cy = (e.clientY - rect.top) / rect.height * 2 - 1;
      dirty = true;
    });

    canvas.addEventListener('wheel', function (e) {
      e.preventDefault();
      var factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      var rect = canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) / rect.width;
      var my = (e.clientY - rect.top) / rect.height;
      var oldZoom = zoom;
      zoom = Math.max(0.2, Math.min(500, zoom * factor));
      offsetX += (3.0 / oldZoom - 3.0 / zoom) * (mx - 0.5);
      offsetY += (2.0 / oldZoom - 2.0 / zoom) * (my - 0.5);
      dirty = true;
    }, { passive: false });

    var modeBtn = document.getElementById('fractal-mode-btn');
    if (modeBtn) {
      modeBtn.textContent = mode === 'julia' ? 'Julia' : 'Mandelbrot';
      modeBtn.addEventListener('click', function () {
        mode = mode === 'julia' ? 'mandelbrot' : 'julia';
        modeBtn.textContent = mode === 'julia' ? 'Julia' : 'Mandelbrot';
        zoom = 1; offsetX = mode === 'mandelbrot' ? -0.5 : 0; offsetY = 0;
        cx = -0.7; cy = 0.27015; orbitT = 0; dirty = true;
      });
    }

    var orbitBtn = document.getElementById('fractal-orbit-btn');
    if (orbitBtn) {
      orbitBtn.textContent = orbitActive ? 'Orbit: ON' : 'Orbit: OFF';
      orbitBtn.addEventListener('click', function () {
        orbitActive = !orbitActive;
        orbitBtn.textContent = orbitActive ? 'Orbit: ON' : 'Orbit: OFF';
        dirty = true;
      });
    }

    var resetBtn = document.getElementById('fractal-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      zoom = 1; offsetX = mode === 'mandelbrot' ? -0.5 : 0; offsetY = 0;
      cx = -0.7; cy = 0.27015; orbitT = 0; dirty = true;
    });

    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; dirty = true; loop(); }
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
