(function () {
  var canvas, ctx, W, H, COLS, ROWS, grid, next;
  var running = false, io = null, imgData = null, pixels = null, mouse = null;
  var CELL = 4, COOLING = 0.055;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    COLS = Math.ceil(W / CELL);
    ROWS = Math.ceil(H / CELL);
    grid = new Float32Array(COLS * ROWS);
    next = new Float32Array(COLS * ROWS);
    imgData = null;
  }

  function heat(cx, cy, r, strength) {
    if (!grid) return;
    var cc = Math.round(cx / CELL), cr = Math.round(cy / CELL);
    var ir = Math.round(r / CELL);
    for (var dy = -ir; dy <= ir; dy++) {
      for (var dx = -ir; dx <= ir; dx++) {
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d > ir) continue;
        var nc = cc + dx, nr = cr + dy;
        if (nc >= 0 && nc < COLS && nr >= 0 && nr < ROWS) {
          grid[nr * COLS + nc] = Math.min(1, grid[nr * COLS + nc] + strength * (1 - d / ir));
        }
      }
    }
  }

  function update() {
    for (var c = 0; c < COLS; c++) {
      grid[(ROWS - 1) * COLS + c] = Math.random() > Math.max(0.05, 0.25 - _chaosMul * 0.2) ? Math.random() * 0.95 : 0;
    }
    for (var r = 0; r < ROWS - 1; r++) {
      for (var c = 0; c < COLS; c++) {
        var src = grid[(r + 1) * COLS + c];
        var l = c > 0 ? grid[(r + 1) * COLS + c - 1] : src;
        var ri = c < COLS - 1 ? grid[(r + 1) * COLS + c + 1] : src;
        next[r * COLS + c] = Math.max(0, (src * 1.1 + l * 0.3 + ri * 0.3) / 1.7 - COOLING - Math.random() * 0.025);
      }
    }
    var tmp = grid; grid = next; next = tmp;
  }

  function draw() {
    if (!ctx) return;
    if (!imgData || imgData.width !== W || imgData.height !== H) {
      imgData = ctx.createImageData(W, H);
      pixels = imgData.data;
    }
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var v = grid[r * COLS + c];
        var rr, gg, bb;
        if (v < 0.3) { rr = Math.floor(v / 0.3 * 210); gg = 0; bb = 0; }
        else if (v < 0.6) { rr = 210; gg = Math.floor((v - 0.3) / 0.3 * 160); bb = 0; }
        else { rr = 210; gg = 160 + Math.floor((v - 0.6) / 0.4 * 95); bb = Math.floor((v - 0.6) / 0.4 * 220); }
        var r0 = r * CELL, c0 = c * CELL;
        for (var dy = 0; dy < CELL && r0 + dy < H; dy++) {
          for (var dx = 0; dx < CELL && c0 + dx < W; dx++) {
            var px = ((r0 + dy) * W + (c0 + dx)) * 4;
            pixels[px] = Math.min(255, rr);
            pixels[px + 1] = Math.min(255, gg);
            pixels[px + 2] = Math.min(255, bb);
            pixels[px + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    if (mouse) heat(mouse.x, mouse.y, 16, 0.28);
    var reps = Math.max(1, Math.round(_speedMul));
    for (var _i = 0; _i < reps; _i++) update();
    draw();
    requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('fire-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    canvas.addEventListener('click', function (e) {
      var rect = canvas.getBoundingClientRect();
      heat((e.clientX - rect.left) * (W / canvas.offsetWidth),
           (e.clientY - rect.top)  * (H / canvas.offsetHeight), 28, 1.0);
    });
    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse = { x: (e.clientX - rect.left) * (W / canvas.offsetWidth),
                y: (e.clientY - rect.top)  * (H / canvas.offsetHeight) };
    });
    canvas.addEventListener('mouseleave', function () { mouse = null; });

    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; loop(); }
        else if (!e.isIntersecting) { running = false; }
      });
    }, { threshold: 0.1 });
    io.observe(canvas);
  }

  var _speedMul = 1.0, _chaosMul = 0.3;
  document.addEventListener('lab:studio', function (e) {
    if (e.detail.kind === 'speed') _speedMul = Math.max(0.1, e.detail.value);
    if (e.detail.kind === 'chaos') _chaosMul = e.detail.value;
  });

  init();
  window.addEventListener('resize', resize);
  document.addEventListener('hy-push-state-start', function () { running = false; if (io) io.disconnect(); });
  document.addEventListener('hy-push-state-after', init);
})();
