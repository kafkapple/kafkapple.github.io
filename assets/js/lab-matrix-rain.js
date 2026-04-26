(function () {
  var canvas = document.getElementById('matrix-rain-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H, cols, drops;
  var CHARS = 'αβγδεζηθλμνξπρστφψω∫∇∂√∞≈±→↑ACGT0189';
  var WORDS = ['STDP','LTP','LTD','ReLU','axon','GABA','soma','NMDA','spike','neuron'];
  var wordTimers = {};

  function resize() {
    W = canvas.width = canvas.offsetWidth || parseInt(canvas.getAttribute('width')) || 640;
    H = canvas.height = parseInt(canvas.getAttribute('height')) || 240;
    cols = Math.floor(W / 14);
    drops = [];
    for (var i = 0; i < cols; i++) drops.push(Math.floor(Math.random() * -H / 14));
  }

  function getSpeed() {
    var el = document.getElementById('matrix-speed');
    return el ? parseFloat(el.value) : 1;
  }

  var frameCount = 0;
  function step() {
    var speed = getSpeed();
    var SKIP = Math.max(1, Math.round(3 / speed));
    frameCount++;
    if (frameCount % SKIP !== 0) return;

    ctx.fillStyle = 'rgba(10,16,12,0.18)'; ctx.fillRect(0, 0, W, H);
    ctx.font = '13px monospace';
    for (var i = 0; i < cols; i++) {
      var y = drops[i] * 14;
      var isWord = wordTimers[i] && wordTimers[i].remaining > 0;
      if (isWord) {
        var wt = wordTimers[i];
        var ch = wt.word[wt.word.length - wt.remaining];
        ctx.fillStyle = '#ffffff'; ctx.fillText(ch, i * 14, y);
        wt.remaining--;
      } else {
        var ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = 'rgba(0,220,80,' + (0.5 + Math.random() * 0.5) + ')';
        ctx.fillText(ch, i * 14, y);
        if (Math.random() < 0.003) { var w = WORDS[Math.floor(Math.random() * WORDS.length)]; wordTimers[i] = { word: w, remaining: w.length }; }
      }
      if (drops[i] * 14 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  function loop() {
    if (!canvas.isConnected) return;
    step();
    requestAnimationFrame(loop);
  }

  // speed slider display
  var speedSlider = document.getElementById('matrix-speed');
  var speedVal = document.getElementById('matrix-speed-val');
  if (speedSlider && speedVal) speedSlider.addEventListener('input', function () { speedVal.textContent = parseFloat(speedSlider.value).toFixed(1) + 'x'; });

  // text input: Enter injects word into multiple columns as a burst
  var wordInput = document.getElementById('matrix-word-input');
  if (wordInput) {
    wordInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && wordInput.value.trim()) {
        var w = wordInput.value.trim().slice(0, 14);
        for (var b = 0; b < Math.min(5, cols); b++) {
          var ci = Math.floor(Math.random() * cols);
          wordTimers[ci] = { word: w, remaining: w.length };
        }
      }
    });
  }

  var running = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !running) { running = true; resize(); loop(); }
      else if (!e.isIntersecting) { running = false; }
    });
  }, { threshold: 0.1 });

  resize();
  window.addEventListener('resize', resize);
  io.observe(canvas);

  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () { io.disconnect(); running = false; });
    _ps.addEventListener('hy-push-state-after', function () {
      var c2 = document.getElementById('matrix-rain-canvas');
      if (c2) { canvas = c2; ctx = canvas.getContext('2d'); resize(); io.observe(canvas); }
    });
  }
})();
