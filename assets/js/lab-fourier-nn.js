(function () {
  var canvas, ctx, W, H;
  var running = false, io = null;
  var t = 0;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || 640;
    H = canvas.height = 320;
  }

  function drawFourier(ox, oy, radius, n) {
    var x = ox, y = oy;
    for (var i = 0; i < n; i++) {
      var prevX = x, prevY = y;
      var freq = i * 2 + 1;
      var r = radius * (4 / (freq * Math.PI));
      x += r * Math.cos(freq * t);
      y += r * Math.sin(freq * t);

      ctx.strokeStyle = 'rgba(46, 139, 87, 0.4)';
      ctx.beginPath(); ctx.arc(prevX, prevY, r, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'rgba(120, 255, 160, 0.8)';
      ctx.beginPath(); ctx.moveTo(prevX, prevY); ctx.lineTo(x, y); ctx.stroke();
    }
    return { x: x, y: y };
  }

  function drawNN(ox, oy, w, h) {
    var layers = [4, 6, 6, 2];
    var layerX = w / (layers.length - 1);
    for (var l = 0; l < layers.length; l++) {
      var nodes = layers[l];
      var nodeY = h / (nodes + 1);
      for (var i = 0; i < nodes; i++) {
        var nx = ox + l * layerX;
        var ny = oy + (i + 1) * nodeY;

        if (l < layers.length - 1) {
          var nextNodes = layers[l + 1];
          var nextNodeY = h / (nextNodes + 1);
          for (var j = 0; j < nextNodes; j++) {
            var nnx = ox + (l + 1) * layerX;
            var nny = oy + (j + 1) * nextNodeY;
            var opac = 0.1 + 0.3 * Math.sin(t * 2 + (l + i + j));
            ctx.strokeStyle = 'rgba(80, 200, 120, ' + opac + ')';
            ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nnx, nny); ctx.stroke();
          }
        }
        ctx.fillStyle = 'hsl(140, 70%, ' + (50 + 20 * Math.sin(t * 3 + i)) + '%)';
        ctx.beginPath(); ctx.arc(nx, ny, 4, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0f0c'; ctx.fillRect(0, 0, W, H);

    var pt = drawFourier(120, H / 2, 60, 5);
    // Draw wave
    ctx.beginPath(); ctx.moveTo(pt.x, pt.y);
    ctx.lineTo(250, pt.y); ctx.strokeStyle = '#78ffa0'; ctx.stroke();

    drawNN(300, 50, 300, 220);

    t += 0.05;
    requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('fourier-nn-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

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
