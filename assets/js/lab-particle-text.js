(function () {
  var canvas = document.getElementById('particle-text-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var WORDS = ['NeuroAI', 'Plasticity', 'Emergence', 'Spike', 'Context', 'Predict'];
  var wordIdx = 0;
  var particles = [];
  var targets = [];
  var W, H;
  var mouse = { x: -9999, y: -9999 };
  var REPEL = 55, SPRING = 0.10, DAMP = 0.80;

  var off = document.createElement('canvas');
  var octx = off.getContext('2d');

  function sampleWord(word) {
    off.width = W;
    off.height = H;
    octx.clearRect(0, 0, W, H);
    octx.fillStyle = '#fff';
    var fs = Math.min(W / word.length * 1.45, H * 0.55);
    octx.font = 'bold ' + fs + 'px sans-serif';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillText(word, W / 2, H / 2);
    var data = octx.getImageData(0, 0, W, H).data;
    var pts = [];
    var step = 5;
    for (var y = 0; y < H; y += step) {
      for (var x = 0; x < W; x += step) {
        var idx = (y * W + x) * 4;
        if (data[idx + 3] > 128) pts.push({ x: x, y: y });
      }
    }
    return pts;
  }

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = 220;
    buildParticles(WORDS[wordIdx]);
  }

  function buildParticles(word) {
    targets = sampleWord(word);
    var needed = targets.length;

    // add or remove particles to match
    while (particles.length < needed) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: 0, vy: 0,
        hue: 140 + Math.random() * 40
      });
    }
    particles.length = needed;

    for (var i = 0; i < particles.length; i++) {
      var t = targets[i];
      particles[i].tx = t.x;
      particles[i].ty = t.y;
    }
  }

  function nextWord() {
    wordIdx = (wordIdx + 1) % WORDS.length;
    buildParticles(WORDS[wordIdx]);
  }

  canvas.addEventListener('click', nextWord);
  canvas.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * (W / rect.width);
    mouse.y = (e.clientY - rect.top) * (H / rect.height);
  });
  canvas.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });

  // auto-cycle every 4 seconds
  var intervalId = setInterval(nextWord, 4000);

  function step() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var dx = p.tx - p.x, dy = p.ty - p.y;
      p.vx += dx * SPRING;
      p.vy += dy * SPRING;

      var mx = p.x - mouse.x, my = p.y - mouse.y;
      var mr = Math.sqrt(mx * mx + my * my) || 1;
      if (mr < REPEL) {
        var f = (REPEL - mr) / REPEL * 6;
        p.vx += (mx / mr) * f;
        p.vy += (my / mr) * f;
      }

      p.vx *= DAMP;
      p.vy *= DAMP;
      p.x += p.vx;
      p.y += p.vy;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d1510';
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      var l = Math.round(55 + Math.min(speed * 4, 35));
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(' + p.hue + ',70%,' + l + '%)';
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
    var c2 = document.getElementById('particle-text-canvas');
    if (c2 && c2 !== canvas) {
      clearInterval(intervalId);
      canvas = c2; ctx = canvas.getContext('2d'); resize(); loop();
      intervalId = setInterval(nextWord, 4000);
    }
  });
})();
