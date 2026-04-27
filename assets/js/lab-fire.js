// Lab: Fire — Spreading Activation (cellular automaton)
// Guard: #fire-canvas (unique to lab page)
(function () {
  var canvas = document.getElementById('fire-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, COLS, ROWS;
  var running = true;
  var grid, next;
  var imgData = null, pixels = null;
  var mouse = null;

  var CELL    = 4;
  var COOLING = 0.055;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || parseInt(canvas.getAttribute('width'))  || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    COLS = Math.ceil(W / CELL);
    ROWS = Math.ceil(H / CELL);
    grid = new Float32Array(COLS * ROWS);
    next = new Float32Array(COLS * ROWS);
    imgData = null;
  }

  function heat(cx, cy, r, strength) {
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
    // Bottom row: continuous heat source
    for (var c = 0; c < COLS; c++) {
      grid[(ROWS - 1) * COLS + c] = Math.random() > 0.25 ? Math.random() * 0.95 : 0;
    }
    // Fire propagates upward with cooling
    for (var r = 0; r < ROWS - 1; r++) {
      for (var c = 0; c < COLS; c++) {
        var src = grid[(r + 1) * COLS + c];
        var l   = c > 0        ? grid[(r + 1) * COLS + c - 1] : src;
        var ri  = c < COLS - 1 ? grid[(r + 1) * COLS + c + 1] : src;
        next[r * COLS + c] = Math.max(0, (src * 1.1 + l * 0.3 + ri * 0.3) / 1.7
                                        - COOLING - Math.random() * 0.025);
      }
    }
    var tmp = grid; grid = next; next = tmp;
  }

  function draw() {
    if (!imgData || imgData.width !== W || imgData.height !== H) {
      imgData = ctx.createImageData(W, H);
      pixels  = imgData.data;
    }
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var v = grid[r * COLS + c];
        var rr, gg, bb;
        // Fire palette: black → deep red → orange → yellow → white
        if (v < 0.3) {
          rr = Math.floor(v / 0.3 * 210); gg = 0; bb = 0;
        } else if (v < 0.6) {
          rr = 210; gg = Math.floor((v - 0.3) / 0.3 * 160); bb = 0;
        } else {
          rr = 210; gg = 160 + Math.floor((v - 0.6) / 0.4 * 95);
          bb = Math.floor((v - 0.6) / 0.4 * 220);
        }
        var r0 = r * CELL, c0 = c * CELL;
        for (var dy = 0; dy < CELL && r0 + dy < H; dy++) {
          for (var dx = 0; dx < CELL && c0 + dx < W; dx++) {
            var px = ((r0 + dy) * W + (c0 + dx)) * 4;
            pixels[px]     = Math.min(255, rr);
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
    if (!running) return;
    if (mouse) heat(mouse.x, mouse.y, 16, 0.28);
    update();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  loop();

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

  window.addEventListener('resize', resize);

  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () { running = false; });
    _ps.addEventListener('hy-push-state-after', function () {
      var c2 = document.getElementById('fire-canvas');
      if (c2) {
        canvas = c2; ctx = canvas.getContext('2d');
        running = true; resize(); loop();
      }
    });
  }
})();
