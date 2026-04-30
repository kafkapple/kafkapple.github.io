(function () {
  var canvas, ctx, W, H;
  var running = false, io = null;
  var maxIter = 64;
  var cx = -0.7, cy = 0.27015;
  var zoom = 1, offsetX = 0, offsetY = 0;

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || 640;
    H = canvas.height = 240;
    draw();
  }

  function draw() {
    if (!ctx) return;
    var imgData = ctx.createImageData(W, H);
    var data = imgData.data;

    for (var i = 0; i < W; i++) {
      for (var j = 0; j < H; j++) {
        var zx = 1.5 * (i - W / 2) / (0.5 * zoom * W) + offsetX;
        var zy = (j - H / 2) / (0.5 * zoom * H) + offsetY;
        var iter = 0;
        while (zx * zx + zy * zy < 4 && iter < maxIter) {
          var tmp = zx * zx - zy * zy + cx;
          zy = 2.0 * zx * zy + cy;
          zx = tmp;
          iter++;
        }
        var pix = (i + j * W) * 4;
        var t = iter / maxIter;
        data[pix] = 20 + t * 100;
        data[pix + 1] = 40 + t * 180;
        data[pix + 2] = 30 + t * 120;
        data[pix + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function init() {
    canvas = document.getElementById('fractal-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      cx = (e.clientX - rect.left) / rect.width * 2 - 1;
      cy = (e.clientY - rect.top) / rect.height * 2 - 1;
      draw();
    });

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
