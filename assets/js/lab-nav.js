// Lab: Floating section navigator (FAB style)
// Guard: #lab-nav-fab (unique to lab page)
(function () {
  var outsideHandler = null;

  function init() {
    var btn  = document.getElementById('lab-nav-fab');
    var menu = document.getElementById('lab-nav-menu');

    // Not on lab page — clean up previous handler
    if (!btn || !menu) {
      if (outsideHandler) { document.removeEventListener('click', outsideHandler); outsideHandler = null; }
      return;
    }

    if (outsideHandler) document.removeEventListener('click', outsideHandler);

    var open = false;

    function toggle(force) {
      open = (force !== undefined) ? force : !open;
      menu.style.display = open ? 'flex' : 'none';
      btn.textContent = open ? '✕' : '§';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });

    // Close on anchor click (navigate to section)
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggle(false); });
    });

    outsideHandler = function () { if (open) toggle(false); };
    document.addEventListener('click', outsideHandler);
  }

  init();

  var _ps = document.getElementById('_pushState');
  if (_ps) {
    _ps.addEventListener('hy-push-state-after', init);
  }
})();
