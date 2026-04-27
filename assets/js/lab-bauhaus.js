// Lab: Bauhaus Colour System — dual mode (HSL wheel + palette carousel)
(function () {
  var PALETTES = [
    { name: 'Classic', swatches: ['#D40000','#0057A8','#F5C800','#F2EFE9','#1C1C1C'] },
    { name: 'Itten',   swatches: ['#E8320A','#1B4FBE','#F0B429','#1C1C1C','#E8E0D0'] },
    { name: 'Klee',    swatches: ['#C45C00','#2E6B5E','#7B3FA0','#F7F0E0','#2A2018'] },
    { name: 'Night',   swatches: ['#FF4136','#0074D9','#FFDC00','#0A0A0A','#E0E0E8'] }
  ];
  var CARD_W = 220, GAP = 16;
  var _mode = 'wheel';

  // ── Shared palette strip ──────────────────────────────────────────────
  function updateStrip(swatches) {
    var strip = document.getElementById('bauhaus-palette-strip');
    if (!strip) return;
    strip.innerHTML = '';
    swatches.forEach(function (hex) {
      var el = document.createElement('div');
      el.style.cssText = 'flex:1;background:' + hex + ';cursor:pointer;transition:flex 200ms ease;';
      el.title = hex;
      el.addEventListener('click', function () {
        document.dispatchEvent(new CustomEvent('lab:color-select', { detail: { hex: hex } }));
      });
      strip.appendChild(el);
    });
  }

  // ── HSL Colour Wheel ──────────────────────────────────────────────────
  function drawWheel(canvas) {
    var ctx = canvas.getContext('2d');
    var cx = canvas.width / 2, cy = canvas.height / 2;
    var r = Math.min(cx, cy) - 3;

    for (var h = 0; h < 360; h++) {
      var a0 = (h / 360) * Math.PI * 2 - Math.PI / 2;
      var a1 = ((h + 1.5) / 360) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = 'hsl(' + h + ',100%,50%)';
      ctx.fill();
    }

    var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, 'rgba(255,255,255,0.95)');
    grad.addColorStop(0.42, 'rgba(255,255,255,0.28)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Itten RYB primary triad markers
    [[0,'#D40000'],[120,'#F5C800'],[240,'#0057A8']].forEach(function (pair) {
      var angle = (pair[0] / 360) * Math.PI * 2 - Math.PI / 2;
      var mx = cx + r * 0.78 * Math.cos(angle);
      var my = cy + r * 0.78 * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(mx, my, 5, 0, Math.PI * 2);
      ctx.fillStyle = pair[1];
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.75)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  function initWheel() {
    var canvas = document.getElementById('bauhaus-wheel-canvas');
    if (!canvas || canvas.dataset.bwInit) return;
    canvas.dataset.bwInit = '1';

    var panel = document.getElementById('bauhaus-wheel-panel');
    var sz = panel ? Math.min(Math.max(panel.offsetWidth - 16, 180), 280) : 280;
    canvas.width = sz; canvas.height = sz;

    drawWheel(canvas);

    var sampledEl = document.getElementById('bauhaus-wheel-sampled');

    canvas.addEventListener('click', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = (e.clientX - rect.left) * (canvas.width / rect.width);
      var sy = (e.clientY - rect.top) * (canvas.height / rect.height);
      var cx = canvas.width / 2, cy = canvas.height / 2, r = Math.min(cx, cy) - 3;
      if ((sx - cx) * (sx - cx) + (sy - cy) * (sy - cy) > r * r) return;

      var px = canvas.getContext('2d').getImageData(Math.round(sx), Math.round(sy), 1, 1).data;
      var hex = '#' + [px[0], px[1], px[2]].map(function (v) {
        return ('0' + v.toString(16)).slice(-2);
      }).join('');

      drawWheel(canvas);
      var ctx2 = canvas.getContext('2d');
      ctx2.beginPath();
      ctx2.arc(Math.round(sx), Math.round(sy), 9, 0, Math.PI * 2);
      ctx2.strokeStyle = '#fff';
      ctx2.lineWidth = 2.5;
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.arc(Math.round(sx), Math.round(sy), 9, 0, Math.PI * 2);
      ctx2.strokeStyle = '#000';
      ctx2.lineWidth = 1;
      ctx2.stroke();

      if (sampledEl) {
        sampledEl.style.background = hex;
        sampledEl.textContent = hex;
        var lum = px[0] * 0.299 + px[1] * 0.587 + px[2] * 0.114;
        sampledEl.style.color = lum > 140 ? '#333' : '#eee';
        sampledEl.style.fontWeight = '700';
      }
      updateStrip([hex]);
      document.dispatchEvent(new CustomEvent('lab:color-select', { detail: { hex: hex } }));
      document.dispatchEvent(new CustomEvent('lab:palette-change', {
        detail: { palette: { name: 'Sampled', swatches: [hex] }, index: -1 }
      }));
    });
  }

  // ── Tab switching ─────────────────────────────────────────────────────
  function initTabs() {
    document.querySelectorAll('.bauhaus-tab').forEach(function (tab) {
      if (tab.dataset.bwTab) return;
      tab.dataset.bwTab = '1';
      tab.addEventListener('click', function () {
        var mode = tab.dataset.mode;
        if (mode === _mode) return;
        _mode = mode;
        document.querySelectorAll('.bauhaus-tab').forEach(function (t) {
          t.classList.toggle('active', t.dataset.mode === mode);
        });
        var wp = document.getElementById('bauhaus-wheel-panel');
        var cp = document.getElementById('bauhaus-carousel-panel');
        if (wp) wp.style.display = mode === 'wheel' ? '' : 'none';
        if (cp) cp.style.display = mode === 'carousel' ? '' : 'none';
        if (mode === 'wheel') {
          var wc = document.getElementById('bauhaus-wheel-canvas');
          if (wc) delete wc.dataset.bwInit;
          setTimeout(initWheel, 0);
        } else {
          initCarousel();
        }
      });
    });
  }

  // ── Carousel ──────────────────────────────────────────────────────────
  function initCarousel() {
    var container = document.getElementById('bauhaus-wheel-container');
    var track     = document.getElementById('bauhaus-track');
    var indicator = document.getElementById('bauhaus-indicator');
    if (!container || !track) return;

    track.innerHTML = '';
    if (indicator) indicator.innerHTML = '';

    var current = 0, dragStart = null, dragDelta = 0, baseOffset = 0, cW = 600;

    PALETTES.forEach(function (p, i) {
      var card = document.createElement('div');
      card.style.cssText = 'flex-shrink:0;width:' + CARD_W + 'px;margin-right:' + GAP + 'px;height:140px;margin-top:20px;border-radius:6px;overflow:hidden;transition:transform 220ms ease,box-shadow 220ms ease;';
      card.dataset.idx = i;
      var bar = document.createElement('div');
      bar.style.cssText = 'display:flex;height:72%;';
      p.swatches.forEach(function (hex) {
        var s = document.createElement('div');
        s.style.cssText = 'flex:1;background:' + hex + ';';
        bar.appendChild(s);
      });
      var lbl = document.createElement('div');
      lbl.style.cssText = 'height:28%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.72);font-family:monospace;font-size:0.8em;font-weight:700;letter-spacing:0.1em;color:rgba(220,220,200,0.85);';
      lbl.textContent = p.name.toUpperCase();
      card.appendChild(bar); card.appendChild(lbl);
      track.appendChild(card);
    });

    if (indicator) {
      PALETTES.forEach(function () {
        var dot = document.createElement('div');
        dot.style.cssText = 'width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.2);transition:background 200ms,transform 200ms;';
        indicator.appendChild(dot);
      });
    }

    function cardOffset(idx) { return cW / 2 - CARD_W / 2 - idx * (CARD_W + GAP); }
    function clampIdx(i)    { return Math.max(0, Math.min(PALETTES.length - 1, i)); }

    function updateCards() {
      track.querySelectorAll('[data-idx]').forEach(function (card, i) {
        var dist = Math.abs(i - current);
        card.style.transform = 'scale(' + (dist === 0 ? 1.05 : dist === 1 ? 0.88 : 0.76) + ')';
        card.style.boxShadow = dist === 0 ? '0 4px 20px rgba(0,0,0,0.6)' : 'none';
        card.style.opacity   = (dist > 2 ? 0.3 : 1 - dist * 0.22).toString();
      });
      if (indicator) {
        indicator.querySelectorAll('div').forEach(function (dot, i) {
          dot.style.background = i === current ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)';
          dot.style.transform  = i === current ? 'scale(1.4)' : 'scale(1)';
        });
      }
      updateStrip(PALETTES[current].swatches);
      document.dispatchEvent(new CustomEvent('lab:palette-change', { detail: { palette: PALETTES[current], index: current } }));
    }

    function setTrackX(x, instant) {
      track.style.transition = instant ? 'none' : 'transform 280ms cubic-bezier(0.25,0.46,0.45,0.94)';
      track.style.transform  = 'translateX(' + x + 'px)';
    }

    function snapTo(idx) {
      current = clampIdx(idx);
      baseOffset = cardOffset(current);
      setTrackX(baseOffset, false);
      updateCards();
    }

    requestAnimationFrame(function () {
      cW = container.offsetWidth || 600;
      baseOffset = cardOffset(0);
      setTrackX(baseOffset, true);
      updateCards();
    });

    var startIdx = 0;
    container.addEventListener('pointerdown', function (e) {
      cW = container.offsetWidth || cW;
      startIdx = current; dragStart = e.clientX; dragDelta = 0;
      container.style.cursor = 'grabbing';
      track.style.transition = 'none';
      container.setPointerCapture(e.pointerId);
    });
    container.addEventListener('pointermove', function (e) {
      if (dragStart === null) return;
      dragDelta = e.clientX - dragStart;
      setTrackX(baseOffset + dragDelta, false);
      var tentative = clampIdx(startIdx - Math.round(dragDelta / (CARD_W + GAP)));
      if (tentative !== current) { current = tentative; updateCards(); }
    });
    container.addEventListener('pointerup', function () {
      if (dragStart === null) return;
      var snapIdx = clampIdx(startIdx - Math.round(dragDelta / (CARD_W + GAP)));
      if (snapIdx === startIdx && Math.abs(dragDelta) > (CARD_W + GAP) * 0.3) {
        snapIdx = clampIdx(startIdx + (dragDelta < 0 ? 1 : -1));
      }
      snapTo(snapIdx);
      dragStart = null; container.style.cursor = 'grab';
    });

    container.addEventListener('wheel', function (e) {
      e.preventDefault();
      snapTo(current + (e.deltaX + e.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    track.addEventListener('click', function (e) {
      var card = e.target.closest('[data-idx]');
      if (card && Math.abs(dragDelta) < 4) snapTo(parseInt(card.dataset.idx, 10));
    });
  }

  // ── Main init ─────────────────────────────────────────────────────────
  function init() {
    if (!document.getElementById('bauhaus-tabs')) return;
    var wc = document.getElementById('bauhaus-wheel-canvas');
    if (wc) delete wc.dataset.bwInit;
    document.querySelectorAll('.bauhaus-tab').forEach(function (t) { delete t.dataset.bwTab; });

    initTabs();

    if (_mode === 'wheel') {
      setTimeout(initWheel, 60);
    } else {
      initCarousel();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-after', function () {
      _mode = 'wheel';
      init();
    });
  }
})();
