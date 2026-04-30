/* lab-fullscreen.js — Canvas fullscreen overlay for Lab page
   Moves the canvas DOM node into a fixed overlay, dispatches resize so
   each module redraws at the new size. ESC / close button to restore.
   SPA-safe: re-registers on hy-push-state-after. */
(function () {
  'use strict';

  var overlay = null;
  var activeCanvas = null;
  var placeholder = null;
  var savedStyle = null;
  var savedAttrs = null;
  var originalParent = null;
  var originalNext = null;

  /* ── Compute letterbox size ────────────────────────────────────────── */
  function fsSize(canvas) {
    var ow = parseInt(canvas.getAttribute('width'), 10) || canvas.offsetWidth || 640;
    var oh = parseInt(canvas.getAttribute('height'), 10) || canvas.offsetHeight || 240;
    var ar = ow / oh;
    var vw = window.innerWidth  * 0.97;
    var vh = window.innerHeight * 0.93;
    var W, H;
    if (vw / vh > ar) { H = vh; W = H * ar; }
    else               { W = vw; H = W / ar; }
    return { W: Math.round(W), H: Math.round(H) };
  }

  /* ── Open ─────────────────────────────────────────────────────────── */
  function open(canvas) {
    if (overlay) return;
    activeCanvas = canvas;
    originalParent = canvas.parentNode;
    originalNext   = canvas.nextSibling;

    /* Save current CSS + attribute state */
    savedStyle = canvas.getAttribute('style') || '';
    savedAttrs = {
      width:  canvas.getAttribute('width'),
      height: canvas.getAttribute('height')
    };

    /* Placeholder keeps the original position in DOM */
    placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    originalParent.insertBefore(placeholder, originalNext);

    /* Build overlay */
    overlay = document.createElement('div');
    overlay.id = 'lab-fs-overlay';
    overlay.innerHTML =
      '<button class="lab-fs-close" aria-label="Close fullscreen">' +
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">' +
          '<path d="M2 2l12 12M14 2L2 14"/>' +
        '</svg>' +
      '</button>';
    overlay.querySelector('.lab-fs-close').addEventListener('click', close);
    document.body.appendChild(overlay);

    /* Move canvas */
    overlay.appendChild(canvas);
    document.body.style.overflow = 'hidden';

    /* Animate in */
    requestAnimationFrame(function () {
      overlay.classList.add('lab-fs-active');

      /* Resize canvas to fill overlay */
      var s = fsSize(canvas);
      canvas.setAttribute('width',  s.W);
      canvas.setAttribute('height', s.H);
      canvas.style.cssText = 'width:' + s.W + 'px;height:' + s.H + 'px;display:block;border-radius:4px;';
      window.dispatchEvent(new Event('resize'));
    });
  }

  /* ── Close ────────────────────────────────────────────────────────── */
  function close() {
    if (!overlay || !activeCanvas) return;
    var canvas = activeCanvas;

    /* Restore canvas */
    canvas.setAttribute('style', savedStyle);
    if (savedAttrs.width)  canvas.setAttribute('width',  savedAttrs.width);
    if (savedAttrs.height) canvas.setAttribute('height', savedAttrs.height);

    /* Move back to original position */
    originalParent.insertBefore(canvas, placeholder);
    placeholder.remove();
    placeholder = null;

    /* Remove overlay */
    overlay.classList.remove('lab-fs-active');
    var el = overlay;
    overlay = null;
    activeCanvas = null;

    document.body.style.overflow = '';
    window.dispatchEvent(new Event('resize'));

    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }

  /* ── Keyboard ─────────────────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  /* ── SPA ──────────────────────────────────────────────────────────── */
  document.addEventListener('hy-push-state-start', close);

  /* ── Button injection ─────────────────────────────────────────────── */
  function attachButtons() {
    document.querySelectorAll('.lab-canvas').forEach(function (canvas) {
      if (canvas.dataset.fsReady) return;
      canvas.dataset.fsReady = '1';

      /* Wrap canvas in relative container */
      var wrap = document.createElement('div');
      wrap.className = 'lab-fs-wrap';
      canvas.parentNode.insertBefore(wrap, canvas);
      wrap.appendChild(canvas);

      /* Expand button */
      var btn = document.createElement('button');
      btn.className = 'lab-fs-btn';
      btn.title = 'Fullscreen';
      btn.setAttribute('aria-label', 'Open fullscreen');
      btn.innerHTML =
        '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M1 4.5V1h3.5M8.5 1H12v3.5M1 8.5V12h3.5M8.5 12H12V8.5"/>' +
        '</svg>';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        open(canvas);
      });
      wrap.appendChild(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachButtons);
  } else {
    attachButtons();
  }
  document.addEventListener('hy-push-state-after', attachButtons);
}());
