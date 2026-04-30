/* nav-cards-interact.js — proximity tilt + spotlight for .nav-cards-grid
   MoA-synthesized: Interactive Perspective Card Grid pattern
   SPA-safe: re-registers on hy-push-state-after */
(function () {
  'use strict';

  var cards = [];
  var ticking = false;
  var boundMove = null;
  var boundLeave = null;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    cards = Array.from(document.querySelectorAll('.nav-cards-grid .nav-card'));
    if (!cards.length || prefersReduced) return;

    cards.forEach(function (c) {
      c.style.willChange = 'transform, filter';
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
      update(e.clientX, e.clientY);
      ticking = false;
    });
  }

  function onLeave() {
    cards.forEach(resetCard);
  }

  function update(mx, my) {
    cards.forEach(function (card) {
      var r = card.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var dx = mx - cx;
      var dy = my - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var maxDist = Math.max(r.width, r.height) * 1.6;
      var dr = Math.max(0, 1 - dist / maxDist);

      /* local coords for spotlight */
      var lx = mx - r.left;
      var ly = my - r.top;
      card.style.setProperty('--mouse-x', lx + 'px');
      card.style.setProperty('--mouse-y', ly + 'px');
      card.style.setProperty('--dr', dr.toFixed(3));

      if (dr > 0.01) {
        var tiltX = (dy / r.height) * 9 * dr;
        var tiltY = -(dx / r.width) * 9 * dr;
        var scale = 1 + 0.045 * dr;
        var bright = 1 + 0.14 * dr;
        var sat = 1 + 0.18 * dr;
        card.style.transform =
          'perspective(900px) rotateX(' + tiltX.toFixed(2) + 'deg)' +
          ' rotateY(' + tiltY.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
        card.style.filter = 'brightness(' + bright.toFixed(3) + ') saturate(' + sat.toFixed(3) + ')';
      } else {
        resetCard(card);
      }
    });
  }

  function resetCard(card) {
    card.style.transform = '';
    card.style.filter = '';
    card.style.setProperty('--dr', '0');
    card.style.setProperty('--mouse-x', '-200px');
    card.style.setProperty('--mouse-y', '-200px');
  }

  function destroy() {
    if (boundMove) document.removeEventListener('mousemove', boundMove);
    var grid = document.querySelector('.nav-cards-grid');
    if (grid && boundLeave) grid.removeEventListener('mouseleave', boundLeave);
    cards.forEach(function (c) {
      c.style.willChange = '';
      resetCard(c);
    });
    cards = [];
  }

  function setup() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  /* Hydejack SPA re-init */
  document.addEventListener('hy-push-state-after', function () {
    destroy();
    setup();
  });

  setup();
}());
