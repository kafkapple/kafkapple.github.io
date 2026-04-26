(function () {
  var canvas = document.getElementById('grid-ripple-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var COLS = 32, ROWS = 14;
  var dots = [];
  var W, H, spacingX, spacingY;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = 240;
    spacingX = W / COLS;
    spacingY = H / ROWS;
    dots = [];
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        dots.push({
          ox: (c + 0.5) * spacingX,
          oy: (r + 0.5) * spacingY,
          x: (c + 0.5) * spacingX,
          y: (r + 0.5) * spacingY,
          vx: 0, vy: 0
        });
      }
    }
  }

  var mouse = { x: -9999, y: -9999 };
  var ripples = [];

  canvas.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * (W / rect.width);
    mouse.y = (e.clientY - rect.top) * (H / rect.height);
  });
  canvas.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });
  canvas.addEventListener('click', function (e) {
    var rect = canvas.getBoundingClientRect();
    ripples.push({
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top) * (H / rect.height),
      t: 0
    });
  });

  var SPRING = 0.12, DAMP = 0.78, REPEL = 60, MAX_RIPPLE_R = 200;

  function step() {
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var dx = d.ox - d.x, dy = d.oy - d.y;
      d.vx += dx * SPRING;
      d.vy += dy * SPRING;

      // cursor repulsion
      var mx = d.x - mouse.x, my = d.y - mouse.y;
      var mr = Math.sqrt(mx * mx + my * my) || 1;
      if (mr < REPEL) {
        var f = (REPEL - mr) / REPEL * 4;
        d.vx += (mx / mr) * f;
        d.vy += (my / mr) * f;
      }

      // ripple push
      for (var j = 0; j < ripples.length; j++) {
        var rp = ripples[j];
        var rx = d.ox - rp.x, ry = d.oy - rp.y;
        var rr = Math.sqrt(rx * rx + ry * ry) || 1;
        var wavefront = rp.t * 3;
        var dist = Math.abs(rr - wavefront);
        if (dist < 18) {
          var amp = (1 - rp.t / 80) * (18 - dist) / 18 * 5;
          d.vx += (rx / rr) * amp;
          d.vy += (ry / rr) * amp;
        }
      }

      d.vx *= DAMP;
      d.vy *= DAMP;
      d.x += d.vx;
      d.y += d.vy;
    }

    for (var j = ripples.length - 1; j >= 0; j--) {
      ripples[j].t++;
      if (ripples[j].t > 80) ripples.splice(j, 1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var dx = d.x - d.ox, dy = d.y - d.oy;
      var disp = Math.sqrt(dx * dx + dy * dy);
      var t = Math.min(disp / 12, 1);
      var r = Math.round(46 + t * (120 - 46));
      var g = Math.round(85 + t * (220 - 85));
      var bv = Math.round(56 + t * (120 - 56));
      var radius = 2 + t * 2.5;
      ctx.beginPath();
      ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + bv + ')';
      ctx.fill();
    }
  }

  function loop() {
    if (!canvas.isConnected) return;
    step();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  loop();

  var _ps = document.getElementById('_pushState');
  if (_ps) _ps.addEventListener('hy-push-state-after', function () {
    var c2 = document.getElementById('grid-ripple-canvas');
    if (c2 && c2 !== canvas) { canvas = c2; ctx = canvas.getContext('2d'); resize(); loop(); }
  });
})();
