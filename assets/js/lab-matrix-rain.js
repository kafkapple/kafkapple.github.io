(function () {
  var canvas, ctx, W, H, cols, drops;
  var running = false, io = null;
  var CHARS = 'αβγδεζηθλμνξπρστφψω∫∇∂√∞≈±→↑ACGT0189';
  var WORDS = ['STDP','LTP','LTD','ReLU','axon','GABA','soma','NMDA','spike','neuron'];
  var wordTimers = {};
  var currentWord = '';
  var stepTick = 0, frameCount = 0;

  function resize() {
    if (!canvas) return;
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

  function getInjectRate() {
    var el = document.getElementById('matrix-inject-rate');
    return el ? parseFloat(el.value) : 0;
  }

  function getWordColor() {
    var el = document.getElementById('matrix-word-color');
    return (el && el.value) ? el.value : '#ffffff';
  }

  function step() {
    var speed = getSpeed();
    var SKIP = Math.max(1, Math.round(3 / speed));
    frameCount++;
    if (frameCount % SKIP !== 0) return;
    stepTick++;

    var rate = getInjectRate();
    if (rate > 0 && currentWord) {
      var injectEvery = Math.max(1, Math.round(40 / rate));
      if (stepTick % injectEvery === 0) {
        var ci = Math.floor(Math.random() * cols);
        wordTimers[ci] = { word: currentWord, remaining: currentWord.length };
      }
    }

    ctx.fillStyle = 'rgba(10,16,12,0.18)'; ctx.fillRect(0, 0, W, H);
    ctx.font = '13px monospace';
    var wordColor = getWordColor();
    for (var i = 0; i < cols; i++) {
      var y = drops[i] * 14;
      var isWord = wordTimers[i] && wordTimers[i].remaining > 0;
      if (isWord) {
        var wt = wordTimers[i];
        var ch = wt.word[wt.word.length - wt.remaining];
        ctx.fillStyle = wordColor; ctx.fillText(ch, i * 14, y);
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
    if (!running || !canvas || !canvas.isConnected) return;
    step();
    requestAnimationFrame(loop);
  }

  function handleTextChange(e) {
    if (!e.detail || !e.detail.text) return;
    currentWord = e.detail.text.slice(0, 14);
    var wi = document.getElementById('matrix-word-input');
    if (wi) wi.value = currentWord;
    for (var b = 0; b < Math.min(5, cols); b++) {
      wordTimers[Math.floor(Math.random() * cols)] = { word: currentWord, remaining: currentWord.length };
    }
  }

  function init() {
    canvas = document.getElementById('matrix-rain-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();

    var speedSlider = document.getElementById('matrix-speed');
    var speedVal = document.getElementById('matrix-speed-val');
    if (speedSlider && speedVal) speedSlider.addEventListener('input', function () { speedVal.textContent = parseFloat(speedSlider.value).toFixed(1) + 'x'; });

    var rateSlider = document.getElementById('matrix-inject-rate');
    var rateVal = document.getElementById('matrix-inject-rate-val');
    if (rateSlider && rateVal) rateSlider.addEventListener('input', function () { rateVal.textContent = parseFloat(rateSlider.value).toFixed(1); });

    var colorPicker = document.getElementById('matrix-word-color');
    var colorSwatch = document.getElementById('matrix-word-color-swatch');
    if (colorPicker && colorSwatch) { colorPicker.addEventListener('input', function () { colorSwatch.style.background = colorPicker.value; }); }

    var wordInput = document.getElementById('matrix-word-input');
    if (wordInput) {
      wordInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && wordInput.value.trim()) {
          currentWord = wordInput.value.trim().slice(0, 14);
          for (var b = 0; b < Math.min(5, cols); b++) {
            var ci = Math.floor(Math.random() * cols);
            wordTimers[ci] = { word: currentWord, remaining: currentWord.length };
          }
        }
      });
      wordInput.addEventListener('input', function () { if (!wordInput.value.trim()) currentWord = ''; });
    }

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

  init();
  window.addEventListener('resize', resize);
  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () { running = false; if (io) io.disconnect(); });
    _ps.addEventListener('hy-push-state-after', init);
  }
})();
