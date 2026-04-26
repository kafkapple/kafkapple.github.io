(function () {
  var canvas = document.getElementById('matrix-rain-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var FONT_SIZE = 13;
  var CHARS = 'αβγδεζηθλμνξπρστφψω∫∇∂∑∏√∞≈≠±ACGTU↑↓→←⊕⊗';
  var TERMS = ['STDP', 'LTP', 'LTD', 'ReLU', 'axon', 'spike', 'GABA', 'NMDA', 'vmPFC', 'DG', 'CA1', 'GRU', 'MLP'];

  var cols = [];
  var W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = 260;
    var n = Math.floor(W / FONT_SIZE);
    cols = [];
    for (var i = 0; i < n; i++) {
      cols.push({
        y: Math.random() * -H,
        speed: 0.8 + Math.random() * 1.4,
        term: null,
        termIdx: 0,
        termTimer: 0,
        termCol: Math.random() < 0.15
      });
    }
  }

  function pickTerm() {
    return TERMS[Math.floor(Math.random() * TERMS.length)];
  }

  function step() {
    ctx.fillStyle = 'rgba(10,16,12,0.18)';
    ctx.fillRect(0, 0, W, H);

    ctx.font = FONT_SIZE + 'px monospace';

    for (var i = 0; i < cols.length; i++) {
      var col = cols[i];
      var x = i * FONT_SIZE;
      var y = col.y;

      if (col.termCol) {
        // research term column — periodically show a term in white
        col.termTimer--;
        if (col.termTimer <= 0 && !col.term) {
          col.term = pickTerm();
          col.termIdx = 0;
          col.termTimer = 60 + Math.random() * 80;
        }
        if (col.term) {
          ctx.fillStyle = '#ffffff';
          var ch = col.term[col.termIdx] || '';
          ctx.fillText(ch, x, y);
          col.termIdx++;
          if (col.termIdx >= col.term.length) col.term = null;
        } else {
          ctx.fillStyle = 'rgba(110,190,135,0.85)';
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y);
        }
      } else {
        // regular char rain
        var isHead = true; // head character is bright
        ctx.fillStyle = isHead ? '#d0ffe0' : 'rgba(46,160,80,0.82)';
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y);
      }

      col.y += FONT_SIZE * col.speed;
      if (col.y > H + FONT_SIZE * 2) {
        col.y = -FONT_SIZE * (2 + Math.random() * 10);
        col.speed = 0.8 + Math.random() * 1.4;
      }
    }
  }

  function loop() {
    if (!canvas.isConnected) return;
    step();
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  loop();

  var _ps = document.getElementById('_pushState');
  if (_ps) _ps.addEventListener('hy-push-state-after', function () {
    var c2 = document.getElementById('matrix-rain-canvas');
    if (c2 && c2 !== canvas) { canvas = c2; ctx = canvas.getContext('2d'); resize(); loop(); }
  });
})();
