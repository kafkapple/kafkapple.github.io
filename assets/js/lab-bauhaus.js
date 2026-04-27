// Lab: Bauhaus Colour Wheel carousel
// Guard: #bauhaus-track (unique to lab page)
// Extracted from inline script to support SPA re-initialization
(function () {
  var PALETTES = [
    { name: 'Classic', swatches: ['#D40000','#0057A8','#F5C800','#F2EFE9','#1C1C1C'] },
    { name: 'Itten',   swatches: ['#E8320A','#1B4FBE','#F0B429','#1C1C1C','#E8E0D0'] },
    { name: 'Klee',    swatches: ['#C45C00','#2E6B5E','#7B3FA0','#F7F0E0','#2A2018'] },
    { name: 'Night',   swatches: ['#FF4136','#0074D9','#FFDC00','#0A0A0A','#E0E0E8'] }
  ];
  var CARD_W = 220, GAP = 16;

  function init() {
    var container = document.getElementById('bauhaus-wheel-container');
    var track     = document.getElementById('bauhaus-track');
    var indicator = document.getElementById('bauhaus-indicator');
    if (!container || !track) return;

    // Clear for SPA reinit
    track.innerHTML = '';
    if (indicator) indicator.innerHTML = '';

    var current = 0, dragStart = null, dragDelta = 0, baseOffset = 0, cW = 600;

    // Build palette cards
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

    // Build dot indicators
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

    // Defer layout to RAF so offsetWidth is non-zero
    requestAnimationFrame(function () {
      cW = container.offsetWidth || 600;
      baseOffset = cardOffset(0);
      setTrackX(baseOffset, true);
      updateCards();
    });

    // Drag via pointer events — SPA-safe (no window listeners)
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

    // Scroll wheel
    container.addEventListener('wheel', function (e) {
      e.preventDefault();
      snapTo(current + (e.deltaX + e.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    // Click card to select
    track.addEventListener('click', function (e) {
      var card = e.target.closest('[data-idx]');
      if (card && Math.abs(dragDelta) < 4) snapTo(parseInt(card.dataset.idx, 10));
    });
  }

  init();

  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-after', init);
  }
})();
