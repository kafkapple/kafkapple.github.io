(function () {
  var canvas, ctx, W, H, COLS, ROWS, curr, prev, next;
  var running = false, io = null, imgData = null, pixels = null;
  var CELL = 4, DAMPING = 0.982, rainTimer = 0;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    COLS = Math.ceil(W / CELL);
    ROWS = Math.ceil(H / CELL);
    curr = new Float32Array(COLS * ROWS);
    prev = new Float32Array(COLS * ROWS);
    next = new Float32Array(COLS * ROWS);
    imgData = null;
  }

  function drop(cx, cy, r, strength) {
    if (!curr) return;
    var cc = Math.round(cx / CELL), cr = Math.round(cy / CELL);
    var ir = Math.round(r / CELL);
    for (var dy = -ir; dy <= ir; dy++) {
      for (var dx = -ir; dx <= ir; dx++) {
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d > ir) continue;
        var nc = cc + dx, nr = cr + dy;
        if (nc >= 0 && nc < COLS && nr >= 0 && nr < ROWS) {
          curr[nr * COLS + nc] += strength * (1 - d / ir);
          curr[nr * COLS + nc] = Math.min(1, curr[nr * COLS + nc]);
        }
      }
    }
  }

  function update() {
    for (var r = 1; r < ROWS - 1; r++) {
      for (var c = 1; c < COLS - 1; c++) {
        var i = r * COLS + c;
        var lap = curr[i - 1] + curr[i + 1] + curr[(r - 1) * COLS + c] + curr[(r + 1) * COLS + c] - 4 * curr[i];
        next[i] = (2 * curr[i] - prev[i] + 0.25 * lap) * DAMPING;
        next[i] = Math.max(-1, Math.min(1, next[i]));
      }
    }
    var tmp = prev; prev = curr; curr = next; next = tmp;
  }

  function draw() {
    if (!ctx) return;
    if (!imgData || imgData.width !== W || imgData.height !== H) {
      imgData = ctx.createImageData(W, H);
      pixels = imgData.data;
    }
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var v = curr[r * COLS + c];
        var br = Math.floor((v + 1) * 127.5);
        var r0 = r * CELL, c0 = c * CELL;
        for (var dy = 0; dy < CELL && r0 + dy < H; dy++) {
          for (var dx = 0; dx < CELL && c0 + dx < W; dx++) {
            var px = ((r0 + dy) * W + (c0 + dx)) * 4;
            pixels[px] = v > 0 ? 30 + Math.floor(br * 0.5) : 10;
            pixels[px + 1] = 50 + Math.floor(br * 0.7);
            pixels[px + 2] = 80 + br;
            pixels[px + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    rainTimer++;
    if (rainTimer > 80 + Math.random() * 140) {
      drop(Math.random() * W, Math.random() * H, 7, 0.7);
      rainTimer = 0;
    }
    update(); draw();
    requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('ripple2-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    canvas.addEventListener('click', function (e) {
      var rect = canvas.getBoundingClientRect();
      drop((e.clientX - rect.left) * (W / canvas.offsetWidth),
           (e.clientY - rect.top)  * (H / canvas.offsetHeight), 18, 1.2);
    });
    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      drop((e.clientX - rect.left) * (W / canvas.offsetWidth),
           (e.clientY - rect.top)  * (H / canvas.offsetHeight), 4, 0.14);
    });

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
