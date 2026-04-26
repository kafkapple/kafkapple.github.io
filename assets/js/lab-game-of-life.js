(function () {
  var canvas = document.getElementById('gol-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var CELL = 8;
  var COLS, ROWS, W, H;
  var grid, age;
  var running = true;
  var drawing = false;
  var frameCount = 0, FRAME_SKIP = 3;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = 240;
    COLS = Math.floor(W / CELL);
    ROWS = Math.floor(H / CELL);
    grid = new Uint8Array(COLS * ROWS);
    age = new Uint16Array(COLS * ROWS);
    loadGlider();
  }

  function idx(c, r) { return r * COLS + c; }

  function loadGlider() {
    grid.fill(0); age.fill(0);
    // Gosper Glider Gun offset to center
    var ox = Math.floor(COLS / 2) - 18, oy = Math.floor(ROWS / 2) - 5;
    var gun = [
      [1,5],[1,6],[2,5],[2,6],
      [11,5],[11,6],[11,7],[12,4],[12,8],[13,3],[13,9],[14,3],[14,9],
      [15,6],[16,4],[16,8],[17,5],[17,6],[17,7],[18,6],
      [21,3],[21,4],[21,5],[22,3],[22,4],[22,5],[23,2],[23,6],
      [25,1],[25,2],[25,6],[25,7],
      [35,3],[35,4],[36,3],[36,4]
    ];
    for (var i = 0; i < gun.length; i++) {
      var c = gun[i][0] + ox, r = gun[i][1] + oy;
      if (c >= 0 && c < COLS && r >= 0 && r < ROWS) grid[idx(c, r)] = 1;
    }
  }

  function loadPulsar() {
    grid.fill(0); age.fill(0);
    var ox = Math.floor(COLS / 2) - 7, oy = Math.floor(ROWS / 2) - 7;
    var pts = [
      [2,0],[3,0],[4,0],[8,0],[9,0],[10,0],
      [0,2],[5,2],[7,2],[12,2],
      [0,3],[5,3],[7,3],[12,3],
      [0,4],[5,4],[7,4],[12,4],
      [2,5],[3,5],[4,5],[8,5],[9,5],[10,5],
      [2,7],[3,7],[4,7],[8,7],[9,7],[10,7],
      [0,8],[5,8],[7,8],[12,8],
      [0,9],[5,9],[7,9],[12,9],
      [0,10],[5,10],[7,10],[12,10],
      [2,12],[3,12],[4,12],[8,12],[9,12],[10,12]
    ];
    for (var i = 0; i < pts.length; i++) {
      var c = pts[i][0] + ox, r = pts[i][1] + oy;
      if (c >= 0 && c < COLS && r >= 0 && r < ROWS) grid[idx(c, r)] = 1;
    }
  }

  function step() {
    var next = new Uint8Array(COLS * ROWS);
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var n = 0;
        for (var dr = -1; dr <= 1; dr++) {
          for (var dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            var nr = (r + dr + ROWS) % ROWS;
            var nc = (c + dc + COLS) % COLS;
            n += grid[idx(nc, nr)];
          }
        }
        var i = idx(c, r);
        if (grid[i]) {
          next[i] = (n === 2 || n === 3) ? 1 : 0;
          age[i] = next[i] ? Math.min(age[i] + 1, 255) : 0;
        } else {
          next[i] = (n === 3) ? 1 : 0;
          if (next[i]) age[i] = 1;
        }
      }
    }
    grid = next;
  }

  function draw() {
    ctx.fillStyle = '#0a0f0c';
    ctx.fillRect(0, 0, W, H);
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var i = idx(c, r);
        if (grid[i]) {
          var a = age[i];
          var hue, sat, lig;
          if (a < 10) { hue = 140; sat = 80; lig = 80; }
          else if (a < 40) { hue = 160; sat = 60; lig = 55; }
          else { hue = 180; sat = 30; lig = 38; }
          ctx.fillStyle = 'hsl(' + hue + ',' + sat + '%,' + lig + '%)';
          ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 1, CELL - 1);
        }
      }
    }
  }

  // draw with mouse
  function cellAt(e) {
    var rect = canvas.getBoundingClientRect();
    var x = (e.clientX - rect.left) * (W / rect.width);
    var y = (e.clientY - rect.top) * (H / rect.height);
    return { c: Math.floor(x / CELL), r: Math.floor(y / CELL) };
  }
  canvas.addEventListener('mousedown', function (e) { drawing = true; var p = cellAt(e); if (p.c >= 0 && p.c < COLS && p.r >= 0 && p.r < ROWS) { grid[idx(p.c, p.r)] = 1; age[idx(p.c, p.r)] = 1; } });
  canvas.addEventListener('mousemove', function (e) { if (!drawing) return; var p = cellAt(e); if (p.c >= 0 && p.c < COLS && p.r >= 0 && p.r < ROWS) { grid[idx(p.c, p.r)] = 1; age[idx(p.c, p.r)] = 1; } });
  canvas.addEventListener('mouseup', function () { drawing = false; });
  canvas.addEventListener('mouseleave', function () { drawing = false; });

  // preset buttons
  var btnGun = document.getElementById('gol-btn-gun');
  var btnPulsar = document.getElementById('gol-btn-pulsar');
  var btnRandom = document.getElementById('gol-btn-random');
  if (btnGun) btnGun.addEventListener('click', function () { loadGlider(); });
  if (btnPulsar) btnPulsar.addEventListener('click', function () { loadPulsar(); });
  if (btnRandom) btnRandom.addEventListener('click', function () {
    grid.fill(0); age.fill(0);
    for (var i = 0; i < grid.length; i++) { if (Math.random() < 0.3) { grid[i] = 1; age[i] = 1; } }
  });

  function loop() {
    if (!canvas.isConnected) return;
    frameCount++;
    if (frameCount % FRAME_SKIP === 0) step();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  loop();

  var _ps = document.getElementById('_pushState');
  if (_ps) _ps.addEventListener('hy-push-state-after', function () {
    var c2 = document.getElementById('gol-canvas');
    if (c2 && c2 !== canvas) {
      canvas = c2; ctx = canvas.getContext('2d'); resize(); loop();
      var b1 = document.getElementById('gol-btn-gun');
      var b2 = document.getElementById('gol-btn-pulsar');
      var b3 = document.getElementById('gol-btn-random');
      if (b1) b1.addEventListener('click', function () { loadGlider(); });
      if (b2) b2.addEventListener('click', function () { loadPulsar(); });
      if (b3) b3.addEventListener('click', function () {
        grid.fill(0); age.fill(0);
        for (var i = 0; i < grid.length; i++) { if (Math.random() < 0.3) { grid[i] = 1; age[i] = 1; } }
      });
    }
  });
})();
