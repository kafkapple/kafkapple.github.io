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
    if (btn) {
      btn.textContent = theme === DARK ? '☀' : '☾';
      btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function toggle() {
    var next = getTheme() === DARK ? LIGHT : DARK;
    localStorage.setItem(KEY, next);
    applyTheme(next);
  }

  function injectButton() {
    if (document.getElementById('theme-toggle-btn')) {
      applyTheme(getTheme());
      return;
    }
    if (!document.body) return;
    var btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.textContent = getTheme() === DARK ? '☀' : '☾';
    btn.setAttribute('aria-label', getTheme() === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);
  }

  function onNavComplete() {
    injectButton();
    applyTheme(getTheme());
  }

  function attachSpaListener() {
    var ps = document.getElementById('_pushState');
    if (ps) ps.addEventListener('hy-push-state-after', onNavComplete);
  }

  // Apply theme immediately (FOUC already handled by inline head script)
  applyTheme(getTheme());

  // Inject button: now (defer = DOM ready after parsing), plus two fallbacks
  // in case Hydejack initialization happens between defer script execution and
  // DOMContentLoaded and clears/replaces body children.
  injectButton();
  setTimeout(injectButton, 100);
  setTimeout(injectButton, 600);

  // Attach SPA navigation listener
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectButton();
      attachSpaListener();
    });
  } else {
    attachSpaListener();
  }
})();
