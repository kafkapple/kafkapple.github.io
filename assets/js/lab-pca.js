(function () {
  var canvas, ctx, W, H;
  var running = false, io = null;
  var points = [];
  var draggingIdx = -1;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || 640;
    H = canvas.height = 320;
    if (points.length === 0) {
      for (var i = 0; i < 20; i++) {
        points.push({ x: W / 2 + (Math.random() - 0.5) * 200, y: H / 2 + (Math.random() - 0.5) * 100 });
      }
    }
    draw();
  }

  function computePCA() {
    if (points.length < 2) return null;
    var meanX = 0, meanY = 0;
    points.forEach(p => { meanX += p.x; meanY += p.y; });
    meanX /= points.length; meanY /= points.length;

    var covXX = 0, covXY = 0, covYY = 0;
    points.forEach(p => {
      var dx = p.x - meanX, dy = p.y - meanY;
      covXX += dx * dx; covXY += dx * dy; covYY += dy * dy;
    });

    var trace = covXX + covYY;
    var det = covXX * covYY - covXY * covXY;
    var L1 = trace / 2 + Math.sqrt(trace * trace / 4 - det);
    var v1x, v1y;
    if (covXY !== 0) {
      v1x = L1 - covYY; v1y = covXY;
    } else {
      v1x = 1; v1y = 0;
    }
    var mag = Math.sqrt(v1x * v1x + v1y * v1y);
    v1x /= mag; v1y /= mag;

    return { meanX, meanY, v1x, v1y, L1: Math.sqrt(L1 / points.length) };
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0f0c'; ctx.fillRect(0, 0, W, H);

    var pca = computePCA();
    if (pca) {
      ctx.strokeStyle = 'rgba(120, 255, 160, 0.5)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(pca.meanX - pca.v1x * 1000, pca.meanY - pca.v1y * 1000);
      ctx.lineTo(pca.meanX + pca.v1x * 1000, pca.meanY + pca.v1y * 1000);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = '#78ffa0'; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(pca.meanX, pca.meanY);
      ctx.lineTo(pca.meanX + pca.v1x * pca.L1 * 2, pca.meanY + pca.v1y * pca.L1 * 2);
      ctx.stroke();
    }

    points.forEach((p, i) => {
      ctx.fillStyle = i === draggingIdx ? '#fff' : '#4e8b57';
      ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); ctx.fill();
    });
  }

  function init() {
    canvas = document.getElementById('pca-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    canvas.addEventListener('mousedown', function (e) {
      var rect = canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      for (var i = 0; i < points.length; i++) {
        var dx = points[i].x - mx, dy = points[i].y - my;
        if (dx * dx + dy * dy < 100) { draggingIdx = i; break; }
      }
    });
    window.addEventListener('mousemove', function (e) {
      if (draggingIdx === -1) return;
      var rect = canvas.getBoundingClientRect();
      points[draggingIdx].x = (e.clientX - rect.left) * (W / rect.width);
      points[draggingIdx].y = (e.clientY - rect.top) * (H / rect.height);
      draw();
    });
    window.addEventListener('mouseup', function () { draggingIdx = -1; });

    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { running = true; draw(); }
        else { running = false; }
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
