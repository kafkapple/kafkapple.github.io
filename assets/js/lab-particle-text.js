(function () {
  var canvas, ctx, W, H, particles = [], targets = [];
  var WORDS = ['NeuroAI', 'Plasticity', 'Emergence', 'Spike', 'Context', 'Predict'];
  var wordIdx = 0, customWord = '', running = false, io = null, intervalId = null;
  var mouse = { x: -9999, y: -9999 };
  var REPEL = 55, SPRING = 0.10, DAMP = 0.80;

  var off = document.createElement('canvas');
  var octx = off.getContext('2d');

  function getSpeed() {
    var el = document.getElementById('particle-speed');
    return el ? parseFloat(el.value) : 1;
  }

  function sampleWord(word) {
    off.width = W; off.height = H;
    octx.clearRect(0, 0, W, H);
    octx.fillStyle = '#fff';
    var fs = Math.min(W / word.length * 1.45, H * 0.55);
    octx.font = 'bold ' + fs + 'px sans-serif';
    octx.textAlign = 'center'; octx.textBaseline = 'middle';
    octx.fillText(word, W / 2, H / 2);
    var data = octx.getImageData(0, 0, W, H).data;
    var pts = [], step = 5;
    for (var y = 0; y < H; y += step) {
      for (var x = 0; x < W; x += step) {
        var i = (y * W + x) * 4;
        if (data[i + 3] > 128) pts.push({ x: x, y: y });
      }
    }
    return pts;
  }

  function resize() {
    if (!canvas) return;
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    buildParticles(customWord || WORDS[wordIdx]);
  }

  function buildParticles(word) {
    targets = sampleWord(word);
    var needed = targets.length;
    while (particles.length < needed) {
      particles.push({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, hue: 140 + Math.random() * 40 });
    }
    particles.length = needed;
    for (var i = 0; i < particles.length; i++) {
      particles[i].tx = targets[i].x;
      particles[i].ty = targets[i].y;
    }
  }

  function nextWord() {
    if (customWord) return;
    wordIdx = (wordIdx + 1) % WORDS.length;
    buildParticles(WORDS[wordIdx]);
  }

  function step() {
    var sp = getSpeed() * _speedMul;
    var spring = SPRING * sp, damp = Math.max(0.6, DAMP - (sp - 1) * 0.04);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var dx = p.tx - p.x, dy = p.ty - p.y;
      p.vx += dx * spring; p.vy += dy * spring;
      var mx = p.x - mouse.x, my = p.y - mouse.y;
      var mr = Math.sqrt(mx * mx + my * my) || 1;
      if (mr < REPEL) { var f = (REPEL - mr) / REPEL * 6; p.vx += (mx / mr) * f; p.vy += (my / mr) * f; }
      if (_chaosMul > 0.05) { p.vx += (Math.random() - 0.5) * _chaosMul * 0.8; p.vy += (Math.random() - 0.5) * _chaosMul * 0.8; }
      p.vx *= damp; p.vy *= damp; p.x += p.vx; p.y += p.vy;
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d1510'; ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var s = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      var l = Math.round(55 + Math.min(s * 4, 35));
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(' + p.hue + ',70%,' + l + '%)'; ctx.fill();
    }
  }

  function loop() {
    if (!running || !canvas || !canvas.isConnected) return;
    step(); draw();
    requestAnimationFrame(loop);
  }

  function handleTextChange(e) {
    if (!e.detail || !e.detail.text) return;
    var w = e.detail.text.slice(0, 16);
    customWord = w; buildParticles(w);
    var ti = document.getElementById('particle-text-input');
    if (ti) ti.value = w;
  }

  function init() {
    canvas = document.getElementById('particle-text-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    canvas.addEventListener('click', function () { customWord = ''; var ti = document.getElementById('particle-text-input'); if (ti) ti.value = ''; nextWord(); });
    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (W / rect.width);
      mouse.y = (e.clientY - rect.top) * (H / rect.height);
    });
    canvas.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });

    var ti = document.getElementById('particle-text-input');
    if (ti) {
      ti.addEventListener('input', function () {
        var v = ti.value.trim().slice(0, 16);
        if (v) { customWord = v; buildParticles(customWord); }
        else { customWord = ''; buildParticles(WORDS[wordIdx]); }
      });
    }
    var sl = document.getElementById('particle-speed');
    var sv = document.getElementById('particle-speed-val');
    if (sl && sv) sl.addEventListener('input', function () { sv.textContent = parseFloat(sl.value).toFixed(1) + 'x'; });

    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextWord, 4000);

    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; loop(); }
        else if (!e.isIntersecting) { running = false; }
      });
    }, { threshold: 0.1 });
    io.observe(canvas);

    document.removeEventListener('lab:text-change', handleTextChange);
    document.addEventListener('lab:text-change', handleTextChange);
  }

  var _speedMul = 1.0, _chaosMul = 0.3;
  document.addEventListener('lab:studio', function (e) {
    if (e.detail.kind === 'speed') _speedMul = Math.max(0.1, e.detail.value);
    if (e.detail.kind === 'chaos') _chaosMul = e.detail.value;
  });

  init();
  window.addEventListener('resize', resize);
  document.addEventListener('hy-push-state-start', function () { running = false; if (io) io.disconnect(); if (intervalId) clearInterval(intervalId); });
  document.addEventListener('hy-push-state-after', init);
})();
