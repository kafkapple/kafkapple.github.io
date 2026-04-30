(function () {
  var canvas, ctx, W, H, spacingX, spacingY;
  var COLS = 32, ROWS = 14;
  var dots = [], ripples = [];
  var mouse = { x: -9999, y: -9999 };
  var running = false, io = null;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = 240;
    spacingX = W / COLS;
    spacingY = H / ROWS;
    dots = [];
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        dots.push({ ox: (c + 0.5) * spacingX, oy: (r + 0.5) * spacingY, x: (c + 0.5) * spacingX, y: (r + 0.5) * spacingY, vx: 0, vy: 0 });
      }
    }
  }

  function getConfig() {
    var springEl = document.getElementById('ripple-spring');
    var repelEl  = document.getElementById('ripple-repel');
    return {
      SPRING: springEl ? parseFloat(springEl.value) : 0.12,
      REPEL:  repelEl  ? parseFloat(repelEl.value)  : 60,
      DAMP:   0.78
    };
  }

  function step() {
    var cfg = getConfig();
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var dx = d.ox - d.x, dy = d.oy - d.y;
      d.vx += dx * cfg.SPRING;
      d.vy += dy * cfg.SPRING;
      var mx = d.x - mouse.x, my = d.y - mouse.y;
      var mr = Math.sqrt(mx * mx + my * my) || 1;
      if (mr < cfg.REPEL) { var f = (cfg.REPEL - mr) / cfg.REPEL * 4; d.vx += (mx / mr) * f; d.vy += (my / mr) * f; }
      for (var j = 0; j < ripples.length; j++) {
        var rp = ripples[j];
        var rx = d.ox - rp.x, ry = d.oy - rp.y;
        var rr = Math.sqrt(rx * rx + ry * ry) || 1;
        var wavefront = rp.t * 3, dist = Math.abs(rr - wavefront);
        if (dist < 18) { var amp = (1 - rp.t / 80) * (18 - dist) / 18 * 5; d.vx += (rx / rr) * amp; d.vy += (ry / rr) * amp; }
      }
      d.vx *= cfg.DAMP; d.vy *= cfg.DAMP; d.x += d.vx; d.y += d.vy;
    }
    for (var j = ripples.length - 1; j >= 0; j--) { ripples[j].t++; if (ripples[j].t > 80) ripples.splice(j, 1); }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var dx = d.x - d.ox, dy = d.y - d.oy;
      var disp = Math.sqrt(dx * dx + dy * dy);
      var t = Math.min(disp / 12, 1);
      var r = Math.round(46 + t * 74), g = Math.round(85 + t * 135), bv = Math.round(56 + t * 64);
      var radius = 2 + t * 2.5;
      ctx.beginPath(); ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + bv + ')';
      ctx.fill();
    }
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    step(); draw();
    requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('grid-ripple-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (W / rect.width);
      mouse.y = (e.clientY - rect.top) * (H / rect.height);
    });
    canvas.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });
    canvas.addEventListener('click', function (e) {
      var rect = canvas.getBoundingClientRect();
      ripples.push({ x: (e.clientX - rect.left) * (W / rect.width), y: (e.clientY - rect.top) * (H / rect.height), t: 0 });
    });

    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; resize(); loop(); }
        else if (!e.isIntersecting) { running = false; }
      });
    }, { threshold: 0.1 });
    io.observe(canvas);
  }

  init();
  window.addEventListener('resize', resize);
  document.addEventListener('hy-push-state-start', function () { running = false; if (io) io.disconnect(); });
  document.addEventListener('hy-push-state-after', init);
})();
