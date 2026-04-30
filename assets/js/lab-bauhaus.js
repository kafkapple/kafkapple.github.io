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
  var _harmonyMode = 'single';
  var _primaryHue  = 0;

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

  // ── HSL Colour Wheel (base draw) ──────────────────────────────────────
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

    // Itten RYB reference triad (fixed decorative markers)
    [[0,'#D40000'],[120,'#F5C800'],[240,'#0057A8']].forEach(function (pair) {
      var angle = (pair[0] / 360) * Math.PI * 2 - Math.PI / 2;
      var mx = cx + r * 0.78 * Math.cos(angle);
      var my = cy + r * 0.78 * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(mx, my, 4, 0, Math.PI * 2);
      ctx.fillStyle = pair[1];
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  // ── Harmony wheel init ────────────────────────────────────────────────
  function initWheel() {
    var canvas = document.getElementById('bauhaus-wheel-canvas');
    if (!canvas || canvas.dataset.bwInit) return;
    canvas.dataset.bwInit = '1';

    var panel = document.getElementById('bauhaus-wheel-panel');
    var sz = panel ? Math.min(Math.max(panel.offsetWidth - 16, 180), 280) : 280;
    canvas.width = sz; canvas.height = sz;

    var cx = canvas.width / 2, cy = canvas.height / 2;
    var r  = Math.min(cx, cy) - 3;
    var ctx = canvas.getContext('2d');
    var dragging = false;
    var DEAD = 22; // dead-zone radius near center (px)

    // hue (0-360) → #rrggbb at s=100%, l=50% — pure math, no pixel sampling
    function hueToHex(hue) {
      hue = ((hue % 360) + 360) % 360;
      var h = hue / 60, X = 1 - Math.abs(h % 2 - 1);
      var rv, gv, bv;
      if      (h < 1) { rv=1;  gv=X;  bv=0;  }
      else if (h < 2) { rv=X;  gv=1;  bv=0;  }
      else if (h < 3) { rv=0;  gv=1;  bv=X;  }
      else if (h < 4) { rv=0;  gv=X;  bv=1;  }
      else if (h < 5) { rv=X;  gv=0;  bv=1;  }
      else            { rv=1;  gv=0;  bv=X;  }
      function hex(v) { return ('0' + Math.round(v * 255).toString(16)).slice(-2); }
      return '#' + hex(rv) + hex(gv) + hex(bv);
    }

    // hue → canvas drawing angle (matching draw loop: hue 0 = 12 o'clock)
    function hueToAngle(hue) {
      return (hue / 360) * 2 * Math.PI - Math.PI / 2;
    }

    // pointer event → hue (corrected: atan2 + π/2 offset to match wheel orientation)
    function posToHue(e) {
      var rect = canvas.getBoundingClientRect();
      var dx = e.clientX - rect.left - cx;
      var dy = e.clientY - rect.top  - cy;
      if (Math.sqrt(dx * dx + dy * dy) < DEAD) return null;
      var rawAngle = Math.atan2(dy, dx);
      var hueRad = ((rawAngle + Math.PI / 2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      return hueRad * 180 / Math.PI;
    }

    function getHarmonyHues() {
      var h = _primaryHue;
      var mod = function (n) { return ((n % 360) + 360) % 360; };
      if (_harmonyMode === 'complementary') return [h, mod(h + 180)];
      if (_harmonyMode === 'triadic')       return [h, mod(h + 120), mod(h + 240)];
      if (_harmonyMode === 'analogous')     return [h, mod(h + 30),  mod(h - 30)];
      return [h];
    }

    function drawMarker(hue, isPrimary) {
      var angle = hueToAngle(hue);
      var mr = r * 0.82;
      var mx = cx + Math.cos(angle) * mr;
      var my = cy + Math.sin(angle) * mr;
      ctx.beginPath();
      ctx.arc(mx, my, isPrimary ? 10 : 7, 0, Math.PI * 2);
      ctx.strokeStyle = isPrimary ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)';
      ctx.lineWidth = isPrimary ? 2.5 : 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(mx, my, isPrimary ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = hueToHex(hue);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mx, my, isPrimary ? 6 : 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawConnectors(hues) {
      if (hues.length < 2) return;
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      var mr = r * 0.82;
      var pts = hues.map(function (h) {
        var a = hueToAngle(h);
        return [cx + Math.cos(a) * mr, cy + Math.sin(a) * mr];
      });
      for (var i = 1; i < pts.length; i++) {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      }
      ctx.restore();
    }

    var LABELS = {
      'single':        ['Primary'],
      'complementary': ['Primary', 'Complement'],
      'triadic':       ['Primary', 'Triad A', 'Triad B'],
      'analogous':     ['Primary', 'Analog +30°', 'Analog −30°']
    };

    function updateSampled(hues) {
      var el = document.getElementById('bauhaus-wheel-sampled');
      if (!el) return;
      el.innerHTML = '';
      if (hues.length === 1) {
        var hex = hueToHex(hues[0]);
        var lum = parseInt(hex.slice(1,3),16)*0.299 + parseInt(hex.slice(3,5),16)*0.587 + parseInt(hex.slice(5,7),16)*0.114;
        el.style.cssText = 'height:28px;border-radius:4px;margin:0.4em 0 0.3em;background:' + hex + ';display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:0.74em;font-weight:700;color:' + (lum > 140 ? '#333' : '#eee') + ';letter-spacing:0.04em;transition:background 200ms,color 200ms;';
        el.textContent = hex.toUpperCase() + '  ' + Math.round(_primaryHue) + '°';
      } else {
        var labels = LABELS[_harmonyMode] || ['Primary'];
        el.style.cssText = 'height:auto;border-radius:4px;margin:0.4em 0 0.3em;background:none;display:flex;gap:3px;';
        hues.forEach(function (hue, i) {
          var hex = hueToHex(hue);
          var wrap = document.createElement('div');
          wrap.style.cssText = 'flex:1;border-radius:3px;overflow:hidden;';
          var sw = document.createElement('div');
          sw.style.cssText = 'height:18px;background:' + hex + ';';
          var lb = document.createElement('div');
          lb.style.cssText = 'padding:1px 2px;font-family:monospace;font-size:0.6em;color:rgba(200,220,210,0.75);text-align:center;line-height:1.5;white-space:pre;';
          lb.textContent = (labels[i] || '') + '\n' + hex.toUpperCase();
          wrap.appendChild(sw); wrap.appendChild(lb);
          el.appendChild(wrap);
        });
      }
    }

    function render() {
      drawWheel(canvas);
      var hues = getHarmonyHues();
      drawConnectors(hues);
      for (var i = hues.length - 1; i >= 1; i--) drawMarker(hues[i], false);
      drawMarker(hues[0], true);
      updateStrip(hues.map(hueToHex));
      updateSampled(hues);
      document.dispatchEvent(new CustomEvent('lab:palette-change', {
        detail: { palette: { name: 'Wheel', swatches: hues.map(hueToHex) }, index: -1 }
      }));
    }

    // Pointer events (drag primary hue marker around wheel)
    canvas.addEventListener('pointerdown', function (e) {
      var hue = posToHue(e);
      if (hue === null) return;
      dragging = true;
      canvas.setPointerCapture(e.pointerId);
      _primaryHue = hue;
      render();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var hue = posToHue(e);
      if (hue === null) return;
      _primaryHue = hue;
      render();
    });
    canvas.addEventListener('pointerup',     function () { dragging = false; });
    canvas.addEventListener('pointercancel', function () { dragging = false; });

    // Mode buttons — inject once per panel, re-wire handlers on each initWheel call
    var bwModesEl = panel && panel.querySelector('.bw-modes');
    if (!bwModesEl) {
      bwModesEl = document.createElement('div');
      bwModesEl.className = 'bw-modes';
      bwModesEl.style.cssText = 'display:flex;gap:4px;margin:0 0 0.35em;flex-wrap:wrap;';
      [['single','Single'], ['complementary','Comp.'], ['triadic','Triadic'], ['analogous','Analog']].forEach(function (pair) {
        var btn = document.createElement('button');
        btn.className = 'lab-btn';
        btn.textContent = pair[1];
        btn.dataset.bwMode = pair[0];
        bwModesEl.appendChild(btn);
      });
      if (panel) panel.insertBefore(bwModesEl, canvas);
    }
    bwModesEl.querySelectorAll('[data-bw-mode]').forEach(function (btn) {
      btn.className = 'lab-btn' + (btn.dataset.bwMode === _harmonyMode ? ' active' : '');
      btn.onclick = function () {
        _harmonyMode = btn.dataset.bwMode;
        bwModesEl.querySelectorAll('[data-bw-mode]').forEach(function (b) {
          b.className = 'lab-btn' + (b === btn ? ' active' : '');
        });
        render();
      };
    });

    render();
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

  document.addEventListener('hy-push-state-after', function () {
    _mode = 'wheel';
    init();
  });
})();
