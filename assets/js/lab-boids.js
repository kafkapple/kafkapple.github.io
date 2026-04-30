(function () {
  var canvas, ctx, W, H, boids = [];
  var running = false, io = null, mouse = null;
  var N = 80, SPEED = 2.2, VIEW_R = 60, SEP_R = 18;
  var SEP_W = 1.5, ALI_W = 1.0, COH_W = 0.8, MOUSE_W = 2.8;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
  }

  function initBoids(n) {
    boids = [];
    for (var i = 0; i < n; i++) {
      var angle = Math.random() * Math.PI * 2;
      boids.push({ x: Math.random() * W, y: Math.random() * H,
                   vx: Math.cos(angle) * SPEED, vy: Math.sin(angle) * SPEED,
                   hue: 120 + Math.random() * 40 });
    }
  }

  function limit(vx, vy, max) {
    var m = Math.sqrt(vx * vx + vy * vy);
    return m > max ? [vx / m * max, vy / m * max] : [vx, vy];
  }

  function update() {
    for (var i = 0; i < boids.length; i++) {
      var b = boids[i];
      var sx = 0, sy = 0, ax = 0, ay = 0, cx = 0, cy = 0, cn = 0;
      for (var j = 0; j < boids.length; j++) {
        if (i === j) continue;
        var dx = b.x - boids[j].x, dy = b.y - boids[j].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < VIEW_R) {
          ax += boids[j].vx; ay += boids[j].vy;
          cx += boids[j].x;  cy += boids[j].y;
          cn++;
          if (d < SEP_R && d > 0) { sx += dx / d; sy += dy / d; }
        }
      }
      var nvx = b.vx, nvy = b.vy;
      if (cn > 0) {
        var ali = limit(ax / cn, ay / cn, SPEED);
        nvx += (ali[0] - b.vx) * 0.1 * ALI_W;
        nvy += (ali[1] - b.vy) * 0.1 * ALI_W;
        var tx = cx / cn - b.x, ty = cy / cn - b.y;
        var tl = limit(tx, ty, SPEED);
        nvx += tl[0] * 0.003 * COH_W;
        nvy += tl[1] * 0.003 * COH_W;
      }
      nvx += sx * 0.08 * SEP_W;
      nvy += sy * 0.08 * SEP_W;
      if (mouse) {
        var mdx = b.x - mouse.x, mdy = b.y - mouse.y;
        var md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 90 && md > 0) { nvx += mdx / md * MOUSE_W; nvy += mdy / md * MOUSE_W; }
      }
      var lim = limit(nvx, nvy, SPEED * 1.6);
      b.vx = lim[0]; b.vy = lim[1];
      b.x += b.vx; b.y += b.vy;
      if (b.x < 0) b.x += W; if (b.x > W) b.x -= W;
      if (b.y < 0) b.y += H; if (b.y > H) b.y -= H;
      b.hue = 120 + (Math.sqrt(b.vx * b.vx + b.vy * b.vy) / SPEED) * 40;
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.fillStyle = 'rgba(8,14,10,0.20)';
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < boids.length; i++) {
      var b = boids[i];
      var angle = Math.atan2(b.vy, b.vx);
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(angle);
      ctx.fillStyle = 'hsla(' + b.hue + ',78%,68%,0.88)';
      ctx.beginPath();
      ctx.moveTo(7, 0); ctx.lineTo(-4, 3.5); ctx.lineTo(-4, -3.5); ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    update(); draw();
    requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('boids-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    initBoids(N);

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse = { x: (e.clientX - rect.left) * (W / canvas.offsetWidth),
                y: (e.clientY - rect.top)  * (H / canvas.offsetHeight) };
    });
    canvas.addEventListener('mouseleave', function () { mouse = null; });

    var scatterBtn = document.getElementById('boids-scatter');
    var flockBtn   = document.getElementById('boids-flock');
    var nSlider    = document.getElementById('boids-n');
    var nVal       = document.getElementById('boids-n-val');

    if (scatterBtn) scatterBtn.onclick = function () {
      boids.forEach(function (b) {
        var a = Math.random() * Math.PI * 2;
        b.vx = Math.cos(a) * SPEED * (0.5 + Math.random());
        b.vy = Math.sin(a) * SPEED * (0.5 + Math.random());
      });
    };
    if (flockBtn) flockBtn.onclick = function () { initBoids(N); };
    if (nSlider) nSlider.oninput = function () {
      N = parseInt(nSlider.value, 10);
      if (nVal) nVal.textContent = N;
      initBoids(N);
    };

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
  document.addEventListener('hy-push-state-start', function () { running = false; if (io) io.disconnect(); });
  document.addEventListener('hy-push-state-after', init);
})();
