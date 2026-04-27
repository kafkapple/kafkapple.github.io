// Lab: Raindrop Ripple — finite-difference 2D wave equation
// Guard: #ripple2-canvas (unique to lab page)
(function () {
  var canvas = document.getElementById('ripple2-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, COLS, ROWS;
  var running = true;
  var curr, prev, next;
  var imgData = null, pixels = null;

  var CELL    = 4;
  var DAMPING = 0.982;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || parseInt(canvas.getAttribute('width'))  || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    COLS = Math.ceil(W / CELL);
    ROWS = Math.ceil(H / CELL);
    curr = new Float32Array(COLS * ROWS);
    prev = new Float32Array(COLS * ROWS);
    next = new Float32Array(COLS * ROWS);
    imgData = null;
  }

  function drop(cx, cy, r, strength) {
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
    // Finite-difference wave: u[t+1] = 2u[t] - u[t-1] + c²∇²u
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
    if (!imgData || imgData.width !== W || imgData.height !== H) {
      imgData = ctx.createImageData(W, H);
      pixels  = imgData.data;
    }
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var v  = curr[r * COLS + c];
        var br = Math.floor((v + 1) * 127.5);
        var r0 = r * CELL, c0 = c * CELL;
        for (var dy = 0; dy < CELL && r0 + dy < H; dy++) {
          for (var dx = 0; dx < CELL && c0 + dx < W; dx++) {
            var px = ((r0 + dy) * W + (c0 + dx)) * 4;
            pixels[px]     = v > 0 ? 30 + Math.floor(br * 0.5) : 10;
            pixels[px + 1] = 50 + Math.floor(br * 0.7);
            pixels[px + 2] = 80 + br;
            pixels[px + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  var rainTimer = 0;
  function loop() {
    if (!running) return;
    // Random raindrops
    rainTimer++;
    if (rainTimer > 80 + Math.random() * 140) {
      drop(Math.random() * W, Math.random() * H, 7, 0.7);
      rainTimer = 0;
    }
    update();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  loop();

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

  window.addEventListener('resize', resize);

  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () { running = false; });
    _ps.addEventListener('hy-push-state-after', function () {
      var c2 = document.getElementById('ripple2-canvas');
      if (c2) {
        canvas = c2; ctx = canvas.getContext('2d');
        running = true; resize(); loop();
      }
    });
  }
})();
