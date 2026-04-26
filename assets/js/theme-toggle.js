// Theme toggle: light/dark with localStorage persistence and FOUC prevention.
// Default is always 'light'; data-theme attribute applied by inline head script first.
(function () {
  var KEY = 'theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  function getTheme() {
    return localStorage.getItem(KEY) || LIGHT;
  }

  function applyTheme(theme) {
    var html = document.documentElement;
    html.setAttribute('data-theme', theme);
    if (theme === DARK) {
      html.classList.add('dark-mode');
      html.classList.remove('light-mode');
    } else {
      html.classList.remove('dark-mode');
      html.classList.add('light-mode');
    }
    var btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    if (btn) btn.textContent = theme === DARK ? '☀' : '☾'; // ☀ : ☾
  }

  function toggle() {
    var next = getTheme() === DARK ? LIGHT : DARK;
    localStorage.setItem(KEY, next);
    applyTheme(next);
  }

  function injectButton() {
    if (document.getElementById('theme-toggle-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.setAttribute('aria-label', getTheme() === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    btn.textContent = getTheme() === DARK ? '☀' : '☾';
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);
  }

  applyTheme(getTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }

  // Re-inject on Hydejack SPA navigation (button removed from old DOM)
  document.addEventListener('DOMContentLoaded', function () {
    var ps = document.getElementById('_pushState');
    if (ps) {
      ps.addEventListener('hy-push-state-after', function () {
        injectButton();
        applyTheme(getTheme());
      });
    }
  });
})();
