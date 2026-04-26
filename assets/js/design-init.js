// Design System Init — parses YAML config baked into <meta name="design-config">
// Runs once; window.__DESIGN_CONFIG persists across Hydejack SPA navigations.
(function () {
  if (window.__DESIGN_CONFIG) return;

  var meta = document.querySelector('meta[name="design-config"]');
  if (!meta) {
    window.__DESIGN_CONFIG = { features: {}, tokens: {} };
    return;
  }

  try {
    window.__DESIGN_CONFIG = JSON.parse(meta.getAttribute('content'));
  } catch (e) {
    console.warn('[design] config parse failed', e);
    window.__DESIGN_CONFIG = { features: {}, tokens: {} };
    return;
  }

  // Write token CSS custom properties to :root (overrides scss defaults)
  var t = window.__DESIGN_CONFIG.tokens || {};
  var root = document.documentElement;
  if (t.glow_rgb)       root.style.setProperty('--glow-rgb', t.glow_rgb);
  if (t.glow_light_rgb) root.style.setProperty('--glow-light-rgb', t.glow_light_rgb);
  if (t.duration_fast)  root.style.setProperty('--dur-fast', t.duration_fast);
  if (t.duration_base)  root.style.setProperty('--dur-base', t.duration_base);
  if (t.ease_spring)    root.style.setProperty('--ease-spring', t.ease_spring);
  if (t.ease_smooth)    root.style.setProperty('--ease-smooth', t.ease_smooth);

  // Prefers-reduced-motion — set data-motion attribute for CSS/JS consumption
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function applyMotion(reduced) {
    root.setAttribute('data-motion', reduced ? 'reduced' : 'full');
    window.__MOTION_REDUCED = reduced;
  }
  applyMotion(mq.matches);
  if (mq.addEventListener) {
    mq.addEventListener('change', function (e) { applyMotion(e.matches); });
  }
})();
