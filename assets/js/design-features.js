// Design feature modules: ScrollFade, SpotlightCursor, ReadingProgress, TextScramble
// All modules guard on window.__DESIGN_CONFIG before running.
// SPA-safe: hooks into #_pushState hy-push-state events (not document).

(function () {

  // ── ScrollFade ─────────────────────────────────────────────────────────────
  var ScrollFade = (function () {
    var observer = null;
    var INIT_ATTR = 'data-fade-init';
    var VISIBLE_CLS = 'fade-visible';

    function init() {
      var cfg = window.__DESIGN_CONFIG;
      if (!cfg || !cfg.features.scroll_fade_in) return;
      if (window.__MOTION_REDUCED) {
        document.querySelectorAll('.interest-item').forEach(function (el) {
          el.classList.add(VISIBLE_CLS);
        });
        return;
      }

      var threshold = (cfg.tokens && cfg.tokens.fade_threshold) || 0.12;
      var stagger   = (cfg.tokens && cfg.tokens.fade_stagger_ms) || 80;

      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var idx = parseInt(entry.target.dataset.staggerIdx || '0', 10);
          setTimeout(function () {
            entry.target.classList.add(VISIBLE_CLS);
            if (observer) observer.unobserve(entry.target);
          }, idx * stagger);
        });
      }, { threshold: threshold, rootMargin: '0px 0px -40px 0px' });

      var staggerI = 0;
      document.querySelectorAll('.interest-item').forEach(function (el) {
        if (el.getAttribute(INIT_ATTR)) return;
        // Canvas demos are always visible — fading them in breaks running animations
        if (el.querySelector('canvas')) return;
        el.setAttribute(INIT_ATTR, '1');
        el.dataset.staggerIdx = String(staggerI++);
        observer.observe(el);
      });

      // Fallback: force-show any items IO missed after 2 s
      setTimeout(function () {
        document.querySelectorAll('.interest-item[data-fade-init]:not(.fade-visible)').forEach(function (el) {
          el.classList.add(VISIBLE_CLS);
        });
      }, 2000);
    }

    function destroy() {
      if (observer) { observer.disconnect(); observer = null; }
      document.querySelectorAll('[' + INIT_ATTR + ']').forEach(function (el) {
        el.removeAttribute(INIT_ATTR);
        el.classList.remove(VISIBLE_CLS);
      });
    }

    return { init: init, destroy: destroy };
  })();

  // ── SpotlightCursor ────────────────────────────────────────────────────────
  var SpotlightCursor = (function () {
    var el = null;
    var attached = false;

    function onMove(e) {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
      if (el && el.style.opacity !== '1') el.style.opacity = '1';
    }

    function init() {
      var cfg = window.__DESIGN_CONFIG;
      if (!cfg || !cfg.features.spotlight_cursor) return;
      if (window.__MOTION_REDUCED) return;
      if ('ontouchstart' in window) return;

      if (!document.getElementById('design-spotlight')) {
        el = document.createElement('div');
        el.id = 'design-spotlight';
        document.body.appendChild(el);
      } else {
        el = document.getElementById('design-spotlight');
      }

      if (!attached) {
        window.addEventListener('mousemove', onMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', function () {
          if (el) el.style.opacity = '0';
        });
        attached = true;
      }
    }

    return { init: init };
  })();

  // ── ReadingProgress ────────────────────────────────────────────────────────
  var ReadingProgress = (function () {
    var bar = null;
    var attached = false;

    function onScroll() {
      if (!bar) return;
      var total = document.body.scrollHeight - window.innerHeight;
      var pct = total > 0 ? Math.min(window.scrollY / total * 100, 100) : 0;
      bar.style.width = pct + '%';
    }

    function init() {
      var cfg = window.__DESIGN_CONFIG;
      if (!cfg || !cfg.features.reading_progress) return;

      if (!document.getElementById('reading-progress-bar')) {
        bar = document.createElement('div');
        bar.id = 'reading-progress-bar';
        document.body.appendChild(bar);
      } else {
        bar = document.getElementById('reading-progress-bar');
      }

      if (!attached) {
        window.addEventListener('scroll', onScroll, { passive: true });
        attached = true;
      }
      onScroll();
    }

    function reset() {
      if (bar) bar.style.width = '0%';
      onScroll();
    }

    return { init: init, reset: reset };
  })();

  // ── TextScramble ───────────────────────────────────────────────────────────
  var TextScramble = (function () {
    var CHARS = 'αβγδεζηθλμνξπρστφψω∫∇∂√∞≈±→↑';

    function scramble(el) {
      var cfg = window.__DESIGN_CONFIG;
      if (!cfg || !cfg.features.text_scramble) return;
      if (window.__MOTION_REDUCED) return;
      var original = el.dataset.scrambleOriginal || el.textContent;
      el.dataset.scrambleOriginal = original;
      var steps = 0, max = original.length * 3;
      var id = setInterval(function () {
        el.textContent = original.split('').map(function (ch, i) {
          if (i < Math.floor(steps / 3)) return original[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        steps++;
        if (steps > max) { clearInterval(id); el.textContent = original; }
      }, 40);
    }

    function init() {
      document.querySelectorAll('[data-scramble]').forEach(function (el) {
        el.addEventListener('mouseenter', function () { scramble(el); });
      });
    }

    return { init: init };
  })();

  // ── SPA Lifecycle ──────────────────────────────────────────────────────────
  function onPageLoad() {
    ScrollFade.init();
    ReadingProgress.init();
    SpotlightCursor.init();
    TextScramble.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onPageLoad);
  } else {
    onPageLoad();
  }

  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-start', function () {
      ScrollFade.destroy();
    });
    _ps.addEventListener('hy-push-state-after', function () {
      ReadingProgress.reset();
      onPageLoad();
    });
  }

})();
