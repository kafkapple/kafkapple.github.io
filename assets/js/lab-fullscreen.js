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

    savedStyle = canvas.getAttribute('style') || '';
    savedAttrs = {
      width:  canvas.getAttribute('width'),
      height: canvas.getAttribute('height')
    };

    placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    originalParent.insertBefore(placeholder, originalNext);

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

    overlay.appendChild(canvas);
    document.body.style.overflow = 'hidden';

    /* Capture locals so stale rAF from a prior open/close cycle cannot
       corrupt state if close() + open() fires before this frame runs. */
    var capturedOverlay = overlay;
    var capturedCanvas  = canvas;
    requestAnimationFrame(function () {
      /* Guard: close() may have nulled overlay before this frame ran. */
      if (!capturedOverlay || !capturedOverlay.parentNode) return;
      capturedOverlay.classList.add('lab-fs-active');

      var s = fsSize(capturedCanvas);
      capturedCanvas.setAttribute('width',  s.W);
      capturedCanvas.setAttribute('height', s.H);
      capturedCanvas.style.cssText = 'width:' + s.W + 'px;height:' + s.H + 'px;display:block;border-radius:4px;';
      window.dispatchEvent(new Event('resize'));
    });
  }

  /* ── Close ────────────────────────────────────────────────────────── */
  function close() {
    if (!overlay || !activeCanvas) return;
    var canvas = activeCanvas;

    /* Restore inline style — use removeAttribute when original had none. */
    if (savedStyle) { canvas.setAttribute('style', savedStyle); }
    else            { canvas.removeAttribute('style'); }
    /* Restore dimensions — explicit null check so width="0" is preserved. */
    if (savedAttrs.width  !== null) canvas.setAttribute('width',  savedAttrs.width);
    if (savedAttrs.height !== null) canvas.setAttribute('height', savedAttrs.height);

    /* Guard: SPA navigation may have removed originalParent from DOM.
       Detach canvas from overlay either way so it isn't destroyed with it. */
    if (originalParent && originalParent.isConnected) {
      originalParent.insertBefore(canvas, placeholder);
    } else if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    if (placeholder && placeholder.parentNode) { placeholder.remove(); }
    placeholder = null;

    overlay.classList.remove('lab-fs-active');
    var el = overlay;
    overlay = null;
    activeCanvas = null;

    document.body.style.overflow = '';

    /* Defer resize by one rAF so the browser has a layout pass after the
       canvas is reinserted — prevents resize handlers reading offsetWidth=0. */
    requestAnimationFrame(function () {
      window.dispatchEvent(new Event('resize'));
    });

    /* Remove overlay after CSS fade-out completes; transitionend avoids the
       350ms window where a zombie overlay sits in DOM with a broken close btn.
       Fallback timer ensures removal even when transition is absent (e.g.
       prefers-reduced-motion) or transitionend never fires. */
    var removeTimer = setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 600);
    el.addEventListener('transitionend', function onEnd(e) {
      /* Filter by target and property so multi-property transitions don't
         remove the overlay before the fade-out visually completes. */
      if (e.target !== el || e.propertyName !== 'opacity') return;
      clearTimeout(removeTimer);
      el.removeEventListener('transitionend', onEnd);
      if (el.parentNode) el.parentNode.removeChild(el);
    });
  }

  /* ── Keyboard ─────────────────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  /* ── SPA ──────────────────────────────────────────────────────────── */
  document.addEventListener('hy-push-state-start', close);

  /* ── Button injection ─────────────────────────────────────────────── */
  function attachButtons() {
    document.querySelectorAll('.lab-canvas').forEach(function (canvas) {
      if (canvas.dataset.fsReady) return;
      /* Skip subordinate canvases that are part of a multi-canvas widget. */
      if (canvas.dataset.fsSkip)  return;
      canvas.dataset.fsReady = '1';

      var wrap = document.createElement('div');
      wrap.className = 'lab-fs-wrap';
      canvas.parentNode.insertBefore(wrap, canvas);
      wrap.appendChild(canvas);

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
