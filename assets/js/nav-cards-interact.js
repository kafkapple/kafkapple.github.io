/* nav-cards-interact.js — Interactive Perspective Card Grid + Fullscreen Expand
   MoA-synthesized pattern (2025-04-30): proximity tilt, spotlight, ripple, icon pulse, dynamic shadow, View Transitions expand
   SPA-safe: re-registers on hy-push-state-after */
(function () {
  'use strict';

  var cards = [];
  var ticking = false;
  var boundMove = null;
  var boundLeave = null;
  var boundKey = null;
  var overlay = null;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsVT = 'startViewTransition' in document;

  /* Per-theme overlay content */
  var THEMES = {
    music: {
      label: 'Music',
      sub: '49 Morphines · Noeazy · Jambinai',
      desc: 'Three bands across screamo, metalcore, and experimental post-rock — bass, guitar, and guest performance spanning 2007 to present.',
      href: '#music'
    },
    writing: {
      label: 'Writing & Translation',
      sub: 'Translation · Essay · KAIST',
      desc: 'Science translation and literary criticism — communicating neuroscience across registers.',
      href: '#writing'
    },
    perf: {
      label: 'Performance',
      sub: 'BCI · Museum · Neuroscience',
      desc: 'Interdisciplinary work at the intersection of art, neuroscience, and embodied cognition.',
      href: '#performance'
    },
    lab: {
      label: 'Lab',
      sub: 'Canvas · Boids · Neural · Generative',
      desc: 'Interactive experiments — generative art, physics simulations, creative coding. All canvas, zero dependencies.',
      href: '/lab/'
    }
  };

  /* ── Tilt + spotlight + dynamic shadow ────────────────────────────────── */
  function initMotion() {
    if (prefersReduced) return;
    cards.forEach(function (c) {
      c.style.willChange = 'transform, filter, box-shadow';
      c.style.setProperty('--mouse-x', '-200px');
      c.style.setProperty('--mouse-y', '-200px');
      c.style.setProperty('--dr', '0');
    });
    boundMove = onMove;
    boundLeave = onLeave;
    document.addEventListener('mousemove', boundMove, { passive: true });
    var grid = document.querySelector('.nav-cards-grid');
    if (grid) grid.addEventListener('mouseleave', boundLeave);
  }

  function onMove(e) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateTilt(e.clientX, e.clientY);
      ticking = false;
    });
  }

  function onLeave() { cards.forEach(resetCard); }

  function updateTilt(mx, my) {
    cards.forEach(function (card) {
      var r = card.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var dx = mx - cx;
      var dy = my - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var maxDist = Math.max(r.width, r.height) * 1.6;
      var dr = Math.max(0, 1 - dist / maxDist);

      card.style.setProperty('--mouse-x', (mx - r.left) + 'px');
      card.style.setProperty('--mouse-y', (my - r.top) + 'px');
      card.style.setProperty('--dr', dr.toFixed(3));

      if (dr > 0.01) {
        card.classList.add('is-tilting');
        var tiltX = (dy / r.height) * 9 * dr;
        var tiltY = -(dx / r.width) * 9 * dr;
        var scale = 1 + 0.045 * dr;
        var bright = 1 + 0.14 * dr;
        var sat = 1 + 0.18 * dr;
        /* Dynamic shadow depth: grows with proximity */
        var shadowY = Math.round(6 + 18 * dr);
        var shadowBlur = Math.round(12 + 28 * dr);
        var shadowAlpha = (0.10 + 0.18 * dr).toFixed(3);
        card.style.transform =
          'perspective(900px) rotateX(' + tiltX.toFixed(2) + 'deg)' +
          ' rotateY(' + tiltY.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
        card.style.filter = 'brightness(' + bright.toFixed(3) + ') saturate(' + sat.toFixed(3) + ')';
        card.style.boxShadow = '0 ' + shadowY + 'px ' + shadowBlur + 'px rgba(0,0,0,' + shadowAlpha + ')';
      } else {
        resetCard(card);
      }
    });
  }

  function resetCard(card) {
    card.classList.remove('is-tilting');
    card.style.transform = '';
    card.style.filter = '';
    card.style.boxShadow = '';
    card.style.setProperty('--dr', '0');
    card.style.setProperty('--mouse-x', '-200px');
    card.style.setProperty('--mouse-y', '-200px');
  }

  /* ── Click ripple ─────────────────────────────────────────────────────── */
  function attachRipple(card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.nc-expand')) return;
      if (prefersReduced) return;
      var r = card.getBoundingClientRect();
      var rip = document.createElement('span');
      rip.className = 'nc-ripple';
      rip.style.left = (e.clientX - r.left) + 'px';
      rip.style.top = (e.clientY - r.top) + 'px';
      card.appendChild(rip);
      rip.addEventListener('animationend', function () { rip.remove(); }, { once: true });
    });
  }

  /* ── Icon pulse on hover ─────────────────────────────────────────────── */
  function attachIconPulse(card) {
    var timer = null;
    var icon = card.querySelector('.nc-expand');
    if (!icon) return;
    card.addEventListener('mouseenter', function () {
      timer = setTimeout(function () {
        if (prefersReduced) return;
        icon.classList.add('nc-expand--pulse');
        icon.addEventListener('animationend', function () {
          icon.classList.remove('nc-expand--pulse');
        }, { once: true });
      }, 350);
    });
    card.addEventListener('mouseleave', function () { clearTimeout(timer); });
  }

  /* ── Expand icon button injection ─────────────────────────────────────── */
  function attachExpandIcon(card) {
    var theme = card.dataset.cardTheme;
    if (!theme) return;
    var t = THEMES[theme];
    var btn = document.createElement('button');
    btn.className = 'nc-expand';
    btn.setAttribute('aria-label', 'Expand ' + (t ? t.label : theme));
    btn.setAttribute('type', 'button');
    btn.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"' +
      ' stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M5 1H1v4M9 1h4v4M5 13H1v-4M9 13h4v-4"/></svg>';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openOverlay(card, theme);
    });
    card.appendChild(btn);
  }

  /* ── Fullscreen overlay ───────────────────────────────────────────────── */
  function openOverlay(card, theme) {
    if (overlay) return;
    var t = THEMES[theme] || { label: theme, sub: '', desc: '', href: '#' };

    overlay = document.createElement('div');
    overlay.className = 'nc-overlay';
    overlay.dataset.theme = theme;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', t.label + ' expanded');
    overlay.innerHTML =
      '<div class="nc-overlay__inner">' +
        '<button class="nc-overlay__close" type="button" aria-label="Close">' +
          '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"' +
          ' stroke-width="2.2" stroke-linecap="round"><path d="M3 3l12 12M15 3L3 15"/></svg>' +
        '</button>' +
        '<p class="nc-overlay__label">' + t.sub + '</p>' +
        '<h2 class="nc-overlay__title">' + t.label + '</h2>' +
        '<p class="nc-overlay__desc">' + t.desc + '</p>' +
        '<a class="nc-overlay__cta" href="' + t.href + '">Explore ↓</a>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeOverlay();
    });
    overlay.querySelector('.nc-overlay__close').addEventListener('click', closeOverlay);

    /* View Transitions API — card's position wipes to fullscreen */
    if (supportsVT && !prefersReduced) {
      document.startViewTransition(function () {
        overlay.classList.add('nc-overlay--active');
      });
    } else {
      requestAnimationFrame(function () {
        overlay.classList.add('nc-overlay--active');
      });
    }

    setTimeout(function () {
      var close = overlay.querySelector('.nc-overlay__close');
      if (close) close.focus();
    }, 80);
  }

  function closeOverlay() {
    if (!overlay) return;
    var el = overlay;
    el.classList.remove('nc-overlay--active');
    el.classList.add('nc-overlay--closing');
    document.body.style.overflow = '';
    function onDone() { if (el.parentNode) el.parentNode.removeChild(el); if (overlay === el) overlay = null; }
    el.addEventListener('transitionend', onDone, { once: true });
    /* Safety fallback if transitionend doesn't fire */
    setTimeout(onDone, 600);
  }

  /* ── Init / destroy ───────────────────────────────────────────────────── */
  function init() {
    cards = Array.from(document.querySelectorAll('.nav-cards-grid .nav-card'));
    if (!cards.length) return;

    initMotion();

    cards.forEach(function (c) {
      attachExpandIcon(c);
      attachRipple(c);
      attachIconPulse(c);
    });

    boundKey = function (e) { if (e.key === 'Escape') closeOverlay(); };
    document.addEventListener('keydown', boundKey);
  }

  function destroy() {
    if (boundMove) document.removeEventListener('mousemove', boundMove);
    if (boundKey) document.removeEventListener('keydown', boundKey);
    var grid = document.querySelector('.nav-cards-grid');
    if (grid && boundLeave) grid.removeEventListener('mouseleave', boundLeave);
    cards.forEach(function (c) {
      c.style.willChange = '';
      resetCard(c);
      var btn = c.querySelector('.nc-expand');
      if (btn) btn.remove();
    });
    cards = [];
    boundMove = null;
    boundLeave = null;
    boundKey = null;
    closeOverlay();
  }

  function setup() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  /* Remove overlay when navigating away */
  document.addEventListener('hy-push-state-start', closeOverlay);

  document.addEventListener('hy-push-state-after', function () {
    destroy();
    setup();
  });

  setup();
}());
